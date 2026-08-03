## O que este conversor faz

Apache Parquet é o formato que quase todo pipeline de dados grava hoje: colunar, comprimido, binário, feito para motores analíticos. É ótimo para máquina e inútil para olho humano. Você não abre no editor de texto, não manda para o colega que vive em planilha e não cola dentro de um chamado. O CSV é o oposto: desajeitado para análise, legível em qualquer lugar.

Esta página faz a ponte da forma mais direta possível. Você escolhe um arquivo `.parquet` do seu disco, a página decodifica, mostra quantas linhas e colunas encontrou, exibe uma prévia e entrega um CSV para baixar. Não tem conta, não tem fila, não tem barra de upload — porque não existe servidor envolvido em nenhum momento.

Essa última parte é a razão de a ferramenta existir. A maioria dos conversores de Parquet online é um formulário que envia seu arquivo para um backend. Se o arquivo tem cadastro de cliente, folha de pagamento, identificador de paciente ou qualquer coisa coberta por política de dados, esse envio é exatamente o problema. Aqui a conversão é JavaScript rodando na sua aba, lendo bytes que o navegador já entregou à página quando você selecionou o arquivo.

## Como usar em quatro passos

1. Escolha o arquivo `.parquet` no campo de seleção. Nada acontece antes disso.
2. Escolha o separador. Vírgula é o padrão; ponto e vírgula serve para planilhas configuradas em locais onde a vírgula é o separador decimal (o caso do Brasil); tabulação gera um TSV que cola limpo na maioria dos programas de planilha.
3. Decida se a primeira linha deve levar os nomes das colunas. A caixa de cabeçalho vem marcada e alterná-la refaz a saída na hora, sem precisar recarregar o arquivo.
4. Confira a prévia e clique em **Baixar CSV**. A prévia mostra as primeiras 200 linhas para a página continuar leve; o arquivo baixado sempre contém todas as linhas do Parquet.

Trocar o separador ou o cabeçalho depois da conversão não relê o arquivo do disco. A tabela decodificada fica na memória da aba, então essas mudanças são instantâneas mesmo com centenas de milhares de linhas.

## Como o Parquet guarda uma tabela, e por que converter não é trivial

Um CSV é um fluxo de linhas. O Parquet é o contrário: guarda cada coluna separadamente, em blocos chamados row groups, e dentro de cada row group a coluna vive em um chunk formado por páginas. Cada página pode ser comprimida, e os valores lá dentro podem estar codificados de várias maneiras diferentes.

Ler tudo isso significa desembrulhar várias camadas:

- O **rodapé** guarda o schema e a posição de cada chunk, serializado com o protocolo compacto do Thrift. O arquivo termina com quatro bytes de tamanho e o marcador ASCII `PAR1`, que também aparece no começo do arquivo. Se um dos marcadores falta, ou não é Parquet, ou o arquivo foi truncado em alguma cópia.
- Cada **página** pode estar comprimida. Esta ferramenta decodifica páginas sem compressão, com Snappy e com Gzip, que juntas cobrem a esmagadora maioria dos arquivos gravados por pandas, PyArrow, Polars, DuckDB e Spark.
- Os valores dentro da página são **codificados**. Layout plano, dicionário, run-length, a família delta e byte-stream-split são todos tratados, tanto em data page v1 quanto no formato v2 mais recente.
- **Nulos** não são armazenados como valores. O Parquet grava um nível de definição por linha, e o conversor usa esses níveis para recolocar os valores nas linhas certas e deixar vazias as posições nulas.

Nada disso importa quando funciona. Importa quando não funciona: como o decodificador entende cada camada, um arquivo incompatível gera uma mensagem específica sobre a compressão, a codificação ou o aninhamento, em vez de um CSV silenciosamente estragado.

## Exemplo resolvido: os valores que você vai ver

Três tipos do Parquet não têm equivalente direto em CSV, então vale saber exatamente o que sai.

