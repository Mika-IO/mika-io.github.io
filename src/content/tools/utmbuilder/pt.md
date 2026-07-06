## Crie URLs com tags UTM para rastreamento preciso de campanhas

Os parâmetros UTM são a forma padrão de dizer a plataformas de análise como o Google Analytics exatamente de onde o tráfego do site vem. Sem tags UTM, o tráfego da sua newsletter, posts de redes sociais e anúncios pagos parecem todos iguais na análise.

## O que são parâmetros UTM?

UTM significa Urchin Tracking Module. Os parâmetros UTM são pares chave-valor adicionados a uma URL como uma string de consulta. Quando alguém clica neste link e chega ao seu site, o Google Analytics registra todos os parâmetros junto com os dados da visita.

## Os cinco parâmetros UTM

**utm_source** (obrigatório): Identifica de onde o tráfego vem. Exemplos: newsletter, facebook, google, linkedin.

**utm_medium** (obrigatório): Descreve o canal de marketing. Exemplos: email, social, cpc, organico.

**utm_campaign** (obrigatório): Nomeia a campanha de marketing específica. Exemplos: venda_verao_2024.

**utm_term** (opcional): Usado principalmente para busca paga para identificar a palavra-chave.

**utm_content** (opcional): Usado para testes A/B ou para diferenciar links na mesma campanha.

## Boas práticas para nomenclatura UTM

**A consistência é crítica**: utm_source=Email e utm_source=email são tratados como duas fontes diferentes.

**Use minúsculas**: A maioria das equipes usa tudo em minúsculas com sublinhados ou hífens.

## Não use UTM em links internos

Parâmetros UTM reiniciam a sessão no Google Analytics. Links internos com UTM atribuirão o tráfego incorretamente, fazendo parecer que um visitante chegou de uma nova fonte externa quando na verdade só clicou em um link dentro do próprio site.

## Exemplos comuns de URL de campanha

Newsletter: utm_source=newsletter&utm_medium=email&utm_campaign=resumo_semanal. Anúncio no Facebook: utm_source=facebook&utm_medium=cpc&utm_campaign=reconhecimento_marca. Post no LinkedIn: utm_source=linkedin&utm_medium=social&utm_campaign=lancamento_produto. QR code em um panfleto: utm_source=panfleto&utm_medium=qr_code&utm_campaign=evento_2024.

## Como usar o construtor

Informe a sua URL de destino e preencha os campos de origem, meio e campanha, acrescentando termo e conteúdo se a sua campanha precisar deles, e a URL completa com tags aparece imediatamente, corretamente codificada e pronta para copiar em um e-mail, uma plataforma de anúncios ou um post. Construí-la assim remove os dois erros mais comuns que as pessoas cometem digitando links UTM à mão: um erro de digitação no nome de um parâmetro que a análise silenciosamente deixa de reconhecer, e capitalização inconsistente que divide o que deveria ser uma única fonte de tráfego em várias que parecem diferentes em um relatório.

## Por que a consistência importa mais que os nomes exatos escolhidos

Plataformas de análise tratam valores UTM como strings literais em vez de interpretar o seu significado, então "Newsletter", "newsletter" e "news_letter" são registrados como três fontes completamente separadas, mesmo que um humano lendo o relatório reconhecesse que são a mesma coisa. Essa é a forma mais comum pela qual o rastreamento UTM silenciosamente quebra dentro de equipes de marketing maiores: todos concordam com o conceito, mas ninguém impõe a grafia exata, e meses depois o relatório de análise está fragmentado em uma dúzia de linhas quase duplicadas que significam todas a mesma campanha.

## UTM e rastreamento nativo de plataforma

Algumas plataformas de anúncio, incluindo Google Ads e Facebook Ads, oferecem seus próprios sistemas automáticos de marcação (gclid, fbclid) que podem duplicar ou entrar em conflito com parâmetros UTM construídos manualmente se ambos forem usados sem cuidado no mesmo link. A boa prática geral é deixar a marcação automática da plataforma cuidar da atribuição específica daquela plataforma, enquanto usa parâmetros UTM para a história mais ampla em nível de campanha que você quer ver no Google Analytics — a origem, o meio e o nome da campanha —, já que os parâmetros UTM são o único esquema de marcação que praticamente toda plataforma de análise entende de forma consistente, não importa qual rede de anúncios de fato serviu o clique.

## Auditando seus links UTM antes do lançamento

Antes de uma campanha ir ao ar, vale testar cada link com tag UTM exatamente como um destinatário o encontraria: cole a URL completa em uma janela anônima do navegador e confirme que ela chega na página pretendida com as tags intactas, já que alguns sistemas de gerenciamento de conteúdo e encurtadores de link silenciosamente removem parâmetros de consulta durante um redirecionamento. Uma campanha que parece perfeitamente marcada no construtor, mas perde os parâmetros UTM em algum ponto de uma cadeia de redirecionamento, será registrada como tráfego "direto" na análise, apagando silenciosamente a atribuição exata que as tags deveriam fornecer.

## Mantendo uma referência de nomenclatura compartilhada

Equipes maiores se beneficiam de manter um documento de referência simples e compartilhado listando os valores exatos aprovados para utm_source e utm_medium — "email", não "Email" ou "e-mail" —, para que todos que constroem links de campanha, não importa qual ferramenta usem, produzam valores UTM que se consolidem de forma limpa nas mesmas linhas de um relatório de análise em vez de se fragmentarem em quase duplicatas ao longo do tempo.

## Encurtadores de link e parâmetros UTM

Ao passar uma URL com tags UTM por um encurtador de link antes de publicá-la, confirme que o encurtador escolhido preserva a string de consulta completa no redirecionamento — alguns serviços gratuitos truncam ou removem parâmetros extras, o que apagaria silenciosamente todo o rastreamento que você acabou de configurar sem nenhum aviso de erro.

## Privado e instantâneo

A URL é construída inteiramente no seu navegador, então aparece na hora enquanto você digita e nada que você informa é enviado a nenhum servidor, registrado ou compartilhado.

