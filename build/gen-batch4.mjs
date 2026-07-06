#!/usr/bin/env node
// gen-batch4.mjs — creates missing content + new tools (finance, health, math)
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);

function write(rel, content) {
  const full = p(rel);
  mkdirSync(dirname(full), { recursive: true });
  if (existsSync(full)) { console.log(`  skip (exists): ${rel}`); return; }
  writeFileSync(full, content, 'utf8');
  console.log(`  wrote: ${rel}`);
}

function mkTool({ slug, category, icon, widget, en, pt, js }) {
  console.log(`\n[${slug}]`);
  write(`data/tools/${slug}.json`, JSON.stringify({ slug, category, icon, script: `${slug}.js`, widget, strings: { en, pt } }, null, 2));
  write(`public/assets/tools/${slug}.js`, js);
  write(`data/content/${slug}/en.md`, en._content);
  write(`data/content/${slug}/pt.md`, pt._content);
}

// ─── PT content for tools that already have EN but missing PT ───────────────

// alphabetizer - only PT missing
write('data/content/alphabetizer/pt.md', `# Organizador de Listas em Ordem Alfabética

Coloque qualquer lista de palavras, nomes ou frases e esta ferramenta as organiza instantaneamente em ordem alfabética — crescente ou decrescente. Funciona inteiramente no navegador, sem enviar dados para nenhum servidor.

## Como usar

Cole sua lista na caixa de texto, uma entrada por linha. Escolha a direção (A→Z ou Z→A) e clique em **Ordenar**. O resultado aparece imediatamente na caixa de saída, pronto para copiar.

## Por que ordem alfabética importa

Listas ordenadas facilitam a busca visual e a leitura. Um dicionário sem ordem alfabética seria inútil. Índices de livros, catálogos de produtos, listas de contatos — todos dependem de ordenação para funcionar bem.

## Ordenação sensível a maiúsculas

Por padrão, a maioria dos algoritmos de ordenação distingue maiúsculas de minúsculas: "Banana" vem antes de "abacate" porque "B" (maiúsculo) tem código Unicode menor que "a" (minúsculo). Esta ferramenta normaliza tudo para minúsculas antes de comparar, produzindo resultados mais naturais em português.

## Acentos e caracteres especiais

O português usa acentos (á, é, í, ó, ú, â, ê, ô, ã, õ, ç) que precisam ser considerados na ordenação. O método correto é usar a API \`Intl.Collator\` do JavaScript com locale \`pt-BR\`, que respeita as regras linguísticas do português brasileiro.

## Remover duplicatas

Ao ativar a opção "Remover duplicatas", a ferramenta elimina entradas idênticas (comparação insensível a maiúsculas). Útil para limpar listas de e-mails, tags ou nomes coletados de diferentes fontes.

## Ordenação por sobrenome

A opção "ordenar pela última palavra" é útil para listas de nomes completos onde você quer ordenar pelo sobrenome. "João Silva" e "Maria Andrade" são ordenados como "Andrade, Maria" e "Silva, João" — sem precisar reformatar manualmente.

## Aplicações práticas

- **Professores**: Organizar listas de alunos para chamada ou notas
- **Organizadores de eventos**: Ordenar lista de convidados para entrada
- **Redatores**: Ordenar termos de glossário ou lista de referências bibliográficas
- **Programadores**: Ordenar imports, variáveis ou chaves JSON
- **Pesquisadores**: Organizar referências bibliográficas antes de formatar com ABNT

## Algoritmos de ordenação

A ferramenta usa o método nativo \`.sort()\` do JavaScript com um comparador \`Intl.Collator\`. Internamente, o motor JavaScript moderno usa TimSort — um algoritmo híbrido derivado de merge sort e insertion sort, com complexidade O(n log n) no pior caso e O(n) para listas já parcialmente ordenadas.

## Limitações

Esta ferramenta ordena texto simples linha por linha. Para ordenar planilhas por coluna, use Excel, Google Sheets ou LibreOffice Calc. Para ordenar dados JSON ou CSV complexos, considere ferramentas especializadas ou scripts Python/Pandas.

## Privacidade total

Tudo acontece no seu navegador. Nenhum texto que você digitar ou colar é transmitido para qualquer servidor. A ferramenta funciona sem internet depois que a página carregar.

## Perguntas frequentes

**Quantas linhas posso ordenar?** Não há limite definido. Listas de até dezenas de milhares de linhas são processadas instantaneamente no navegador moderno.

**Funciona com números?** Sim, mas a ordenação é lexicográfica (textual), não numérica. "10" vem antes de "2" em ordem lexicográfica. Para ordenar numericamente, use uma planilha.

**Posso ordenar por vírgula em vez de linha?** No momento não — cada entrada deve estar em uma linha separada. Separe por vírgula e substitua vírgulas por quebras de linha antes de usar.
`);

