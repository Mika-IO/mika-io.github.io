## Gere hashes criptográficos para qualquer texto

Uma função de hash recebe qualquer entrada e produz uma impressão digital de comprimento fixo chamada hash ou digest. A mesma entrada sempre produz a mesma saída, mas mesmo uma única mudança de caractere produz um hash completamente diferente — uma propriedade chamada efeito avalanche.

## Assinaturas digitais, em detalhe

Assinar um documento digitalmente envolve calcular o hash do conteúdo e criptografar esse hash com a chave privada do assinante. Qualquer pessoa com a chave pública correspondente pode então recalcular o hash do documento recebido e verificar se ele bate com o hash decifrado da assinatura, confirmando tanto a autoria quanto que o conteúdo não foi alterado desde a assinatura.

## Controle de versão

O Git usa SHA-1 (em processo de migração para SHA-256) para identificar cada commit, arquivo e objeto no repositório. O hash é o identificador único de cada versão exata do conteúdo, o que permite ao Git detectar instantaneamente se dois arquivos são idênticos sem comparar byte a byte.

## Para que são usadas as funções de hash?

**Integridade de arquivos**: Sites de download publicam o hash SHA-256 de cada arquivo. Após o download, você computa o hash e compara com o valor publicado.

**Armazenamento de senhas**: Os sites nunca devem armazenar senhas em texto simples. Em vez disso, armazenam um hash e fazem o hash da sua tentativa de login para comparação.

**Assinaturas digitais**: Assinar um documento envolve fazer o hash dele e criptografar o hash com uma chave privada.

**Mineração de Bitcoin**: SHA-256 é usado no algoritmo de prova de trabalho do Bitcoin.

## SHA-256 vs SHA-1 vs MD5

**SHA-256**: Produz um hash de 256 bits (64 caracteres hexadecimais). Considerado criptograficamente seguro.

**SHA-1**: Padrão mais antigo produzindo um hash de 160 bits. Depreciado para fins de segurança desde 2017.

**MD5**: Produz um hash de 128 bits (32 caracteres hexadecimais). Criptograficamente quebrado — usado apenas para fins não relacionados à segurança.

## O efeito avalanche

Uma propriedade definidora das funções de hash criptográficas é que até mudanças minúsculas na entrada produzem saídas dramaticamente diferentes. "Hello" em SHA-256 começa com 185f8db3..., enquanto "hello" começa com 2cf24dba... — os dois hashes não compartilham nenhuma relação visível apesar de diferirem apenas na capitalização. Esse é o efeito avalanche, e é exatamente o comportamento que torna os hashes úteis para detectar até a menor alteração em um arquivo ou texto.

## Como usar a ferramenta

Digite ou cole qualquer texto na caixa de entrada e os três hashes — SHA-256, SHA-1 e MD5 — aparecem imediatamente abaixo dela, recalculando a cada tecla pressionada. Isso facilita verificar a soma de verificação publicada de um arquivo, gerar um identificador único rápido para um trecho de texto, ou simplesmente explorar como o efeito avalanche se comporta editando a sua entrada um caractere de cada vez e observando cada hash mudar completamente.

## Por que você não pode reverter um hash

Uma função de hash criptográfica é deliberadamente projetada para destruir informação de uma forma específica: ela pega uma entrada de qualquer tamanho e a comprime para uma saída curta e fixa, descartando muito mais informação do que mantém. Como incontáveis entradas diferentes poderiam teoricamente se comprimir para a mesma saída curta, não existe uma operação inversa única para recuperar a entrada original a partir do hash — o processo só funciona em uma direção. A única forma de achar uma entrada que produza um determinado hash é testar entradas candidatas uma após a outra e checar se alguma delas coincide, que é exatamente por que fazer hash de senhas em vez de armazená-las diretamente é eficaz: mesmo que um hash seja roubado, recuperar a senha original a partir dele é computacionalmente inviável para um algoritmo de hash bem escolhido e uma senha suficientemente longa.

## Função unidirecional

Hashes são unidirecionais: você pode calcular um hash a partir de uma entrada, mas não pode reverter o processo para recuperar a entrada a partir do hash. A única forma de "quebrar" um hash é tentar muitas entradas (força bruta ou ataque de dicionário) e ver qual delas produz o mesmo hash — computacionalmente inviável para um algoritmo bem escolhido e uma entrada suficientemente complexa.

## Escolhendo o hash certo para a tarefa

Para qualquer coisa relacionada à segurança hoje — armazenamento de senhas, assinaturas digitais, verificar se um arquivo baixado não foi adulterado — SHA-256 ou um membro mais forte da família SHA-2 ou SHA-3 é a escolha apropriada, já que tanto SHA-1 quanto MD5 têm fraquezas conhecidas que um atacante determinado pode explorar. SHA-1 e MD5 continuam úteis apenas em contextos onde a segurança não é o ponto: uma verificação rápida para pegar corrupção acidental, uma forma rápida de gerar uma chave curta e única para uma consulta em cache, ou compatibilidade com um sistema mais antigo que não foi atualizado. Na dúvida sobre qual usar para qualquer coisa que importe, SHA-256 é quase sempre o padrão mais seguro.

## Privado e instantâneo

SHA-256 e SHA-1 são computados usando a Web Crypto API integrada do navegador, e o MD5 é computado usando uma implementação pura em JavaScript, então cada hash aparece na hora e nenhum texto que você informa é enviado a lugar nenhum, registrado ou compartilhado, e funciona offline depois que a página carrega, sem limite de quantos hashes você gera.

