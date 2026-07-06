## Formate, valide e minifique JSON instantaneamente

JSON (JavaScript Object Notation) é o formato padrão de intercâmbio de dados para APIs web, arquivos de configuração e armazenamento de dados.

## JSON no desenvolvimento web, continuação

Linguagens do lado do servidor analisam JSON usando bibliotecas embutidas: o módulo json em Python, JSON.parse em JavaScript, json_decode em PHP, e bibliotecas como Gson ou Jackson em Java. Essa disponibilidade universal em praticamente toda linguagem de programação é uma das razões pelas quais o JSON se tornou o formato padrão de fato para troca de dados entre sistemas escritos em linguagens diferentes.

## O que é JSON?

JSON é um formato de dados baseado em texto que representa dados estruturados como pares chave-valor (objetos) e listas ordenadas (arrays). Foi derivado da sintaxe de objeto JavaScript, mas é independente de linguagem.

Exemplo de JSON válido:

    {
      "nome": "Alice",
      "idade": 30,
      "pontuacoes": [95, 87, 91],
      "ativo": true
    }

## Erros comuns de JSON

**Vírgula final**: Vírgulas após o último item em um objeto ou array não são permitidas em JSON.

**Nomes de propriedades devem ser strings**: JSON requer que todas as chaves de objeto sejam strings com aspas duplas.

**Aspas simples não são permitidas**: Strings JSON devem usar aspas duplas.

**Comentários não são permitidos**: Ao contrário do JavaScript, o JSON não suporta comentários.

## JSON no desenvolvimento web

As APIs web usam esmagadoramente JSON para corpos de solicitação e resposta. A API fetch() do navegador e XMLHttpRequest manipulam JSON nativamente.

## Uma breve história da ascensão do JSON

O JSON foi popularizado no início dos anos 2000 por Douglas Crockford, que documentou e nomeou um formato de dados que ele percebeu já estar implícito na própria sintaxe de literais de objeto do JavaScript, em vez de inventar algo totalmente novo. O seu momento coincidiu com o crescimento de aplicações web orientadas a AJAX que precisavam de uma forma leve de trocar dados entre navegador e servidor sem recarregar a página inteira, e a sua semelhança próxima com objetos JavaScript nativos significava que os navegadores podiam analisá-lo quase de graça. Essa combinação de simplicidade e bom momento é em grande parte por que o JSON superou o mais verboso XML como escolha padrão para APIs web em cerca de uma década.

## JSON vs XML

O JSON substituiu amplamente o XML como o formato dominante de intercâmbio de dados na web porque é mais compacto, mais fácil de ler, e mapeia naturalmente para as estruturas de dados da maioria das linguagens de programação (objetos e arrays).

## Estruturas aninhadas de relance

O valor real da formatação aparece quando objetos e arrays começam a se aninhar uns dentro dos outros vários níveis de profundidade, o que é comum em respostas de API reais. Um blob de JSON profundamente aninhado e minificado é quase impossível de rastrear a olho — combinar uma chave de abertura com a sua chave de fechamento correta várias linhas depois é exatamente o tipo de tarefa tediosa e sujeita a erro que um computador faz muito melhor que um humano. JSON formatado com indentação consistente transforma essa mesma estrutura em algo que você pode seguir visualmente, nível por nível, motivo pelo qual quase toda ferramenta de desenvolvedor que exibe JSON, das ferramentas de desenvolvedor do navegador a clientes de API, formata por padrão em vez de mostrar a string bruta e compacta que um servidor realmente enviou.

## Formatação (pretty-printing)

Uma string JSON "minificada" não tem espaço em branco desnecessário: `{"nome":"Alice","idade":30,"pontuacoes":[95,87,91],"ativo":true}`. Embora válido, isso é difícil de ler. "Pretty-printing" ou formatação acrescenta indentação e quebras de linha, com cada nível de aninhamento recuado por 2 ou 4 espaços, o que torna estruturas profundamente aninhadas fáceis de navegar visualmente.

## Como usar a ferramenta

Cole qualquer JSON na caixa de entrada e escolha formatar para vê-lo bem indentado e legível, ou minificar para remover todo espaço e quebra de linha desnecessários. Se o JSON contiver um erro, a ferramenta diz o que deu errado em vez de falhar silenciosamente, o que costuma ser a forma mais rápida de encontrar uma vírgula perdida ou um colchete faltando em um bloco grande de dados colado de um arquivo de log ou resposta de API.

## Por que formatar e minificar servem propósitos diferentes

Essas duas operações existem porque o JSON é lido por dois públicos bem diferentes. JSON formatado e indentado é para humanos: um desenvolvedor inspecionando uma resposta de API, depurando um arquivo de configuração, ou revisando dados durante o desenvolvimento se beneficia enormemente de uma indentação clara que torna a estrutura de objetos e arrays aninhados visível de relance. JSON minificado é para máquinas: remover todo espaço e quebra de linha desnecessários reduz o número de bytes que precisam ser transmitidos por uma rede ou armazenados em disco, o que importa quando um payload JSON é enviado milhares ou milhões de vezes por dia entre servidores.

## Validando antes de confiar nos dados

Além de tornar o JSON legível, esta ferramenta também o valida, o que importa porque um único caractere fora do lugar pode tornar um bloco de JSON que parece correto completamente impossível de interpretar. Em vez de escanear manualmente centenas de linhas em busca de uma vírgula faltando ou um colchete não fechado, colar o texto e deixar o analisador dizer exatamente onde falhou transforma uma busca visual tediosa em uma resposta instantânea e precisa, o que é especialmente valioso ao depurar um arquivo de configuração ou uma resposta de API que um programa se recusa a aceitar.

## Privado e instantâneo

Todo o processamento roda inteiramente no seu navegador, então formatar e minificar acontecem na hora e nenhum JSON que você cola é enviado a lugar nenhum, registrado ou compartilhado, e funciona offline depois que a página carrega.