// bintodec - only PT missing
write('data/content/bintodec/pt.md', `# Conversor de Bases Numéricas: Binário, Decimal, Hexadecimal e Octal

Converta números entre as quatro bases mais usadas em computação — binário (base 2), octal (base 8), decimal (base 10) e hexadecimal (base 16) — instantaneamente, direto no navegador.

## As quatro bases numéricas

### Decimal (base 10)
O sistema que usamos no dia a dia, com os dígitos 0–9. A posição de cada dígito representa uma potência de 10.

### Binário (base 2)
O sistema da eletrônica digital. Apenas os dígitos 0 e 1. Cada posição representa uma potência de 2. O número decimal 42 em binário é 101010.

### Octal (base 8)
Dígitos de 0 a 7. Cada dígito octal corresponde exatamente a 3 bits binários, tornando a conversão octal↔binário muito direta. Usado historicamente em Unix e permissões de arquivo (chmod 755).

### Hexadecimal (base 16)
Dígitos 0–9 e letras A–F (representando 10–15). Cada dígito hex corresponde a exatamente 4 bits. Amplamente usado para cores CSS (#FF5733), endereços de memória e hashes.

## Por que programadores usam hex?

Um byte (8 bits) vai de 00000000 a 11111111 em binário — difícil de ler. Em hex, vai de 00 a FF — muito mais compacto. Um endereço de memória de 32 bits ocupa 8 dígitos hex versus 32 dígitos binários.

## Permissões Unix em octal

O comando \`chmod 755\` usa octal: 7 = rwx (111 binário), 5 = r-x (101 binário). Cada grupo de 3 bits corresponde a um dígito octal, daí a conveniência histórica.

## Cores hexadecimais

\`#FF5733\` significa: R=FF (255), G=57 (87), B=33 (51). Cada par de dígitos hex representa um canal de cor de 0 a 255.

## Complemento de dois

Números negativos em computadores são representados em complemento de dois. Para -1 em 8 bits: inverta todos os bits de 00000001 → 11111110, depois some 1 → 11111111 = 0xFF. Por isso -1 em hex de 8 bits é 0xFF.

## Como funciona a conversão

A conversão entre bases passa pelo decimal como intermediário: converta da base de origem para decimal, depois do decimal para a base de destino. Cada dígito é multiplicado pela potência correspondente da base.

**Exemplo**: 1A3 hex para decimal:
- 1 × 16² = 256
- A(10) × 16¹ = 160
- 3 × 16⁰ = 3
- Total: 419

## Privacidade e uso offline

A conversão acontece inteiramente no JavaScript do navegador. Nenhum dado é enviado. Funciona sem internet após o carregamento da página.

## Perguntas frequentes

**Posso converter números negativos?** Esta ferramenta trabalha com inteiros não-negativos. Para complemento de dois, especifique o número de bits desejado.

**Qual o maior número que posso converter?** JavaScript usa ponto flutuante de 64 bits (IEEE 754), preciso até 2^53. Para criptografia ou valores maiores, use bibliotecas de big integer.

**Hexadecimal é maiúsculo ou minúsculo?** Ambos são válidos. A e a representam o mesmo valor 10. Por convenção, endereços de memória usam maiúsculas, cores CSS usam minúsculas.
`);

// bloodtype - only PT missing
write('data/content/bloodtype/pt.md', `# Compatibilidade de Tipos Sanguíneos

Descubra com quem você pode compartilhar sangue e de quem pode receber, de acordo com o seu tipo sanguíneo. A ferramenta exibe a tabela completa de compatibilidade do sistema ABO + fator Rh.

## O sistema ABO

O sistema ABO classifica o sangue em quatro tipos com base na presença de antígenos na superfície das hemácias:

- **Tipo A**: possui antígeno A e anticorpo anti-B
- **Tipo B**: possui antígeno B e anticorpo anti-A
- **Tipo AB**: possui antígenos A e B, sem anticorpos ABO
- **Tipo O**: sem antígenos A ou B, possui anticorpos anti-A e anti-B

## O fator Rh

O fator Rh é determinado pelo antígeno D. Rh+ (positivo) significa que o antígeno D está presente; Rh− (negativo) significa ausente. Quem é Rh− pode produzir anticorpos anti-D se exposto a sangue Rh+, o que é crítico em transfusões e gestações.

## Por que a compatibilidade importa

Transfusão de sangue incompatível desencadeia uma reação hemolítica: os anticorpos do receptor atacam as hemácias do doador, causando destruição em massa das células, insuficiência renal e, em casos graves, morte.

## Doador universal e receptor universal

**O− (O negativo)** é o doador universal: não tem antígenos ABO nem Rh, então qualquer pessoa pode receber esse sangue sem reação imunológica nos testes básicos. Por isso é usado em emergências quando o tipo do paciente é desconhecido.

**AB+ (AB positivo)** é o receptor universal: tem todos os antígenos, então não produz anticorpos contra nenhum tipo de sangue.

## Distribuição dos tipos sanguíneos no Brasil

| Tipo | Frequência aproximada |
|------|----------------------|
| O+   | ~36%                 |
| A+   | ~34%                 |
| B+   | ~8%                  |
| AB+  | ~2,5%                |
| O−   | ~9%                  |
| A−   | ~7%                  |
| B−   | ~2%                  |
| AB−  | ~0,5%                |

O tipo O+ é o mais comum no Brasil, influenciado pela miscigenação com populações indígenas (predominantemente O) e africanas.

## Herança genética

O tipo sanguíneo é determinado por dois alelos herdados, um de cada pai. Os alelos A e B são codominantes; O é recessivo. Exemplos:
- Pais A e B podem ter filhos A, B, AB ou O
- Dois pais O sempre geram filhos O
- Pais O e AB geram filhos A ou B, nunca O ou AB

## Compatibilidade para plaquetas e plasma

Plaquetas e plasma têm regras de compatibilidade diferentes das hemácias. O plasma de AB é compatível com qualquer receptor (plasma universal). Para plaquetas, prefere-se a correspondência ABO, mas a compatibilidade Rh é menos crítica.

## Doação de sangue no Brasil

O Hemocentro coleta sangue regularmente. Critérios mínimos: peso acima de 50 kg, idade entre 16 e 69 anos (menores com consentimento dos pais), hemoglobina adequada. A doação de sangue total pode ser feita a cada 60 dias para mulheres e 90 dias para homens.

## Perguntas frequentes

**Meu tipo sanguíneo muda ao longo da vida?** Não. O tipo sanguíneo é geneticamente determinado e permanece constante durante toda a vida, exceto em raríssimos casos de transplante de medula óssea.

**O− pode receber de qualquer tipo?** Não — O− só pode receber de O−. Ser doador universal não significa ser receptor universal.

**Diabetes ou hipertensão impedem a doação?** Depende do controle. Consulte o hemocentro mais próximo para verificar sua elegibilidade específica.
`);

