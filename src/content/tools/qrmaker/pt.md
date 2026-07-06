## Gere QR codes para qualquer coisa, na hora

QR codes estão em todo lugar: em cardápios de restaurantes, embalagens de produtos, cartões de visita, ingressos de eventos, cartazes e vitrines. Eles conectam o mundo físico e digital, permitindo que qualquer pessoa com um smartphone escaneie um código impresso e abra instantaneamente um site, salve um contato, conecte-se ao WiFi ou acesse qualquer outro recurso digital.

## Como os QR codes funcionam

Um QR code armazena dados como um padrão de quadrados pretos e brancos organizados em uma grade. Os quadrados codificam dados binários usando um esquema de codificação específico, e dados de correção de erros também são incluídos, o que permite que o código seja escaneado com sucesso mesmo que até 30% da sua superfície esteja danificada ou obscurecida. As câmeras de smartphones têm capacidade embutida de leitura de QR code nos seus aplicativos de câmera padrão, tanto no iOS quanto no Android — basta apontar a câmera para o código e uma notificação ou link aparece sem precisar de nenhum aplicativo separado.

## O que os QR codes podem codificar

**URLs**: O uso mais comum. Qualquer endereço da web pode ser codificado e escaneado diretamente para abrir no navegador do dispositivo.

**Credenciais de WiFi**: Uma string especialmente formatada pode codificar um nome de rede WiFi (SSID) e senha. Os convidados escaneiam o código e seu dispositivo conecta automaticamente.

**Informações de contato (vCard)**: O formato vCard codifica uma entrada de contato completa incluindo nome, telefone, e-mail e endereço.

**Texto simples**: QR codes podem conter qualquer mensagem de texto simples, exibida diretamente após o escaneamento sem abrir nenhum aplicativo.

## E-mail, SMS e links de loja de aplicativos

Além de URLs simples e credenciais de WiFi, um QR code pode codificar um link mailto: que abre o app de e-mail do usuário com um endereço já preenchido, ou um link sms: que abre uma mensagem de texto pré-endereçada a um número específico, ambos poupando o destinatário de digitar qualquer coisa. Linkar para a página de um app na App Store da Apple ou no Google Play é outro uso comum, permitindo que alguém escaneie um cartaz ou um encarte de embalagem para ir direto à página de download sem precisar buscar o aplicativo pelo nome.

## Como usar o gerador

Digite ou cole o texto, URL, detalhes de WiFi ou informação de contato que quer codificar, e o QR code aparece imediatamente na pré-visualização, atualizando ao vivo enquanto você edita. Escolha um tamanho adequado a como o código será usado — menor para uma tela ou um cartão de visita, maior para um cartaz ou qualquer coisa que será escaneada de mais longe — e baixe a imagem finalizada com um clique.

## Correção de erros e por que alguns QR codes têm logotipos

Todo QR code inclui dados de correção de erros junto com o conteúdo real que codifica, seguindo um esquema que permite ao código continuar escaneável mesmo que uma parte significativa dele esteja danificada, suja ou obscurecida. Dependendo do nível de correção de erro escolhido, um QR code tipicamente consegue sobreviver a algo entre 7% e 30% da sua superfície ilegível e ainda assim escanear corretamente. É exatamente por isso que às vezes você vê QR codes com um logotipo no meio: o logotipo cobre parte da área de dados, mas a correção de erros embutida reconstrói a informação faltante a partir do que resta, então o código continua funcionando desde que a área coberta fique dentro da tolerância que o nível de correção escolhido permite.

## Onde um QR code supera um link simples

Uma URL digitada em um cartaz ou uma página impressa é lenta e sujeita a erro para digitar à mão em um celular, especialmente uma longa e cheia de parâmetros de rastreamento, então um QR code existe especificamente para pular esse passo por completo — aponte a câmera, e o destino abre sem uma única tecla. É exatamente por isso que os QR codes se concentram em contextos físicos e offline: uma mesa de restaurante, um crachá de conferência, o rótulo de um produto, uma sinalização — qualquer lugar onde uma pessoa esteja parada em frente a algo físico e o caminho mais rápido para um recurso digital seja um escaneamento de câmera de dois segundos em vez de digitar cuidadosamente um endereço web que ela pode ver mas não pode clicar.

## Resolução de impressão e tamanho

Para materiais impressos, um QR code maior é mais fácil de escanear com confiabilidade. Como regra prática, a dimensão mínima deve ser de cerca de 1 cm para um QR code escaneado a 10 cm de distância. Para cartazes ou sinalizações escaneados a um metro ou mais de distância, o código deve ser significativamente maior — pelo menos 5 a 10 cm, para garantir uma leitura confiável mesmo em condições de luz ruins ou com a câmera do celular um pouco distante.

## QR codes estáticos vs dinâmicos

Um QR code gerado por esta ferramenta é estático: o conteúdo é codificado diretamente nos próprios quadrados pretos e brancos, então uma vez impresso, ele sempre aponta para o mesmo destino para sempre. Serviços comerciais às vezes vendem QR codes "dinâmicos", que na verdade codificam um link curto para um servidor intermediário que redireciona para onde você quiser, permitindo trocar o destino depois de impresso — uma conveniência real, mas que depende desse serviço intermediário continuar no ar, diferente de um QR code estático, que continua funcionando enquanto existir e a imagem impressa não estiver danificada.

## Privacidade

Este gerador cria QR codes inteiramente no seu navegador usando uma biblioteca JavaScript do lado do cliente, então o texto que você informa nunca é enviado a nenhum servidor, registrado ou compartilhado.

