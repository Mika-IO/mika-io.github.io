## Este número é primo?

Um número primo é um dos conceitos mais fundamentais da matemática — um inteiro positivo maior que 1 que não pode ser dividido igualmente por nenhum número além de 1 e ele mesmo. Determinar se um dado número é primo é uma questão que fascinou matemáticos por milênios e permanece praticamente importante na criptografia moderna. Esta ferramenta responde na hora para qualquer número que você informar, e também mostra a lista completa de divisores e a fatoração em primos.

## O que torna um número primo?

A definição é simples: um inteiro positivo é primo se seus únicos divisores positivos são 1 e ele mesmo. O número 7 é primo porque só pode ser dividido igualmente por 1 e 7. O número 8 não é primo — também é divisível por 2 e 4. O número 1 é um caso especial: por convenção matemática moderna, não é considerado primo.

Os primeiros primos são 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Note que 2 é o único número primo par.

## Testes de primalidade em escalas maiores

A divisão por tentativa, o método usado por esta ferramenta, funciona perfeitamente bem para números até os milhões, mas se torna impraticável para os números verdadeiramente enormes usados na criptografia do mundo real, que podem chegar a centenas de dígitos. Para esses, matemáticos e cientistas da computação usam testes de primalidade probabilísticos, como o teste de Miller-Rabin, que não consegue garantir que um número é primo com certeza absoluta, mas pode descartar a não-primalidade com uma probabilidade de erro tão pequena que é considerada desprezível na prática — menor, de fato, do que a chance de ocorrer um erro de hardware durante o mesmo cálculo.

## Fatoração em primos

O Teorema Fundamental da Aritmética afirma que todo inteiro maior que 1 pode ser expresso como produto de números primos de exatamente uma forma. Por exemplo: 12 = 2 × 2 × 3, escrito como 2² × 3.

## Um exemplo rápido resolvido

Pegue o número 91. É ímpar, não é divisível por 3 (9+1=10, não é múltiplo de 3), e não termina em 0 ou 5, então os testes pequenos e óbvios todos sugerem que talvez seja primo — mas checar a divisão por 7 revela que 91 ÷ 7 = 13 exatamente, então 91 é na verdade composto, com fatoração em primos 7 × 13. Esse é um exemplo clássico usado para ilustrar por que "não parece divisível por nada óbvio" não é o mesmo que "é primo": a única forma confiável de saber com certeza é checar cada divisor candidato até a raiz quadrada, exatamente o que esta ferramenta faz automaticamente e na hora, sem chance de erro humano no meio do caminho.

## Por que os primos importam

Na computação moderna, a dificuldade de fatorar números grandes em seus componentes primos é a base da criptografia RSA, que protege a maioria das comunicações criptografadas da internet.

## Como o cálculo funciona

A ferramenta usa divisão por tentativa: testa se o número é divisível por qualquer inteiro de 2 até a raiz quadrada do número. Se algum divisor assim existir, o número é composto e a ferramenta registra os seus fatores. Se nenhum existir, o número é primo. O limite da raiz quadrada funciona porque, se um número n tem um fator maior que √n, ele também deve ter um fator correspondente menor que √n, então podemos parar na raiz quadrada.

## Como usar o verificador

Digite qualquer número inteiro positivo na caixa e o resultado aparece imediatamente: se o número é primo, e se não for, a sua lista completa de divisores e a sua fatoração em primos decomposta em potências primas individuais. Não há limite prático para o tamanho do número que você pode verificar no uso do dia a dia, já que o método de divisão por tentativa usado por esta ferramenta lida com números na casa dos milhões e além quase instantaneamente.

## Os primos são infinitos

Euclides provou há mais de dois mil anos que não existe um maior número primo — a lista continua para sempre. A sua prova é uma bela peça de lógica antiga: suponha por um momento que existissem apenas finitos primos, multiplique todos eles juntos e some um. O número resultante não pode ser dividido igualmente por nenhum primo da lista original, já que dividir por qualquer um deles sempre deixa resto um, então esse novo número ou é primo em si, ou tem algum outro fator primo que estava faltando na suposta lista completa — de qualquer forma, contradizendo a suposição de que a lista era completa.

## Divisores e fatoração juntos

Além de dizer se um número é primo, esta ferramenta lista todos os seus divisores e a sua fatoração completa em primos de uma vez, o que é útil não só para checar primalidade mas também para tarefas relacionadas, como simplificar frações ou achar o máximo divisor comum entre dois números, ambos dependendo de conhecer os fatores primos subjacentes.

## Primos gêmeos e a conjectura ainda em aberto

Dois primos que diferem exatamente por 2, como 11 e 13, ou 17 e 19, são chamados primos gêmeos. Ninguém sabe se existem infinitos pares assim — é uma das perguntas mais famosas ainda sem resposta em toda a matemática, apesar de séculos de tentativas e de avanços parciais recentes que reduziram, mas não eliminaram, a lacuna máxima entre primos consecutivos que se acredita ocorrer infinitamente.

## Privado e instantâneo

O cálculo roda inteiramente no seu navegador, então o resultado aparece no instante em que você digita e nenhum número que você informa é enviado a nenhum servidor, registrado ou compartilhado.

