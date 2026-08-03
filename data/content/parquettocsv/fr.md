## Ce que fait ce convertisseur

Apache Parquet est le format que votre chaîne de données écrit probablement : colonnaire, compressé, binaire, conçu pour les moteurs analytiques. Excellent pour une machine, inutilisable pour un œil humain. Impossible de l'ouvrir dans un éditeur de texte, de l'envoyer au collègue qui vit dans un tableur, ou de le coller dans un ticket. Le CSV, c'est l'inverse : maladroit pour l'analytique, lisible absolument partout.

Cette page fait le pont de la façon la plus directe possible. Vous choisissez un fichier `.parquet` sur votre disque, la page le décode, indique le nombre de lignes et de colonnes trouvées, affiche un aperçu et vous remet un CSV à télécharger. Pas de compte, pas de file d'attente, pas de barre d'envoi, puisque aucun serveur n'intervient à aucun moment.

C'est précisément la raison d'être de l'outil. La plupart des convertisseurs Parquet en ligne sont un formulaire qui envoie votre fichier vers un backend. Si le fichier contient des données clients, des salaires, des identifiants médicaux ou quoi que ce soit couvert par une politique de données, cet envoi est exactement le problème. Ici, la conversion est du JavaScript qui s'exécute dans votre onglet et lit des octets que le navigateur a déjà remis à la page au moment où vous avez sélectionné le fichier.

## Utilisation en quatre étapes

1. Choisissez votre fichier `.parquet` dans le champ prévu. Rien ne se passe avant.
2. Choisissez le séparateur. La virgule est la valeur par défaut ; le point-virgule convient aux tableurs configurés dans les langues où la virgule est le séparateur décimal, ce qui est le cas en français ; la tabulation produit un TSV qui se colle proprement dans la plupart des tableurs.
3. Décidez si la première ligne doit porter les noms de colonnes. La case d'en-tête est cochée par défaut, et la basculer régénère la sortie instantanément, sans relire le fichier.
4. Lisez l'aperçu, puis cliquez sur **Télécharger le CSV**. L'aperçu affiche les 200 premières lignes pour garder la page réactive ; le fichier téléchargé contient toujours l'intégralité des lignes du Parquet.

Changer le séparateur ou l'en-tête après une conversion ne relit pas le disque. La table décodée reste en mémoire dans l'onglet : ces bascules sont donc immédiates, même pour des centaines de milliers de lignes.

## Comment Parquet range une table, et pourquoi la conversion n'a rien de trivial

Un CSV est un flux de lignes. Parquet fait l'inverse : il range chaque colonne séparément, dans des blocs appelés row groups, et à l'intérieur d'un row group la colonne vit dans un chunk composé de pages. Chaque page peut être compressée, et les valeurs qu'elle contient peuvent être encodées de plusieurs manières.

Le lire suppose donc de dérouler plusieurs couches :

- Le **pied de fichier** contient le schéma et l'emplacement de chaque chunk, sérialisés avec le protocole compact de Thrift. Le fichier se termine par quatre octets de longueur et le marqueur ASCII `PAR1`, également présent tout au début. Si l'un des deux manque, soit ce n'est pas du Parquet, soit le fichier a été tronqué lors d'une copie.
- Chaque **page** peut être compressée. Cet outil décode les pages non compressées, Snappy et Gzip, qui couvrent ensemble l'écrasante majorité des fichiers écrits par pandas, PyArrow, Polars, DuckDB et Spark.
- Les valeurs d'une page sont **encodées**. Disposition plate, dictionnaire, run-length, la famille delta et byte-stream-split sont toutes prises en charge, en data page v1 comme dans le format v2 plus récent.
- Les **valeurs nulles** ne sont pas stockées comme des valeurs. Parquet enregistre un niveau de définition par ligne, et le convertisseur s'en sert pour remettre chaque valeur dans la bonne ligne et laisser vides les positions nulles.

Rien de tout cela n'a d'importance quand ça marche. Cela en a quand ça ne marche pas : parce que le décodeur comprend chaque couche, un fichier non pris en charge produit un message précis sur la compression, l'encodage ou l'imbrication, plutôt qu'un CSV silencieusement abîmé.

## Exemple résolu : les valeurs que vous verrez

Trois types Parquet n'ont pas d'équivalent direct en CSV ; autant savoir exactement ce qui est écrit.

**Une colonne date.** Le type `DATE` stocke un simple compteur 32 bits de jours depuis le 1er janvier 1970. Si le nombre stocké vaut 19723, alors 19723 jours après l'époque donnent le 1er janvier 2024, et la cellule CSV affiche `2024-01-01`. Aucun fuseau n'est appliqué : une date n'a pas d'heure à décaler.

