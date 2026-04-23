import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Osaka, 3 days, solo foodie, midrange.
 *
 * Osaka calls itself "Japan's kitchen" — this plan leans all the way into
 * that, with takoyaki, okonomiyaki, kushikatsu, and a Kuromon Market
 * morning. Hand-curated; all stops are real and well-known.
 */
const osaka3dFoodie: TripPlan = {
  destination: "Osaka",
  destinationCountry: "Japan",
  durationDays: 3,
  overview:
    "Three days for a solo traveler who came to eat. Osaka is Japan's kitchen — where the phrase kuidaore (to eat yourself to ruin) was coined. This plan moves you through Dotonbori's neon-lit food alleys, a proper market breakfast, and a day in Kyoto for temple contrast before you return for one last yakitori night.",
  bestSeasonNote:
    "April for cherry blossoms at Osaka Castle park, or late October for comfortable walking weather and fall colors. Avoid Japanese Golden Week (late April–early May) — domestic travel spikes prices.",
  currencyTip:
    "Cash is still king for small restaurants and Dotonbori stall vendors. Pull ¥20,000–¥30,000 from a 7-Eleven ATM on arrival. Major chains accept cards and IC transit cards.",
  languageTip:
    "Fewer English menus than Tokyo. Learn 'kore o kudasai' (this one, please) and point — it's how locals often order too. Google Translate camera mode is your friend.",
  emergencyNumber: "110 (police), 119 (ambulance/fire)",
  hotel: {
    name: "Cross Hotel Osaka",
    area: "Shinsaibashi",
    address: "2-5-15 Shinsaibashi-suji, Chuo Ward, Osaka 542-0085",
    coords: [135.5017, 34.6724],
    rationale:
      "Shinsaibashi puts you five minutes' walk from Dotonbori, four minutes from the subway, and inside a covered shopping arcade so you never get rained on. Rooms are compact but well-designed, and the lobby café stays open late for post-food-crawl decompression.",
    priceTier: "$$",
    estimatedNightlyRate: "~$120/night",
  },
  airportTransit: {
    method: "Nankai Rapi:t or JR Haruka → Shin-Osaka → subway",
    duration: "~60 minutes",
    cost: "~$15 one-way",
    instructions:
      "From Kansai International (KIX), take the Nankai Rapi:t limited express from the airport station directly to Namba (~40 min). Transfer to the Midosuji subway line one stop to Shinsaibashi; the hotel is a 5-minute walk. The Nankai ticket counter sells a foreigner-only Rapi:t + ICOCA IC card bundle that saves ~$4.",
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
            "Stand on the Ebisu-bashi bridge and take the Glico running-man photo that every Japanese travel guide uses for its Osaka chapter. It's touristy and unavoidable — do it once, then walk the canal and soak in the signage.",
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
            "Takoyaki done right — crispy outside, molten octopus-and-dashi inside. Wanaka is old-school, cheap, and still packed with locals. Get the classic 8-piece with sauce, mayo, bonito, and aonori.",
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
            "600 meters of covered shopping running from Dotonbori to Shinsaibashi. Drugstores, fashion, cafés, and discount electronics. Use it to digest before the next meal.",
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
            "A Michelin Bib Gourmand okonomiyaki shop since 1945. Order the Yamaimo-yaki (their signature) — yam makes the batter fluffier than anywhere else. They cook it on the teppan in front of you.",
          estimatedCost: "~$15",
          bookingTip: "No reservations. Expect 20-30 min queue at peak — use the time to walk the canal.",
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
            "A 50-meter cobbled alley of paper lanterns and tiny izakayas right next to Hozenji Temple, where visitors splash water on the moss-covered Fudo Myo-o statue for luck. The photogenic heart of old Osaka.",
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
            "The giant green dragon ramen spot open until dawn. Tonkotsu-shoyu broth, unlimited kimchi and garlic chives at the table. You will smell like garlic for 24 hours. Worth it.",
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
            "Take the JR Kyoto line Special Rapid service from Shin-Osaka direct to Kyoto. Sit on the right for Mt. Ibuki views on clear days.",
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
            "10,000 vermilion torii gates winding up a mountain. Arrive by 08:45 to photograph them without crowds; by 10:30 it's wall-to-wall tour groups. Hike to the Yotsutsuji intersection (~30 min up) for the city view — most tourists stop before this.",
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
            "A 400-meter covered market known as 'Kyoto's kitchen'. Try tako-tamago (sweet glazed octopus with quail egg), soy-milk doughnuts, and fresh yuba (tofu skin). Graze through ~6-8 stalls for lunch.",
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
            "A 1,200-year-old wooden temple perched on a hillside, held up by 13-meter pillars without a single nail. Walk the Otowa Waterfall at the back — choose one of the three streams (long life, success in studies, love) and drink.",
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
            "Preserved Edo-period streets leading down from Kiyomizu. Matcha soft-serve, kimono rental spotting, and the most-photographed streets in Japan. Street-food your way down.",
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
            "Walk to Gion-Shijo station → Keihan line → transfer at Yodoyabashi to Midosuji subway → Shinsaibashi. Relax at the hotel before dinner.",
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
            "Kushikatsu (deep-fried skewers) is Osaka's other signature dish. Daruma is the 1929 original. One rule on the shared sauce — no double dipping. Order the 15-skewer omakase for the full experience.",
          estimatedCost: "~$22",
          bookingTip: "Arrive before 19:30 or after 21:00 to skip the worst queues.",
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
            "600 meters of food stalls selling fresh uni (sea urchin), tuna sashimi, grilled Kobe beef skewers, and the best strawberries outside the countryside. Eat standing; share portions; this is breakfast, not a commitment.",
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
            "Hideyoshi's 16th-century castle, rebuilt in concrete in the 20th. The exterior is what you're here for — emerald tile roof, gold leaf flourishes, reflected in the moat. Skip the interior museum unless you love history; the park around the castle is the better walk.",
          estimatedCost: "~$5 for tower entry",
          bookingTip: "Arrive right at 09:00 to beat tour buses; by 11:00 the line for the tower is 30+ min.",
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
            "A neighborhood sushi-ya in the covered Tenjinbashi-suji arcade — at 2.6 km, Japan's longest shopping street. Harukoma serves a Michelin-worthy omakase at 1/3 the Tokyo price. Sit at the counter.",
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
            "Two towers joined by a floating observatory at the top — the Kuchu Teien (floating garden). The best 360° view of Osaka, with Mt. Ikoma to the east and the bay to the west. Go just before sunset for day + night in one visit.",
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
            "For your last meal, a tachigui (standing) sushi counter that only serves pre-composed 5-piece sets for ¥700 each. Absurdly cheap, absurdly fresh because the Central Fish Market is next door. Order 2-3 sets.",
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
            "You started here; finish here. The canal at night with everything lit up is a different city. Buy a beer from a konbini, lean on the bridge, and call it a trip.",
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
  ],
  budgetEstimate: "~$90–130/day excluding hotel",
  generalTips: [
    "Get an ICOCA IC card on day 1 — tap-to-pay for every train, bus, and many vending machines",
    "Osakan dialect (Kansai-ben) is casual and friendly. 'Ookini' = thanks",
    "Tipping is rude here; refuse polite offers to round up",
    "Many food stalls close by 21:00 despite Dotonbori's reputation — plan late-night stops carefully",
  ],
};

export default osaka3dFoodie;