// budget503020 - only PT missing
write('data/content/budget503020/pt.md', `# Calculadora da Regra 50/30/20

A regra 50/30/20 é um método simples e eficaz para organizar suas finanças pessoais. Divida sua renda líquida mensal em três categorias: 50% para necessidades, 30% para desejos e 20% para poupança e investimentos.

## O que é a regra 50/30/20?

Popularizada pela senadora americana Elizabeth Warren no livro "All Your Worth" (2005), esta regra propõe uma estrutura equilibrada para o orçamento pessoal sem exigir planilhas complexas ou contabilidade detalhada.

## Os três blocos

### 50% — Necessidades
Gastos essenciais que você não pode evitar facilmente:
- Aluguel ou prestação do imóvel
- Alimentação básica (mercado)
- Contas de água, luz, gás, internet
- Plano de saúde
- Transporte para o trabalho
- Prestações de dívidas necessárias

### 30% — Desejos
Gastos que melhoram a qualidade de vida mas não são essenciais:
- Restaurantes e delivery
- Assinaturas de streaming (Netflix, Spotify)
- Roupas além do necessário
- Lazer, viagens, hobbies
- Academia, cursos extras

### 20% — Poupança e Investimentos
Dinheiro que trabalha para seu futuro:
- Fundo de emergência (meta: 6 meses de despesas)
- Previdência complementar (PGBL, VGBL)
- Investimentos (Tesouro Direto, CDB, ações, FIIs)
- Quitação antecipada de dívidas com juros altos

## Como aplicar no Brasil

Use o salário líquido (já descontado IR, INSS e contribuições). Se recebe R$ 4.000 líquidos:
- Necessidades: R$ 2.000
- Desejos: R$ 1.200
- Poupança: R$ 800

## Ajustando para a realidade brasileira

Para quem mora em grandes centros como São Paulo ou Rio, o aluguel pode consumir mais de 50% sozinho. Nesse caso, ajuste para 60/20/20 ou foque em aumentar a renda. A regra é uma diretriz, não uma prisão.

## Fundo de emergência primeiro

Antes de qualquer investimento, construa um fundo de emergência equivalente a 3–6 meses de despesas básicas em renda fixa de alta liquidez (Tesouro Selic, CDB com liquidez diária). Isso evita que imprevistos destruam seu planejamento.

## Dívidas de alto custo

Cartão de crédito rotativo e cheque especial cobram juros de 200–400% ao ano no Brasil — os mais altos do mundo. Quitá-los é o melhor "investimento" possível. Redirecione toda a fatia de 20% para isso até zerar.

## Automação financeira

Configure transferência automática para uma conta separada no dia do recebimento do salário. Pagar-se primeiro elimina a tentação de gastar antes de poupar. Use contas digitais sem taxa (Nubank, Inter, C6) para facilitar a separação.

## Perguntas frequentes

**E se minhas necessidades passam de 50%?** Reduza os desejos primeiro. Se ainda assim não encaixar, o problema pode ser de renda — considere fontes extras.

**A poupança conta como investimento?** A caderneta de poupança rende abaixo da inflação historicamente no Brasil. Prefira Tesouro Selic ou CDBs de bancos médios para o fundo de emergência.

**A regra funciona para autônomos?** Sim. Autônomos devem separar INSS e impostos antes de calcular a renda disponível para a regra.
`);

