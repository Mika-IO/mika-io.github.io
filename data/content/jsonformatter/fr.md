## Formatez, validez et minifiez du JSON instantanément

JSON (JavaScript Object Notation) est le format standard d'échange de données pour les API web, les fichiers de configuration et le stockage de données. Quand vous recevez du JSON brut ou compact depuis la réponse d'une API ou un outil de débogage, le formater le rend lisible en quelques secondes. Quand vous devez transmettre du JSON efficacement, le minifier retire tous les espaces superflus.

## Comment utiliser l'outil

Collez du JSON dans le champ de saisie, puis choisissez formater pour l'obtenir proprement indenté et lisible, ou minifier pour retirer chaque espace et saut de ligne superflu et obtenir la taille la plus compacte possible. Si le JSON contient une erreur, l'outil signale précisément ce qui ne va pas plutôt que d'échouer silencieusement, ce qui reste généralement le moyen le plus rapide de repérer une virgule égarée ou une accolade manquante enfouie dans un gros bloc collé depuis un fichier de log ou une réponse d'API.

## Qu'est-ce que JSON ?

JSON est un format de données textuel qui représente des données structurées sous forme de paires clé-valeur (objets) et de listes ordonnées (tableaux). Il est dérivé de la syntaxe des objets JavaScript, mais reste indépendant de tout langage — pratiquement chaque langage de programmation dispose d'un analyseur JSON.

Un document JSON valide est l'un des éléments suivants : un objet, un tableau, une chaîne de caractères, un nombre, un booléen (true ou false), ou null.

Exemple de JSON valide :

    {
      "nom": "Alice",
      "age": 30,
      "notes": [95, 87, 91],
      "actif": true
    }

## JSON contre XML

JSON a largement remplacé XML comme format d'échange de données dominant sur le web, car il est plus compact, plus facile à lire, et correspond naturellement aux structures de données de la plupart des langages de programmation (objets et tableaux).

## Les structures imbriquées, d'un coup d'œil

L'intérêt réel du formatage se révèle une fois que des objets et des tableaux commencent à s'imbriquer les uns dans les autres sur plusieurs niveaux, ce qui est courant dans les vraies réponses d'API. Un bloc de JSON minifié et profondément imbriqué est presque impossible à suivre à l'œil nu — faire correspondre une accolade ouvrante à sa bonne accolade fermante plusieurs lignes plus loin est exactement le genre de tâche fastidieuse et source d'erreurs qu'un ordinateur exécute bien mieux qu'un humain. Le JSON formaté avec une indentation cohérente transforme cette même structure en quelque chose que l'on peut suivre visuellement, niveau par niveau, ce qui explique pourquoi presque tous les outils de développement qui affichent du JSON, des outils de développement du navigateur aux clients d'API, le formatent par défaut plutôt que d'afficher la chaîne brute et compacte réellement envoyée par le serveur.

## Le formatage lisible (« pretty-printing »)

Une chaîne JSON « minifiée » ne contient aucun espace superflu :

    {"nom":"Alice","age":30,"notes":[95,87,91],"actif":true}

Bien que valide, ce format est difficile à lire. Le « pretty-printing », ou formatage, ajoute de l'indentation et des sauts de ligne :

Chaque niveau d'imbrication est indenté de 2 ou 4 espaces. Cela rend les structures profondément imbriquées faciles à parcourir visuellement.

## Une brève histoire de l'essor de JSON

JSON a été popularisé au début des années 2000 par Douglas Crockford, qui a documenté et nommé un format de données qu'il a remarqué comme déjà implicite dans la syntaxe des littéraux d'objet de JavaScript, plutôt que d'inventer quelque chose d'entièrement nouveau. Son apparition a coïncidé avec l'essor des applications web pilotées par AJAX, qui avaient besoin d'un moyen léger d'échanger des données entre le navigateur et le serveur sans recharger toute la page, et sa forte ressemblance avec les objets natifs de JavaScript permettait aux navigateurs de l'analyser presque gratuitement. Cette combinaison de simplicité et de bon timing explique en grande partie pourquoi JSON a dépassé le XML, plus verbeux, comme choix par défaut pour les API web en l'espace d'une décennie environ.

## JSON dans le développement web

Les API web utilisent massivement JSON pour les corps de requête et de réponse. L'API fetch() du navigateur et XMLHttpRequest gèrent toutes deux le JSON nativement. Les langages côté serveur analysent le JSON à l'aide de bibliothèques intégrées.

## Pourquoi le formatage et la minification servent des objectifs différents

Ces deux opérations existent parce que le JSON est lu par deux publics très différents. Le JSON formaté et indenté s'adresse aux humains : un développeur qui inspecte une réponse d'API, débogue un fichier de configuration, ou relit des données pendant le développement bénéficie énormément d'une indentation claire qui rend visible d'un coup d'œil la structure des objets et tableaux imbriqués. Le JSON minifié s'adresse aux machines : retirer chaque espace et saut de ligne superflu réduit le nombre d'octets à transmettre sur un réseau ou à stocker sur disque, ce qui compte quand une charge JSON est envoyée des milliers ou des millions de fois par jour entre serveurs. Aucune des deux formes n'est plus « correcte » que l'autre — elles optimisent simplement pour des lecteurs différents, et un bon flux de travail passe de l'une à l'autre selon qu'un humain ou une machine fait la lecture à ce moment-là.

## Erreurs JSON courantes et comment les repérer

Une virgule finale après le dernier élément d'un objet ou d'un tableau constitue l'une des erreurs les plus fréquentes, car elle est valide dans les littéraux d'objet JavaScript mais explicitement interdite en JSON. Les noms de propriété doivent toujours être des chaînes entre guillemets doubles — les clés sans guillemets et les chaînes entre guillemets simples sont toutes deux invalides, même si les deux sont légales en JavaScript. Les commentaires ne sont absolument pas pris en charge en JSON standard, si bien qu'un fichier de configuration avec des commentaires utiles en ligne (comme le format JSONC utilisé par VS Code pour ses réglages) n'est techniquement pas du JSON valide et nécessite un analyseur spécial. Comme la grammaire de JSON est intentionnellement plus stricte que celle de JavaScript, copier directement un littéral d'objet JavaScript dans un champ JSON est une source très courante des erreurs de syntaxe que cet outil vous aide à repérer.

## Valider avant de faire confiance aux données

Au-delà de rendre le JSON lisible, cet outil le valide aussi, ce qui compte, car un seul caractère mal placé peut rendre un bloc de JSON par ailleurs correct en apparence totalement inanalysable. Plutôt que de parcourir manuellement des centaines de lignes à la recherche d'une virgule manquante ou d'une accolade non fermée, coller le texte et laisser l'analyseur signaler précisément où il a échoué transforme une recherche visuelle fastidieuse en une réponse instantanée et précise, particulièrement précieuse lors du débogage d'un fichier de configuration ou d'une réponse d'API qu'un programme refuse d'accepter.

## Privé et instantané

Tout le traitement s'exécute entièrement dans votre navigateur, si bien que le formatage et la minification s'effectuent instantanément et qu'aucun JSON que vous collez n'est jamais envoyé où que ce soit, enregistré ou partagé, et l'outil fonctionne hors ligne une fois la page chargée.
