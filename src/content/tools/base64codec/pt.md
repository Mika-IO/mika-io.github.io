## Codifique e decodifique Base64 instantaneamente

Base64 é uma codificação fundamental usada em toda a computação para representar com segurança dados binários em forma de texto.

## Como usar a ferramenta

Cole texto no campo de codificar para obter a sua representação em Base64 imediatamente, ou cole uma string Base64 no campo de decodificar para recuperar o texto original, com as duas direções atualizando ao vivo enquanto você digita. Isso é útil para inspecionar rapidamente o payload de um JWT, checar o que uma URI de dados realmente contém, ou preparar um valor que precisa viajar com segurança por um canal apenas de texto, como um parâmetro de URL ou um campo JSON.

## O que é Base64?

Base64 é um esquema de codificação binário para texto que representa dados binários usando apenas 64 caracteres ASCII imprimíveis: as 26 letras maiúsculas (A-Z), 26 letras minúsculas (a-z), os 10 dígitos (0-9), mais os caracteres + e /.

## Por que o Base64 existe

Muitos protocolos e sistemas baseados em texto mais antigos só podem lidar com texto ASCII, não bytes binários arbitrários. O Base64 resolve isso traduzindo quaisquer dados binários em um subconjunto de caracteres ASCII.

## Base64 no e-mail

O padrão MIME para e-mail define como codificar corpos de mensagem e anexos para transmissão. Conteúdo baseado em texto costuma usar a codificação "quoted-printable"; anexos binários usam Base64. Quando você anexa um PDF a um e-mail, o seu cliente de e-mail o codifica em Base64 antes da transmissão, e o cliente do destinatário o decodifica de volta automaticamente.

## Usos comuns

**URIs de dados**: Imagens podem ser incorporadas diretamente em HTML ou CSS sem solicitações de arquivo separadas.

**Anexos de e-mail (MIME)**: Os anexos de e-mail são codificados em Base64 para transmissão no protocolo MIME.

**APIs JSON**: Dados binários transmitidos em JSON devem ser codificados em Base64 porque o JSON é apenas de texto.

**Tokens JWT**: Tokens Web JSON consistem em três seções codificadas em Base64URL separadas por pontos.

## Nota de segurança

Base64 NÃO é criptografia. Qualquer pessoa que receba dados codificados em Base64 pode imediatamente decodificá-los.

## Nota de segurança

Base64 NÃO é criptografia. Qualquer pessoa que receba dados codificados em Base64 pode decodificá-los imediatamente usando qualquer decodificador Base64 disponível gratuitamente online. Não use Base64 para tentar "esconder" informação sensível — para isso, use criptografia de verdade, que é matematicamente projetada para impedir a leitura sem uma chave, ao contrário do Base64, que é apenas uma reformatação reversível dos mesmos dados.

## Base64 vs Base64URL

O Base64 padrão usa + e /, que são caracteres especiais em URLs. O Base64URL substitui esses por - e _ para tornar os dados codificados seguros para uso em URL. Tokens JWT usam Base64URL. O caractere de preenchimento = também costuma ser omitido no Base64URL.

## Como a codificação Base64 funciona passo a passo

O Base64 converte dados binários em texto através de um processo direto. Primeiro, pegue os dados binários e agrupe-os em blocos de 3 bytes (24 bits). Divida cada bloco de 24 bits em quatro grupos de 6 bits. Procure cada valor de 6 bits, que vai de 0 a 63, no alfabeto Base64, onde A=0, B=1, seguindo até Z=25, a=26 até z=51, 0=52 até 9=61, +=62 e /=63. Se a entrada não for um múltiplo exato de 3 bytes, adicione caracteres de preenchimento = no final para completar o último grupo. Como 3 bytes viram 4 caracteres Base64, a codificação aumenta o tamanho dos dados em aproximadamente 33% — um arquivo binário de 1 MB codificado em Base64 vira aproximadamente 1,37 MB de texto.

## URIs de dados e imagens embutidas

Um dos usos mais visíveis do Base64 na web são as URIs de dados, que permitem que um arquivo seja embutido diretamente no HTML ou CSS em vez de referenciado como um arquivo separado, em uma forma como `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`. Isso elimina uma solicitação HTTP separada para o recurso, o que pode melhorar o desempenho para ícones e imagens pequenos. No entanto, os dados em Base64 não podem ser armazenados em cache separadamente da página em que estão embutidos, e a sobrecarga de tamanho de cerca de 33% torna essa abordagem ineficiente para imagens grandes.

## Tokens JWT e Base64URL

Os JSON Web Tokens usam uma variante chamada Base64URL, que substitui os caracteres + e /, que têm significado especial dentro de URLs, por - e _ respectivamente, e geralmente omite o preenchimento = por completo. Um JWT parece três seções separadas por pontos — cabeçalho, carga útil e assinatura —, cada uma um pedaço de dados codificado em Base64URL, motivo pelo qual um JWT pode ser colocado com segurança diretamente em uma URL ou em um cabeçalho HTTP sem escapes adicionais.

## Como o Base64 funciona por baixo dos panos

O nome "Base64" vem do fato de a codificação usar 64 caracteres distintos. Cada caractere Base64 representa 6 bits de dados (2^6 = 64). Como um byte tem 8 bits, cada 3 bytes de entrada viram exatamente 4 caracteres Base64, uma relação fixa que explica por que o tamanho codificado é sempre previsível a partir do tamanho original.

## Privado e instantâneo

A codificação e decodificação rodam inteiramente no seu navegador usando as funções btoa e atob embutidas, então os resultados aparecem na hora e nenhum dado que você codifica ou decodifica é enviado a lugar nenhum, mesmo offline depois que a página carrega, e sem nenhum limite de uso, custo ou cadastro envolvido, pronto sempre que você precisar dele.

