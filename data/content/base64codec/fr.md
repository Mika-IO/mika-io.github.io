## Encodez et décodez du Base64 instantanément

Le Base64 est un encodage fondamental utilisé dans toute l'informatique pour représenter en toute sécurité des données binaires sous forme de texte. Que vous travailliez avec des API, que vous inspectiez des requêtes réseau, que vous cherchiez à comprendre un jeton JWT, ou que vous intégriez des images dans du HTML, le Base64 apparaît sans cesse. Cet outil encode n'importe quel texte en Base64 et décode n'importe quelle chaîne Base64 pour retrouver le texte d'origine, en un seul clic.

## Qu'est-ce que le Base64 ?

Le Base64 est un schéma d'encodage binaire-vers-texte qui représente des données binaires à l'aide de seulement 64 caractères ASCII imprimables : les 26 lettres majuscules (A-Z), les 26 lettres minuscules (a-z), les 10 chiffres (0-9), plus les caractères + et /. Un 65ᵉ caractère, le signe =, sert de remplissage en fin de chaîne.

Le nom « Base64 » vient du fait que cet encodage utilise 64 caractères distincts. Chaque caractère Base64 représente 6 bits de données (2⁶ = 64). Puisqu'un octet compte 8 bits, chaque groupe de 3 octets d'entrée devient exactement 4 caractères Base64.

## Pourquoi le Base64 existe

De nombreux protocoles et systèmes anciens fondés sur le texte ne savent traiter que de l'ASCII, pas des octets binaires arbitraires. Le courrier électronique (SMTP), les URL, les en-têtes HTTP et le XML manipulent tous du texte en toute sécurité. Les données binaires — images, fichiers audio, clés cryptographiques ou données compressées — ne peuvent pas transiter en toute fiabilité par ces canaux sans être encodées au préalable.

Le Base64 résout ce problème en traduisant n'importe quelle donnée binaire en un sous-ensemble de caractères ASCII que tous les systèmes de texte peuvent stocker et transmettre sans risque.

## Usages courants

**URI de données** : des images peuvent être intégrées directement dans du HTML ou du CSS sans requête de fichier séparée. Une URI de données commence par data:image/png;base64, suivi des données de l'image encodées en Base64.

**Pièces jointes des e-mails (MIME)** : les pièces jointes des e-mails sont encodées en Base64 pour être transmises via le protocole MIME.

**API JSON** : les données binaires (images, fichiers, signatures cryptographiques) transmises en JSON doivent être encodées en Base64, car le JSON ne gère que du texte.

**Authentification HTTP de base** : l'en-tête Authorization envoie les identifiants sous la forme Base64(nom_utilisateur:mot_de_passe). Ce n'est pas sécurisé en soi — le HTTPS reste indispensable.

**Jetons JWT** : les JSON Web Tokens se composent de trois sections encodées en Base64URL (en-tête, charge utile, signature) séparées par des points.

**Stockage en base de données** : les blobs binaires stockés dans des formats basés sur le texte (certaines bases NoSQL ou fichiers de configuration) sont souvent encodés en Base64.

## Base64 contre Base64URL

Le Base64 standard utilise les caractères + et /, qui ont une signification spéciale dans les URL. Le Base64URL les remplace respectivement par - et _ pour rendre les données encodées compatibles avec les URL. Les jetons JWT utilisent le Base64URL, et le caractère de remplissage = y est aussi souvent omis.

## Une précision sur la sécurité

Le Base64 n'est PAS un mécanisme de chiffrement. Quiconque reçoit des données encodées en Base64 peut les décoder immédiatement à l'aide de n'importe quel décodeur disponible gratuitement en ligne. N'utilisez jamais le Base64 pour tenter de « cacher » une information sensible — utilisez à la place un véritable chiffrement, conçu mathématiquement pour empêcher toute lecture sans la bonne clé, contrairement au Base64 qui n'est qu'une reformulation réversible des mêmes données.

## Comment utiliser l'outil

Collez du texte dans le champ d'encodage pour obtenir immédiatement sa représentation en Base64, ou collez une chaîne Base64 dans le champ de décodage pour retrouver le texte d'origine, les deux sens se mettant à jour en direct pendant que vous tapez. C'est pratique pour inspecter rapidement la charge utile d'un jeton JWT, vérifier ce que contient réellement une URI de données, ou préparer une valeur qui doit transiter en toute sécurité par un canal purement textuel comme un paramètre d'URL ou un champ JSON.

## Comment fonctionne l'encodage Base64, étape par étape

Le Base64 convertit des données binaires en texte selon un procédé assez direct. D'abord, les données binaires sont regroupées en blocs de 3 octets, soit 24 bits. Chaque bloc de 24 bits est ensuite découpé en quatre groupes de 6 bits. Chaque valeur de 6 bits, comprise entre 0 et 63, est alors traduite dans l'alphabet Base64, où A=0, B=1, et ainsi de suite jusqu'à Z=25, puis a=26 jusqu'à z=51, 0=52 jusqu'à 9=61, +=62 et /=63. Si l'entrée n'est pas un multiple exact de 3 octets, des caractères de remplissage = sont ajoutés à la fin pour compléter le dernier groupe. Puisque 3 octets deviennent 4 caractères Base64, l'encodage augmente la taille des données d'environ 33 % — un fichier binaire de 1 Mo encodé en Base64 pèse environ 1,37 Mo une fois converti en texte.

## URI de données et images intégrées

L'un des usages les plus visibles du Base64 sur le web est l'URI de données, qui permet d'intégrer un fichier directement dans du HTML ou du CSS plutôt que de le référencer comme fichier séparé, sous une forme telle que `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`. Cela évite une requête HTTP supplémentaire pour récupérer la ressource, ce qui peut améliorer les performances pour de petites icônes et images. Cependant, les données en Base64 ne peuvent pas être mises en cache indépendamment de la page dans laquelle elles sont intégrées, et la surcharge de taille d'environ 33 % rend cette approche peu efficace pour de grandes images, raison pour laquelle on la réserve généralement à de petits éléments.

## Les jetons JWT et le Base64URL

Les JSON Web Tokens utilisent une variante appelée Base64URL, qui remplace les caractères + et /, porteurs d'une signification particulière dans les URL, respectivement par - et _, et omet généralement entièrement le remplissage =. Un JWT se présente comme trois sections séparées par des points — en-tête, charge utile et signature —, chacune étant un morceau de données encodé en Base64URL, ce qui permet de placer un JWT directement dans une URL ou un en-tête HTTP sans échappement supplémentaire.

## Le Base64 dans le courrier électronique

La norme MIME pour le courrier électronique définit comment encoder les corps de message et les pièces jointes pour leur transmission. Le contenu textuel utilise généralement un autre schéma appelé « quoted-printable », tandis que les pièces jointes binaires utilisent le Base64. Lorsque vous joignez un PDF à un e-mail, votre client de messagerie l'encode en Base64 avant l'envoi, et le client du destinataire le décode automatiquement pour retrouver le fichier d'origine, le tout invisible pour les deux personnes concernées.

## Privé et instantané

L'encodage et le décodage s'exécutent entièrement dans votre navigateur à l'aide des fonctions intégrées btoa et atob, si bien que les résultats apparaissent instantanément et qu'aucune donnée que vous encodez ou décodez n'est jamais envoyée où que ce soit, même hors ligne une fois la page chargée, sans aucune limite d'usage, aucun coût et aucune inscription requise.
