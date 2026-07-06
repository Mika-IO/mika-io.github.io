## Converta entre binário, octal, decimal e hexadecimal

Computadores fundamentalmente representam tudo em binário — sequências de uns e zeros —, mas o binário é cansativo para humanos lerem e escreverem, então várias outras bases numéricas são usadas como abreviação mais conveniente. Octal (base 8) e hexadecimal (base 16) são as duas mais comuns, escolhidas especificamente porque convertem de e para binário de uma forma limpa e mecânica. Esta ferramenta converte qualquer número que você informar, em qualquer uma das quatro bases comuns, em todas as outras de uma vez. Escolha a base em que a sua entrada está escrita, digite o valor, e cada representação aparece imediatamente.

## Como usar o conversor

Selecione a base em que o seu número de entrada está escrito no menu suspenso — decimal, binário, octal ou hexadecimal —, depois digite o valor no campo e aperte converter. As quatro representações aparecem juntas: binário, octal, decimal e hexadecimal, então você pode ler qual delas realmente precisa sem um segundo passo. A entrada hexadecimal aceita letras maiúsculas e minúsculas para os dígitos de A a F, e o resultado é sempre mostrado em maiúsculas para clareza.

## Por que octal e hexadecimal existem

Números binários ficam longos muito rápido — o número decimal 255 é 11111111 em binário, oito dígitos para um número bem modesto —, o que os torna sujeitos a erro para ler, escrever e comparar a olho. Octal e hexadecimal existem para resolver exatamente esse problema, porque as duas bases são potências de dois: 8 é 2³ e 16 é 2⁴. Isso significa que cada dígito octal corresponde a exatamente três dígitos binários, e cada dígito hexadecimal corresponde a exatamente quatro, então converter entre binário e qualquer um deles é um exercício simples de agrupamento em vez de aritmética de verdade. Agrupar 11111111 em conjuntos de três da direita para a esquerda dá 11 111 111, que é 3, 7, 7 em octal — 377. Agrupar o mesmo número em conjuntos de quatro dá 1111 1111, que é F, F em hexadecimal — FF.

## Convertendo decimal para outra base à mão

Para converter um número decimal para outra base sem calculadora, divida repetidamente pela base de destino e registre os restos. Convertendo 255 para octal: 255 ÷ 8 = 31 resto 7; 31 ÷ 8 = 3 resto 7; 3 ÷ 8 = 0 resto 3. Lendo os restos da última divisão até a primeira dá 377. O mesmo processo converte para qualquer base — divida por 2 repetidamente para binário, por 16 para hexadecimal — e esta ferramenta faz exatamente esse cálculo instantaneamente para as três bases de destino ao mesmo tempo.

## Onde cada base é realmente usada

Binário é a língua nativa da lógica digital e é usado diretamente ao discutir operações bit a bit, flags e comportamento de hardware de baixo nível. Octal foi historicamente importante na computação antiga, particularmente em sistemas onde o tamanho da palavra era um múltiplo de três bits, e ainda aparece hoje na notação de permissões de arquivo do Unix e Linux, onde uma permissão como 755 descreve os bits de leitura, escrita e execução para dono, grupo e todos em uma forma octal compacta. Hexadecimal é de longe o mais comum dos dois no software moderno, aparecendo em códigos de cor no design web (#FF5733), endereços de memória, códigos de erro, e como uma forma compacta de exibir dados brutos de bytes em ferramentas de depuração, porque a sua relação de quatro bits por dígito com o binário torna a conversão a olho relativamente fácil com um pouco de prática.

## Um exemplo resolvido nas quatro bases

Pegue o número decimal 100. Em binário, é 1100100 — obtido dividindo repetidamente por 2 e lendo os restos de baixo para cima. Em octal, agrupando esses dígitos binários em conjuntos de três da direita para a esquerda (1 100 100) dá 1, 4, 4, então 100 em decimal é 144 em octal. Em hexadecimal, agrupando em conjuntos de quatro (0110 0100) dá 6 e 4, então 100 em decimal é 64 em hex. Rodar 100 por este conversor com decimal selecionado como base de entrada confirma os três de uma vez, o que é uma boa forma de ganhar confiança no método de agrupamento antes de confiar nele para um número maior, onde conferir à mão seria tedioso. O caminho inverso funciona de forma idêntica: cole um valor binário, octal ou hexadecimal, selecione a base de entrada correspondente, e a ferramenta deriva as outras três representações, incluindo o valor decimal, usando as mesmas regras de agrupamento e valor posicional rodadas ao contrário. Isso a torna igualmente útil qualquer que seja a direção em que o seu número original esteja, sem precisar lembrar qual fórmula de conversão se aplica a qual par de bases, ou manter quatro conjuntos diferentes de regras de divisão e agrupamento organizados na cabeça.

## Privado e instantâneo

A conversão roda inteiramente no seu navegador usando aritmética de inteiros padrão, então os resultados aparecem no instante em que você aperta converter e nenhum valor que você informa é enviado a um servidor, registrado ou compartilhado. Funciona offline depois que a página carrega, pronta sempre que um problema de conversão de base aparecer em um estudo, uma depuração ou uma curiosidade.
