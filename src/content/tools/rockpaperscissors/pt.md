## O jogo de mãos mais antigo do mundo

Pedra, Papel e Tesoura é um dos jogos mais universalmente reconhecidos da Terra. Dois jogadores revelam simultaneamente um de três formatos de mão — um punho fechado para pedra, uma palma aberta para papel, ou dois dedos estendidos para tesoura — e um conjunto simples de regras decide quem vence. Pedra quebra tesoura, tesoura corta papel, papel cobre pedra. Apesar dessa aparente simplicidade, o jogo inspirou décadas de pesquisa em teoria dos jogos, psicologia e estratégia competitiva, e foi usado em tudo, desde disputas de recreio até disputas legais entre empresas resolvendo desacordos sobre qual leiloeira lidaria com a venda de um espólio.

O jogo tem raízes na China, onde uma versão chamada shoushiling aparece em registros escritos datando da dinastia Han, cerca de dois mil anos atrás. Da China ele se espalhou pelo Japão, onde ficou conhecido como jan-ken-pon e evoluiu para o formato de três gestos que a maioria das pessoas reconhece hoje. Comerciantes e missionários europeus trouxeram o jogo para o ocidente durante os séculos XVII e XVIII, e no século XX ele já havia se espalhado para praticamente todo canto do globo. A Sociedade Mundial de Pedra Papel Tesoura foi fundada em 1918 em Toronto e ainda realiza campeonatos mundiais anuais hoje, completos com patrocínio, dinheiro em prêmios e competidores viajando de dezenas de países.

## Como o jogo funciona no navegador

Esta versão de Pedra, Papel e Tesoura te coloca contra um oponente controlado por computador que escolhe sua jogada completamente ao acaso, com probabilidade igual para as três opções. Não há viés escondido, nenhum algoritmo de aprendizado, e nenhuma memória de rodadas anteriores. Cada jogo é estatisticamente independente. Clique em um dos três botões de emoji — punho, mão aberta ou dedos de tesoura — e o resultado aparece imediatamente. Uma pontuação corrente abaixo do tabuleiro rastreia quantas rodadas você venceu, quantas o computador venceu, e quantas terminaram em empate.

A aleatoriedade é implementada usando a função Math.random embutida do navegador, que gera um número pseudoaleatório e o mapeia para uma das três escolhas. Embora isso não seja aleatoriedade criptograficamente segura, é inteiramente suficiente para um jogo onde a distribuição de resultados é o que importa. Cada escolha aparece aproximadamente um terço das vezes ao longo de muitas rodadas, exatamente o que um oponente justo deveria fazer.

## Estratégia contra um oponente aleatório

Em termos matemáticos estritos, não há estratégia que supere jogar aleatoriamente quando seu oponente também joga aleatoriamente. Cada um dos nove resultados possíveis de rodada (três escolhas para você, três para o oponente) tem probabilidade igual de um nono. Entre esses nove resultados, exatamente três resultam em empate, três em vitória para você, e três em derrota, dando a cada lado uma chance de um terço de vencer qualquer rodada dada. Não importa qual sequência de jogadas você faça, a taxa de vitória esperada contra um oponente verdadeiramente aleatório é precisamente um terço.

Essa realidade matemática não impede as pessoas de tentar, é claro, e isso é parte do apelo. O cérebro naturalmente procura padrões mesmo em dados aleatórios, e muitos jogadores se convencem de que identificaram uma tendência nas escolhas do computador quando o que estão realmente vendo é ruído estatístico normal. Ao longo de cem rodadas, as contagens de vitórias, derrotas e empates vão se agrupar em torno de trinta e três cada, com flutuações tanto acima quanto abaixo dessa expectativa.

Contra oponentes humanos, porém, a estratégia se torna muito real. Pesquisas em ciência cognitiva e economia comportamental mostraram que as pessoas não são aleatórias. Elas exibem vieses previsíveis: tendem a repetir uma jogada vencedora, trocar de uma jogada perdedora, e escolher pedra mais frequentemente do que papel ou tesoura na primeira jogada. Jogadores competitivos exploram essas tendências.

## Pedra Papel Tesoura competitivo

Torneios profissionais de Pedra Papel Tesoura existem e atraem competidores sérios. Os campeonatos da Sociedade Mundial RPS acontecem desde 2002, com centenas de inscritos pagando taxas de entrada e competindo em chaves de eliminação. Nos níveis mais altos, competidores estudam seus oponentes ao longo de múltiplas rodadas, procurando qualquer desvio do jogo aleatório que possam explorar.

Usos notáveis do jogo fora do playground incluem um caso legal de 2006 na Flórida, onde um juiz ordenou que dois escritórios de advocacia que não conseguiam concordar sobre um local de reunião resolvessem a disputa com Pedra Papel Tesoura. A Christie's e a Sotheby's, as famosas leiloeiras, foram uma vez convidadas por uma empresa japonesa a competir por uma consignação de pinturas impressionistas usando o jogo. A Christie's consultou as filhas de seu presidente, que aconselharam ir com tesoura porque, raciocinaram, todo mundo sempre começa com pedra. Eles venceram.

## Usando o rastreador de pontuação

O painel de pontuação abaixo dos botões dá uma contagem corrente de vitórias, vitórias do computador e empates para sua sessão atual. Isso é útil se você quiser acompanhar seus resultados ao longo de uma amostra significativa de jogos. Algumas dezenas de rodadas são suficientes para ver se a distribuição está se aproximando da razão esperada de um terço.

## Por que o cérebro humano insiste em ver padrões

Mesmo sabendo, matematicamente, que a taxa esperada de vitória contra um oponente aleatório é exatamente um terço, é quase impossível resistir ao impulso de procurar um padrão depois de perder três rodadas seguidas para a mesma jogada. Esse impulso tem nome em psicologia — viés de padrão, ou pareidolia estatística — e é o mesmo mecanismo mental que faz as pessoas verem rostos em nuvens ou acreditarem em "sequências de sorte" em jogos de cassino puramente aleatórios.

## Privado e instantâneo

Nenhuma jogada é registrada ou enviada a lugar nenhum, e tudo roda inteiramente no seu navegador usando o gerador de números aleatórios embutido do JavaScript. Se quiser recomeçar do zero, basta recarregar a página e os contadores voltam a zero.
