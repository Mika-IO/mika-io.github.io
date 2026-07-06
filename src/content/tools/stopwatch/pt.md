## Um cronômetro preciso, direto no seu navegador

Cronometrar algo com precisão costumava exigir um cronômetro dedicado. Agora qualquer dispositivo com navegador cumpre essa função. Este cronômetro online roda inteiramente no seu navegador usando um temporizador de alta resolução, registra tempos de volta e exibe o tempo decorrido em minutos, segundos e milissegundos. Não há nada para baixar ou instalar.

## Como usar

Pressione o botão Iniciar para começar a cronometrar. O visor conta para frente em tempo real mostrando minutos, segundos e milésimos de segundo. Enquanto o cronômetro está rodando, pressione Volta para registrar o tempo decorrido atual como parcial. A lista de voltas se acumula abaixo do visor, numerando cada parcial para que você possa compará-las. Pressione Parar para pausar o cronômetro sem perder o tempo decorrido ou os registros de volta. Pressione Iniciar novamente para continuar de onde pausou. Pressione Reiniciar para limpar tudo e voltar a zero.

## Precisão e temporizadores do navegador

Navegadores modernos expõem um temporizador de alta resolução através da API Performance, que mede o tempo em frações de milissegundo. Isso é muito mais preciso do que a resolução de um milissegundo do método Date.now() mais antigo. Na prática, o temporizador é preciso a muito menos de um milissegundo na maioria dos dispositivos, o que é mais do que adequado para cronometragem esportiva, cozinha, apresentações ou qualquer uso cotidiano.

Uma limitação importante: se você mudar para outra aba do navegador, os navegadores podem limitar o JavaScript em segundo plano para economizar recursos. Isso pode fazer o cronômetro ficar levemente atrasado em relação ao tempo real decorrido. Mantenha a aba do cronômetro em foco para melhor precisão.

## Usos comuns

Atletas usam um cronômetro para marcar corridas, voltas na piscina, intervalos de ciclismo ou qualquer exercício repetitivo onde comparar parciais importa. Registros de volta ajudam a ver se você está mantendo o ritmo, melhorando ou cansando. Treinadores cronometram vários atletas sequencialmente e comparam resultados.

Na cozinha um cronômetro é mais flexível do que um timer de contagem regressiva quando você está equilibrando vários pratos que precisam de tempos diferentes. Você começa a cronometrar cada prato quando entra e anota o tempo de volta para saber há quanto tempo cada um está cozinhando.

## Apresentações e experimentos

Apresentações e discursos se beneficiam de um cronômetro corrente. Saber que você está em exatamente quatro minutos e trinta segundos ajuda a julgar se deve expandir ou condensar uma seção para atingir o seu tempo alvo. Cientistas e estudantes cronometrando experimentos apreciam a função de volta, que registra um ponto de dado sem precisar reiniciar o cronômetro para o próximo teste.

## Por que um cronômetro de navegador é genuinamente preciso

Vale entender por que uma ferramenta gratuita rodando em uma página web pode ser confiável para além de cronometragem casual. Navegadores modernos expõem um temporizador de alta resolução através da API Performance, distinto do método mais antigo e menos preciso Date.now(), capaz de medir tempo em frações de milissegundo. Na prática, isso significa que o temporizador se desvia bem menos de um milissegundo ao longo de uma sessão comum de cronometragem, mais do que suficiente para esporte, culinária, apresentações e trabalho de laboratório — a única ressalva é que os navegadores deliberadamente desaceleram o JavaScript rodando em uma aba em segundo plano para economizar bateria e CPU, então manter a aba do cronômetro ativa e em foco é o único hábito que preserva a sua precisão.

## Tempo de volta vs tempo parcial

Entusiastas de cronometragem às vezes distinguem entre um "tempo de volta" (a duração só daquele segmento, independente dos outros) e um "tempo parcial" (o tempo total decorrido acumulado até aquele ponto desde o início). Esta ferramenta registra parciais — cada tempo registrado é o tempo total decorrido no momento em que você apertou Volta —, que é a convenção mais comum em cronometragem casual e corresponde ao que a maioria das pessoas espera ao olhar para um cronômetro em andamento. Se você precisa das durações individuais de cada volta em vez dos parciais acumulados, subtraia cada tempo registrado do anterior a ele.

## Cronômetro vs o timer nativo do celular

Todo smartphone moderno já vem com um aplicativo de cronômetro, então é justo perguntar por que vale usar um baseado em navegador em vez disso. A resposta honesta é conveniência, não precisão superior: em um computador compartilhado, durante uma videochamada, ou embutido em um fluxo de trabalho que já vive em uma aba do navegador, abrir uma página web é mais rápido do que desbloquear um celular e achar o aplicativo certo, e a precisão de cronometragem subjacente da API Performance é comparável à de um aplicativo nativo para qualquer uso cotidiano fora de competição.

## Cronometrando várias atividades

Algumas situações pedem acompanhar mais de uma coisa ao mesmo tempo — vários pratos cozinhando com horários de início diferentes, ou vários trechos de um revezamento em uma corrida. Como este cronômetro mantém um único total corrente mais uma lista de voltas, a abordagem prática para várias atividades simultâneas é abrir a ferramenta em abas separadas do navegador, uma por atividade, cada uma começando de forma independente no momento em que a sua própria atividade começa.

## Reiniciando no meio de uma sessão

Se você apertar Reiniciar sem querer antes de salvar os tempos de volta que precisava, não há como desfazer — a contagem volta a zero imediatamente. Para qualquer sessão em que o histórico de voltas realmente importa, vale a pena anotar as parciais principais conforme acontecem, em vez de depender só da lista na tela sobreviver até o final.

## Privado e sempre disponível

Nenhum dado é enviado a lugar nenhum, o cronômetro roda inteiramente no seu navegador, funciona offline uma vez que a página carrega e não requer conta — recarregue a página a qualquer momento para reiniciar tudo de volta a zero.

