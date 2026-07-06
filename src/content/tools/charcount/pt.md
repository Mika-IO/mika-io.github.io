## Conte caracteres, palavras, frases e mais

Um contador de caracteres é uma ferramenta essencial para quem escreve dentro de restrições — postagens de redes sociais com limites de caracteres, meta descrições, mensagens SMS, bios ou qualquer outro formulário com comprimento máximo. Esta ferramenta conta caracteres com e sem espaços, palavras, frases, parágrafos e linhas conforme você digita, atualizando instantaneamente a cada tecla pressionada.

## Por que existem limites de caracteres

Diferentes plataformas impõem diferentes limites de caracteres por boas razões:

**Twitter/X**: 280 caracteres por post. Originalmente 140 caracteres (uma mensagem SMS), dobrado em 2017. O limite incentiva comunicação concisa e mantém a timeline navegável.

**Legendas do Instagram**: até 2.200 caracteres, mas só os primeiros 125 aparecem antes do corte "mais". A maior parte do engajamento vem de legendas curtas.

**Meta descrições (SEO)**: o Google normalmente exibe 155–160 caracteres. Escreva descrições nesse comprimento para evitar corte nos resultados de busca.

**Mensagens SMS**: um SMS padrão tem 160 caracteres na codificação GSM. Mensagens mais longas são divididas em várias partes e remontadas pelo aparelho receptor.

**Títulos do LinkedIn**: 220 caracteres. Bio do LinkedIn: 2.600 caracteres.

**Linhas de assunto de e-mail**: a melhor prática é usar menos de 60 caracteres para evitar corte em clientes de e-mail móveis.

## Metodologia de contagem

**Caracteres com espaços**: todo caractere, incluindo espaço, nova linha e tabulação, conta.

**Caracteres sem espaços**: todos os caracteres de espaço em branco são removidos antes da contagem, útil ao comparar com limites que contam apenas caracteres visíveis.

**Palavras**: o texto é dividido por espaço em branco. Espaços consecutivos contam como um único separador.

**Frases**: contadas pela pontuação terminal (ponto, exclamação ou interrogação) seguida de espaço em branco ou fim do texto.

**Parágrafos**: blocos de texto separados por uma ou mais linhas em branco.

**Linhas**: total de caracteres de nova linha mais um.

## Escrevendo de forma eficiente dentro de limites

Quando você tem um limite de caracteres, cada palavra e sinal de pontuação importa. Técnicas úteis de compressão incluem usar voz ativa (mais curta que a passiva), substituir expressões longas por versões curtas, cortar adjetivos redundantes, usar numerais em vez de números por extenso e abreviar quando o contexto deixa claro o significado.

## Limites de caracteres por plataforma

**Twitter/X**: 280 caracteres por tweet. URLs são automaticamente encurtadas e contam como 23 caracteres independentemente do tamanho real. Imagens, vídeos e enquetes não contam para o limite.

**LinkedIn**: títulos 220 caracteres, seção sobre 2.600 caracteres, posts 3.000 caracteres, comentários 1.250 caracteres.

**Instagram**: legendas 2.200 caracteres (só os primeiros ~125 visíveis sem expandir), bio 150 caracteres, nome de usuário 30 caracteres.

**Facebook**: posts 63.206 caracteres, comentários 8.000 caracteres, descrições de página 255 caracteres.

**YouTube**: títulos de vídeo 100 caracteres (70 recomendado para evitar corte), descrições 5.000 caracteres (primeiros 157 visíveis nos resultados de busca).

## Terminologia tipográfica

**Caractere**: qualquer unidade única em um sistema de escrita — uma letra, dígito, espaço, sinal de pontuação ou símbolo especial. No Unicode, cada caractere tem um ponto de código único.

**Glifo**: a representação visual de um caractere em uma fonte específica. Um único caractere pode ter vários glifos (regular, negrito, itálico).

**Token**: em processamento de linguagem natural, um token é tipicamente uma palavra ou subunidade de palavra usada por modelos de linguagem. O GPT-4 usa aproximadamente 750 palavras = 1.000 tokens como conversão aproximada, por isso um contador de caracteres é um bom substituto para estimar o uso de tokens antes de colar um texto em uma ferramenta de IA com limite de contexto.

## Caracteres em diferentes sistemas de escrita

A lógica de contagem varia por script. Em scripts latinos (português, inglês, espanhol, francês), um caractere é aproximadamente uma letra, dígito ou sinal de pontuação, e os limites de palavra são marcados por espaços. Em chinês e japonês, cada ideograma normalmente conta como um caractere em vez de ser agrupado em palavras separadas por espaço, então um limite de "280 caracteres" em um tweet em chinês carrega muito mais informação do que um em português. Esta ferramenta conta pontos de código Unicode de forma consistente em todos esses casos.

## Por que os limites de caracteres não desaparecem

Seria de se esperar que limites de caracteres perdessem relevância conforme a largura de banda e o armazenamento ficam mais baratos, mas eles persistem por razões que não têm nada a ver com custo técnico: um limite curto força concisão editorial (por que o Twitter mantém 280 caracteres mesmo tendo capacidade de sobra para mais), garante compatibilidade entre sistemas antigos e novos (por que o SMS ainda usa 160 caracteres décadas depois da tecnologia permitir mensagens muito maiores), e molda como o conteúdo aparece em uma tela pequena (por que o Google trunca meta descrições em torno de 155-160 caracteres, já que é aproximadamente quanto texto cabe em duas linhas de resultado de busca em um celular). Entender a razão por trás de cada limite ajuda a escrever para ele de propósito, em vez de simplesmente cortar um texto até ele caber.

## Contagem em tempo real enquanto você edita

Ver a contagem mudar a cada tecla pressionada, em vez de precisar clicar em um botão "contar", muda a forma como você edita: cortar uma frase e ver o número cair imediatamente cria um ciclo de retroalimentação instantâneo que torna muito mais fácil aparar um texto até um limite exato, palavra por palavra, sem precisar recontar manualmente depois de cada mudança.

## Privado e instantâneo

O contador roda no seu navegador usando métodos de string e expressões regulares do JavaScript aplicados ao texto enquanto você digita. Nenhum texto que você digita é transmitido a um servidor, armazenado ou registrado — atualize a página e ele desaparece.
