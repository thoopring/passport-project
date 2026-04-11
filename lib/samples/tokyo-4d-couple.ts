import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Tokyo, 4 days, couple, midrange.
 *
 * This is a hand-curated sample used in the marketing gallery (/samples) and
 * also serves as the quality bar the AI generator should match. Coordinates
 * are approximate but pinned to real, well-known landmarks.
 */
const tokyo4dCouple: TripPlan = {
  destination: "Tokyo",
  destinationCountry: "Japan",
  durationDays: 4,
  overview:
    "Four days designed for a couple who want a balance of iconic Tokyo and quiet, romantic moments. You'll bookend each day with a memorable meal, walk through neighborhoods that show how the city's centuries-old shrines coexist with neon-lit modernity, and finish with a sunset that gets a hotel-room photo every time.",
  bestSeasonNote:
    "Late March–early April for cherry blossoms or mid-November for autumn colors. Avoid Golden Week (late April–early May) — domestic travel makes everything crowded and expensive.",
  currencyTip:
    "Japan is still surprisingly cash-friendly. Withdraw ¥30,000–¥50,000 from a 7-Eleven ATM on arrival; most restaurants and shrines accept it more readily than foreign cards.",
  languageTip:
    "Google Translate's camera mode reads menus instantly. 'Sumimasen' (excuse me) and a small bow open every door.",
  emergencyNumber: "110 (police), 119 (ambulance/fire)",
  hotel: {
    name: "Hotel Gracery Shinjuku",
    area: "Shinjuku",
    address: "1-19-1 Kabukicho, Shinjuku City, Tokyo 160-8466",
    coords: [139.7019, 35.6955],
    rationale:
      "Shinjuku is the smartest base for a 4-day trip from Narita: the Narita Express drops you 6 minutes from the lobby, every JR and metro line you'll need radiates from here, and you can walk to dinner without thinking about transit. The Godzilla head over the entrance is a fun bonus.",
    priceTier: "$$",
    estimatedNightlyRate: "~$140/night",
  },
  airportTransit: {
    method: "Narita Express (N'EX) → JR Shinjuku Station",
    duration: "~80 minutes",
    cost: "~$28 (round-trip foreigner discount available)",
    instructions:
      "After clearing customs at Narita Terminal 1, follow the blue 'JR' signs down to B1F. Buy the round-trip foreigner ticket at the JR EAST Travel Service Center (passport required). Take any N'EX train heading to Shinjuku — it's the terminus, so you can't miss the stop. From Shinjuku Station's South Exit, the hotel is a 6-minute flat walk through Kabukicho.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Shibuya & Harajuku",
      summary:
        "Ease in with a half-day of Tokyo's most photogenic neighborhoods, capped by the famous crossing at golden hour.",
      stops: [
        {
          order: 1,
          time: "10:00",
          type: "sight",
          name: "Meiji Jingu Shrine",
          area: "Shibuya",
          address: "1-1 Yoyogikamizonocho, Shibuya City",
          coords: [139.6993, 35.6764],
          duration: "1.5 hours",
          description:
            "A Shinto shrine wrapped in a 70-hectare forest planted by 100,000 volunteers in 1920. The torii gates and gravel approach give you an immediate breath of calm before the city hits.",
          estimatedCost: "Free",
          transitFromPrev: "5 min walk from Harajuku Station (JR Yamanote line from Shinjuku, 4 min)",
        },
        {
          order: 2,
          time: "12:00",
          type: "shopping",
          name: "Takeshita Street",
          area: "Harajuku",
          coords: [139.7026, 35.6710],
          duration: "1 hour",
          description:
            "Tokyo's youth-fashion epicenter. Even if you don't buy anything, the rainbow cotton candy and crepe stalls are a sensory overload worth the walk-through.",
          estimatedCost: "~$10 for snacks",
          transitFromPrev: "5 min walk",
        },
        {
          order: 3,
          time: "13:30",
          type: "meal",
          name: "Afuri Harajuku (yuzu shio ramen)",
          area: "Harajuku",
          coords: [139.7037, 35.6710],
          duration: "45 min",
          description:
            "A lighter, citrusy ramen perfect for a hot day. Order from the vending machine at the entrance, hand the ticket to the counter, and you'll be slurping in 5 minutes.",
          estimatedCost: "~$12",
          transitFromPrev: "3 min walk",
        },
        {
          order: 4,
          time: "15:00",
          type: "sight",
          name: "Omotesando Avenue",
          area: "Omotesando",
          coords: [139.7126, 35.6664],
          duration: "1 hour",
          description:
            "Tokyo's Champs-Élysées: zelkova-tree-lined boulevard with flagship stores by Tadao Ando, Herzog & de Meuron, and SANAA. Architecture-as-shopping, even if you only window-browse.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
        },
        {
          order: 5,
          time: "16:30",
          type: "sight",
          name: "Shibuya Crossing & Hachiko Statue",
          area: "Shibuya",
          coords: [139.7005, 35.6595],
          duration: "1 hour",
          description:
            "The most famous intersection in the world. Cross it once at street level, then watch from the second-floor Starbucks for the overhead view that ends up on every postcard. Pay respects to Hachiko on the way.",
          estimatedCost: "Free (~$5 if you buy a coffee)",
          transitFromPrev: "Tokyo Metro Ginza line, 4 min",
        },
        {
          order: 6,
          time: "19:00",
          type: "meal",
          name: "Uobei Sushi Shibuya Dogenzaka",
          area: "Shibuya",
          coords: [139.6986, 35.6580],
          duration: "1 hour",
          description:
            "A high-tech conveyor sushi spot where every order arrives on a tiny shinkansen-style track. Quality is solid, the gimmick is genuinely fun, and dinner for two runs ~$35.",
          estimatedCost: "~$18/person",
          bookingTip: "Tablet menu has English. Expect 15–20 min wait at peak — sign up at the kiosk and grab a drink.",
          transitFromPrev: "8 min walk",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Old Tokyo: Asakusa & Ueno",
      summary:
        "A full day in the shitamachi (low city) — historic temples, street food alleys, and Tokyo's best museum cluster.",
      stops: [
        {
          order: 1,
          time: "09:00",
          type: "sight",
          name: "Senso-ji Temple",
          area: "Asakusa",
          address: "2-3-1 Asakusa, Taito City",
          coords: [139.7967, 35.7148],
          duration: "1.5 hours",
          description:
            "Tokyo's oldest temple, founded 645 CE. Approach through the Kaminarimon gate with its giant red lantern, then walk Nakamise shopping street up to the main hall. Get there before 10am to photograph it without crowds.",
          estimatedCost: "Free",
          transitFromPrev: "Tokyo Metro Ginza line from Shibuya → Asakusa, ~35 min",
        },
        {
          order: 2,
          time: "11:00",
          type: "shopping",
          name: "Nakamise-dori",
          area: "Asakusa",
          coords: [139.7964, 35.7140],
          duration: "45 min",
          description:
            "200 meters of stalls selling ningyo-yaki (custard cakes shaped like dolls), senbei rice crackers, and traditional crafts. The agemanju (deep-fried bean buns) at Asakusa Kokonoe are the move.",
          estimatedCost: "~$8 for snacks",
          transitFromPrev: "Built in",
        },
        {
          order: 3,
          time: "12:30",
          type: "meal",
          name: "Daikokuya Tempura",
          area: "Asakusa",
          coords: [139.7958, 35.7125],
          duration: "1 hour",
          description:
            "A 130-year-old tempura institution. The ten-don (tempura over rice) is dark, sweet, and unlike anything outside Japan. Expect a queue — it moves fast.",
          estimatedCost: "~$18",
          bookingTip: "No reservations. Arrive 11:45 or 14:00 to dodge the worst queues.",
          transitFromPrev: "5 min walk",
        },
        {
          order: 4,
          time: "14:30",
          type: "sight",
          name: "Tokyo National Museum",
          area: "Ueno",
          address: "13-9 Uenokoen, Taito City",
          coords: [139.7766, 35.7188],
          duration: "2 hours",
          description:
            "Japan's oldest and largest museum. Skip everything except the Honkan (main building) — focus on the samurai armor and katana galleries on the second floor. They are world-class.",
          estimatedCost: "~$7",
          transitFromPrev: "Tokyo Metro Ginza line Asakusa → Ueno, 5 min, then 10 min walk",
        },
        {
          order: 5,
          time: "17:00",
          type: "rest",
          name: "Ueno Park stroll",
          area: "Ueno",
          coords: [139.7745, 35.7156],
          duration: "1 hour",
          description:
            "Tokyo's first public park. Walk around Shinobazu Pond, cross the small bridge to Bentendo, and catch the lily pads if you're here in summer.",
          estimatedCost: "Free",
          transitFromPrev: "5 min walk",
        },
        {
          order: 6,
          time: "19:00",
          type: "meal",
          name: "Ameya-Yokocho food alley",
          area: "Ueno",
          coords: [139.7745, 35.7090],
          duration: "1.5 hours",
          description:
            "A post-war black-market alley turned into Tokyo's most chaotic food street. Bar-hop standing-only joints, eat grilled skewers, and try a stand-up sushi counter.",
          estimatedCost: "~$25/person",
          transitFromPrev: "10 min walk",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Tsukiji, Ginza & Imperial Palace",
      summary:
        "Sushi breakfast, an imperial walk, and an evening browsing one of the world's most refined shopping districts.",
      stops: [
        {
          order: 1,
          time: "08:30",
          type: "meal",
          name: "Tsukiji Outer Market breakfast",
          area: "Tsukiji",
          address: "4 Chome Tsukiji, Chuo City",
          coords: [139.7706, 35.6654],
          duration: "1.5 hours",
          description:
            "The inner wholesale market moved to Toyosu, but the outer market remains a wonderland of sushi counters, tamagoyaki stands, and uni vendors. Sushi Dai is gone but Sushizanmai Honten still serves a great breakfast omakase.",
          estimatedCost: "~$30",
          bookingTip: "Get there by 8:30 — most stalls close by 13:00.",
          transitFromPrev: "Tokyo Metro Marunouchi → Hibiya line from Shinjuku, ~25 min",
        },
        {
          order: 2,
          time: "10:30",
          type: "sight",
          name: "Hama-rikyu Gardens",
          area: "Shiodome",
          coords: [139.7634, 35.6597],
          duration: "1 hour",
          description:
            "A 17th-century shogun garden with a tidal saltwater pond and a 300-year-old pine tree. Stop at the Nakajima teahouse on the island for matcha and a wagashi sweet.",
          estimatedCost: "~$3 entry + $8 tea",
          transitFromPrev: "15 min walk",
        },
        {
          order: 3,
          time: "12:30",
          type: "sight",
          name: "Imperial Palace East Gardens",
          area: "Chiyoda",
          coords: [139.7544, 35.6852],
          duration: "1.5 hours",
          description:
            "The remains of Edo Castle, now a free public garden. Walk the stone foundations of the original keep, and look for the Suwa Tea House. Closed Mondays and Fridays.",
          estimatedCost: "Free",
          transitFromPrev: "Tokyo Metro Hibiya line Shimbashi → Hibiya, then walk, ~15 min",
        },
        {
          order: 4,
          time: "15:00",
          type: "meal",
          name: "Tonkatsu Maisen Aoyama",
          area: "Aoyama",
          coords: [139.7163, 35.6664],
          duration: "1 hour",
          description:
            "Maisen turned a former bathhouse into Tokyo's most beloved tonkatsu restaurant. Order the kurobuta loin set — it comes with shredded cabbage you refill freely and rice you can request a different grain for.",
          estimatedCost: "~$20",
          transitFromPrev: "Tokyo Metro Chiyoda line, ~10 min",
        },
        {
          order: 5,
          time: "17:00",
          type: "shopping",
          name: "Ginza shopping district",
          area: "Ginza",
          coords: [139.7637, 35.6717],
          duration: "2 hours",
          description:
            "Even if luxury brands aren't your thing, walk Chuo-dori on a Sunday afternoon when it becomes a pedestrian street, browse Itoya stationery (six floors of paper), and stop into the Apple store for the rooftop view.",
          estimatedCost: "Free–$$$$",
          transitFromPrev: "Tokyo Metro Ginza line, 8 min",
        },
        {
          order: 6,
          time: "19:30",
          type: "meal",
          name: "Yakitori Imai",
          area: "Aoyama",
          coords: [139.7180, 35.6655],
          duration: "1.5 hours",
          description:
            "A Michelin-rated yakitori spot where every part of the chicken is grilled over binchotan charcoal. The omakase course is the play. A perfect, intimate close to a long city day.",
          estimatedCost: "~$50/person",
          bookingTip: "Reserve 1–2 weeks ahead via your hotel concierge — they speak English on the phone.",
          transitFromPrev: "Tokyo Metro, ~15 min",
        },
      ],
    },
    {
      dayNumber: 4,
      theme: "Day trip: Kamakura",
      summary:
        "An hour south of Tokyo, Kamakura was the seat of Japan's first shogunate. Temples, the Great Buddha, and a wide beach for sunset.",
      stops: [
        {
          order: 1,
          time: "09:00",
          type: "transit",
          name: "Train to Kamakura",
          area: "Tokyo Station → Kamakura",
          coords: [139.7506, 35.6812],
          duration: "1 hour",
          description:
            "Take the JR Yokosuka line from Tokyo Station direct to Kamakura. Buy a Kamakura Free Pass at JR EAST Travel Service Center for unlimited rides on the Enoden line you'll use later.",
          estimatedCost: "~$15 round-trip",
          transitFromPrev: "JR from Shinjuku → Tokyo Station via Chuo line, ~20 min",
        },
        {
          order: 2,
          time: "10:30",
          type: "sight",
          name: "Tsurugaoka Hachimangu Shrine",
          area: "Kamakura",
          address: "2-1-31 Yukinoshita, Kamakura",
          coords: [139.5564, 35.3258],
          duration: "1 hour",
          description:
            "Kamakura's most important shrine, founded in 1063. The wide approach (Wakamiya-oji) leading up to it is a former samurai parade route. Climb the steep stairs for a view back over the city to the sea.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk from Kamakura Station",
        },
        {
          order: 3,
          time: "12:00",
          type: "meal",
          name: "Yoritomo soba",
          area: "Komachi-dori",
          coords: [139.5532, 35.3198],
          duration: "1 hour",
          description:
            "Walk Komachi-dori (Kamakura's craft and snack street) and stop at any traditional soba house. Hand-cut buckwheat noodles with cold dipping broth — light, perfect after the morning's stairs.",
          estimatedCost: "~$12",
          transitFromPrev: "10 min walk",
        },
        {
          order: 4,
          time: "13:30",
          type: "transit",
          name: "Enoden line to Hase",
          area: "Kamakura → Hase",
          coords: [139.5390, 35.3140],
          duration: "10 min",
          description:
            "The Enoden is a 1902 single-track tram that hugs the coast. Sit on the right side for sea views.",
          estimatedCost: "Included in pass",
          transitFromPrev: "5 min walk to Kamakura Station",
        },
        {
          order: 5,
          time: "14:00",
          type: "sight",
          name: "Kotoku-in (Great Buddha of Kamakura)",
          area: "Hase",
          address: "4-2-28 Hase, Kamakura",
          coords: [139.5358, 35.3169],
          duration: "1 hour",
          description:
            "A 13.35-meter bronze Buddha cast in 1252. The temple hall around it was destroyed by tsunami in 1498 and the Buddha has sat exposed to the sky since. Pay an extra ¥20 to step inside the hollow statue.",
          estimatedCost: "~$3 + $0.20 inside",
          transitFromPrev: "10 min walk",
        },
        {
          order: 6,
          time: "16:30",
          type: "rest",
          name: "Yuigahama Beach sunset",
          area: "Yuigahama",
          coords: [139.5447, 35.3082],
          duration: "1 hour",
          description:
            "Kamakura's wide-arc surf beach. In the off-season it's almost empty. Sit on the sand and watch the sun drop behind the headlands. The perfect ending to a Japan trip.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
        },
      ],
    },
  ],
  packingTips: [
    "Slip-on shoes — you'll remove them at every shrine, ryokan, and several restaurants",
    "A small day bag — Tokyo has almost no public trash cans, so you'll carry wrappers all day",
    "Portable charger — Google Maps and translate eat battery fast",
    "Cash wallet — many small restaurants are still cash-only",
  ],
  budgetEstimate: "~$120–180/day for a couple, excluding hotel",
  generalTips: [
    "Get a Suica IC card on day 1 — tap-to-pay for every train, bus, and many vending machines",
    "Convenience store food (7-Eleven, Lawson, FamilyMart) is genuinely good — use it for breakfast",
    "Tipping is not customary and can confuse staff — don't",
    "Most museums close on Mondays — plan accordingly",
  ],
};

export default tokyo4dCouple;
