## Convertir les horodatages Unix en dates lisibles par l'homme

Les développeurs, les administrateurs de bases de données et toute personne travaillant avec des fichiers journaux ou des API rencontrent régulièrement des horodatages Unix – des nombres longs comme 1700000000 qui représentent un instant dans le temps. Sans convertisseur, ces chiffres n’ont aucun sens pour la plupart des gens. Cet outil convertit instantanément n'importe quel horodatage Unix en une date et une heure lisibles, et reconvertit également n'importe quelle date en son horodatage Unix.

## Qu’est-ce qu’un horodatage Unix ?

Un horodatage Unix compte le nombre de secondes écoulées depuis minuit le 1er janvier 1970, temps universel coordonné (UTC). Ce moment, appelé l'époque Unix, a été choisi comme point de référence lors du développement des systèmes d'exploitation Unix. Chaque seconde qui passe en ajoute une au décompte. L'horodatage 0 représente exactement minuit le 1er janvier 1970 UTC. L'horodatage 1700000000 représente le 14 novembre 2023 à 22:13:20 UTC.

La beauté des horodatages Unix est qu’ils sont indépendants du fuseau horaire. Un horodatage représente exactement le même moment, quel que soit l’endroit où vous vous trouvez dans le monde. Lorsqu'il est converti en heure locale, le même horodatage produit des lectures d'horloge différentes à Tokyo et à New York, mais ils font référence au même instant physique.

## Comment utiliser le convertisseur

Pour convertir un horodatage en date, collez le numéro d'horodatage dans le champ supérieur. La date et l'heure UTC ainsi que votre équivalent local apparaissent immédiatement. Pour convertir une date en horodatage, utilisez le sélecteur de date dans la section inférieure et l'horodatage correspondant apparaît instantanément.

## Millisecondes vs secondes

Certains systèmes, en particulier les navigateurs Web et les applications JavaScript, utilisent des millisecondes au lieu de secondes pour leurs horodatages. Un appel JavaScript Date.now() renvoie quelque chose comme 1700000000000 – un nombre environ 1 000 fois plus grand que l'horodatage Unix équivalent en secondes. Si le nombre que vous avez comporte environ treize chiffres, il est probablement exprimé en millisecondes : divisez par 1 000 et saisissez le résultat.

## Le problème de l’année 2038

Les premiers systèmes Unix stockaient les horodatages sous forme d'entiers signés 32 bits, pouvant contenir des valeurs allant jusqu'à 2 147 483 647. Cette valeur maximale correspond au 19 janvier 2038 à 03:14:07 UTC. Les systèmes qui stockent les horodatages sous forme d'entiers de 32 bits déborderont à cette date, un problème parfois appelé Y2K38. Les systèmes 64 bits modernes peuvent stocker des horodatages bien au-delà de 292 milliards d'années, ce qui pose problème uniquement pour les logiciels existants qui n'ont pas été mis à jour.

## Utilisations courantes

Les horodatages apparaissent dans les fichiers journaux, les enregistrements de bases de données, les réponses API, les en-têtes de cache, les certificats cryptographiques et dans d'innombrables autres contextes. Leur conversion en dates lisibles facilite le débogage, l'analyse des données, l'audit de conformité et toute situation dans laquelle vous devez comprendre quand quelque chose s'est produit.

## Pourquoi 1970 a été choisie comme point de départ

Le choix du 1er janvier 1970 était essentiellement une décision pratique plutôt qu’une date significative en soi. Unix était développé à la fin des années 1960 et au début des années 1970 aux Bell Labs, et les concepteurs avaient besoin d'un point de référence suffisamment récent pour que les chiffres restent gérables, mais suffisamment précoce pour couvrir la durée de vie probable du système d'exploitation. Arrondir au début des années 1970 était tout simplement pratique. Des décennies plus tard, ce choix arbitraire est devenu profondément ancré : il sous-tend la façon dont presque tous les langages de programmation, bases de données et systèmes d’exploitation représentent le temps en interne, même si la plupart des programmeurs n’ont jamais besoin d’y penser directement.

## Lire un horodatage sans convertisseur

Avec un peu de pratique, vous pouvez vérifier un horodatage dans votre tête. En divisant par 31 536 000 (le nombre de secondes dans une année ordinaire), on obtient un nombre approximatif d’années depuis 1970 – un horodatage à dix chiffres commençant par 1,7 correspond à peu près à l’année 2023, par exemple, puisque 1970 plus environ 53 à 54 ans y atterrissent. Cette estimation mentale approximative est un moyen utile de repérer un horodatage manifestement erroné, comme celui qui est décalé d'un facteur 1 000 parce qu'il était en réalité en millisecondes, avant même que vous n'utilisiez une calculatrice.

## Horodatages négatifs

Étant donné qu'un horodatage Unix est simplement un décompte signé de secondes à partir de l'époque, les dates antérieures au 1er janvier 1970 sont représentées sous forme de nombres négatifs plutôt que d'être non prises en charge. Un horodatage de -86400, par exemple, représente exactement un jour avant l'époque : le 31 décembre 1969. Ce convertisseur gère les valeurs négatives de la même manière que les positives, ce qui est utile pour travailler avec des enregistrements historiques ou des données antérieures à l'ère informatique mais qui sont toujours stockées sous forme d'horodatage Unix.

## Pourquoi les horodatages sont indépendants du fuseau horaire

Le plus grand avantage du stockage d'un moment sous forme d'horodatage Unix plutôt que sous forme de chaîne de date formatée est qu'il contourne complètement les fuseaux horaires pendant le stockage et le calcul. Un horodatage représente exactement un instant physique et n'est traduit en date et en heure du calendrier local qu'au moment où il est affiché à une personne. C'est pourquoi les bases de données, les API et les fichiers journaux stockent majoritairement des horodatages plutôt que des dates locales préformatées : deux serveurs situés dans des fuseaux horaires différents peuvent comparer, trier et calculer les différences entre les horodatages en toute confiance, et n'ont besoin de convertir en une heure locale lisible par l'homme qu'à la toute dernière étape, exactement comme le fait ce convertisseur lorsqu'il affiche côte à côte l'heure UTC et votre équivalent local.

## Débogage avec horodatages

Les développeurs recherchent constamment un convertisseur comme celui-ci lors du débogage. Un journal d'erreurs de serveur estampillé 1700000000 n'a aucun sens en un coup d'œil, mais sa conversion vous indique instantanément si l'erreur s'est produite pendant les heures de bureau, pendant la nuit ou au moment exact d'un déploiement - souvent le moyen le plus rapide de corréler un rapport de bogue avec le changement qui l'a provoqué. Les réponses d'API, les colonnes d'audit de base de données et les en-têtes d'expiration du cache stockent tous généralement des horodatages plutôt que des dates formatées pour la même raison que les moteurs de stockage les préfèrent : un nombre simple trie, compare et calcule correctement sans ambiguïté de paramètres régionaux ou de format, et n'a besoin d'être traduit en une date conviviale qu'à l'étape d'affichage finale, ce qui est exactement le travail que fait cet outil.

## Privé

Tout s'exécute dans votre navigateur à l'aide de l'objet Date intégré de JavaScript, de sorte que la conversion est instantanée dans les deux sens et aucun horodatage ou date que vous saisissez n'est jamais envoyé à un serveur, enregistré ou partagé.

