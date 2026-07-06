## Crie gradientes CSS deslumbrantes sem nenhuma ferramenta de design

Gradientes são uma das formas mais eficazes de adicionar profundidade visual e estética moderna a um site. Os gradientes CSS não exigem arquivos de imagem e carregam instantaneamente porque são gerados pelo navegador.

## Tipos de gradientes CSS

**Gradientes lineares** fazem a transição em linha reta de uma cor para outra. O ângulo determina a direção: 0° vai de baixo para cima, 90° vai da esquerda para a direita.

CSS: linear-gradient(135deg, #667eea, #764ba2)

**Gradientes radiais** emanam para fora de um ponto central em formas circulares ou elípticas.

CSS: radial-gradient(circle, #667eea, #764ba2)

## Adicionando mais paradas de cor

O gerador usa duas cores, mas os gradientes CSS suportam qualquer número de paradas de cor em qualquer posição:

linear-gradient(135deg, #667eea 0%, #ff6b6b 50%, #764ba2 100%)

## Paletas de gradiente populares

Algumas combinações de gradiente muito apreciadas: Oceano (#2193b0 → #6dd5ed), Pôr do sol (#FF512F → #DD2476), Floresta (#134E5E → #71B280), Sonho roxo (#667eea → #764ba2), Fogo (#f7971e → #ffd200), Céu noturno (#0f0c29 → #302b63 → #24243e).

## Como usar o gerador

Escolha as suas duas cores usando os seletores de cor, ajuste o controle deslizante de ângulo para definir a direção da transição, e a pré-visualização se atualiza ao vivo para você ver exatamente como o gradiente fica antes de usá-lo em qualquer lugar. Quando estiver do jeito certo, copie o código CSS gerado com um clique e cole diretamente na sua folha de estilo — não há etapa de exportação, nenhuma imagem para baixar, e nenhum processo de build envolvido.

## Por que gradientes CSS superam gradientes de imagem

Antes de os gradientes CSS terem bom suporte, os designers precisavam exportar um gradiente como um arquivo de imagem PNG ou JPEG para usar em um site, o que acrescentava um arquivo extra para baixar, aumentava o peso da página, e ficava borrado ou com faixas visíveis em telas de alta resolução a menos que a imagem fosse cuidadosamente exportada em tamanho grande. Um gradiente CSS é calculado pelo próprio navegador na resolução que a tela exigir, então é sempre perfeitamente nítido, escala para qualquer tamanho sem nenhum arquivo extra, e pode ser mudado instantaneamente editando alguns caracteres de código em vez de reexportar uma imagem.

## Escolhendo cores que combinam bem

Um gradiente parece bem-acabado quando as duas cores compartilham alguma lógica visual em vez de colidir arbitrariamente. Uma abordagem comum e confiável é escolher duas cores próximas no círculo cromático (um par análogo, como azul passando para roxo) para uma sensação calma e coesa, ou duas cores em lados quase opostos (um par complementar, como laranja para azul) para um visual mais ousado e de maior contraste. Manter a luminosidade das duas cores razoavelmente parecida tende a produzir uma transição de aparência mais suave, enquanto uma grande diferença de luminosidade — um azul-marinho escuro para um amarelo pálido, por exemplo — cria um gradiente mais dramático e de maior energia. Experimentar diretamente na pré-visualização ao vivo é mais rápido do que raciocinar sobre teoria das cores no abstrato, já que você pode ver imediatamente se uma combinação funciona para o seu design específico.

## Suporte em todo navegador moderno

Gradientes lineares e radiais são suportados em todos os navegadores modernos sem nenhum prefixo de fornecedor. Versões mais antigas do Safari e do Chrome antes exigiam um prefixo -webkit- para os gradientes renderizarem corretamente, um resquício dos primeiros dias quando a sintaxe de gradiente CSS ainda estava sendo padronizada, mas isso não é mais necessário para nenhum navegador em uso comum há muitos anos, então a sintaxe simples e sem prefixo que este gerador produz funciona em todo lugar sem modificação.

## Tipos de gradientes CSS, continuação

Gradientes radiais são úteis para efeitos de holofote, estados de hover em botões e elementos focais centralizados. Você também pode especificar paradas em porcentagens específicas para controlar exatamente onde as transições acontecem, criando até divisões nítidas em vez de gradientes suaves quando esse efeito de design é desejado.

## Gradientes em texto e outros elementos

Além de fundos simples, gradientes podem ser aplicados ao próprio texto usando uma combinação de `background-clip: text` e uma cor de texto transparente, um efeito popular para títulos e logotipos que querem um tratamento colorido e chamativo sem recorrer a um arquivo de imagem. A mesma sintaxe de gradiente subjacente também funciona em bordas e pode ser combinada com máscaras CSS para efeitos de forma mais avançados, embora essas técnicas exijam um pouco mais de CSS de apoio do que um gradiente de fundo simples. Depois de ter um gradiente de que goste nesta ferramenta, vale saber que as mesmas paradas de cor podem ser reaproveitadas em vários desses efeitos diferentes para um design visualmente consistente.

## Combinando gradientes com imagens

O CSS permite combinar um gradiente com uma imagem de fundo usando várias camadas de fundo, sobrepondo um gradiente escuro semitransparente sobre uma imagem para melhorar a legibilidade do texto em seções de destaque, uma técnica muito usada em páginas iniciais de sites.

## Privado e instantâneo

Tudo roda inteiramente no seu navegador, então a pré-visualização se atualiza na hora conforme você ajusta cores ou ângulo, e nada sobre o gradiente que você projeta é enviado a um servidor, registrado ou compartilhado, nem mesmo temporariamente, o que o torna seguro para protótipos internos ou de clientes, mesmo com paletas de marca ainda não anunciadas publicamente, prontas para qualquer projeto que precisar delas.

