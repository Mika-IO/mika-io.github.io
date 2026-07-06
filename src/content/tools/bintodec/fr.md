## Convertissez des nombres entre toutes les bases instantanément

Ce convertisseur de bases numériques vous permet de saisir un nombre en binaire (base 2), en octal (base 8), en décimal (base 10) ou en hexadécimal (base 16) et d'en voir instantanément l'équivalent dans les quatre systèmes. Inutile de se souvenir de formules de conversion ou de faire un calcul mental compliqué : choisissez votre base de départ, tapez le nombre, et l'outil se charge du reste en temps réel.

## Pourquoi différentes bases numériques existent-elles ?

Les humains comptent naturellement en base 10 (décimal) parce qu'ils ont dix doigts. Mais les ordinateurs n'ont pas de doigts — ils fonctionnent avec des signaux électriques qui sont soit activés, soit non, ce qui donne naissance à la base 2 (binaire). D'autres bases sont apparues comme des raccourcis pratiques pour représenter le binaire : la base 8 (octal) regroupe trois chiffres binaires à la fois, et la base 16 (hexadécimal) en regroupe quatre, ce qui rend de longues chaînes binaires bien plus lisibles et faciles à manipuler pour les ingénieurs.

## Le binaire — base 2

Le binaire est le socle de l'informatique numérique. Chaque valeur stockée dans un ordinateur, chaque instruction exécutée par un processeur, chaque pixel affiché à l'écran se résout en définitive en une suite de 0 et de 1. Un seul chiffre binaire s'appelle un bit. Huit bits forment un octet. Comme les nombres binaires s'allongent vite — le nombre décimal 255 nécessite huit chiffres binaires (11111111) — les développeurs écrivent rarement du binaire brut. Ils préfèrent l'hexadécimal, bien plus compact.

Comprendre le binaire est indispensable pour les étudiants en informatique, les ingénieurs logiciels, et quiconque travaille près du matériel. La manipulation de bits — via des opérations comme ET, OU, OU exclusif et NON — est une technique courante en programmation système, en cryptographie et en traitement graphique.

## L'octal — base 8

L'octal utilise les chiffres de 0 à 7. Un chiffre octal représente exactement trois chiffres binaires, si bien que des groupes de trois bits correspondent proprement à un seul chiffre octal. Cela rendait l'octal très pratique à l'époque des ordinateurs centraux et des mini-ordinateurs, où la mémoire était souvent organisée en groupes de trois bits.

Aujourd'hui, l'usage le plus visible de l'octal se trouve dans les codes de permissions de fichiers sous Unix et Linux. Lorsque vous exécutez `chmod 755` sur un fichier, vous définissez des permissions en notation octale : 7 (rwx), 5 (r-x), 5 (r-x). Chaque chiffre encode trois bits de permission (lecture, écriture, exécution) pour le propriétaire, le groupe et les autres utilisateurs. Tout administrateur système ou développeur travaillant sous Linux croise ces permissions octales au quotidien.

## Le décimal — base 10

Le décimal est le système numérique de tous les jours, utilisé par pratiquement toutes les cultures humaines. Il utilise les chiffres de 0 à 9. Chaque position d'un nombre décimal représente une puissance de 10 : unités, dizaines, centaines, milliers, et ainsi de suite. Le décimal est le format par défaut pour tout ce qui s'adresse aux humains — soldes bancaires, températures, distances et horodatages s'affichent tous en décimal.

À l'intérieur d'un ordinateur, en revanche, le décimal coûte relativement cher à manipuler. Les processeurs travaillent nativement en binaire, si bien que représenter des nombres décimaux exige des schémas d'encodage comme le décimal codé binaire (DCB) ou des algorithmes de conversion. C'est pourquoi la plupart des calculs internes utilisent l'arithmétique binaire, et seul le résultat final est converti en décimal pour l'affichage.

## L'hexadécimal — base 16

L'hexadécimal étend l'ensemble des chiffres au-delà de 9 en utilisant les lettres A à F pour représenter les valeurs de 10 à 15. Un chiffre hexadécimal représente exactement quatre chiffres binaires (un quartet). Cela fait de l'hexadécimal une représentation extrêmement compacte des données binaires. L'octet 11111111 en binaire devient tout simplement FF en hexadécimal.

