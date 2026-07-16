## Créez des URL balisées UTM pour un suivi précis des campagnes

Les paramètres UTM sont le moyen standard d'indiquer aux plateformes d'analyse comme Google Analytics exactement d'où vient le trafic d'un site Web. Sans balises UTM, le trafic de votre newsletter par e-mail, vos publications sur les réseaux sociaux et vos publicités payantes se ressemblent tous dans les analyses – tous classés comme « directs » ou regroupés dans des catégories de référence génériques. Avec les balises UTM, vous savez précisément quelle campagne, quel support et quelle source ont conduit chaque visiteur.

## Que sont les paramètres UTM ?

UTM signifie Module de suivi Urchin. Urchin Software était une société d'analyse Web acquise par Google en 2005 et son module de suivi est devenu la base de Google Analytics. La dénomination UTM est restée la norme du secteur, même si Urchin lui-même a été abandonné.

Les paramètres UTM sont des paires clé-valeur ajoutées à une URL sous forme de chaîne de requête. Par exemple :

https://example.com/sale?utm_source=newsletter&utm_medium=email&utm_campaign=summer_sale

Lorsqu'un internaute clique sur ce lien et arrive sur votre site Web, Google Analytics (ou toute autre plateforme d'analyse prenant en charge UTM) enregistre les trois paramètres ainsi que les données de visite.

## Les cinq paramètres UTM

**utm_source** (obligatoire) : identifie la provenance du trafic. Exemples : newsletter, facebook, google, linkedin, twitter, instagram, podcast.

**utm_medium** (obligatoire) : décrit le canal ou le mécanisme marketing. Exemples : e-mail, réseaux sociaux, cpc (coût par clic), organique, référencement, bannière, affiliation.

**utm_campaign** (obligatoire) : nomme la campagne marketing spécifique. Exemples : summer_sale_2024, product_launch_v2, brand_awareness_q1.

**utm_term** (facultatif) : utilisé principalement pour la recherche payante afin d'identifier le mot clé qui a déclenché l'annonce. Exemple : course à pied+chaussures, meilleur+crm+logiciel.

**utm_content** (facultatif) : utilisé pour les tests A/B ou pour différencier plusieurs liens dans la même campagne. Exemples : cta_button, hero_image, footer_link, version_a.

## Meilleures pratiques pour la dénomination UTM

**La cohérence est essentielle** : utm_source=Email et utm_source=email sont traités comme deux sources différentes. Établissez une convention de dénomination et respectez-la dans l’ensemble de votre organisation.

**Utilisez des minuscules** : la plupart des équipes utilisent des minuscules avec des traits de soulignement ou des traits d'union. Évitez les espaces (utilisez + ou %20 si nécessaire, mais des outils comme celui-ci gèrent automatiquement l'encodage).

**Soyez descriptif mais concis** : utm_campaign=summer_sale_2024 vous en dit plus que utm_campaign=campaign1.

**Ne pas utiliser UTM sur les liens internes** : les paramètres UTM réinitialisent la session dans Google Analytics. Les liens internes avec les UTM attribueront incorrectement le trafic.

## Exemples d'URL de campagne courants

Newsletter : utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest
Publicité Facebook : utm_source=facebook&utm_medium=cpc&utm_campaign=brand_awareness
Publication LinkedIn : utm_source=linkedin&utm_medium=social&utm_campaign=product_launch
Code QR sur un flyer : utm_source=print_flyer&utm_medium=qr_code&utm_campaign=event_2024

## Comment utiliser le constructeur

Entrez votre URL de destination et remplissez les champs source, support et campagne, en ajoutant un terme et du contenu si votre campagne en a besoin, et l'URL balisée complète apparaît immédiatement, correctement encodée et prête à être copiée dans un e-mail, une plateforme publicitaire ou une publication sociale. Le construire de cette manière supprime les deux erreurs les plus courantes commises par les gens en tapant manuellement des liens UTM : une faute de frappe dans un nom de paramètre que les analyses ne parviennent pas à reconnaître silencieusement, et une majuscule incohérente qui divise ce qui devrait être une source de trafic en plusieurs sources d'apparence différente dans un rapport.

## Pourquoi la cohérence compte plus que les noms exacts que vous choisissez

Les plates-formes d'analyse traitent les valeurs UTM comme des chaînes littérales plutôt que d'interpréter leur signification. Ainsi, « Newsletter », « newsletter » et « news_letter » sont enregistrées comme trois sources complètement distinctes, même si un humain lisant le rapport les reconnaîtrait comme la même chose. C'est la façon la plus courante dont le suivi UTM s'effondre discrètement au sein des grandes équipes marketing : tout le monde est d'accord sur le concept mais personne n'impose l'orthographe exacte, et des mois plus tard, le rapport d'analyse est fragmenté en une douzaine de lignes presque en double qui signifient toutes la même campagne. Décider d'une convention de dénomination avant votre première campagne et demander à chaque membre de l'équipe de créer des liens via le même outil avec les mêmes valeurs évite cela de manière beaucoup plus fiable que d'essayer de nettoyer les données après coup.

## Balises UTM et suivi natif de la plateforme

Certaines plateformes publicitaires, notamment Google Ads et Facebook Ads, proposent leurs propres systèmes de marquage automatique (gclid, fbclid) qui peuvent dupliquer ou entrer en conflit avec les paramètres UTM créés manuellement si les deux sont utilisés négligemment sur le même lien. La meilleure pratique générale consiste à laisser le marquage automatique de la plate-forme gérer l'attribution spécifique à la plate-forme tout en utilisant les paramètres UTM pour l'histoire plus large au niveau de la campagne que vous souhaitez voir dans Google Analytics (la source, le support et le nom de la campagne), car les paramètres UTM sont le seul schéma de marquage que pratiquement toutes les plateformes d'analyse comprennent de manière cohérente, quel que soit le réseau publicitaire qui a réellement généré le clic.

## Auditer vos liens UTM avant le lancement

Avant qu'une campagne ne soit lancée, il vaut la peine de tester chaque lien balisé UTM exactement comme un destinataire le rencontrerait : collez l'URL complète dans une fenêtre de navigateur privée et confirmez qu'elle atterrit sur la page prévue avec les balises intactes, car certains systèmes de gestion de contenu et raccourcisseurs de liens suppriment silencieusement les paramètres de requête lors d'une redirection. Une campagne qui semble parfaitement balisée dans le générateur mais qui perd ses paramètres UTM quelque part dans une chaîne de redirection sera signalée comme un trafic « direct » dans l'analyse, effaçant silencieusement l'attribution exacte que les balises étaient censées fournir.

## Conserver une référence de dénomination partagée

Les grandes équipes ont intérêt à conserver un simple document de référence partagé répertoriant les valeurs exactes approuvées pour utm_source et utm_medium — « email », et non « Email » ou « e-mail » — afin que tous ceux qui créent des liens de campagne, quel que soit l'outil qu'ils utilisent, produisent des valeurs UTM qui s'enroulent proprement dans les mêmes lignes dans un rapport d'analyse plutôt que de se fragmenter en quasi-doublons au fil du temps.

## Privé et instantané

L'URL est entièrement créée dans votre navigateur, elle apparaît donc instantanément au fur et à mesure que vous tapez et rien de ce que vous saisissez n'est jamais envoyé à un serveur, enregistré ou partagé.

