## Trouvez le plus petit multiple commun de n'importe quels nombres

Le plus petit multiple commun (PPCM) est le plus petit entier positif divisible sans reste par tous les nombres d'un ensemble donné. Saisissez deux nombres ou plus, séparés par des virgules, et le PPCM apparaît instantanément, accompagné en prime du plus grand diviseur commun (PGCD).

## Définition et exemples

Le PPCM d'un ensemble de nombres est le plus petit nombre dans lequel ils se divisent tous exactement.

- PPCM(4, 6) = 12 — car 12 ÷ 4 = 3 et 12 ÷ 6 = 2, et aucun nombre plus petit ne convient pour les deux.
- PPCM(3, 5) = 15 — car 3 et 5 sont premiers entre eux (ils ne partagent aucun facteur commun), leur PPCM est simplement leur produit.
- PPCM(12, 18, 24) = 72 — le plus petit nombre divisible par les trois.

## Comment se calcule le PPCM

La méthode la plus efficace repose sur la relation entre le PPCM et le PGCD : PPCM(a, b) = |a × b| / PGCD(a, b). Pour plus de deux nombres, le PPCM se calcule par paires successives : PPCM(a, b, c) = PPCM(PPCM(a, b), c).

Le PGCD se calcule à l'aide de l'algorithme d'Euclide, qui divise de façon répétée le plus grand nombre par le plus petit et retient le reste jusqu'à ce que celui-ci devienne nul. Le dernier reste non nul est le PGCD.

## Additionner des fractions à dénominateurs différents

L'application quotidienne la plus courante du PPCM concerne l'arithmétique des fractions. Pour additionner 1/4 et 1/6, il faut un dénominateur commun. Le PPCM de 4 et 6 est 12, donc : 1/4 = 3/12 et 1/6 = 2/12, ce qui donne 5/12. Utiliser le PPCM donne immédiatement la forme la plus réduite, alors qu'utiliser n'importe quel autre multiple commun (comme 24) donne un résultat qui demande encore à être simplifié.

## Planification et cycles

Le PPCM apparaît dans les problèmes de planification où des événements se répètent à des intervalles différents. Si le bus A passe toutes les 12 minutes et le bus B toutes les 18 minutes, et que les deux partent à 8h00, quand repartiront-ils simultanément la prochaine fois ? PPCM(12, 18) = 36, donc ils coïncident à nouveau à 8h36.

De même, les engrenages des systèmes mécaniques ont un nombre de dents dont le PPCM détermine quand les mêmes dents s'engrènent de nouveau. Les chaînes de production dont les machines fonctionnent avec des temps de cycle différents utilisent le PPCM pour trouver des points de synchronisation.

## Faire des réserves sans gaspillage

Le PPCM résout aussi un problème d'achat très concret : si les saucisses se vendent par paquets de 10 et les pains à hot-dog par paquets de 8, combien de paquets de chaque faut-il acheter pour se retrouver avec exactement le même nombre de saucisses et de pains, sans rien qui reste ? La réponse est le plus petit nombre dans lequel 10 et 8 se divisent tous les deux exactement, soit PPCM(10, 8) = 40 — vous achèteriez donc 4 paquets de saucisses et 5 paquets de pains. Ce scénario précis, et d'innombrables variantes impliquant deux paquets de tailles différentes, se présente chaque fois que vous essayez de faire correspondre deux choses vendues en quantités différentes.

## Théorie musicale

En musique, le PPCM détermine quand des motifs rythmiques se répètent. Un motif de 3 temps joué contre un motif de 4 temps crée un cycle de PPCM(3, 4) = 12 temps avant que les temps forts ne coïncident à nouveau. C'est le principe fondamental de la musique polyrythmique.

## Comment utiliser le calculateur

Saisissez deux nombres ou plus, séparés par des virgules, et le PPCM apparaît instantanément, accompagné du PGCD utilisé pour le calculer. Rien à valider et aucune limite au nombre de nombres que vous pouvez lister — le calculateur réduit tout l'ensemble par paires en coulisses, si bien qu'une liste de cinq ou six nombres se traite aussi facilement qu'une paire. Modifier un nombre met à jour le résultat immédiatement, ce qui facilite l'observation de la façon dont ajouter un nombre supplémentaire à un ensemble change le PPCM.

## Pourquoi le PPCM et le PGCD sont les deux faces d'une même pièce

Le plus petit multiple commun et le plus grand diviseur commun décrivent les deux extrémités opposées d'une même relation entre deux nombres, et l'identité élégante PPCM(a, b) × PGCD(a, b) = a × b les relie directement. Intuitivement, le PGCD extrait tout ce que deux nombres ont en commun, tandis que le PPCM est le plus petit nombre assez grand pour contenir tout ce dont les deux nombres ont besoin. Comme calculer un PGCD via l'algorithme d'Euclide reste rapide même pour de grands nombres, et que la formule du PPCM ne demande qu'une multiplication et une division supplémentaires une fois le PGCD connu, ce détour indirect est bien plus rapide que de chercher directement parmi les multiples, surtout à mesure que les nombres grandissent.

## Un exemple résolu, étape par étape

Prenons PPCM(21, 6). Trouvons d'abord le PGCD : 21 = 3×6 + 3, puis 6 = 2×3 + 0, donc PGCD(21, 6) = 3. Appliquons ensuite la formule : PPCM(21, 6) = (21 × 6) / 3 = 126 / 3 = 42. On peut le vérifier directement — 42 ÷ 21 = 2 et 42 ÷ 6 = 7, deux nombres entiers, et aucun nombre positif plus petit ne se divise exactement à la fois par 21 et par 6. Ce processus en deux étapes, d'abord le PGCD puis une seule multiplication et division, est exactement ce que le calculateur effectue instantanément derrière les résultats que vous voyez.

## Des situations quotidiennes au-delà des fractions et des horaires

Le PPCM apparaît discrètement dans des situations que l'on n'étiquette pas toujours comme un problème mathématique. Adapter une recette qui a besoin de quantités entières de deux ingrédients vendus en tailles de paquet différentes, préparer des sacs de friandises identiques à partir d'articles vendus en boîtes de tailles différentes, ou calculer combien de tours d'un jeu avec deux manches de longueurs différentes se resynchronisent au départ — tout cela constitue des problèmes de PPCM déguisés. Chaque fois que vous avez besoin de la plus petite quantité, du plus petit temps ou du plus petit compte satisfaisant simultanément deux ou plusieurs exigences répétitives, le PPCM est le nombre que vous cherchez.

## Privé et instantané

Tous les calculs s'exécutent entièrement dans votre navigateur à l'aide de l'algorithme d'Euclide, si bien que rien de ce que vous saisissez n'est jamais envoyé, enregistré ou partagé. Le résultat apparaît à l'instant où vous tapez, l'outil fonctionne hors ligne une fois la page chargée, et chaque nombre disparaît dès que vous fermez ou rechargez l'onglet.
