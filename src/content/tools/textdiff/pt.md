## Compare dois textos e encontre as diferenças

Seja para revisar um documento revisado, verificar o que mudou em um contrato, comparar duas versões de um ensaio ou verificar que um copiar-colar foi preciso, uma ferramenta de diff de texto economiza tempo destacando exatamente o que mudou.

## Como funciona o diff no nível de palavras

A ferramenta usa o algoritmo de Subsequência Comum Mais Longa (LCS) — o mesmo algoritmo subjacente ao comando Unix diff e git diff.

Palavras mostradas em vermelho com tachado estão no original mas não na nova versão (excluídas). Palavras destacadas em verde estão na nova versão mas não no original (adicionadas).

## Usos comuns para comparação de texto

**Revisões de documentos**: Quando um colaborador devolve um documento revisado, veja rapidamente exatamente quais palavras ou frases mudaram.

**Revisão de contratos**: Profissionais jurídicos usam diff para rastrear alterações entre versões de contratos.

**Revisão acadêmica**: Compare um primeiro rascunho a um rascunho revisado para verificar se as edições pretendidas foram feitas corretamente.

## Limitações do diff no nível de palavras

Esta ferramenta compara palavras sem entender semântica. Uma frase inteiramente reescrita com o mesmo significado aparecerá totalmente como excluída e adicionada. A comparação também não distingue formatação, maiúsculas ou pontuação dentro das palavras a menos que façam parte do token da palavra — "Olá" e "olá" são tratadas como palavras diferentes.

## Como usar a ferramenta

Cole o texto original na primeira caixa e a versão revisada na segunda, e a comparação aparece imediatamente abaixo, com exclusões riscadas em vermelho e adições destacadas em verde. Não há botão para acionar a comparação — ela se atualiza ao vivo, então você pode colar uma nova versão a qualquer momento e ver imediatamente como ela difere da anterior.

## Por que comparação por palavra, não por caractere

Uma ferramenta de diff poderia teoricamente comparar caractere por caractere em vez de palavra por palavra, mas essa abordagem produz resultados tecnicamente precisos e praticamente inúteis: corrigir um único erro de digitação no meio de uma frase longa mostraria quase toda a frase restante como alterada, porque cada caractere depois da correção muda de posição. Comparar no nível de palavra faz uma única palavra corrigida aparecer como uma exclusão e uma adição, enquanto tudo o mais na frase que não mudou de fato fica corretamente intocado.

## Lendo um diff com eficiência

Ao revisar uma comparação longa, ajuda escanear aglomerados de cor em vez de ler cada palavra: um aglomerado apertado de vermelho e verde lado a lado geralmente indica uma reformulação pequena, enquanto um trecho longo e ininterrupto de uma única cor indica uma passagem genuinamente nova ou excluída, e não apenas uma edição. Ficar confortável com esse escaneamento de padrões é o que permite a editores experientes e revisores jurídicos processar um redline de várias páginas em poucos minutos, em vez de reler o documento inteiro linha por linha.

## Ferramentas de diff em código vs em prosa

Programadores usam ferramentas de diff baseadas em linha, como o git diff, constantemente, e vale entender por que um diff no nível de palavra como este é uma ferramenta diferente e complementar, não um substituto. Código-fonte é naturalmente organizado em linhas discretas, então comparar linha por linha é a granularidade certa — uma linha alterada é uma unidade de lógica alterada. Prosa não tem esse tipo de limite natural de linha; uma única frase pode quebrar em várias linhas dependendo da largura da janela, e a unidade significativa de mudança é a palavra ou a frase, não onde uma linha por acaso quebra. É exatamente por isso que comparar prosa exige uma abordagem no nível de palavra em vez de reaproveitar uma ferramenta de diff orientada a código e baseada em linha.

## Casos de uso na revisão de traduções

Tradutores e revisores bilíngues às vezes usam um diff de palavras para comparar duas versões da tradução do mesmo texto original — por exemplo, a versão de um tradutor humano contra uma tradução automática, ou duas revisões sucessivas do mesmo parágrafo — para localizar rapidamente exatamente onde as escolhas de palavra divergem, sem precisar reler o parágrafo inteiro em busca da diferença.

## Uma checagem rápida antes de confiar em um diff

Antes de confiar em um resultado de diff para algo importante — um documento jurídico, um trabalho corrigido — cole uma pequena mudança conhecida nas duas caixas primeiro e confirme que a ferramenta destaca exatamente essa mudança e nada mais, da mesma forma que você testaria uma balança de cozinha nova com um peso conhecido antes de confiar nela para uma receita.

## Comparando versões de contratos ao longo do tempo

Quando um contrato passa por várias rodadas de negociação, é fácil perder de vista exatamente o que mudou entre a versão que você enviou e a que voltou da outra parte. Colar as duas versões nesta ferramenta revela imediatamente cada cláusula alterada, sem precisar confiar apenas em anotações manuais ou na memória de qual parágrafo foi editado por último.

## Verificando um copiar-colar

Depois de copiar um trecho de texto de uma fonte para outra, colar ambas as versões aqui confirma em segundos que nada foi cortado ou alterado sem querer no processo, algo que revisar visualmente linha por linha facilmente deixaria passar em um texto longo.

## Privado e instantâneo

Todas as comparações rodam inteiramente no seu navegador usando o algoritmo de Subsequência Comum Mais Longa, então os resultados aparecem na hora e nenhum texto que você cola é enviado a nenhum servidor, registrado ou compartilhado.