**Coluna de data.** O tipo `DATE` guarda uma contagem de 32 bits de dias desde 1º de janeiro de 1970. Se o número guardado é 19723, então 19723 dias depois da época dá 1º de janeiro de 2024, e a célula do CSV sai como `2024-01-01`. Nenhum fuso é aplicado, porque uma data não tem hora para deslocar.

**Timestamp em microssegundos.** Uma coluna `TIMESTAMP` com precisão de microssegundo guarda 64 bits de microssegundos desde a época. Pegue o valor 1704112215123456. Divida por 1.000.000 e sobram 1704112215 segundos inteiros, que correspondem a 1º de janeiro de 2024 às 12:30:15 UTC, mais 123456 microssegundos de resto. A célula sai como `2024-01-01 12:30:15.123456`. Zeros finais da fração são cortados, então um timestamp exato no segundo sai sem parte decimal.

**Coluna decimal.** Uma coluna `DECIMAL(12,2)` é guardada como inteiro mais uma escala. O inteiro 1230 com escala 2 significa 12,30, e é escrito literalmente como `12.30`. É por isso que coluna financeira nunca deve passar por float: o texto preserva o valor exato e a quantidade exata de casas que o schema prometeu.

Booleanos saem como `true` e `false`, nulos viram campos vazios, e colunas binárias que não são UTF-8 válido saem em base64, para que bytes crus não quebrem a estrutura do CSV.

## Onde um conversor offline se justifica

O caso óbvio é confidencialidade: uma exportação de cadastro que você precisa olhar antes que ela chegue perto de qualquer drive compartilhado. Nada sai da máquina, então nenhuma política é dobrada.

O segundo caso é atrito. Um colega manda um extrato em Parquet, você quer conferir três colunas, e instalar Python mais PyArrow só para inspecionar um arquivo que será apagado em cinco minutos é um preço absurdo. Abrir uma aba não é.

O terceiro caso é uma máquina que não é sua para configurar — notebook corporativo travado, computador de cliente, máquina de laboratório onde você não instala pacote. O navegador já está lá.

O quarto caso é ensino. Ver a mesma tabela primeiro como bloco binário opaco e depois como texto puro torna concreta a diferença entre armazenamento colunar e orientado a linha, coisa que diagrama raramente consegue.

## Erros comuns e como evitar

**Abrir o CSV na planilha e ver uma coluna gigante.** Sua planilha espera o separador do idioma configurado. Gere de novo com a opção ponto e vírgula, ou use o diálogo de importação e informe o separador explicitamente.

**Identificador numérico longo virando notação científica.** Isso é a planilha, não o CSV. O arquivo tem os dígitos; o programa decidiu exibir como float. Importe a coluna como texto.

**Esperar horário local.** Os timestamps saem em UTC. O Parquet costuma guardar timestamp como instante, e convertê-lo para o fuso em que sua máquina por acaso está mudaria silenciosamente todos os valores. Faça o deslocamento depois, de propósito, se precisar de hora local.

**Jogar uma exportação aninhada.** Arquivo com colunas struct, list ou map é recusado. Achate antes com `pandas.json_normalize`, com o `unnest` do Polars ou com uma consulta DuckDB que selecione os campos folha, grave um Parquet plano e converta esse.

## Limites: quando esta não é a ferramenta certa

Ela lê o arquivo inteiro na memória, então exportações muito grandes — a partir de algumas centenas de megabytes — se resolvem melhor com DuckDB ou um script que percorra os row groups em streaming. Compressão Zstd, Brotli e LZ4 é recusada em vez de decodificada pela metade; regrave esses arquivos com Snappy ou Gzip. Parquet criptografado não é suportado, por decisão de projeto. E schema aninhado fica fora de escopo, porque achatar uma coluna de lista dentro de uma célula de CSV é uma decisão sobre os seus dados que um conversor genérico não deveria tomar em silêncio.

## Privacidade

A página não tem código de upload, não faz analytics sobre o seu arquivo e não dispara nenhuma chamada de rede durante a conversão. O arquivo é lido pela própria API de arquivos do navegador e decodificado na aba. Se você quer prova em vez de promessa: carregue a página, desconecte a internet e converta um arquivo. Funciona igual, porque nunca houve nada do outro lado do fio.
