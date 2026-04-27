import type { LocaleTranslations } from "../i18n";

/**
 * French translations for sample plans.
 *
 * Stratégie : enrichissement marketing-grade — les exemples doivent se
 * lire comme PLUS RICHES que la sortie réelle de l'API Claude, parce
 * que les exemples sont la surface de conversion. Chaque description
 * d'étape ajoute 1,3 à 1,5× le contenu source avec détails sensoriels,
 * timing d'initié, plats signature, et ancrages émotionnels.
 * Ton : vouvoiement, chaleureux mais professionnel.
 *
 * Couverture au 2026-04-27 : tous les 10 exemples COMPLETS.
 */
const fr: LocaleTranslations = {
  "tokyo-4d-couple": {
    tagline: "Quatre jours en couple — sanctuaires, sushi, et un coucher de soleil à Kamakura.",
    audience: "Couple · Milieu de gamme",
    destination: "Tokyo",
    destinationCountry: "Japon",
    overview:
      "Quatre jours pour un couple qui veut équilibrer les icônes néon de Tokyo et les moments romantiques discrets. Chaque journée commence et se termine par un repas inoubliable ; vous traverserez lentement des quartiers où des sanctuaires centenaires côtoient les ruelles éclairées au néon ; chaque crépuscule offre un cliché digne d'être posté depuis la fenêtre de votre chambre. Du carrefour de Shibuya à la plage dorée de Kamakura, ces 4 jours deviendront une mémoire urbaine partagée à deux.",
    bestSeasonNote:
      "De fin mars à début avril pour les cerisiers en fleurs (la pleine floraison ne dure que 7 jours — surveillez les prévisions «sakura zensen» pour cibler la semaine optimale), ou mi-novembre pour les couleurs d'automne. Évitez la Golden Week (fin avril-début mai) : pic du tourisme intérieur japonais, prix d'hôtel doublés, foules étouffantes. Fin janvier-début février est une alternative — froid mais peu de monde, et le jardin Shinjuku Gyoen sous la neige avec ses torii rouges est une vision rare.",
    currencyTip:
      "Étonnamment, le Japon reste un pays de cash. Dès l'arrivée, retirez 30 000-50 000 yens (environ 200-330 €) à un distributeur 7-Eleven ou FamilyMart — les cartes étrangères passent toujours. Les petits restaurants, les sanctuaires et les stands de rue n'acceptent souvent que le cash. Les chaînes et les konbini acceptent volontiers carte bancaire et PayPay ; la carte IC Suica/PASMO résout métros et bus en un seul tap.",
    languageTip:
      "Le mode caméra de Google Translate déchiffre menus et panneaux à la volée — téléchargez le pack japonais hors-ligne avant le départ. Une simple «sumimasen» (pardon) accompagnée d'un sourire et d'un hochement de tête vous ouvre toutes les portes. À la caisse du konbini, on vous demandera «fukuro irimasu ka ?» (voulez-vous un sac ?) — un signe de tête négatif ou «daijōbu» suffit.",
    emergencyNumber: "110 (police), 119 (ambulance/pompiers)",
    hotel: {
      name: "Hotel Gracery Shinjuku",
      area: "Shinjuku",
      address: "1-19-1 Kabukichō, Shinjuku-ku, Tokyo 160-8466",
      rationale:
        "Pour 4 jours depuis Narita, Shinjuku est la base optimale — le Narita Express arrive à 6 minutes à pied de l'hôtel, et toutes les lignes JR et de métro dont vous aurez besoin partent d'ici. Tous les dîners sont accessibles à pied. La tête de Godzilla qui surplombe l'entrée au 8e étage est un bonus visuel ; les chambres thématiques Hello Kitty ou avec vue sur Godzilla valent le surcoût pour l'expérience. Réception 24h en anglais, consigne à bagages tard le soir.",
      estimatedNightlyRate: "~140 €/nuit",
    },
    airportTransit: {
      method: "Narita Express (N'EX) → Gare JR Shinjuku",
      duration: "Environ 80 minutes",
      cost: "~30 € (pass aller-retour étrangers plus avantageux)",
      instructions:
        "À l'aéroport de Narita Terminal 1, après le contrôle des passeports, suivez les panneaux bleus «JR» jusqu'au sous-sol -1. Au JR EAST Travel Service Center, présentez votre passeport pour acheter le billet aller-retour étrangers (~50 €, valable 14 jours). Tous les N'EX vers Shinjuku ont ce terminus — impossible de se tromper. À la sortie sud de Shinjuku, traversez Kabukichō en 6 minutes à pied, terrain plat. Arrivée le soir un week-end ? Achetez de l'eau et un onigiri au konbini de la gare avant de partir — vous aurez faim en route.",
    },
    days: [
      {
        theme: "Shibuya & Harajuku",
        summary:
          "Une demi-journée pour les deux quartiers les plus photogéniques de Tokyo, terminée au crépuscule au carrefour le plus célèbre du monde.",
        stops: [
          {
            name: "Sanctuaire Meiji Jingu",
            area: "Shibuya",
            address: "1-1 Yoyogikamizonochō, Shibuya-ku",
            duration: "1h30",
            description:
              "Une forêt de 70 hectares de 100 000 arbres plantés par des bénévoles en 1920, qui abrite un sanctuaire shinto. Franchir le grand torii rouge et marcher sur le sentier de gravier qui crisse sous vos pas suffit à faire taire la rumeur de Tokyo en trois secondes. Devant le bâtiment principal, glissez 100 ¥ pour acheter un omamori de protection de voyage. La haute paroi de fûts de saké votifs sur le côté est un cliché obligé — chaque blason familial cache une distillerie centenaire. Avant 10h, vous aurez ce silence sacré presque pour vous seul.",
            estimatedCost: "Gratuit",
            transitFromPrev: "JR Yamanote depuis Shinjuku (4 min), puis 5 min à pied depuis la gare Harajuku",
          },
          {
            name: "Takeshita-dori",
            area: "Harajuku",
            duration: "1h",
            description:
              "Le berceau de la mode adolescente tokyoïte. Même si vous n'achetez rien, parcourir ces 350 mètres est un choc sensoriel — barbes-à-papa arc-en-ciel, glaces géantes, boutiques de crêpes alignées les unes contre les autres. Marion Crepes est l'aïeule du genre depuis 1976, et la «fraise-crème-fromage» est le standard. Le week-end après-midi, c'est tellement bondé que vous ne pouvez plus lever votre téléphone — visez 10h-11h en semaine pour la zone douce.",
            estimatedCost: "Snacks ~10 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "AFURI Harajuku (ramen yuzu-shio)",
            area: "Harajuku",
            duration: "45 min",
            description:
              "Le ramen idéal par chaude journée — l'écorce de yuzu transforme un bouillon «lourd» en quelque chose qui «flotte». Le distributeur de tickets à l'entrée a une interface anglaise ; choisissez «yuzu shio» ou «yuzu shoyu» (1 500 ¥), ajoutez l'œuf molly à 150 ¥. Une vingtaine de places au comptoir, un bol englouti en 5 minutes. AFURI, c'est le déjeuner habituel des cols blancs de Shibuya — et le logo, c'est un cerf.",
            estimatedCost: "~12 €",
            transitFromPrev: "3 min à pied",
          },
          {
            name: "Omotesandō",
            area: "Omotesandō",
            duration: "1h",
            description:
              "Les Champs-Élysées de Tokyo. Tadao Andō, Herzog & de Meuron, SANAA — les boutiques flagship des grands designers s'alignent sous une voûte d'ormes. Dior, Prada, Tod's : leurs bâtiments eux-mêmes sont des œuvres d'art. Le simple lèche-vitrine devient un cours d'architecture. En décembre, les illuminations de Noël transforment toute l'avenue en couloir doré, de fin novembre jusqu'à Noël. La rampe en spirale d'Omotesandō Hills (Andō) mérite un détour.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Carrefour de Shibuya & statue Hachikō",
            area: "Shibuya",
            duration: "1h",
            description:
              "Le carrefour piéton le plus célèbre du monde. Traversez-le au moins une fois — quand le feu passe au vert, 4 directions partent en même temps, 3 000 personnes se croisent en 30 secondes. Puis montez au «CROSSING VIEW» au 7e étage du MAGNET shibuya juste en face (800 ¥) — c'est de là que vient cette photo de carte postale qu'on voit partout. La statue de Hachikō se trouve sur le parvis nord — le chien akita d'un professeur de l'Université impériale qui, à la mort de son maître en 1925, continua à venir l'attendre à la gare chaque soir pendant 10 ans, jusqu'à sa propre mort. Une plaque de bronze à côté raconte l'histoire.",
            estimatedCost: "Gratuit (café ~5 €)",
            transitFromPrev: "Métro Ginza 4 min",
          },
          {
            name: "Uobei Shibuya Dōgenzaka",
            area: "Shibuya",
            duration: "1h",
            description:
              "Vos sushis arrivent jusqu'à votre place sur un mini-rail Shinkansen — sushi tournant high-tech, qualité bien au-dessus des attentes, environ 45 € à deux pour être rassasié. Tablette de commande en anglais, et c'est sushi de bonite, gunkan d'oursin, omelette tamago, sushi flambé de bœuf wagyu A5, et maki de fromage et œufs de morue à essayer. Au 3e étage du même immeuble que MEGA Don Quijote — passez après pour les snacks et cosmétiques.",
            estimatedCost: "~24 € par personne",
            bookingTip: "15-20 min d'attente en heure de pointe ; prenez votre numéro à la borne d'entrée et attendez à côté.",
            transitFromPrev: "8 min à pied",
          },
        ],
      },
      {
        theme: "Vieux Tokyo : Asakusa & Ueno",
        summary: "Une journée dans le shitamachi (vieille ville) — temple millénaire, ruelle de stands, le meilleur cluster de musées de Tokyo.",
        stops: [
          {
            name: "Sensō-ji",
            area: "Asakusa",
            address: "2-3-1 Asakusa, Taitō-ku",
            duration: "1h30",
            description:
              "Le plus vieux temple de Tokyo (fondé en 645). Passez la porte Kaminarimon ornée de son immense lanterne rouge, puis remontez l'allée commerçante Nakamise jusqu'au hall principal. Avant 10h, vous photographiez la porte presque sans personne — la photo que vous enverrez à toute la famille. Devant le hall principal, tirez votre omikuji (oracle, 100 ¥) — si c'est une mauvaise fortune, nouez le papier sur la grille en métal pour que le vent l'emporte. Devant le brûle-encens, regardez les locaux laver la fumée sur leur tête, leurs épaules ou leurs genoux pour les guérir — vous finirez par les imiter.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Métro Ginza depuis Shibuya → Asakusa, environ 35 min",
          },
          {
            name: "Nakamise-dōri",
            area: "Asakusa",
            duration: "45 min",
            description:
              "200 mètres d'allée de stands : ningyō-yaki (gâteaux fourrés en forme), gaufrettes senbei, artefacts traditionnels en bois. L'agemanjū (petit pain frit fourré à la pâte de haricot rouge) d'Asakusa Kokonoe (110 ¥) est à essayer chaud — la pâte brûle la langue mais on ne peut plus s'arrêter. Kimuraya, dynastie de ningyō-yaki depuis 1868, en vend 7 pour 600 ¥. Achetez-en une part et mangez en marchant — c'est le rythme du quartier shitamachi.",
            estimatedCost: "Snacks ~5 €",
            transitFromPrev: "Inclus",
          },
          {
            name: "Daikokuya Tempura",
            area: "Asakusa",
            duration: "1h",
            description:
              "Tempura centenaire (130 ans). Le tendon (riz couvert de tempura nappé de sauce) utilise une huile de sésame préparée selon une recette familiale — la couleur est plus foncée que dans la tempura ordinaire, le goût plus riche, sucré-salé : on en trouve presque nulle part en dehors du Japon. Assis dans la salle en planches au premier étage, vous voyez le quartier de Kaminarimon par la fenêtre. Le déjeuner attire 15-20 minutes d'attente ; arrivez à 11h45 ou après 14h. Riz à volonté (okawari) — n'hésitez pas.",
            estimatedCost: "~22 €",
            bookingTip: "Pas de réservation. Faites la queue sur le côté gauche de l'entrée, le serveur distribue des numéros.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Musée National de Tokyo",
            area: "Ueno",
            address: "13-9 Ueno-kōen, Taitō-ku",
            duration: "2h",
            description:
              "Le plus ancien et le plus grand musée du Japon. Sautez les autres pavillons et concentrez-vous sur le Honkan (bâtiment principal). La galerie d'armures et de katanas de samouraïs au 1er étage est de niveau mondial — œuvres de Nagamitsu, Masamune, Muramasa, dont chaque lame reflète le visage du visiteur. La galerie d'estampes ukiyo-e au rez-de-chaussée tourne tous les mois ; «La Grande Vague» d'Hokusai s'y expose parfois. Consigne pour bagages volumineux gratuite, plan du musée disponible en français.",
            estimatedCost: "~7 €",
            transitFromPrev: "Métro Ginza Asakusa → Ueno, 5 min, puis 10 min à pied",
          },
          {
            name: "Promenade au parc Ueno",
            area: "Ueno",
            duration: "1h",
            description:
              "Le premier parc public de Tokyo. Faites le tour de l'étang Shinobazu, traversez le petit pont jusqu'au temple Bentendō (dédié à Benzaiten, déesse de la richesse et des arts). En été, l'étang se couvre entièrement de lotus roses — le pic est entre fin juillet et début août, et avant 6h vous photographiez les fleurs avec la rosée du matin. En automne, les ginkgos virent au jaune. Pendant la saison des cerisiers, c'est l'un des spots de hanami les plus animés de Tokyo — plus de 1 000 cerisiers le long de l'allée principale, mais aussi le plus bondé.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Ameya-Yokochō",
            area: "Ueno",
            duration: "1h30",
            description:
              "Un marché noir d'après-guerre devenu le marché le plus animé de Tokyo — sous 400 mètres de viaduc, fruits de mer, produits secs, cosmétiques, baskets, bars debout s'entassent. Le soir après 18h, les bars debout s'animent — une bière pression à environ 350 ¥, les brochettes à 150 ¥, et le jeu consiste à manger debout en discutant avec ses voisins. «Daitōryō» est un vieil iccachant célèbre — sashimi de cheval et abats mijotés sont les spécialités, vous hésiterez mais ne le regretterez pas.",
            estimatedCost: "~16 € par personne",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "Tsukiji, Ginza & Palais impérial",
        summary: "Petit-déjeuner sushi, jardins impériaux, dîner sur l'avenue commerçante la plus raffinée du monde.",
        stops: [
          {
            name: "Petit-déjeuner au marché extérieur de Tsukiji",
            area: "Tsukiji",
            address: "Tsukiji 4-chōme, Chūō-ku",
            duration: "1h30",
            description:
              "Le marché de gros a déménagé à Toyosu, mais le marché extérieur reste à Tsukiji — comptoirs à sushi, spécialistes de tamagoyaki, de oursin, de nori s'y serrent. Sushizanmai (ouvert 24h/24) vous prépare un plateau de 11 sushis omakase pour 3 300 ¥ : chu-toro, ō-toro, oursin, anguille, tamagoyaki défilent sur le comptoir. Le tamagoyaki à la truffe (300 ¥ la part) est à essayer en dessert — couches d'œuf battu mêlé à du dashi, sucré-salé, miraculeux.",
            estimatedCost: "~22 €",
            bookingTip: "Arrivez avant 8h30 ; la plupart ferment à 13h. Certains sont fermés dimanche et mercredi.",
            transitFromPrev: "Métro Marunouchi → Hibiya depuis Shinjuku, environ 25 min",
          },
          {
            name: "Jardins Hama-rikyū",
            area: "Shiodome",
            duration: "1h",
            description:
              "Un jardin du shōgun du XVIIe siècle. L'eau de mer entre dans les bassins par les marées, des pins noirs vieux de 300 ans sont taillés comme des bonsaïs. Au cœur, le pavillon de thé Nakajima (Nakajima no ochaya) flotte sur l'étang — asseyez-vous sur les tatamis, commandez le set «matcha + wagashi» (850 ¥), le moment où la coupe de thé arrive devant vous est l'apogée de la cérémonie. Les wagashi changent par saison — sakura au printemps, hortensia en été, momiji en automne, camélia en hiver. Par la fenêtre, les gratte-ciel de Shiodome dominent — vous, vous êtes assis au XIXe siècle Edo.",
            estimatedCost: "Entrée ~3 € + thé ~6 €",
            transitFromPrev: "15 min à pied",
          },
          {
            name: "Jardin Est du Palais impérial",
            area: "Chiyoda",
            duration: "1h30",
            description:
              "Vestiges du château d'Edo transformés en parc public gratuit. Les fondations en pierre de l'ancien donjon sont encore là — montez et regardez le palais impérial à 360°. Cherchez aussi le pavillon Suwa-no-chaya (1912). En automne, derrière le pavillon Honmaru, une rangée de centaines de ginkgo dorés — un tunnel de feuilles. Fermé lundi et vendredi. Billets gratuits aux portes Ōte-mon, Hirakawa-mon ou Kita-hanebashi-mon, à rendre en sortant.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Métro Hibiya Shinbashi → Hibiya à pied, environ 15 min",
          },
          {
            name: "Tonkatsu Maisen Aoyama",
            area: "Aoyama",
            duration: "1h",
            description:
              "Le tonkatsu (porc pané) le plus aimé de Tokyo, dans une ancienne maison de bains transformée. Le set «filet de porc noir» est l'incontournable — utilisant la technique «shinkū chōri» (cuisson sous-vide) avant la friture, l'intérieur reste rose tendre, sans gras lourd. Chou râpé, soupe miso et riz blanc à volonté. La fenêtre extérieure vend la version sandwich (hire katsu sando, 350 ¥) — réputée comme «l'un des meilleurs bentō de Tokyo».",
            estimatedCost: "~16 €",
            transitFromPrev: "Métro Chiyoda, environ 10 min",
          },
          {
            name: "Avenue commerçante de Ginza",
            area: "Ginza",
            duration: "2h",
            description:
              "Même sans intérêt pour le luxe, ça vaut la visite. Le dimanche après-midi, l'avenue Chuō-dōri devient «paradis des piétons» (11h-18h) — vous pouvez photographier au milieu de la rue. Itoya, papeterie sur 9 étages, est l'un des magasins non-luxe les plus intéressants de Tokyo : carnets, encres, papier washi, sceaux. L'Apple Store au 6e étage a une terrasse panoramique gratuite face à Ginza. Les vitrines de Mitsukoshi, Wakō et Wako changent chaque mois — celles de Noël sont une attraction de la ville.",
            estimatedCost: "Gratuit~$$$$",
            transitFromPrev: "Métro Ginza, 8 min",
          },
          {
            name: "Yakitori Imai",
            area: "Aoyama",
            duration: "1h30",
            description:
              "Yakitori étoilé Michelin où chaque partie du poulet est grillée au charbon binchōtan. Le menu omakase est le seul choix — le chef adapte 12-15 brochettes selon l'état du poulet du jour : du blanc à la cuisse, en passant par crête, cœur, cartilage. La finesse de cette anatomie vous fera redécouvrir le mot «poulet». Le binchōtan donne un parfum incomparable au gaz — la graisse qui tombe sur le charbon enflamme un nuage aromatique. Entre chaque brochette, un «otsumami» (amuse-bouche) régule le rythme.",
            estimatedCost: "~40 € par personne",
            bookingTip: "Réservez 1-2 semaines à l'avance par le concierge de l'hôtel ; ils parlent anglais. Tenue habillée recommandée.",
            transitFromPrev: "Métro, environ 15 min",
          },
        ],
      },
      {
        theme: "Excursion d'une journée : Kamakura",
        summary: "Une heure au sud de Tokyo. La capitale du premier shogunat. Temples, Grand Bouddha, plage immense pour le coucher de soleil.",
        stops: [
          {
            name: "Train pour Kamakura",
            area: "Gare de Tokyo → Kamakura",
            duration: "1h",
            description:
              "Depuis la gare de Tokyo, JR Yokosuka direct jusqu'à Kamakura. Au guichet étrangers JR EAST, achetez le «Kamakura Free Pass» (~830 ¥) — illimité sur le tramway Enoden de l'après-midi. Optez pour place réservée (vs libre à 920 ¥, ou Green Car à 1 500 ¥) — les trajets retour le week-end sont bondés dans les deux sens. Vous passez par Yokohama ; à gauche, par temps clair, le contour du mont Fuji se dessine au loin.",
            estimatedCost: "Aller-retour ~14 €",
            transitFromPrev: "Shinjuku → Chūō line → Gare de Tokyo, environ 20 min",
          },
          {
            name: "Tsurugaoka Hachiman-gū",
            area: "Kamakura",
            address: "Yukinoshita 2-1-31, Kamakura",
            duration: "1h",
            description:
              "Sanctuaire fondé en 1063, le plus important de Kamakura. À la sortie est de la gare, marchez 800 mètres sur le Wakamiya-ōji — l'ancien chemin processionnel des samouraïs, dont la partie centrale surélevée s'appelle dankazura, bordée de cerisiers. Montez les marches abruptes du «Daisekidan» (60 marches) — au sommet, en vous retournant, vous voyez la mer et la ville en une ligne : la carte postale classique de Kamakura. Dans l'enceinte, l'étang Genji-ike se couvre de lotus en été, blancs et roses séparés.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied depuis la gare de Kamakura",
          },
          {
            name: "Soba Yoritomo",
            area: "Komachi-dōri",
            duration: "1h",
            description:
              "Choisissez n'importe quelle maison de soba traditionnelle dans la rue Komachi (rue d'artisanat et de snacks). Soba taillées à la main et tsuyu glacé — la fraîcheur explique pourquoi les Japonais veulent ce plat après une montée à pied. Ajoutez un plateau de tempura (crevette, aubergine, maitake). «Kawakoeya» est la vieille référence locale ; le bouillon de soba (sobayu, fait avec l'eau de cuisson) est gratuit à volonté — c'est le rituel d'après-repas.",
            estimatedCost: "~12 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Gare Hase de l'Enoden",
            area: "Kamakura → Hase",
            duration: "10 min",
            description:
              "Tramway monovoie inauguré en 1902. Il longe la côte ; entre deux gares, à «Kamakura Kōkō Mae», la mer et les rails parallèles forment l'image du générique de «Slam Dunk» — le passage à niveau est aujourd'hui un lieu de pèlerinage des fans, le week-end on fait la queue pour la photo. Asseyez-vous côté droit fenêtre, dans la mini-rame de 2 wagons — on a l'impression de voyager dans une planche illustrée d'antan.",
            estimatedCost: "Inclus dans le pass",
            transitFromPrev: "5 min à pied depuis la gare de Kamakura",
          },
          {
            name: "Kōtoku-in (Grand Bouddha de Kamakura)",
            area: "Hase",
            address: "Hase 4-2-28, Kamakura",
            duration: "1h",
            description:
              "Bouddha en bronze de 13,35 mètres coulé en 1252. En 1498, un tsunami a emporté le bâtiment qui l'abritait — depuis 600 ans, il est assis en plein air, sous la pluie et le vent ; le vert-de-gris à sa surface est un calendrier. Pour 20 ¥ supplémentaires, on entre par une petite porte dans le dos du Bouddha pour voir l'intérieur — l'espace est étroit mais on aperçoit les soudures de la fonte. À côté, ne manquez pas le pavillon Kangetsu-dō — une statue de Guanyin coréenne du XIVe siècle, déplacée depuis Séoul en 1924, exemplaire unique.",
            estimatedCost: "~3 € + 0,15 € intérieur",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Coucher de soleil sur la plage de Yuigahama",
            area: "Yuigahama",
            duration: "1h",
            description:
              "La plage de surf en arc de Kamakura. Hors saison presque déserte. Asseyez-vous sur le sable, regardez le soleil descendre vers la péninsule d'Izu à l'ouest, le ciel passe de l'orange au rose au violet profond, et le temps semble s'arrêter. Les silhouettes des surfeurs défilent une à une — Kamakura est l'endroit le plus proche de Tokyo pour apprendre le surf. Au retour, l'Enoden vous ramène ; arrêt bref à «Shichirigahama» pour voir la mer sous la lune avant le retour à Tokyo. C'est la photo qui mérite la place d'honneur dans l'album «notre voyage».",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
    ],
    packingTips: [
      "Chaussures à enfiler — sanctuaires, ryokan et certains restaurants exigent qu'on se déchausse, à éviter les baskets à lacets",
      "Petit sac d'appoint — Tokyo a très peu de poubelles publiques, vous porterez vos déchets toute la journée",
      "Batterie externe — Google Maps + traduction épuisent vite la batterie, visez 10 000 mAh",
      "Petit porte-monnaie — petits restaurants, sanctuaires et stands restent en cash, les billets de 5 000 ¥ et moins sont les plus utiles",
      "Lingettes humides — certaines toilettes publiques n'ont pas de papier, mieux vaut prévoir",
      "Veste légère — même en été, la clim du métro et des grands magasins est polaire",
    ],
    budgetEstimate: "Hors hôtel : 110-160 €/jour pour deux",
    generalTips: [
      "Procurez-vous une carte IC Suica le 1er jour — paiement sans contact pour trains, bus et distributeurs ; solde remboursable au konbini",
      "La nourriture des konbini (7-Eleven, Lawson, FamilyMart) est étonnamment bonne — onigiri, oden et sandwiches aux œufs résolvent petit-déj' et déjeuner",
      "Aucune culture du pourboire — l'imposer met les employés mal à l'aise",
      "La plupart des musées ferment le lundi — calez votre planning autour",
      "Téléchargez l'app «Japan Travel» — cartes hors-ligne, horaires JR, points de détaxe",
      "Les distributeurs des konbini acceptent Visa et certaines cartes UnionPay ; 7-Bank a le meilleur taux de change",
    ],
  },

  "paris-3d-family": {
    tagline: "Trois jours à quatre — la Tour Eiffel, le Louvre, et une journée Disney complète.",
    audience: "Famille avec enfants · Milieu de gamme",
    destination: "Paris",
    destinationCountry: "France",
    overview:
      "Trois jours pour une famille avec deux jeunes enfants qui veut voir les icônes de Paris sans qu'il y ait crise toutes les deux heures. Chaque jour combine un grand site avec un long temps en parc ; le déjeuner se cale dans un endroit avec de vraies toilettes (Paris compte peu de toilettes publiques et beaucoup sont payantes) ; on rentre tôt pour avoir l'énergie de profiter des croissants du lendemain matin. Voyager avec des enfants, ce n'est pas un sprint mais un rythme — ces 3 jours vous l'apprennent.",
    bestSeasonNote:
      "Fin mai-début juin et septembre sont la zone douce — parcs agréables, métro pas étouffant, files d'attente aux musées bien plus courtes qu'au cœur de l'été. Fin juillet à mi-août, c'est la fermeture estivale parisienne : beaucoup de petits restaurants affichent «fermeture annuelle», ce qui devient gênant. Les marchés de Noël ouvrent fin novembre jusqu'à Noël, et les illuminations des Champs-Élysées transforment l'hiver en conte — mais préparez-vous psychologiquement à du -2°C.",
    currencyTip:
      "Musées et restaurants prennent Visa/Mastercard sans contact, billet de la Tour Eiffel obligatoirement en ligne. Prévoyez 40-60 € en pièces pour : manège (3-4 € par tour), glaces (3,50 € la boule), petites boulangeries (souvent uniquement cash, et minimum 5 €), pourboires (laisser 1-2 € en pièces si le service a été soigné est de bon ton).",
    languageTip:
      "Vous n'êtes pas censé avoir besoin de traduction... mais petit rappel : entrez dans les boutiques avec un «Bonjour» (le matin/midi) ou «Bonsoir» (après 18h), repartez avec un «Merci, au revoir». Cette habitude ouvre toutes les portes — même au touriste étranger qui passerait après vous, le commerçant restera bienveillant. Pour les enfants, apprenez-leur «Pardon» et «Merci» — les Parisiens craquent pour les petits qui font l'effort.",
    emergencyNumber: "112 (urgence européenne), 15 (SAMU), 17 (police), 18 (pompiers)",
    hotel: {
      name: "Citadines Tour Eiffel Paris",
      area: "15e arrondissement, près de la Tour Eiffel",
      address: "132 Boulevard de Grenelle, 75015 Paris",
      rationale:
        "L'apparthôtel avec kitchenette est le sauveur des familles — le matin, café-céréales en pyjama, goûter à la mi-journée, dîner livré le soir mangé en pyjama. À 10 min à pied de la Tour Eiffel, à 5 min de la station Bir-Hakeim (ligne 6 aérienne, où le métro traverse la Seine face à la Tour Eiffel — l'un des plus beaux trajets de métro parisien) ; de là, 4 stations jusqu'au Louvre. Depuis CDG, RER B + ligne 6 a tous les ascenseurs nécessaires, donc poussette + grosses valises ne sont pas un drame.",
      estimatedNightlyRate: "~280 €/nuit",
    },
    airportTransit: {
      method: "RER B → métro ligne 6 (ou taxi le 1er jour)",
      duration: "Train environ 75 min / Taxi environ 50 min",
      cost: "Train, billet famille environ 20 € / Taxi forfait 56 €",
      instructions:
        "Avec bagages et enfants fatigués, le taxi forfait 56 € de CDG vers la rive gauche est la meilleure option — depuis 2025, tous les taxis CDG-Paris sont au forfait, sans compteur ni négociation. Train : à CDG Terminal 2, suivez les panneaux RER B vers «Paris» n'importe quel train → changez à Denfert-Rochereau pour la ligne 6 (direction Charles de Gaulle-Étoile) → descendez à Bir-Hakeim. Citadines à 5 min à pied. Le RER B a des escaliers à certaines stations — avec poussette + bagages, taxi recommandé. Au nord de Paris, RER B sécurité moyenne, gardez les objets de valeur près de vous.",
    },
    days: [
      {
        theme: "Tour Eiffel & Champ-de-Mars",
        summary: "Démarrer par l'image la plus iconique → s'allonger un moment sur l'herbe avec un pique-nique → laisser les enfants se défouler dans une vraie aire de jeux parisienne.",
        stops: [
          {
            name: "Tour Eiffel (2e étage)",
            area: "Champ-de-Mars",
            address: "5 Avenue Anatole France, 75007 Paris",
            duration: "1h30",
            description:
              "Ne prenez pas le ticket sommet — le 2e étage offre la même vue à couper le souffle, avec une queue bien plus courte et un ascenseur qui accepte la poussette. Réservez exactement 60 jours à l'avance sur toureiffel.paris à 8h30 heure de Paris — réglez le réveil, soyez prêts, vous prenez le créneau idéal (10h-11h30 pour la meilleure lumière) en quelques secondes ; sinon tout est vendu en 2h. La place du Trocadéro en face est l'angle de carte postale classique ; à 6h30 le matin, vous avez la Tour Eiffel face à vous quasiment seuls.",
            estimatedCost: "Adulte ~32 €, enfant ~16 €",
            bookingTip: "Sur toureiffel.paris à 8h30 exactement 60 jours à l'avance. 2h plus tard il ne reste plus que les créneaux creux. Le billet «escaliers + ascenseur» est moins cher et plus rapide.",
            transitFromPrev: "10 min à pied depuis l'hôtel",
          },
          {
            name: "Pique-nique avec Boulangerie Utopie",
            area: "Champ-de-Mars",
            duration: "1h",
            description:
              "Allez à une boulangerie haut de gamme acheter baguette, sandwich jambon-beurre, fruits, pain au chocolat — puis étalez la nappe sur l'herbe du Champ-de-Mars, Tour Eiffel face à vous. Moins cher, plus calme et plus mémorable que n'importe quel restaurant. Vous pouvez ajouter le «Charbon» d'Utopie (pain au charbon végétal) ou des macarons de Pierre Hermé. Du côté de la Seine, une rangée de bancs ; si l'herbe est humide, asseyez-vous là et laissez les enfants chasser les pigeons.",
            estimatedCost: "Famille ~32 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Manège & aire de jeux du Champ-de-Mars",
            area: "Champ-de-Mars",
            duration: "1h30",
            description:
              "À l'extrémité sud du parc, un manège ancien de 100 ans aux chevaux et carrosses sculptés à la main, originaux : 3 € le tour. À côté, l'aire de jeux clôturée — bac à sable, toboggans, filet d'escalade — où les familles parisiennes viennent le week-end. Asseyez-vous sur un banc, regardez vos enfants, et vous-même profitez d'un angle inhabituel sur la Tour Eiffel. Une caféteria mobile près de l'aire vend l'expresso typique des Parisiens debout à 8h du matin.",
            estimatedCost: "Manège ~5 €",
            transitFromPrev: "Inclus",
          },
          {
            name: "Sieste à l'hôtel (sieste enfants)",
            area: "15e",
            duration: "1h30",
            description:
              "Règle d'or du voyage en famille. Retour à l'apparthôtel, les parents se font un thé, les enfants regardent un dessin animé puis s'endorment. Résistez à l'envie de caser un site supplémentaire — sinon première crise à 16h, qui ruinera tout le dîner.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Café Constant",
            area: "Rue Saint-Dominique",
            duration: "1h30",
            description:
              "Bistrot de quartier du chef Christian Constant — vraie cuisine française, mais accessible plus que les étoilés. Poulet rôti + frites + un profiterole par personne. Le menu enfant est sérieusement conçu, pas une formule au rabais. Les serveurs sourient quand ils voient des enfants, plient un bateau en papier pour les petits. Ouvert à 18h, arrivez avant 19h sans réservation. La fenêtre donne sur la Rue Saint-Dominique, l'une des plus agréables de Paris pour la balade en famille.",
            estimatedCost: "Famille ~100 €",
            bookingTip: "TheFork à 1 semaine — précisez 2 enfants, ils mettent une table contre le mur.",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "Louvre essentiel & Tuileries",
        summary: "Visite musée à la vitesse des enfants → manège et bateaux sur la Seine. Ne tentez pas de «tout voir» au Louvre, choisissez 5 œuvres et partez.",
        stops: [
          {
            name: "Musée du Louvre (parcours enfants)",
            area: "1er",
            address: "Rue de Rivoli, 75001 Paris",
            duration: "2h",
            description:
              "Entrez par le souterrain «Carrousel» — file beaucoup plus courte que la pyramide, et avec escalier mécanique. Parcours enfants en 5 œuvres : la Joconde (Denon, 1er étage), la Vénus de Milo, la Victoire de Samothrace, les momies égyptiennes, les appartements de Napoléon III — c'est tout. Donnez la carte du Louvre aux enfants en leur disant que c'est une «chasse au trésor», ils entoureront chaque œuvre trouvée. La meilleure place devant la Joconde se trouve à 3 mètres derrière la barrière à droite — la plupart des gens se massent au centre, l'angle droit est libre.",
            estimatedCost: "Adulte ~32 €, gratuit -18 ans",
            bookingTip: "Sur louvre.fr réservez le créneau horaire 1 semaine à l'avance. Fermé mardi. Premier créneau 9h, la Joconde est presque pour vous seul.",
            transitFromPrev: "Bir-Hakeim ligne 6 → ligne 1, environ 25 min",
          },
          {
            name: "Jardin des Tuileries",
            area: "1er",
            duration: "1h30",
            description:
              "À la sortie du Louvre, vous y êtes. Près du grand bassin central, le stand «Bateaux à voile» loue des voiliers en bois miniatures (6 €) — on les pousse avec une longue tige sur le bassin. Simple, classique, les enfants jouent longtemps. Les allées des deux côtés sont un parcours de sculpture (copies de Rodin). De juin à août, à l'extrémité nord, la Fête des Tuileries installe son mini-parc d'attractions — manèges, jeux d'adresse, barbe-à-papa.",
            estimatedCost: "Bateau ~5 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Angelina (chocolat chaud + déjeuner)",
            area: "Rue de Rivoli",
            duration: "1h",
            description:
              "Salon de thé centenaire. Le «L'Africain», chocolat chaud aussi épais qu'une ganache fondue, suffit à combler les adultes. Croque-monsieur pour les enfants, salade niçoise pour les parents, et un Mont-Blanc partagé en famille — la pâtisserie inventée par Angelina, crème de marrons en spaghettis sur meringue. La boîte rose à emporter en fin d'après-midi, à manger au goûter à l'hôtel, fonctionne aussi.",
            estimatedCost: "Famille ~80 €",
            bookingTip: "Pas de résa moins de 6 personnes — après 13h moins d'attente. Ou allez directement à la fenêtre vente à emporter à côté pour le Mont-Blanc.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Bateaux Mouches sur la Seine",
            area: "Pont de l'Alma",
            duration: "1h30",
            description:
              "Croisière de 70 minutes en bateau découvert au départ du Pont de l'Alma — depuis l'eau, vous passez sous tous les ponts célèbres et voyez Notre-Dame (rouverte en 2024 après l'incendie de 2019), le Louvre, le Musée d'Orsay, et terminez par la Tour Eiffel. Audio en français bien sûr, mais aussi en anglais pour les enfants si vous préférez. Au pont supérieur découvert, les enfants adorent saluer les passants sur les ponts. Si vous embarquez à 19-21h, les rives de la Seine s'allument lampe par lampe, et si vous tombez sur le scintillement doré de la Tour Eiffel toutes les heures (5 minutes), les enfants crient.",
            estimatedCost: "Adulte ~16 €, enfant ~8 €",
            transitFromPrev: "Tuileries ligne 1 → ligne 9, environ 15 min",
          },
          {
            name: "Sieste à l'hôtel + préparation du dîner",
            area: "15e",
            duration: "1h30",
            description:
              "De retour à l'apparthôtel, kitchenette pour faire des pâtes à la sauce tomate, dîner en pyjama. La fenêtre laisse passer le carillon d'une église — les enfants dormiront profondément, demain c'est Disney toute la journée. Les parents peuvent descendre au Monoprix de la rue du Commerce acheter du fromage, du jambon, du vin rouge à remonter — sur le petit balcon, plateau fromage tardif d'adultes.",
            estimatedCost: "Courses ~15 €",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "Disneyland Paris",
        summary: "On garde la plus grosse journée pour la fin. RER 35 minutes depuis le centre, vaut une journée complète.",
        stops: [
          {
            name: "RER A direction Disneyland",
            area: "Châtelet → Marne-la-Vallée",
            duration: "1h",
            description:
              "Bir-Hakeim métro jusqu'à Charles de Gaulle-Étoile, puis RER A direction Marne-la-Vallée Chessy — terminus, le parc commence à la sortie du turnstile. Partez de l'hôtel à 8h, soyez à 9h30 pour la cérémonie d'ouverture du parc — Mickey arrive avec tous les personnages Disney, et le moment où votre enfant voit son premier personnage est le pic émotionnel de ces 3 jours.",
            estimatedCost: "Famille aller-retour ~25 €",
            transitFromPrev: "10 min à pied jusqu'à Bir-Hakeim",
          },
          {
            name: "Disneyland Park (matin Fantasyland)",
            area: "Marne-la-Vallée",
            address: "Boulevard de Parc, 77700 Coupvray",
            duration: "4h",
            description:
              "Pendant que tout le monde se précipite à Big Thunder Mountain, vous filez à Fantasyland. Ordre : It's a Small World → Peter Pan's Flight → Dumbo → Mad Hatter Teacups → manège. Pour un repas avec les princesses, l'«Auberge de Cendrillon» se réserve plusieurs mois à l'avance dans l'app : 8 princesses Disney passent à votre table pour photo — votre enfant (surtout votre fille) s'en souviendra toute sa vie. Téléchargez l'app «Disneyland Paris» pour voir les temps d'attente en direct.",
            estimatedCost: "Famille billet 1 jour ~450 €",
            bookingTip: "Sur disneylandparis.com, environ 55 € moins cher qu'à l'entrée. «Premier Access» (10-15 € par attraction) permet de sauter les files des plus populaires — inutile par temps de pluie, recommandé en juillet-août.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Casey's Corner déjeuner (Main Street)",
            area: "Disneyland Park",
            duration: "1h",
            description:
              "Hot dogs et chili fries de Main Street USA. Avec piano live en fond — le repas est étonnamment correct à Disneyland Paris, et celui-là est le préféré des enfants. 25 minutes pour manger, puis retour aux attractions. Pour s'asseoir et manger français, le «Walt's» est le meilleur restaurant à table du parc, mais il faut réserver dans l'app.",
            estimatedCost: "Famille ~70 €",
            transitFromPrev: "Inclus",
          },
          {
            name: "Adventureland & Frontierland",
            area: "Disneyland Park",
            duration: "3h",
            description:
              "Pirates of the Caribbean (les enfants peuvent y aller), montagnes russes Indiana Jones (taille requise), Phantom Manor (un peu effrayant, vérifiez le tempérament de l'enfant), paysages autour de Big Thunder Mountain. Les parents peuvent monter sur les ponts de l'Adventure Isle pour s'amuser, les enfants courent et grimpent une heure. Entre 15h et 17h, mettez-vous dans la file de la rencontre Mickey — Town Square Theater avec Mickey en habit de magicien, 40 minutes d'attente mais la qualité photo est la meilleure du parc.",
            estimatedCost: "Compris",
            transitFromPrev: "Inclus",
          },
          {
            name: "Disney Illuminations",
            area: "Scène du Château",
            duration: "30 min",
            description:
              "Feu d'artifice + projection sur le Château de la Belle au Bois Dormant chaque soir — extraits de classiques Disney projetés sur la façade, synchronisés avec les feux. Trouvez votre place 30 minutes avant : place centrale face au château = idéal mais beaucoup de monde ; banc en milieu de Main Street = panorama complet mais angle moins haut. 20 minutes de spectacle, et 50 000 personnes vers la sortie en même temps — ne courez pas, restez 10 minutes en place, vous photographiez la Main Street déserte avec le château illuminé.",
            estimatedCost: "Compris",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "RER A retour à Bir-Hakeim",
            area: "Marne-la-Vallée → Paris",
            duration: "1h",
            description:
              "Dernier train passé minuit, large. Avant Charles de Gaulle-Étoile, les enfants seront endormis. Couvrez-les doucement avec votre veste, écoutez le bruit des rails, regardez les lumières de Paris défiler — c'est le moment le plus silencieux et tendre de tout ce voyage.",
            estimatedCost: "Inclus dans le ticket du matin",
            transitFromPrev: "5 min à pied",
          },
        ],
      },
    ],
    packingTips: [
      "Poussette pliante légère — les pavés parisiens sont sérieux, 4 roues plus stable que 3",
      "Petit sac à dos pour goûters, lingettes, gel hydroalcoolique, change",
      "Une petite gourde par personne — les restaurants la remplissent gratuitement (dites «une carafe d'eau, s'il vous plaît»)",
      "Tenue Disney/princesse pour le 3e jour — l'enfant qui arrive en costume sera particulièrement remarqué par les cast members et photographié plus souvent",
      "Cape de pluie (pas parapluie, difficile sur poussette) — la météo printanière à Paris change toutes les 10 minutes",
      "Médicaments enfants (paracétamol, anti-mal-des-transports) — les pharmacies parisiennes étiquettent en français, et c'est la panique sur place",
    ],
    budgetEstimate: "Famille de 4, hors hôtel et tickets Disney : environ 300-400 €/jour",
    generalTips: [
      "Musées parisiens gratuits pour les moins de 18 ans — apportez les pièces d'identité",
      "Apportez les céréales préférées des enfants — un petit-déj familier évite la crise du matin",
      "La plupart des cafés laissent utiliser les toilettes après un café — notez-les sur votre parcours",
      "À partir de 3 musées payants, le «Paris Museum Pass» (55 €/2 jours) est rentable — Louvre + Orsay + Orangerie + Versailles couvert",
      "Les restaurants n'ouvrent qu'entre 12h-14h et 19h-22h, fermés entre — pour un enfant qui a faim, allez à la boulangerie ou au Monoprix",
      "Les pickpockets parisiens sévissent dans le métro et près de la Tour Eiffel — sac devant, sac à dos sur la poitrine, ne prenez jamais le papier qu'un inconnu vous tend",
    ],
  },

  "seoul-3d-foodie": {
    tagline: "Trois jours pour foodie — marchés, BBQ, hanwoo séché à sec, poulet-bière au bord du Hangang.",
    audience: "Solo · Foodie",
    destination: "Séoul",
    destinationCountry: "Corée du Sud",
    overview:
      "Trois jours pour le foodie solo qui vient à Séoul «pour manger». Chaque jour combine une ancre culturelle et 3-4 spots de bouffe — marché célèbre, petit boui-boui de quartier, et un bon dîner par jour. Au bout de 3 jours vous saurez la différence entre soondubu (tofu mou) et kimchi-jjigae, et vous repartirez avec au moins un sachet de gochujang du marché Gwangjang. Le K-drama, la K-pop, la K-food : tout converge ici, et la ville reste étonnamment abordable comparée à Tokyo.",
    bestSeasonNote:
      "Avril-mai (cerisiers, doux) et septembre-octobre (automne sec) sont les périodes idéales. Les cerisiers de Yeouido, de l'Université Kyung Hee et du lac Seokchon sont superbes une semaine début avril. Début octobre, les ginkgos de Gwanghwamun et Bukchon virent au jaune éclatant. La moiteur d'août vous fait suer en 3 minutes — à éviter. L'hiver à -10°C est rude dehors mais l'intérieur est chauffé comme l'été ; les fans de K-drama peuvent venir spécialement pour photographier hanbok sur fond de neige — le palais Gyeongbokgung sous la neige est cinématographique.",
    currencyTip:
      "La carte T-money se prend dans n'importe quel konbini (5 €) — métro, bus, certains taxis, et règle aussi en konbini, solde remboursable en konbini. À l'arrivée, retirez 200 000-300 000 wons (130-200 €) à un distributeur Citibank, Shinhan ou Woori — sélectionnez «Foreign Card», les cartes Visa étrangères passent. Myeongdong et Dongdaemun ont beaucoup de bureaux de change avec de meilleurs taux qu'à l'aéroport, mais apportez votre passeport.",
    languageTip:
      "Apprendre les 24 lettres du hangeul prend 30 minutes — une vidéo YouTube avant le départ vous permet de lire noms de stations et menus. «Annyeonghaseyo» (bonjour) + «Kamsahamnida» (merci) sont universels. «Igeo juseyo» (donnez-moi ça) + un doigt = commande dans n'importe quel restaurant. Papago est plus précis que Google Translate pour le coréen — c'est l'app que les Coréens utilisent eux-mêmes.",
    emergencyNumber: "112 (police), 119 (médical/pompiers), 1330 (hotline tourisme 24h en anglais/français)",
    hotel: {
      name: "L7 Hongdae by Lotte",
      area: "Hongdae",
      address: "141 Yanghwa-ro, Mapo-gu, Séoul",
      rationale:
        "Hongdae est la zone la plus marchable de Séoul pour la bouffe et la nightlife. Cafés indépendants, BBQ ouverts 24h, performances de rue ont une densité folle — 3h du matin n'est pas tard. L7 est à 3 min à pied de Hongdae Iphku Station (AREX direct depuis l'aéroport, 50 min). Le bar du toit a une terrasse ouverte avec vue sur le Hangang au loin. L'immeuble compte un konbini, une chaîne de café coréenne, et un restaurant de bibimbap recommandé Michelin. Chambre simple à partir de 145 €, espace commun avec ramen et boissons gratuits — le marketing de la chaîne moderne joue à fond.",
      estimatedNightlyRate: "~145 €/nuit",
    },
    airportTransit: {
      method: "AREX (Airport Express) → Gare Hongdae Iphku",
      duration: "Environ 50 min",
      cost: "~9 €",
      instructions:
        "Aéroport d'Incheon T1 ou T2 sous-sol, suivez les panneaux verts «AREX». Le train direct (Express) à 9 € exige un siège réservé, 43 min jusqu'à Séoul Station — puis un train régulier 2 stations en arrière jusqu'à Hongdae Iphku (ou avec T-money, ligne 2 directe). Ou tout en train régulier (All Stop) 30% moins cher mais 15 min plus long. Après 23h, AREX arrête — taxi alors. Incheon-centre Séoul environ 50-60 €.",
    },
    days: [
      {
        theme: "Marchés & palais",
        summary: "Petit-déj au marché, palais signature de Séoul, dîner dans le village hanok.",
        stops: [
          {
            name: "Petit-déjeuner au marché Gwangjang",
            area: "Jongno",
            address: "88 Changgyeonggung-ro, Jongno-gu",
            duration: "1h30",
            description:
              "Le plus vieux marché de Séoul, et la reine de la street food coréenne. Plus de 100 stands sous toit. La zone centrale «bindae-tteok» (galettes de haricots mungo) est le cœur — pâte fraîche moulue grillée sur grande plaque chaude, accompagnée de makgeolli (alcool de riz), une part 4 €. Les stands «mayak gimbap» (gimbap-drogue tellement c'est addictif) à 2,50 € la barre, mini-bouchée trempée dans la moutarde jaune. Spot de mukbang (live de bouffe) — vous pouvez tomber sur un YouTuber coréen en train de filmer en direct. Mangez debout, puis changez de stand.",
            estimatedCost: "~12 €",
            transitFromPrev: "Hongdae Iphku ligne 2 → ligne 1, jusqu'à Jongno 5-ga, environ 25 min",
          },
          {
            name: "Palais Gyeongbokgung",
            area: "Jongno",
            address: "161 Sajik-ro, Jongno-gu",
            duration: "2h",
            description:
              "Le palais principal de la dynastie Joseon, fondé en 1395. La «cérémonie de relève des gardes» à 11h précises devant la porte Gwanghwamun est immanquable — 5 gardes en costume coréen ancien, marche au ralenti, tambours et trompettes : 15 minutes pour reculer 500 ans. En portant le hanbok (location près du palais, 10 €/4h), l'entrée est gratuite — «Hanboknam» et «DAYHANBOK» sont les chaînes les plus connues. En automne, le sol devant la salle Geunjeongjeon est tapissé de feuilles de ginkgo dorées. À la sortie, contournez par l'ouest jusqu'au quartier «Hyoja-dong» — la pâtisserie centenaire de gâteaux de riz «Kyeseongdang» y est cachée.",
            estimatedCost: "~3 € (gratuit en hanbok)",
            bookingTip: "Fermé mardi. Visites guidées en anglais à 11h et 13h30, gratuites, 30 min. Combiné avec Bukchon et Changdeokgung, le «Pass Combiné des 4 Palais» (8 €) est plus rentable.",
            transitFromPrev: "Ligne 5 → ligne 3 station Gyeongbokgung, environ 15 min",
          },
          {
            name: "Promenade au village Bukchon Hanok",
            area: "Bukchon",
            duration: "1h30",
            description:
              "900 hanok traditionnels vieux de 600 ans à Gahoe-dong, leur courbure de toit comme l'aile d'une grue. La carte gratuite à l'office du tourisme de Bukchon indique 8 «Bukchon 8 vues» numérotées — la 5e descend une ruelle étroite et donne sur la N Seoul Tower au loin, l'angle Instagram canonique. C'est encore résidentiel ; tôt le matin entre 7h et 9h vous entendez les ménagères étendre leurs draps. Attention : panneaux «Silence please» entre 11h-17h — vraie demande des habitants. Apportez un café à emporter (Samcheong-dong en dessous en regorge), buvez en marchant — le matin le plus élégant de Séoul.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Salons de thé de Samcheong-dong",
            area: "Samcheong-dong",
            duration: "1h",
            description:
              "La rue cafés-galeries qui descend de Bukchon. N'importe quel salon de thé traditionnel fera l'affaire — omijacha (thé aux 5 saveurs : aigre-doux-amer-piquant-salé en une boisson rouge) avec une assiette de yakgwa (gâteaux frits au miel). «Cha-Damseon» est un salon de 50 ans, intérieur en bois, on s'assoit sur tatami pour passer un après-midi entier seul. En sortant, jetez un œil à la «Galerie Geumdarae» — petites expositions d'artistes coréens contemporains, gratuites.",
            estimatedCost: "~7 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Tosokchon Samgyetang",
            area: "Jongno",
            duration: "1h",
            description:
              "Le restaurant de samgyetang (poulet farci au ginseng) le plus célèbre de Corée. Un plat à 14 €, mais deux présidents (Park Chung-hee, Moon Jae-in) sont venus manger ici — un poussin entier farci au riz gluant, ginseng, jujube, châtaignes, mijoté 2h en cocotte d'argile. Bouillon laiteux, parfum de ginseng intense. Aux heures de pointe, 30 min de queue ; à 17h pratiquement personne. Ajoutez le «vin de ginseng» (4 €) — légèrement amer-doux, en Corée on appelle ça «boyak» (élixir nourrissant).",
            estimatedCost: "~14 €",
            bookingTip: "Pas de réservation. La queue vaut le coup. Direction Gwanghwamun à pied, vers le quartier Hyoja-dong.",
            transitFromPrev: "20 min à pied",
          },
          {
            name: "Promenade au Cheonggyecheon",
            area: "Jongno",
            duration: "1h",
            description:
              "Enterré sous une autoroute pendant 30 ans, restauré en 2005 par le maire Lee Myung-bak — désormais un cours d'eau de 11 km au cœur de la ville. Les 2 premiers kilomètres à l'est de la mairie s'éclairent en soirée, les passants sortent du bureau pour marcher au bord. Chaque début novembre, le festival de lanternes de Cheonggyecheon couvre tout le ruisseau de sculptures LED — l'une des plus romantiques scènes hivernales de Séoul. Récupération calme avant de dormir, pour digérer le gras de la journée.",
            estimatedCost: "Gratuit",
            transitFromPrev: "20 min à pied",
          },
        ],
      },
      {
        theme: "BBQ, makgeolli & nuit Hongdae",
        summary: "Matinée tranquille, le War Memorial chargé de sens, plongée profonde dans la culture du grill coréen.",
        stops: [
          {
            name: "Onion Anguk (brunch + viennoiseries)",
            area: "Anguk",
            duration: "1h",
            description:
              "Hanok transformé en café-boulangerie. Le plus beau présentoir de viennoiseries de Séoul — gros pains au sel, panettone à la graisse fragrante, croissants matcha empilés en montagne. «Salt Bread» et «Pan d'oro» sont les standards, immanquables sur Instagram. Asseyez-vous sur le plancher en bois de la cour intérieure pour boire un café coréen (origine unique, torréfié localement), à travers la fenêtre en papier vous voyez les tuiles d'hanok. Ouvre à 10h, peu de monde avant 11h. Le MMCA (Musée d'art moderne) à côté a une expo permanente gratuite — enchaînez.",
            estimatedCost: "~12 €",
            transitFromPrev: "Ligne 3 station Anguk, 5 min à pied",
          },
          {
            name: "Mémorial de la Guerre de Corée",
            area: "Yongsan",
            address: "29 Itaewon-ro, Yongsan-gu",
            duration: "2h",
            description:
              "Gratuit, mondialement réputé. Raconte la guerre de Corée et ses origines. À l'extérieur, avions militaires, chars, navires que l'on peut escalader. La sculpture en bronze «Statue des Frères» — soldat sud-coréen et soldat nord-coréen frères qui se retrouvent et s'enlacent sur le champ de bataille — est la page la plus lourde du musée. Le bâtiment principal suit la chronologie ; un mur portant les drapeaux des 16 pays de l'ONU qui ont envoyé des troupes, avec sous chaque drapeau le nombre de morts. Sortez par la cour vers le bassin commémoratif, 10 minutes assis en silence — ce musée demande à être parcouru lentement, sans précipitation.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Anguk ligne 6 → station Samgakji, environ 25 min",
          },
          {
            name: "Hongdae Mapo Galmaegisal",
            area: "Hongdae",
            duration: "1h30",
            description:
              "Galmaegisal (diaphragme de porc) BBQ — partie quasi introuvable dans les BBQ coréens à l'étranger, fibres fines, gras équilibré, plus parfumé que le samgyeopsal. N'importe quelle adresse «galmaegisal jeonmun» (spécialiste du diaphragme) près de l'auberge fera l'affaire. Le serveur grille tout, retourne, coupe — vous mangez. Avec 12 banchan coréens, deux kimchis, ail, feuilles de sésame, laitue à enrouler. Soju 2,50 € la bouteille, makgeolli 4 € la carafe, à boire lentement. Compter 25 € pour une personne.",
            estimatedCost: "~25 €",
            transitFromPrev: "Ligne 6 → Hongdae Iphku, environ 25 min",
          },
          {
            name: "Café crawl à Yeonnam-dong",
            area: "Yeonnam-dong",
            duration: "2h",
            description:
              "Le quartier café le plus hype de Séoul, à 5 min à pied à l'ouest de Hongdae. Stratégie 3 cafés : 1) «Felt» — style industriel, torréfaction maison, asseyez-vous à la fenêtre face à la voie ferrée. 2) «Fritz Coffee» — première et troisième vague de café coréen, le grain «Old Dog» est riche. 3) Un café au hasard — Yeonnam-dong est plein d'indépendants sans enseigne anglaise, c'est là le trésor. Le salon de thé «Gyeongcheon Aein» près du «Yeonnam Manor» est un favori d'été — granité au fromage et haricots verts ultra sucré.",
            estimatedCost: "~17 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Mukja-golmok Pojangmacha (tente-restaurant)",
            area: "Hongdae",
            duration: "1h30",
            description:
              "Restaurant de rue classique de Séoul. Le «pojangmacha» (tente bâche transparente) est unique à la Corée : chaises plastique, ampoules nues, soju et makgeolli, pajeon (galette d'oignons), gopchang (intestins grillés — meilleurs que vous l'imaginez). Adressez la parole aux Coréens d'à côté — le soju est un lubrifiant social. «Eolkeunhan kimchi-jjigae» (kimchi-jjigae piquant) est l'incontournable d'hiver ; dites à la serveuse «eonni, kimchi-jjigae hana» (grande sœur, un kimchi-jjigae), elle vous appellera vraiment «petite sœur» en réponse.",
            estimatedCost: "~25 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Performance de rue à Hongdae",
            area: "Avenue Hongik",
            duration: "1h30",
            description:
              "Le piéton devant l'Université Hongik le week-end soir est la scène la plus libre de Séoul — équipes de danse K-pop synchronisées (chorégraphies exactes), groupes indé en concert, jongleurs, battles de rap. Gratuit, bruyant, joyeux. Certaines équipes sont déjà signées — vous croisez peut-être en 2024 une future star de boys band 2026. Une bière à emporter à la main, debout 30 minutes — c'est l'image la plus jeune de Séoul à 23h.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min à pied",
          },
        ],
      },
      {
        theme: "Gangnam, Hangang & dernier repas",
        summary: "Traverse vers Gangnam pour un musée, déjeuner à Apgujeong, coucher de soleil sur le Hangang.",
        stops: [
          {
            name: "Temple Bongeunsa",
            area: "Gangnam",
            duration: "1h",
            description:
              "Temple de 1 200 ans coincé entre les gratte-ciel de Gangnam — le contraste visuel est le cœur. Les façades vitrées du COEX se reflètent dans les toits de tuiles du temple. Devant le hall principal, les 500 statues d'arhats en bois, chacune avec une expression différente — vous pourriez rester debout 30 minutes à les observer. Programme «templestay externe» gratuit pour étrangers (1h, calligraphie de sutras, 108 prosternations, marche-méditation), à réserver en ligne. Sortez et remontez vers le nord, vous arriverez juste à la bibliothèque Starfield.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Ligne 2 → ligne 7, environ 30 min",
          },
          {
            name: "Starfield COEX & Bibliothèque Starfield",
            area: "Gangnam",
            duration: "1h",
            description:
              "Bibliothèque ouverte à double hauteur au centre du centre commercial souterrain — 50 000 livres gratuits, étagères géantes du sol au plafond de 13 m. L'un des plus photographiés des espaces intérieurs de Séoul. Vous pouvez lire (principalement coréen, mais une section anglaise existe), des canapés et un café. À côté, Aquarium COEX, cinéma, flagship Starbucks. Asseyez-vous 45 minutes au milieu des livres, puis dîner.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Bone & Bread (bœuf séché à sec)",
            area: "Apgujeong",
            duration: "1h30",
            description:
              "S'il faut se faire plaisir une fois, c'est ici. Bone & Bread est le pionnier du bœuf coréen (hanwoo) séché à sec à Séoul — armoires en verre exposent les pièces avec dates étiquetées. Le menu midi «entrecôte + légumes + riz + banchan» à 70 €, équivalent à un Tokyo Roppongi à 3 fois ce prix. Le chef tranche lui-même, accompagnez d'un saké coréen (Songjuk, Baekamdang). Commandez impérativement le «dry-aged ribeye» (드라이에이지드 립아이), pas le sirloin. Bonne en solo, mieux à deux pour partager.",
            estimatedCost: "~70 €",
            bookingTip: "Sur l'app Catch Table à 1 semaine (interface coréenne, processus intuitif).",
            transitFromPrev: "Ligne 7 → Apgujeong Rodeo, environ 15 min",
          },
          {
            name: "Garosu-gil",
            area: "Sinsa",
            duration: "1h30",
            description:
              "La rue boutique de Sinsa-dong avec ses ginkgos sur deux côtés — créateurs coréens, cafés Insta, salons de coiffure de stars. «ANDAR», «OIIE», la boutique principale «GENTLE MONSTER» sont sur cette rue. 10 fois moins de touristes que Myeongdong, 10 fois plus de qualité. En automne, les ginkgos jaunes — la plus belle rue commerçante de Séoul. Sortez à Sinsa, exit 8, 3 min de marche tout droit. Pour les cosmétiques, le flagship Olive Young est aussi sur cette rue — toutes les marques K-beauty visibles sur Instagram s'y trouvent, bien moins chères qu'en France.",
            estimatedCost: "Gratuit~$$$",
            transitFromPrev: "Ligne 3 → station Sinsa, 10 min à pied",
          },
          {
            name: "Parc du Hangang (Banpo)",
            area: "Banpo",
            duration: "1h30",
            description:
              "Le salon des Séouliens après le travail. Descendez au bord du fleuve, louez une natte plastique au konbini (5 €), commandez du poulet frit (BBQ Olive Chicken ou Goobne) + bière via les apps coréennes «Coupang Eats» ou «Baedal Minjok» — livré à votre place en 30 min, expérience «hangang delivery» unique en Corée. D'avril à octobre, les ven-sam-dim à 21h et 21h30, le spectacle de fontaine arc-en-ciel «Moonlight Rainbow Fountain» du pont de Banpo est la plus belle scène nocturne gratuite de Séoul — fontaine de 1 140 m qui change de couleur en musique, eau qui retombe dans le Hangang.",
            estimatedCost: "~17 €",
            transitFromPrev: "Ligne 9 → station Sinbanpo, 10 min à pied",
          },
          {
            name: "Kyochon Chicken (poulet frit coréen)",
            area: "Hongdae",
            duration: "1h",
            description:
              "Cloturez le voyage avec le snack national coréen — le poulet frit. «Yangnyeom-banban» (moitié sucré-piquant + moitié soja-ail), avec une bière coréenne pression (5 €) = «chimaek» (poulet+bière). Kyochon, BBQ, Goobne sont chaînes mais toutes excellentes — la fameuse croustillance du poulet coréen vient d'une double friture + glaçage refroidi avant pulvérisation. Cuit à la commande, environ 30 min, à manger sortant de l'huile.",
            estimatedCost: "~25 €",
            transitFromPrev: "Ligne 9 → Hongdae Iphku, environ 25 min",
          },
        ],
      },
    ],
    packingTips: [
      "Chaussures à enfiler — temples, restaurants traditionnels, jjimjilbang exigent qu'on se déchausse",
      "Petit parapluie — Séoul a des averses orageuses surprises chaque mois ; la mousson de juin-juillet est la plus pluvieuse",
      "Lingettes et gel hydroalcoolique mini — street food + toilettes publiques sans papier garanties",
      "Estomac vide le 1er jour — vous ne pourrez plus vous arrêter",
      "Petit porte-monnaie won — konbini et marchés traditionnels restent en cash",
      "Place dans la valise pour ramener masques et cosmétiques — Olive Young 30% moins cher qu'en France",
    ],
    budgetEstimate: "Hors hôtel : 70-105 €/jour",
    generalTips: [
      "Le métro est plus rapide, propre et bon marché qu'un taxi — la T-money est essentielle",
      "Aucune culture du pourboire",
      "Banchan (kimchi, pousses de soja, tartelettes de poisson) gratuit à volonté — pas un supplément",
      "La plupart des musées ferment lundi",
      "Apple Pay arrivé en Corée en 2023, fonctionne dans la plupart des magasins ; mais konbini et petits commerces restent sur cartes locales",
      "Naver Map et Kakao Map sont 10× plus précis que Google Maps en Corée — téléchargez avant le départ, recherche en français possible",
    ],
  },

  "bangkok-4d-solo": {
    tagline: "Quatre jours en solo économique — temples, street food, excursion à Ayutthaya.",
    audience: "Solo · Économique",
    destination: "Bangkok",
    destinationCountry: "Thaïlande",
    overview:
      "Quatre jours pour le voyageur solo au budget serré qui veut voir les trois visages de Bangkok — Bangkok temples, Bangkok street food, Bangkok nuits étranges. Un repas sous 5 €, le palais royal avant la chaleur, et une légende de Khao San Road à raconter en rentrant. Bangkok est l'une des capitales asiatiques les plus accessibles en solo : pas chère, sécurisée, anglais partout, jamais une seconde d'ennui. Au bout de 3 jours, vous aurez la pensée dangereuse de «je pourrais rester un mois de plus».",
    bestSeasonNote:
      "Novembre-février : saison sèche et (relativement) fraîche, c'est la fenêtre idéale. Hors de cette période, à 11h vous transpirez. Avril, le festival Songkran (combat d'eau du Nouvel An thaï) est la fête la plus animée et la plus chaude (40°C+) — pris dans une bataille d'eau, vous adorez, mais préparez votre téléphone à finir trempé. Mai-octobre c'est la mousson : pluies torrentielles d'environ 30 minutes vers 15-16h chaque après-midi, parfait pour s'abriter dans un café avec un thé thaï glacé.",
    currencyTip:
      "Retirez 5 000-10 000 bahts (140-280 €) à un distributeur de banque (Krungsri, SCB, Bangkok Bank) — les distributeurs «slim» violets indépendants prennent 220 bahts de frais (6 €), à éviter absolument. Les stands de rue ne prennent quasiment que du cash. Konbini et grands centres acceptent Visa et certaines cartes UnionPay. Une carte Wise ou Curve a le meilleur taux — préparez-la avant le départ.",
    languageTip:
      "Téléchargez le pack thaï hors-ligne de Google Translate — l'écriture thaïe est impossible à deviner pour un étranger. «Sawadee krap/ka» (bonjour, krap pour homme/ka pour femme) et «Khop khun krap/ka» (merci) suffisent à faire sourire. Pointer du doigt + sourire + paumes jointes (wai) sont universels. «Mai sai pak chee» (sans coriandre) est le sésame du foodie.",
    emergencyNumber: "1155 (police touristique anglophone), 1669 (médical), 191 (police)",
    hotel: {
      name: "Lub d Bangkok Siam (dortoir mixte 8 lits)",
      area: "Siam",
      address: "925/9 Rama I Road, Pathum Wan, Bangkok 10330",
      rationale:
        "Lub d Siam est à 4 min à pied de la station BTS National Stadium et 8 min de Siam Square. Tout Bangkok central, le bord du fleuve, les temples sont à 2 stations BTS (transfert ferry compris). Auberge réputée pour sa propreté, ses espaces communs, climatisation forte, espace de coworking, rideau privé et prise par lit. Depuis BKK Suvarnabhumi, prenez l'Airport Rail Link jusqu'à Phaya Thai puis BTS 2 stations jusqu'à Siam, 15 min. Lit à 22 €/nuit — l'argent économisé paye 3 dîners de street food.",
      estimatedNightlyRate: "~22 €/nuit",
    },
    airportTransit: {
      method: "Airport Rail Link → BTS Skytrain",
      duration: "Environ 50 min",
      cost: "~2 €",
      instructions:
        "Suvarnabhumi (BKK) sous-sol, panneaux verts «Airport Rail Link». City Line jusqu'au terminus Phaya Thai = 1 jeton (45 bahts). Changez sur la BTS Sukhumvit (étage du dessus = 1 jeton de plus, 26 bahts), 2 stations jusqu'à Siam, changez sur la Silom et descendez à National Stadium. Sortie droite, 4 min à pied jusqu'à l'auberge. Après 00h, l'Airport Rail Link s'arrête — Grab vous dépose pour environ 12 €.",
    },
    days: [
      {
        theme: "Bangkok royal",
        summary: "Avant la chaleur et les arnaques au «code vestimentaire», bouclez les trois grands temples le matin. Le soir, buffet de pad thaï.",
        stops: [
          {
            name: "Grand Palais & Wat Phra Kaew",
            area: "Phra Nakhon",
            address: "Na Phra Lan Road, Phra Borom Maha Ratchawang",
            duration: "2h",
            description:
              "Soyez à l'ouverture à 8h30 pile — à 10h c'est 45 min de queue. Pantalon long + épaules couvertes obligatoires, sinon refus à l'entrée (location de «sarong» à la porte 1,50 € mais caution facilement retenue). À l'intérieur, le Bouddha d'émeraude (en vrai en jade) ne fait que 66 cm de haut, mais l'or, les verres colorés et les céramiques empilés autour vous donnent l'impression d'être dans une bande dessinée 3D. Les chaussures se retirent devant le Bouddha. À la sortie, à gauche de la grande porte, une vieille dame vend des bananes grillées à 2 baht l'unité, à manger chaudes — c'était l'image que Bourdain emportait de Bangkok.",
            estimatedCost: "~14 €",
            bookingTip: "Les types qui vous disent «le palais est fermé aujourd'hui» dehors sont 99% des arnaqueurs tuk-tuk — ignorez et entrez.",
            transitFromPrev: "BTS Saphan Taksin → Chao Phraya Express boat jusqu'à l'embarcadère Tha Chang (total ~30 min)",
          },
          {
            name: "Wat Pho (Bouddha couché)",
            area: "Phra Nakhon",
            duration: "1h",
            description:
              "Bouddha doré couché de 46 mètres — plus long qu'un terrain de basket. Derrière, mettez 1 baht dans chacun des 108 bols en bronze le long du mur — le tintement est hypnotique pendant 3 minutes. Wat Pho est aussi le berceau du massage thaï traditionnel — l'école sur place propose 1h de massage à 10 €, qualité supérieure à un hôtel. Réservez à l'arrivée pour pouvoir préciser une thérapeute femme ou homme.",
            estimatedCost: "~5 € + massage 10 €",
            transitFromPrev: "10 min à pied vers le sud",
          },
          {
            name: "Soupe de nouilles à l'embarcadère Tha Tien",
            area: "Embarcadère Tha Tien",
            duration: "45 min",
            description:
              "Juste à côté de l'embarcadère, 2-3 stands familiaux. Commandez «boat noodles» (kuay teow rua, mini-bols inventés à l'origine pour manger sur les bateaux du marché flottant) — 4 cuillerées par bol, on peut goûter plusieurs bouillons. Combo classique : sang de porc + tendon de bœuf clair + tom yum poulet, 1,40 € le bol. Avec couenne de porc frite (kaeb moo) à 0,40 €. C'est le repas le plus heureux et le moins cher de votre journée à Bangkok.",
            estimatedCost: "~4 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Wat Arun (temple de l'Aube)",
            area: "Thonburi",
            duration: "1h30",
            description:
              "Traversez la Chao Phraya en ferry à 5 bahts (les bateliers en chemise verte traversent toutes les 5 minutes). Le prang central de Wat Arun est recouvert de morceaux de porcelaine apportés par les marchands chinois du XIXe siècle comme lest — le temple scintille au soleil. Grimpez les marches à 45° jusqu'à la plate-forme à mi-hauteur, c'est la meilleure vue de Bangkok sur la rivière. Au retour, ne montez pas tout de suite dans le ferry : sur la rive ouest, «The Deck by Arun Residence» sert un thé thaï glacé (5 €) en terrasse face à Wat Arun — au crépuscule quand les éclairages dorés s'allument, c'est le ticket du coucher de soleil bangkokien.",
            estimatedCost: "Entrée ~3 € + ferry 0,15 €",
            transitFromPrev: "Ferry 5 bahts à travers la rivière",
          },
          {
            name: "Sieste à l'auberge",
            area: "Siam",
            duration: "1h30",
            description:
              "38°C dehors. Retournez dormir. Bangkok ne se réveille vraiment qu'après le coucher du soleil — vous aurez besoin d'énergie. C'est une «sagesse tropicale» que les Thaïlandais respectent : pas de sortie à midi.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Bateau jusqu'à Saphan Taksin → BTS National Stadium, environ 40 min",
          },
          {
            name: "Pad Thai Thip Samai",
            area: "Phra Nakhon",
            duration: "1h",
            description:
              "Le pad thaï le plus célèbre de Bangkok — depuis 1966 même fourneau, même recette. Version «signature crevettes» : nouilles enroulées dans une fine omelette frite comme du papier, ouverte à table pour révéler le plat. 5 € la portion. Avec le jus d'orange (3 €) — pressé maison sans eau ni sucre, dans des bouteilles en verre recyclées de soda. Queue de 15-20 min normale ; à emporter (boîte qui garde la chaleur 30 min) si vous n'aimez pas attendre.",
            estimatedCost: "~5 €",
            transitFromPrev: "Taxi/Grab depuis l'auberge, environ 25 min",
          },
        ],
      },
      {
        theme: "Marché & Khao San",
        summary: "Marché du week-end le matin, coucher de soleil sur le fleuve, soirée à Khao San Road pour ramener une légende.",
        stops: [
          {
            name: "Marché du week-end de Chatuchak",
            area: "Chatuchak",
            address: "587/10 Kamphaeng Phet 2 Rd",
            duration: "3h",
            description:
              "14 hectares, 15 000 stands. Vous allez vous perdre — c'est le but. Sections : vêtements (1-6), art (7), cuisine (26-27), animaux (oui — chiots et chatons, regardez sans acheter). Visez 60% du prix annoncé. La glace dans une coque de noix de coco du «Section 26 Coconut Ice Cream» (1,40 €) est immanquable. Sacs en cuir, bougies parfumées, écharpes en soie thaïe sont d'excellents souvenirs. L'app «Chatuchak Guide» a une carte, mais finalement vous la jetez et suivez votre nez.",
            estimatedCost: "Si vous achetez ~35 €",
            bookingTip: "Samedi/dimanche uniquement. Arrivez à 9h ; à 11h vous suffoquez. Une grande bouteille d'eau (1,40 €) dans le sac à dos.",
            transitFromPrev: "BTS Mo Chit, environ 15 min, 5 min à pied",
          },
          {
            name: "Food court de Chatuchak",
            area: "Dans Chatuchak",
            duration: "1h",
            description:
              "Section 26 = labyrinthe de bouffe. Riz collant à la mangue (4 €), glace dans noix de coco (1,40 €), brochettes grillées (0,40 € la brochette), galettes de poisson frites thaï (3 €). Chaises plastique, mains nues. «Pad See Ew» (nouilles larges sautées) + «Tom Yum» soupe + «Mango Sticky Rice» = trio public du week-end. Thé glacé citron-miel (2 €) pour résister à la chaleur.",
            estimatedCost: "~7 €",
            transitFromPrev: "Inclus",
          },
          {
            name: "Pause auberge + douche fraîche",
            area: "Siam",
            duration: "2h",
            description: "Le coup de chaleur est réel. Retour, douche, recharge du téléphone, on se remet en condition.",
            estimatedCost: "Gratuit",
            transitFromPrev: "BTS Mo Chit → Siam → National Stadium, environ 25 min",
          },
          {
            name: "Coucher de soleil en bateau sur la Chao Phraya",
            area: "Embarcadère Sathorn",
            duration: "1h",
            description:
              "Le «orange flag local boat» à 30 bahts — un bateau-bus utilisé par les habitants, depuis Sathorn vers le nord jusqu'à Phra Athit. Avant le départ, achetez une bière fraîche (2 €) au kiosque de l'embarcadère, asseyez-vous côté droit. En 30 min, vous longez Wat Arun, le Grand Palais, Wat Phra Kaew dorés au coucher de soleil, puis le ciel rougit la rivière. Le meilleur 1 € jamais dépensé à Bangkok.",
            estimatedCost: "~1 €",
            transitFromPrev: "BTS Saphan Taksin, environ 15 min",
          },
          {
            name: "Street food à Khao San Road",
            area: "Khao San",
            duration: "1h",
            description:
              "La rue backpacker la plus célèbre du monde. Pad See Ew à 50 bahts (1,40 €) la portion, roti banane à 30 bahts (0,80 €), depuis n'importe quel chariot. Le monsieur «scorpion grillé sur pic» est le même depuis 2003 ; un scorpion ou une mygale sur pic à 30 bahts (0,80 €), photo OK avec 20 bahts (0,55 €) en pourboire. Le «chaos» de Khao San est son âme — backpackers blonds européens, familles indiennes, étudiantes chinoises, étudiants locaux, Australien soûl, mendiants enfants, masseuses, conducteurs de tuk-tuk se croisent.",
            estimatedCost: "~5 €",
            transitFromPrev: "10 min à pied depuis l'embarcadère Phra Athit",
          },
          {
            name: "Tournée des bars de Khao San",
            area: "Khao San",
            duration: "2h",
            description:
              "Choisissez n'importe quelle hostel-bar — «Buddy Bar», «Madame Musur», «The Club Khaosan» fonctionnent. 100 bahts (2,80 €) le «bucket» (cocktail seau, généralement Sangsom rhum thaï + Red Bull + Coca), accompagné des histoires de vie de 14 nationalités de backpackers. En 1 heure vous saurez comment une Norvégienne a ouvert une agence de voyage à Bangkok ; en 2 heures, on vous invite à Chiang Mai le week-end. Partez avant minuit, rentrez sobrement à l'auberge. C'est la légende de Khao San — chaque visiteur en a sa propre version.",
            estimatedCost: "~8 €",
            transitFromPrev: "Inclus",
          },
        ],
      },
      {
        theme: "Excursion : Ayutthaya",
        summary: "Ancienne capitale thaïe, 80 km au nord. Temples en ruines, tours de briques, tête de Bouddha enlacée par les racines d'un figuier.",
        stops: [
          {
            name: "Train pour Ayutthaya",
            area: "Hua Lamphong → Ayutthaya",
            duration: "1h30",
            description:
              "Train de banlieue 3e classe depuis Hua Lamphong (15 bahts = 0,40 €). Fenêtres ouvertes, sièges plastique durs, lent mais authentique. C'est la façon dont voyagent les Thaïlandais ordinaires, et vous êtes assis parmi eux ; les vendeurs ambulants montent avec des paniers en bois pour proposer riz au poulet, jus de noix de coco, mangue tranchée. C'est ça «être en route». Téléchargez Spotify offline ; le paysage à travers la fenêtre passe de la ville aux rizières en 90 min, et vous comprenez pourquoi tant de backpackers occidentaux finissent par s'installer.",
            estimatedCost: "~0,40 €",
            transitFromPrev: "MRT Hua Lamphong",
          },
          {
            name: "Wat Mahathat (tête de Bouddha dans les racines)",
            area: "Parc historique d'Ayutthaya",
            duration: "1h30",
            description:
              "Tête de Bouddha en grès enlacée par les racines de figuier sacré — l'image la plus photographiée d'Ayutthaya. Il y a 500 ans, les envahisseurs birmans ont décapité les statues du temple, et les racines ont peu à peu enveloppé celle-ci tombée au sol. Pour la photo, accroupissez-vous (la tête ne doit pas être plus haute que celle du Bouddha — règle thaïe) ; vous comprendrez pour la première fois le mot «impermanence». Les ruines autour se parcourent en 1h, presque vides — vous reconstruisez en imagination la gloire de l'ancien royaume d'Ayutthaya.",
            estimatedCost: "~2,50 €",
            transitFromPrev: "Tuk-tuk depuis la gare, environ 3 €",
          },
          {
            name: "Lung Lek boat noodles",
            area: "Ayutthaya",
            duration: "45 min",
            description:
              "Petits bols, bouillon dense, bœuf. Les habitants empilent leurs bols vides sur la table pour compter — une table de 8 bols est normale, défi à relever. 0,80 € le bol, vous pouvez en manger 10 et débourser 8 €. Le propriétaire est de la famille qui a démarré le stand dans les années 50, les murs portent les photos noir et blanc des notables locaux à travers les âges.",
            estimatedCost: "~4 €",
            transitFromPrev: "Tuk-tuk environ 1,50 €",
          },
          {
            name: "Wat Phra Si Sanphet & Wihan Phra Mongkhon Bophit",
            area: "Parc historique d'Ayutthaya",
            duration: "1h30",
            description:
              "Trois grands chedis restaurés sur une plate-forme — c'est la silhouette emblématique d'Ayutthaya. Le Wihan voisin abrite un Bouddha en bronze de 12 m reconstruit dans les années 1950 après les bombardements de la 2e Guerre mondiale. Le Bouddha en posture de bhumisparsha, regard semi-baissé qui vous surplombe — vous restez à ses pieds en silence. À la sortie, sous l'ombre des arbres, des vendeuses de noix de coco vendent à 2 € la noix de coco fraîche ouverte au coupe-coupe, paille incluse.",
            estimatedCost: "~2,50 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Wat Chaiwatthanaram (coucher de soleil)",
            area: "Ayutthaya",
            duration: "1h",
            description:
              "Temple style khmer de l'autre côté de la rivière. Le plus beau coucher de soleil de la Thaïlande centrale — les douves réfléchissantes doublent les tours de briques. Si vous venez après la mousson, l'eau est haute, l'effet maximal. Louez un costume thaï blanc (10 €, dans une petite boutique devant le temple) pour la photo viral sur Instagram. Après le coucher du soleil, des LED dorées illuminent le temple ; en 15 minutes, l'air passe de la chaleur écrasante à la brise fraîche du soir, et vous ne voulez plus partir.",
            estimatedCost: "~2,50 €",
            transitFromPrev: "Tuk-tuk environ 3 €",
          },
          {
            name: "Train de retour à Bangkok",
            area: "Ayutthaya → Hua Lamphong",
            duration: "1h30",
            description:
              "Encore le train lent. Dormez, mangez de la mangue, regardez les rizières défiler. Si vous attrapez le dernier train (19h30), vous arriverez à Bangkok au moment où les néons s'allument — les 10 dernières minutes d'approche, regardez les enseignes s'illuminer une à une, c'est votre propre film.",
            estimatedCost: "~0,40 €",
            transitFromPrev: "Tuk-tuk jusqu'à la gare environ 3 €",
          },
        ],
      },
      {
        theme: "Chinatown & dernier repas",
        summary: "Le dernier repas dans la rue à plus haute densité culinaire de Bangkok. Avec un temple et un toit-bar pour ponctuer.",
        stops: [
          {
            name: "Wat Traimit (Bouddha doré)",
            area: "Entrée de Chinatown",
            duration: "45 min",
            description:
              "5,5 tonnes de Bouddha en or massif, recouvertes de plâtre pendant 200 ans, découvertes en 1955 quand un ouvrier en train de le déménager l'a fait tomber et le plâtre s'est fissuré — c'est le miracle de Wat Traimit. La valeur du seul or vaut 250 millions de dollars (cours 2026). Le Bouddha en posture bhumisparsha de 1,5 tonne d'or vous arrête sur place. RDC gratuit, 1er étage petit musée racontant la découverte. À la sortie, vous êtes face à la porte de Chinatown — vous entrez dans «l'utopie alimentaire de Bangkok».",
            estimatedCost: "~2,50 €",
            transitFromPrev: "MRT Hua Lamphong, 5 min à pied",
          },
          {
            name: "Marché de gros Sampheng Lane",
            area: "Chinatown",
            duration: "1h",
            description:
              "1,5 km de ruelles étroites bondées — perles, tissus, poissons séchés, jouets en plastique, accessoires bouddhiques. Perdez-vous volontairement. Ici se trouvent les vraies racines des 100 ans des Chinois de Thaïlande — chaque boutique parle cantonais ou teochew, le propriétaire est descendant des migrants chinois venus depuis les années 1880. Achetez quelques «foulards en soie tissés à la main thaïs» (4 €) ou «huiles essentielles parfumées» (5 €) à ramener — 1/5 du prix d'une boutique d'hôtel.",
            estimatedCost: "~8 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Nai Mong Hoy Tod (omelette aux huîtres)",
            area: "Yaowarat",
            duration: "45 min",
            description:
              "Stand Bib Gourmand Michelin depuis 1968. La signature «Hoi Tod Krob» — huîtres frites enrobées dans une crêpe d'œuf aussi fine et croustillante que de la dentelle, avec sauce piment. Salé, juteux, croustillant à l'oreille. 5 € la portion (8 huîtres). Le tonton-cuisinier est immense, fait simultanément 3-4 portions dans une grande poêle, ses gestes sont une performance. Vous faites la queue 5 minutes — c'est un respect pour son art.",
            estimatedCost: "~5 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Auberge + sieste",
            area: "Siam",
            duration: "2h",
            description: "Dernière sieste. La nuit à Yaowarat va être longue.",
            estimatedCost: "Gratuit",
            transitFromPrev: "MRT + BTS, environ 30 min",
          },
          {
            name: "Tournée street food à Yaowarat",
            area: "Chinatown",
            duration: "2h",
            description:
              "Yaowarat est le 1 km à plus haute densité de street food sur Terre. «T&K Seafood» (chemise verte, à l'angle) — crabe au curry 11 €, crevettes à l'ail 8 €. «Guay Jub Ouan Pochana» — soupe claire de nouilles roulées au poivre 4 €, queue à 1h du matin. «Lek Nai» — fleur de bétel cuite à la noix de coco 2,50 €. «Sai Mai See» — barbe-à-papa thaïe en rouleau 2 €. Tous les stands sont en bord de rue, vous portez un tabouret plastique de l'un à l'autre. Bière fraîche locale Singha ou Chang.",
            estimatedCost: "~21 €",
            transitFromPrev: "MRT Wat Mangkon, 5 min à pied",
          },
          {
            name: "Lebua Sky Bar",
            area: "Silom",
            duration: "1h",
            description:
              "Toit-bar du film «Very Bad Trip 2». Oui, touristique, cocktail à 30 €. Mais debout au 64e étage en plein air, les rives illuminées de la Chao Phraya tendues comme un tapis doré, le sommet jaune lointain de Wat Arun comme une miniature — c'est l'image de Bangkok sur l'affiche du film. Code vestimentaire : pantalon long, chaussures fermées (sandales interdites, changez à l'auberge avant). Le cocktail «Hangovertini» (45 €) est celui du film — buvez-le pour la photo, c'est la dernière carte postale de votre voyage.",
            estimatedCost: "~32 €",
            transitFromPrev: "Taxi environ 7 €",
          },
        ],
      },
    ],
    packingTips: [
      "Un pantalon léger ample pour les codes vestimentaires des temples — le lin respire le mieux",
      "Une gourde réutilisable — partout 7-Eleven recharge à 1 baht",
      "Spray anti-moustique au DEET (utilisation soir) — Soffel est la marque locale forte",
      "Bouchons d'oreille pour le dortoir — les ronflements à 8 dans la chambre sont garantis",
      "Grand paquet de lingettes — la combinaison chaleur + petites chaises de stand fait des lingettes votre vie",
      "Aspirine / paracétamol — la chaleur + déshydratation déclenchent vite des maux de tête, les pharmacies thaïes sont bon marché mais la barrière de la langue gêne",
    ],
    budgetEstimate: "Hors auberge : 45-65 €/jour",
    generalTips: [
      "Grab (l'Uber local) — pas de négociation, pas d'arnaque, prix transparent",
      "Toujours avoir de la monnaie (20, 50 bahts) — les stands grimacent quand vous payez avec un billet de 1 000",
      "L'eau du robinet n'est jamais potable — bouteille d'eau partout à 0,30 €",
      "Le tuk-tuk sans négociation à l'avance, c'est le piège à touristes — 2-3 fois plus cher que Grab",
      "Le métro (MRT) et le skytrain (BTS) sont deux systèmes séparés, billets différents — mais la carte Rabbit fonctionne sur le BTS",
      "Carte SIM française en roaming avec forfait monde, ou achetez à l'aéroport AIS Tourist SIM (5 € / 8 jours / 15 Go)",
    ],
  },

  "osaka-3d-foodie": {
    tagline: "La cuisine du Japon, 3 jours — takoyaki, okonomiyaki, et une journée à Kyoto.",
    audience: "Solo · Foodie · Milieu de gamme",
    destination: "Osaka",
    destinationCountry: "Japon",
    overview:
      "Trois jours pour le foodie solo qui vient «pour manger». Osaka se proclame la cuisine du Japon — l'expression «kuidaore» (manger jusqu'à se ruiner) est née ici. Ces trois jours vous emmènent dans les ruelles néon de Dōtonbori pour le takoyaki, l'okonomiyaki, le kushikatsu, dans un vrai marché pour le petit-déjeuner, et une journée complète à Kyoto pour le contraste avec les temples, avant de revenir terminer par une nuit yakitori. Si Tokyo est un costume cravate, Osaka est une chemise hawaïenne et un short — terre-à-terre, voix forte, on s'essuie la bouche dans le tablier.",
    bestSeasonNote:
      "Avril pour les cerisiers du parc Osaka-jō, fin octobre pour les couleurs d'automne et le climat marchable. Évitez la Golden Week (fin avril-début mai) : pic du tourisme intérieur. Le Tenjin Matsuri (24-25 juillet) est la plus grande fête d'été d'Osaka — défilé de centaines de bateaux à lanternes + feux d'artifice ; si vous tombez dessus, réservez 2 mois à l'avance. En décembre, les illuminations de Noël sur la Midōsuji-dōri vont de Umeda à Namba sur 2 km de couloir lumineux.",
    currencyTip:
      "Petits restaurants et stands de Dōtonbori restent en cash. Dès l'arrivée, retirez 20 000-30 000 yens (130-200 €) au 7-Eleven. Les chaînes, konbini, JR acceptent PayPay, UnionPay, Visa et la carte ICOCA. ICOCA, c'est la version Osaka de Suica — un seul tap, achetez-la au guichet vert JR à l'arrivée pour 2 000 ¥ (1 500 ¥ de solde + 500 ¥ de caution remboursable).",
    languageTip:
      "Encore moins d'anglais qu'à Tokyo. «Kore kudasai» (celui-là, s'il vous plaît) + un doigt = universel. «Oishii !» (délicieux !) fait sourire la patronne d'Osaka pour la journée. «Sumimasen» pour appeler. Le mode caméra de Google Translate hors-ligne est indispensable. Les Osakais parlent le kansai-ben (dialecte du Kansai), légèrement différent du japonais standard, mais Translate le reconnaît.",
    emergencyNumber: "110 (police), 119 (ambulance/pompiers)",
    hotel: {
      name: "Cross Hotel Osaka",
      area: "Shinsaibashi",
      address: "2-5-15 Shinsaibashi-suji, Chūō-ku, Osaka",
      rationale:
        "Shinsaibashi est à 5 min à pied de Dōtonbori, 4 min du métro, et toute la zone est sous l'arcade couverte de Shinsaibashi — vous ne sortez jamais sous la pluie. Cross Hotel a un design soigné, chambres compactes (typique business hotel japonais) mais chacune avec baignoire indépendante + sèche-cheveux Dyson. Le café-restaurant du lobby «The Kitchen Salvatore Cuomo» reste ouvert jusqu'à 23h, parfait pour un dernier verre de vin après la tournée du soir. Soins Mikimoto en chambre — touches japonaises au maximum.",
      estimatedNightlyRate: "~150 €/nuit",
    },
    airportTransit: {
      method: "Nankai Rapi:t → Namba → Midōsuji line → Shinsaibashi",
      duration: "Environ 60 min",
      cost: "~16 € (aller simple)",
      instructions:
        "Aéroport du Kansai (KIX) prenez le Nankai Rapi:t Limited Express direct jusqu'à Namba en 40 min. À Namba, ligne Midōsuji 1 station jusqu'à Shinsaibashi, puis 5 min à pied jusqu'à l'hôtel. Au guichet Nankai de l'aéroport, le pack «Nankai Rapi:t + ICOCA pour étrangers» (1 450 ¥) économise environ 5 €. Si vous prenez JR Haruka jusqu'à Shin-Osaka, comptez 15 min supplémentaires en métro — moins recommandé. Après le dernier train à 23h30, navette aéroport (~7 €, 1h) ou Uber (~50 €).",
    },
    days: [
      {
        theme: "Tournée gastro de Dōtonbori",
        summary: "Posez les valises et plongez direct dans le ventre néon d'Osaka. Takoyaki, okonomiyaki, lumières du canal, et un ramen de minuit pour finir.",
        stops: [
          {
            name: "Canal Dōtonbori + enseigne Glico",
            area: "Dōtonbori",
            duration: "45 min",
            description:
              "Sur le pont Ebisubashi, photographiez l'enseigne «Glico Running Man» — utilisée par tous les guides touristiques sur Osaka. Glico l'a installée en 1935, elle a été modernisée 6 fois mais le coureur reste. Continuez sur la rive nord du canal, au-dessus de vos têtes l'énorme crabe (kani-dōraku, dont les pattes bougent vraiment), l'enseigne fugu (Zuboraya, fermée depuis 2020 mais l'enseigne demeure), le sushi géant — les enseignes 3D d'Osaka sont un patrimoine.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min à pied depuis l'hôtel",
          },
          {
            name: "Wanaka Sennichimae (takoyaki)",
            area: "Dōtonbori",
            address: "11-19 Namba Sennichimae, Chūō-ku",
            duration: "30 min",
            description:
              "Le vrai takoyaki — extérieur croustillant, intérieur fondant qui jaillit de poulpe et de dashi. Wanaka est une institution, prix raisonnable, les locaux font la queue. Choisissez le 8-pièces classique «sauce + mayo + bonite + algue verte» (600 ¥) — la combinaison sacrée. Les flocons de bonite dansent dans la chaleur — c'est cela «踊る花» (la fleur qui danse). Une bouchée et l'octopus moelleux + la pâte salée + l'algue sucrée = vous comprenez d'un coup pourquoi un Osakais ne mangerait jamais le takoyaki de Tokyo. Attention : 100°C à la sortie, soufflez 3 secondes avant de mordre.",
            estimatedCost: "~5 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Galerie Shinsaibashi-suji",
            area: "Shinsaibashi",
            duration: "1h",
            description:
              "600 m d'arcade couverte qui relie Dōtonbori à Shinsaibashi. Matsumoto Kiyoshi, Don Quijote, Cosme Kitchen — tous les flagships de pharmacie/lifestyle sont là. Le supermarché «Tamade» vend des bentō japonais en promotion (à moitié prix après 20h). Les recos: Daimaru 7e étage «Eikokuya» — vieille maison écossaise d'Osaka, achetez une écharpe (50 €) en cadeau. «ABC-MART Osaka Shinsaibashi» est l'un des plus grands magasins de chaussures du Japon, Onitsuka Tiger et New Balance 30% moins chers qu'en France.",
            estimatedCost: "Gratuit",
            transitFromPrev: "8 min à pied",
          },
          {
            name: "Mizuno (okonomiyaki)",
            area: "Dōtonbori",
            address: "1-4-15 Dōtonbori, Chūō-ku",
            duration: "1h",
            description:
              "Spécialiste okonomiyaki Bib Gourmand depuis 1945. Le «yamaimo-yaki» est la signature — le yam (igname) rend la pâte plus aérienne qu'ailleurs, presque sans farine. Le chef cuisine sur la plaque chaude devant vous : porc, pieuvre, calamar, œuf, chou, pâte de yam empilés en couches, retournés, écrasés, sauce, bonite, algue. 8 minutes, servi à pic. 1 280 ¥ la part, des amateurs prennent l'avion exprès pour ce plat. Bière fraîche (600 ¥) en accompagnement. Attente 20-30 min normale en heure de pointe.",
            estimatedCost: "~9 €",
            bookingTip: "Pas de réservation. Attente 20-30 min en heure de pointe — utilisez ce temps pour faire un tour du canal.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Hōzen-ji Yokochō (ruelle des lanternes)",
            area: "Namba",
            duration: "30 min",
            description:
              "À côté du temple Hōzen-ji, une allée pavée de 50 m — lanternes papier suspendues, izakayas minuscules. Dans le temple, la statue de pierre «Fudō Myō-ō» recouverte de mousse est aspergée d'eau par les fidèles depuis des siècles — elle ressemble maintenant à un bonhomme verdâtre. Aspergez-la aussi, faites un vœu. Cette ruelle ne fait que 2 m de large, les boutiques tiennent 8-10 places, ouvertes depuis les années 1900 — c'est «la plus vieille rue de bars du Japon». Photos de jour, alcool de nuit — deux mondes.",
            estimatedCost: "Gratuit",
            transitFromPrev: "3 min à pied",
          },
          {
            name: "Kinryū Ramen (Dōtonbori)",
            area: "Dōtonbori",
            duration: "30 min",
            description:
              "L'énorme dragon vert lumineux — n°1 incontesté du ramen de minuit à Osaka, ouvert 24h/24. Bouillon tonkotsu-shoyu, condiments à volonté à table : kimchi, ail pilé, ciboulette d'ail. 800 ¥ le bol, l'estomac à 2h du matin a sa cure. Note : 24h après vous sentirez l'ail — mais une fois ici, on ne lésine pas. L'image «assis en bas du dragon, en train de slurper» est l'âme de la nuit d'Osaka. À 3h du matin, vous croisez peut-être les filles de Kabukichō en pause.",
            estimatedCost: "~5 €",
            transitFromPrev: "3 min à pied",
          },
        ],
      },
      {
        theme: "Excursion à Kyoto",
        summary: "30 min de train pour la vieille capitale. Fushimi Inari à l'aube, déjeuner kyotoïte, retour à Osaka avant l'heure de pointe.",
        stops: [
          {
            name: "JR Special Rapid → Kyoto",
            area: "Shin-Osaka → Kyoto",
            duration: "30 min",
            description:
              "Shin-Osaka, JR ligne Kyoto Special Rapid direct — 30 min sans correspondance. Pas besoin du Shinkansen (plus rapide mais 5× plus cher). Côté droit fenêtre, par temps clair vous voyez le mont Ibuki au loin. Au konbini Shin-Osaka, achetez un onigiri (1 €) et un café pour le petit-déj' à manger dans le train. La gare de Kyoto elle-même est un chef-d'œuvre architectural — terminée en 1997 par Hara Hiroshi, hall principal escaliers déployés comme des nuages, plate-forme d'observation gratuite tout en haut.",
            estimatedCost: "~5 €",
            transitFromPrev: "Métro Shinsaibashi vers Shin-Osaka, environ 15 min",
          },
          {
            name: "Fushimi Inari Taisha",
            area: "Fushimi",
            address: "68 Fukakusa Yabunouchi-chō, Fushimi-ku",
            duration: "2h",
            description:
              "10 000 torii vermillon serpentent le long de la montagne. Avant 8h45, photo sans personne — après 10h30, la montagne entière est noyée de touristes chinois et coréens caméra à la main. Montez jusqu'au croisement «Yotsutsuji» en environ 30 min, où la plupart font demi-tour — continuez encore 20 min jusqu'au sommet «Ichi-no-Mine», presque vide, vue panoramique sur Kyoto. À la descente, achetez à un stand de la montagne un «kitsune udon» (udon au tofu sucré, 600 ¥) — le renard est le messager d'Inari, manger ce plat est le rituel.",
            estimatedCost: "Gratuit",
            transitFromPrev: "JR Nara line 5 min + 3 min à pied",
          },
          {
            name: "Marché Nishiki",
            area: "Centre Kyoto",
            duration: "1h30",
            description:
              "«La cuisine de Kyoto» — 400 m de marché couvert depuis l'ère Heian. «Tako-tamago» (mini-poulpe farci d'œuf de caille mijoté sucré, 400 ¥ pièce) — choc visuel + goût umami complexe. «Tōnyū donut» (donut au lait de soja, 150 ¥ pièce) frit avec de l'eau pure de Kyoto. «Yuba» (peau de tofu fraîche, ultra fine, 800 ¥ la part avec gingembre et sauce soja). De l'extrémité ouest «Nishiri» à l'extrémité est «Nishiki Market», 8 stands en 3 heures = le déjeuner kyotoïte type.",
            estimatedCost: "~7 €",
            transitFromPrev: "JR Nara → Kyoto Station → métro Shijō, environ 20 min",
          },
          {
            name: "Kiyomizu-dera",
            area: "Higashiyama",
            duration: "1h30",
            description:
              "Temple en bois de 1 200 ans, sans un seul clou, soutenu par des colonnes de bois de 13 m. Depuis la plate-forme «Kiyomizu no Butai», la vue sur Kyoto et le mont Hiei vert au loin se rejoignent en une ligne — la carte postale millénaire. Au «Otowa-no-Taki» derrière le hall principal, choisissez une seule des 3 cascades (étude / amour / longévité — boire des deux à la fois rend tout invalide). 400 ¥ d'entrée. Sur le chemin, ne manquez pas le sanctuaire Jishu — protecteur des amours, les jeunes filles japonaises s'y précipitent ; les omamori roses sont un souvenir Instagram.",
            estimatedCost: "~3 €",
            transitFromPrev: "Bus 206 depuis Shijō → arrêt Gojo-zaka, environ 25 min à pied",
          },
          {
            name: "Sannen-zaka & Ninen-zaka",
            area: "Higashiyama",
            duration: "1h",
            description:
              "Rues pavées de l'ère Edo qui descendent depuis Kiyomizu. Maisons de thé, location de kimono, wagashi, glace au matcha s'enchaînent — les deux rues les plus photographiées du Japon. «Kyō-Azuki» mochi au matcha (350 ¥), «Saryō Tsujiri» parfait au matcha (1 500 ¥) sont des standards. Attention : la légende dit que tomber sur Ninen-zaka entraîne la mort dans les 2 ans — mais comme la rue est si bondée, vous ne pouvez pas tomber, rassurez-vous. En kimono (location 4 000 ¥), vous devenez le décor de Kyoto pour les autres.",
            estimatedCost: "~7 €",
            transitFromPrev: "Depuis Kiyomizu à pied",
          },
          {
            name: "Retour à Osaka",
            area: "Kyoto → Shinsaibashi",
            duration: "1h",
            description:
              "Gion-Shijō → ligne Keihan → Yodoyabashi → ligne Midōsuji → Shinsaibashi. Plus direct que repasser par JR Kyoto Station. À l'hôtel, bain, 30 min de repos avant le dîner — vos jambes ont fait 20 000 pas, elles protestent.",
            estimatedCost: "~5 €",
            transitFromPrev: "Gion-Shijō à pied 10 min",
          },
          {
            name: "Kushikatsu Daruma (Shinsekai)",
            area: "Shinsekai",
            address: "2-3-9 Ebisu-higashi, Naniwa-ku",
            duration: "1h30",
            description:
              "Autre signature osakaïte — kushikatsu (toute la nourriture enrobée et frite sur pic). Daruma est le pionnier depuis 1929, photo du fondateur sur le mur. Commandez le set «omakase 15 brochettes» (3 000 ¥) — bœuf, crevette, poulpe, œuf de caille, asperge, bouchée d'octopus, fromage, défilent l'une après l'autre. Règle : sauce commune dans un bac, «interdit de tremper deux fois» (on partage, donc une bouchée = une trempette). Chou cru gratuit à volonté — mangez-le avec la sauce comme accompagnement. La «Tsūtenkaku» voisine est la tour Eiffel d'Osaka (1956).",
            estimatedCost: "~21 €",
            bookingTip: "Queue minimale : avant 19h30 ou après 21h. Photographiez l'enseigne rouge «interdit de tremper deux fois» au mur du flagship.",
            transitFromPrev: "Métro Midōsuji Shinsaibashi → Dōbutsuen-mae, environ 10 min",
          },
        ],
      },
      {
        theme: "Château d'Osaka, marché matin, dernier repas",
        summary: "Petit-déj au marché Kuromon, tour du château le plus célèbre d'Osaka, dîner raffiné en finale.",
        stops: [
          {
            name: "Petit-déjeuner au marché Kuromon",
            area: "Nipponbashi",
            address: "2-4-1 Nipponbashi, Chūō-ku",
            duration: "1h30",
            description:
              "Oursin frais, sashimi de thon, brochettes de bœuf wagyu grillées, fraises de meilleur producteur — 600 m de marché. «Kuromon Sanpei» 1 500 ¥ tout un plateau d'oursin + thon o-toro, moitié du prix de Tsukiji. «Daiyū Kamaboko» pâté de poisson 200 ¥ la pièce, à manger en marchant. «Sugata-ya» brochettes de wagyu spécial 800 ¥ la pièce, sauce sucrée typique du Kansai. Mangez debout, partagez, pas jusqu'au bout du marché — c'est le petit-déj, pas un engagement.",
            estimatedCost: "~17 €",
            transitFromPrev: "10 min à pied depuis l'hôtel",
          },
          {
            name: "Château d'Osaka",
            area: "Chūō-ku",
            address: "1-1 Ōsakajō, Chūō-ku",
            duration: "2h",
            description:
              "Construit par Toyotomi Hideyoshi au XVIe siècle, reconstruit en béton au XXe. L'extérieur est l'essentiel — toit de tuiles vert émeraude, ornements à la feuille d'or, reflet dans les douves. Sauf passion d'historien, sautez le musée intérieur — la promenade autour est plus belle. À 9h pile, vous évitez les bus touristiques ; à 11h la file pour le donjon dépasse 30 min. En automne, le contraste pourpre des érables + murs blancs depuis le bosquet de pruniers est l'angle le plus magique. «Jo-Terrace Osaka» (ouvert 2017) propose 8 cafés en bas du château pour pause.",
            estimatedCost: "~5 € (donjon)",
            bookingTip: "9h pile pour éviter les bus touristiques. «Jo-Terrace Osaka» (ouvert 2017) propose 8 cafés en bas du château.",
            transitFromPrev: "Sennichimae line → Tanimachi line → Tanimachi 4-chōme, environ 15 min",
          },
          {
            name: "Sushi Harukoma",
            area: "Tenma",
            duration: "1h30",
            description:
              "Sous l'arcade de Tenjinbashi-suji (2,6 km, plus longue rue commerçante du Japon), un sushi-ya de quartier. Omakase déjeuner niveau Michelin à 1/3 du prix de Tokyo Ginza — 3 500 ¥ pour 8 sushis nigiri + maki + tamago. Au comptoir face au chef, vous le voyez préparer — contrairement aux sushiya «sérieux» d'Edomae à Ginza, ici le chef discute, explique chaque pièce. «Ō-toro» (toro gras de thon), «uni gunkan» (oursin), «anago» (anguille de mer) sont les essentiels. Un vieil habitué d'à côté mange ici depuis 30 ans — possiblement un grand-père du quartier.",
            estimatedCost: "~22 €",
            bookingTip: "Pas de résa midi. Avant 12h30 pour avoir un siège au comptoir.",
            transitFromPrev: "Métro depuis Osaka Castle → Minami-Morimachi, environ 10 min",
          },
          {
            name: "Umeda Sky Building",
            area: "Umeda",
            duration: "1h30",
            description:
              "Deux tours de 173 m connectées par une plate-forme circulaire au sommet — «Kūchū Teien» (jardin flottant). Vue à 360° en plein air — à l'est le mont Ikoma (entre Osaka et Nara), à l'ouest la baie d'Osaka, au sud le château d'Osaka. 30 min avant le coucher du soleil, vous capturez le jour + la nuit ; le coucher d'Osaka s'étire en orange-violet jusqu'à l'horizon, les guirlandes du pont Akashi-Kaikyō s'allument au loin. Architecte Hara Hiroshi, 1993, classé par Times «20 plus beaux bâtiments du monde».",
            estimatedCost: "~10 €",
            transitFromPrev: "Métro Midōsuji environ 20 min",
          },
          {
            name: "Sushi Endō (dîner précoce)",
            area: "Fukushima",
            duration: "1h",
            description:
              "Tachigui (sushi debout) — la culture japonaise unique du «sushi à manger debout». Endō ne sert que des combos pré-arrangés à 700 ¥ (5 pièces), parce que le marché central de poissons est juste à côté — fraîcheur incroyable, prix incroyable. Prenez 2-3 sets (chacun différent). Debout, on parle plus facilement avec les ouvriers, employés de bureau et femmes au foyer voisins — le tachigui rend tout le monde plus égal. Ferme à 19h30, soyez là avant 18h30.",
            estimatedCost: "~14 €",
            bookingTip: "Ferme à 19h30, soyez là avant 18h30 pour commander.",
            transitFromPrev: "JR ligne Loop environ 10 min",
          },
          {
            name: "Promenade nocturne à Dōtonbori (encore)",
            area: "Dōtonbori",
            duration: "1h",
            description:
              "On a commencé ici, on finit ici. Le canal toutes lumières allumées la nuit est une autre ville. Au konbini, achetez une bière fraîche en canette (220 ¥), accoudez-vous au pont Ebisubashi, regardez le Glico Running Man clignoter — vous pensez «il y a 3 jours j'étais déjà ici, et je suis devenu une autre personne». C'est la dernière photo de votre album «mes souvenirs du Kansai».",
            estimatedCost: "~2 €",
            transitFromPrev: "JR ligne Loop → métro Shinsaibashi, environ 15 min",
          },
        ],
      },
    ],
    packingTips: [
      "Chaussures à enfiler — sanctuaires, ryokans, certains restaurants",
      "Petit sac fourre-tout pour les achats de marché (pots de confiture de yuzu en verre)",
      "Antiacides — vous allez forcément trop manger",
      "Parapluie portatif — la pluie d'Osaka ne prévient pas",
      "Lingettes — indispensable pour la street food",
      "Un pantalon léger — quelques temples de Kyoto exigent une tenue couverte",
    ],
    budgetEstimate: "Hors hôtel : 90-120 €/jour",
    generalTips: [
      "Carte ICOCA le 1er jour — train, bus, distributeur, tap pour tout",
      "Le dialecte d'Osaka (kansai-ben) est familier et chaleureux. «Ōkini» = merci, à Osaka uniquement",
      "Le pourboire est impoli — acceptez la monnaie",
      "Malgré la réputation, beaucoup de stands de Dōtonbori ferment à 21h — vérifiez les plans tardifs",
      "ICOCA + Apple Pay / Google Pay tap au konbini et au métro",
      "Le JR Pass Kansai 5 jours (35 €) est rentable si vous combinez Osaka + Kyoto + Nara + Kobe ; pour Osaka pur, pas besoin",
    ],
  },

  "nyc-4d-couple": {
    tagline: "Quatre jours en couple — icônes de Midtown, pont de Brooklyn, Broadway, le Met.",
    audience: "Couple · Milieu de gamme",
    destination: "New York",
    destinationCountry: "États-Unis",
    overview:
      "Quatre jours pour le couple qui ne veut pas «cocher New York comme une liste». Chaque jour une icône de Manhattan, manger comme un local, traverser le pont de Brooklyn au coucher du soleil, terminer par une soirée à Broadway. Hôtel choisi à Midtown East — à pied de Central Park et de Grand Central, accessible à JFK. L'essence de New York n'est pas «combien on a vu» mais «un coin de rue qui vous frappe» — ces 4 jours vous offrent 3 ou 4 de ces moments.",
    bestSeasonNote:
      "Fin avril-début juin et mi-septembre-fin octobre sont les zones douces — climat tempéré, longues journées, foules tolérables. Les cerisiers du printemps de Central Park fleurissent fin avril ; les feuilles d'automne fin octobre-début novembre transforment le parc en or. Juillet (chaleur humide) et février (froid sévère) à éviter. Saison de Noël (fin novembre-début janvier) avec le sapin du Rockefeller Center et la patinoire de Bryant Park = New York le plus festif, mais aussi le plus bondé.",
    currencyTip:
      "Sauf quelques bodegas et la pizza à 1 € la part, partout Visa/Mastercard et UnionPay sans contact. Pourboire de 18-22% au restaurant assis = pas une option, c'est le vrai revenu du serveur. La mention «Service charge included» en bas du ticket est rare. Apple Pay / Google Pay sur quasi tout le métro et les commerces — vous pouvez sortir sans portefeuille, juste téléphone.",
    languageTip:
      "Anglais évidemment, mais les New-Yorkais valorisent la vitesse — commande rapide, ne bloquez pas le trottoir, carte de métro prête au tourniquet. «Excuse me» en ouverture, «Thank you» en fermeture. Les annonces du métro sont rapides et accentuées ; calez votre itinéraire sur Google Maps. Les locaux dans Central Park sont très amicaux — quand vous demandez votre chemin, ils s'arrêtent et vous expliquent en détail.",
    emergencyNumber: "911 (toutes urgences)",
    hotel: {
      name: "Pod 51 Hotel Midtown East",
      area: "Midtown East",
      address: "230 E 51st St, New York, NY 10022",
      rationale:
        "Midtown East à pied de Central Park, Grand Central, des meilleurs échangeurs de métro de la ville, mais un cran plus calme que Times Square. Pod 51 a des chambres compactes modernes, terrasse de toit pour le coucher du soleil. La ligne E vers JFK est à un block. Toutes les chambres ont salle de bain privée (la chaîne Pod en a aussi avec sdb commune, pas celui-ci), produits Aesop, enceintes Marshall. Le meilleur rapport qualité-prix des hôtels boutique de Midtown East.",
      estimatedNightlyRate: "~200 €/nuit",
    },
    airportTransit: {
      method: "JFK AirTrain + LIRR → Grand Central",
      duration: "Environ 55 min",
      cost: "~14 € (aller simple)",
      instructions:
        "À JFK, suivez les panneaux AirTrain (gratuit dans l'aéroport) jusqu'à Jamaica. À Jamaica, achetez un billet LIRR pour Grand Central (~10 € hors-pointe, ~14 € pointe). De Grand Central, 8 min à pied au nord jusqu'à l'hôtel. Moitié prix d'un Uber en heure de pointe. AirTrain connecte aussi à la ligne E ($2.90) mais 1h avec 2 changements, pas recommandé. Les chauffeurs en costume noir au «privé» à la sortie sont des taxis non agréés — ignorez et passez.",
    },
    days: [
      {
        theme: "Icônes de Midtown",
        summary: "Échauffement avec le Manhattan «carte postale» — Central Park, MoMA, déjeuner classique au deli, Rockefeller Center au crépuscule.",
        stops: [
          {
            name: "Central Park (The Pond + Gapstow Bridge)",
            area: "Midtown",
            duration: "1h30",
            description:
              "Entrée Grand Army Plaza (5e Avenue & 59e). Longez The Pond vers le nord, traversez Gapstow Bridge (le pont de la promo de «La Saint-Valentin»), continuez jusqu'à Sheep Meadow. L'extrémité sud du parc offre la vue carte postale la plus iconique avec moins de vélos. Café à la kiosque Bethesda Terrace, Dante Espresso (5 €) — Dante est le bar phare de Greenwich Village, branche au parc. Avant 10h le week-end, vous voyez les locaux promener leur chien, courir, pousser une poussette ; presque pas de touristes.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied depuis l'hôtel",
          },
          {
            name: "Museum of Modern Art (MoMA)",
            area: "Midtown",
            address: "11 W 53rd St",
            duration: "2h",
            description:
              "N'essayez pas de tout voir. Direct au 5e — La Nuit étoilée de Van Gogh, Les Demoiselles d'Avignon de Picasso, La Persistance de la mémoire de Dali, Les Nymphéas de Monet — dans la même salle. Tout le reste est bonus. Le 4e étage Art américain d'après-guerre (Pollock, Rothko, Warhol) est aussi de niveau mondial. Le 3e étage Design moderne expose un prototype d'iPhone, une chaise Eames, un sac Tom Ford comme œuvres d'art — vous repensez à «design = art». L'app gratuite MoMA a un audioguide en français.",
            estimatedCost: "~28 €",
            bookingTip: "Réservez en ligne pour éviter la queue. Vendredi 16-20h gratuit grâce au sponsor UNIQLO, mais bondé.",
            transitFromPrev: "15 min à pied",
          },
          {
            name: "Katz's Delicatessen",
            area: "Lower East Side",
            address: "205 E Houston St",
            duration: "1h",
            description:
              "Le sandwich pastrami sur seigle depuis 1888. Ticket à l'entrée — gardez-le bien, perte = 50 € d'amende. Au comptoir du «cutter», commandez «pastrami on rye» + 1 $ de pourboire au cutter (il vous coupe des tranches plus épaisses et belles). Une portion suffit pour 2 personnes, accompagnée de cornichons aigres et coleslaw. Cette adresse est devenue un lieu de pèlerinage depuis la scène «I'll have what she's having» de «Quand Harry rencontre Sally» — la table est toujours marquée.",
            estimatedCost: "~25 €",
            transitFromPrev: "Ligne F 5e Av → 2e Av, environ 20 min",
          },
          {
            name: "New York Public Library (côté Bryant Park)",
            area: "Midtown",
            duration: "45 min",
            description:
              "Montez les marches de marbre flanquées des deux lions (Patience et Fortitude), entrez dans la Rose Main Reading Room — sous le plafond cathédrale de 91 m de long, sur des tables en bois éclairées par des lampes vertes, des lecteurs travaillent depuis 100 ans. Gratuit, n'importe qui peut s'asseoir lire ou travailler. Le Rare Book Room du 3e étage expose parfois la Bible de Gutenberg (1455, plus vieux livre imprimé). En sortant, Bryant Park — cinéma en plein air l'été, patinoire gratuite l'hiver.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Ligne F → 42nd St-Bryant Park, environ 15 min",
          },
          {
            name: "Top of the Rock",
            area: "Midtown",
            duration: "1h",
            description:
              "Mieux que l'Empire State — vous êtes DANS la skyline, vous ne la regardez pas. Réservez 30 min avant le coucher du soleil — vue jour + nuit en un seul ticket. L'Empire State se dresse face à vous au centre. La nouvelle expérience «Beam» (poutre suspendue) recrée la photo célèbre de 1932 des ouvriers déjeunant sur une poutre — 100 € de plus que le billet standard mais ça vaut le coup pour la photo.",
            estimatedCost: "~40 €",
            bookingTip: "En ligne, créneau 30 min avant l'heure dorée — épuisé 2-3 jours à l'avance.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Keens Steakhouse",
            area: "Midtown",
            address: "72 W 36th St",
            duration: "1h30",
            description:
              "Chophouse de 1885 — au plafond, 90 000 pipes en argile du Pipe Club, chacune appartenant à un membre des 140 dernières années (Roosevelt, Einstein). La «Mutton Chop» (côtelette de mouton) est le plat historique, mais la «Bone-in Prime Rib» reste la vraie commande. Asseyez-vous dans la Bull Moose Room — l'ancienne loge fixe de Theodore Roosevelt, sa photo avec un wapiti au mur. Single malt 15 € le verre.",
            estimatedCost: "~100 € par personne",
            bookingTip: "OpenTable 1-2 semaines à l'avance pour le créneau or, parfois 21h libre le jour même. Tenue habillée.",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "Brooklyn day + pont au coucher du soleil",
        summary: "Métro vers DUMBO, balade dans les coins de Brooklyn les plus photographiés, la pizza de la guerre des pizzas, retour par le pont à l'heure dorée.",
        stops: [
          {
            name: "Ligne A → High St (DUMBO)",
            area: "DUMBO",
            duration: "25 min",
            description:
              "Midtown ligne A/C jusqu'à High St-Brooklyn Bridge. Sortez et descendez la rampe pavée vers Washington Street — c'est l'endroit de la photo classique «pont de Manhattan encadré par des entrepôts de brique». Avant 9h c'est calme, après 9h c'est envahi par les touristes. DUMBO = «Down Under the Manhattan Bridge Overpass» (sous le viaduc du pont de Manhattan), zone de marins et dockers à l'origine, devenue les appartements les plus chers de Brooklyn.",
            estimatedCost: "~3 €",
            transitFromPrev: "5 min à pied depuis l'hôtel",
          },
          {
            name: "Washington Street + vue pont de Manhattan",
            area: "DUMBO",
            duration: "30 min",
            description:
              "Au croisement Washington/Water. Le pont de Manhattan encadre l'Empire State Building en arrière-plan — c'est «la photo de Brooklyn». Avant 11h, tranquille ; après 11h envahi de touristes. Tenue blanche claire (T-shirt, pantalon kaki, casquette) marche le mieux pour la photo. Almondine Bakery (boulangerie française) en face — sandwich thon + cappuccino (15 €), à manger en marchant le long de l'eau.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Inclus",
          },
          {
            name: "Juliana's Pizza",
            area: "DUMBO",
            address: "19 Old Fulton St",
            duration: "1h",
            description:
              "Le restaurant original de Patsy Grimaldi — il a vendu Grimaldi's (juste à côté) à des investisseurs dans les années 80, et à 80 ans il a rouvert Juliana's avec sa recette familiale. Margarita classique + pizza blanche aux palourdes (clams + ail + huile + persil, sans sauce tomate) — cette dernière exclusive à Juliana's. Pâte croustillante-élastique au four à bois, vin rouge italien au verre (10 €). Le tiramisu maison du grand-père italien : oui.",
            estimatedCost: "2 personnes ~32 €",
            bookingTip: "Pas de résa. À 11h15, vous attrapez une table avant la ruée de midi. Le week-end attente 30 min+.",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Brooklyn Bridge Park + Jane's Carousel",
            area: "DUMBO",
            duration: "1h30",
            description:
              "Promenade vers l'ouest dans le parc — voie verte, manège de 1922 (protégé dans une cabine de verre), skyline de Manhattan en face. Au retour, prenez la Brooklyn Heights Promenade (20 min jusqu'au milieu) : depuis cet angle, skyline + Statue de la Liberté + pont de Brooklyn dans le même cadre = la carte postale ultime de New York, utilisée par Spike Lee dans «New York Stories».",
            estimatedCost: "Manège ~3 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Time Out Market (food hall)",
            area: "DUMBO",
            duration: "1h",
            description:
              "21 restaurants brooklynois sélectionnés sous un toit. Terrasse de toit avec vue sur Manhattan. Heure de goûter — sandwich filet de bœuf de Pat LaFrieda (16 €), Mr. Pao poulet épicé sur riz (14 €), Hannah's Bretzel allemand (5 €). Une bière artisanale de Brooklyn (Brooklyn Lager, 7 €), assis sur la terrasse en attendant le coucher du soleil pour le retour à pied.",
            estimatedCost: "~25 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Traverser le pont de Brooklyn (est → ouest)",
            area: "Pont de Brooklyn",
            duration: "45 min",
            description:
              "1,8 km. Départ du parc côté Brooklyn, marchez vers l'ouest sur la passerelle piétonne en bois, le soleil se couche derrière la skyline. Côté sud (piétons), pas le côté nord (vélos). Au milieu du pont, des centaines de cadenas de couples laissés (la ville coupe régulièrement). Au crépuscule du week-end, des musiciens de rue jouent du violon — vous vous arrêtez main dans la main pour écouter une chanson, c'est le «moment New York».",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied jusqu'à l'entrée côté Brooklyn",
          },
          {
            name: "Lombardi's Pizza (1re pizzeria d'Amérique)",
            area: "Little Italy",
            address: "32 Spring St",
            duration: "1h",
            description:
              "Pizzeria au four à charbon depuis 1905. Le débat «est-ce toujours la meilleure» continue, mais «première officiellement enregistrée» est incontestable. Margarita classique + Soppressata Piccante (saucisse italienne piquante). Conclusion parfaite de la guerre des pizzas — Juliana's vs Lombardi's, vous avez votre verdict. Mulberry Street ce coin Little Italy, en septembre, le San Gennaro Festival transforme la rue en festival italien — danse, feux d'artifice, stands de jeu.",
            estimatedCost: "2 personnes ~28 €",
            transitFromPrev: "City Hall métro 10 min à pied",
          },
        ],
      },
      {
        theme: "Lower Manhattan + Statue de la Liberté",
        summary: "9/11 Memorial, ferry vers Liberty, après-midi sur la High Line, puis Broadway le soir.",
        stops: [
          {
            name: "9/11 Memorial & Museum",
            area: "Financial District",
            address: "180 Greenwich St",
            duration: "2h30",
            description:
              "Deux bassins réfléchissants d'1 acre dans les empreintes des Twin Towers, gravés du nom de chaque victime. Le musée souterrain est suffocant — préparez votre énergie mentale. Une partie expose la dernière structure d'acier des Twin Towers, soudures encore visibles ; le «Survivors' Stairs» (escalier des survivants) montre comment les gens ont fui ; le mur «In Memoriam» avec photos de chaque victime fait 300 m. À la sortie par l'Oculus, transit conçu par Calatrava — ailes blanches, lumière qui descend du sommet comme un squelette de ptérosaure, à photographier absolument.",
            estimatedCost: "Musée ~26 €, mémorial gratuit",
            bookingTip: "Réservez le musée 2-3 jours à l'avance ; walk-in souvent 1h+ d'attente. Réservez 2h30 minimum, l'émotion a besoin de digestion.",
            transitFromPrev: "Lexington → ligne E World Trade Center, environ 20 min",
          },
          {
            name: "Eataly Downtown",
            area: "Financial District",
            duration: "1h",
            description:
              "Déjeuner plus léger entre la matinée lourde et le ferry. Comptoir pâtes et comptoir pizza, tous deux style romain et rapides. Au bar debout, un Aperol Spritz (10 €) + assiette de prosciutto + bleu — debout 15 minutes, on récupère pour le ferry.",
            estimatedCost: "~25 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Statue Cruises ferry → Liberty Island",
            area: "Battery Park",
            duration: "2h",
            description:
              "Seul Statue Cruises (concessionnaire officiel) accoste à Liberty et Ellis. Ticket combiné. Le ticket «Crown» (couronne) longue file pour une petite fenêtre — pas la peine. L'accès Pedestal suffit, vue magnifique sous les pieds de la statue. Ellis Island était le centre d'inspection des immigrants 1892-1954 — 17 millions sont passés par là. Le musée permet de retrouver vos ancêtres si vous êtes Américain d'origine européenne. Cette étape donne du sens concret au «rêve américain».",
            estimatedCost: "~22 €",
            bookingTip: "En ligne 1 jour avant. Été week-end, walk-in épuisé à 11h.",
            transitFromPrev: "15 min à pied jusqu'au ferry",
          },
          {
            name: "High Line (Gansevoort → 34th St)",
            area: "Chelsea / Meatpacking",
            duration: "1h",
            description:
              "Parc linéaire de 2,3 km construit sur une voie ferrée surélevée désaffectée. De Gansevoort vers le nord — galeries de Chelsea, Whitney Museum (extérieur signé Renzo Piano), Vessel et Shed à Hudson Yards en finale. Sortez à la 34e pour le métro. En automne, herbes des deux côtés virent au jaune, le coucher de soleil de l'Hudson river entre par la gauche — c'est le kilomètre le plus marchable de New York.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Ligne 1 South Ferry → 14th St, 1 station",
          },
          {
            name: "Joe Allen (avant-théâtre)",
            area: "Theater District",
            address: "326 W 46th St",
            duration: "1h",
            description:
              "Classique avant-spectacle de 1965 — acteurs, équipes, public viennent ici avant le show. Affiches de «flops» (échecs commerciaux) au mur. Meatloaf (pain de viande) ou burger + un verre de rouge, 1h pour manger et partir. Tous les serveurs sont aussi acteurs ; demandez «what have you been in» et vous aurez des réponses surprenantes — votre serveur est peut-être la prochaine étoile de Broadway.",
            estimatedCost: "~45 € par personne",
            bookingTip: "Réservez 18h pile — ils tournent les tables pour les 20h curtain.",
            transitFromPrev: "Ligne A environ 15 min",
          },
          {
            name: "Spectacle Broadway",
            area: "Theater District",
            duration: "2h30",
            description:
              "Vraie soirée Broadway. App TodayTix ou booth TKTS Times Square (15h ouverture) pour places à moitié prix le jour J. Récents long runners : Hamilton (histoire hip-hop de la fondation des USA), Roi Lion (40+ ans), Wicked, Book of Mormon. Hamilton aux balcons à 75 € sera 2h inoubliables.",
            estimatedCost: "Show + place ~75-225 €/personne",
            bookingTip: "TKTS booth : 14h45 pour voir la liste avant la queue. Ou TodayTix app plus pratique.",
            transitFromPrev: "5 min à pied au théâtre",
          },
        ],
      },
      {
        theme: "Upper East + au revoir",
        summary: "Le Met, tour du réservoir de Central Park, dernière part de pizza parfaite, puis JFK.",
        stops: [
          {
            name: "Metropolitan Museum of Art (Le Met)",
            area: "Upper East Side",
            address: "1000 5th Ave",
            duration: "3h",
            description:
              "3h c'est à peine assez. Concentrez : aile égyptienne (RDC), peintures européennes 1200-1800 (2e étage, salles 611-644), atrium American Wing. Temple de Dendur — un temple égyptien complet de 2000 ans transposé dans un hall, à travers la baie vitrée vue sur Central Park, lumière sur la pierre = le moment le plus beau du musée. Le Costume Institute avec son Met Gala chaque mai expose le thème jusqu'au mai suivant — vous tomberez peut-être sur une robe spectaculaire de Lady Gaga.",
            estimatedCost: "~28 € (prix fixe touristes)",
            bookingTip: "En ligne pour éviter la queue. À 10h ouverture, l'aile égyptienne est presque privée.",
            transitFromPrev: "Ligne 6 86th St + 10 min à pied, environ 25 min depuis l'hôtel",
          },
          {
            name: "Tour du réservoir de Central Park",
            area: "Upper East Side",
            duration: "45 min",
            description:
              "Boucle de course de 1,58 mile baptisée par Jacqueline Kennedy — elle courait ici presque chaque jour de son vivant. Au sud, skyline Midtown ; à l'ouest, immeubles haut de gamme Upper West Side. Par temps clair, vous voyez simultanément Empire State, Chrysler Building, Rockefeller Center, et au loin 1 World Trade Center. Début novembre, les arbres au nord du réservoir virent au rouge, vous êtes au cœur, Manhattan derrière vous.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Joe's Pizza (Times Square)",
            area: "Midtown",
            address: "1435 Broadway",
            duration: "20 min",
            description:
              "$3.50 la part nature (3,30 €), à emporter. C'est l'expérience New York — pliez en 2, mangez en marchant. Préparez une serviette pour la graisse. Joe's est le berceau de Greenwich Village depuis 1975, Spider-Man dans le film de 2002 achète sa pizza chez Joe's avant de courir après le métro. La filiale Times Square ouvre 11h-4h — c'est la dernière part parfaite de New York.",
            estimatedCost: "~5 €",
            transitFromPrev: "Ligne 1 86th → Times Sq, environ 15 min",
          },
          {
            name: "Strand Bookstore",
            area: "Union Square",
            address: "828 Broadway",
            duration: "1h",
            description:
              "Depuis 1927, 18 miles de rayonnages de livres. 2e étage photo de voyage, 3e étage livres rares. Halte du dernier jour — vous repartez avec quelque chose de mieux qu'un magnet. Le sac «I'd rather be reading» de Strand (5 €) est le souvenir new-yorkais le plus reconnaissable. Si vous êtes designer/écrivain, le rayon typographie du 2e a parfois des livres japonais épuisés à 80% moins cher qu'au Japon.",
            estimatedCost: "Achat moyen ~30 €",
            transitFromPrev: "Ligne N environ 10 min",
          },
          {
            name: "Magnolia Bakery (West Village originale)",
            area: "West Village",
            duration: "30 min",
            description:
              "La commande n'est pas le cupcake, c'est la banana pudding (pudding à la banane). Une petite tasse = la cerise sur le voyage. Magnolia est célèbre grâce à «Sex and the City», mais c'était les cupcakes — les vrais initiés prennent le pudding. La West Village originale depuis 1996, l'enseigne en cuivre verdie au coin de rue. Vous vous asseyez dehors sur le banc, le vent de Bleecker Street vous porte, c'est le moment idéal pour dire au revoir à New York.",
            estimatedCost: "~7 €",
            transitFromPrev: "15 min à pied",
          },
          {
            name: "Retour JFK (LIRR)",
            area: "Grand Central → JFK",
            duration: "55 min",
            description:
              "À pied ou ligne 6 jusqu'à Grand Central. LIRR jusqu'à Jamaica, AirTrain jusqu'au terminal. International 2h de marge, domestique 90 min. La LIRR traverse le Queens, vous voyez par la fenêtre la sphère «Unisphere» laissée par l'Expo de 1964. Dernier regard sur la skyline de Manhattan dans les dernières secondes avant la sortie du métro.",
            estimatedCost: "~14 €",
            transitFromPrev: "Métro jusqu'à Grand Central, environ 10 min",
          },
        ],
      },
    ],
    packingTips: [
      "Chaussures de marche confortables — 15 000+ pas par jour",
      "Parapluie portatif — la pluie de NYC est soudaine",
      "Veste légère même l'été (clim du métro polaire)",
      "Gourde — l'eau du robinet de NYC est propre, recharge gratuite partout",
      "Petits dollars (1, 5 $) — pourboires (café, bar, hôtel), métro non mais taxi oui",
      "Batterie externe — Google Maps + Uber dévorent la batterie rapidement",
    ],
    budgetEstimate: "Couple hors hôtel : 200-300 €/jour (NYC est cher — 2 repas assis + entrées inclus)",
    generalTips: [
      "Carte MetroCard 7 jours illimitée (32 €) — rentable à partir de 12 trajets",
      "Uber/Lyft à Manhattan souvent plus lent que le métro — embouteillages",
      "Hot dogs des stands de rue (3 €) sans souci, 150 ans d'histoire",
      "Pourboire 18-22% au restaurant assis. Bar 1 $/verre. Hôtel 1 $/bagage. Taxi 15-20%.",
      "App Citymapper plus précise que Google Maps pour les transports new-yorkais",
      "Le coucher de soleil au sud de Central Park est le plus romantique des spots gratuits — au-delà des musées",
    ],
  },
};

export default fr;
