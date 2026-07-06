## Encontre a raiz quadrada de qualquer número na hora

A raiz quadrada é uma das operações matemáticas mais usadas. Do Teorema de Pitágoras ao desvio padrão, de equações quadráticas a fórmulas financeiras, raízes quadradas aparecem em todo lugar.

## O que é raiz quadrada?

A raiz quadrada de um número n é o valor que, quando multiplicado por si mesmo, é igual a n. Por exemplo: √9 = 3 porque 3 × 3 = 9. √2 ≈ 1,4142135... (um número irracional).

## Quadrados perfeitos

Um quadrado perfeito é um número que tem uma raiz quadrada inteira: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...

## Números negativos e números imaginários

A raiz quadrada de um número negativo não é um número real. No sistema de números complexos, √(-1) é definida como a unidade imaginária i. Números complexos têm a forma a + bi e são usados em engenharia elétrica, mecânica quântica e muitos outros campos. Esta calculadora trabalha com números não negativos, que cobre a grande maioria das necessidades do dia a dia.

## Aplicações

**Teorema de Pitágoras**: A hipotenusa c de um triângulo retângulo satisfaz c = √(a² + b²). Calcular isso exige tirar uma raiz quadrada.

**Desvio padrão**: O desvio padrão de um conjunto de dados é a raiz quadrada da variância. Tirar a raiz quadrada devolve a medida às unidades originais dos dados.

**Fórmula quadrática**: As soluções de ax² + bx + c = 0 são x = (-b ± √(b² - 4ac)) / 2a. O discriminante b² - 4ac sob a raiz quadrada determina se as soluções são reais.

**Fórmula de distância**: A distância entre dois pontos (x₁, y₁) e (x₂, y₂) é √((x₂-x₁)² + (y₂-y₁)²).

**Modelos financeiros**: O desvio padrão dos retornos mede o risco de investimento. A matemática de carteiras usa raízes quadradas extensivamente.

**Física**: Equações de onda, cálculos de energia e muitas relações físicas envolvem raízes quadradas.

## Como usar a calculadora

Digite qualquer número não negativo na caixa e tanto a sua raiz quadrada quanto o seu quadrado aparecem imediatamente, atualizando enquanto você digita. Não há botão para apertar nem nada para configurar. Testar alguns números lado a lado é uma forma rápida de construir intuição — repare como a raiz quadrada de um número menor que 1 é na verdade maior que o próprio número (√0,25 = 0,5), o que surpreende muita gente na primeira vez que vê, enquanto a raiz quadrada de qualquer número maior que 1 é sempre menor que o número.

## Estimando uma raiz quadrada de cabeça

Antes de recorrer a uma calculadora, ajuda saber estimar uma raiz quadrada aproximadamente. Ache os dois quadrados perfeitos mais próximos que cercam o seu número: para √50, os quadrados perfeitos mais próximos são 49 (√49 = 7) e 64 (√64 = 8), então a resposta deve estar entre 7 e 8, e como 50 está muito mais perto de 49, a resposta deve ficar perto de 7 mas um pouco acima — o valor verdadeiro, 7,07, confirma esse instinto. Essa técnica de cercar o valor é uma boa conferência sempre que você quiser confirmar que o resultado de uma calculadora está na faixa certa, e é exatamente o tipo de habilidade de estimativa que a aritmética mental e os primeiros cursos de álgebra tentam construir.

## O método de Newton, o algoritmo por trás dos bastidores

Computadores modernos não procuram raízes quadradas em uma tabela; eles as calculam usando métodos iterativos rápidos, o mais famoso sendo o método de Newton (também chamado de método babilônico, já que uma versão dele era conhecida pelos matemáticos babilônicos antigos). Partindo de um palpite aproximado, cada passo refina a estimativa usando a fórmula: próximo palpite = (palpite + número ÷ palpite) ÷ 2. Aplicado para achar √10 partindo de um palpite de 3: (3 + 10/3)/2 ≈ 3,1667, depois (3,1667 + 10/3,1667)/2 ≈ 3,1623, que já está extremamente perto do valor verdadeiro de 3,16228. Cada iteração aproximadamente dobra o número de dígitos corretos, e é por isso que processadores modernos conseguem calcular uma raiz quadrada com precisão total em apenas um punhado de passos.

## Quadrados e raízes quadradas como operações inversas

Elevar ao quadrado e tirar a raiz quadrada desfazem um ao outro, e é por isso que esta calculadora mostra os dois de uma vez: a raiz quadrada de n² retorna n (para n não negativo), e o quadrado de √n retorna n. Essa relação inversa é fundamental em toda a álgebra — é exatamente assim que equações envolvendo termos ao quadrado, como a fórmula quadrática ou o Teorema de Pitágoras, são resolvidas aplicando a raiz quadrada aos dois lados no momento certo.

## Raízes quadradas irracionais

A maioria dos números não tem raízes quadradas inteiras exatas. √2, √3, √5, √6, √7 e muitas outras são irracionais — as suas expansões decimais são infinitas e não repetitivas. Esses valores são importantes em geometria: a diagonal de um quadrado unitário tem comprimento √2 ≈ 1,41421356... Reconhecer que um número não é um quadrado perfeito, e portanto terá uma raiz decimal infinita, é uma habilidade útil ao estimar resultados antes de conferi-los nesta calculadora.

## Como funciona o cálculo

A calculadora usa a função Math.sqrt() do JavaScript, que implementa o algoritmo de raiz quadrada de ponto flutuante de precisão dupla IEEE 754. Os resultados são precisos em cerca de 15 a 16 algarismos significativos, mais do que suficiente para qualquer uso prático em engenharia, finanças ou ciência do dia a dia.

## Privado e instantâneo

O cálculo roda inteiramente no seu navegador usando aritmética de precisão dupla padrão, precisa em cerca de quinze algarismos significativos, então o resultado aparece na hora e nenhum número que você informa é enviado, registrado ou compartilhado.

