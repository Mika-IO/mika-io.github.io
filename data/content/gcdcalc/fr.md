## Trouvez le plus grand diviseur commun de n'importe quels nombres

Le plus grand diviseur commun (PGCD) — aussi appelé plus grand commun facteur — est le plus grand nombre qui divise tous les nombres donnés sans laisser de reste. Saisissez deux nombres ou plus, séparés par des virgules, et le PGCD se calcule instantanément à l'aide de l'algorithme d'Euclide.

## Définition et exemples

- PGCD(12, 18) = 6 — car 6 est le plus grand nombre qui divise à la fois 12 et 18.
- PGCD(48, 36, 24) = 12 — le plus grand nombre qui divise les trois.
- PGCD(7, 13) = 1 — ces nombres sont premiers entre eux (aucun facteur commun autre que 1).

## L'algorithme d'Euclide

La méthode la plus célèbre pour calculer un PGCD est l'algorithme d'Euclide, décrit par Euclide vers 300 avant notre ère dans ses Éléments. L'algorithme énonce que PGCD(a, b) = PGCD(b, a mod b), et se répète jusqu'à ce que b = 0. Par exemple : PGCD(48, 36) → PGCD(36, 12) → PGCD(12, 0) = 12.

## Simplifier des fractions

L'usage quotidien le plus courant du PGCD consiste à simplifier des fractions à leur forme la plus réduite. Pour simplifier 48/72, calculez PGCD(48, 72) = 24, puis divisez les deux nombres par 24 : 2/3. Le résultat est entièrement réduit, car le numérateur et le dénominateur sont désormais premiers entre eux.

## Cryptographie

Le chiffrement RSA, l'algorithme qui sécurise la majorité des communications sur internet, repose fondamentalement sur la théorie des nombres impliquant le PGCD et les nombres premiers entre eux. L'algorithme de génération de clés RSA exige de choisir deux grands nombres premiers, qui sont toujours premiers entre eux et avec leur produit.

## Répartir des éléments en groupes égaux

Un usage très concret du PGCD consiste à répartir des collections de tailles différentes dans le plus grand nombre possible de groupes identiques sans rien laisser de côté. Si vous avez 48 pommes et 36 oranges et que vous voulez composer des paniers de fruits identiques en utilisant tous les fruits sans rien laisser de côté, le plus grand nombre de paniers possible est PGCD(48, 36) = 12, chacun contenant 4 pommes et 3 oranges. Cette même logique s'applique pour découper des longueurs de tissu ou de bois en pièces égales, disposer des chaises en rangées égales dans des salles de tailles différentes, ou répartir un budget entre départements en versements égaux les plus importants possible.

## Ingénierie

En mécanique, le PGCD du nombre de dents de deux engrenages détermine à quelle fréquence la même paire de dents se rencontre. Si l'engrenage A compte 48 dents et l'engrenage B en compte 36, PGCD(48, 36) = 12, ce qui signifie que toutes les 12 dents de l'engrenage A s'engrènent avec toutes les 12 dents de l'engrenage B.

## Comment utiliser le calculateur

Tapez vos nombres dans le champ prévu, séparés par des virgules — deux nombres, ou autant que vous le souhaitez. Appuyez sur calculer et le PGCD de l'ensemble apparaît immédiatement, accompagné de la réduction d'Euclide étape par étape, pour que vous voyiez exactement comment le résultat a été obtenu plutôt que de le traiter comme une boîte noire. Saisir un seul nombre, ou des nombres qui ne partagent aucun facteur commun au-delà de 1, est géré sans accroc : l'outil signale simplement un PGCD de 1 dans ce dernier cas, confirmant que les nombres sont premiers entre eux.

## Pourquoi l'algorithme d'Euclide est si efficace

Avant la méthode d'Euclide, trouver un PGCD signifiait lister tous les diviseurs de chaque nombre et choisir le plus grand qu'ils avaient en commun — praticable pour de petits nombres, mais désespérément lent pour de grands nombres. L'algorithme d'Euclide remplace au contraire, à chaque étape, le plus grand nombre par le reste de sa division par le plus petit, réduisant rapidement le problème. Pour deux nombres de taille raisonnable, il se termine typiquement en bien moins de cinquante étapes, ce qui explique pourquoi il reste la méthode standard enseignée aujourd'hui et celle intégrée dans pratiquement toute calculatrice, fonction de tableur et bibliothèque de langage de programmation qui calcule un PGCD.

## Étendre à plus de deux nombres

Quand vous saisissez trois nombres ou plus, le calculateur n'a pas besoin d'un nouvel algorithme — il applique simplement le cas à deux nombres de façon répétée. Le PGCD d'une liste entière est égal au PGCD des deux premiers nombres combiné au troisième, et ainsi de suite : PGCD(a, b, c) = PGCD(PGCD(a, b), c). Cela fonctionne parce que tout nombre qui divise à la fois a, b et c doit d'abord diviser le PGCD de n'importe laquelle de leurs paires, si bien que réduire la liste deux par deux ne perd jamais d'information. C'est une bonne illustration de la façon dont un composant simple — le PGCD à deux nombres — s'étend proprement pour traiter une liste de longueur arbitraire.

## Nombres premiers entre eux et ce que révèle un PGCD de 1

Quand le calculateur indique un PGCD de 1, les nombres que vous avez saisis sont dits premiers entre eux, ce qui signifie qu'ils ne partagent aucun facteur supérieur à 1, même si chacun peut individuellement avoir de nombreux facteurs. Par exemple, 8 et 15 sont premiers entre eux même si 8 = 2×2×2 et 15 = 3×5 — ils ne partagent simplement aucun des mêmes blocs premiers de construction. Cette propriété apparaît constamment en théorie des nombres et en cryptographie, car de nombreux algorithmes reposent sur le choix de nombres garantis sans structure commune cachée.

## Un exemple résolu, étape par étape

Observons l'algorithme d'Euclide à l'œuvre pour PGCD(48, 18). D'abord, 48 = 2×18 + 12, donc le problème devient PGCD(18, 12). Ensuite, 18 = 1×12 + 6, donc il devient PGCD(12, 6). Enfin, 12 = 2×6 + 0, donc le reste atteint zéro et le dernier reste non nul, 6, est le PGCD. Chaque étape de l'algorithme réduit rapidement les nombres en jeu, ce qui explique précisément pourquoi il se termine en seulement une poignée d'étapes, même pour de très grands nombres, contrairement au fait de lister tous les diviseurs, qui ralentit rapidement à mesure que les nombres grandissent.

## Privé et instantané

Tous les calculs s'exécutent entièrement dans votre navigateur à l'aide de l'algorithme d'Euclide, si bien que le résultat apparaît à l'instant où vous tapez, et qu'aucun nombre que vous saisissez n'est jamais envoyé à un serveur, enregistré ou partagé. L'outil fonctionne hors ligne une fois la page chargée, et chaque calcul est effacé dès que vous fermez ou rechargez l'onglet.
