## Générez des empreintes cryptographiques pour n'importe quel texte

Une fonction de hachage prend n'importe quelle entrée et produit une empreinte de longueur fixe, appelée hash ou condensat. La même entrée produit toujours la même sortie, mais changer un seul caractère produit un hash complètement différent — une propriété appelée effet d'avalanche. Cet outil génère des empreintes SHA-256, SHA-1 et MD5 pour n'importe quel texte que vous saisissez, calculées entièrement dans votre navigateur.

## SHA-256, SHA-1 et MD5 comparés

SHA-256, qui appartient à la famille SHA-2, produit une empreinte de 256 bits écrite sous forme de 64 caractères hexadécimaux, et est considéré comme cryptographiquement sûr pour toutes les applications actuelles, ce qui en fait le choix par défaut pour les nouveaux systèmes aujourd'hui. SHA-1 produit une empreinte plus courte de 160 bits et est déconseillé à des fins de sécurité depuis 2017, après que des chercheurs ont démontré que deux entrées différentes pouvaient être délibérément construites pour produire le même hash — une collision qui sape les garanties que l'algorithme était censé offrir, bien qu'il subsiste dans certains systèmes hérités et dans d'anciennes parties de Git, lui-même en train de progressivement s'en éloigner. MD5 produit une empreinte encore plus courte de 128 bits et est considéré comme cryptographiquement cassé : des collisions peuvent être générées délibérément et rapidement avec du matériel moderne, si bien que MD5 aujourd'hui ne convient qu'à des usages non sécuritaires, comme des sommes de contrôle basiques de fichiers ou des recherches rapides en base de données où un adversaire fabriquant une collision malveillante n'est pas une préoccupation.

## À quoi servent les fonctions de hachage ?

**Intégrité des fichiers** : les sites de téléchargement publient le hash SHA-256 de chaque fichier. Après téléchargement, vous calculez le hash et le comparez à la valeur publiée. S'ils correspondent, le fichier n'a pas été corrompu ni altéré en cours de route.

**Stockage des mots de passe** : les sites web ne devraient jamais stocker de mots de passe en texte brut. Ils stockent plutôt un hash (idéalement SHA-256 ou bcrypt avec un sel aléatoire) et hachent votre tentative de connexion pour la comparer.

**Signatures numériques** : signer un document consiste à le hacher puis à chiffrer le hash avec une clé privée. Le destinataire peut vérifier le hash à l'aide de la clé publique.

**Minage de Bitcoin** : SHA-256 est utilisé dans l'algorithme de preuve de travail de Bitcoin. Les mineurs doivent trouver une entrée (nonce) qui produit un hash commençant par un certain nombre de zéros.

**Contrôle de versions** : Git utilise SHA-1 (en cours de migration vers SHA-256) pour identifier chaque commit, fichier et objet du dépôt. Le hash sert d'identifiant unique.

## L'effet d'avalanche

Une propriété caractéristique des fonctions de hachage cryptographiques est que même un minuscule changement d'entrée produit des sorties radicalement différentes :

« Bonjour » → SHA-256 : 185f8db3...
« bonjour » → SHA-256 : 2cf24dba...

Les deux empreintes ne partagent aucune ressemblance visible, malgré une seule différence de casse. C'est l'effet d'avalanche.

## Une fonction à sens unique

Les hashes fonctionnent à sens unique : vous pouvez calculer un hash à partir d'une entrée, mais vous ne pouvez pas inverser le processus pour retrouver l'entrée à partir du hash. Le seul moyen de « casser » un hash consiste à essayer de nombreuses entrées (attaque par force brute ou par dictionnaire) et à voir laquelle produit le même hash.

## Comment utiliser l'outil

Tapez ou collez n'importe quel texte dans le champ prévu, et les trois empreintes — SHA-256, SHA-1 et MD5 — apparaissent immédiatement en dessous, se recalculant à chaque frappe. Cela facilite la vérification de la somme de contrôle publiée d'un fichier, la génération rapide d'un identifiant unique pour un morceau de texte, ou simplement l'exploration de l'effet d'avalanche en modifiant votre saisie caractère par caractère et en observant chaque hash changer complètement.

## Pourquoi on ne peut pas inverser un hash

Une fonction de hachage cryptographique est délibérément conçue pour détruire l'information d'une manière précise : elle prend une entrée de longueur quelconque et la compresse en une sortie fixe et courte, en éliminant bien plus d'information qu'elle n'en conserve. Comme d'innombrables entrées différentes pourraient théoriquement se compresser vers la même courte sortie, il n'existe aucune opération inverse unique permettant de retrouver l'entrée d'origine à partir du hash — le processus ne fonctionne que dans un seul sens. Le seul moyen de trouver une entrée produisant un hash donné consiste à essayer des entrées candidates les unes après les autres et à vérifier si l'une d'elles correspond par hasard, ce qui explique précisément pourquoi hacher les mots de passe plutôt que de les stocker directement est efficace : même si un hash est volé, retrouver le mot de passe d'origine à partir de celui-ci est infaisable en pratique pour un algorithme de hachage bien choisi et un mot de passe suffisamment long.

## Choisir le bon hash pour la tâche

Pour tout ce qui touche à la sécurité aujourd'hui — stockage de mots de passe, signatures numériques, vérification qu'un fichier téléchargé n'a pas été altéré — SHA-256, ou un membre plus robuste encore de la famille SHA-2 ou SHA-3, constitue le choix approprié, puisque SHA-1 et MD5 présentent tous deux des faiblesses connues qu'un attaquant déterminé peut exploiter. SHA-1 et MD5 restent utiles uniquement dans des contextes où la sécurité n'est pas du tout l'enjeu : une somme de contrôle rapide pour repérer une corruption accidentelle, un moyen rapide de générer une courte clé unique pour une recherche en cache, ou la compatibilité avec un ancien système qui n'a pas été mis à jour. En cas de doute sur lequel utiliser pour quelque chose d'important, SHA-256 constitue presque toujours le choix par défaut le plus sûr.

## Privé et instantané

SHA-256 et SHA-1 sont calculés à l'aide de l'API Web Crypto intégrée au navigateur, et MD5 est calculé à l'aide d'une implémentation JavaScript pure, si bien que chaque hash apparaît instantanément et qu'aucun texte que vous saisissez n'est jamais envoyé où que ce soit, enregistré ou partagé ; l'outil fonctionne hors ligne une fois la page chargée, sans limite sur le nombre de hashes générés, sans coût et sans rien à installer.