// rockpaperscissors - only PT missing
write('data/content/rockpaperscissors/pt.md', `# Pedra, Papel e Tesoura — Jogue contra o Computador

O clássico jogo de mãos em versão digital. Escolha pedra, papel ou tesoura, e o computador escolhe aleatoriamente. Quem vence mais rodadas leva o placar!

## As regras do jogo

- **Pedra** vence Tesoura (quebra)
- **Tesoura** vence Papel (corta)
- **Papel** vence Pedra (embrulha)
- Mesma escolha = empate

## Origem histórica

O jogo surgiu na China durante a dinastia Han (206 a.C.–220 d.C.) como um jogo chamado "Shoushiling". Chegou ao Japão como "Jan-ken-pon" e foi exportado para a Europa pelos comerciantes holandeses no século XVII. No Brasil, é chamado de "Pedra, Papel e Tesoura" ou simplesmente "Par ou Ímpar com mãos".

## É realmente aleatório?

Em competições humanas, pedra, papel e tesoura envolve psicologia — jogadores tendem a repetir padrões, especialmente após uma perda. Pesquisas mostram que:
- Iniciantes jogam pedra com maior frequência (é o gesto mais natural)
- Após perder, jogadores tendem a trocar para a opção que teria batido o oponente
- Após vencer, tendem a repetir a mesma jogada

O computador desta ferramenta escolhe aleatoriamente usando \`Math.random()\`, sem memória de jogadas anteriores. Cada rodada é independente — nenhuma estratégia baseada em padrões anteriores funciona contra ele.

## Variações com mais opções

A versão "Pedra, Papel, Tesoura, Lagarto, Spock" (popularizada pelo seriado The Big Bang Theory, mas criada por Sam Kass em 1998) adiciona dois elementos extras, reduzindo empates de 1/3 para 1/5 das rodadas:
- Spock vence Tesoura (esmaga) e Pedra (vaporiza)
- Lagarto vence Spock (envenena) e Papel (come)

## Uso em decisões

"Jogar pedra, papel e tesoura" para decidir quem faz alguma coisa é uma aplicação justa e amplamente aceita. Estudos de teoria dos jogos mostram que, quando os dois jogadores seguem estratégia mista aleatória (cada opção com probabilidade 1/3), o resultado esperado é sempre neutro — nenhum dos dois tem vantagem.

## Campeonatos mundiais

Existe o World Rock Paper Scissors Championship, realizado anualmente em Toronto desde 2002. Os participantes estudam psicologia comportamental, padrões de oponentes e técnicas de "leitura" de intenções para ganhar vantagem nos duelos humanos.

## Aplicações além do lazer

- **Resolução de conflitos**: Equipes de trabalho usam para decisões rápidas sem debate
- **Criptografia**: O princípio de "equivalência não-transitiva" (A vence B, B vence C, C vence A) aparece em protocolos de segurança
- **Biologia evolutiva**: Relações ecológicas entre espécies às vezes seguem dinâmicas de pedra-papel-tesoura

## Privacidade

O jogo roda inteiramente no navegador. Nenhum dado é enviado para servidores.

## Perguntas frequentes

**O computador trapaceia?** Não. A escolha é feita com \`Math.random()\` puro, que é computacionalmente imprevisível e não leva em conta suas jogadas anteriores.

**Por que empato tanto?** Com estratégia aleatória pura de ambos os lados, a probabilidade de empate é sempre 1/3. Isso é matematicamente esperado.
`);

// tiktokcharcount - EN and PT missing
write('data/content/tiktokcharcount/en.md', `# TikTok Caption Character Counter

Count characters in your TikTok captions before posting. This tool shows your character count against TikTok's 2,200-character caption limit, your hashtag count, word count, and an estimated reading time — all in real time as you type.

## TikTok caption limits

TikTok allows up to **2,200 characters** in captions, including hashtags and spaces. While this is generous compared to Twitter's 280 characters, it still requires planning for longer captions. The first **150 characters** are visible without expanding, making the opening line critical for engagement.

## Why caption length matters

Short captions (under 100 characters) often perform well on TikTok because the visual content is the star. However, longer captions can improve SEO within the TikTok search algorithm, provide context for educational content, and include important disclosures required by advertising standards.

Research by social media analysts suggests that captions between 150–300 characters tend to generate higher engagement on TikTok, combining enough context with conciseness.

## Hashtag strategy

TikTok recommends using 3–5 relevant hashtags rather than filling the caption with dozens. The algorithm uses hashtags to categorize content for the "For You" page. Using too many generic hashtags (#fyp, #viral, #foryou) without niche-specific tags can actually hurt discoverability.

**Effective hashtag mix:**
- 1–2 broad hashtags (millions of views)
- 2–3 mid-tier hashtags (100k–1M views)
- 1–2 niche hashtags (under 100k views)

Niche hashtags deliver your content to the most relevant audience, which drives higher completion rates and signals quality to the algorithm.

## The "hook" in the first line

TikTok's caption preview shows roughly 150 characters before the "more" button. Your first line must hook viewers immediately. Effective techniques include:
- Ask a compelling question: "Did you know this plant can save your electricity bill?"
- Make a bold claim: "This one habit changed my sleep quality forever"
- Create urgency: "Stop making this mistake with your morning routine"

## Caption formatting tips

TikTok captions don't support rich formatting like bold or italic. However, you can:
- Use **line breaks** (press Enter) to improve readability
- Add **emojis** for visual breaks and personality
- Use **ALL CAPS** sparingly for emphasis
- Insert **spacing** between hashtag groups and the main text

## Accessibility considerations

Adding captions or at least a descriptive caption helps deaf and hard-of-hearing viewers understand your content. TikTok's auto-captioning feature is helpful but imperfect. A clear, descriptive caption supplements the auto-generated subtitles.

## Call-to-action placement

Include your call-to-action (CTA) early in long captions. Options like "Save this for later," "Follow for more," or "Link in bio" should appear before the "more" cutoff when possible, or at least be compelling enough that viewers tap to expand.

## Character encoding and emojis

Emojis count as 2 characters each in most character counting systems because they use multi-byte Unicode encoding. This tool counts them correctly using JavaScript's spread operator to handle Unicode code points rather than raw UTF-16 code units.

## Cross-platform caption strategy

If you're cross-posting to Instagram Reels (2,200 characters), YouTube Shorts (100 characters visible), and Facebook Reels (63,000 characters), TikTok's 2,200-character limit makes it a useful middle ground for drafting captions you'll then trim for YouTube.

## Privacy

Everything runs in your browser. Your caption text is never uploaded anywhere.

## FAQ

**Does TikTok count spaces?** Yes, spaces count toward the 2,200-character limit.

**Do hashtags count toward the limit?** Yes, hashtags are part of the caption and count toward the 2,200 character total.

**Can I use the same caption on Instagram?** Instagram allows 2,200 characters too, but the first visible line is shorter (around 125 characters). You may need to adjust the opening.
`);

