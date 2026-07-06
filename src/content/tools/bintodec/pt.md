## Converta números entre qualquer base instantaneamente

O conversor de base numérica permite digitar qualquer número em binário (base 2), octal (base 8), decimal (base 10) ou hexadecimal (base 16) e ver instantaneamente seu equivalente nos quatro sistemas. Não há necessidade de lembrar fórmulas de conversão ou fazer aritmética mental — selecione sua base de origem, digite o número, e a ferramenta faz o resto em tempo real.

## Por que existem bases numéricas diferentes?

Humanos naturalmente contam em base 10 (decimal) porque temos dez dedos. Mas computadores não têm dedos — eles trabalham com sinais elétricos que estão ligados ou desligados, dando origem à base 2 (binário). Outras bases surgiram como atalhos práticos para o binário: a base 8 (octal) agrupa três dígitos binários juntos, e a base 16 (hexadecimal) agrupa quatro, tornando longas sequências binárias muito mais legíveis para engenheiros.

## Binário — base 2

Binário é a base fundamental da computação digital. Todo valor armazenado em um computador, toda instrução executada por um processador, todo pixel em uma tela acaba se resolvendo em uma sequência de 0s e 1s. Um único dígito binário é chamado de bit. Oito bits formam um byte. Como números binários crescem rapidamente em comprimento — o número decimal 255 exige oito dígitos binários (11111111) — programadores raramente escrevem binário puro. Eles preferem hexadecimal, que é muito mais compacto.

Entender binário é essencial para estudantes de ciência da computação, engenheiros de software e qualquer pessoa que trabalhe perto do hardware. Manipulação de bits — usando operações como AND, OR, XOR e NOT — é uma técnica comum em programação de sistemas, criptografia e processamento gráfico.

## Octal — base 8

Octal usa os dígitos de 0 a 7. Um dígito octal representa exatamente três dígitos binários, então grupos de três bits mapeiam de forma limpa para um único dígito octal. Isso tornou o octal muito conveniente na era dos mainframes e minicomputadores.

Hoje, o uso mais visível do octal é nos códigos de permissão de arquivo do Unix e Linux. Quando você roda `chmod 755` em um arquivo, você está definindo permissões usando notação octal: 7 (rwx), 5 (r-x), 5 (r-x). Cada dígito codifica três bits de permissão (leitura, escrita, execução) para o dono, o grupo e os outros.

## Decimal — base 10

Decimal é o sistema numérico cotidiano usado por praticamente toda cultura humana. Usa os dígitos de 0 a 9. Cada posição em um número decimal representa uma potência de 10: unidades, dezenas, centenas, milhares, e assim por diante. Decimal é o padrão para aplicações voltadas ao ser humano — saldos bancários, temperaturas, distâncias e horários são todos exibidos em decimal.

Dentro de um computador, porém, decimal é relativamente caro. Processadores trabalham nativamente em binário, então representar números decimais exige esquemas de codificação como Decimal Codificado em Binário (BCD) ou algoritmos de conversão.

## Hexadecimal — base 16

Hexadecimal estende o conjunto de dígitos além do 9 usando as letras A a F para representar 10 a 15. Um dígito hexadecimal representa exatamente quatro dígitos binários (um nibble). Isso torna o hex uma representação extremamente compacta de dados binários. O byte de 8 bits 11111111 em binário se torna apenas FF em hex.

Hexadecimal é onipresente em computação e eletrônica. Endereços de memória em depuradores, códigos de cor em design web (#FF6347 é vermelho Tomato), endereços MAC, hashes SHA e listagens de bytecode todos usam hexadecimal.

## Como funciona a conversão de base

Converter um número de qualquer base para decimal é direto: multiplique cada dígito pela sua base elevada à potência da sua posição (contando da direita começando em 0), depois some os resultados.

Por exemplo, o número binário 1011 converte para decimal como: 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11

Converter de decimal para outra base exige divisão repetida: divida o número pela base alvo, registre o resto como o próximo dígito (da direita para a esquerda), e repita com o quociente até que o quociente seja zero.

## Aplicações no mundo real

**Códigos de cor**: Design web e design gráfico dependem de códigos de cor hexadecimais. Toda cor CSS como #3A86FF são três pares de dígitos hex codificando os canais vermelho, verde e azul, cada um variando de 00 (0) a FF (255).

**Endereços de rede**: Endereços MAC e endereços IPv6 são escritos em hexadecimal.

**Depuração**: Ao percorrer código assembly ou inspecionar memória em um depurador, endereços e valores de dados brutos são mostrados em hex.

**Permissões**: Sistemas de arquivo Linux e macOS usam octal. Entender que 644 significa que o dono pode ler e escrever (4+2=6), enquanto grupo e outros só podem ler (4), é essencial para administração de servidores.

## Dicas para conversão mental

Com prática, certas conversões se tornam automáticas: Binário 1111 = Hex F = Decimal 15. Hex FF = Decimal 255 = Binário 11111111. Um atalho útil: divida um número binário em grupos de 4 a partir da direita e converta cada grupo para um dígito hex independentemente.

## Um erro comum ao converter manualmente

Ao converter à mão, o erro mais frequente é errar a posição de uma potência — esquecer que a contagem de posições começa em zero a partir da direita, não em um. Um dígito na segunda posição da direita em binário vale 2¹ = 2, não 2². Esse deslizamento de um lugar decimal é fácil de cometer sob pressão e produz um resultado plausível mas errado, exatamente o tipo de erro que esta ferramenta elimina ao calcular automaticamente.

## Privado e instantâneo

Todos os cálculos rodam inteiramente no seu navegador. Nenhum dado é enviado a nenhum servidor. A conversão acontece localmente usando os métodos nativos parseInt e toString do JavaScript, que são altamente confiáveis para inteiros dentro do intervalo seguro do JavaScript (até 2^53 − 1).