L'hexadécimal est omniprésent en informatique et en électronique. Les adresses mémoire dans les débogueurs, les codes de couleur en conception web (#FF6347 correspond au rouge tomate), les adresses MAC, les empreintes SHA et les listages de bytecode utilisent tous l'hexadécimal. Si vous avez déjà lu un vidage hexadécimal d'un fichier ou inspecté un paquet réseau, vous avez manipulé directement de l'hexadécimal.

## Comment fonctionne la conversion de base

Convertir un nombre de n'importe quelle base vers le décimal est assez direct : multipliez chaque chiffre par sa base élevée à la puissance de sa position (en comptant depuis la droite, à partir de 0), puis additionnez les résultats.

Par exemple, le nombre binaire 1011 se convertit en décimal ainsi :
1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11

Convertir du décimal vers une autre base demande des divisions successives : divisez le nombre par la base cible, notez le reste comme chiffre suivant (de droite à gauche), et répétez l'opération avec le quotient jusqu'à obtenir zéro.

Par exemple, pour convertir 11 en binaire :
11 ÷ 2 = 5 reste 1, 5 ÷ 2 = 2 reste 1, 2 ÷ 2 = 1 reste 0, 1 ÷ 2 = 0 reste 1. En lisant les restes de bas en haut : 1011.

## Applications concrètes

**Codes de couleur** : la conception web et graphique repose sur des codes de couleur hexadécimaux. Chaque couleur CSS comme #3A86FF correspond à trois paires de chiffres hexadécimaux encodant les canaux rouge, vert et bleu, chacun allant de 00 (0) à FF (255).

**Adresses réseau** : les adresses MAC et les adresses IPv6 s'écrivent en hexadécimal. Une adresse IPv6 comme 2001:0db8:85a3::8a2e:0370:7334 compresse 128 bits dans un format lisible par un humain, même s'il reste complexe.

**Débogage** : lorsqu'on parcourt du code assembleur ou qu'on inspecte la mémoire dans un débogueur, les adresses et les valeurs brutes s'affichent en hexadécimal. Savoir traduire rapidement entre hexadécimal et décimal — ou comprendre que 0xFF = 255 — est une compétence essentielle pour les développeurs bas niveau.

**Permissions** : les systèmes de fichiers Linux et macOS utilisent l'octal pour les permissions. Comprendre que 644 signifie que le propriétaire peut lire et écrire (4+2=6), alors que le groupe et les autres ne peuvent que lire (4), est indispensable pour l'administration de serveurs.

## Astuces de conversion mentale

Avec un peu de pratique, certaines conversions deviennent des réflexes :

- Binaire 1111 = Hexadécimal F = Décimal 15
- Binaire 1000 = Hexadécimal 8 = Décimal 8
- Hexadécimal FF = Décimal 255 = Binaire 11111111
- Hexadécimal 10 = Décimal 16 = Binaire 10000

Une astuce utile : découpez un nombre binaire en groupes de 4 en partant de la droite, et convertissez chaque groupe en un chiffre hexadécimal indépendamment. Pour 11111100, on obtient 1111 et 1100 → F et C → FC en hexadécimal.

## Privé et instantané

Tous les calculs s'exécutent entièrement dans votre navigateur. Aucune donnée n'est envoyée à un serveur. La conversion se fait localement à l'aide des méthodes natives de JavaScript, fiables pour tout entier situé dans la plage des entiers sûrs (jusqu'à 2⁵³ − 1).

## Foire aux questions

**Cet outil est-il gratuit ?** Oui, entièrement gratuit, sans inscription ni abonnement requis.

**Fonctionne-t-il sans connexion internet ?** Une fois la page chargée, l'outil fonctionne entièrement hors ligne.

**Puis-je l'utiliser sur mon téléphone ?** Oui. L'outil est optimisé pour mobile et fonctionne sur iOS comme sur Android.

**Quel est le plus grand nombre pris en charge ?** L'outil reste précis jusqu'à la limite des entiers sûrs de JavaScript (Number.MAX_SAFE_INTEGER, soit 9 007 199 254 740 991 en décimal).