write('data/content/tiktokcharcount/pt.md', `# Contador de Caracteres para Legendas do TikTok

Conte os caracteres da sua legenda do TikTok antes de publicar. Esta ferramenta mostra o número de caracteres em relação ao limite de 2.200 do TikTok, quantidade de hashtags, contagem de palavras e tempo estimado de leitura — em tempo real enquanto você digita.

## Limite de caracteres do TikTok

O TikTok permite até **2.200 caracteres** nas legendas, incluindo hashtags e espaços. Embora generoso em comparação com os 280 caracteres do Twitter, ainda exige planejamento para legendas mais longas. Os primeiros **150 caracteres** ficam visíveis sem expandir, tornando a abertura crucial para o engajamento.

## Por que o comprimento da legenda importa

Legendas curtas (menos de 100 caracteres) costumam ter bom desempenho no TikTok porque o conteúdo visual é o protagonista. No entanto, legendas mais longas podem melhorar o SEO dentro do algoritmo de busca do TikTok, fornecer contexto para conteúdo educativo e incluir divulgações exigidas por normas publicitárias.

## Estratégia de hashtags

O TikTok recomenda usar 3–5 hashtags relevantes em vez de encher a legenda com dezenas. O algoritmo usa hashtags para categorizar o conteúdo para a página "Para Você". Usar muitas hashtags genéricas (#fyp, #viral, #parati) sem tags de nicho pode prejudicar a descoberta.

**Mix eficaz de hashtags:**
- 1–2 hashtags amplas (milhões de visualizações)
- 2–3 hashtags médias (100 mil a 1 milhão de visualizações)
- 1–2 hashtags de nicho (menos de 100 mil visualizações)

## O "gancho" na primeira linha

A prévia da legenda do TikTok mostra cerca de 150 caracteres antes do botão "mais". Sua primeira linha deve fisgar os espectadores imediatamente:
- Faça uma pergunta instigante: "Você sabia que essa planta pode reduzir sua conta de luz?"
- Faça uma afirmação ousada: "Esse hábito mudou minha qualidade de sono para sempre"
- Crie urgência: "Pare de cometer esse erro na sua rotina matinal"

## Dicas de formatação

Legendas do TikTok não suportam negrito ou itálico. Mas você pode:
- Usar **quebras de linha** para melhorar a leitura
- Adicionar **emojis** para pausas visuais e personalidade
- Usar **MAIÚSCULAS** com moderação para ênfase
- Inserir **espaçamento** entre grupos de hashtags e o texto principal

## Acessibilidade

Adicionar uma legenda descritiva ajuda surdos e deficientes auditivos a entender seu conteúdo. A legenda automática do TikTok é útil mas imperfeita. Uma legenda textual clara complementa as legendas geradas automaticamente.

## Emojis e codificação de caracteres

Emojis contam como 2 caracteres na maioria dos sistemas de contagem porque usam codificação Unicode multibyte. Esta ferramenta conta corretamente usando o operador spread do JavaScript para lidar com pontos de código Unicode.

## Privacidade

Tudo roda no navegador. O texto da sua legenda nunca é enviado para nenhum servidor.

## Perguntas frequentes

**Espaços contam?** Sim, espaços contam para o limite de 2.200 caracteres.

**Hashtags contam para o limite?** Sim, hashtags fazem parte da legenda e contam para os 2.200 caracteres.

**Posso usar a mesma legenda no Instagram?** O Instagram também permite 2.200 caracteres, mas a primeira linha visível é mais curta (cerca de 125 caracteres). Pode ser necessário ajustar a abertura.
`);

