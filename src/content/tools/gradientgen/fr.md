## Créez de superbes dégradés CSS sans aucun outil de design

Les dégradés comptent parmi les moyens les plus efficaces d'apporter de la profondeur visuelle et une esthétique moderne à un site web. Les dégradés CSS ne nécessitent aucun fichier image et se chargent instantanément, car ils sont générés directement par le navigateur. Ce générateur vous permet de concevoir un dégradé visuellement en choisissant des couleurs et en ajustant l'angle, puis copie exactement le code CSS dont vous avez besoin pour l'utiliser.

## Types de dégradés CSS

**Les dégradés linéaires** passent en ligne droite d'une couleur à une autre. L'angle détermine la direction : 0° va du bas vers le haut, 90° va de gauche à droite, 180° va du haut vers le bas, et 270° va de droite à gauche. Les angles les plus courants en design sont 135° (diagonal) et 90° (horizontal). N'importe quel angle entre 0° et 360° est valide.

CSS : linear-gradient(135deg, #667eea, #764ba2)

**Les dégradés radiaux** rayonnent vers l'extérieur depuis un point central, sous des formes circulaires ou elliptiques. Ils sont utiles pour des effets de projecteur, des états de survol de boutons, ou des éléments centraux mis en avant.

CSS : radial-gradient(circle, #667eea, #764ba2)

## Prise en charge des dégradés dans tous les navigateurs modernes

Les dégradés linéaires et radiaux sont pris en charge dans tous les navigateurs modernes sans aucun préfixe propriétaire. D'anciennes versions de Safari et de Chrome exigeaient autrefois un préfixe -webkit- pour que les dégradés s'affichent correctement, un vestige de l'époque où la syntaxe CSS des dégradés était encore en cours de normalisation, mais cela n'est plus nécessaire sur aucun navigateur d'usage courant depuis de nombreuses années désormais, si bien que la syntaxe simple, sans préfixe, produite par ce générateur fonctionne partout sans modification.

## Ajouter davantage de points de couleur

Le générateur utilise deux couleurs, mais les dégradés CSS prennent en charge un nombre quelconque de points de couleur à n'importe quelle position. Pour ajouter une troisième couleur à mi-parcours :

linear-gradient(135deg, #667eea 0%, #ff6b6b 50%, #764ba2 100%)

Vous pouvez aussi préciser des points à des pourcentages spécifiques pour contrôler où se produisent les transitions :

linear-gradient(90deg, #000000 0%, #000000 50%, #ff0000 50%, #ff0000 100%)

Cela crée une rupture nette plutôt qu'un dégradé — utile pour certains effets de design.

## Palettes de dégradés appréciées

Quelques combinaisons de dégradés très populaires :
- **Océan** : #2193b0 → #6dd5ed
- **Coucher de soleil** : #FF512F → #DD2476
- **Forêt** : #134E5E → #71B280
- **Rêve violet** : #667eea → #764ba2
- **Feu** : #f7971e → #ffd200
- **Ciel nocturne** : #0f0c29 → #302b63 → #24243e

## Utiliser des dégradés en CSS

La propriété raccourcie background, ou la propriété background-image, accepte directement les fonctions de dégradé :

    .header {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

Les dégradés peuvent aussi s'appliquer à du texte, à des bordures et à des calques de masquage grâce à des techniques CSS plus avancées.

## Combiner des dégradés avec des images

Le CSS permet de combiner un dégradé avec une image d'arrière-plan à l'aide de plusieurs calques d'arrière-plan :

    .hero {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('photo.jpg') center/cover;
    }

Cela superpose un dégradé sombre semi-transparent sur une image, ce qui améliore la lisibilité du texte sur les sections d'en-tête.

## Comment utiliser le générateur

Choisissez vos deux couleurs à l'aide des sélecteurs de couleur, ajustez le curseur d'angle pour définir la direction de la transition, et l'aperçu se met à jour en direct pour que vous voyiez exactement à quoi ressemble le dégradé avant de l'utiliser où que ce soit. Une fois le rendu satisfaisant, copiez le code CSS généré d'un clic et collez-le directement dans votre feuille de style — pas d'étape d'export, pas d'image à télécharger, pas de processus de compilation.

## Pourquoi les dégradés CSS surpassent les dégradés en image

Avant que les dégradés CSS ne soient bien pris en charge, les designers devaient exporter un dégradé sous forme de fichier image PNG ou JPEG pour l'utiliser sur un site web, ce qui ajoutait un fichier supplémentaire à télécharger, alourdissait le poids de la page, et paraissait flou ou marqué de bandes sur les écrans haute résolution, sauf à exporter l'image dans une très grande taille. Un dégradé CSS est calculé par le navigateur lui-même, à la résolution exacte requise par l'écran, si bien qu'il reste toujours parfaitement net, s'adapte à n'importe quelle taille sans fichier supplémentaire, et peut être modifié instantanément en éditant quelques caractères de code plutôt qu'en réexportant une image. C'est pourquoi pratiquement tous les sites web modernes utilisent des dégradés CSS plutôt que des fichiers image pour ce genre d'effet.

## Choisir des couleurs qui s'accordent bien

Un dégradé paraît soigné quand les deux couleurs partagent une certaine logique visuelle plutôt que de se heurter arbitrairement. Une approche courante et fiable consiste à choisir deux couleurs proches sur le cercle chromatique (une paire analogue, comme un bleu glissant vers un violet) pour un rendu calme et cohérent, ou deux couleurs à peu près opposées (une paire complémentaire, comme un orange vers un bleu) pour un rendu plus audacieux et à fort contraste. Garder une luminosité assez proche entre les deux couleurs tend à produire une transition plus douce, tandis qu'un grand écart de luminosité — un bleu marine sombre vers un jaune pâle, par exemple — crée un dégradé plus spectaculaire et plus énergique. Expérimenter directement dans l'aperçu en direct est plus rapide que de raisonner sur la théorie des couleurs dans l'abstrait, puisque vous voyez immédiatement si une association fonctionne pour votre design précis.

## Dégradés sur du texte et d'autres éléments

Au-delà des simples arrière-plans, les dégradés peuvent s'appliquer directement au texte grâce à la combinaison de `background-clip: text` et d'une couleur de texte transparente, un effet populaire pour les titres et les logos qui recherchent un traitement coloré et accrocheur sans recourir à un fichier image. La même syntaxe de dégradé sous-jacente fonctionne aussi sur les bordures et peut se combiner avec des masques CSS pour des effets de forme plus avancés, même si ces techniques demandent un peu plus de CSS de soutien qu'un simple dégradé d'arrière-plan. Une fois que vous avez trouvé un dégradé qui vous plaît avec ce générateur, sachez que les mêmes points de couleur peuvent être réutilisés à travers plusieurs de ces effets différents pour un design visuellement cohérent.

## Privé et instantané

Tout s'exécute entièrement dans votre navigateur, si bien que l'aperçu se met à jour instantanément lorsque vous ajustez les couleurs ou l'angle, et rien concernant le dégradé que vous concevez n'est jamais envoyé à un serveur, enregistré ou partagé.
