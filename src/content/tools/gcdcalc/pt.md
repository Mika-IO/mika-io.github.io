## Encontre o Máximo Divisor Comum de quaisquer números

O Máximo Divisor Comum (MDC) é o maior número que divide todos os números dados sem deixar resto.

## Definição e exemplos

- MDC(12, 18) = 6 — porque 6 é o maior número que divide tanto 12 quanto 18.
- MDC(48, 36, 24) = 12 — o maior número que divide os três.
- MDC(7, 13) = 1 — esses são coprimos (nenhum fator comum além de 1).

## O algoritmo de Euclides

O método mais famoso para computar o MDC é o algoritmo de Euclides, descrito por Euclides por volta de 300 aC em seus Elementos. O algoritmo afirma que MDC(a, b) = MDC(b, a mod b), e repete até b = 0.

## Dividindo coisas em grupos iguais

Um uso bem prático do MDC é dividir coleções de tamanhos diferentes no maior número possível de grupos idênticos sem sobrar nada. Se você tem 48 maçãs e 36 laranjas e quer montar cestas de frutas idênticas usando toda a fruta sem sobras, o maior número de cestas que você pode montar é MDC(48, 36) = 12, cada uma com 4 maçãs e 3 laranjas. Essa mesma lógica se aplica a cortar comprimentos de tecido ou madeira em pedaços iguais, organizar cadeiras em fileiras iguais em salas de tamanhos diferentes, ou dividir um orçamento entre departamentos nas maiores parcelas iguais possíveis.

## Simplificando frações

O uso cotidiano mais comum do MDC é simplificar frações para termos mínimos. Para simplificar 48/72, compute MDC(48, 72) = 24, então divida os dois por 24: 2/3.

## Como usar a calculadora

Digite os seus números na caixa separados por vírgula — dois números, ou quantos quiser. Aperte calcular e o MDC do conjunto inteiro aparece imediatamente, junto com a redução passo a passo pelo algoritmo de Euclides, para você ver exatamente como a resposta foi alcançada em vez de tratá-la como uma caixa-preta. Informar um único número, ou números que não compartilham nenhum fator além de 1, é tratado com naturalidade: a ferramenta simplesmente reporta um MDC de 1 nesse segundo caso, confirmando que os números são coprimos.

## Por que o algoritmo de Euclides é tão eficiente

Antes do método de Euclides, achar um MDC significava listar todos os fatores de cada número e escolher o maior que tinham em comum — funcional para números pequenos, mas desesperadamente lento para números grandes. O algoritmo de Euclides, em vez disso, substitui repetidamente o número maior pelo resto da divisão dele pelo menor, encolhendo o problema rapidamente. Para dois números de qualquer tamanho realista, ele tipicamente termina em bem menos de cinquenta passos, e é por isso que continua sendo o método padrão ensinado hoje e o que está embutido em praticamente toda calculadora, função de planilha e biblioteca de linguagem de programação que computa um MDC.

## Estendendo para mais de dois números

Quando você informa três ou mais números, a calculadora não precisa de um algoritmo novo — ela simplesmente aplica o caso de dois números repetidamente. O MDC de uma lista inteira é igual ao MDC dos dois primeiros números combinado com o terceiro, e assim por diante: MDC(a, b, c) = MDC(MDC(a, b), c). Isso funciona porque qualquer número que divida a, b e c precisa dividir primeiro o MDC de qualquer par deles, então reduzir a lista dois de cada vez nunca perde informação. É uma boa ilustração de como um bloco simples de construção — o MDC de dois números — se estende de forma limpa para lidar com uma lista de tamanho qualquer.

## Números coprimos e o que um MDC de 1 revela

Quando a calculadora reporta um MDC de 1, os números que você informou são chamados de coprimos, ou primos entre si, o que significa que não compartilham nenhum fator maior que 1, mesmo que cada um individualmente tenha muitos fatores. Por exemplo, 8 e 15 são coprimos mesmo que 8 = 2×2×2 e 15 = 3×5 — eles simplesmente não compartilham nenhum dos mesmos blocos primos de construção. A coprimalidade aparece constantemente em teoria dos números e criptografia, porque muitos algoritmos dependem de escolher números garantidamente livres de estrutura comum oculta.

## Engenharia

Na engenharia mecânica, o MDC das quantidades de dentes em duas engrenagens determina com que frequência o mesmo par de dentes se encontra. Se a engrenagem A tem 48 dentes e a engrenagem B tem 36 dentes, MDC(48, 36) = 12, significando que a cada 12 dentes na engrenagem A se encaixam com cada 12 dentes na engrenagem B. Esse cálculo importa para prever o desgaste — os mesmos dois dentes se tocando repetidamente concentra o desgaste nesses pontos específicos, então os engenheiros às vezes escolhem contagens de dentes coprimas de propósito para distribuir o desgaste de forma mais uniforme.

## Um exemplo passo a passo

Veja o algoritmo de Euclides em ação para MDC(48, 18). Primeiro, 48 = 2×18 + 12, então o problema vira MDC(18, 12). Depois, 18 = 1×12 + 6, então vira MDC(12, 6). Por fim, 12 = 2×6 + 0, então o resto chega a zero e o último resto não nulo, 6, é o MDC. Cada passo do algoritmo reduz os números envolvidos rapidamente, o que é exatamente por que ele termina em poucos passos mesmo para números muito grandes, ao contrário de listar todos os fatores, que fica lento rapidamente conforme os números crescem.

## Privado e instantâneo

Todos os cálculos rodam inteiramente no seu navegador usando o algoritmo de Euclides, então o resultado aparece no instante em que você digita e nenhum número que você informa é enviado a um servidor, registrado ou compartilhado. Funciona offline depois que a página carrega, e todo cálculo é descartado assim que você fecha ou recarrega a aba.