// tweetcount - EN and PT missing
write('data/content/tweetcount/en.md', `# Twitter/X Character Counter

Count characters in your tweets before posting. This tool shows your character count against Twitter/X's 280-character limit in real time, with color-coded feedback as you approach the limit.

## Twitter's character limit history

Twitter launched in 2006 with a 140-character limit — chosen to fit within a single SMS message (160 characters minus 20 for the username). In November 2017, Twitter doubled the limit to 280 characters for most languages (Japanese, Chinese, and Korean kept 140 because their writing systems convey more information per character).

## What counts as characters on Twitter/X

Twitter counts characters, not bytes. Key rules:
- **URLs** always count as exactly 23 characters, regardless of actual length (Twitter wraps them with t.co)
- **Emojis** count as 2 characters each (they use 2 Unicode code points in the BMP)
- **Spaces** count as characters
- **Line breaks** count as characters (2 each)
- **@mentions** count fully as characters
- **Hashtags** count as characters

## The 280-character sweet spot

Studies by Twitter/X found that most tweets in languages that received the expanded limit still use fewer than 140 characters — users write concisely by habit. However, the extra space reduces the need to aggressively abbreviate, leading to clearer, more natural tweets.

Engagement research suggests tweets between 71–100 characters generate the highest engagement rates, while very long tweets (240–280 characters) perform worse on average. Use the extra space for clarity, not padding.

## Twitter threads

For content exceeding 280 characters, use threads: a connected series of tweets. Each tweet in a thread is its own post but linked together. Best practices for threads:
- Number your tweets (1/7, 2/7 etc.) so readers know the length
- Make the first tweet compelling as a standalone
- Use the last tweet for your CTA (call-to-action)

## Premium/Twitter Blue benefits

Twitter Blue (now X Premium) subscribers can post longer content — up to 25,000 characters — in an "article" format. Verified accounts also get longer video upload limits.

## Optimal tweet structure

1. **Hook** (first 70 characters): compelling statement or question
2. **Body**: the main information or argument
3. **CTA**: what you want the reader to do (retweet, reply, click link)
4. **Hashtags**: 1–2 relevant tags at the end (more than 2 looks spammy)

## ALT text for images

Twitter allows alt text for images (up to 1,000 characters) — this doesn't count toward your tweet's character limit. Adding alt text improves accessibility for screen reader users and may help with SEO.

## Privacy

Everything runs in your browser. Your tweet text is never uploaded anywhere.

## FAQ

**Can I go over 280 characters?** Only with Twitter Blue/X Premium subscription. The standard limit is strict at 280.

**Do line breaks count?** Yes, each line break counts as 1 character.

**How are CJK characters counted?** Japanese, Chinese, and Korean characters each count as 1 character in Twitter's system, which is why those languages still have a 140-character limit — they can convey more meaning per character.
`);

write('data/content/tweetcount/pt.md', `# Contador de Caracteres para Twitter/X

Conte os caracteres do seu tweet antes de publicar. Esta ferramenta mostra o número de caracteres em relação ao limite de 280 do Twitter/X em tempo real, com feedback visual codificado por cores conforme você se aproxima do limite.

## Histórico do limite de caracteres do Twitter

O Twitter foi lançado em 2006 com um limite de 140 caracteres — escolhido para caber em uma única mensagem SMS (160 caracteres menos 20 para o nome de usuário). Em novembro de 2017, o Twitter dobrou o limite para 280 caracteres para a maioria dos idiomas (japonês, chinês e coreano mantiveram 140 porque seus sistemas de escrita transmitem mais informação por caractere).

## O que conta como caracteres no Twitter/X

O Twitter conta caracteres, não bytes. Regras principais:
- **URLs** sempre contam como exatamente 23 caracteres, independentemente do comprimento real (o Twitter as encurta com t.co)
- **Emojis** contam como 2 caracteres cada
- **Espaços** contam como caracteres
- **Quebras de linha** contam como 1 caractere cada
- **@menções** contam completamente como caracteres
- **Hashtags** contam como caracteres

## O ponto ideal de 280 caracteres

Estudos do Twitter/X mostraram que a maioria dos tweets em idiomas que receberam o limite expandido ainda usa menos de 140 caracteres — os usuários escrevem de forma concisa por hábito. No entanto, o espaço extra reduz a necessidade de abreviações agressivas.

Pesquisas de engajamento sugerem que tweets entre 71–100 caracteres geram as maiores taxas de engajamento, enquanto tweets muito longos (240–280 caracteres) têm desempenho pior em média.

## Threads do Twitter

Para conteúdo além de 280 caracteres, use threads: uma série conectada de tweets. Melhores práticas:
- Numere seus tweets (1/7, 2/7 etc.) para que os leitores saibam o tamanho
- Faça o primeiro tweet atraente por si só
- Use o último tweet para seu CTA (chamada para ação)

## Estrutura ideal de tweet

1. **Gancho** (primeiros 70 caracteres): afirmação ou pergunta atraente
2. **Corpo**: a informação ou argumento principal
3. **CTA**: o que você quer que o leitor faça
4. **Hashtags**: 1–2 tags relevantes no final

## Privacidade

Tudo roda no navegador. O texto do seu tweet nunca é enviado para nenhum servidor.

## Perguntas frequentes

**Posso ultrapassar 280 caracteres?** Apenas com assinatura Twitter Blue/X Premium. O limite padrão é estritamente 280.

**Quebras de linha contam?** Sim, cada quebra de linha conta como 1 caractere.

**Como caracteres CJK são contados?** Caracteres japoneses, chineses e coreanos contam cada um como 1 caractere no sistema do Twitter, por isso esses idiomas ainda têm limite de 140 — eles transmitem mais significado por caractere.
`);

