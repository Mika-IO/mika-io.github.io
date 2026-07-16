## Comparez deux textes et trouvez les différences

Que vous relisiez un document révisé, vérifiiez ce qui a changé dans un contrat, compariez deux versions d'un essai ou vérifiiez qu'un copier-coller était exact, un outil de comparaison de texte vous fait gagner du temps en mettant en évidence exactement ce qui a changé. Collez le texte original dans la première case et la nouvelle version dans la seconde, et les différences sont marquées instantanément.

## Comment fonctionne la différence au niveau des mots

L'outil utilise l'algorithme LCS (Longest Common Subsequence) – le même algorithme sous-jacent à la commande Unix diff et à git diff. Il trouve la plus grande séquence de mots qui apparaissent dans les deux textes dans le même ordre, puis marque tout ce qui se trouve en dehors de cette séquence comme ajouté ou supprimé.

Les mots affichés en rouge barrés sont dans l’original mais pas dans la nouvelle version (supprimés). Les mots surlignés en vert sont dans la nouvelle version mais pas dans l'original (ajouté). Les mots inchangés apparaissent dans le texte normal.

## Utilisations courantes de la comparaison de texte

**Révisions de documents** : lorsqu'un collaborateur renvoie un document révisé, voyez rapidement quels mots ou phrases ont été modifiés sans lire les deux versions dans leur intégralité.

**Révision de contrat** : les professionnels du droit utilisent diff pour suivre les modifications entre les versions de contrat. Un document « redline » ou « balisage » est essentiellement une différence appliquée au texte juridique.

**Relecture académique** : comparez une première ébauche à une ébauche révisée pour vérifier que les modifications prévues ont été apportées correctement et qu'aucune modification involontaire n'a été introduite.

**Révision de code** : bien que les différences de code soient mieux gérées par des outils tels que git diff (qui fonctionne ligne par ligne), une différence au niveau des mots peut être utile lors de la révision de la documentation ou des commentaires.

**Vérification du plagiat** : comparez un texte soumis à un original pour repérer les paraphrases : des mots réorganisés ou remplacés qui préservent le même sens.

**Vérification de la traduction** : comparez un texte source à sa traduction mot à mot pour garantir son exhaustivité (bien que cela soit approximatif en raison des différences de langage naturel).

## Limites de la différence au niveau des mots

Cet outil compare des mots sans comprendre la sémantique. Une phrase entièrement réécrite avec le même sens apparaîtra entièrement supprimée et ajoutée. Pour comprendre la similarité sémantique, des outils de traitement du langage naturel sont nécessaires.

La comparaison ne distingue pas non plus le formatage, les majuscules ou la ponctuation dans les mots, sauf s'ils font partie d'un jeton de mot. "Bonjour" et "bonjour" sont traités comme des mots différents.

## Comment utiliser l'outil

Collez le texte original dans la première case et la version révisée dans la seconde, et la comparaison apparaît immédiatement en dessous, avec les suppressions barrées en rouge et les ajouts surlignés en vert. Il n’y a pas de bouton sur lequel appuyer pour déclencher la comparaison – elle est mise à jour en direct, vous pouvez donc coller une nouvelle version à tout moment et voir immédiatement en quoi elle diffère de la précédente.

## Pourquoi une comparaison au niveau des mots, pas au niveau des caractères

Un outil de comparaison pourrait théoriquement comparer caractère par caractère plutôt que mot par mot, mais cette approche produit des résultats techniquement précis et pratiquement inutiles : corriger une seule faute de frappe au milieu d'une longue phrase afficherait presque tout le reste de la phrase comme modifié, car chaque caractère après la correction change de position. La comparaison au niveau du mot signifie qu'un seul mot corrigé apparaît comme une suppression et un ajout, tandis que tout le reste de la phrase qui n'a pas réellement changé est correctement laissé seul - un signal beaucoup plus utile pour un humain essayant de comprendre ce qui a été réellement modifié, ce qui est exactement le niveau de granularité dont se soucient la plupart des tâches d'édition et de relecture réelles.

## Lire une différence efficacement

Lors de l'examen d'une longue comparaison, il est utile de rechercher des groupes de couleurs plutôt que de lire chaque mot : un groupe serré de rouge et de vert l'un à côté de l'autre indique généralement une petite reformulation, tandis qu'une longue série ininterrompue d'une couleur indique un passage véritablement nouveau ou supprimé plutôt qu'une modification. Se familiariser avec cette approche d'analyse de modèles permet aux éditeurs et aux réviseurs juridiques expérimentés de traiter une ligne rouge de plusieurs pages en quelques minutes plutôt que de relire l'intégralité du document ligne par ligne.

## Outils de comparaison entre logiciels et prose

Les programmeurs utilisent constamment des outils de comparaison basés sur des lignes comme git diff, et il vaut la peine de comprendre pourquoi une comparaison au niveau des mots comme celle-ci est un outil différent et complémentaire plutôt qu'un remplacement. Le code source est naturellement organisé en lignes discrètes, donc comparer ligne par ligne est la bonne granularité – une ligne modifiée est une unité logique modifiée. La prose n’a pas de telles limites naturelles ; une seule phrase peut s'étendre sur plusieurs lignes en fonction de la largeur de la fenêtre, et l'unité de changement significative est le mot ou la phrase, et non l'endroit où une ligne se casse. C'est précisément pourquoi la comparaison de prose nécessite une approche au niveau des mots plutôt que de réutiliser un outil de comparaison orienté code et basé sur les lignes.

## Comparer les brouillons de traduction

Les éditeurs et traducteurs bilingues utilisent parfois une différence au niveau des mots pour comparer deux versions d'une traduction du même texte source - par exemple, le brouillon d'un traducteur humain avec une version traduite automatiquement, ou deux révisions successives du même paragraphe - afin de repérer rapidement exactement où les choix de mots divergent, sans avoir besoin de relire l'intégralité du passage à la recherche de la différence.

## Une vérification rapide de l'intégrité avant de s'appuyer sur un différentiel

Avant de faire confiance à un résultat différent pour quelque chose d'important - un document juridique, un devoir noté - collez d'abord un petit changement connu dans les deux cases et confirmez que l'outil met en évidence exactement ce changement et rien d'autre, de la même manière que vous testeriez une nouvelle balance de cuisine avec un poids connu avant de lui faire confiance pour une recette.

## Privé et instantané

Toutes les comparaisons s'exécutent entièrement dans votre navigateur à l'aide de l'algorithme de sous-séquence commune la plus longue, de sorte que les résultats apparaissent instantanément et aucun texte que vous collez n'est jamais envoyé à un serveur, enregistré ou partagé.

