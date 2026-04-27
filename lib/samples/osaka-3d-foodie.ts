import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Osaka, 3 days, solo foodie, midrange.
 *
 * Osaka calls itself "Japan's kitchen" — this plan leans all the way into
 * that, with takoyaki, okonomiyaki, kushikatsu, and a Kuromon Market
 * morning. Hand-curated; all stops are real and well-known. Text fields
 * are intentionally enriched beyond typical API output — samples are the
 * conversion surface.
 */
const osaka3dFoodie: TripPlan = {
  destination: "Osaka",
  destinationCountry: "Japan",
  durationDays: 3,
  overview:
    "Three days for a solo traveler who came to eat. Osaka is Japan's kitchen — where the phrase kuidaore (to eat yourself to ruin) was coined. This plan moves you through Dotonbori's neon-lit food alleys, a proper market breakfast, and a day in Kyoto for temple contrast before you return for one last yakitori night. If Tokyo is a suit and tie, Osaka is a Hawaiian shirt and shorts — louder, friendlier, the city that wipes its mouth on its apron.",
  bestSeasonNote:
    "April for cherry blossoms at Osaka Castle park, or late October for comfortable walking weather and fall colors. Avoid Japanese Golden Week (late April–early May) — domestic travel spikes prices. The Tenjin Matsuri (July 24–25) is Osaka's biggest summer festival — hundreds of lantern-boats parading + fireworks; if you catch it, book hotels 2 months ahead. December's Christmas illuminations along Midōsuji-dōri stretch from Umeda to Namba — 2km of golden light corridor.",
  currencyTip:
    "Cash is still king for small restaurants and Dotonbori stall vendors. Pull ¥20,000–¥30,000 from a 7-Eleven ATM on arrival. Major chains accept cards and IC transit cards. ICOCA is Osaka's version of Suica — pick one up at the green JR window on arrival for ¥2,000 (¥1,500 balance + ¥500 refundable deposit), it solves trains, buses, and even some vending machines.",
  languageTip:
    "Fewer English menus than Tokyo. Learn 'kore o kudasai' (this one, please) and point — it's how locals often order too. Google Translate camera mode is your friend; download the Japanese offline pack first. 'Oishii!' (delicious!) makes any Osaka shop owner's day. Locals speak Kansai-ben (Kansai dialect), slightly different from standard Japanese, but Translate handles it fine.",
  emergencyNumber: "110 (police), 119 (ambulance/fire)",
  hotel: {
    name: "Cross Hotel Osaka",
    area: "Shinsaibashi",
    address: "2-5-15 Shinsaibashi-suji, Chuo Ward, Osaka 542-0085",
    coords: [135.5017, 34.6724],
    rationale:
      "Shinsaibashi puts you five minutes' walk from Dotonbori, four minutes from the subway, and inside a covered shopping arcade so you never get rained on. Rooms are compact but well-designed, each with its own bathtub and a Dyson hair dryer. The lobby café 'The Kitchen Salvatore Cuomo' stays open till 23:00, perfect for a late wine after the food crawl. Mikimoto skincare amenities — Japanese hospitality detail dialed up.",
    priceTier: "$$",
    estimatedNightlyRate: "~$120/night",
  },
  airportTransit: {
    method: "Nankai Rapi:t or JR Haruka → Shin-Osaka → subway",
    duration: "~60 minutes",
    cost: "~$15 one-way",
    instructions:
      "From Kansai International (KIX), take the Nankai Rapi:t limited express directly to Namba (~40 min). Transfer to the Midosuji subway one stop to Shinsaibashi; the hotel is a 5-minute walk. The Nankai foreigner-only Rapi:t + ICOCA bundle saves ~$4. JR Haruka to Shin-Osaka adds 15 minutes of subway and isn't recommended unless you're arriving from Kyoto. After last train at 23:30, airport bus (~$8, 1 hour) or Uber (~$50).",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Dotonbori crawl",
      summary:
        "Arrive, drop bags, and go straight into the neon belly of Osaka. Takoyaki, okonomiyaki, river lights, and a late-night ramen.",
      stops: [
        {
          order: 1,
          time: "14:00",
          type: "sight",
          name: "Dotonbori canal + Glico sign",
          area: "Dotonbori",
          coords: [135.5012, 34.6687],
          duration: "45 min",
          description:
            "Stand on the Ebisu-bashi bridge and take the Glico running-man photo that every Japanese travel guide uses for its Osaka chapter. The Glico Co. has had this sign here since 1935 — 6 generations of refresh, but the runner stays. It's touristy and unavoidable — do it once, then walk the canal: overhead, the giant moving crab (Kani Doraku, the legs actually move), the fugu sign (Zuboraya, closed since 2020 but the sign stays), the giant sushi sign in a row — Osaka's obsession with 3D signage is heritage culture.",
          estimatedCost: "Free",
          transitFromPrev: "5 min walk from hotel",
        },
        {
          order: 2,
          time: "15:00",
          type: "meal",
          name: "Takoyaki Wanaka Sennichimae",
          area: "Dotonbori",
          address: "11-19 Namba Sennichimae, Chuo Ward",
          coords: [135.5028, 34.6666],
          duration: "30 min",
          description:
            "Takoyaki done right — crispy outside, molten octopus-and-dashi inside that bursts with the first bite. Wanaka is old-school, cheap, and still packed with locals. Get the classic 8-piece with sauce, mayo, bonito, and aonori — that's the sacred combo. The bonito flakes dance from the heat — that's what 'odoru hana' (dancing flowers) means. One bite and the chewy octopus + savory batter + sweet seaweed = you immediately understand why an Osaka native would never eat Tokyo's takoyaki. Caution: 100°C straight from the griddle, blow for 3 seconds before you bite.",
          estimatedCost: "~$6",
          transitFromPrev: "5 min walk",
        },
        {
          order: 3,
          time: "16:00",
          type: "shopping",
          name: "Shinsaibashi-suji arcade",
          area: "Shinsaibashi",
          coords: [135.5015, 34.6710],
          duration: "1 hour",
          description:
            "600 meters of covered shopping running from Dotonbori to Shinsaibashi. Drugstores, fashion, cafés, and discount electronics. Use it to digest before the next meal. 'Tamade' supermarket sells discounted bento (half-off after 20:00). Three-star recs: Daimaru 7th floor 'Eikokuya' — Osaka's old-school Scottish tartan store, $40 scarf as a gift. 'ABC-MART Osaka Shinsaibashi flagship' is one of Japan's largest shoe stores — Onitsuka Tiger and New Balance run 30% cheaper than back home.",
          estimatedCost: "Free",
          transitFromPrev: "8 min walk",
        },
        {
          order: 4,
          time: "18:00",
          type: "meal",
          name: "Mizuno Okonomiyaki",
          area: "Dotonbori",
          address: "1-4-15 Dotonbori, Chuo Ward",
          coords: [135.5004, 34.6683],
          duration: "1 hour",
          description:
            "A Michelin Bib Gourmand okonomiyaki shop since 1945. Order the Yamaimo-yaki (their signature) — yam makes the batter fluffier than anywhere else, almost no flour. The chef cooks it on the teppan in front of you: pork, octopus, squid, egg, shredded cabbage, yam batter layered up, flipped, pressed flat, sauced, bonito and aonori sprinkled. 8 minutes, served at peak heat. $12 a portion. Some okonomiyaki devotees fly in just for this. Cold beer ($4).",
          estimatedCost: "~$15",
          bookingTip: "No reservations. Expect 20-30 min queue at peak — use the time to walk the canal once. Closed Wednesdays.",
          transitFromPrev: "5 min walk",
        },
        {
          order: 5,
          time: "20:30",
          type: "sight",
          name: "Hozenji Yokocho lantern alley",
          area: "Namba",
          coords: [135.5019, 34.6676],
          duration: "30 min",
          description:
            "A 50-meter cobbled alley of paper lanterns and tiny izakayas right next to Hozenji Temple. The moss-covered Fudo Myo-o stone statue at the temple has had water poured over it by the faithful for centuries — it now looks like a pudgy green moss creature. You pour your own ladle of water and make a wish. The alley is only 2 meters wide, the bars hold 8–10 seats — the 'oldest bar street in Japan' that's run since the early 1900s. Photos by day, drinks by night — two different worlds.",
          estimatedCost: "Free",
          transitFromPrev: "3 min walk",
        },
        {
          order: 6,
          time: "22:00",
          type: "meal",
          name: "Kinryu Ramen (Dotonbori)",
          area: "Dotonbori",
          coords: [135.5009, 34.6685],
          duration: "30 min",
          description:
            "The giant green dragon ramen spot open until dawn — undisputed #1 late-night ramen in Osaka, 24 hours a day. Tonkotsu-shoyu broth, unlimited kimchi and garlic chives at the table. $8 a bowl, absolute therapy at 2am. You will smell like garlic for 24 hours. Worth it. The image of 'sitting under the giant dragon, slurping ramen' is the soul of an Osaka night. Go at 3am and you might cross paths with the Kabukicho hostesses on their break.",
          estimatedCost: "~$9",
          transitFromPrev: "3 min walk",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Day trip to Kyoto",
      summary:
        "A 30-minute train swap brings you to Japan's old capital. Fushimi Inari at dawn, a ryokan lunch, and back to Osaka before the evening rush.",
      stops: [
        {
          order: 1,
          time: "07:30",
          type: "transit",
          name: "JR Special Rapid → Kyoto",
          area: "Shin-Osaka → Kyoto Station",
          coords: [135.7581, 34.9858],
          duration: "30 min",
          description:
            "Take the JR Kyoto line Special Rapid service from Shin-Osaka direct to Kyoto. Sit on the right for Mt. Ibuki views on clear days. No Shinkansen needed (faster but 5× the price). At the Shin-Osaka konbini, grab an onigiri ($1) and coffee for breakfast on the train. Kyoto Station itself is an architectural marvel — Hara Hiroshi's 1997 design, the main hall's stairs unfold like clouds, free observation deck on top.",
          estimatedCost: "~$5",
          transitFromPrev: "Subway from Shinsaibashi → Shin-Osaka, ~15 min",
        },
        {
          order: 2,
          time: "08:30",
          type: "sight",
          name: "Fushimi Inari Taisha",
          area: "Fushimi",
          address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
          coords: [135.7727, 34.9671],
          duration: "2 hours",
          description:
            "10,000 vermilion torii gates winding up a mountain. Arrive by 08:45 to photograph them without crowds; by 10:30 it's wall-to-wall tour groups. Hike to the Yotsutsuji intersection (~30 min up) for the city view — most tourists stop before this. Continue another 20 min to the summit 'Ichi-no-Mine', almost empty, full panoramic Kyoto view. On the descent, buy a 'kitsune udon' ($4) from a mountain stand — fox is Inari's messenger, eating this is the ritual.",
          estimatedCost: "Free",
          transitFromPrev: "JR Nara line, 5 min, then 3 min walk",
        },
        {
          order: 3,
          time: "11:30",
          type: "meal",
          name: "Nishiki Market food stalls",
          area: "Central Kyoto",
          coords: [135.7644, 35.0053],
          duration: "1.5 hours",
          description:
            "A 400-meter covered market known as 'Kyoto's kitchen' since the Heian period. Try tako-tamago (sweet glazed octopus stuffed with quail egg, $3 a piece — visual shock + complex umami), soy-milk doughnuts ($1.50, fried with Kyoto's famous water), and fresh yuba (tofu skin, $6, paper-thin with ginger soy). From 'Nishiri' on the west end to 'Nishiki Market' on the east, 8 stalls in 3 hours = the canonical Kyoto local lunch.",
          estimatedCost: "~$15",
          transitFromPrev: "JR Nara line back to Kyoto Station, then subway to Shijo, ~20 min",
        },
        {
          order: 4,
          time: "13:30",
          type: "sight",
          name: "Kiyomizu-dera Temple",
          area: "Higashiyama",
          coords: [135.7850, 34.9949],
          duration: "1.5 hours",
          description:
            "A 1,200-year-old wooden temple perched on a hillside, held up by 13-meter pillars without a single nail. From the famous 'Kiyomizu no Butai' platform, the view of Kyoto and Mt. Hiei in the distance forms a single line — the millennial postcard. Walk the Otowa Waterfall at the back — choose ONE of the three streams (long life, success in studies, love) and drink (greedily drinking from two invalidates everything). $4 entry. On the way, don't miss the Jishu Shrine — protector of love, where Japanese schoolgirls flock; pink omamori charms are a viral souvenir.",
          estimatedCost: "~$3",
          transitFromPrev: "Bus 206 from Shijo → Gojo-zaka stop, then uphill walk, ~25 min",
        },
        {
          order: 5,
          time: "15:30",
          type: "shopping",
          name: "Sannenzaka & Ninenzaka slopes",
          area: "Higashiyama",
          coords: [135.7826, 34.9973],
          duration: "1 hour",
          description:
            "Preserved Edo-period streets leading down from Kiyomizu. Tea houses, kimono rentals, Kyoto wagashi, matcha soft-serve all line up — these are the most photographed streets in Japan. 'Kyo-Azuki' matcha mochi ($3.50), 'Saryo Tsujiri' matcha parfait ($15) are the classics. Note: legend says falling on Ninenzaka brings death within 2 years — but it's so crowded you couldn't fall, so don't worry. In a rented kimono ($30/day), you become Kyoto scenery for someone else's photo.",
          estimatedCost: "~$8",
          transitFromPrev: "Walk from Kiyomizu",
        },
        {
          order: 6,
          time: "18:00",
          type: "transit",
          name: "Return to Osaka",
          area: "Kyoto → Shinsaibashi",
          coords: [135.5017, 34.6724],
          duration: "1 hour",
          description:
            "Walk to Gion-Shijo station → Keihan line → transfer at Yodoyabashi to Midosuji subway → Shinsaibashi. More direct than going back through JR Kyoto Station. Relax at the hotel before dinner — your legs walked 20,000 steps and they're protesting.",
          estimatedCost: "~$6",
          transitFromPrev: "10 min walk to Gion-Shijo",
        },
        {
          order: 7,
          time: "20:00",
          type: "meal",
          name: "Kushikatsu Daruma (Shinsekai original)",
          area: "Shinsekai",
          address: "2-3-9 Ebisu-higashi, Naniwa Ward",
          coords: [135.5066, 34.6521],
          duration: "1.5 hours",
          description:
            "Kushikatsu (deep-fried skewers — anything battered and fried on a stick) is Osaka's other signature dish. Daruma is the 1929 original; founder's photo on the wall. Order the 15-skewer omakase ($25) — beef, shrimp, octopus, quail egg, asparagus, takoyaki ball, cheese, all in sequence. The rule: shared sauce in a communal pot, 'no double dipping' — because everyone shares, one bite = one dip. Free cabbage to refill — eat with the sauce as a vegetable companion. The 'Tsutenkaku' tower next door is Osaka's Eiffel Tower (built 1956).",
          estimatedCost: "~$22",
          bookingTip: "Arrive before 19:30 or after 21:00 to skip the worst queues. Photograph the 'no double dipping' red sign at the flagship.",
          transitFromPrev: "Midosuji subway Shinsaibashi → Dobutsuen-mae, 10 min",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Osaka Castle, market breakfast, last meal",
      summary:
        "Kuromon Market breakfast, a walk through Osaka's most famous castle grounds, and a refined final dinner.",
      stops: [
        {
          order: 1,
          time: "08:30",
          type: "meal",
          name: "Kuromon Ichiba Market breakfast",
          area: "Nipponbashi",
          address: "2-4-1 Nipponbashi, Chuo Ward",
          coords: [135.5061, 34.6662],
          duration: "1.5 hours",
          description:
            "600 meters of food stalls selling fresh uni (sea urchin), tuna sashimi, grilled Kobe beef skewers, and the best strawberries outside the countryside. 'Kuromon Sanpei' offers a $12 plate of uni + tuna o-toro sashimi, half what Tsukiji costs. 'Daiyu Kamaboko' kanto-style fishcake skewers $1.50 each, eat while walking. 'Sugata-ya' premium wagyu skewers $6 each with the sweet Kansai-style sauce. Eat standing; share portions; this is breakfast, not a commitment.",
          estimatedCost: "~$25",
          transitFromPrev: "10 min walk from hotel",
        },
        {
          order: 2,
          time: "10:30",
          type: "sight",
          name: "Osaka Castle",
          area: "Chuo Ward",
          address: "1-1 Osakajo, Chuo Ward",
          coords: [135.5262, 34.6873],
          duration: "2 hours",
          description:
            "Hideyoshi's 16th-century castle, rebuilt in concrete in the 20th. The exterior is what you're here for — emerald tile roof, gold leaf flourishes, reflected in the moat. Skip the interior museum unless you love history; the park around the castle is the better walk. Arrive right at 09:00 to beat tour buses; by 11:00 the line for the tower is 30+ min. In autumn, the contrast of the violet-red maples by the plum grove against the white walls is Osaka Castle's most magical angle. 'Jo-Terrace Osaka' (opened 2017) has 8 cafés below the castle for a break.",
          estimatedCost: "~$5 for tower entry",
          bookingTip: "Arrive right at 09:00 to beat tour buses. 'Jo-Terrace Osaka' (opened 2017) has 8 cafés below the castle.",
          transitFromPrev: "Sennichimae subway → Tanimachi line → Tanimachi 4-chome, 15 min",
        },
        {
          order: 3,
          time: "13:00",
          type: "meal",
          name: "Harukoma Sushi",
          area: "Tenma",
          coords: [135.5106, 34.7004],
          duration: "1.5 hours",
          description:
            "A neighborhood sushi-ya in the covered Tenjinbashi-suji arcade — at 2.6 km, Japan's longest shopping street. Harukoma serves a Michelin-worthy omakase at 1/3 the Tokyo price — $30 for 8 nigiri + maki + tamago at lunch. Sit at the counter facing the chef — unlike the 'serious' Edomae sushiya in Ginza, here the chef chats and explains each piece. 'O-toro' (fatty tuna belly), 'uni gunkan' (sea urchin), 'anago' (sea eel) are essentials. A regular at the next seat has been eating here for 30 years — possibly a neighborhood grandfather.",
          estimatedCost: "~$30 for lunch omakase",
          bookingTip: "No reservations at lunch. Arrive by 12:30 to get a counter seat.",
          transitFromPrev: "Subway from Osaka Castle → Minami-Morimachi, 10 min",
        },
        {
          order: 4,
          time: "15:00",
          type: "shopping",
          name: "Umeda Sky Building",
          area: "Umeda",
          coords: [135.4903, 34.7055],
          duration: "1.5 hours",
          description:
            "Two towers joined by a floating observatory at the top — the Kuchu Teien (floating garden). Once at the top, a 360° open-air ring deck — east toward Mt. Ikoma (between Osaka and Nara), west toward Osaka Bay, south toward Osaka Castle. 30 min before sunset = day + sunset captured at once; the Osaka sunset stretches in orange-violet to the horizon, Akashi Kaikyo Bridge lights flickering on in the distance. Architect Hara Hiroshi, 1993, named by Times one of the '20 most beautiful buildings in the world.'",
          estimatedCost: "~$10",
          transitFromPrev: "Midosuji subway, 20 min",
        },
        {
          order: 5,
          time: "18:30",
          type: "meal",
          name: "Endo Sushi (early dinner)",
          area: "Fukushima",
          coords: [135.4855, 34.6979],
          duration: "1 hour",
          description:
            "For your last meal, a tachigui (standing) sushi counter that only serves pre-composed 5-piece sets for ¥700 each. Absurdly cheap, absurdly fresh because the Central Fish Market is next door. Order 2-3 sets — each combo is different. Standing makes you more equal to the workers, white-collar staff, and housewives next to you — the tachigui atmosphere flattens everyone. Closes at 19:30; arrive by 18:30 to order.",
          estimatedCost: "~$15",
          bookingTip: "Closes at 19:30; arrive by 18:30 to order.",
          transitFromPrev: "JR loop line, 10 min",
        },
        {
          order: 6,
          time: "20:00",
          type: "activity",
          name: "Dotonbori night walk (revisit)",
          area: "Dotonbori",
          coords: [135.5012, 34.6687],
          duration: "1 hour",
          description:
            "You started here; finish here. The canal at night with everything lit up is a different city. Buy a beer from a konbini ($2), lean on the Ebisu-bashi bridge, watch the Glico Running Man flicker — and you'll think 'I was standing here 3 days ago and I've become someone else now.' This is the last photo for your 'Kansai memories' album.",
          estimatedCost: "~$3",
          transitFromPrev: "JR loop line → Shinsaibashi via subway, 15 min",
        },
      ],
    },
  ],
  packingTips: [
    "Slip-on shoes — you'll remove them at shrines, ryokan, and some restaurants",
    "A compact bag for market purchases (glass jars of yuzu, etc.)",
    "Antacids — you will overeat",
    "Portable umbrella — Osaka rains without warning",
    "Wet wipes — essential for street food",
    "One pair of light long pants — some Kyoto temples require covered legs",
  ],
  budgetEstimate: "~$90–130/day excluding hotel",
  generalTips: [
    "Get an ICOCA IC card on day 1 — tap-to-pay for every train, bus, and many vending machines",
    "Osakan dialect (Kansai-ben) is casual and friendly. 'Ookini' = thanks",
    "Tipping is rude here; refuse polite offers to round up",
    "Many food stalls close by 21:00 despite Dotonbori's reputation — plan late-night stops carefully",
    "ICOCA + Apple Pay/Google Pay tap at konbini and subway gates",
    "JR Pass Kansai 5-day ($35) pays off if you're combining Osaka + Kyoto + Nara + Kobe; pure Osaka, skip it",
  ],
};

export default osaka3dFoodie;
