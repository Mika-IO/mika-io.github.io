## Choisissez n'importe quelle couleur et obtenez son code instantanément

Les codes de couleur sont omniprésents en conception web, en design graphique et en programmation. Quand vous repérez une couleur que vous voulez utiliser ou reproduire, vous avez besoin de son code — que ce soit une valeur HEX pour du CSS, un triplet RVB pour Photoshop, ou une spécification TSL pour manipuler une couleur par programmation. Cet outil vous donne les trois formats à la fois pour n'importe quelle couleur choisie.

## Les trois formats de code couleur

**HEX (hexadécimal)** : le format le plus utilisé en développement web. Une chaîne de six caractères composée des chiffres 0-9 et des lettres A-F, précédée d'un dièse. Chaque paire de caractères représente un canal de couleur : #RRVVBB. Par exemple, #FF5733 a un rouge maximal (FF = 255), un vert modéré (57 = 87) et un bleu faible (33 = 51). Les codes HEX peuvent aussi s'écrire en version abrégée quand les deux caractères de chaque paire sont identiques : #FF5500 devient #F50.

**RVB (Rouge, Vert, Bleu)** : spécifie chaque canal de couleur sous forme d'un entier de 0 (absence) à 255 (maximum). C'est le format natif des écrans numériques, qui émettent de la lumière en rouge, vert et bleu. rgb(255, 87, 51) désigne exactement la même couleur que #FF5733. Les valeurs RVB s'utilisent en CSS (rgb(r, g, b)), en JavaScript, en Python et dans la plupart des logiciels de retouche d'image.

**TSL (Teinte, Saturation, Luminosité)** : un format plus intuitif pour un humain. La teinte est la couleur pure exprimée comme un angle de 0° à 360° sur un cercle chromatique : 0° = rouge, 120° = vert, 240° = bleu. La saturation indique à quel point la couleur est vive ou grisâtre (0 % = gris, 100 % = pleinement saturée). La luminosité indique si la couleur est claire ou sombre (0 % = noir, 100 % = blanc, 50 % = la couleur « normale » pleinement saturée). Le TSL est excellent pour ajuster des couleurs de façon méthodique : augmentez la luminosité pour créer des teintes plus claires, diminuez-la pour créer des nuances plus sombres.

## Comment utiliser le sélecteur

Cliquez ou touchez la pastille de couleur pour ouvrir le sélecteur natif de votre navigateur, choisissez une couleur visuellement ou saisissez une valeur connue, et les codes HEX, RVB et TSL se mettent tous à jour ensemble immédiatement, prêts à être copiés dans l'outil ou le code sur lequel vous travaillez. Comme le sélecteur utilise l'interface native du navigateur plutôt qu'une interface personnalisée, il se comporte exactement comme on peut s'y attendre et fonctionne de façon fiable sur tous les appareils.

## Quel format utiliser

**CSS et conception web** : HEX et RVB sont tous deux largement pris en charge, mais le TSL est de plus en plus privilégié car il est tellement plus intuitif à ajuster. Rendre une couleur 10 % plus claire est simple en TSL ; en RVB, cela demande de recalculer de nouvelles valeurs pour chaque canal.

**Design pour l'impression** : l'impression utilise généralement le CMJN (Cyan, Magenta, Jaune, Noir), que cet outil ne couvre pas. Pour une conversion du numérique vers l'impression, utilisez un logiciel professionnel comme Adobe Illustrator.

**Programmation** : le RVB est le format natif de la plupart des bibliothèques graphiques. Le TSL est utile lorsque vous voulez générer des palettes de couleurs par programmation.

## Notions de base sur la théorie des couleurs

Comprendre les couleurs permet d'utiliser cet outil plus efficacement :

**Couleurs complémentaires** : les couleurs opposées sur le cercle chromatique (à 180° d'écart) créent un contraste maximal. Rouge (0°) et cyan (180°).

**Couleurs analogues** : les couleurs adjacentes sur le cercle chromatique (à 30-60° d'écart) créent des palettes harmonieuses et à faible contraste.

**Couleurs triadiques** : trois couleurs réparties à égale distance, à 120° les unes des autres, créent des combinaisons vives et équilibrées.

**Teintes et nuances** : augmentez la luminosité TSL au-dessus de 50 % pour créer des teintes plus claires. Diminuez-la en dessous de 50 % pour créer des nuances plus sombres.

## Accessibilité et contraste

Les normes d'accessibilité du web exigent un contraste suffisant entre le texte et la couleur d'arrière-plan. Les directives WCAG 2.1 spécifient un rapport de contraste minimal de 4,5:1 pour le texte normal et de 3:1 pour le texte de grande taille. Utilisez les codes de couleur de ce sélecteur dans un vérificateur de contraste dédié pour confirmer l'accessibilité.

## Harmonies de couleurs pour le design

Au-delà des combinaisons de base déjà mentionnées, quelques autres associations reviennent souvent dans le travail de design. Un schéma monochrome utilise différentes nuances, teintes et tons d'une seule couleur, obtenus en faisant varier la luminosité TSL tout en gardant la teinte et la saturation constantes — une façon fiable de construire une palette cohérente sans aucun risque de dissonance. Un schéma complémentaire divisé associe une couleur de base aux deux couleurs adjacentes à son complément, offrant une bonne partie du contraste visuel d'une paire complémentaire classique, avec un rendu plus doux et plus nuancé.

## Accessibilité web et contraste des couleurs

Les directives d'accessibilité pour le contenu web définissent des exigences de rapport de contraste pour un texte lisible : le niveau AA exige au moins 4,5:1 pour le texte normal et 3:1 pour le texte de grande taille (18 points ou plus, ou 14 points en gras), tandis que le niveau AAA, plus strict, exige respectivement 7:1 et 4,5:1. Un contraste élevé entre le texte et l'arrière-plan compte pour toute personne malvoyante, et tout particulièrement pour les environ 8 % d'hommes et 0,5 % de femmes présentant une forme de déficience de la vision des couleurs, pour qui certaines paires de couleurs qui paraissent distinctes à la plupart des gens peuvent sembler quasi identiques.

## Les couleurs nommées en CSS

Le CSS définit 147 couleurs nommées utilisables directement à la place d'une valeur hexadécimale ou RVB, allant de noms évidents comme red, blue et black à des noms plus insolites comme cornflowerblue, papayawhip ou rebeccapurple — ce dernier nommé en 2014 en mémoire de Rebecca Meyer, la fille du développeur CSS Eric Meyer. Choisir une couleur avec cet outil et la comparer au nom CSS le plus proche est une façon rapide de vérifier si un nom standard existe déjà pour la teinte à peu près que vous avez en tête.

## Privé et instantané

Le sélecteur de couleur s'exécute entièrement dans votre navigateur à l'aide du composant natif de sélection de couleur, si bien que les résultats apparaissent instantanément et qu'aucune couleur que vous choisissez n'est jamais envoyée à un serveur, enregistrée ou partagée.
