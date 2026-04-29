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

  "bali-5d-couple": {
    tagline: "Cinq jours en couple — rizières d'Ubud, plage de Seminyak, coucher de soleil à Uluwatu.",
    audience: "Couple · Détente · Milieu de gamme",
    destination: "Bali",
    destinationCountry: "Indonésie",
    overview:
      "Cinq jours sur deux bases — 2 nuits à Ubud pour les rizières et le yoga en vallée fluviale, 3 nuits à Seminyak pour la plage et les dîners au coucher du soleil. Une excursion à Uluwatu pour le temple du falaise. Rythme pour un couple qui veut autant de repos que de tourisme. L'essence de Bali n'est pas les monuments mais «la densité du temps» — entre le yoga de 7h du matin et le dîner aux chandelles de 21h, il y a de longues plages où regarder un arbre, regarder la mer, ou ne rien faire — c'est ce que Bali vend vraiment.",
    bestSeasonNote:
      "Mai, juin, septembre = zone douce — sec, peu humide, peu de monde. Évitez décembre-février (saison des pluies) et juillet-août (vacances européennes). Mars, le «Nyepi» (jour du silence) immobilise toute l'île 24h — vols arrêtés, magasins fermés, interdiction de sortir, lumières éteintes. C'est une expérience unique mais vérifiez la date 2 mois à l'avance. Fin octobre, la fête «Galungan» (jour férié hindou-balinais) couvre toutes les rues de «penjor» (mâts en bambou décorés) — magnifique mais la moitié des restaurants ferme.",
    currencyTip:
      "Roupie indonésienne (IDR). 15 000 IDR ≈ 1 €. Restaurants moyens-haut de gamme prennent la carte, warungs (petits restos) et marchés cash uniquement. ATM dans les konbini (Circle K, Indomaret) — les ATM de rue ont une histoire de skimming. Carte Wise / Curve = meilleurs taux. Les prix locaux sont incroyablement bas — nasi goreng 3 €, eau en bouteille 0,40 €, massage 1h 10 € à 6 personnes.",
    languageTip:
      "Bahasa Indonesia. «Terima kasih» (merci) universel. «Permisi» (excusez-moi), «Maaf» (désolé). Anglais fluent dans les zones touristiques, menus en anglais. Pack hors-ligne Google Translate avant le départ. Chauffeur Gojek/Grab qui ne parle pas anglais ? Tapez en français, il a Google Translate sur son téléphone.",
    emergencyNumber: "112 (toutes urgences), 118 (ambulance)",
    hotel: {
      name: "The Oberoi Beach Resort (Seminyak)",
      area: "Seminyak",
      address: "Jl. Kayu Aya, Seminyak 80361",
      rationale:
        "Seminyak est la base unique optimale pour un couple — bord de mer, dîner à pied, 40 min de l'aéroport. Oberoi est un resort historique de 50 ans avec plage privée, ambiance adulte (pas d'enfants, plus calme), villas à toit de chaume avec jardin privé. 3-5 nuits ici, 1-2 à Ubud (voir Day 1). Le spa Oberoi est l'un des premiers à avoir popularisé le massage balinais — la masseuse fondatrice Made Asu, encore active, propose son massage Lomi-Lomi signature sur réservation.",
      estimatedNightlyRate: "~220 €/nuit",
    },
    airportTransit: {
      method: "DPS → Ubud transfert privé",
      duration: "Environ 75 min",
      cost: "~25 € (aller simple)",
      instructions:
        "Aéroport Ngurah Rai (DPS), demandez à votre hôtel d'Ubud (Komaneka at Bisma est un excellent choix) un transfert — chauffeur avec votre nom à la sortie. Les taxis aéroport sont chers (>50 € à prix monopolistique) ; Gojek/Grab interdits dans la zone d'arrivée mais autorisés au départ (de l'hôtel à l'aéroport oui, l'inverse non). Tard le soir ou avec gros bagages, prenez «Blue Bird Taxi» — seul taxi compteur légal de Bali.",
    },
    days: [
      {
        theme: "Arrivée → Ubud",
        summary: "Atterrissage, voiture privée vers Ubud, check-in en villa avec vue sur vallée, soirée douce pour effacer le décalage.",
        stops: [
          {
            name: "Aéroport DPS → Ubud",
            area: "Sud de Bali → Centre",
            duration: "1h30",
            description: "Le chauffeur attend à la sortie avec votre nom. Une fois passé Denpasar, la route vers le nord traverse rizières et petits temples hindous — l'air humide porte le parfum mêlé de frangipanier et de fumée de cuisine.",
            estimatedCost: "~25 €",
            transitFromPrev: "Arrivée",
          },
          {
            name: "Komaneka at Bisma (Ubud) — check-in",
            area: "Ubud",
            duration: "2h",
            description: "Posez les bagages, plongez dans la piscine à débordement suspendue au-dessus de la vallée du Tjampuhan — au premier saut, vous comprenez instantanément pourquoi Bali s'appelle «l'île des dieux». L'hôtel sert un «jamu» gratuit l'après-midi (curcuma + citron + miel, herbes locales) — antidote au jet lag. De la piscine, vous entendez les cloches du temple à 10 km.",
            estimatedCost: "Base Ubud ~180 €/nuit",
            transitFromPrev: "Dépose chauffeur",
          },
          {
            name: "Campuhan Ridge Walk",
            area: "Ubud",
            duration: "1h30",
            description: "Sentier en béton plat de 2 km sur la crête entre deux vallées fluviales — herbes hautes des deux côtés, rayon doré de l'après-midi sur les épis. Départ à l'hôtel Ibah, marchez jusqu'à Karsa Kafe boire une eau de coco (5 €) — Karsa est dans une cabane en chaume au cœur des rizières, vous voyez les paysans récolter. Retour par un autre sentier, total 30 min — la promenade «sans but» typique d'Ubud.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied depuis l'hôtel",
          },
          {
            name: "Mozaic Restaurant Gastronomique",
            area: "Sanggingan",
            address: "Jl. Raya Sanggingan",
            duration: "2h",
            description: "Menu dégustation technique française + ingrédients indonésiens dans une salle-jardin. Le «8-Course Discovery Menu» est l'incontournable — le chef cueille les ingrédients dans le jardin d'épices voisin, chaque plat associé à une épice indonésienne (curcuma, citronnelle, tamarin). En finale, le «Bali Coffee Soufflé», meilleur dessert d'Asie selon Asia 50 Best — café du plateau de Kintamani. Avec un brandy «Cap Tikus» local. Vous repartez en voulant acheter toutes les épices.",
            estimatedCost: "~95 € avec vin",
            bookingTip: "Réservez 1 semaine à l'avance sur le site. Fermé dimanche.",
            transitFromPrev: "Voiture Gojek, environ 10 min",
          },
        ],
      },
      {
        theme: "Ubud : rizières + temple + cascade",
        summary: "Journée complète — rizières au lever du soleil, temple d'eau sacrée, baignade en cascade, danse rituelle le soir.",
        stops: [
          {
            name: "Rizières Tegallalang (lever du soleil)",
            area: "Tegallalang",
            duration: "1h30",
            description: "Système d'irrigation balinais millénaire (subak) sculpté dans la colline. Arrivée 6h45 — la brume se lève à 7h30, les bus touristiques arrivent à 9h. Descendez dans les terrasses pour la photo, les paysans posent une couronne hindoue traditionnelle sur votre tête — pourboire 1 €. Le «Bali Swing» (4 €) — 1 seconde pour devenir star Instagram suspendu au-dessus des rizières.",
            estimatedCost: "Entrée ~2 € + balançoire ~3 €",
            transitFromPrev: "Voiture hôtel, environ 20 min",
          },
          {
            name: "Kawi Resto Rice Terrace",
            area: "Tegallalang",
            duration: "1h",
            description: "Petit-déjeuner avec vue sur les terrasses. Pisang Goreng (banane frite, 1,80 €) + Nasi Goreng + café balinais corsé. Lieu sans chichi, la vue est le plat principal. Le café Kawi vient des hauts plateaux Kintamani — Arabica avec sucre roux et lait de coco, on l'appelle «Bali Coffee», bien différent de l'espresso italien.",
            estimatedCost: "~12 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Pura Tirta Empul (temple d'eau sacrée)",
            area: "Tampaksiring",
            duration: "1h30",
            description: "Temple du Xe siècle où les Hindous balinais font le rituel de purification «Melukat» — vous entrez par étapes dans 11 bouches d'eau souterraine pour laver les karmas. Vous pouvez participer (location sarong + ceinture 3 € à l'entrée), passer dans chaque bouche dans l'ordre. Apportez des vêtements de rechange. Si une femme a ses règles, elle ne doit pas entrer dans l'eau. Pas loin, le «Gunung Kawi» — tombeaux khmers en grottes, vaut le coup, mais 600 marches à descendre.",
            estimatedCost: "Entrée ~3 € + sarong ~2 €",
            transitFromPrev: "Voiture, environ 25 min",
          },
          {
            name: "Warung Little Bird",
            area: "Centre Ubud",
            duration: "1h",
            description: "Petit warung qui sert le rijsttafel indonésien typique (Nasi Campur — assiette de riz avec 12 petits accompagnements) à moitié prix d'un resto touristique. Options végétariennes excellentes. Une assiette à 8 €, deux personnes rassasiées, avec smoothie banane (2 €) et dessert traditionnel «Klepon» (boules de riz au sucre de palme et noix de coco, 1 €).",
            estimatedCost: "~10 €",
            transitFromPrev: "Voiture, environ 35 min retour Ubud",
          },
          {
            name: "Cascade Tegenungan",
            area: "Kemenuh",
            duration: "2h",
            description: "150 marches descendent jusqu'à un large bassin. Maillot sous les vêtements, séchez-vous sur les rochers, remontez. Moment «reset» typique de Bali — sauter dans la cascade lave 6 mois de stress. À côté, le «D'Tukad River Club» (20 € entrée) — piscine à débordement au bord du précipice, spot Instagram.",
            estimatedCost: "Entrée ~1 €",
            transitFromPrev: "Voiture, environ 25 min sud",
          },
          {
            name: "Pura Dalem Ubud Kecak Fire Dance",
            area: "Ubud",
            duration: "1h30",
            description: "60 hommes en chœur racontent l'histoire du Râmâyana, climax avec danse du feu. Tous les soirs à 19h30. Premier rang utile seulement pour la photo, le son est excellent partout. Le chœur encercle en répétant «cak-cak-cak», créant une ambiance épique — vous oubliez que c'est pour les touristes, vous entrez vraiment dans la mythologie hindoue.",
            estimatedCost: "~8 €",
            bookingTip: "18h30 à la billetterie, presque jamais épuisé.",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "Ubud → Seminyak",
        summary: "Encore une matinée à Ubud puis transfert à Seminyak, mode plage.",
        stops: [
          {
            name: "Yoga matinal à The Yoga Barn",
            area: "Ubud",
            duration: "1h30",
            description: "Studio de yoga en bambou ouvert au-dessus des rizières. Cours hatha ou vinyasa drop-in, walk-in OK, tapis fournis. Même pour non-yogi, c'est «l'expérience signature d'Ubud» — à 7h du matin le soleil traverse le toit en bambou, brume au loin sur les rizières. C'est «l'early morning bliss» pur. Une séance 9 €. La moitié des profs sont des Occidentaux (NY, Londres) installés à Ubud, anglais sans souci.",
            estimatedCost: "~9 €",
            bookingTip: "Haute saison arrivez 20 min avant.",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Seniman Coffee Studio",
            area: "Centre Ubud",
            duration: "1h",
            description: "Café d'origine unique balinaise torréfié maison. Asseyez-vous sur la chaise suspendue, sirotez un V60, mangez un sandwich. Le grand-père du 3e wave coffee à Ubud. Le proprio australien est rentré il y a quelques années, mais le local qui a repris continue. Grain Kintamani 11 € le 250 g — souvenir parfait.",
            estimatedCost: "~9 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Conduite Ubud → Seminyak",
            area: "Centre → Sud",
            duration: "1h30",
            description: "Chauffeur réservé via Komaneka. Route sud passe Batubulan (village de sculpteurs sur pierre) et trafic Denpasar. Possibilité de pause au Alas Harum café (et un autre tour de balançoire). Le chauffeur attend généralement 45 min puis continue — pourboire 4 €.",
            estimatedCost: "~25 €",
            transitFromPrev: "10 min à pied retour à l'hôtel",
          },
          {
            name: "The Oberoi — check-in + plage",
            area: "Seminyak",
            duration: "3h",
            description: "Check-in, maillot, plage privée de l'hôtel. Les chaises longues Oberoi sont réservées aux clients, commandez nasi goreng + bière Bintang (35 €) en cabana sur le sable — son des vagues = BGM gratuite. La plage privée a un maître-nageur, eau sûre, baignade tranquille.",
            estimatedCost: "Déjeuner plage ~35 €",
            transitFromPrev: "Arrivée chauffeur",
          },
          {
            name: "Coucher de soleil à Double-Six Beach",
            area: "Seminyak",
            duration: "1h30",
            description: "Marchez vers le sud sur le sable depuis Oberoi. À Double-Six, attrapez un beanbag de bar de plage (les rayures pastel de La Plancha sont la formule Instagram), commandez un cocktail (15 €), regardez le soleil sombrer dans l'océan Indien. Mai-septembre, la «Ku De Ta» beach party reçoit des DJ en tournée mondiale — plus cher mais inoubliable.",
            estimatedCost: "Cocktail ~15 €",
            transitFromPrev: "15 min à pied le long de la plage",
          },
          {
            name: "Merah Putih",
            area: "Seminyak",
            address: "Jl. Petitenget",
            duration: "2h",
            description: "Salle bambou cathédrale haut de plafond. Cuisine indonésienne moderne du chef Made Suwarsa — Rendang à la peau croustillante, snapper grillé sambal matah. Premier dîner à Seminyak parfait. Avec vin rouge balinais «Hatten» (28 € la bouteille) — vins de plateau balinais, étonnamment bons. Le chef sort souvent saluer ses clients — détail qui vous fait sentir spécial.",
            estimatedCost: "~65 €/personne",
            bookingTip: "3-5 jours à l'avance sur le site, 19h30-20h30 prime time.",
            transitFromPrev: "Gojek, environ 5 min",
          },
        ],
      },
      {
        theme: "Excursion Uluwatu",
        summary: "Demi-journée péninsule Bukit — Padang Padang plage secrète, temple du falaise, danse du feu au coucher du soleil.",
        stops: [
          {
            name: "Conduite vers Uluwatu",
            area: "Seminyak → Bukit",
            duration: "1h",
            description: "Chauffeur à la journée 45 € pour 8h. La route descend par Jimbaran et monte sur la péninsule Bukit — joli paysage. Dites au chauffeur que vous faites le «Uluwatu Loop» — il connaît la route et les bons points d'arrêt. Il attend jusqu'au coucher du soleil puis vous ramène à Seminyak, pourboire 7 €.",
            estimatedCost: "Journée entière ~45 €",
            transitFromPrev: "Hôtel chauffeur",
          },
          {
            name: "Padang Padang Beach",
            area: "Uluwatu",
            duration: "2h",
            description: "Petit escalier étroit entre rochers, petite anse de sable blanc. Lieu de tournage final de «Mange Prie Aime» — Julia Roberts retrouve Javier Bardem ici. Baignade, location de chaise longue, nasi goreng au stand. Attention : vagues fortes, ne nagez pas trop loin si vous n'êtes pas confiant.",
            estimatedCost: "Entrée ~1 € + chaise ~3 €",
            transitFromPrev: "Chauffeur",
          },
          {
            name: "Single Fin (café surfeur falaise)",
            area: "Uluwatu",
            duration: "1h30",
            description: "Suspendu sur la falaise face à Uluwatu Point — vague gauche de classe mondiale juste sous vos pieds. Tostadas thon (20 €) + bière fraîche (5 €). Regardez les pros surfer des vagues de 2,5 m. Tous les dimanches après-midi, «Sunday Session» DJ jusqu'à 23h — surfeurs du monde entier se rassemblent, toute la plage danse.",
            estimatedCost: "~30 €",
            transitFromPrev: "Chauffeur, environ 15 min",
          },
          {
            name: "Pura Luhur Uluwatu (temple du falaise)",
            area: "Uluwatu",
            duration: "1h30",
            description: "Temple hindou du XIe siècle sur falaise de 70 m. Location sarong à l'entrée (incluse dans le ticket). Attention aux macaques — ils volent lunettes, casquettes. Si volé, le gardien échange contre une banane (prévoir 1 €). Suivez les sentiers de chaque côté, vue sur la péninsule Bukit ouest et l'océan Indien. Le temple est réservé aux Hindous, mais le sentier est l'attraction.",
            estimatedCost: "~4 €",
            transitFromPrev: "Voiture, 5 min",
          },
          {
            name: "Kecak Fire Dance au temple Uluwatu",
            area: "Uluwatu",
            duration: "1h",
            description: "Amphithéâtre sur falaise, soleil qui se couche derrière les performeurs au-dessus de l'océan. Différent de la version Ubud — celle-ci est la version coucher de soleil carte postale. Achetez le billet à l'arrivée. Au climax, un feu est allumé et le héros (Râma) traverse les flammes — choc visuel, choc sonore, mémoire à vie.",
            estimatedCost: "~10 €",
            transitFromPrev: "5 min à pied du temple",
          },
          {
            name: "BBQ fruits de mer à Jimbaran Bay",
            area: "Jimbaran",
            duration: "2h",
            description: "Choisissez un seafood warung sur la plage — Menega ou Intan Seafood sont sûrs. Tables sur le sable, achat au poids de snapper grillé / homard / crevettes, le coucher de soleil est passé mais le bruit des vagues suffit. Romantique au possible — clair de lune, vagues, fumée du grill. 3-4 plats + riz + boissons à 45 € par personne. Le dîner emblématique de Bali.",
            estimatedCost: "~45 €/personne",
            transitFromPrev: "Chauffeur, environ 25 min nord",
          },
        ],
      },
      {
        theme: "Dernier jour à Seminyak",
        summary: "Spa le matin, déjeuner dans les rizières de Canggu, dernier coucher de soleil, transfert tardif vers l'aéroport.",
        stops: [
          {
            name: "Bodyworks Spa",
            area: "Seminyak",
            address: "Jl. Kayu Jati",
            duration: "2h",
            description: "Massage balinais bien fait. Forfait 2h «Ritual» = massage + gommage + bain de fleurs. Moins cher que le spa de l'hôtel, meilleurs thérapeutes. Réservez Made Asu (la masseuse fondatrice — semi-retraitée mais vient parfois), son massage Lomi-Lomi est l'une des plus anciennes techniques d'Asie. L'huile essentielle «The Body Shop» peut être achetée séparément à emporter.",
            estimatedCost: "~55 €/personne",
            bookingTip: "Sur WhatsApp via le site 1 jour à l'avance.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "The Lawn Canggu",
            area: "Canggu",
            duration: "2h",
            description: "Restaurant + piscine + pelouse au bord de la mer. Bols poke, burgers, smoothies. Le déjeuner dont vous parlerez en rentrant. Canggu est devenu la «capitale des nomades digitaux» de Bali ces dernières années — la table à côté de vous accueille peut-être un programmeur de la Silicon Valley installé ici, ou un New-Yorkais qui a ouvert un café. L'air ambiant : «je suis en vacances mais ma vie est belle».",
            estimatedCost: "~35 €",
            transitFromPrev: "Voiture Gojek, environ 25 min nord",
          },
          {
            name: "Tanah Lot Temple",
            area: "Tabanan",
            duration: "2h",
            description: "Temple du XVIe siècle sur rocher accessible à marée basse. Visez 17h-18h pour le coucher du soleil. Le temple lui-même n'est pas ouvert aux étrangers, mais la promenade falaise et la vue sont l'essentiel. À l'entrée, grotte du «serpent sacré» (1 € pour voir, le serpent est vrai mais apprivoisé) — censé porter chance. Au coucher du soleil c'est bondé, mais une autre plage à 200 m vers le nord = panorama 180° pour vous seuls.",
            estimatedCost: "~5 €",
            transitFromPrev: "Voiture, environ 30 min",
          },
          {
            name: "Sundara Beach Club (Four Seasons Jimbaran)",
            area: "Jimbaran",
            duration: "2h",
            description: "Dernier dîner. Long deck de piscine sur la plage, torches tiki au crépuscule, fruits de mer et cocktails. Cher, mais c'est le «dîner d'adieu». Réservez table devant la plage — le service Four Seasons est irréprochable. «Bali Tasting Menu» 90 €/personne avec spécialités locales — Babi Guling (cochon de lait grillé) + salade Lawar + Rendang. Avec «Ke Indonesia Tasting» pack cocktails — 5 mini-cocktails infusés à 5 épices indonésiennes.",
            estimatedCost: "~90 €/personne",
            bookingTip: "5-7 jours à l'avance sur le site, créneau 18h30 coucher de soleil.",
            transitFromPrev: "Voiture, environ 30 min sud",
          },
          {
            name: "Sundara → DPS aéroport",
            area: "Jimbaran → Aéroport",
            duration: "30 min",
            description: "Demandez au concierge Sundara de réserver. À cette heure, 30 min max jusqu'à l'aéroport. International, check-in 2h avant. Sur le trajet, le chauffeur met de la musique balinaise traditionnelle — gamelan percussif, votre cerveau rejoue les images des 5 derniers jours.",
            estimatedCost: "~15 €",
            transitFromPrev: "Voiture directement après le dîner",
          },
        ],
      },
    ],
    packingTips: [
      "Sarong (obligatoire dans les temples — sinon location à l'entrée)",
      "Crème solaire reef-safe (interdite par certaines plages indonésiennes)",
      "Imperméable léger même en saison sèche (averses fréquentes l'après-midi)",
      "Spray anti-moustique DEET (essentiel pour les soirées à Ubud)",
      "Tongs plage + une paire de sandales de marche pour les temples",
      "Sac étanche pour téléphone — pour les baignades en mer ou sous cascade",
      "Petite serviette de séchage rapide — moins encombrante qu'une serviette de bain",
    ],
    budgetEstimate: "Couple hors hôtel : 200-280 €/jour",
    generalTips: [
      "Téléchargez Gojek et Grab — taxis 24/7 en anglais, 1/4 du prix des chauffeurs de rue",
      "ATM uniquement dans Circle K ou en banque — skimming attesté sur les ATM de rue",
      "Eau en bouteille uniquement, glaçons des bons restos OK",
      "Pourboire 10% apprécié mais non obligatoire. Porteur 5 000-10 000 IDR par bagage",
      "Étiquette hindoue balinaise : ne marchez pas sur les Canang sari (petites offrandes en feuilles tressées sur le sol), ne passez pas devant les statues",
      "Quartier club (Kuta, Legian) la nuit, attention — vols à l'arraché en moto sur appareils photo en bandoulière occasionnels",
    ],
  },

  "taipei-3d-solo": {
    tagline: "Trois jours en solo — marchés de nuit, Taipei 101, journée des lanternes à Jiufen.",
    audience: "Solo · Économique",
    destination: "Taipei",
    destinationCountry: "Taïwan",
    overview:
      "Trois jours en solo à Taipei — la capitale asiatique la plus sous-estimée. Marchable, accueillante, obsédée par la nourriture. Ce plan tourne autour de trois axes : un marché de nuit chaque soir, une grande vue urbaine, et une excursion à Jiufen pour la maison de thé qui a inspiré «Le Voyage de Chihiro». Budget-friendly, la plupart des repas sous 9 €. La force de Taipei : «pas besoin de guide, tout est juste». Vous pouvez entrer les yeux fermés dans n'importe quelle gargote et ressortir satisfait — cette sécurité et ce confort sont uniques à Taipei.",
    bestSeasonNote:
      "Octobre-novembre et mars-avril sont les plus agréables. L'été (juin-septembre) chaud, humide, avec typhons ; l'hiver doux (~15°C) mais pluvieux. Fin mars, les cerisiers de Yangmingshan et Tamsui — pas inférieurs au Japon. 10 octobre «Double Dix» (Fête nationale), parade militaire et feux d'artifice devant le palais présidentiel. Évitez la semaine autour du Nouvel An lunaire (janvier-février) — beaucoup de restaurants ferment pour les fêtes familiales.",
    currencyTip:
      "Nouveau dollar taïwanais (NT$ ou TWD). 30 TWD ≈ 0,90 €. 7-Eleven et grands restaurants prennent la carte. Marchés de nuit cash uniquement. Procurez-vous une EasyCard en station de métro — transports + konbini. Cartes bancaires françaises passent en grands magasins et ATM, mais petits commerces restent en cash.",
    languageTip:
      "Mandarin standard. Métro et zones touristiques avec signalisation anglaise, marchés de nuit moins. Pointer du doigt résout tout. Un «Xièxiè» (merci) avec un léger hochement de tête est très apprécié — mais ne vous inclinez pas profondément, ce n'est pas la coutume taïwanaise.",
    emergencyNumber: "110 (police), 119 (secours/pompiers), 1990 (hotline tourisme anglais)",
    hotel: {
      name: "Ximen Citizen Hotel",
      area: "Ximending",
      address: "No. 77, Kunming St., Wanhua District",
      rationale:
        "Ximending est le Shibuya de Taipei — rue piétonne, jeune, ouvert jusqu'à 2h du matin. Citizen Hotel est un hôtel d'affaires solide à prix 3 étoiles, à 2 min à pied du métro depuis le lobby. 15 min en MRT pour atteindre n'importe quelle zone majeure. À côté, les «Ximen Cinemas» abritent la plus grande salle IMAX de Taipei — un film à 12 €, moitié prix qu'à Paris, vous pouvez tester l'expérience taïwanaise (à la fin du film, personne ne se lève avant la fin du générique). Cuisine et lave-linge gratuits par étage — sauveur des longs séjours.",
      estimatedNightlyRate: "~50 €/nuit",
    },
    airportTransit: {
      method: "MRT Taoyuan Airport Line (Express) → Gare de Taipei",
      duration: "Environ 45 min + 5 min métro",
      cost: "~5 €",
      instructions:
        "Aéroport Taoyuan (TPE), suivez les panneaux MRT vers la ligne violette express (2 stations) jusqu'à la gare de Taipei en 35 min. Changez sur la ligne bleue, 1 station jusqu'à Ximen. Au guichet de billetterie, achetez une EasyCard (caution NT$100) — utilisée pour tous les paiements pendant 3 jours. Tout est balisé en chinois + anglais, sans souci. Après 23h, la ligne aéroport s'arrête — taxi de Taoyuan vers le centre 35-50 €.",
    },
    days: [
      {
        theme: "Centre Taipei + premier marché de nuit",
        summary: "Temple Longshan, pèlerinage soupe nouilles bœuf, vue depuis le mont Xiangshan, dîner au marché Shilin.",
        stops: [
          {
            name: "Temple Longshan",
            area: "Wanhua",
            address: "No. 211, Guangzhou St., Wanhua District",
            duration: "1h",
            description:
              "Fondé en 1738, le temple le plus ancien et le plus atmosphérique de Taipei. Bouddhisme, taoïsme et religions populaires partagent le même autel — c'est l'épitomé du syncrétisme religieux taïwanais. Devant le hall principal, observez les locaux faire le «jiaobei» (divination par blocs de bois rouges en croissant) — deux faces visibles = «Sheng Bei» (le dieu approuve), une face une dos = «Xiao Bei» (le dieu rit, hésite), deux dos = «Wu Bei» (refus). Gratuit, ouvert dès 6h. Le «marché de nuit Huaxi» voisin (même quartier) est le quartier des serpents et massages depuis 100 ans, à voir le soir si vous êtes courageux — restos de soupe de serpent toujours là, vous voyez vraiment le serpent vivant être préparé.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Hôtel 5 min à pied",
          },
          {
            name: "Lin Dong Fang (soupe nouilles bœuf)",
            area: "Zhongshan",
            address: "No. 274, Bade Rd., Zhongshan District",
            duration: "1h",
            description:
              "Plat national taïwanais, institution depuis 40 ans. Commandez le bol «moitié tendons moitié muscle» — bouillon clair (qing tang) et bouillon brun (hong shao), les deux écoles d'un coup. Avant 11h15 pour éviter la queue de 30 min qui démarre à midi. Bouillon mijoté 12h sur os de bœuf, riche sans être gras — rien à voir avec la soupe à la chinoise du continent. Avec choucroute taïwanaise (renouvelable gratis) et huile pimentée à votre goût. 5 € le bol, vous chercherez votre prochain billet d'avion en sortant.",
            estimatedCost: "~5 €",
            transitFromPrev: "MRT bleue → rouge → Zhongxiao Fuxing, environ 15 min",
          },
          {
            name: "Eslite Xinyi (librairie + lifestyle)",
            area: "Xinyi",
            duration: "1h30",
            description:
              "Librairie flagship 24h, le salon culturel de Taipei. 6 étages de livres, papeterie, théières, vêtements, café. Le rayon voyage anglais au 3e est excellent — vous trouvez des Lonely Planet sur des destinations rares introuvables ailleurs. Le «Bookstore Forum» d'Eslite organise des conférences culturelles gratuites le week-end (en chinois). Le rayon papeterie — l'un des plus qualitatifs d'Asie : marque-pages, carnets, pinceaux à calligraphie, à ramener.",
            estimatedCost: "Avec un livre ~12 €",
            transitFromPrev: "MRT rouge → Xiangshan, environ 10 min",
          },
          {
            name: "Tour d'observation Taipei 101",
            area: "Xinyi",
            duration: "1h30",
            description:
              "Tour de 508 m, brièvement la plus haute du monde. L'observatoire intérieur 89e étage expose le «Tuned Mass Damper» — pendule de 660 tonnes qui stabilise l'immeuble pendant les typhons, vous pouvez monter le voir. La terrasse 91e étage en plein air est la vraie vue. Vers 17h = même billet pour jour + coucher de soleil + nuit. Le «Damper Baby» (peluche du pendule) est la mascotte du 91e étage — le Hello Kitty version Taipei à 7 € la peluche.",
            estimatedCost: "~17 €",
            bookingTip: "En ligne 1 jour à l'avance pour éviter la queue. Créneau coucher de soleil souvent épuisé.",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Randonnée Mont Xiangshan",
            area: "Xinyi",
            duration: "1h30",
            description:
              "20 min d'escaliers raides — l'angle le plus iconique pour Taipei 101. Le coucher de soleil ici est l'image emblématique de Taipei : la tour 101 dans le cadre du skyline Xinyi. Apportez de l'eau. Attention : escaliers glissants, baskets recommandées. Au sommet, 6 grands rochers, asseyez-vous sur les «6 Big Rocks» pour la photo de groupe (formule). À la descente, un sentier mène à la station MRT «Yongchun Xinyi» — évite les foules de l'aller.",
            estimatedCost: "Gratuit",
            transitFromPrev: "MRT Xiangshan jusqu'au début du sentier 10 min à pied",
          },
          {
            name: "Marché de nuit Shilin",
            area: "Shilin",
            duration: "2h",
            description:
              "Le plus grand marché de nuit de Taipei. Cibles : omelette aux huîtres (oa-jian, 2 €), tofu puant (osez !), à l'entrée le «steak flambé au chalumeau» (10 €, grillé devant vous sur une plaque qui crache des flammes), bubble tea, granité de mangue (4,50 €). La halle souterraine est plus propre, l'extérieur plus animé. Le «Hao Da Da Chicken» (escalope de poulet géante, 4 €, plus grosse que votre visage) est immanquable — à manger en marchant, c'est la règle du marché de nuit. Samedi soir, queue qui s'étend sur des kilomètres ; venez tôt (18h30) pour un rythme plus doux.",
            estimatedCost: "Plusieurs snacks ~16 €",
            transitFromPrev: "MRT rouge → Jiantan, environ 25 min",
          },
        ],
      },
      {
        theme: "Excursion : Jiufen + Shifen",
        summary: "Train le long de la côte vers les lanternes des maisons de thé de Jiufen, lanternes célestes à Shifen au retour.",
        stops: [
          {
            name: "Train TRA → Ruifang",
            area: "Gare Taipei → Ruifang",
            duration: "45 min",
            description:
              "À pied ou MRT jusqu'à la gare Taipei. Ticket de train régional taïwanais (TRA) jusqu'à Ruifang. Côté droit fenêtre — après les tunnels, vue sur la mer. En route, vous passez à Keelung (port industriel), avec ses gros cargos. Ticket à 2,50 €, pas besoin de réserver. Le train TRA est plus lent qu'un Shinkansen mais «authentique» — vous êtes assis avec des résidents, vendeurs ambulants passent avec des bento.",
            estimatedCost: "~2,50 €",
            transitFromPrev: "MRT jusqu'à la gare de Taipei, environ 5 min",
          },
          {
            name: "Vieille rue de Jiufen",
            area: "Jiufen",
            duration: "3h",
            description:
              "Ancien village minier d'or transformé en village touristique atmosphérique. Escaliers étroits en pierre, lanternes rouges suspendues, maisons de thé surplombant la mer. «A-Mei Tea House» (carrefour Shuqi Lu) — inspiration de la maison de thé de Yubaba dans «Le Voyage de Chihiro», angle Instagram canonique, queue de 40 min le week-end. «Sii Dcha» ou «Jiufen Tea House» plus calmes, vue similaire. Une théière de thé taïwanais d'altitude + en-cas (11 €) à la maison de thé est l'expérience à vivre — le patron vous explique le rituel du thé, vous regardez la brume monter de la vallée, le phare lointain s'allumer sur le Pacifique.",
            estimatedCost: "Thé ~11 €",
            bookingTip: "Choisissez un jour de semaine, évitez absolument le samedi — Jiufen est envahi par les bus touristiques.",
            transitFromPrev: "Bus 788 ou 1062 depuis Ruifang, environ 15 min",
          },
          {
            name: "A-Gan Yi (boules de taro)",
            area: "Jiufen",
            duration: "30 min",
            description:
              "Snack le plus célèbre de Jiufen — boules de taro et patate douce moelleuses dans une soupe aux haricots rouges. Soupe chaude en hiver, glace pilée en été. 2,50 € le bol. Cash uniquement. La maison d'A-Gan-Yi est tout en haut des escaliers — vous mangez et regardez la ligne mer-montagne de Jiufen, c'est l'observatoire gratuit à côté de A-Mei.",
            estimatedCost: "~2,50 €",
            transitFromPrev: "Vieille rue 2 min à pied",
          },
          {
            name: "Navette → Shifen",
            area: "Jiufen → Shifen",
            duration: "45 min",
            description:
              "Bus 788 retour à Ruifang, train TRA Pingxi line vers l'est jusqu'à Shifen. Ou shuttle direct (5 €). Le train est moins cher et la vue plus belle — la ligne traverse la vallée, on aperçoit déjà les lanternes célestes lâchées par d'autres aux gares précédentes. Cette ligne ouverte en 1929 était minière à l'origine, désormais c'est «la ligne romantique des lanternes» de Taïwan.",
            estimatedCost: "~3 €",
            transitFromPrev: "Bus retour Ruifang",
          },
          {
            name: "Lanternes célestes à Shifen",
            area: "Shifen",
            duration: "1h",
            description:
              "Achetez une lanterne en papier au stand près de la gare (5 €), écrivez vos vœux des 4 côtés au pinceau (chinois, anglais, alphabet OK), lancez-la sur les rails quand aucun train ne passe. Touristique, mais magique au crépuscule — des dizaines de lanternes qui montent dans la vallée éclairée par le couchant, la vôtre parmi elles. Choisissez la lanterne 4 couleurs (richesse, santé, amour, carrière) ou 5 couleurs (7 €). C'est une activité familiale taïwanaise — les enfants à côté de vous écrivent «premier de la classe», vous écrivez «revenir l'an prochain».",
            estimatedCost: "~5 €",
            transitFromPrev: "Gare Shifen à pied",
          },
          {
            name: "Cascade de Shifen",
            area: "Shifen",
            duration: "1h",
            description:
              "20 m de large, style Niagara. À pied 10 min depuis la zone des lanternes par un pont piéton. Plate-forme d'observation devant la cascade — en saison des pluies, brume qui monte de la cascade forme des arcs-en-ciel au coucher du soleil. L'école primaire de Shifen est juste à côté — vous entendez la cloche, c'est un vrai village de montagne, pas un décor touristique.",
            estimatedCost: "Gratuit",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Marché de nuit Raohe",
            area: "Songshan",
            duration: "1h30",
            description:
              "Plus petit que Shilin, plus concentré — à l'entrée, «hujiao bing» (galette au poivre, cuite dans un four de terre, 2,50 €, vaut les 15 min de queue), soupe de côtes médicinale (4 €), une seule rue de 600 m, vous voyez tout. Le marché Raohe est «la meilleure de Taipei» selon les locaux, moins touristifié que Shilin. Pour la photo, l'arche de Raohe est le meilleur premier plan — l'enseigne néon arc-en-ciel «Raohe Night Market» brille dans la nuit.",
            estimatedCost: "~10 €",
            transitFromPrev: "Train → gare Songshan, total 1h",
          },
        ],
      },
      {
        theme: "Mémorial Tchang Kaï-chek + Yongkang + Dadaocheng",
        summary: "Mémorial, rue des foodies, le quartier le plus préservé de Taipei. Encore un xiao long bao avant l'aéroport.",
        stops: [
          {
            name: "Mémorial Tchang Kaï-chek",
            area: "Zhongzheng",
            duration: "1h30",
            description:
              "Statue en bronze de 6,3 m de Tchang Kaï-chek dans un mémorial en marbre blanc. Toutes les heures pile, «cérémonie de relève des gardes» — 5 gardes en pas lents, rotations de fusil, marches, ordres criés, 15 min de cérémonie. Photo OK après (ne touchez pas les gardes). Devant le mémorial, vue lointaine sur Taipei 101 — contraste histoire-modernité. Au sous-sol du musée, voiture de Tchang Kaï-chek (Cadillac américaine des années 50), documents personnels, gratuit.",
            estimatedCost: "Gratuit",
            transitFromPrev: "MRT rouge → CKS Memorial Hall, environ 10 min",
          },
          {
            name: "Din Tai Fung (Yongkang flagship)",
            area: "Yongkang",
            address: "No. 194, Xinyi Rd. Sec. 2",
            duration: "1h",
            description:
              "Flagship 1972 de l'empire xiao long bao étoilé Michelin. Chaque xiao long bao a 18 plis — c'est le standard Din Tai Fung. Commandez xiao long bao (10 € les 10) + poulet ivre (8 €) + nouilles bœuf braisé (14 €) + xiao long bao chocolat dessert (6 €, étonnamment bon). Avant 11h15, vous entrez avant la ruée de 11h45. Pas de réservation pour moins de 4 personnes — en solo, attendez 10-15 min, la file avance vite. Bouquinerie à côté pour patienter.",
            estimatedCost: "~32 €",
            bookingTip: "Avant 11h15, vous entrez avant la ruée de 11h45. Pas de réservation pour moins de 4 personnes — en solo, attendez 10-15 min, la file avance vite.",
            transitFromPrev: "CKS 15 min à pied",
          },
          {
            name: "Promenade rue Yongkang",
            area: "Da'an",
            duration: "1h",
            description:
              "La rue à pied la plus agréable pour le foodie + shopping de Taipei. Smoothies, granités de mangue, cafés, boutiques. De Din Tai Fung à la station MRT en lèche-vitrine. «ICE MONSTER» granité de mangue (10 €) immanquable — mangue Aiwen taïwanaise (de saison mai-septembre), pudding par-dessus, haricots rouges en dessous, parfum de mangue si intense que vous oubliez tous les autres granités. «Lai Hao» est une boutique design taïwanaise — bijoux, foulards, petits cuirs, parfaits cadeaux à ramener.",
            estimatedCost: "Une coupe ~6 €",
            transitFromPrev: "À pied",
          },
          {
            name: "Vieille rue Dadaocheng (rue Dihua)",
            area: "Datong",
            duration: "1h30",
            description:
              "Le quartier ancien le plus préservé de Taipei — boutiques à façade baroque de la fin de la dynastie Qing vendant épices séchées, thé, plantes médicinales, tissus. «Temple Xiahai City God» pour demander un fil rouge à Yue Lao (vieux dieu de l'amour, 1 € le fil), considéré comme le Yue Lao le plus efficace de Taïwan — vous voyez des étrangères en file. «ASW Tea House» au 1er étage est le meilleur bubble tea du vieux Dadaocheng — vue sur les baies vitrées du quartier ancien. Achetez un sachet de gâteaux «Pingan Gui» de Lit Tin Hsiang.",
            estimatedCost: "~6 €",
            transitFromPrev: "MRT verte → rouge → Daqiaotou, environ 15 min",
          },
          {
            name: "Fuhang Soy Milk",
            area: "Zhongzheng",
            duration: "45 min",
            description:
              "Institution du petit-déj avec queue jusqu'à 10h chaque matin. Si vous y allez tard, essayez la branche ouverte l'après-midi proche. Lait de soja salé chaud + youtiao (beignet de pâte) + dan bing (crêpe à l'œuf) — trio classique du petit-déj taïwanais. Lait de soja salé 1,40 € le bol — différent de la version sucrée de Chine continentale, avec algue, échalotes frites, crevette séchée, sauce soja, huile de sésame. Le parc culturel «Huashan 1914» tout proche peut prolonger la balade.",
            estimatedCost: "~5 €",
            transitFromPrev: "MRT orange, environ 20 min",
          },
          {
            name: "Parc Da'an Forest",
            area: "Da'an",
            duration: "45 min",
            description:
              "Le Central Park de Taipei. Pause avant l'aéroport — étang à tortues, piste de jogging, skyline urbain au-dessus des arbres. Achetez un thé d'herbes (qingcao cha) au stand du parc (3 €), asseyez-vous sur un banc, écoutez les cigales. Le week-end, «Da'an Forest Farmers Market» — produits bio taïwanais, achetez thé taïwanais, fruits secs, miel à ramener.",
            estimatedCost: "~3 €",
            transitFromPrev: "MRT rouge → Da'an Forest Park, environ 15 min",
          },
          {
            name: "Retour aéroport Taoyuan",
            area: "Da'an → TPE",
            duration: "55 min",
            description:
              "MRT rouge jusqu'à la gare Taipei, change pour la ligne aéroport express. International 2h de marge, suffisant — sécurité Taoyuan rapide. Sur la ligne aéroport, vous repensez à ces 3 jours : feux d'artifice du marché de nuit, parfum du thé à Jiufen, douceur de la rue Yongkang, salé de Fuhang. Taipei en 3 jours fait de vous un «je veux revenir une 2e fois». La prochaine fois Hualien, Kenting, Taichung.",
            estimatedCost: "~5 €",
            transitFromPrev: "MRT",
          },
        ],
      },
    ],
    packingTips: [
      "Parapluie portatif — la pluie taipeïe est soudaine toute l'année",
      "Petit porte-monnaie cash — la plupart des stands de marché de nuit ne prennent pas la carte",
      "Pansements anti-ampoules — 15 000+ pas par jour, ampoules garanties",
      "Petit éventail été — l'humidité est carrément étouffante",
      "Veste chaude (hiver) — Taipei en hiver est doux mais l'intérieur n'est pas chauffé, vous aurez froid après la douche",
      "Petits cadeaux pour hôte Airbnb — les Taïwanais valorisent les petites attentions, ça change l'accueil",
    ],
    budgetEstimate: "Hors hôtel : 50-70 €/jour",
    generalTips: [
      "EasyCard dès l'arrivée — MRT, bus, YouBike, konbini tout en un",
      "Manger interdit dans le MRT — amende NT$1500-7500. Eau interdite aussi.",
      "Pas de pourboire. Restos haut de gamme ajoutent 10% service",
      "7-Eleven et FamilyMart sont vos amis — ATM, SIM, factures, ramen 2h du matin",
      "Google Maps suffit, mais Citymapper plus précis — téléchargez à l'avance",
      "Apple Pay arrive lentement à Taïwan, beaucoup de petits commerces restent en cash ou cartes locales",
    ],
  },

  "hanoi-4d-solo": {
    tagline: "Quatre jours en solo — pho dans le vieux quartier et excursion à la baie d'Halong.",
    audience: "Solo · Économique",
    destination: "Hanoï",
    destinationCountry: "Vietnam",
    overview:
      "Quatre jours en solo à Hanoï — l'une des villes asiatiques les plus pleines de caractère. Chaos des scooters, pho à 1 € à l'aube, pagodes millénaires, et une seule «folie» : excursion à la baie d'Halong. Budget-friendly, vous tenez 3 repas en 10 €. La force d'Hanoï : «non packagée». La plupart des petites rues sont encore aux locaux, pas aux Airbnb. Vous êtes assis sur un tabouret en plastique à boire un café, à côté de vous une grand-mère vietnamienne vend du pho, des écoliers passent à vélo — la vraie vie de rue, déjà disparue à Bangkok ou Singapour.",
    bestSeasonNote:
      "Octobre-avril : saison sèche d'Hanoï, températures agréables. Mai-septembre : saison de mousson, pluies orageuses fréquentes l'après-midi mais on circule. Tết (Nouvel An lunaire, janvier-février) : beaucoup de restos ferment, à éviter. Septembre-octobre : automne le plus beau d'Hanoï — feuilles jaunes, air sec, ginkgos jaunes au bord du lac. La fin d'année a une ambiance de Noël prononcée — héritage de la période française, les églises catholiques se décorent.",
    currencyTip:
      "Dong vietnamien (VND). 24 000 VND ≈ 1 €. Hôtels et restos touristiques prennent la carte ; street food et restos locaux cash uniquement. Petites coupures (10k, 20k, 50k) en or — 0,40 €, 0,80 €, 2 €. Au distributeur de l'aéroport, retirez 1-2 millions de dongs (40-80 €). BIDV et Vietcombank sont les grandes banques locales, leurs ATM sont les plus fiables.",
    languageTip:
      "Vietnamien. «Cảm ơn» (merci) universel. Anglais limité hors hôtel, mais zones touristiques OK. Pack hors-ligne Google Translate vietnamien indispensable. Le plus simple = doigt + sourire — les Vietnamiens sont extrêmement amicaux, perdu, en 10 secondes quelqu'un vient vous aider.",
    emergencyNumber: "113 (police), 115 (ambulance), 114 (pompiers), 113 ou 114 (hotline anglaise)",
    hotel: {
      name: "Hanoi La Siesta Classic Ma May",
      area: "Vieux Quartier (36 rues anciennes)",
      address: "94 Ma May St., Hoan Kiem District",
      rationale:
        "La rue Ma May est le cœur du Vieux Quartier — tous les stands de pho, les bia hoi (bières de rue), le marché nocturne du week-end sont à 5 min à pied. La Siesta est un petit hôtel boutique, service fiable, bar de toit pour le coucher du soleil, meilleur petit-déj-buffet du rapport qualité-prix. Le personnel parle anglais, chaleureux, vous donne une carte touristique dessinée à la main — votre première étape commence par leur recommandation, sans risque. Au cœur du Vieux Quartier, vous sortez à gauche et c'est déjà une petite ruelle, pas besoin de marcher loin.",
      estimatedNightlyRate: "~75 €/nuit",
    },
    airportTransit: {
      method: "Transfert hôtel ou bus aéroport 86",
      duration: "Transfert ~45 min / Bus ~60 min",
      cost: "Privé ~15 € / Bus ~1,50 €",
      instructions:
        "Aéroport international Noi Bai (HAN), le plus simple = transfert hôtel — chauffeur attend avec votre nom à la sortie. Option éco : bus aéroport 86 toutes les 20 min jusqu'au lac Hoan Kiem (~1h, 35 000 dongs). Au comptoir taxi, Grab/taxi ~20-25 €. Ne montez jamais dans un «taxi privé» qui vous aborde à la porte de l'aéroport — arnaque garantie à 99% : ils chargent 3× le prix, changent de voiture à mi-chemin pour facturer plus.",
    },
    days: [
      {
        theme: "Initiation au Vieux Quartier",
        summary: "Check-in, balade dans les 36 rues anciennes, théâtre de marionnettes sur l'eau, bia hoi la moins chère d'Asie.",
        stops: [
          {
            name: "La Siesta check-in + toit",
            area: "Vieux Quartier",
            duration: "1h",
            description:
              "Posez les bagages, douche, montez sur le toit. Une bière fraîche Saigon (2,50 €) avec la vue 360° sur les toits en tuiles rouges du Vieux Quartier — vous trouvez instantanément vos repères. Du toit, vous entendez la symphonie de klaxons des scooters — Hanoï a 3 millions de scooters par jour sur les routes, c'est la BO de la ville. La Siesta sert un thé d'après-midi gratuit 12-14h — rouleaux de printemps + café filtre, vous restez 1h à rêvasser.",
            estimatedCost: "Bière ~2,50 €",
            transitFromPrev: "Depuis l'aéroport",
          },
          {
            name: "Lac Hoan Kiem + temple Ngoc Son",
            area: "Hoan Kiem",
            duration: "1h30",
            description:
              "Le cœur d'Hanoï. Tour du lac dans le sens antihoraire, traversez le pont rouge «The Huc» jusqu'à l'îlot du temple Ngoc Son. Le pont «The Huc» est un monument carte postale d'Hanoï — bois laqué rouge contre eau verte. Le temple abrite une tortue empaillée de plus de 1 000 kg — légende du XVe siècle où une tortue sacrée du lac aurait pris l'épée du roi (d'où «épée restituée»), le spécimen de 1968 est le dernier connu. À 5-6h du matin, vieux qui font tai-chi, jeunes qui courent, étudiants qui lisent sur les bancs — le matin le plus pur de la ville.",
            estimatedCost: "Temple ~1 €",
            transitFromPrev: "Hôtel 5 min à pied",
          },
          {
            name: "36 rues anciennes",
            area: "Vieux Quartier",
            duration: "1h",
            description:
              "Les 36 rues du Vieux Quartier portent chacune le nom du produit historiquement vendu — Hang Bac (rue de l'argent), Hang Gai (soie), Hang Ma (papier votif), Hang Thiec (étain). Du lac, partez vers le nord par Hang Dao, tournez dans 4-5 rues, voyez ce qui survit. Hang Bac compte encore 30+ ateliers d'orfèvrerie, prix 1/3 de Paris. Hang Quat est tout en lanternes en soie rouge vietnamiennes (5 € à suspendre chez soi). Hang Gai abrite la boutique de la designer internationale Tia Le, robe traditionnelle ao dai sur mesure en 3 jours — prix 1/4 de Paris.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Inclus",
          },
          {
            name: "Théâtre de marionnettes sur l'eau Thang Long",
            area: "Hoan Kiem",
            address: "57B Dinh Tien Hoang",
            duration: "1h",
            description:
              "Art vietnamien du XIe siècle — marionnettes qui dansent sur scène d'eau jusqu'à la taille, manipulées par des perches derrière un rideau de bambou. Narration en vietnamien, mais la comédie visuelle a sa propre traduction. 50 min de spectacle + musique traditionnelle live (mono-corde, lune-lyre, flûtes). 10 saynètes : «Dragon-phénix», «Pêche», «Danse du feu»... 3-5 min chacune, rythme soutenu, pas de somnolence. Choisissez votre place dans la salle — rangs 3-5 au centre = optimal.",
            estimatedCost: "~4 €",
            bookingTip: "Achetez 30 min avant à la billetterie — les sessions 18h30 et 20h se remplissent en haute saison.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Bun Cha Ta",
            area: "Vieux Quartier",
            address: "21 Nguyen Huu Huan",
            duration: "1h",
            description:
              "Le plat signature d'Hanoï — boulettes de porc grillées trempées dans une sauce sucrée-salée, avec vermicelles et grosse pile d'herbes fraîches. Bun Cha Ta a la meilleure ambiance (vieille cour intérieure), la qualité ne baisse pas depuis le passage d'Obama et Anthony Bourdain en 2016. Combo Set (6 €) : bun cha + rouleaux frits + tisane locale. Au moment de commander, n'oubliez pas le mix «Bun» (vermicelles) + «Cha Ca» (poisson grillé) + «Nem» (rouleaux frits) — 3 saveurs en une.",
            estimatedCost: "~6 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Coin Bia Hoi (Ta Hien + Luong Ngoc Quyen)",
            area: "Vieux Quartier",
            duration: "1h",
            description:
              "Asseyez-vous sur les petits tabourets rouges en plastique au coin de rue le plus célèbre d'Hanoï. La bia hoi à 5 000 dongs (0,20 €) est de la bière brassée le matin — sans conservateurs, doit être bue le jour même. Cacahuètes gratuites. Pas un bar concept, vraie nightlife de rue. Vous vous asseyez 5 min, l'Allemand à côté de vous engage la conversation. 3 bia hoi (0,60 €) + une part de poisson frit (1,50 €), puis vous partez — c'est l'essence de la nuit hanoïenne.",
            estimatedCost: "~3 €",
            transitFromPrev: "3 min à pied",
          },
        ],
      },
      {
        theme: "Excursion baie d'Halong",
        summary: "L'unique luxe du voyage — journée entière de croisière entre 1 600 îles karstiques. Grottes, kayak, déjeuner fruits de mer.",
        stops: [
          {
            name: "Navette → Halong",
            area: "Vieux Quartier → Halong",
            duration: "3h",
            description:
              "Croisière réservée vous prend dans les grands hôtels du Vieux Quartier vers 7h30-8h. Choisissez un opérateur croisière journée milieu de gamme (Bhaya, Indochina Junk, Paradise) — 35-65 €. 3h de route à l'est, une pause toilettes. Le chauffeur passe de la musique vietnamienne ou Spotify vietnamien — vous entendez les rythmes locaux, c'est la conversion culturelle.",
            estimatedCost: "Compris dans la croisière",
            transitFromPrev: "Hôtel pickup",
          },
          {
            name: "Croisière baie d'Halong",
            area: "Baie d'Halong",
            duration: "5h",
            description:
              "Embarquement sur jonque traditionnelle, navigation entre îles karstiques sur eau émeraude. Programme classique : déjeuner sur le bateau (multiples plats de fruits de mer — crabes, crevettes, calamars, 6-8 produits locaux) ; kayak 45 min dans une lagune cachée ; visite grotte Sung Sot (Surprise) ou Thien Cung (Palais Céleste) ; baignade depuis le pont. Maître-nageur sur le bateau, eaux sûres. Vers 15-16h, «la montée du soleil» — phénomène lumineux unique à Halong.",
            estimatedCost: "Croisière journée moyenne ~60 €",
            bookingTip: "Réservez avec une agence sérieuse (Flamingo Travel, Threeland Travel) ; évitez les croisières low-cost à 20 € — sécurité des bateaux médiocre, accidents occasionnels.",
            transitFromPrev: "Embarquement au port",
          },
          {
            name: "Retour à Hanoï",
            area: "Halong → Vieux Quartier",
            duration: "3h",
            description:
              "Bus retour avec une pause. Arrivée hôtel 19h-19h30. Longue journée — récompensez-vous par un dîner tranquille proche de l'hôtel. Le chauffeur met une musique douce 15 min après le départ — vous vous endormez, ça suffit pour récupérer.",
            estimatedCost: "Compris",
            transitFromPrev: "Départ du port",
          },
          {
            name: "Cha Ca La Vong (poisson au curcuma)",
            area: "Vieux Quartier",
            address: "14 Cha Ca St.",
            duration: "1h",
            description:
              "Restaurant à plat unique depuis 1871 — poisson-chat mariné au curcuma sauté à table sur un brasier en terre cuite avec aneth et oignons verts, servi avec vermicelles, cacahuètes, sauce nuoc cham. Une seule chose au menu. Plus cher que la street food mais vaut le coup — c'est la «délicatesse concentrée» vietnamienne. 13 € par personne, partagé à 2-3.",
            estimatedCost: "~13 €",
            transitFromPrev: "Hôtel 10 min à pied",
          },
        ],
      },
      {
        theme: "Hanoï impérial",
        summary: "Mausolée Hô Chi Minh, Temple de la Littérature, Train Street d'Hanoï, déjeuner au quartier français.",
        stops: [
          {
            name: "Pho Gia Truyen (Bat Dan) — pho du matin",
            area: "Vieux Quartier",
            address: "49 Bat Dan St.",
            duration: "45 min",
            description:
              "Selon les locaux, le meilleur pho bo (pho au bœuf) d'Hanoï. Faites la queue, commandez, payez, asseyez-vous — self-service. Slurpez bruyamment, ajoutez piment et citron. Ouvre 6h, ferme quand le bouillon est fini (vers 10h). Pho Gia Truyen utilise 30 kg d'os de bœuf mijotés 8h — bouillon clair et profond, contrairement au bouillon dense du sud chinois, plus proche d'un thé clair en couches. 3 € le bol. Vous ne choisissez pas le morceau — le maître donne le «combo signature» : tendons, jarret, tranches de bœuf cru ébouillantées dans la soupe.",
            estimatedCost: "~3 €",
            transitFromPrev: "Hôtel 7 min à pied",
          },
          {
            name: "Mausolée Hô Chi Minh",
            area: "Ba Dinh",
            duration: "1h30",
            description:
              "Le corps embaumé de «l'oncle Hô» dans un mausolée en granit — sur la place Ba Dinh où il a déclaré l'indépendance face à la France en 1945. Code vestimentaire strict (épaules + genoux couverts, shorts interdits). Silence à l'intérieur, photo interdite. Fermé lundi et vendredi. Derrière le mausolée, le «Musée Hô Chi Minh» — bâtiment moderniste construit avec l'aide soviétique, raconte le parcours d'Hô Chi Minh, des études en France à la direction de l'indépendance vietnamienne. Gratuit, 2h pour tout voir.",
            estimatedCost: "Gratuit",
            bookingTip: "9h pour arriver — file rapide tôt, 45 min d'attente après 10h30.",
            transitFromPrev: "Grab environ 15 min",
          },
          {
            name: "Temple de la Littérature (Van Mieu)",
            area: "Dong Da",
            duration: "1h30",
            description:
              "Première université du Vietnam, fondée en 1070. 5 cours, pavillons, étang à dragon sculpté, 82 stèles portant les noms des lauréats des concours impériaux 1442-1779 — chacune sur une tortue de pierre. Le coin le plus confucianiste d'Hanoï — incarne l'influence chinoise sur le Vietnam. Fin juin, baccalauréat vietnamien, les parents viennent brûler de l'encens pour leurs enfants. Regardez attentivement les noms — beaucoup sont encore portés au Vietnam aujourd'hui.",
            estimatedCost: "~1,50 €",
            transitFromPrev: "Grab environ 10 min",
          },
          {
            name: "Banh Mi 25",
            area: "Vieux Quartier",
            address: "25 Hang Ca",
            duration: "45 min",
            description:
              "Le meilleur banh mi d'Hanoï. Baguette croustillante, pâté, porc grillé, carottes-radis marinés, coriandre, piment. Commandez le «Banh Mi 25 Special» (toutes viandes) — 2 €. Mangez sur le tabouret en plastique en face. Le banh mi est une trace de l'époque coloniale française — le Vietnam a rendu la baguette française plus croustillante, moins chère, plus quotidienne qu'en France. Doux produit du métissage culturel.",
            estimatedCost: "~2 €",
            transitFromPrev: "Grab environ 15 min",
          },
          {
            name: "Train Street d'Hanoï",
            area: "Hoan Kiem",
            duration: "1h",
            description:
              "Ruelle résidentielle étroite avec un vrai train qui circule. Asseyez-vous dans un café ; à 15h20 ou 19h20, le train passe à 2 m de votre tasse de café. Accès via les cafés (50 000 dongs de couverture — frais gris pour autoriser le passage des touristes). Quand le train arrive, le café entier se fige — vous entendez le crissement métallique, sentez le sol vibrer, le train passe en grondant — expérience industrielle-résidentielle unique à Hanoï.",
            estimatedCost: "~2 €",
            bookingTip: "Horaires confirmés sur place — changent souvent. Les cafés vous le disent.",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "Opéra d'Hanoï + Quartier Français",
            area: "Quartier Français",
            duration: "1h",
            description:
              "Opéra néoclassique de 1911 imitant l'Opéra de Paris. Sans spectacle, intérieur fermé, mais marchez dans les rues du Quartier Français environnant (Trang Tien, Ngo Quyen) — villas années 1920 et larges boulevards, contraste colonial avec le chaos du Vieux Quartier. Le «Sofitel Legend Metropole» voisin est l'hôtel colonial français de 1901 — Lady Diana, Charlie Chaplin, des Premiers ministres français y ont logé. Lobby visitable ; le «Bamboo Bar» à côté sert un cocktail oriental (12 €), assis près de la fenêtre centenaire — l'après-midi le plus luxueux du Vietnam.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Grab environ 10 min",
          },
          {
            name: "Ngon Garden",
            area: "Quartier Français",
            address: "70 Nguyen Du",
            duration: "1h30",
            description:
              "Food court en jardin, 50+ plats régionaux vietnamiens. Mix de hors-d'œuvre, soupes, grillades, desserts. Touriste-friendly mais qualité solide. Bon pour le dîner d'adieu. Combo «Pho Cuon» (rouleaux de vermicelles) + «Cha Ca» + «Banh Xeo» (crêpe vietnamienne) + «Cafe Sua Da» (café glacé) à 18 € couvre Nord-Centre-Sud. Tables en plein air sous lanternes vietnamiennes suspendues, pont en bois sur petit ruisseau — scène la plus romantique pour un adieu hanoïen.",
            estimatedCost: "~18 €",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "Lac de l'Ouest + aéroport",
        summary: "Pagode Tran Quoc, matin au lac de l'Ouest, dernier café à l'œuf, transfert calme à l'aéroport.",
        stops: [
          {
            name: "Pagode Tran Quoc",
            area: "Lac de l'Ouest",
            address: "Thanh Nien Rd.",
            duration: "1h",
            description:
              "La plus ancienne pagode d'Hanoï (541). Stupa rouge et or sur petit îlot du lac de l'Ouest, relié par chaussée. Moines passent devant les statues de bodhisattvas. Étang à lotus en été — pic juillet-août, photos magnifiques. Stèle «Tran Quoc» (Protection du Pays) — origine du nom vietnamien.",
            estimatedCost: "Gratuit (offrande appréciée)",
            transitFromPrev: "Grab environ 15 min",
          },
          {
            name: "Café à l'œuf chez Giang Cafe",
            area: "Vieux Quartier",
            address: "39 Nguyen Huu Huan",
            duration: "45 min",
            description:
              "Hanoï a inventé le café à l'œuf en 1946 quand le lait manquait. Giang est tenu par la famille fondatrice — jaunes d'œufs battus avec lait condensé sucré, posés sur expresso brûlant. Goût de tiramisu liquide. Montez l'escalier étroit jusqu'au petit étage — la décoration n'a pas changé depuis 70 ans. Une tasse 1 €, en commander deux. Avec sandwich «baguette vietnamienne» (3 €) — beurre, jambon, concombre, simple combo.",
            estimatedCost: "~1 €",
            transitFromPrev: "Grab environ 10 min",
          },
          {
            name: "Marché Dong Xuan",
            area: "Vieux Quartier",
            duration: "1h",
            description:
              "Plus grand marché couvert d'Hanoï — 4 étages de vêtements, sacs, articles ménagers, contrefaçons, food court à l'arrière. Bonne adresse pour shopping de dernière minute (foulards en soie, café, thé au lotus). Marchandez 30-50% sous le premier prix annoncé. «Trung Nguyen» café moulu (4 € le sachet) — plus grande marque vietnamienne, plus puissant que l'indonésien. «Hoa Sen» thé au lotus (5 € le sachet) — thé vert fermenté dans une fleur de lotus, cadeau unique.",
            estimatedCost: "Quelques cadeaux ~12 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Bun Rieu (40 Hang Tre)",
            area: "Vieux Quartier",
            duration: "1h",
            description:
              "Dernier repas local — Bun Rieu, soupe de vermicelles tomate-crabe spécifique au Nord-Vietnam, garnie de porc et tofu frit. Cuisine de rue où l'on mange sur petit tabouret. La grand-mère qui mijote la soupe est là depuis 1988. 2,50 € le bol. Bouillon aux petites tomates locales — sucré-acide, complètement différent d'une soupe à la tomate occidentale. C'est la cuisine «familiale» vietnamienne, après laquelle vous pensez «moi aussi je veux vieillir comme ça».",
            estimatedCost: "~2,50 €",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Hôtel + récupération bagages",
            area: "Vieux Quartier",
            duration: "1h",
            description: "Retour hôtel, douche si besoin, bagages de la consigne. Réservation transfert aéroport.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Retour aéroport Noi Bai",
            area: "Vieux Quartier → HAN",
            duration: "45 min",
            description: "Transfert hôtel réservé. International, 3h de marge — sécurité Noi Bai lente. Duty free limité, mais la boîte cadeau «Trung Nguyen Coffee» (12 €) vaut le coup pour les amis. À l'aéroport, un «Pho 24» (chaîne de pho hanoïenne) — un dernier bol avant l'embarquement.",
            estimatedCost: "~15 €",
            transitFromPrev: "Transfert hôtel",
          },
        ],
      },
    ],
    packingTips: [
      "Sac bandoulière à fermeture éclair — les voleurs en scooter du Vieux Quartier arrachent les sacs lâches",
      "Pantalon long ou jupe pour temples/mausolée",
      "Gel hydroalcoolique — vous mangez souvent avec les mains",
      "Petit parapluie ou poncho — averses fréquentes même en saison sèche",
      "Ceinture porte-monnaie — ATM partout mais files longues",
      "Anti-diarrhéique — les épices vietnamiennes peuvent surprendre votre estomac, gardez-en au cas où",
      "Petits cadeaux pour amis locaux (chocolats français, parfum)— les Vietnamiens valorisent les petites attentions",
    ],
    budgetEstimate: "Hors hôtel : 30-50 €/jour (l'excursion baie d'Halong est le luxe — 60 € unique)",
    generalTips: [
      "Pour les taxis : utilisez Grab — prix fixe, transparent",
      "Ne montez jamais dans un taxi «Mai Linh» qui vous aborde dans la rue — fausse compagnie",
      "Traverser la rue : marchez lentement, à pas réguliers, les scooters vous évitent. Ne vous arrêtez jamais brusquement.",
      "Pourboire non obligatoire mais arrondi à la pièce apprécié",
      "SIM : à l'aéroport Viettel ou Vietnamobile eSIM (~7 € / 10 Go)",
      "Les heures de repas vietnamiennes diffèrent de la France — petit-déj 5h-9h (pho de rue), déj 12h-13h, dîner 18h-20h",
    ],
  },

  "london-4d-couple": {
    tagline: "Quatre jours en couple — British Museum, Borough Market, journée à Oxford.",
    audience: "Couple · Milieu de gamme",
    destination: "Londres",
    destinationCountry: "Royaume-Uni",
    overview:
      "Quatre jours pour le couple qui veut voir Londres sans «sensation de bus touristique». Matins dans les musées gratuits de niveau mondial, après-midis aux marchés et parcs royaux, une journée entière à Oxford. Hôtel choisi à Victoria — à pied du West End, Heathrow Express direct. La force de Londres : densité culturelle. British Museum, National Gallery, V&A, Tate Modern, tous gratuits — vous pouvez parcourir le condensé de la civilisation humaine en 3 jours. Ces 4 jours vous donnent envie d'y revenir plus longtemps — c'est la signature d'une «ville de culture».",
    bestSeasonNote:
      "Mai-début juin et septembre-début octobre : zone douce — climat tempéré, longues journées, foules tolérables. Juillet-août chaud et bondé, janvier le moins cher mais le plus sombre. Marchés de Noël (fin novembre-fin décembre) à Hyde Park Winter Wonderland, Covent Garden, Southbank Centre — Londres au plus festif. Feu d'artifice du Nouvel An sur la Tamise (gratuit, billet à réserver) parmi les plus grands d'Europe.",
    currencyTip:
      "Livre sterling (GBP). Carte et sans contact partout — 4 jours sans cash possibles. Tap sur tourniquet du métro, plafond journalier (~10 €) auto-activé. Cartes Visa/Mastercard françaises passent à 90% des endroits. Avant le départ, carte Wise ou Curve = taux 3-5% meilleur que les cartes bancaires françaises classiques.",
    languageTip:
      "Anglais britannique. «Ta» = merci, «cheers» = merci+au revoir, «sorted» = réglé. Pour commander au pub — directement au comptoir, pas attendre le service à table. Métro accent british très marqué, regardez l'écran. Pour demander la route, les Britanniques sont très amicaux — abordez quelqu'un, ils s'arrêtent et vous dessinent même un plan.",
    emergencyNumber: "999 (toutes urgences)",
    hotel: {
      name: "The Z Hotel Victoria",
      area: "Victoria",
      address: "19 Saint George's Dr, Pimlico",
      rationale:
        "Victoria est à 10 min à pied de Buckingham Palace, sur la ligne Heathrow Express, intersection de 4 lignes de métro. Z Hotel chambres petites mais modernes — douche cascade, Wi-Fi fiable, café-restaurant lobby correct. Parfait pour les couples qui sont dehors toute la journée. Style design simple, photocopies des architectes londoniens célèbres aux murs — vous baignez aussi dans l'ambiance «ville de culture». Sainsbury's grand format à côté de la station Victoria, snacks tardifs faciles.",
      estimatedNightlyRate: "~190 €/nuit",
    },
    airportTransit: {
      method: "Heathrow Express → Paddington → Métro vers Victoria",
      duration: "Environ 35 min",
      cost: "~35 € (aller simple, ou métro plus lent ~5 €)",
      instructions:
        "Heathrow (LHR) Heathrow Express toutes les 15 min, non-stop Paddington 15 min. Réservez 2 semaines à l'avance ~20 € en ligne. À Paddington, prenez Circle line jusqu'à Victoria 5 stations 12 min. Option éco : Piccadilly métro direct Victoria 50 min, 5-7 € selon heure de pointe. Tapez votre Contactless — pas besoin de billet papier. À l'aéroport, Wise card ou carte de crédit internationale = meilleur taux que les distributeurs.",
    },
    days: [
      {
        theme: "Westminster & South Bank",
        summary: "Le couloir cartes postales classique de Londres — Big Ben, Westminster Abbey, promenade de la Tamise jusqu'à Tate Modern, dîner pub.",
        stops: [
          {
            name: "Big Ben + Westminster Bridge",
            area: "Westminster",
            duration: "45 min",
            description:
              "Elizabeth Tower (qui contient Big Ben) après le nettoyage 2017-2022 ressemble à 1859 — décor gothique frais. Traversez le pont, retournez-vous pour la photo classique avec London Eye en premier plan. Le Parlement est la même façade que dans tous les films britanniques. Si à 18h vous êtes sur le pont au moment du carillon, le son résonne 10 secondes sur la Tamise — un «moment immersif sonore» londonien.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Métro District Victoria → Westminster, environ 5 min",
          },
          {
            name: "Westminster Abbey",
            area: "Westminster",
            address: "20 Deans Yd",
            duration: "2h",
            description:
              "Église des couronnements depuis 1066. Sauf Edward V et VIII, tous les monarques anglais y ont été couronnés ; Newton, Darwin, Hawking reposent au «Coin des Scientifiques». La Lady Chapel et son plafond en éventail valent l'audioguide + 2h — terminé en 1503, prouesse inimitable de l'architecture médiévale en pierre. Au «Coin des Poètes», statues et stèles de Shakespeare, Dickens, les sœurs Brontë — pèlerinage des amateurs de littérature.",
            estimatedCost: "~34 €",
            bookingTip: "En ligne 2-3 jours à l'avance ; samedi épuisé 1 semaine à l'avance.",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "Déjeuner Borough Market",
            area: "Southwark",
            duration: "1h30",
            description:
              "Plus ancien marché alimentaire de Londres, fondé en 1014. Mangez debout — sandwich grilled cheese de Kappacasein (12 €) immanquable, fromage Raclette suisse fondu dans le sandwich = star du marché. Paella de Brindisa (15 €), 5 min à la commande. Baguette confit de canard de Le Marché du Quartier (12 €) — saveur d'un village du sud de la France. Le déjeuner que vous retiendrez. Le «Borough Market Kitchen» voisin a 100+ épices et ingrédients à ramener — Saint-Graal des foodies britanniques.",
            estimatedCost: "~20 €",
            transitFromPrev: "Jubilee Westminster → London Bridge, environ 15 min",
          },
          {
            name: "Tate Modern",
            area: "South Bank",
            duration: "2h",
            description:
              "Ancienne centrale électrique transformée en musée d'art moderne le plus important d'Europe. Permanent gratuit. Rothko, Picasso, Bacon, Pollock — chaque nom a changé l'histoire de l'art. Terrasse 10e étage = vue gratuite sur St. Paul's Cathedral à travers la Tamise. Le «Turbine Hall» — hall central de 35 m de haut, expositions d'installations contemporaines géantes chaque année, gratuit — vous vous tenez au milieu de l'œuvre, vous en faites partie.",
            estimatedCost: "Gratuit (expos spéciales payantes)",
            transitFromPrev: "Au bord de la Tamise 10 min à pied",
          },
          {
            name: "Millennium Bridge + extérieur St. Paul's",
            area: "South Bank → City",
            duration: "45 min",
            description:
              "Traversez le Millennium Bridge piéton vers St. Paul's. Le chef-d'œuvre de Wren de 1710 reste gratuit à admirer de l'extérieur — sauf si vous tenez à monter au Whispering Gallery, sautez l'intérieur payant. Le Millennium Bridge est «le pont du millénaire», construit en 1999 — fermé 10 jours après ouverture pour cause de balancement, renforcé pendant 2 ans. Aujourd'hui un des ponts les plus modernes de Londres ; J.K. Rowling le fait détruire par les Mangemorts dans Harry Potter 7.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "The George Inn",
            area: "Southwark",
            address: "75-77 Borough High St.",
            duration: "1h30",
            description:
              "Seule auberge de relais à galerie restante de Londres — 1677, propriété National Trust. Vrai dîner pub : fish & chips avec mushy peas et une pinte de vraie ale dans la salle aux panneaux de bois. Dickens y a bu — son roman «Little Dorrit» a été écrit dans ce pub. Le Sunday Roast (rôti dominical) si vous y êtes dimanche est le dîner national — bœuf/poulet/porc rôti + pommes de terre + Yorkshire pudding + légumes + jus de viande, une portion suffit pour la journée.",
            estimatedCost: "~50 € pour deux avec boissons",
            bookingTip: "OpenTable — petite salle ; le beer garden est premier arrivé premier servi.",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "British Museum + Covent Garden + Soho",
        summary: "Matin musée mondial, après-midi marchés et Seven Dials, dîner Soho.",
        stops: [
          {
            name: "British Museum",
            area: "Bloomsbury",
            address: "Great Russell St",
            duration: "3h",
            description:
              "Gratuit. 8 millions d'objets, 94 galeries. Ciblez : Rosetta Stone (salle 4), Marbres du Parthénon (18), momies égyptiennes (62-63), trésor de Sutton Hoo (41). Le Great Court à toit de verre vaut la visite — Norman Foster, 2000, plus grande place couverte du monde. Audioguide en français au lobby (5 €), 3h pour 50 pièces phares. La «Galerie chinoise» (33) est la plus grande zone non-britannique, bronzes Shang-Zhou, porcelaines Ming, laques Qing — vous ressentirez peut-être un «ils devraient rentrer chez eux», mais la conservation est excellente.",
            estimatedCost: "Gratuit",
            bookingTip: "Réservez le créneau gratuit en ligne pour éviter la file de sécurité.",
            transitFromPrev: "Métro Victoria → Tottenham Court Rd, environ 15 min",
          },
          {
            name: "Flat Iron (Covent Garden)",
            area: "Covent Garden",
            address: "17-18 Henrietta St",
            duration: "1h",
            description:
              "£14 pour Feather Steak + frites au gras de bœuf + tomate grillée + popcorn d'accueil. Déjeuner londonien parfait sans vider le portefeuille. Pas de réservation — venez, donnez votre nom, ils vous textent. «Flat Iron» est la partie intérieure de l'omoplate du bœuf — quasi inexistant dans la cuisine traditionnelle britannique, ce restaurant l'a importé des USA et est devenu Michelin Bib Gourmand. Avec bière artisanale locale «Camden Hells» (5 €).",
            estimatedCost: "~22 € par personne",
            transitFromPrev: "15 min à pied",
          },
          {
            name: "Marché de Covent Garden + Seven Dials",
            area: "Covent Garden",
            duration: "1h30",
            description:
              "Le bâtiment du marché de 1830 a stands d'artisans, magasins sur 2 étages, performances de rue gratuites par de vrais chanteurs d'opéra formés. Au nord, Seven Dials pour les marques uniques — Neal's Yard Remedies, ruelle couleur kale photogénique. Seven Dials, c'est «7 rues qui se croisent en 1 point» — héritage urbain du XVIIe siècle. Au centre, une colonne de pierre avec 7 cadrans solaires pointant chacun vers une rue — vous tournez sur vous-même, voyez 7 angles différents de Londres.",
            estimatedCost: "Gratuit sans achat",
            transitFromPrev: "5 min à pied",
          },
          {
            name: "National Gallery",
            area: "Trafalgar Square",
            duration: "1h30",
            description:
              "Gratuit. Sautez les ailes décoratives, direct à : Tournesols de Van Gogh (43), Vierge aux rochers de Léonard (9), Le Téméraire de Turner (34). 90 min sélectives suffisent. «Tournesols» est la version londonienne (Van Gogh en a peint 5 — 3 en Europe, 1 au Japon, 1 à Londres) — jaune-vert intense, coups de pinceau rugueux, vous sentez le tremblement de l'artiste. Téléchargez l'app gratuite «National Gallery» — 50 œuvres majeures avec audioguide en français.",
            estimatedCost: "Gratuit",
            transitFromPrev: "15 min à pied",
          },
          {
            name: "Trafalgar Square + Admiralty Arch",
            area: "Whitehall",
            duration: "45 min",
            description:
              "Colonne Nelson, statues de lions, 4e socle alterne d'art contemporain. Marchez sur The Mall vers Buckingham Palace — promenade en lumière douce du soir le long de St. James's Park. Cette route est «le défilé royal britannique» — couronnements, mariages royaux, funérailles de la reine passent par là. Drapeaux du Royaume-Uni accrochés en continu ; les jours importants, ils sont remplacés par les armoiries royales.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Inclus",
          },
          {
            name: "Bocca di Lupo",
            area: "Soho",
            address: "12 Archer St",
            duration: "1h30",
            description:
              "Sous-sol Soho, petites assiettes italiennes régionales — chaque plat indique son village italien. Vitello tonnato (veau froid à la sauce thon), orecchiette à la nduja (pâte de porc épicée), burrata + un verre de Barolo (top vin italien). Comptoir = la meilleure place. Le chef Jacob Kenedy est le porte-flambeau de la cuisine italienne à Londres ; son livre «Bocca» est le best-seller de cuisine italienne au Royaume-Uni. Au comptoir, le chef vous explique en italien approximatif l'origine de chaque plat.",
            estimatedCost: "~70 € par personne avec vin",
            bookingTip: "1 semaine à l'avance sur le site, 20h prime time. Walk-in au comptoir parfois libre.",
            transitFromPrev: "10 min à pied",
          },
        ],
      },
      {
        theme: "Excursion : Oxford",
        summary: "1h de train pour la ville universitaire — cour de collège, Bibliothèque Bodléienne, déjeuner pub authentique, dîner retour à Londres.",
        stops: [
          {
            name: "Train GWR → Oxford",
            area: "Paddington → Oxford",
            duration: "1h",
            description:
              "Great Western Railway Paddington-Oxford direct toutes les 30 min. Aller-retour hors-pointe en ligne ~38 €/personne. Côté droit pour Windsor Castle au loin. La gare Paddington elle-même est un site — toit verre-acier de Brunel 1854, monument de la révolution industrielle. Wi-Fi gratuit dans le train, 1h pour un épisode Netflix.",
            estimatedCost: "Aller-retour ~38 €",
            transitFromPrev: "Métro vers Paddington, environ 15 min",
          },
          {
            name: "Christ Church College",
            area: "Oxford",
            duration: "1h30",
            description:
              "Plus grand collège d'Oxford, fondé en 1546 par Henri VIII. Le Great Hall est l'inspiration de la salle à manger de Hogwarts dans Harry Potter (filmé ailleurs, mais l'inspiration est ici). Tom Tower de Wren. Marchez ensuite dans Christ Church Meadow derrière. Tom Quad (cour Tom) est la plus grande cour collégiale d'Angleterre — vous y ressentez 500 ans d'érudition. Le collège a produit 13 Premiers ministres britanniques, Lewis Carroll (auteur d'Alice au pays des merveilles) — «Alice» était la fille du doyen.",
            estimatedCost: "~20 €",
            bookingTip: "Ouvre 10h ; 9h45 pour entrer dans la première vague.",
            transitFromPrev: "Gare 10 min à pied",
          },
          {
            name: "Bibliothèque Bodléienne + Radcliffe Camera",
            area: "Oxford",
            duration: "1h30",
            description:
              "L'une des plus anciennes bibliothèques d'Europe (1602) et la circulaire Radcliffe Camera en face (1749). Visite guidée Bodléienne (30 min) montre la Duke Humfrey's Reading Room du XVe siècle — la bibliothèque de Hogwarts dans les films Harry Potter, c'est ici tournée. La Camera est juste pour la photo — pas ouverte au public. Bodléienne conserve 6 millions de livres, plus grande bibliothèque du Royaume-Uni après British Library — chaque livre publié au Royaume-Uni y est archivé.",
            estimatedCost: "Tour Bodléienne ~10 €",
            transitFromPrev: "10 min à pied",
          },
          {
            name: "The Turf Tavern",
            area: "Oxford",
            address: "4 Bath Pl",
            duration: "1h30",
            description:
              "Pub du XIIIe siècle caché dans une ruelle pavée — Bill Clinton y «n'a pas inhalé», Hawking y a bu, Tolkien y a édité. Vraie ale, vrai Sunday Roast (si dimanche), poutres si basses qu'on doit baisser la tête. Trouver l'allée fait la moitié du plaisir — l'entrée est au fond de St. Helen's Passage, 1 m de large. Devant la porte : «An Education in Intoxication» (l'éducation par l'ivresse) — un pub du XIIIe siècle toujours considéré comme la «2e salle de classe» des étudiants d'Oxford.",
            estimatedCost: "~30 € par personne",
            transitFromPrev: "St. Helen's Passage 5 min à pied",
          },
          {
            name: "Magdalen College — parc aux daims + Addison's Walk",
            area: "Oxford",
            duration: "1h30",
            description:
              "Magdalen (prononcer «Maudlin») a un parc aux daims, une tour à cloche, et l'Addison's Walk — 2 km de promenade au bord d'eau que C.S. Lewis et Tolkien faisaient quotidiennement. 1h de marche verte, puis train retour. Les daims sont là depuis le XIVe siècle ; le 1er mai à 6h, le chœur du collège chante en latin «Hymnus Eucharisticus» depuis le sommet de la tour — tradition de 700 ans, à vérifier la date dans le journal d'Oxford.",
            estimatedCost: "~9 €",
            transitFromPrev: "15 min à pied",
          },
          {
            name: "Train retour Londres",
            area: "Oxford → Paddington",
            duration: "1h",
            description: "GWR retour à Paddington. Profitez pour vous reposer — demain musée + Harrods.",
            estimatedCost: "Aller-retour inclus",
            transitFromPrev: "10 min à pied jusqu'à la gare",
          },
          {
            name: "Dishoom King's Cross",
            area: "King's Cross",
            address: "5 Stable St",
            duration: "1h30",
            description:
              "Cuisine indienne style café irani de Bombay, dans un magnifique entrepôt en briques rouges. Black Daal signature (lentilles noires mijotées 24h) + biryani d'agneau + chai indien. Dishoom est une légende londonienne — Time Out l'a élu «meilleur restaurant de Londres» 5 ans de suite. Le brunch «Bacon Naan Roll» est la formule du week-end pour les Londoniens. King's Cross station vaut le coup — la voie 9¾ d'Harry Potter est ici (chariot factice gratuit pour photo dans la station), file de 30 min le week-end.",
            estimatedCost: "~45 € par personne",
            bookingTip: "Walk-in seulement pour moins de 6 personnes — file SMS, 45-60 min d'attente à 20h.",
            transitFromPrev: "Métro Paddington, environ 12 min",
          },
        ],
      },
      {
        theme: "V&A + Harrods + au revoir",
        summary: "Encore un grand musée, shopping Harrods, thé de l'après-midi, puis Paddington Express vers Heathrow.",
        stops: [
          {
            name: "Victoria and Albert Museum",
            area: "South Kensington",
            address: "Cromwell Rd",
            duration: "2h30",
            description:
              "Gratuit. Plus grand musée d'arts décoratifs au monde. Ciblez : Galerie Mode (40), Galerie Bijouterie (91), Cast Courts (46), Tipu's Tiger (41). Café du jardin John Madejski — le plus beau café de musée de Londres. Les «Cast Courts» sont une folie victorienne — moulages en plâtre de sculptures italiennes (David de Michel-Ange) ramenés à Londres pour que les Anglais voient sans aller en Italie. Cette excentricité impériale «ramener le monde à la maison» est la salle la plus magique du V&A.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Métro District, environ 10 min",
          },
          {
            name: "Harrods",
            area: "Knightsbridge",
            address: "87-135 Brompton Rd",
            duration: "1h30",
            description:
              "7 étages, 330 départements, 120 000 m² de cathédrale du retail. Même sans achat, allez au Food Hall (RDC arrière) et à l'escalier égyptien. Le Toy Department au 3e est une destination — Disneyland miniature. L'Egyptian Escalator est l'un des escaliers mécaniques les plus connus de Londres — vrai marbre égyptien, hiéroglyphes, statues de pharaons, construit en 1997 par Mohamed Al-Fayed (ancien propriétaire) en mémoire de son fils Dodi (mort dans le même accident que Diana). Le Caviar Bar du Food Hall sert caviar + Champagne (90 €/personne) — brunch le plus cher de Londres.",
            estimatedCost: "Gratuit sans achat",
            transitFromPrev: "15 min à pied",
          },
          {
            name: "Thé de l'après-midi chez Fortnum & Mason",
            area: "Piccadilly",
            address: "181 Piccadilly",
            duration: "2h",
            description:
              "Adieu londonien officiel. Diamond Jubilee Tea Salon au 4e étage de Fortnum's — finger sandwiches, scones avec clotted cream de Cornouailles, pâtisseries, thé à volonté. Rituel des années 1840. «Royal Blend» est le thé créé par Fortnum's pour la reine Elizabeth — mélange Assam-Ceylan, thé matinal des gentlemen britanniques. Carte des thés 20+ variétés, le serveur vous fait sentir chacune. C'est «la culture britannique condensée», cela mérite un après-midi entier.",
            estimatedCost: "~95 € par personne",
            bookingTip: "2-3 semaines à l'avance sur le site, 14h-15h30 prime time ; semaine plus facile que week-end.",
            transitFromPrev: "Métro Knightsbridge → Green Park, environ 10 min",
          },
          {
            name: "Promenade Piccadilly + Regent Street",
            area: "West End",
            duration: "1h",
            description:
              "Digérez les scones. Sur Piccadilly devant Royal Academy, jusqu'à Piccadilly Circus pour la statue d'Eros, puis vers le nord sur Regent Street avec sa façade Art Déco courbée. Hamleys (n°188-196) — plus ancien magasin de jouets du monde (1881), 7 étages comme Disneyland, intéressant même pour adultes. Les illuminations de Noël de Regent Street (début nov-début janv) sont les plus magnifiques décorations de Noël de Londres — couloir doré sur toute la rue.",
            estimatedCost: "Gratuit",
            transitFromPrev: "À pied",
          },
          {
            name: "Hôtel + récupération bagages",
            area: "Victoria",
            duration: "1h",
            description: "Métro vers Victoria, bagages à la consigne, organisation. Quittez vers Paddington 19h45 pour Heathrow Express 21h ; 3h de marge international.",
            estimatedCost: "Gratuit",
            transitFromPrev: "Métro, environ 15 min",
          },
          {
            name: "Heathrow Express → LHR",
            area: "Paddington → Heathrow",
            duration: "20 min",
            description:
              "Heathrow Express toutes les 15 min. Paddington-LHR 15 min — transit aéroport le plus rapide d'Europe. Réservez en ligne ~20 €. Duty free Heathrow Chanel, Burberry, Mulberry ont des éditions exclusives UK — moins chères qu'en France (le Royaume-Uni rembourse 14% de TVA aux non-résidents).",
            estimatedCost: "~20 €",
            transitFromPrev: "Métro Circle Victoria → Paddington, environ 10 min",
          },
        ],
      },
    ],
    packingTips: [
      "Chaussures imperméables — la pluie de Londres est légère mais persistante",
      "Parapluie portatif (noir, pas couleur vive) — style local",
      "Une tenue plus habillée — afternoon tea, bon pub, dîner Bocca di Lupo l'apprécient",
      "Adaptateur UK (type G) — totalement différent de France et UE",
      "Écharpe en laine fine — Londres est venté, intérieur frais",
      "Carte Visa/Mastercard — la plupart des magasins UK acceptent les cartes françaises, mais quelques petits commerces et cafés n'acceptent que Visa/MC",
      "Batterie externe — Google Maps consomme beaucoup à Londres",
    ],
    budgetEstimate: "Couple hors hôtel : 150-250 €/jour (musée + déjeuner pub + bon dîner)",
    generalTips: [
      "Tap Contactless directement pour les transports — plafond journalier auto-activé à ~10 €",
      "Tenez la droite sur l'escalator, marchez à gauche. Si vous bloquez, les Londoniens soupirent ostensiblement",
      "Pourboire : 10-12,5% au restaurant assis (souvent ajouté automatiquement — vérifiez le ticket)",
      "Regardez d'abord à droite avant de traverser — circulation à gauche",
      "App «Citymapper» — plus précis que Google Maps pour les transports londoniens",
      "Apple Pay accepté quasi partout — vous pouvez vivre 4 jours avec juste votre téléphone",
    ],
  },
  "reykjavik-4d-couple": {
    tagline: "Quatre jours en couple — Cercle d'Or, cascades de la côte sud, Blue Lagoon.",
    audience: "Couple · Milieu de gamme",
    destination: "Reykjavik",
    destinationCountry: "Islande",
    overview:
      "Quatre jours pensés pour un couple qui veut les plus beaux sites d'Islande sans s'engager dans le tour complet de la Route Circulaire. Vous logez à Reykjavik 101 — le centre se parcourt parfaitement à pied — et l'utilisez comme rampe de lancement pour deux grandes excursions : le Cercle d'Or (Þingvellir, Geysir, Gullfoss) et la côte sud (deux cascades et une plage de sable noir inoubliable). Le 4ᵉ jour, matinée tranquille au Blue Lagoon avant le vol. À la fin, le pays vous aura offert de la lave moussue, de la vapeur géothermique, une cathédrale de colonnes basaltiques au bord de la mer, et un ciel qui change trois fois de couleur sur le chemin du retour — et vous aurez goûté le saumon préparé de quatre façons. L'Islande est petite par la distance, immense par la sensation.",
    bestSeasonNote:
      "Juin à août, c'est la fenêtre confortable du soleil de minuit — longue lumière, toutes les routes ouvertes, mais c'est le plus cher et il faut un masque pour dormir. Fin septembre à octobre, c'est le rapport qualité-prix optimal : feuillages d'automne, route circulaire encore praticable, saison aurorale qui démarre (probabilité grimpe nettement après le 20 septembre). Novembre à février : 4 heures de jour, mais probabilité aurorale maximale et prix les plus bas — tenue grand froid et crampons indispensables. Évitez mars (boue + neige fondue + routes fermées). Activité volcanique récurrente sur la péninsule de Reykjanes (où se trouvent le Blue Lagoon et l'aéroport KEF) depuis 2023 — vérifiez vedur.is (Met Office islandais) dans les 48 h précédant le départ.",
    currencyTip:
      "L'Islande est l'un des pays les plus carte-friendly au monde. Visa, Mastercard, Apple Pay, Google Pay — 99 % des endroits. Les pompes à essence en libre-service exigent une carte à puce avec PIN ; demandez à votre banque un PIN à 4 chiffres avant de partir, sinon vous serez bloqué. La devise est la couronne islandaise (ISK) ; 130 ISK ≈ 1 €. Les distributeurs ne servent qu'à retirer du cash pour les pourboires (et le pourboire n'a pas cours de toute façon) — sautez. L'eau du robinet est gratuite, propre et délicieuse — gourde réutilisable obligatoire, n'achetez jamais d'eau en bouteille (~5 € la petite bouteille).",
    languageTip:
      "L'islandais est la langue officielle, mais la maîtrise de l'anglais y est la plus élevée d'Europe après le Royaume-Uni — pas besoin de manuel. Le seul mot islandais à retenir, c'est « takk » (merci). Les noms de lieux sont volontairement imprononçables (« Eyjafjallajökull ») — les locaux trouvent votre tentative charmante, essayez. L'annuaire islandais utilise toujours le système des patronymes — Jón Einarsson, c'est Jón fils d'Einar — d'où les badges qui ne portent que le prénom.",
    emergencyNumber: "112 (toutes urgences, opérateur anglophone, gratuit depuis tout téléphone)",
    hotel: {
      name: "Hotel Borg by Keahotels",
      area: "Reykjavik 101 (centre-ville) · place Austurvöllur",
      address: "Pósthússtræti 11, 101 Reykjavík",
      rationale:
        "L'Hotel Borg occupe la place Austurvöllur depuis 1930 — premier vrai hôtel d'Islande, construit pour les 1000 ans du parlement. Les chambres Art déco ont vieilli vers une perfection discrète : salles de bains en marbre, ferrures en laiton d'origine, rideaux occultants indispensables (soleil de minuit). 4 min à pied de Hallgrímskirkja, 6 min du Sun Voyager et du port, 12 min du terminal BSÍ où s'arrête la navette aéroport Flybus. Kol et Skál — deux des meilleures tables de Reykjavik — sont à 5 min. La place elle-même est l'endroit où les Islandais se rassemblent pour les manifs, concerts et marché de Noël — y dormir, c'est dormir au cœur du salon de la ville.",
      estimatedNightlyRate: "~280 €/nuit",
    },
    airportTransit: {
      method: "Navette Flybus (aéroport international de Keflavik → terminal BSÍ) + 5 min à pied",
      duration: "~50 min",
      cost: "~30 € aller-retour",
      instructions:
        "Réservez Flybus à l'avance sur re.is — embarquez à l'extérieur des arrivées de KEF, panneaux orange Flybus visibles immédiatement après la douane, sans sortir du bâtiment. Bus toutes les 30-40 min, calés sur les arrivées d'avion, fonctionne même à 4 h du matin. Dépose au terminal BSÍ ; Hotel Borg à 12 min à pied à travers le centre — ou 7 € de plus pour « Flybus+ » porte-à-porte jusqu'au lobby (recommandé à l'arrivée avec bagages). Pour le retour, départ BSÍ 2 h 30 avant le vol international. Taxi KEF : ~170 € l'aller — rentable seulement à 4. N'allez pas louer de voiture à KEF si vous ne faites pas la route circulaire — le centre se fait à pied et le stationnement est payant et pénible.",
    },
    days: [
      {
        theme: "Centre de Reykjavik — premières impressions",
        summary:
          "Atterrir, déposer les bagages, marcher dans le 101 coloré — l'église, le bord de mer, le hot-dog le plus célèbre du monde, le port à l'heure dorée, dîner de poisson tout juste pêché.",
        stops: [
          {
            name: "Check-in Hotel Borg",
            area: "place Austurvöllur",
            duration: "45 min",
            description:
              "Posez les bagages, le lobby Art déco est déjà un petit bonus. Si la chambre n'est pas prête, le Borg Espresso Bar tire un excellent café et le bar propose une station gratuite eau chaude + thé l'après-midi. Demandez à la conciergerie une mise à jour météo + prévision aurorale (vedur.is) — la météo islandaise change toutes les 2 h et le programme de demain en dépendra.",
            estimatedCost: "—",
            transitFromPrev: "Dépose Flybus",
          },
          {
            name: "Hallgrímskirkja",
            area: "Skólavörðuholt",
            address: "Hallgrímstorg 1, 101 Reykjavík",
            duration: "1 h",
            description:
              "L'église en forme de colonnes basaltiques (architecte Guðjón Samúelsson, terminée en 1986 après 41 ans de construction) — plus haut bâtiment de Reykjavik, visible de tout le centre. Comptez 10 €/personne pour l'ascenseur jusqu'à la tour de 73 m : la péninsule s'ouvre — baie de Faxaflói, maisons aux toits de tôle colorés (Reykjavik les a peintes dans le cadre d'un programme d'emploi sous la Dépression), mont Esja en face. À l'intérieur, le Klais à 5 275 tuyaux propose des concerts gratuits de 30 min en milieu de journée la plupart des lundis à midi — même les athées s'attendrissent quand les basses font trembler le sol.",
            estimatedCost: "~10 €/personne (tour)",
            bookingTip: "Pas de réservation ; arrivez avant 16 h 30 (dernier ascenseur).",
            transitFromPrev: "8 min à pied en montée depuis l'hôtel",
          },
          {
            name: "Bæjarins Beztu Pylsur (le hot-dog)",
            area: "Vieux port",
            address: "Tryggvagata 1, 101 Reykjavík",
            duration: "20 min",
            description:
              "Ouvert depuis 1937, le stand de hot-dog le plus célèbre du monde — Bill Clinton y a mangé en 2004, l'événement a fait le tour de la presse internationale. Commandez « eina með öllu » (un avec tout) : saucisse agneau-porc-bœuf, moutarde brune sucrée, rémoulade, oignons frits + crus, ketchup. 6 €, debout au coin de la rue. La file avance vite même quand elle paraît longue. Repas ouvrier classique en Islande — les locaux en mangent encore 4-5 par an en moyenne.",
            estimatedCost: "~6 €",
            transitFromPrev: "10 min de marche en descente",
          },
          {
            name: "Sun Voyager (Sólfar) + salle de concert Harpa",
            area: "front de mer Sæbraut",
            duration: "1 h",
            description:
              "La sculpture squelettique en acier inoxydable d'un drakkar viking (Jón Gunnar Árnason, 1990) trône au bord de l'eau, proue pointée vers la baie — à l'heure dorée, l'acier devient cuivré et le mont Esja derrière vire au rose. Marchez 8 min vers l'est le long du port jusqu'à Harpa, salle de concert aux panneaux de verre cristallin évoquant le basalte (studio Olafur Eliasson + Henning Larsen, 2011). Lobby gratuit ; la géométrie des panneaux qui réfléchissent le port, c'est la photo. S'il y a une répétition gratuite de musique de chambre, on peut parfois s'asseoir.",
            estimatedCost: "Gratuit",
            transitFromPrev: "7 min à pied le long du port",
          },
          {
            name: "Matur og Drykkur (dîner néo-islandais)",
            area: "Vieux port (quartier Grandi)",
            address: "Grandagarður 2, 101 Reykjavík",
            duration: "2 h",
            description:
              "Cuisine islandaise moderne avec un respect profond des méthodes anciennes — la cheffe Hrefna Sætran fait tourner son menu dégustation chaque semaine, mais attendez-vous à de l'omble chevalier saumuré au beurre noisette, de l'épaule d'agneau cuite toute une nuit dans la fumée de bouleau, et un skyr aux myrtilles sauvages en dessert. Le plat « Saltfish 1.0 vs 2.0 » (cabillaud salé traditionnel face à la réinterprétation du chef) est un petit numéro à commander. Allez sur le menu dégustation — ~95 €/personne, 7 plats, conçu pour s'enchaîner. Réservation obligatoire, même un mardi.",
            estimatedCost: "~110 €/personne avec accord vins",
            bookingTip: "Réservez 1-2 semaines à l'avance ; demandez la banquette d'angle.",
            transitFromPrev: "12 min à pied le long du Vieux port",
          },
          {
            name: "Slippbarinn (cocktail nocturne)",
            area: "Reykjavik Marina Hotel",
            duration: "1 h",
            description:
              "Premier bar à cocktails d'Islande, ouvert en 2012, toujours la référence. Commandez le « Birch & Brimstone » (old fashioned au sirop de bouleau avec eau soufrée pétillante, étonnamment plus agréable que ça en a l'air) ou ce que conseille le barman. En été, le soleil est encore haut à 23 h — boire un dernier verre dans une lumière dorée, expérience étrange. En hiver, c'est un refuge cosy avec couvertures en peau de mouton sur les sièges. Un seul verre puis retour à pied par le port — Reykjavik à minuit fait partie des villes les plus sûres au monde.",
            estimatedCost: "~22 € le cocktail",
            transitFromPrev: "Bâtiment voisin (immédiat)",
          },
        ],
      },
      {
        theme: "Cercle d'Or classique",
        summary:
          "La boucle classique d'une journée complète — faille tectonique, geyser, cascade à deux étages, et un déjeuner sous serre de tomates dont vous parlerez longtemps. En auto l'été, en bus guidé l'hiver.",
        stops: [
          {
            name: "Pickup ou départ en location",
            area: "Reykjavik 101",
            duration: "30 min",
            description:
              "Deux options : (a) excursion en petit groupe avec Reykjavik Excursions ou Iceland Horizon (~95 €/personne, 9 h, guide anglophone, prise à l'hôtel) — idéal en hiver pour les conducteurs non rompus à la glace ; ou (b) location chez Lotus ou Budget au BSÍ — petit 4×4 ~110 €/jour — idéal en été pour la flexibilité. Le Cercle d'Or, c'est une boucle de 230 km, parfaitement praticable en voiture standard d'avril à octobre.",
            estimatedCost: "~95-110 €",
            transitFromPrev: "Pickup hôtel ou 12 min à pied jusqu'au BSÍ",
          },
          {
            name: "Parc national de Þingvellir",
            area: "Bláskógabyggð",
            duration: "1 h 30",
            description:
              "Site UNESCO avec deux histoires superposées. Géologiquement, c'est la frontière visible entre les plaques nord-américaine et eurasienne — vous marchez littéralement entre les deux dans la faille d'Almannagjá : falaise gauche = Amérique du Nord, falaise droite = Europe, l'écart s'élargit de 2 cm/an. Politiquement, c'est là que l'Alþingi (le plus vieux parlement encore en activité, fondé en 930) s'est réuni en plein air pendant des siècles. Marchez la faille jusqu'au Lögberg (Rocher de la Loi) où se tenaient les orateurs, puis la petite église et la cascade Öxarárfoss derrière. Comptez 90 min ; parking ~10 € (P1 le plus proche).",
            estimatedCost: "~10 € parking",
            bookingTip: "Pas d'entrée payante ; arrivez avant 11 h pour devancer les bus.",
            transitFromPrev: "50 min de route depuis Reykjavik",
          },
          {
            name: "Zone géothermique de Geysir",
            area: "Haukadalur",
            duration: "1 h",
            description:
              "Le « geyser » originel — le mot vient d'ici. Le grand Geysir est en sommeil, mais son voisin Strokkur entre en éruption toutes les 5-10 min, jet vertical de 20-30 m. Tenez-vous au vent (panneaux indiquant le sens dominant), téléphone en mode rafale ; l'éruption commence par un dôme turquoise qui se retourne en une demi-seconde. La boucle en bois mène à Litli-Geysir (petit bassin bouillonnant) et Blesi (source de silice bleu profond). Gratuit ; le petit centre d'accueil a des toilettes propres et un kiosque café.",
            estimatedCost: "Gratuit",
            transitFromPrev: "50 min de route vers l'est",
          },
          {
            name: "Déjeuner serre Friðheimar",
            area: "Reykholt",
            duration: "1 h 30",
            description:
              "Déjeuner dans une serre géothermique de tomates en activité — vous mangez parmi les vignes, bourdons compris (ils pollinisent). Menu fixe : soupe de tomates avec pain frais à volonté + beurre (28 €) — bien meilleur que ça paraît : basilic poussant à 5 m de votre table, levain encore tiède. Ajoutez la « Green Lady » (cocktail tomate + gin islandais) si vous ne conduisez pas. Réservation impérative — créneaux ouverts 14 jours à l'avance, samedis remplis le jour même.",
            estimatedCost: "~32 €/personne avec boisson",
            bookingTip: "Réservez sur fridheimar.is exactement 14 jours avant à 9 h heure islandaise.",
            transitFromPrev: "15 min de route vers le sud",
          },
          {
            name: "Cascade de Gullfoss",
            area: "rivière Hvítá",
            duration: "1 h",
            description:
              "La « Cascade d'or » — 32 m sur deux étages tombant dans un canyon étroit, projetant des embruns sur cent mètres par temps ensoleillé : c'est l'arc-en-ciel qu'on voit sur toutes les photos d'Islande. Deux points de vue : la plate-forme d'observation supérieure (parking près du centre d'accueil, 5 min à pied) et le sentier inférieur (à 20 m du bord, plus long, glissant, imperméable obligatoire). Les deux gratuits. La soupe d'agneau à 14 € du centre d'accueil a sa réputation auprès des touristes refroidis.",
            estimatedCost: "Gratuit",
            transitFromPrev: "15 min de route vers le nord",
          },
          {
            name: "Secret Lagoon (Gamla Laugin)",
            area: "village de Flúðir",
            duration: "1 h 30",
            description:
              "L'alternative maligne au Blue Lagoon si vous voulez chaud tout de suite : bassin naturel à 38-40 °C entouré de gravier noir et de vapeur, petit geyser éruptant toutes les 5 min dans un coin. Construite en 1891, c'est la plus ancienne piscine publique d'Islande. Moins chère (35 € contre 70 € au Blue Lagoon), moins fréquentée, et l'eau a les mêmes propriétés thérapeutiques riches en silice. Serviette + casier inclus ; maillot à apporter. Restez jusqu'à avoir les doigts fripés ; c'est le reset de la journée.",
            estimatedCost: "~35 €/personne",
            bookingTip: "Réservez sur secretlagoon.is — créneau 17 h pour la lueur du couchant.",
            transitFromPrev: "20 min de route vers le sud",
          },
          {
            name: "Fiskmarkaðurinn (retour Reykjavik, dîner)",
            area: "Aðalstræti, Reykjavik 101",
            address: "Aðalstræti 12",
            duration: "1 h 30",
            description:
              "Si Matur og Drykkur est moderne-traditionnel, Fiskmarkaðurinn est moderne-asiatique-islandais — langoustine islandaise sashimi, omble chevalier au miso, épaule d'agneau au glaçage coréen. L'autre adresse de la cheffe Hrefna Sætran, un poil plus théâtrale. Le menu dégustation « fiskmarkaður » (~120 €) déroule magnifiquement. Demandez le sous-sol aux bougies basses à la réservation.",
            estimatedCost: "~110 €/personne",
            bookingTip: "Réservez 1 semaine à l'avance ; le comptoir du chef (4 places) part en premier.",
            transitFromPrev: "1 h 30 de route retour Reykjavik",
          },
        ],
      },
      {
        theme: "Côte sud — cascades + sable noir",
        summary:
          "Le jour spectaculaire. Deux cascades énormes (dont une qu'on contourne par derrière), une plage de sable noir gardée par des piles basaltiques, et un village endormi qui finit par une église à toit rouge sur la colline.",
        stops: [
          {
            name: "Route 1 vers le sud",
            area: "Reykjavik → Selfoss → Hvolsvöllur",
            duration: "1 h 30",
            description:
              "La route circulaire sud est surtout des prairies et des volcans plats — Eyjafjallajökull (le volcan qui a cloué les vols européens en 2010) est sur votre gauche en route vers l'est. Arrêt à la station N1 de Selfoss pour le hot-dog de station-service islandais (vraiment bon) et les en-cas de dernière minute. Le réseau mobile coupe par endroits après Selfoss ; téléchargez Google Maps hors-ligne avant de partir.",
            estimatedCost: "~15 € carburant aller",
            transitFromPrev: "—",
          },
          {
            name: "Cascade de Seljalandsfoss (passage derrière)",
            area: "sud de l'Islande",
            duration: "1 h",
            description:
              "Cascade-ruban de 60 m alimentée par le glacier Eyjafjallajökull — l'une des rares en Islande où l'on peut passer derrière. Le sentier glisse, portez du vraiment imperméable (pas du déperlant) — vous SEREZ trempé. De derrière le rideau, la lumière passe à travers un mur d'eau qui tombe — la photo de chaque couple ici. Parking 10 € (P1, horodateur). Voisin à 600 m à l'est, Gljúfrabúi se cache dans un canyon-fente — traversez un ruisseau jusqu'aux chevilles, et la cathédrale de brume à l'intérieur est plus spectaculaire que Seljalandsfoss elle-même.",
            estimatedCost: "~10 € parking",
            bookingTip: "Pas d'entrée payante. Arrivez à 10 h — les bus déboulent à 11 h.",
            transitFromPrev: "30 min de route vers l'est",
          },
          {
            name: "Cascade de Skógafoss",
            area: "Skógar",
            duration: "1 h",
            description:
              "60 m de haut, 25 m de large — parfaitement rectangulaire, parfaitement classique. Un escalier sur la droite (370 marches) grimpe jusqu'à la plate-forme d'observation supérieure ; vue sur la plaine de la côte sud. Au pied, debout dans les embruns, l'arc-en-ciel est presque garanti l'après-midi. Légende locale : un Viking aurait enterré un trésor derrière les chutes, on aperçoit parfois un éclat d'or ; en 2002, des archéologues ont effectivement trouvé une épée viking à proximité. Gratuit.",
            estimatedCost: "Gratuit",
            transitFromPrev: "30 min de route vers l'est",
          },
          {
            name: "Mia's Country Van (ou Black Beach Restaurant)",
            area: "Vík",
            duration: "1 h",
            description:
              "Déjeuner à Vík ou autour — Mia's Country Van (food truck, été uniquement) sert un fish and chips remarquable au cabillaud islandais depuis un vieux camion ; ou Black Beach Restaurant (dans le bâtiment d'accueil de Reynisfjara) propose une soupe d'agneau (16 €) avec vue sur les falaises basaltiques. Les deux sont bons. Évitez le Skool Beans coffee bus à côté — mignon mais moyen. Gardez de la place : le dîner à Reykjavik est la récompense du jour.",
            estimatedCost: "~22 €/personne",
            transitFromPrev: "25 min de route vers l'est",
          },
          {
            name: "Plage de sable noir Reynisfjara + colonnes basaltiques",
            area: "Vík í Mýrdal",
            duration: "1 h 30",
            description:
              "Sable noir en verre volcanique, colonnes basaltiques hexagonales escaladant la falaise (côté islandais : grotte Hálsanefshellir ; côté Game of Thrones : Eastwatch by the Sea), et les piles marines Reynisdrangar dressées au large — la légende dit que ce sont des trolls pris au piège du lever du soleil. Important : les « sneaker waves » sont mortellement dangereuses — 5 touristes y sont morts depuis 2007. Restez à 30 m minimum de la limite des vagues, jamais le dos à l'océan. Vérifiez les feux d'avertissement au parking avant de descendre.",
            estimatedCost: "~10 € parking",
            bookingTip: "Pas de réservation. Meilleure lumière 14 h-16 h — colonnes en lumière rasante.",
            transitFromPrev: "5 min de route vers le sud",
          },
          {
            name: "Village de Vík + église rouge Reyniskirkja",
            area: "Vík í Mýrdal",
            duration: "45 min",
            description:
              "Le village le plus au sud d'Islande (300 habitants) repose sur une colline, l'église à toit rouge Reyniskirkja sur le point le plus haut. L'église est symboliquement chargée : construite en 1929, c'est la seule structure censée survivre à l'éruption attendue du volcan Katla sous le glacier Mýrdalsjökull — les locaux font un exercice d'évacuation deux fois par an, l'église étant le point de rassemblement. Montez pour la photo et le panorama sur Reynisfjara. La fabrique de laine Víkurprjón vend de bons pulls islandais à prix honnêtes (150-250 €), souvenir qui dure une vie.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min de route en remontant",
          },
          {
            name: "Dill — l'étoile Michelin d'Islande",
            area: "Reykjavik 101",
            address: "Hverfisgata 12",
            duration: "2 h 30",
            description:
              "Premier restaurant étoilé d'Islande (2017), toujours le seul du pays. Le chef Gunnar Karl Gíslason propose une dégustation 7 services (~230 € avec accord vins) entièrement en produits islandais — beurre d'algues fermentées, omble chevalier saumuré au charbon, sorbet à l'eau de glacier, agneau salé dans une bergerie trois vallées plus loin. La salle compte 22 couverts, réservation 6-8 semaines à l'avance. Si vous ne faites qu'un grand repas en Islande, c'est ici. Sinon, sautez et allez chez Skál au Hlemmur Mathöll pour du néo-islandais décontracté à ~60 €/personne.",
            estimatedCost: "~230 €/personne avec accord",
            bookingTip: "Réservez 6-8 semaines à l'avance sur dillrestaurant.is. Les mardis se remplissent en dernier.",
            transitFromPrev: "2 h 30 de route retour Reykjavik",
          },
        ],
      },
      {
        theme: "Blue Lagoon + aéroport",
        summary:
          "Matinée tranquille, le célèbre bassin géothermique bleu laiteux, déjeuner avec vue, et un Flybus sans précipitation jusqu'à KEF.",
        stops: [
          {
            name: "Petit-déjeuner hôtel + check-out",
            area: "Hotel Borg",
            duration: "1 h",
            description:
              "Le petit-déjeuner du Borg est le meilleur de tous les 4 étoiles en ville — saumon mariné maison, skyr aux myrtilles sauvages, levain de la boulangerie d'à côté. Mangez tranquillement ; le Blue Lagoon est conçu pour la détente, mieux vaut y arriver dans cet état. Check-out avant 11 h (bagages stockés gratuitement à l'accueil jusqu'à 13 h).",
            estimatedCost: "Inclus si petit-déjeuner réservé",
            transitFromPrev: "—",
          },
          {
            name: "Flybus BSÍ → Blue Lagoon",
            area: "péninsule de Reykjanes",
            duration: "45 min",
            description:
              "Flybus opère un trajet explicite « Reykjavik → Blue Lagoon → aéroport KEF » qui fait exactement ce qu'il faut — vous emportez tous les bagages, arrêt au Blue Lagoon (consigne surveillée sur place), puis bus suivant pour l'aéroport. Aller-retour BSÍ ~50 €/personne ; réservation re.is. Départs toutes les heures du BSÍ. Asseyez-vous à droite pour les champs de lave de Reykjanes — vous traversez de la lave solidifiée vieille de 5 000 ans recouverte d'une mousse vert vif.",
            estimatedCost: "~50 €/personne",
            transitFromPrev: "12 min à pied jusqu'au BSÍ",
          },
          {
            name: "Blue Lagoon (forfait Comfort ou Premium)",
            area: "Grindavík, Reykjanes",
            address: "Norðurljósavegur 9, 240 Grindavík",
            duration: "2 h 30",
            description:
              "Le célèbre — turquoise laiteux par suspension de silice, niché dans la lave noire, eau à 38-40 °C toute l'année. Réservation à créneau horaire uniquement ; le forfait Comfort (75 €) suffit largement (entrée, serviette, boisson, masque de boue à la silice). Premium (120 €) ajoute peignoirs, chaussons, deuxième masque, vin pétillant — superflu sauf si vous voulez y rester une après-midi. Conseil clé : appliquez de l'après-shampoing avant d'entrer et nouez les cheveux en chignon — sinon silice + minéraux les transforment en paille pour une semaine. Casiers, paiement bracelet, pas de cash à l'intérieur. Bar dans l'eau avec boissons offertes (le bracelet décompte ; en général 1).",
            estimatedCost: "~75 €/personne Comfort",
            bookingTip: "Réservez sur bluelagoon.com 2-3 semaines à l'avance minimum, plus tôt en été/Noël. L'activité volcanique de Reykjanes ferme parfois le site — vérifiez 24 h avant.",
            transitFromPrev: "Le bus dépose à l'entrée",
          },
          {
            name: "Restaurant Lava (au Blue Lagoon)",
            area: "Reykjanes",
            duration: "1 h",
            description:
              "Niché dans la falaise de lave qui surplombe le lagon — la salle est encastrée dans la roche, paroi vitrée intégrale sur l'eau laiteuse. Menu déjeuner 3 plats à 90 € — agneau islandais, poisson frais, dessert au skyr — la plus belle vue de déjeuner du pays. Bien moins stressant que la course à la nourriture d'aéroport ; le restaurant appelle votre Flybus quand vous avez fini.",
            estimatedCost: "~90 €/personne",
            bookingTip: "Réservez le déjeuner en même temps que le billet Lagon — ils coordonnent l'horaire.",
            transitFromPrev: "Sur place (vestiaires → restaurant en 5 min)",
          },
          {
            name: "Flybus → aéroport international de Keflavik (KEF)",
            area: "Reykjanes",
            duration: "20 min",
            description:
              "Pickup Flybus à l'entrée du lagon — même billet que le matin. KEF est petit, contrôles rapides (90 min de marge pour l'international) ; les restaurants de l'aéroport sont moyens — Lava vous a déjà bien nourri. Le duty-free est côté piste — Brennivín (schnaps islandais au carvi), polaire 66°North, thé Lava et chocolat islandais sont les souvenirs incontournables. Total BL → KEF ~25 min navette comprise.",
            estimatedCost: "Inclus dans le billet du matin",
            transitFromPrev: "Bus depuis l'entrée Blue Lagoon",
          },
        ],
      },
    ],
    packingTips: [
      "Veste imperméable (pas seulement déperlante) — la météo islandaise tourne 4 fois en un après-midi",
      "Couche polaire ou laine — les soirs de juillet tombent à 8 °C",
      "Chaussures de marche à bonne adhérence — chaque belvédère implique de la roche mouillée",
      "Maillot — les bassins géothermiques sont partout, pas seulement au Blue Lagoon",
      "Masque de nuit + bouchons — soleil de minuit en été, voisins bruyants toute saison",
      "Gourde réutilisable — l'eau du robinet islandaise est la meilleure de votre vie, gratuite partout",
      "Serviette de voyage microfibre — pour les arrêts sources chaudes spontanés hors lagons réservables",
      "Batterie externe — les téléphones se vident vite par froid ; cartes hors-ligne + app aurore indispensables",
    ],
    budgetEstimate: "~320-450 €/jour pour un couple hors hôtel (l'Islande est chère : burger 25 €, bière 14 €, dîner 90 € = normal)",
    generalTips: [
      "Téléchargez SafeTravel.is et l'app 112 Iceland — la deuxième envoie votre position aux secours en un bouton",
      "Le pourboire n'est pas d'usage ; service inclus. Arrondissez si vraiment vous voulez remercier",
      "Prévision aurorale : vedur.is (Met Office) montre l'intensité (0-9) + couverture nuageuse — 4+ par nuit claire = forte probabilité",
      "Conduite hivernale : 4×4 obligatoire, sous la limite, jamais dans une tempête de neige — garez-vous et attendez",
      "Les F-roads (intérieur montagneux) exigent un 4×4 par la loi et sont fermées d'octobre à juin — n'essayez pas en voiture standard",
      "Les toilettes en zone reculée sont rares et payantes (pièce de 2 €) — utilisez à chaque arrêt-café",
      "Le dimanche à Reykjavik : beaucoup de petits commerces ferment, mais restaurants et Blue Lagoon restent ouverts",
      "Ne marchez pas sur la mousse — elle a 200 ans et les empreintes restent des décennies",
    ],
  },
  "cusco-5d-couple": {
    tagline: "Cinq jours en couple — acclimatation à Cusco, Vallée Sacrée, puis Machu Picchu.",
    audience: "Couple · Milieu de gamme",
    destination: "Cusco",
    destinationCountry: "Pérou",
    overview:
      "Cinq jours pour un couple qui veut Cusco, la Vallée Sacrée et le Machu Picchu sans se précipiter dans le mal d'altitude. Jour 1 : atterrissage en douceur — thé de coca, marche à plat dans San Blas, dîner tôt. Jour 2 : assez acclimatés pour Cusco proprement dit — Plaza de Armas, cathédrale sur fondations incas, déjeuner au marché San Pedro, forteresse Saqsayhuamán à l'heure dorée. Jour 3 : descente dans la Vallée Sacrée pour les terrasses de Pisac et Ollantaytambo. Jour 4, le clou : départ à 4 h, PeruRail pour le Machu Picchu, retour. Jour 5 : un espresso aux feuilles de coca, un souvenir en alpaga, vol retour. À la fin, vous aurez foulé des murs de pierre vieux de 800 ans de plus que l'anglais, vu le soleil se lever sur les Andes depuis la Porte du Soleil, et compris que « pachamama » est un mot que les gens vivent vraiment.",
    bestSeasonNote:
      "Mai à septembre = saison sèche — ciels dégagés, nuits froides, mois les plus sûrs pour le Chemin de l'Inca et ses alternatives. Évitez janvier-mars (pic de saison des pluies, le Chemin de l'Inca lui-même ferme en février pour entretien). Fin avril et octobre = excellent rapport qualité-prix : tarifs intersaison, surtout sec, mais prévoyez une couche imperméable. La fête d'Inti Raymi (24 juin) remplit la ville — réservez l'hôtel 6 mois à l'avance pour y assister, sinon comptez tarifs triplés cette semaine-là. L'altitude se moque du mois de votre venue.",
    currencyTip:
      "Sol péruvien (PEN). 1 USD ≈ 3,7 PEN. Cartes acceptées dans les hôtels, restaurants moyen-haut de gamme et le train ; cash nécessaire pour marchés, taxis, petits cafés et villages de la Vallée Sacrée. Retirez à un DAB BCP ou Interbank (max 700 PEN, ~190 USD) ; évitez les DAB indépendants « Globalnet » qui prélèvent 25 PEN par retrait. Gardez de petites coupures (10 et 20) — les vendeurs ne peuvent souvent pas casser un 100. Pourboire : 10 % au restaurant assis si non inclus ; 5-10 PEN par bagage pour les porteurs.",
    languageTip:
      "L'espagnol est universel ; le quechua reste vivant dans les villages andins, et au marché de Pisac on l'entend alterner avec l'espagnol. Bonjour en quechua : « allillanchu » (a-li-lyan-chou). La plupart des guides parlent anglais ; les menus des petits restaurants sont en espagnol uniquement. Le pack hors-ligne espagnol de Google Translate couvre 99 % des besoins. Le mot espagnol qui vaut la peine d'être prononcé correctement, c'est « huayno » (oua-i-no) — la musique folklorique andine qui sort de chaque haut-parleur de place.",
    emergencyNumber: "105 (police, anglais limité), 116 (médical), hotline tourisme iPeru +51 1 574 8000 (anglais, 24/7)",
    hotel: {
      name: "JW Marriott El Convento Cusco",
      area: "Centro Histórico, à 4 cuadras de la Plaza de Armas",
      address: "Esquina de la Calle Ruinas 432 y San Agustín",
      rationale:
        "Construit dans un couvent augustin du XVIᵉ siècle, sur les fondations d'un palais inca encore visibles derrière une vitre dans le lobby. Chaque chambre a un système d'oxygène enrichi qui pulse de l'O2 supplémentaire la nuit — à 3 400 m, c'est la différence entre dormir et rester éveillé à haleter. Les patios coloniaux sont des jardins en pierre ; le spa propose un massage aux feuilles de coca qui aide vraiment contre les maux de tête d'adaptation. À 4 cuadras de la Plaza de Armas : tout le centre à pied, mais à l'écart du pire bruit nocturne. La conciergerie gère toute la logistique Vallée Sacrée + Machu Picchu — réservation de la bonne classe de train, voiture matinale du 4ᵉ jour.",
      estimatedNightlyRate: "~280 €/nuit",
    },
    airportTransit: {
      method: "Transfert hôtel (préréservé) depuis Alejandro Velasco Astete (CUZ)",
      duration: "~25 min",
      cost: "~30 € l'aller",
      instructions:
        "L'aéroport de Cusco (CUZ) est petit, mono-piste, 100 % domestique — la plupart connectent à Lima (LIM) sur un vol LATAM ou Sky Airline de 90 min. Réservez le transfert hôtel à la résa (30 € l'aller) — chauffeur avec pancarte aux arrivées et thé de coca dans la voiture (vraiment utile pour l'acclimatation). Ne prenez PAS un taxi de rue à l'aéroport — fraude au compteur courante. Le stand officiel de taxis (« Taxis Autorizados » dans les arrivées) coûte ~15 € et est sûr, mais le transfert hôtel est plus serein avec les bagages. Le trajet jusqu'au centre fait gagner 200 m d'altitude — montez les escaliers de l'hôtel doucement la première heure. Le sommeil est le remède.",
    },
    days: [
      {
        theme: "Atterrir doucement, s'acclimater",
        summary:
          "Atterrir, rouler en ville, boire un thé de coca, marcher quelques pâtés à plat, manger tôt. Résistez à l'envie d'en faire plus — votre vous de demain vous remerciera.",
        stops: [
          {
            name: "Check-in JW Marriott El Convento",
            area: "Centro Histórico",
            duration: "1 h 30",
            description:
              "Check-in, acceptez immédiatement la première tasse de thé de coca (mate de coca) — ça aide vraiment pour l'altitude. Allongez-vous 30 min ; ne sous-estimez pas l'air. Les chambres à oxygène enrichi maintiennent une pression légèrement supérieure, vous le sentirez à la 2ᵉ nuit. Vertiges ou essoufflement : normal en jour 1 — eau, repas léger, repos. L'effort attendra.",
            estimatedCost: "—",
            transitFromPrev: "Transfert hôtel depuis CUZ",
          },
          {
            name: "Promenade dans le quartier San Blas",
            area: "San Blas",
            duration: "1 h",
            description:
              "Le quartier des artisans, 2 cuadras au-dessus de l'hôtel — ruelles pavées, maisons à liserés blanc-bleu, murs de fondation incas au niveau de la rue (vous pouvez poser la main dessus). La pente est douce mais à 3 400 m, même une douce montée fait travailler — c'est l'objectif du jour. La Plaza San Blas en haut a une église coloniale (San Blas Iglesia, 1563, chaire en cèdre sculptée d'un seul tronc) et une fontaine. Faites un saut à la galerie Hilo pour les textiles andins tissés main (80-250 €) — les couleurs, c'est ce qui fait la renommée de la région.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min à pied en montée",
          },
          {
            name: "Café Valeriana — thé de coca + pâtisserie",
            area: "San Blas",
            duration: "45 min",
            description:
              "Petit café niché dans une cour — thé de coca (~2 €), muffin quinoa-miel (~3 €) ou chicha morada (boisson au maïs violet, légèrement sucrée, riche en vitamine C). Asseyez-vous près de la fenêtre. La patronne, Valeriana, met des disques de charango. C'est l'arrêt récupération avant la vraie sieste à l'hôtel.",
            estimatedCost: "~8 €",
            transitFromPrev: "Sur place",
          },
          {
            name: "Cicciolina (dîner précoce)",
            area: "Centro Histórico",
            address: "Triunfo 393, 2ᵉ étage",
            duration: "1 h 30",
            description:
              "Fusion italo-andine au 1ᵉʳ étage colonial — partage style tapas. Carpaccio d'alpaga (~14 €) — oui, alpaga, plus maigre et plus doux que le bœuf, l'introduction tout en douceur ; salade burrata-rocoto ; pizza Cicciolina au feu de bois. Bougies + poutres apparentes + deux fenêtres ouvertes sur la cathédrale. Pas d'alcool en jour 1 à l'altitude — votre corps fait déjà des heures sup. Le pisco sour, ce sera demain.",
            estimatedCost: "~45 €/personne",
            bookingTip: "Réservez sur cicciolinacusco.com 1 semaine à l'avance ; petit bar gardé pour walk-ins.",
            transitFromPrev: "10 min à pied lentes en descente",
          },
        ],
      },
      {
        theme: "Cusco proprement dit",
        summary:
          "Plaza de Armas, cathédrale sur fondations incas, marché San Pedro pour le ceviche, temple du Soleil de Coricancha, Saqsayhuamán à l'heure dorée.",
        stops: [
          {
            name: "Plaza de Armas + Cathédrale de Cusco",
            area: "Centro Histórico",
            duration: "1 h 30",
            description:
              "Le cœur spirituel de l'Empire inca, repavé en cœur colonial espagnol. La Cathédrale (1559-1654) a été construite sur le temple inca Suntur Wasi — les Espagnols ont taillé des pierres incas pour les murs, on les voit en cours inférieur (andésite noire parfaite, sans mortier) sous le calcaire colonial. À l'intérieur : la « Cène » de 1755 où le Christ partage un cochon d'Inde (substitution typiquement andine validée par le Vatican). Audio-guide 5 €, 60 min.",
            estimatedCost: "~15 € entrée + audio",
            bookingTip: "Fermé les dimanches pour la messe. Ouverture 9 h = heure la plus calme.",
            transitFromPrev: "5 min à pied de l'hôtel",
          },
          {
            name: "Coricancha (Qorikancha) — temple du Soleil inca",
            area: "Avenida El Sol",
            duration: "1 h",
            description:
              "Le site inca le plus sacré — les murs étaient autrefois recouverts de 700 plaques d'or martelé que Pizarro a fait fondre en lingots en 1533. Les Espagnols ont construit le couvent Santo Domingo sur les murs incas survivants, ce qu'on voit aujourd'hui : la maçonnerie inca la plus parfaite au monde (pierres polies à la main, pas de carte de crédit qui passe entre) supportant une maçonnerie coloniale plus grossière. Le séisme de 1950 a effondré une grande partie du couvent ; les murs incas n'ont pas bougé. Il y a une métaphore là-dedans. 5 €.",
            estimatedCost: "~5 €",
            transitFromPrev: "10 min à pied vers le sud",
          },
          {
            name: "Mercado Central de San Pedro — déjeuner",
            area: "Mercado",
            duration: "1 h",
            description:
              "Le grand marché couvert de Cusco — les chicheríoas du fond proposent des menus (ceviche + truite grillée + chicha morada pour ~5 €) où les locaux mangent épaule contre épaule sur de longs bancs. La section légumes a 30+ variétés de pommes de terre (le Pérou en a 4 000 indigènes — oui, quatre mille) et du maïs de toutes les couleurs. Pas d'eau non bouteillée ; mais oui à la chicha morada. Les pickpockets travaillent ce marché — sac devant, pas de téléphone en poche arrière. Un jus d'orange pressé en sortie (~1 €).",
            estimatedCost: "~8 €",
            transitFromPrev: "10 min à pied vers l'ouest",
          },
          {
            name: "Pause hôtel + sieste",
            area: "Centro Histórico",
            duration: "1 h 30",
            description:
              "Jour 2 à 3 400 m — votre corps travaille plus que vous ne le pensez. Une sieste de 90 min compte plus qu'on ne croit. Les sites de l'après-midi sont plus haut que ceux du matin ; reposez-vous maintenant ou payez plus tard.",
            estimatedCost: "—",
            transitFromPrev: "10 min à pied retour",
          },
          {
            name: "Forteresse Saqsayhuamán",
            area: "Au-dessus de Cusco, flanc nord",
            duration: "2 h",
            description:
              "La forteresse inca à 200 m au-dessus de la ville — trois murs en zigzag de pierres cyclopéennes (certains blocs pèsent 100 tonnes ; personne n'a totalement expliqué comment les Incas les ont taillés et déplacés). La colline est à 3 700 m, allez-y doucement ; l'entrée monte 15 min. Du sommet, toute la vallée de Cusco est sous vous — à l'heure dorée, les toits de tuiles coloniaux rougeoient sur fond de crêtes vertes. Le « Suchuna » à côté est un toboggan en pierre — les enfants y glissent, parfois les adultes aussi. Billet combo : 25 € Boleto Turístico Integral. Taxi pour monter (~5 €) recommandé ; redescendez à pied vers San Blas (40 min).",
            estimatedCost: "~25 € billet combo",
            bookingTip: "Le Boleto Turístico couvre 16 sites valable 10 jours ; achetez au bureau COSITUC sur Avenida El Sol.",
            transitFromPrev: "Taxi 10 min en montée",
          },
          {
            name: "Chicha por Gastón Acurio",
            area: "Plaza Regocijo",
            address: "Plaza Regocijo 261, 2ᵉ étage",
            duration: "2 h",
            description:
              "L'antenne du chef Gastón Acurio à Cusco — il est à la cuisine péruvienne ce que Ferran Adrià est à l'espagnole. Anticuchos d'alpaga (brochettes en sauce rocoto, 14 €), trucha de Andes (ceviche de truite andine à la patate douce), et enfin un pisco sour (vous êtes acclimatés). La salle est à l'étage et donne sur la Plaza Regocijo de nuit, parquet acajou, nappes blanches, bougies. C'est le dîner cérémonial du voyage.",
            estimatedCost: "~70 €/personne avec boissons",
            bookingTip: "Réservez sur chicha.com.pe 3-5 jours à l'avance ; les tables côté fenêtre partent en premier.",
            transitFromPrev: "8 min à pied",
          },
        ],
      },
      {
        theme: "Vallée Sacrée — Pisac + Ollantaytambo",
        summary:
          "Descente de Cusco vers la Vallée Sacrée plus chaude. Terrasses et marché de Pisac le matin, déjeuner à Urubamba, ruines d'Ollantaytambo l'après-midi, dîner retour à Cusco.",
        stops: [
          {
            name: "Chauffeur privé Cusco → Pisac",
            area: "Descente Vallée Sacrée",
            duration: "1 h 30",
            description:
              "L'hôtel arrange un chauffeur-guide privé pour la journée (~220 € total, anglophone, 8 h, tous les arrêts + attente compris). La route descend par des villages quechua — vous croiserez des femmes tissant au métier à dos sur le bord de la route. Le Mirador de Taray à 3 300 m est un arrêt de 5 min que connaît le chauffeur : panorama complet sur la Vallée Sacrée en contrebas, Andes enneigées en cercle. L'altitude perd 600 m d'ici Pisac, c'est pourquoi cette journée est tellement plus facile que Cusco.",
            estimatedCost: "~220 € (chauffeur-guide journée 2 personnes)",
            transitFromPrev: "Pickup hôtel",
          },
          {
            name: "Terrasses incas de Pisac + marché du village",
            area: "Pisac",
            duration: "2 h",
            description:
              "Le site archéologique de Pisac est sur une crête au-dessus du village — terrasses agricoles incas descendant sur 600 m, temple du soleil (Intihuatana) au sommet, et le plus grand cimetière inca du Pérou taillé dans la falaise opposée (plus de 3 000 tombes, pillées en 1500). Roulez jusqu'à l'entrée haute, descendez par les terrasses, sortez au village. Le marché du village (mardi/jeudi/dimanche) c'est la vente directe par les tisserandes andines — écharpes alpaga 18 €, couvertures grand format 80-150 €, taureaux en céramique 10 €. Marchandez poliment (10-15 % de remise sur prix marqué = norme).",
            estimatedCost: "~25 € site (couvert par Boleto Turístico)",
            bookingTip: "Marché du dimanche le plus animé ; mardi plus de tisseuses, moins de touristes.",
            transitFromPrev: "Chauffeur",
          },
          {
            name: "Déjeuner Hacienda Sarapampa (Urubamba)",
            area: "Urubamba",
            duration: "1 h 30",
            description:
              "Ferme à maïs en activité avec restaurant en plein air — buffet de classiques andins : choclo (maïs géant) au fromage, cuy (cochon d'Inde — goûtez un morceau si curieux ; c'est la protéine andine historique), truite du ruisseau voisin, ragoût de quinoa, des dizaines de variétés de pommes de terre indigènes. ~30 €/personne buffet + boisson. L'épi de maïs de la variété d'Urubamba a vraiment la taille de votre avant-bras.",
            estimatedCost: "~30 €/personne",
            transitFromPrev: "Chauffeur, 30 min à l'ouest",
          },
          {
            name: "Ruines + village d'Ollantaytambo",
            area: "Ollantaytambo",
            duration: "2 h",
            description:
              "L'autre grand complexe inca de la Vallée Sacrée — et le seul site inca où les Incas ont gagné une bataille contre les Espagnols (résistance de Manco Inca, 1537). Les ruines escaladent une falaise en terrasses ; 200 marches en pierre mènent au Temple du Soleil au sommet, avec ses six monolithes de granite rose extraits d'une montagne de l'autre côté de la vallée et déplacés ici on ne sait comment. Le village d'Ollantaytambo en bas est la seule ville inca habitée en continu au monde — les rues suivent la grille inca d'origine, l'eau coule dans des canaux de pierre au milieu de chaque ruelle exactement comme conçu en 1450.",
            estimatedCost: "~25 € (Boleto Turístico)",
            transitFromPrev: "Chauffeur, 30 min à l'ouest",
          },
          {
            name: "Retour vers Cusco",
            area: "Vallée Sacrée → Cusco",
            duration: "1 h 30",
            description:
              "Le retour reprend 600 m d'altitude — vous le sentirez. Mangez la collation que le chauffeur a apportée, sirotez de l'eau. La lumière du soleil couchant sur les Andes vue par la vitre est spectaculaire. Pourboire 20-30 € au chauffeur-guide si bon (coutume).",
            estimatedCost: "Inclus dans le tarif chauffeur",
            transitFromPrev: "Chauffeur",
          },
          {
            name: "Limo Cocina Peruana (retour Cusco)",
            area: "Plaza de Armas",
            address: "Portal de Carnes 236, 2ᵉ étage",
            duration: "1 h 30",
            description:
              "Cuisine péruvienne moderne sur un balcon directement au-dessus de la Plaza de Armas — la cathédrale illuminée la nuit à travers les fenêtres = la photo. Ceviche de fruits de mer, lomo saltado (sauté de bœuf péruvien-chinois), tarte chocolat-quinoa. Pisco sour préparés à table. Plus calme que Cicciolina, plus poli que Chicha. ~50 €/personne.",
            estimatedCost: "~55 €/personne",
            bookingTip: "Réservez 2 jours à l'avance — tables balcon en premier.",
            transitFromPrev: "5 min à pied de l'hôtel",
          },
        ],
      },
      {
        theme: "Journée Machu Picchu",
        summary:
          "Le clou. Départ 4 h, train panoramique à travers la Vallée Sacrée, bus en lacets, visite guidée 3 h du Machu Picchu, déjeuner, train retour, dîner à Cusco.",
        stops: [
          {
            name: "Hôtel → gare d'Ollantaytambo (voiture privée)",
            area: "Cusco → Ollantaytambo",
            duration: "1 h 30",
            description:
              "Voiture préréservée (~80 €, l'hôtel s'en charge) part de l'hôtel pile 4 h. La boîte petit-déjeuner emportée par l'hôtel (15 € en supplément) est la bonne option — café en thermos, sandwich, fruits frais. La descente vers la Vallée Sacrée se fait dans la lumière d'avant l'aube ; vous croiserez des paysans quechua qui partent aux champs avec leurs bœufs. Arrivée gare d'Ollantaytambo 5 h 30 — 30 min avant le train de 6 h 10.",
            estimatedCost: "~80 €",
            transitFromPrev: "—",
          },
          {
            name: "PeruRail Vistadome → Aguas Calientes",
            area: "Rails de la Vallée Sacrée",
            duration: "1 h 30",
            description:
              "Le Vistadome de PeruRail est la classe maline pour un couple : fenêtres panoramiques ET panneaux de toit en verre, petit-déjeuner inclus à bord, musique andine live 20 min en deuxième heure. ~140 €/personne aller. La voie suit le rio Urubamba à travers la forêt nuageuse — la végétation change toutes les 15 minutes, du désert d'altitude à cactus à la jungle aux orchidées qui pendent. Arrivée Aguas Calientes 7 h 40.",
            estimatedCost: "~280 €/personne aller-retour",
            bookingTip: "Réservez sur perurail.com 2-3 mois à l'avance. Vistadome > Expedition (la classe moins chère) — ça vaut la différence.",
            transitFromPrev: "Embarquement",
          },
          {
            name: "Bus Aguas Calientes → entrée Machu Picchu",
            area: "Route en lacets",
            duration: "30 min",
            description:
              "Le bus « Consetur » zigzague 8 km en lacets pendant 25 min — assis à droite à la montée pour la vue rivière + nuages. 24 € aller-retour/personne, achat à la gare routière d'Aguas Calientes (en face de la gare). Les files avancent vite. La route a été construite par le neveu d'Hiram Bingham III en 1948 — avant ça, on marchait le Chemin de l'Inca.",
            estimatedCost: "~24 €/personne",
            transitFromPrev: "3 min à pied jusqu'à la gare routière",
          },
          {
            name: "Machu Picchu — visite guidée",
            area: "Citadelle + belvédère Porte du Soleil",
            address: "Machu Picchu Pueblo",
            duration: "3 h",
            description:
              "Votre hôtel a préréservé un guide licencié (60 €/personne, 3 h, anglais) — désormais obligatoire selon la réglementation MP de 2024. Les guides font le Circuit 2 (le classique) : à travers le secteur urbain bas, jusqu'à la Maison du Gardien pour la photo carte postale, par le Temple du Soleil, le Tombeau Royal, devant l'Intihuatana (« poteau d'attache du soleil », cadran solaire sacré). À 9 h 30 la brume du matin se lève et la cité émerge sous vos pieds — le moment qui vide les poumons. Le Sun Gate (Inti Punku) est une rando 5 € de plus + 90 min A/R, à faire seulement si endurance en altitude. Un lama va probablement squatter votre selfie. Eau, crème solaire, chapeau — le soleil équatorial à 2 400 m brûle vite.",
            estimatedCost: "~130 € entrée + ~60 € guide",
            bookingTip: "Réservez l'entrée sur machupicchu.gob.pe 60 jours à l'avance — Circuit 2 = parcours touristique standard. Nouvelles règles : créneaux d'entrée d'1 h spécifiques à réserver.",
            transitFromPrev: "5 min à pied jusqu'à l'entrée",
          },
          {
            name: "Buffet Sanctuary Lodge (ou ville en bas)",
            area: "Entrée Machu Picchu",
            duration: "1 h",
            description:
              "Le seul restaurant à l'entrée du Machu Picchu — buffet du Belmond Sanctuary Lodge, 50 €/personne, mais vous mangez face à la citadelle par les fenêtres. Sautez si le prix gêne ; bus + déjeuner à Aguas Calientes (Indio Feliz, 25 €, bon aussi) = moitié prix. Hydratez-vous sérieusement.",
            estimatedCost: "~50 €/personne (ou 25 € en ville)",
            transitFromPrev: "Sur place",
          },
          {
            name: "Bus descente + train retour Ollantaytambo",
            area: "Aguas Calientes → Ollantaytambo",
            duration: "2 h 30",
            description:
              "Bus 14 h 30 pour descendre (25 min), train PeruRail Vistadome à 15 h 20 depuis Aguas Calientes (1 h 30 jusqu'à Ollantaytambo). Paysage différent au retour : lumière dorée à travers la forêt nuageuse, moins de photographes. Sommeillez dans le siège sans culpabilité — vous l'avez mérité.",
            estimatedCost: "Aller-retour déjà réglé",
            transitFromPrev: "Sur place",
          },
          {
            name: "Voiture privée Ollantaytambo → Cusco",
            area: "Vallée Sacrée → montée Cusco",
            duration: "1 h 30",
            description:
              "Le chauffeur attend à la gare d'Ollantaytambo avec votre nom ; même arrangement que le matin (80 € l'aller). Remontée à 3 400 m — vous le sentirez. Couchez-vous tôt ; demain est court.",
            estimatedCost: "~80 €",
            transitFromPrev: "Pickup chauffeur",
          },
          {
            name: "Pacha Papa (San Blas — distance facile)",
            area: "San Blas, Cusco",
            address: "Plaza San Blas 120",
            duration: "1 h 30",
            description:
              "Restaurant patio décontracté à San Blas — dîner parfait pour le 4ᵉ jour, parce que vous êtes fatigués et voulez du péruvien simple. Pizza au four à bois (12 €), truite grillée (18 €), pisco sour. Patio ouvert avec murs en pierre + toit en tuiles d'argile, bougies. Option cochon d'Inde à la broche (25 €) si vous voulez l'expérience andine intégrale.",
            estimatedCost: "~30 €/personne",
            transitFromPrev: "5 min à pied de l'hôtel",
          },
        ],
      },
      {
        theme: "Matin Cusco + aéroport",
        summary:
          "Matinée tranquille, dernière sélection alpaga, espresso aux feuilles de coca, taxi vers CUZ.",
        stops: [
          {
            name: "Petit-déjeuner hôtel + matinée tranquille",
            area: "JW Marriott El Convento",
            duration: "1 h 30",
            description:
              "Petit-déjeuner dans le patio colonial — miel andin, œufs péruviens, jus frais de chirimoya (chérimole), thé de coca ou espresso aux feuilles de coca (oui, ça existe). Asseyez-vous au soleil. Check-out 12 h ; bagages à la réception jusqu'au départ.",
            estimatedCost: "Inclus",
            transitFromPrev: "—",
          },
          {
            name: "Centro Artesanal Cusco",
            area: "Avenida El Sol 603",
            duration: "1 h",
            description:
              "Le marché officiel des artisans — 200+ stands sous un toit, pulls en alpaga faits main (60-120 €), tentures (40-80 €), bijoux en argent des artisans de Cusco (30 €+). Qualité moyenne à haute ; marchandez 10-15 %. Méfiez-vous du label « baby alpaca » sur des pulls à 15 € en stand de rue — c'est de l'acrylique. Le vrai a du poids, une légère odeur huileuse de lanoline et un fini mat (pas brillant).",
            estimatedCost: "~80-150 € souvenirs",
            transitFromPrev: "10 min à pied vers le sud",
          },
          {
            name: "Café Morena (dernier déjeuner)",
            area: "Centro Histórico",
            address: "Plateros 348B",
            duration: "1 h",
            description:
              "Déjeuner léger — salade de quinoa à l'avocat, jus frais, peut-être un dernier pisco sour. Petit jardin à l'arrière si le patio à l'étage est plein. ~15 €/personne. Pas trop chargé ; le trajet aéroport + le vol arrivent.",
            estimatedCost: "~15 €/personne",
            transitFromPrev: "8 min à pied retour",
          },
          {
            name: "Transfert hôtel → aéroport CUZ",
            area: "Cusco → CUZ",
            duration: "30 min",
            description:
              "Chauffeur préréservé prend à l'hôtel (~30 €). CUZ est petit ; comptez 90 min avant un vol domestique pour sécurité + embarquement. La plupart des voyageurs internationaux connectent à Lima avec 90 min de transit. Achetez des chaussons en alpaga au duty-free de CUZ — même qualité qu'en ville, prix légèrement plus haut mais ça compte comme bagage cabine. Les bonbons aux feuilles de coca sont aussi un souvenir amusant (légaux en bagage soute ; techniquement illégaux à entrer aux US d'après la DEA, jamais appliqué aux voyageurs).",
            estimatedCost: "~30 € transfert",
            transitFromPrev: "Pickup hôtel",
          },
        ],
      },
    ],
    packingTips: [
      "Tenue en couches — Cusco passe de 5 °C le matin à 22 °C l'après-midi le même jour",
      "Chaussures de marche solides — chaque site inca a des marches en pierre irrégulières",
      "Chapeau à bord large + crème SPF 50 — le soleil équatorial en altitude brûle vite (oui, même par temps couvert)",
      "Gourde réutilisable + pastilles d'électrolytes — l'hydratation prévient le mal d'altitude",
      "Diamox (acétazolamide) sur ordonnance si problèmes d'altitude antérieurs — démarrer 24 h avant l'arrivée, demandez à votre médecin",
      "Cash en petites coupures de soles péruviennes pour les marchés (10 et 20)",
      "Veste de pluie légère — l'après-midi en Vallée Sacrée peut donner une averse même en saison sèche",
      "Appareil photo avec zoom — le téléphone rate la profondeur du Machu Picchu et le détail du marché des textiles",
    ],
    budgetEstimate: "~300-450 €/jour pour un couple hors hôtel (la journée Machu Picchu monte à ~700 € avec train + entrée + guide)",
    generalTips: [
      "L'altitude est réelle — premières 24 h : pas d'alcool, marche lente, beaucoup d'eau + thé de coca, repas légers",
      "Le Boleto Turístico (25 € / 10 jours) couvre 16 sites de la région de Cusco dont Saqsayhuamán, Pisac, Ollantaytambo — au bureau COSITUC",
      "Entrée Machu Picchu à pré-réserver 30-60 jours à l'avance sur machupicchu.gob.pe — guides désormais obligatoires (depuis 2024)",
      "Pourboire : 10 % au restaurant assis, 5 €/jour pour les guides, 20-30 € pour un chauffeur-guide privé toute la journée",
      "Utilisez UberX ou InDriver à Cusco pour les taxis — 2-4 € la course ; ne laissez jamais un taxi de rue donner un prix (truqué)",
      "Zika et dengue concernent la jungle ; Cusco est trop haut pour les moustiques, pas d'antipaludéen nécessaire",
      "L'assurance voyage avec couverture randonnée Machu Picchu est vraiment utile — un mal d'altitude peut nécessiter une évacuation",
      "Type de prise : A/B (US) ; tension 220 V — adaptateur nécessaire pour appareils chauffants",
    ],
  },
  "dubai-4d-couple": {
    tagline: "Quatre jours en couple — Burj Khalifa, souks du vieux Dubaï, safari désert, le Palm.",
    audience: "Couple · Tendance luxe",
    destination: "Dubaï",
    destinationCountry: "Émirats arabes unis",
    overview:
      "Quatre jours pour un couple qui veut les deux Dubaïs — la cité de verre futuriste du Burj Khalifa et le port de commerce en boutres bois du souk aux épices, séparés par 200 m de creek et 60 ans. Jour 1 : la grande messe moderne — terrasse d'observation du Burj, le plus grand mall du monde, le ballet de fontaines en bas. Jour 2 : traverser à Bur Dubai pour le quartier historique d'Al Fahidi, l'abra (petite barque-ferry), les souks de l'or et des épices où vous marchanderez du safran qui vaut le double chez vous. Jour 3 : disparition dans le désert — dune-bashing en 4×4, coucher de soleil, henné et café arabe sous les étoiles. Jour 4 : Palm Jumeirah — Atlantis, The View at the Palm, coucher de soleil sur la Marina avant le vol. Dubaï n'est pas subtil ; c'est précisément l'attrait.",
    bestSeasonNote:
      "Novembre à mars = la seule période sensée — 22-28 °C en journée, soirées fraîches. Avril : la chaleur monte. Mai-septembre : c'est dangereux pour de vrai (45 °C+, les locaux passent en intérieur intégral, activités extérieures uniquement à l'aube). Les dates du Ramadan changent chaque année — un mois culturellement merveilleux (les iftars du vieux Dubaï sont extraordinaires) mais restaurants restreints en journée, alcool réduit, code vestimentaire serré. Vérifiez les dates avant de réserver. Vendredi est jour férié aux EAU (samedi partiellement) ; les souks et musées ont des horaires modifiés ce jour-là.",
    currencyTip:
      "Dirham émirati (AED). 3,67 AED ≈ 1 USD (parité fixe). Cartes partout — Apple Pay, Google Pay, Visa, Amex. Gardez ~200 AED en cash pour les taxis (certains encore cash uniquement), le marchandage des souks et l'abra (1 AED par traversée — billets papier seulement au quai). Les bureaux de change du Dubai Mall ont de meilleurs taux que l'aéroport pour le cash.",
    languageTip:
      "L'arabe est officiel ; l'anglais universel dans les zones touristiques, hôtels, restaurants, taxis. « Shukran » (chou-krane) = merci. « Sabah al-khayr » = bonjour. Menus en anglais dans les endroits modernes, anglais+arabe dans les souks. Google Maps en arabe pour les noms de rues utile dans le vieux. Les langues sud-asiatiques (hindi, ourdou, tagalog) sont aussi très parlées — la main-d'œuvre est multinationale.",
    emergencyNumber: "999 (police, anglais courant), 998 (ambulance), 997 (pompiers)",
    hotel: {
      name: "Address Downtown Dubai",
      area: "Downtown Dubai, en face du Burj Khalifa",
      address: "Sheikh Mohammed Bin Rashid Boulevard, Downtown Dubai",
      rationale:
        "L'Address Downtown est directement sur le lac du Burj — votre chambre a vue sur le Burj Khalifa et vous regardez le ballet de fontaines 8 fois dans la soirée depuis le balcon. Le Dubai Mall est relié par une passerelle privée (5 min couverte), le Burj Khalifa est de l'autre côté du lac, le métro Burj Khalifa/Dubai Mall à 10 min à pied. Trois piscines, un excellent buffet petit-déjeuner, le bar Neos sur le toit au 63ᵉ étage. Chambres à 400 €+/nuit en haute saison, descendent à 280 € en intersaison et week-end ; réservez via Marriott Bonvoy si vous avez un statut.",
      estimatedNightlyRate: "~320 €/nuit",
    },
    airportTransit: {
      method: "Métro Dubai Red Line (DXB Terminal 1/3 → Burj Khalifa/Dubai Mall) ou taxi",
      duration: "~45 min métro / ~25 min taxi",
      cost: "~3 € métro / ~22 € taxi",
      instructions:
        "Depuis DXB, le métro Red Line est étonnamment simple — Terminaux 1 et 3 ont chacun une station dans l'aéroport. Achetez un « Nol Red Ticket » (10 AED, illimité une journée sur Red Line). 25 min jusqu'à Burj Khalifa/Dubai Mall, puis 10 min à pied jusqu'à l'hôtel par la galerie climatisée. Avec beaucoup de bagages ou après minuit, taxi officiel (22 € au compteur, ~25 min) sans friction. Évitez les rabatteurs « limo » dans le terminal — ils facturent 3× le tarif du compteur. Uber et Careem fonctionnent aussi mais avec la majoration aux heures de pointe = équivalent au taxi. Eau gratuite à chaque station.",
    },
    days: [
      {
        theme: "Le grand show du Dubaï moderne",
        summary:
          "Atterrir, s'installer, monter au Burj pour la plus haute vue urbaine sur Terre, parcourir le plus grand mall du monde, voir le ballet de fontaines depuis le lac — Dubaï 101 en un après-midi et soirée.",
        stops: [
          {
            name: "Check-in Address Downtown",
            area: "Downtown Dubai",
            duration: "1 h",
            description:
              "Posez les bagages, demandez une chambre vue Burj Khalifa (demandez, ne supposez pas — « fountain view » est l'expression magique qui souvent vous donne les deux). Dattes de bienvenue et café arabe au lobby. Le pont piscine offre 270° de vue sur le Burj si vous voulez une réinitialisation de 30 min avant de sortir.",
            estimatedCost: "—",
            transitFromPrev: "Métro/taxi depuis DXB",
          },
          {
            name: "Burj Khalifa — At the Top SKY (148ᵉ étage)",
            area: "Burj Khalifa",
            address: "1 Mohammed Bin Rashid Blvd",
            duration: "1 h 30",
            description:
              "Le billet « At the Top SKY » (~150 €) c'est le luxe — 148ᵉ étage à 555 m, terrasse extérieure (il y a du vent à cette hauteur, vestes recommandées même l'été), salon privé avec rafraîchissements, ascenseur prioritaire. Le standard « At the Top » (55 €) ne donne que le 124ᵉ — la vue est à 90 % la même, mais sans terrasse extérieure. Calez l'horaire 30 min avant le coucher de soleil. Curieusement les photos sortent mieux du 124 que du 148 — plus proche du détail des bâtiments en bas.",
            estimatedCost: "~150 €/personne SKY (ou 55 € standard)",
            bookingTip: "Réservez sur burjkhalifa.ae 2 semaines à l'avance — créneaux coucher partent vite. Ou via le canal jour-J de l'hôtel (l'Address Downtown a des entrées SKY allouées).",
            transitFromPrev: "5 min à pied via la connexion Dubai Mall",
          },
          {
            name: "Dubai Mall — aquarium, patinoire, extension du souk de l'or",
            area: "Dans le Dubai Mall",
            address: "Financial Centre Rd",
            duration: "1 h 30",
            description:
              "1 200 boutiques sous un seul toit. L'aquarium (gratuit à voir de l'extérieur, 40 € pour le passage piéton) a le plus grand panneau acrylique au monde. La patinoire taille olympique au milieu est surréelle dans un Dubaï à 35 °C. L'« extension du souk de l'or » niveau 1 est le commerce moderne de l'or. N'essayez pas de tout faire — choisissez 2-3 enseignes qui vous tiennent à cœur, puis dérivez par la sortie promenade des Dancing Fountains vers le lac.",
            estimatedCost: "Gratuit sauf achats",
            transitFromPrev: "Sur place (le mall connecte au Burj)",
          },
          {
            name: "Time Out Market Dubai (food hall)",
            area: "Souk Al Bahar (de l'autre côté du lac)",
            duration: "1 h",
            description:
              "17 des meilleurs chefs de Dubaï dans un food hall ouvert au 2ᵉ étage du Souk Al Bahar — directement face au Burj Khalifa de l'autre côté du lac aux fontaines. Plats de 12 à 25 €, on commande à plusieurs stands et on partage. Bol uni de « Reif Japanese Kitchen », burger « Pickl » (le smash burger préféré de Dubaï), mezze libanais « Bait Maryam ». Terrasse extérieure face au Burj — vous mangez avec le show.",
            estimatedCost: "~50-60 € pour deux",
            transitFromPrev: "10 min à pied par la promenade lacustre",
          },
          {
            name: "Ballet de fontaines de Dubaï",
            area: "Lac du Burj",
            duration: "30 min",
            description:
              "Fontaines chorégraphiées sur 30 acres au pied du Burj — jets jusqu'à 150 m de hauteur, chorégraphiés sur de l'arabe, du Bollywood, de la pop. Gratuit, toutes les 30 min de 18 h à 23 h. Meilleurs points : le pont entre le mall et le Souk Al Bahar (au sol, vous sentez les embruns) ou la terrasse lacustre de l'Address Downtown (en hauteur, le Burj derrière). Chaque show a une musique différente ; restez pour deux.",
            estimatedCost: "Gratuit",
            transitFromPrev: "5 min à pied jusqu'au pont",
          },
          {
            name: "Bar Neos sur le toit (63ᵉ étage de l'Address Downtown)",
            area: "Address Downtown",
            duration: "1 h",
            description:
              "Bar à cocktails au 63ᵉ — le Burj Khalifa remplit toute la baie vitrée, illuminé la nuit. Cocktails à 30 € (Dubaï est friendly avec l'alcool mais les prix sont raides — uniquement dans des établissements licenciés, tous attachés à un hôtel). Commandez le « Persian Garden » (eau de rose + safran + gin). Dress code smart-casual. Le personnel de l'Address connaît l'horaire des fontaines — asseyez-vous pour la finale à 22 h.",
            estimatedCost: "~60 € pour deux cocktails",
            transitFromPrev: "Sur place (hôtel)",
          },
        ],
      },
      {
        theme: "Vieux Dubaï — Al Fahidi, abra, souks",
        summary:
          "Traverser le creek vers le Bur Dubai historique — quartier des tours à vent, petit ferry en bois, souk de l'or, souk des épices, déjeuner sur l'eau.",
        stops: [
          {
            name: "Métro Red Line → station Al Fahidi",
            area: "Downtown → Bur Dubai",
            duration: "30 min",
            description:
              "Depuis Burj Khalifa/Dubai Mall, Red Line nord jusqu'à BurJuman (correspondance Green Line), un arrêt jusqu'à Al Fahidi. ~30 min total, ~2 €/personne. Le « Gold Class » (voiture de tête) est vide même aux heures de pointe — 2 AED de plus qui valent. Évitez la première voiture « Femmes et enfants uniquement » si vous êtes en couple.",
            estimatedCost: "~3 €/personne",
            transitFromPrev: "Métro depuis la station hôtel",
          },
          {
            name: "Quartier historique d'Al Fahidi",
            area: "Bur Dubai",
            duration: "1 h 30",
            description:
              "Le plus ancien quartier debout de Dubaï — maisons en blocs de corail à tours à vent (la clim originelle, 1850), ruelles à sol de sable, le bait al-fahidi traditionnel au centre. Le Sheikh Mohammed Centre for Cultural Understanding fait une excellente visite guidée à pied (20 €, 1 h 30) avec petit-déjeuner émirati traditionnel inclus — réservez 1 jour à l'avance sur culturalfoundation.ae. Le Coffee Museum et le Coin Museum sont des escales annexes gratuites. Contraste total avec le jour 1.",
            estimatedCost: "~20 € visite SMCCU",
            transitFromPrev: "10 min à pied depuis la station",
          },
          {
            name: "Traversée en abra (petit ferry en bois)",
            area: "Dubai Creek",
            duration: "15 min",
            description:
              "L'expérience la plus charmante du Dubaï moderne — 1 AED (oui, 27 cents) sur un bateau en bois style années 1950 pour traverser le creek vers Deira. Départs en continu du quai abra de Bur Dubai, part quand plein (5 min d'attente). 23 passagers, capitaine à la barre en bois. Brise fraîche sur le creek même en été. Payez cash au capitaine après embarquement.",
            estimatedCost: "~0,27 €/personne aller",
            transitFromPrev: "5 min à pied jusqu'au quai Bur Dubai",
          },
          {
            name: "Souk des épices + Souk de l'or (Deira)",
            area: "Côté Deira du creek",
            duration: "1 h 30",
            description:
              "Le souk des épices d'abord (plus petit, plus agréable) — safran à 4 €/g (vs 12 € chez vous), zaatar au kilo, résine d'encens, pétales de rose séchés pour le thé. Puis le souk de l'or — 380 commerçants vendant de l'or 18-22-24 carats au poids (cours spot + petite façon). Même sans acheter, traversez ; c'est LA photo de Dubaï. Ne photographiez pas les acheteuses sans permission. Marchandez 15-20 % au souk des épices ; l'or est à prix fixe au poids.",
            estimatedCost: "Variable",
            bookingTip: "Plus tôt (10 h) plus calme ; l'après-midi amène acheteurs indiens + philippins et l'énergie double.",
            transitFromPrev: "5 min à pied du quai abra de Deira",
          },
          {
            name: "Bait Al Wakeel — déjeuner sur le creek",
            area: "Bur Dubai (retour traversée)",
            address: "Cnr 53A St & 53 St",
            duration: "1 h 30",
            description:
              "Le tout premier restaurant de Dubaï (1935), construit directement sur le creek sur pilotis bois — les abras passent sous vous. Fruits de mer émirati-iraniens : mérou grillé (28 €), assiette shawarma, riz machboos. Déjeuner avec charme bois 1930 et brise du creek. Reprenez un abra pour rentrer après.",
            estimatedCost: "~70 € pour deux",
            bookingTip: "Réservez via zomato.com 1 jour à l'avance — tables terrasse face au creek.",
            transitFromPrev: "Abra retour Bur Dubai (1 AED)",
          },
          {
            name: "Pause hôtel + piscine de l'Address",
            area: "Address Downtown",
            duration: "2 h",
            description:
              "Le vieux Dubaï est poussiéreux + chaud même en hiver ; un après-midi à la piscine de l'Address (vue 270° sur le Burj) est la réinitialisation parfaite. Commandez un citron-eau de rose ; le pool butler existe et le porte. Douche soignée avant le dîner — le sable de Dubaï se loge partout.",
            estimatedCost: "Piscine de l'hôtel",
            transitFromPrev: "Métro retour, 30 min",
          },
          {
            name: "Al Mahara au Burj Al Arab (ou Pierchic en alternative)",
            area: "Jumeirah",
            duration: "2 h",
            description:
              "Le dîner une-fois-dans-le-voyage — Al Mahara dans le Burj Al Arab en forme de voile, autour d'un aquarium sol-au-plafond sur 3 étages. Menu dégustation 250 €+/personne, dress code intégral (veste pour les hommes). Si c'est trop, Pierchic est l'alternative élégante — fruits de mer modernes au bout d'une promenade en bois sur le golfe Arabique, moitié prix, même vue sur le Burj Al Arab au loin. L'un ou l'autre = la photo du voyage.",
            estimatedCost: "~300 €/personne Al Mahara, ~120 € Pierchic",
            bookingTip: "Le Burj Al Arab demande une résa 2 semaines à l'avance + respect strict du dress code ; Pierchic accepte 3 jours à l'avance.",
            transitFromPrev: "Taxi 25 min, ~30 €",
          },
        ],
      },
      {
        theme: "Safari désert",
        summary:
          "Pickup à 14 h 30 pour un safari désert en soirée — dune bashing, dromadaire, coucher de soleil, dîner BBQ sous les étoiles avec danse du ventre. L'expérience signature hors-ville de Dubaï.",
        stops: [
          {
            name: "Matinée tranquille — petit-déjeuner hôtel + spa",
            area: "Address Downtown",
            duration: "3 h",
            description:
              "Faites la grasse mat'. Le buffet petit-déjeuner de l'Address Downtown court jusqu'à 11 h — mezze arabe, jus frais, œufs à la commande, coin dattes-et-miel. Réservez un soin spa en couple le matin (150-250 €) — massage safran-rose c'est l'option thématique Dubaï, 60 min, vous laisse désossés avant le désert.",
            estimatedCost: "Spa optionnel ~200 €",
            transitFromPrev: "—",
          },
          {
            name: "Pickup safari (Platinum Heritage ou Arabian Adventures)",
            area: "Hôtel → Dubai Desert Conservation Reserve",
            duration: "1 h de route",
            description:
              "Deux opérateurs sérieux : Platinum Heritage (le plus luxe, vintage Land Rover, axé conservation, ~200 €/personne) ou Arabian Adventures (luxe mainstream, 4×4 modernes, ~130 €/personne). Les deux pickup au lobby. Une heure à l'est jusqu'à la Dubai Desert Conservation Reserve (paysage de dunes protégé, pas un parc à thème bédouin).",
            estimatedCost: "~130-200 €/personne",
            bookingTip: "Réservez sur platinum-heritage.com ou arabianadventures.com 5-7 jours à l'avance.",
            transitFromPrev: "Pickup hôtel",
          },
          {
            name: "Dune bashing — 4×4 sur les dunes rouges",
            area: "Dubai Desert Conservation Reserve",
            duration: "45 min",
            description:
              "Le chauffeur dégonfle les pneus, puis trace les dunes à 60 km/h — glissades latérales, sommets, descente en piqué d'une face raide. Légèrement écœurant mais spectaculaire ; placez-vous au fond si l'estomac est sensible. Pause photo sur la haute dune à 16 h 30 — lumière dorée sur sable rouge, désert qui s'étend. Si vous êtes anxieux, Platinum Heritage propose une « Conservation Drive » apaisée avec le même paysage et zéro angle extrême.",
            estimatedCost: "Inclus",
            transitFromPrev: "Sur place",
          },
          {
            name: "Balade à dromadaire + coucher de soleil",
            area: "Camp bédouin",
            duration: "1 h",
            description:
              "Courte balade à dromadaire (10 min, caravane à la file sur la crête d'une dune) — la photo. Puis tout le monde descend et trouve un coin sur le sable pour le coucher. La ligne de dunes à 17 h 30 en hiver est l'un des plus beaux couchers que vous verrez — le sable passe d'orange à rose à violet en 20 minutes. Henné au camp (10 €), café arabe + dattes gratuits.",
            estimatedCost: "~10 € henné optionnel",
            transitFromPrev: "Sur place",
          },
          {
            name: "Dîner BBQ bédouin sous les étoiles",
            area: "Camp désert",
            duration: "2 h",
            description:
              "Buffet plein air au camp — shawarma d'agneau, poulet grillé, houmous, fattoush, baklava, dattes fraîches, thé à la menthe. Mangez assis sur des coussins autour de tables basses. Après le dîner : danse Tanoura folklorique (façon derviche tourneur) et oud (luth arabe) live. Levez les yeux : le désert est assez loin des lumières de la ville pour que la Voie lactée soit visible par nuit claire, dramatique avec la silhouette des dunes. La plupart des opérateurs offrent une session astro brève si le ciel est clair.",
            estimatedCost: "Inclus dans le tarif safari",
            transitFromPrev: "Sur place",
          },
          {
            name: "Retour à l'hôtel",
            area: "Désert → Downtown",
            duration: "1 h",
            description:
              "Trajet somnolent. Hôtel à 22 h 30. Douche rapide (le sable est partout) et au lit ; le 4ᵉ jour est complet.",
            estimatedCost: "Inclus",
            transitFromPrev: "Dépose camp",
          },
        ],
      },
      {
        theme: "Palm Jumeirah + Marina + envoi",
        summary:
          "Atlantis le matin, The View at the Palm à midi, déjeuner à la Marina, dernier shopping, taxi vers DXB.",
        stops: [
          {
            name: "Atlantis The Palm — parc Aquaventure ou Lost Chambers Aquarium",
            area: "Palm Jumeirah crescent",
            address: "Crescent Rd, The Palm Jumeirah",
            duration: "2 h 30",
            description:
              "Atlantis est le complexe rose corail iconique au bout de la Palm Jumeirah. Deux blockbusters : (a) Aquaventure parc aquatique — toboggans, rivière paresseuse, le « Leap of Faith » presque vertical ; pass journée 90 €/personne, recommandé aux fans d'eau. (b) Lost Chambers Aquarium — 65 000 poissons en parcours piéton, 40 €/personne, plus cool si vous voulez 90 minutes d'expérience. Gardez le parc aquatique pour un séjour plus long ; Lost Chambers est calibré pour la demi-journée.",
            estimatedCost: "~40 € (Lost Chambers) ou 90 € (Aquaventure)",
            bookingTip: "Achetez en ligne pour 10 % de réduction ; réservez le déjeuner Nobu Atlantis si vous faites le parc aquatique.",
            transitFromPrev: "Taxi 25 min, ~25 €",
          },
          {
            name: "The View at The Palm (52ᵉ étage)",
            area: "Palm Tower (tronc du Palm)",
            duration: "1 h",
            description:
              "Plate-forme d'observation à 240 m au sommet de Palm Tower — la meilleure vue sur la forme signature de la Palm Jumeirah (on ne voit la disposition en palmier que d'ici). Terrasse extérieure plus expo musée sur la conquête des terres de Dubaï. 25 €/personne, beaucoup moins cher que le Burj. La journée est bien ; le soir aussi est dramatique mais le Palm ne s'éclaire pas comme Downtown la nuit.",
            estimatedCost: "~25 €/personne",
            bookingTip: "Réservez sur theviewpalm.ae 1 jour à l'avance ; les créneaux midi ont l'air le plus net.",
            transitFromPrev: "Taxi 8 min depuis Atlantis",
          },
          {
            name: "Pier 7 Marina — déjeuner sur l'eau",
            area: "Dubai Marina",
            duration: "1 h 30",
            description:
              "Pier 7 est une tour-restaurant 7 étages au bord de la marina — choisissez l'étage par cuisine, tous ont vue intégrale. « Asia Asia » (niveau 3) pour le pan-asiatique, « Atelier M » (niveau 7) pour la fine cuisine franco-méditerranéenne, « Cargo » (niveau 1) pour le gastropub. Déjeuner niveau 3 avec yachts sur trois côtés. ~80 € pour deux avec un cocktail chacun. Après, marchez la Marina Walk (promenade bordée de palmiers, 7 km) 30 min.",
            estimatedCost: "~80 € pour deux",
            bookingTip: "Walk-in OK en semaine au déjeuner ; réservez vendredi/samedi.",
            transitFromPrev: "Taxi 12 min depuis The View",
          },
          {
            name: "Marina Walk + derniers souvenirs",
            area: "Dubai Marina",
            duration: "1 h",
            description:
              "Marchez la marina, jetez un œil aux affréteurs de yachts, prenez une kunafa chez Firas Sweets (8 €) ou un café au safran chez % Arabica. Derniers souvenirs au Marina Mall (plus petit que Dubai Mall, plus ciblé) : dattes Bateel (25 €/coffret, le standard du cadeau dubaïote), chocolats Patchi (30 €), si ça vous va, échantillon parfum oud Bvlgari (15 €).",
            estimatedCost: "~50 € souvenirs",
            transitFromPrev: "À pied le long de la marina",
          },
          {
            name: "Hôtel récup' bagages + se rafraîchir",
            area: "Address Downtown",
            duration: "1 h",
            description:
              "Taxi vers l'Address (~25 €, 25 min). Late check-out arrangé à la résa (ils acceptent généralement jusqu'à 17-18 h). Douche rapide, repack. Dernier ballet de fontaines depuis le balcon côté lac à 18 h — au revoir digne.",
            estimatedCost: "~25 € taxi",
            transitFromPrev: "Taxi depuis Marina",
          },
          {
            name: "Hôtel → aéroport DXB",
            area: "Downtown → DXB",
            duration: "30 min",
            description:
              "Taxi depuis le rang hôtel (~22 €, 25 min). Comptez 3 h pour un départ international. Le duty-free de DXB est exceptionnel — dattes Bateel de dernière minute, safran, Mac, parfums oud. Connectez le WiFi gratuit et commandez en ligne pour livraison airport si vous avez oublié quelque chose. Aéroport hub — votre porte est sans doute à 15 min à pied de la sécurité.",
            estimatedCost: "~22 € taxi",
            transitFromPrev: "Pickup hôtel",
          },
        ],
      },
    ],
    packingTips: [
      "Couches légères — 26 °C en journée, 18 °C en clim dans malls/restaurants, contraste fort",
      "Tenue couvrante pour les femmes dans les souks et le vieux Dubaï (genoux + épaules) — non strict mais plus confortable",
      "Lunettes de soleil + chapeau — UV fort même en hiver",
      "Sandales + chaussures fermées (le sable s'infiltre dans les chaussures ouvertes au safari)",
      "Maillot de bain — la culture piscine est immense",
      "Tenue smart-casual — au moins une pour Burj Al Arab/Pierchic (veste pour les hommes)",
      "Gourde réutilisable — points d'eau dans le métro et les malls",
      "Adaptateur Type G (3 broches UK)",
    ],
    budgetEstimate: "~400-700 €/jour pour un couple hors hôtel (Dubaï est cher : 50 € le déj' au mall, 35 € le cocktail, 200 €+ les menus dégustation ; le safari désert est le plus gros poste unique)",
    generalTips: [
      "Démonstrations publiques d'affection au-delà de la main = techniquement illégales — la discrétion est la norme",
      "Alcool uniquement dans des établissements sous licence hôtel ; transporter de l'alcool dans la rue est illégal — taxi entre hôtel et dîner",
      "Vendredi est le jour religieux — souks ouvrent plus tard (après 16 h), certains musées fermés",
      "Pourboire : 10-15 % au resto si non inclus ; 5-10 AED pour arrondir le taxi ; 20 €+ pour un guide",
      "Le métro est excellent et bon marché ; évitez le taxi en heure de pointe (16 h 30-19 h) — Sheikh Zayed Road devient un parking",
      "Règles Ramadan (si dates concernées) : pas de boire/manger en public 5 h 30-18 h 30 hors zones touristiques ; hôtels touristiques exemptés",
      "Vol de drone réglementé ; demandez avant de photographier femmes, bâtiments officiels, militaires",
      "Détaxe TVA : 5 % remboursables sur achats > 250 AED dans les boutiques participantes — à traiter à DXB avant la sécurité",
    ],
  },
};

export default fr;
