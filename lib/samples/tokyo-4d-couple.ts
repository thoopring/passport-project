import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Tokyo, 4 days, couple, midrange.
 *
 * Hand-curated marketing sample for /samples gallery; also serves as the
 * quality bar the AI generator should match. Coordinates are pinned to
 * real, well-known landmarks. Text fields are intentionally enriched
 * beyond typical API output — samples are the conversion surface and
 * should read RICHER than what a buyer eventually receives.
 */
const tokyo4dCouple: TripPlan = {
  destination: "Tokyo",
  destinationCountry: "Japan",
  durationDays: 4,
  overview:
    "Four days designed for a couple who want a real balance — the iconic neon Tokyo and the quiet, romantic in-between. Each day is bookended by a meal you'll talk about a year later; you'll walk through neighborhoods where centuries-old shrines and 24-hour convenience stores share the same block; and every dusk gives you a sunset photo from the hotel window worth posting. From the tidal flow of Shibuya Crossing to the gold-hour silence of Kamakura's beach, these 4 days become a city memory you and your partner will share for life.",
  bestSeasonNote:
    "Late March–early April for cherry blossoms (the full bloom only lasts about 7 days — track the official 'sakura zensen' forecast to nail the right week), or mid-November for autumn colors at Rikugien and Showa Memorial Park. Avoid Golden Week (late April–early May) when Japanese domestic travel doubles hotel prices and packs every train. Late January–early February is an underrated alternative: cold but uncrowded, and a snow-dusted torii at Meiji Jingu is one of the rarest photos a Tokyo trip can give you.",
  currencyTip:
    "Japan is still surprisingly cash-friendly. Withdraw ¥30,000–¥50,000 from a 7-Eleven or FamilyMart ATM the moment you land — foreign cards work consistently, and small restaurants, shrine offerings, and late-night yatai stalls are usually cash-only. Big chains and convenience stores happily take credit cards and PayPay; a Suica/PASMO IC card on your phone solves trains, buses, and even some vending machines with one tap.",
  languageTip:
    "Google Translate's camera mode reads menus and signs in real time — download the Japanese offline pack before you fly so it works in subway tunnels. 'Sumimasen' (excuse me) plus a small bow opens every door. At a konbini checkout you'll hear 'fukuro irimasu ka?' (do you want a bag?) — a head shake or 'daijōbu' (it's fine) is all you need.",
  emergencyNumber: "110 (police), 119 (ambulance/fire)",
  hotel: {
    name: "Hotel Gracery Shinjuku",
    area: "Shinjuku",
    address: "1-19-1 Kabukicho, Shinjuku City, Tokyo 160-8466",
    coords: [139.7019, 35.6955],
    rationale:
      "For a 4-day trip from Narita, Shinjuku is the smartest base bar none. The Narita Express drops you 6 minutes from the lobby, every JR and metro line you'll need radiates from this station, and dinner is always within walking distance — no late-night transit calculations. The Godzilla head bursting from the 8th-floor terrace above the entrance is a fun bonus, and the Hello Kitty or Godzilla-view themed rooms are worth the small upgrade for the experience. 24-hour English reception, late-night luggage hold, and a Family Mart in the same building.",
    priceTier: "$$",
    estimatedNightlyRate: "~$140/night",
  },
  airportTransit: {
    method: "Narita Express (N'EX) → JR Shinjuku Station",
    duration: "~80 minutes",
    cost: "~$28 (round-trip foreigner discount available)",
    instructions:
      "After clearing customs at Narita Terminal 1, follow the blue 'JR' signs down to B1F. Show your passport at the JR EAST Travel Service Center to buy the foreigner round-trip ticket (~$50, valid 14 days — far better value than single tickets). Take any N'EX train heading to Shinjuku — it's the terminus, so you literally can't miss it. From Shinjuku Station's South Exit, the hotel is a 6-minute flat walk through Kabukicho. If you arrive on a weekend evening, grab bottled water and an onigiri at the konbini inside the station before you leave — you'll get hungry on the way.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Shibuya & Harajuku",
      summary:
        "Ease in with a half-day of Tokyo's two most photogenic neighborhoods, capped at golden hour by the most famous crossing in the world.",
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
            "A Shinto shrine wrapped in a 70-hectare forest of 100,000 trees planted by volunteers in 1920 — each donated from a different prefecture. The moment you pass under the giant cypress torii gate and your shoes hit the gravel approach, three seconds later the sound of Tokyo is gone. At the main hall, drop ¥100 for an omamori (travel-protection charm) — they make the trip-long good-luck story. Don't miss the wall of votive sake barrels along the side path; each family crest belongs to a centuries-old brewery. Arrive before 10am and you can have this much silence almost to yourself.",
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
            "Tokyo's youth-fashion epicenter — 350 meters of color, sugar, and noise. Even if you buy nothing, it's a sensory overload worth one full pass. Marion Crepes (the OG since 1976) makes the strawberry-cream-cheese crepe that defines the genre. Weekend afternoons get so packed you literally can't lift your phone — aim for Tuesday-to-Thursday between 10am and 11am for the gentle window.",
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
            "The perfect ramen for a hot day — the yuzu citrus rind turns a heavy broth into something that floats. The vending machine at the entrance has English buttons; pick yuzu shio or yuzu shoyu (~$12) and add the soft-boiled egg for $1.50. About 20 counter seats, you're slurping 5 minutes after walking in. Afuri is the lunch habit of Shibuya office workers — and the company logo is a deer.",
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
            "Tokyo's Champs-Élysées — a zelkova-tree-lined boulevard where Tadao Ando, Herzog & de Meuron, and SANAA designed flagship stores for Dior, Prada, and Tod's. Each building is itself a work of art; even pure window-browsing turns into an architecture lecture. Late November to Christmas, the avenue's white-bulb illumination turns the whole street into a golden corridor. Don't skip the spiral ramp inside Omotesando Hills (Ando's design, 2006) — even non-shoppers walk it.",
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
            "The most famous pedestrian intersection on Earth. Cross it at street level at least once — when the lights change, four directions release at once and 3,000 people interlace in 30 seconds. Then go up to MAGNET shibuya 7F's CROSSING VIEW deck (~$5) directly across the road for the overhead photo every postcard uses. The Hachiko statue is on the north plaza — the Akita dog of a Tokyo Imperial University agriculture professor who, after his master's death in 1925, returned to wait at this station every evening for nearly 10 years until his own death. A bronze plaque next to the statue tells the full story.",
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
            "A high-tech conveyor sushi spot where every order arrives on a tiny shinkansen-style track that pulls up to your seat. Quality is way above the gimmick: bonito, sea urchin gunkan, tamago-yaki, A5 wagyu seared nigiri, and rich cod-roe rolls. Dinner for two runs about $35 even when you're eating until full. On the 3rd floor of the same building as MEGA Don Quijote — perfect for cosmetic and snack shopping right after dinner.",
          estimatedCost: "~$18/person",
          bookingTip: "Tablet menu is in English. Expect 15–20 min wait at peak; check in at the kiosk and grab a drink at the basement bar. Sundays 6–7pm is the worst slot.",
          transitFromPrev: "8 min walk",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Old Tokyo: Asakusa & Ueno",
      summary:
        "A full day in the shitamachi (low city) — a thousand-year-old temple, an alley of food stalls, and Tokyo's best museum cluster.",
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
            "Tokyo's oldest temple, founded in 645 CE. Approach through the Kaminarimon gate with its giant red lantern, then walk Nakamise shopping street up to the main hall. Get there before 10am and you can photograph the gate's full face with almost no one in it — that's the photo you'll send to everyone back home. At the main hall, draw an omikuji fortune for ¥100; if it's bad luck, tie the strip to the metal rack next to the rack and let the wind take it. At the incense burner out front, watch locals waft smoke onto their head, shoulders, or knees to heal what aches — by your second visit you'll be doing it too.",
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
            "200 meters of stalls selling ningyo-yaki (custard cakes shaped like dolls), senbei rice crackers, and traditional crafts. The agemanju (deep-fried bean buns) at Asakusa Kokonoe (~$1 each) are a must — bite one hot, the bean paste burns your tongue, and you can't stop. Kimuraya has been making ningyo-yaki by the same family since 1868: 7 cakes for $5. Buy one bag and walk-and-eat — that's the rhythm of the shitamachi.",
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
            "A 130-year-old tempura institution. The signature ten-don (tempura over rice) uses a sesame oil recipe passed through generations — the color is darker, the flavor sweeter and richer than ordinary tempura, and you can't really get this taste anywhere outside Japan. Sit upstairs in the wood-paneled room; the window looks back toward Kaminarimon. Lunch queue runs 15–20 min — arrive at 11:45 or after 14:00 to walk straight in. Rice refills (okawari) are free; don't be shy.",
          estimatedCost: "~$18",
          bookingTip: "No reservations. Queue forms on the left side of the entrance and the host hands out numbered tickets — you can wander for 10 minutes.",
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
            "Japan's oldest and largest museum. Skip everything except the Honkan (main building) — the samurai armor and katana galleries on the second floor are world-class, with works by Nagamitsu, Masamune, and Muramasa whose blades still mirror the visitors' faces. The first-floor ukiyo-e print gallery rotates monthly; Hokusai's 'Great Wave off Kanagawa' surfaces a few times a year. Free large-bag storage at the entrance, and the museum map is available in English, Korean, and Chinese.",
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
            "Tokyo's first public park. Walk the loop around Shinobazu Pond, cross the small bridge to Bentendo (dedicated to Benzaiten, goddess of music and wealth). In summer the pond is fully covered in pink lotus blooms; the peak is late July to early August, and arriving before 6am gets you dewdrops on the petals. In autumn the pond-side ginkgos turn gold. During cherry blossom season this is one of Tokyo's loudest hanami spots — over 1,000 trees line the main path, but the crowds are dense.",
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
            "A post-war black-market alley turned into Tokyo's most chaotic food street. After 6pm the standing-only bars come alive — a draft beer runs ~$3, skewers ~$1.50, and the play is to stand, eat, and chat with the salaryman next to you. 'Daitouryou' is a famous standing-only old-timer, with horse-meat sashimi and stewed offal as signatures — you'll hesitate but won't regret ordering them.",
          estimatedCost: "~$25/person",
          transitFromPrev: "10 min walk",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Tsukiji, Ginza & Imperial Palace",
      summary:
        "Sushi for breakfast, an imperial garden walk, and an evening on one of the world's most refined shopping streets.",
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
            "The inner wholesale market moved to Toyosu, but the outer market remains a wonderland of sushi counters, tamagoyaki specialists, uni vendors, and nori shops. Sushizanmai Honten (open 24 hours) plates an 11-piece omakase breakfast for ~$25 — chu-toro, ō-toro, sea urchin, eel, tamagoyaki, all moving past you on the counter. The truffle tamagoyaki ($3 a slice) is dessert: layers of dashi-spiked egg rolled to a sweet-savory miracle.",
          estimatedCost: "~$30",
          bookingTip: "Get there by 8:30 — most stalls close by 13:00. Sundays and Wednesdays some vendors are closed.",
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
            "A 17th-century shogun garden where seawater flows into the central pond with the tides and the 300-year-old black pines are pruned to look like giant bonsai. At the heart of the pond, the Nakajima teahouse floats on a wooden walkway — sit on tatami, order the matcha + wagashi set ($8), and the moment the bowl is presented to you is the ceremony's climax. The wagashi changes by season: cherry in spring, hydrangea in summer, momiji in autumn, camellia in winter. Through the windows you see Shiodome's skyscrapers — but you're sitting in Edo.",
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
            "The remains of Edo Castle, now a free public garden. Walk up the stone foundations of the original Tenshu (keep) and look 360° toward the modern palace — never rebuilt after the 1657 Meireki fire. Find the Suwa Tea House (a rare 1912 wooden survivor). In autumn, the rear of the Honmaru lawn opens onto a tunnel of dozens of golden ginkgos. Closed Mondays and Fridays. Free entry tickets are issued at Ote-mon, Hirakawa-mon, or Kita-hanebashi-mon — keep yours and return it on the way out.",
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
            "A former Tokyo bathhouse converted into the city's most beloved tonkatsu restaurant. The kurobuta loin set is the move — using a low-temperature sous-vide technique before frying, the cutlet stays a tender pink inside without any greasy weight. Cabbage shreds, miso soup, and rice are all free refills. The takeout window next door sells the cult sandwich version ($3) — long-running 'one of Tokyo's best bento' in Japanese press.",
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
            "Even if luxury brands aren't your thing, this is worth the walk. Sunday afternoons (11–18:00) Chuo-dori becomes 'pedestrian heaven' — you can take photos from the middle of the street. Itoya stationery (9 floors) is one of the best non-luxury experiences in the city: notebooks, inks, washi paper, hanko stamps. The Apple Store on the 6th floor has a free rooftop terrace facing Ginza street. Display windows at Mitsukoshi, Wako, and Wako rotate monthly themes; the Christmas windows are a city-wide attraction.",
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
            "A Michelin-rated yakitori spot where every part of the chicken is grilled over binchotan charcoal. The omakase course (12–15 skewers, depending on the day's chickens) is the only play — breast, thigh, comb, heart, soft cartilage — anatomical detail that rewires what 'chicken' means as an ingredient. Binchotan flame-aroma is incomparable to gas; the moment a drop of chicken fat hits the charcoal, a wave of fragrance rises. Between skewers, an otsumami (small bite) resets the rhythm. A perfect, intimate close to a long city day.",
          estimatedCost: "~$50/person",
          bookingTip: "Reserve 1–2 weeks ahead via your hotel concierge — they speak English on the phone. Smart-casual recommended; they'll seat you at the counter.",
          transitFromPrev: "Tokyo Metro, ~15 min",
        },
      ],
    },
    {
      dayNumber: 4,
      theme: "Day trip: Kamakura",
      summary:
        "An hour south of Tokyo. Kamakura was the seat of Japan's first shogunate. Temples, the Great Buddha, and a wide beach for sunset.",
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
            "Take the JR Yokosuka line from Tokyo Station direct to Kamakura. Buy a Kamakura Free Pass at the JR EAST Travel Service Center (~$8) — unlimited rides on the Enoden tram you'll use later. Reserved seat is worth the small premium ($9 over free seating, $15 for Green Car) since weekend trains in both directions are crowded. The line passes Yokohama; on a clear day, you'll see the silhouette of Mt. Fuji to the left.",
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
            "Founded in 1063, the most important shrine in Kamakura. From the East Exit of Kamakura Station, the 800-meter Wakamiya-oji approach (formerly a samurai parade route) lifts in the middle to the raised 'dankazura' lined with cherry trees. Climb the steep front Daisekidan (60 stone steps); turn around at the top and the sea and the city open in front of you in a single line — the postcard angle of Kamakura. Inside the precinct, the Genji-ike pond fills with summer lotus, white and pink separated.",
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
            "Walk Komachi-dori (Kamakura's craft and snack street) and stop at any traditional soba house. Hand-cut buckwheat noodles with cold dipping broth — light enough that after climbing the morning stairs you immediately understand why Japanese travelers crave this dish. Add a tempura plate (shrimp, eggplant, maitake mushroom). 'Kawakoeya' is the local long-runner; the soba-yu (the cooking water served as a clear soup at the end) is a free refill — the post-noodle ritual only locals know about.",
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
            "The Enoden is a 1902 single-track tram that hugs the Pacific coast. Between Kamakurakōkō-mae and Shichirigahama, the rails and the sea run parallel — the exact frame from the 'Slam Dunk' anime opening, which has turned the level crossing into a weekend pilgrimage spot for Korean and Chinese fans. Sit on the right side window in the two-car mini train — it feels like riding through a vintage manga panel.",
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
            "A 13.35-meter bronze Buddha cast in 1252. The temple hall around it was destroyed by tsunami in 1498; the Buddha has sat exposed under open sky for over 600 years, the patina on its surface a kind of weather-grown calendar. Pay an extra ¥20 to step inside the hollow statue through a small door at the back — tight, but you can see the casting seams from 1252. On the way out, don't miss the side pavilion Kangetsu-do — a 14th-century Korean wooden Kannon statue moved here from Seoul in 1924, one of the rare Korean Buddha figures in Japan.",
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
            "Kamakura's wide-arc surf beach. In the off-season it's almost empty. Sit on the sand and watch the sun drop behind the Izu peninsula to the west; the sky moves from orange to pink to deep purple, and time presses pause. Surfer silhouettes line up one after another — Kamakura is the closest place to Tokyo to learn surfing. On the way back, the Enoden carries you back; a brief stop at Shichirigahama Station to glance at the moonlit sea, then back to Tokyo. This is the photo that earns the cover slot of your 'our trip' album.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
        },
      ],
    },
  ],
  packingTips: [
    "Slip-on shoes — you'll remove them at every shrine, ryokan, and several restaurants; lace-up sneakers will quickly annoy you",
    "A small day bag — Tokyo has almost no public trash cans, so you'll carry wrappers all day",
    "Portable charger (10,000mAh+) — Google Maps and translate eat battery fast",
    "Cash wallet — many small restaurants are still cash-only; small bills under ¥5,000 are most useful",
    "Wet wipes — some public restrooms don't supply tissues; bring your own to be safe",
    "Light jacket — even in summer, subway and department-store AC is arctic",
  ],
  budgetEstimate: "~$120–180/day for a couple, excluding hotel",
  generalTips: [
    "Get a Suica IC card on day 1 — tap-to-pay for every train, bus, and many vending machines; balance refundable at any konbini",
    "Convenience store food (7-Eleven, Lawson, FamilyMart) is genuinely good — onigiri, oden, and egg sandwiches solve breakfast and lunch",
    "Tipping is not customary and can confuse staff — don't",
    "Most museums close on Mondays — plan accordingly",
    "Download the 'Japan Travel' app — offline maps, JR timetables, tax-refund locations",
    "Konbini ATMs accept Visa and most foreign cards; 7-Bank has the best exchange rate",
  ],
};

export default tokyo4dCouple;