// aspectratio - js, en, pt missing
write('public/assets/tools/aspectratio.js', `(function () {
  'use strict';
  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
  function upd() {
    const w = parseFloat(document.getElementById('ar-w').value);
    const h = parseFloat(document.getElementById('ar-h').value);
    if (!w || !h || w <= 0 || h <= 0) { document.getElementById('ar-out').textContent = '—'; return; }
    const d = gcd(Math.round(w), Math.round(h));
    document.getElementById('ar-out').textContent = (w/d).toFixed(0) + ':' + (h/d).toFixed(0);
    // scale section
    const nw = parseFloat(document.getElementById('ar-nw').value);
    if (nw && nw > 0) document.getElementById('ar-nh').value = Math.round(nw * h / w);
    const nh2 = parseFloat(document.getElementById('ar-nh').value);
    if (nh2 && nh2 > 0 && !nw) document.getElementById('ar-nw').value = Math.round(nh2 * w / h);
  }
  document.getElementById('ar-w').addEventListener('input', upd);
  document.getElementById('ar-h').addEventListener('input', upd);
  document.getElementById('ar-nw').addEventListener('input', function() {
    const nw = parseFloat(this.value);
    const w = parseFloat(document.getElementById('ar-w').value);
    const h = parseFloat(document.getElementById('ar-h').value);
    if (nw && w && h) document.getElementById('ar-nh').value = Math.round(nw * h / w);
  });
  document.getElementById('ar-nh').addEventListener('input', function() {
    const nh = parseFloat(this.value);
    const w = parseFloat(document.getElementById('ar-w').value);
    const h = parseFloat(document.getElementById('ar-h').value);
    if (nh && w && h) document.getElementById('ar-nw').value = Math.round(nh * w / h);
  });
})();
`);

write('data/content/aspectratio/en.md', `# Aspect Ratio Calculator

Enter a width and height to instantly calculate the simplified aspect ratio. Use the scaling section to find equivalent dimensions at any new size while preserving the original ratio.

## What is an aspect ratio?

An aspect ratio expresses the proportional relationship between width and height as two integers separated by a colon. A 1920×1080 display has an aspect ratio of 16:9 — meaning for every 16 units of width there are 9 units of height.

## How simplification works

The calculator divides both numbers by their greatest common divisor (GCD). For 1920×1080: GCD(1920,1080) = 120. So 1920/120 = 16 and 1080/120 = 9, giving 16:9.

## Common aspect ratios

| Ratio | Common uses |
|-------|-------------|
| 1:1   | Instagram posts, profile pictures |
| 4:3   | Old TV standard, iPad screens |
| 16:9  | HD/4K video, YouTube, most monitors |
| 9:16  | TikTok, Instagram Stories, YouTube Shorts |
| 3:2   | 35mm photography, many DSLRs |
| 21:9  | Ultrawide monitors, cinemascope film |
| 2.39:1| Modern cinema (anamorphic widescreen) |

## Scaling while preserving ratio

If you have a 1920×1080 image and need it 1280 pixels wide: 1280 × (1080/1920) = 720 pixels tall. The scaling section does this math automatically — enter either dimension, and the corresponding dimension fills in instantly.

## Pixel density and display quality

Aspect ratio is about proportion, not about pixel count or display quality. A 480×270 image and a 3840×2160 image both have a 16:9 ratio, but the latter has 64× more pixels (4K vs SD). Always consider both aspect ratio and resolution for display contexts.

## Video production

Video production standardized on 16:9 after the HD transition. Shooting in 4K (3840×2160) at 16:9 and delivering in 1080p (1920×1080) means you can reframe or pan within the frame without losing the delivery resolution — a technique called "4K reserve."

## Photography

35mm film produces a 36mm×24mm frame, a 3:2 ratio. Most digital SLRs and mirrorless cameras maintain this ratio. Micro Four Thirds cameras use 4:3. When printing 4×6 inches (2:3) from a 3:2 sensor, the entire frame fits. Printing 5×7 (5:7) crops the sides slightly.

## Social media specifications

- **Instagram feed**: 1:1 (square), 4:5 (portrait), 1.91:1 (landscape)
- **Instagram Stories/Reels**: 9:16
- **TikTok**: 9:16
- **YouTube**: 16:9 (thumbnail 1280×720)
- **Twitter/X**: 16:9 or 1:1 (1200×675 or 1200×1200)
- **Facebook**: 1.91:1 for link previews (1200×630)
- **LinkedIn**: 1.91:1 (1200×627)

## Widescreen cinema evolution

Early cinema was nearly square (1.33:1 or 4:3). In the 1950s, Hollywood widened screens to compete with television. CinemaScope (2.55:1) and later anamorphic widescreen (2.39:1) became the prestige formats for epic films. Today IMAX uses a taller 1.43:1 ratio.

## Cropping vs letterboxing vs pillarboxing

When content doesn't match the display ratio:
- **Letterboxing**: black bars top and bottom (wide content on 4:3 screen)
- **Pillarboxing**: black bars left and right (4:3 content on wide screen)
- **Windowboxing**: bars on all four sides (both mismatches)
- **Cropping**: removing content from the sides or top/bottom

## Privacy

All calculations run in your browser. No data is sent anywhere.

## FAQ

**Why does my ratio show 16:9 instead of 1920:1080?** The calculator simplifies to the smallest equivalent ratio using GCD, which is the standard way to express aspect ratios.

**What if my dimensions aren't whole numbers?** The tool rounds to the nearest integer before calculating GCD. For very precise work (like pixel-perfect video editing), use your editing software's built-in ratio tools.

**Can I enter decimal dimensions?** Yes — the tool accepts decimals for real-world measurements (e.g., 29.7cm × 21cm for A4 paper = 1.41:1 or roughly √2:1).
`);

