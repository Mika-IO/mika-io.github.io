## Converta Unix timestamps para datas legíveis por humanos

Desenvolvedores, administradores de banco de dados e qualquer pessoa que trabalhe com arquivos de log ou APIs regularmente encontra Unix timestamps — números longos como 1700000000 que representam um momento no tempo. Sem um conversor, esses números são sem sentido para a maioria das pessoas. Esta ferramenta converte qualquer Unix timestamp instantaneamente para uma data e hora legível, e também converte qualquer data de volta para seu Unix timestamp.

## O que é um Unix timestamp?

Um Unix timestamp conta o número de segundos decorridos desde meia-noite em 1° de janeiro de 1970, Tempo Universal Coordenado (UTC). Esse momento, chamado de epoch Unix, foi escolhido como ponto de referência quando os sistemas operacionais Unix estavam sendo desenvolvidos. A beleza dos Unix timestamps é que eles são independentes de fuso horário. Um timestamp representa exatamente o mesmo momento no tempo independentemente de onde no mundo você esteja.

## Milissegundos versus segundos

Alguns sistemas, particularmente navegadores web e aplicações JavaScript, usam milissegundos em vez de segundos para seus timestamps. Uma chamada JavaScript Date.now() retorna algo como 1700000000000 — um número cerca de 1000 vezes maior que o Unix timestamp equivalente em segundos. Se o número que você tem tem cerca de treze dígitos, provavelmente está em milissegundos: divida por 1000 e informe o resultado.

## Usos comuns

Timestamps aparecem em arquivos de log, registros de banco de dados, respostas de API, cabeçalhos de cache, certificados criptográficos e inúmeros outros contextos. Convertê-los para datas legíveis ajuda com depuração, análise de dados, auditoria de conformidade e qualquer situação em que você precisa entender quando algo aconteceu.

## Como usar o conversor

Para converter um timestamp em data, cole o número do timestamp no campo de cima. A data e hora em UTC e o equivalente no seu horário local aparecem imediatamente. Para converter uma data em timestamp, use o seletor de data na seção de baixo e o timestamp correspondente aparece na hora.

## Por que 1970 foi escolhido como ponto de partida

A escolha de 1º de janeiro de 1970 foi essencialmente prática, e não uma data com significado em si. O Unix estava sendo desenvolvido no fim dos anos 1960 e início dos anos 1970 no Bell Labs, e os projetistas precisavam de um ponto de referência recente o bastante para manter os números administráveis, mas cedo o bastante para cobrir a vida útil provável do sistema operacional. Arredondar para o início de 1970 foi simplesmente conveniente. Décadas depois, essa escolha arbitrária ficou profundamente embutida: ela sustenta como quase toda linguagem de programação, banco de dados e sistema operacional representa o tempo internamente, mesmo que a maioria dos programadores nunca precise pensar nisso diretamente.

## O problema do ano 2038

Sistemas Unix antigos armazenavam timestamps como inteiros de 32 bits com sinal, que conseguem guardar valores até 2.147.483.647. Esse valor máximo corresponde a 19 de janeiro de 2038 às 03:14:07 UTC. Sistemas que armazenam timestamps em inteiros de 32 bits vão estourar nessa data, um problema às vezes chamado de Y2K38. Sistemas modernos de 64 bits conseguem armazenar timestamps muito além do ano 292 bilhões, tornando isso um problema só para software legado que não foi atualizado.

## Timestamps negativos

Como um Unix timestamp é simplesmente uma contagem com sinal de segundos a partir do epoch, datas anteriores a 1º de janeiro de 1970 são representadas como números negativos em vez de não serem suportadas. Um timestamp de -86400, por exemplo, representa exatamente um dia antes do epoch: 31 de dezembro de 1969. Este conversor trata valores negativos da mesma forma que os positivos, o que é útil para trabalhar com registros históricos ou dados anteriores à era da computação, mas ainda armazenados em formato de Unix timestamp.

## Por que timestamps são independentes de fuso horário

A maior vantagem de armazenar um momento como um Unix timestamp em vez de uma string de data formatada é que isso contorna os fusos horários por completo durante o armazenamento e o cálculo. Um timestamp representa exatamente um instante físico, e só é traduzido para uma data de calendário local e hora do relógio no momento em que é exibido para uma pessoa. É por isso que bancos de dados, APIs e arquivos de log armazenam timestamps de forma esmagadora em vez de datas locais já formatadas: dois servidores em fusos horários diferentes podem comparar, ordenar e calcular diferenças entre timestamps com total confiança, e só precisam converter para um horário local legível no último passo, exatamente como este conversor faz ao mostrar o UTC e o seu equivalente local lado a lado.

## Depurando com timestamps

Desenvolvedores recorrem a um conversor como este o tempo todo enquanto depuram. Um log de erro de servidor marcado com 1700000000 não significa nada de relance, mas convertê-lo na hora diz se o erro aconteceu em horário comercial, durante a madrugada, ou no exato momento em que uma implantação foi publicada — muitas vezes a forma mais rápida de relacionar um relato de bug com a mudança que o causou. Respostas de API, colunas de auditoria de banco de dados e cabeçalhos de expiração de cache comumente armazenam timestamps em vez de datas formatadas pelo mesmo motivo que os mecanismos de armazenamento os preferem: um número simples ordena, compara e calcula corretamente sem nenhuma ambiguidade de idioma ou formato, e só precisa ser traduzido para uma data amigável ao ser humano no passo final de exibição, que é exatamente o trabalho que esta ferramenta faz.

## Privado

Tudo roda no seu navegador usando o objeto Date embutido do JavaScript, então a conversão é instantânea nas duas direções e nenhum timestamp ou data que você informa é enviado a um servidor, registrado ou compartilhado.