**Un horodatage en microsecondes.** Une colonne `TIMESTAMP` en précision microseconde stocke un compteur 64 bits de microsecondes depuis l'époque. Prenez la valeur 1704112215123456. Divisée par 1 000 000, elle donne 1704112215 secondes entières, soit le 1er janvier 2024 à 12:30:15 UTC, et il reste 123456 microsecondes. La cellule affiche `2024-01-01 12:30:15.123456`. Les zéros de fin de la fraction sont supprimés : un horodatage tombant pile sur la seconde s'écrit sans partie décimale.

**Une colonne décimale.** Une colonne `DECIMAL(12,2)` est stockée sous forme d'entier accompagné d'une échelle. L'entier 1230 avec une échelle de 2 signifie 12,30, écrit littéralement `12.30`. C'est pour cette raison qu'une colonne financière ne doit jamais transiter par un flottant : le texte conserve la valeur exacte et le nombre exact de décimales promis par le schéma.

Les booléens s'écrivent `true` et `false`, les valeurs nulles deviennent des champs vides, et les colonnes binaires qui ne sont pas de l'UTF-8 valide sont écrites en base64, pour que des octets bruts ne cassent pas la structure du CSV.

## Là où un convertisseur hors ligne prend tout son sens

Le cas évident, c'est la confidentialité : un export d'enregistrements utilisateurs que vous devez survoler avant qu'il n'approche d'un disque partagé. Rien ne quitte le portable, donc aucune règle n'est contournée.

Le deuxième cas, c'est la friction. Un collègue envoie un extrait Parquet, vous voulez vérifier trois colonnes, et installer Python plus PyArrow pour inspecter un fichier que vous supprimerez dans cinq minutes est un prix absurde. Ouvrir un onglet, non.

Le troisième cas, c'est une machine que vous n'avez pas le droit de configurer : portable d'entreprise verrouillé, ordinateur d'un client, poste de laboratoire sans installation de paquets. Le navigateur, lui, est déjà là.

Le quatrième cas, c'est pédagogique. Voir la même table d'abord comme un bloc binaire opaque, puis comme du texte brut, rend concrète la différence entre stockage colonnaire et orienté ligne, ce qu'un schéma réussit rarement.

## Erreurs fréquentes et comment les éviter

**Ouvrir le CSV dans un tableur et n'obtenir qu'une colonne géante.** Votre tableur attend le séparateur de sa langue. Régénérez le CSV avec l'option point-virgule, ou passez par la boîte de dialogue d'import en indiquant explicitement le séparateur.

**Des identifiants numériques longs transformés en notation scientifique.** C'est le tableur, pas le CSV. Le fichier contient bien les chiffres ; le logiciel a choisi de les afficher comme un flottant. Importez la colonne en texte.

**Attendre l'heure locale.** Les horodatages sont écrits en UTC. Parquet les stocke généralement comme un instant, et les convertir vers le fuseau où se trouve votre machine modifierait silencieusement toutes les valeurs. Décalez-les ensuite, délibérément, si vous avez besoin d'heure locale.

**Fournir un export imbriqué.** Un fichier avec des colonnes struct, list ou map est refusé. Aplatissez-le d'abord avec `pandas.json_normalize`, avec `unnest` de Polars ou avec une requête DuckDB qui sélectionne les champs feuilles, écrivez un Parquet plat, puis convertissez celui-ci.

## Limites : quand cet outil n'est pas le bon

Il charge le fichier entier en mémoire : les très gros exports, à partir de quelques centaines de mégaoctets, se traitent mieux avec DuckDB ou un petit script qui parcourt les row groups en flux. Les compressions Zstd, Brotli et LZ4 sont refusées plutôt que décodées à moitié ; réécrivez ces fichiers en Snappy ou Gzip. Les fichiers Parquet chiffrés ne sont pas pris en charge, par choix. Et les schémas imbriqués restent hors périmètre, car aplatir une colonne de liste dans une cellule CSV est une décision sur vos données qu'un convertisseur générique n'a pas à prendre en silence.

## Confidentialité

La page ne contient aucun code d'envoi, ne mesure rien sur votre fichier et n'émet aucun appel réseau pendant la conversion. Le fichier est lu par l'API de fichiers du navigateur et décodé dans l'onglet. Si vous préférez une preuve à une promesse : chargez la page, coupez le réseau, convertissez un fichier. Le résultat est identique, parce qu'il n'y a jamais eu quoi que ce soit au bout du fil.