write('data/content/aspectratio/pt.md', `# Calculadora de Proporção de Tela (Aspect Ratio)

Digite uma largura e uma altura para calcular instantaneamente a proporção simplificada. Use a seção de escalonamento para encontrar dimensões equivalentes em qualquer novo tamanho, mantendo a proporção original.

## O que é aspect ratio?

Aspect ratio (proporção de tela ou relação de aspecto) expressa a relação proporcional entre largura e altura como dois números inteiros separados por dois-pontos. Uma tela de 1920×1080 tem proporção 16:9 — para cada 16 unidades de largura há 9 unidades de altura.

## Como funciona a simplificação

A calculadora divide ambos os números pelo máximo divisor comum (MDC). Para 1920×1080: MDC(1920,1080) = 120. Então 1920/120 = 16 e 1080/120 = 9, resultando em 16:9.

## Proporções comuns

| Proporção | Usos comuns |
|-----------|-------------|
| 1:1   | Posts do Instagram, fotos de perfil |
| 4:3   | TV antiga, telas de tablet |
| 16:9  | Vídeo HD/4K, YouTube, monitores |
| 9:16  | TikTok, Stories, YouTube Shorts |
| 3:2   | Fotografia 35mm, câmeras DSLR |
| 21:9  | Monitores ultrawide, cinema cinemascope |

## Escalonamento preservando proporção

Se você tem uma imagem 1920×1080 e precisa que tenha 1280 pixels de largura: 1280 × (1080/1920) = 720 pixels de altura. A seção de escalonamento faz essa conta automaticamente — insira qualquer dimensão e a outra preencherá instantaneamente.

## Especificações para redes sociais brasileiras

- **Instagram feed**: 1:1 (quadrado), 4:5 (retrato), 1.91:1 (paisagem)
- **Instagram Stories/Reels**: 9:16
- **TikTok**: 9:16
- **YouTube**: 16:9 (miniatura: 1280×720)
- **Twitter/X**: 16:9 ou 1:1
- **LinkedIn**: 1.91:1 (1200×627)

## Fotografias e impressão

O filme 35mm produz um quadro de 36mm×24mm, proporção 3:2. A maioria das câmeras digitais mantém essa proporção. Ao imprimir em 10×15cm (2:3), o quadro inteiro cabe. Imprimir em 13×18cm corta levemente as laterais.

## Cinema e televisão

O cinema primitivo era quase quadrado (4:3). Na década de 1950, Hollywood alargou as telas para competir com a televisão. O CinemaScope (2.55:1) e depois o widescreen anamórfico (2.39:1) tornaram-se os formatos de prestígio. O IMAX usa 1.43:1 — mais alto que o padrão widescreen.

## Letterbox e pillarbox

Quando o conteúdo não corresponde à proporção do display:
- **Letterbox**: barras pretas em cima e embaixo
- **Pillarbox**: barras pretas à esquerda e direita
- **Crop**: corte do conteúdo nas bordas

## Privacidade

Todos os cálculos rodam no navegador. Nenhum dado é enviado.

## Perguntas frequentes

**Por que aparece 16:9 em vez de 1920:1080?** A calculadora simplifica para a menor proporção equivalente usando MDC, que é a forma padrão de expressar proporções.

**Posso inserir dimensões decimais?** Sim — a ferramenta aceita decimais para medidas do mundo real (ex: 29,7cm × 21cm para papel A4 = aproximadamente √2:1).
`);

console.log('\n✓ Batch 4 (missing PT + aspectratio files) complete.');
