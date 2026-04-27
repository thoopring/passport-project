import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Hanoi, 4 days, solo, budget.
 *
 * Old Quarter deep-dive, a Halong Bay day trip, and a pho crawl.
 * Hand-curated with real coordinates. Budget-focused — meals under $5
 * are common. Text fields are intentionally enriched beyond typical API
 * output — samples are the conversion surface.
 */
const hanoi4dSolo: TripPlan = {
  destination: "Hanoi",
  destinationCountry: "Vietnam",
  durationDays: 4,
  overview:
    "Four days solo in Hanoi — one of Southeast Asia's most characterful cities. Scooter chaos, $2 pho at dawn, 1,000-year-old pagodas, and a Halong Bay day trip that's the one splurge. Budget-friendly throughout; you can eat three meals for under $10. The strength of Hanoi is that it isn't 'packaged' — most small streets still belong to locals, not Airbnb. You sit on a plastic stool drinking coffee, a Vietnamese grandmother selling pho next to you, schoolchildren cycling past — real street life that's already vanished from Bangkok or Singapore.",
  bestSeasonNote:
    "October through April is dry-season Hanoi with comfortable temps. May-September is the monsoon; the city still functions but expect afternoon downpours. Tet (Lunar New Year, late Jan/Feb) closes many restaurants. September-October autumn is the prettiest Hanoi — yellow leaves, crisp air, glaring yellow ginkgos by the lake. Year-end has a strong Christmas atmosphere — French colonial heritage, the Catholic churches decorate.",
  currencyTip:
    "Vietnamese Dong (VND). 24,000 VND ≈ $1. Cards at hotels and tourist restaurants; street food and local places are cash only. Small denominations are gold — hold onto 10k, 20k, 50k notes ($0.40, $0.80, $2). At the airport ATM, withdraw 1-2 million dong (~$40-80). BIDV and Vietcombank are large local banks; their ATMs are most reliable.",
  languageTip:
    "Vietnamese. 'Cảm ơn' (thank you) covers most interactions. English is limited outside hotels but tourist areas are fine. Google Translate offline pack saves you many times per day. The simplest = finger + smile — Vietnamese people are extremely friendly, get lost and someone comes to help in 10 seconds.",
  emergencyNumber: "113 (police), 115 (ambulance), 114 (fire), 113 or 114 (English-language hotline)",
  hotel: {
    name: "Hanoi La Siesta Classic Ma May",
    area: "Old Quarter",
    address: "94 Ma May St., Hoan Kiem District",
    coords: [105.8533, 21.0352],
    rationale:
      "Ma May Street puts you in the heart of the Old Quarter — every pho stall, bia hoi (street beer), and weekend night market within 5 minutes on foot. La Siesta is a small boutique with reliable service, a rooftop bar for sunset, and the best breakfast buffet in its price range. The staff speak English, are warm, and hand you a hand-drawn tourist map — your first stop should start from their recommendations, you almost can't go wrong. In the heart of the Old Quarter, walk out and turn left = you're already in a tiny alley, no need to walk far.",
    priceTier: "$$",
    estimatedNightlyRate: "~$75/night",
  },
  airportTransit: {
    method: "Pre-booked hotel transfer OR Airport Bus 86",
    duration: "~45 min transfer, ~60 min bus",
    cost: "~$15 private / $1.50 bus",
    instructions:
      "From Noi Bai International (HAN), the easiest option is a pre-booked transfer via your hotel — they'll have a driver holding your name sign at arrivals. Budget option: Airport Bus 86 runs every 20 minutes to Hoan Kiem Lake (~1 hour, 35,000 VND). Grab/taxi from the taxi counter is ~$20-25. Avoid hailing street taxis at the airport — scam rates are common. The 'private drivers' soliciting at the airport gate are 99% scammers — they'll triple-charge and switch cars mid-trip to add fees.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Old Quarter immersion",
      summary:
        "Check in, walk the 36 ancient streets, a traditional water puppet show, and the cheapest bia hoi in Asia.",
      stops: [
        {
          order: 1,
          time: "14:00",
          type: "rest",
          name: "La Siesta check-in + rooftop",
          area: "Old Quarter",
          coords: [105.8533, 21.0352],
          duration: "1 hour",
          description:
            "Drop bags, shower, and head to the rooftop. A cold Saigon Beer ($2) and a 360 view of the Old Quarter terra-cotta tile roofs to get your bearings. From the rooftop you hear a symphony of scooter horns — Hanoi has 3 million scooters on the road daily, that's the city's BGM. La Siesta serves a free afternoon tea 12-2pm — Vietnamese spring rolls + drip coffee, you can sit and dream for an hour.",
          estimatedCost: "~$4 for a beer",
          transitFromPrev: "From airport",
        },
        {
          order: 2,
          time: "15:30",
          type: "sight",
          name: "Hoan Kiem Lake + Ngoc Son Temple",
          area: "Hoan Kiem",
          coords: [105.8524, 21.0287],
          duration: "1.5 hours",
          description:
            "The heart of Hanoi. Walk around the lake counter-clockwise, cross the red Huc Bridge to Ngoc Son Temple on a tiny island. Local grandmothers doing tai chi, young couples on dates. The Huc Bridge is a postcard landmark of Hanoi — red lacquered wood against green water. Inside Ngoc Son temple is a 1,000+ kg ancient turtle specimen — legend says a 15th-century sacred turtle from this lake retrieved a sword from the king (hence 'Sword Restored Lake'); the specimen you see is from 1968, the last giant turtle found. At 5-6am every morning at Hoan Kiem, locals do tai chi, joggers run, university students read on benches — the city's purest morning.",
          estimatedCost: "~$2 temple entry",
          transitFromPrev: "5 min walk from hotel",
        },
        {
          order: 3,
          time: "17:00",
          type: "shopping",
          name: "Old Quarter street-name walk",
          area: "Old Quarter",
          coords: [105.8512, 21.0357],
          duration: "1 hour",
          description:
            "Each of the 36 streets in the Old Quarter is named for the product historically sold there — Hang Bac (silver), Hang Gai (silk), Hang Ma (paper goods), Hang Thiec (tin). Walk from the lake north along Hang Dao, loop through 4-5 streets, see how much tradition survives. Hang Bac still has 30+ silver workshops at 1/3 the prices of Paris. Hang Quat is full of red Vietnamese silk lanterns ($5 to hang at home). Hang Gai is where international designer Tia Le has her shop — custom-tailored ao dai in 3 days, 1/4 of Shanghai prices.",
          estimatedCost: "Free",
          transitFromPrev: "Built in",
        },
        {
          order: 4,
          time: "18:30",
          type: "activity",
          name: "Thang Long Water Puppet Theatre",
          area: "Hoan Kiem",
          address: "57B Dinh Tien Hoang",
          coords: [105.8523, 21.0327],
          duration: "1 hour",
          description:
            "An 11th-century Vietnamese art form — puppets dance on a waist-deep water stage, controlled by rods from behind a bamboo curtain. Narration is Vietnamese but the visual comedy carries. 50-minute show with live traditional music (single-string, moon lute, flutes). Repertoire includes 'Dragon-Phoenix,' 'Fishing,' 'Fire Dance,' and 10 small acts. Each is 3-5 min, fast paced, no nap risk. Pick your seat in the lobby — rows 3-5 dead center are optimal.",
          estimatedCost: "~$4",
          bookingTip: "Buy tickets 30 min before showtime at the box office — 18:30 and 20:00 shows sell out in high season.",
          transitFromPrev: "5 min walk",
        },
        {
          order: 5,
          time: "20:00",
          type: "meal",
          name: "Bun Cha Ta",
          area: "Old Quarter",
          address: "21 Nguyen Huu Huan",
          coords: [105.8559, 21.0330],
          duration: "1 hour",
          description:
            "Hanoi's signature dish — grilled pork patties in sweet dipping broth with rice noodles and piles of fresh herbs. Bun Cha Ta has the best ambiance (old-house setting) and the quality hasn't slipped since Obama/Bourdain in 2016. Combo Set ($5) includes bun cha + spring rolls + local herbal tea. When ordering, don't forget the 'Bun' (rice noodles) + 'Cha Ca' (grilled fish) + 'Nem' (fried spring rolls) mix — three flavors at once.",
          estimatedCost: "~$6",
          transitFromPrev: "5 min walk",
        },
        {
          order: 6,
          time: "21:30",
          type: "activity",
          name: "Bia hoi corner (Ta Hien + Luong Ngoc Quyen)",
          area: "Old Quarter",
          coords: [105.8541, 21.0343],
          duration: "1 hour",
          description:
            "Sit on a tiny red plastic stool at the most famous street corner in Hanoi. Bia hoi is 5,000 VND (20¢) fresh beer poured from a keg delivered that morning — no preservatives, must be drunk by night. Peanuts are free. Not a curated bar — real street nightlife. You sit for 5 min and the German next to you starts a conversation. 3 bia hoi ($0.60) + a fried fish-cake plate ($1.50), then leave — that's the essence of Hanoi night.",
          estimatedCost: "~$3",
          transitFromPrev: "3 min walk",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Halong Bay day trip",
      summary:
        "The one splurge of the trip — a long day cruising through 1,600 limestone karst islands. Cave, kayaking, and seafood lunch.",
      stops: [
        {
          order: 1,
          time: "07:30",
          type: "transit",
          name: "Tour shuttle pickup → Halong",
          area: "Old Quarter → Halong",
          coords: [107.0445, 20.9101],
          duration: "3 hours",
          description:
            "Pre-booked cruise tour picks up from major Old Quarter hotels around 07:30-08:00. Choose a mid-range day-cruise operator (Bhaya, Indochina Junk, or Paradise) — $40-70 range. They drive you 3 hours east to Halong Bay, stop for one bathroom break. The driver plays Vietnamese folk music or Spotify Vietnamese — you hear the local rhythms, that's the cultural conversion you don't get on the plane.",
          estimatedCost: "Included in tour",
          transitFromPrev: "Hotel lobby pickup",
        },
        {
          order: 2,
          time: "11:00",
          type: "activity",
          name: "Halong Bay cruise",
          area: "Halong Bay",
          coords: [107.1000, 20.8500],
          duration: "5 hours",
          description:
            "Board a traditional 'junk' boat, sail through Ha Long's limestone karsts rising from emerald water. Itinerary typically includes: lunch on board (multi-course seafood — 6-8 local seafood items: crabs, prawns, squid, 3-meal sets); kayaking 45 min in a hidden lagoon; visit to Sung Sot (Surprise) Cave or Thien Cung (Heavenly Palace) Cave; swimming off the top deck. Lifeguard on the boat, water safe. Around 3-4pm catch the 'ascent of the sun' — Halong's unique reverse-sunset effect.",
          estimatedCost: "~$60 for a mid-range day tour",
          bookingTip: "Book with a rep agency like Flamingo Travel or Threeland Travel; avoid $20 bargain tours — boats are unsafe, occasional accidents.",
          transitFromPrev: "Port boarding",
        },
        {
          order: 3,
          time: "16:00",
          type: "transit",
          name: "Return to Hanoi",
          area: "Halong → Old Quarter",
          coords: [105.8533, 21.0352],
          duration: "3 hours",
          description:
            "Bus back with one rest stop. Arrive at your hotel 19:00-19:30. Long day — reward yourself with a quiet dinner close to the hotel. The driver puts on soft music 15 min in — you'll auto-sleep, just enough to recover.",
          estimatedCost: "Included",
          transitFromPrev: "Port departure",
        },
        {
          order: 4,
          time: "20:00",
          type: "meal",
          name: "Cha Ca La Vong",
          area: "Old Quarter",
          address: "14 Cha Ca St.",
          coords: [105.8501, 21.0355],
          duration: "1 hour",
          description:
            "A single-dish restaurant since 1871 — turmeric-marinated catfish sautéed tableside on a clay brazier with dill and scallions, served over rice noodles with peanuts and fish sauce. The only thing on the menu. Worth the splurge over street food — it's uniquely Vietnamese 'concentrated deliciousness.' $12 per person, share between 2-3.",
          estimatedCost: "~$12",
          transitFromPrev: "10 min walk from hotel",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Imperial Hanoi",
      summary:
        "Ho Chi Minh Mausoleum, Temple of Literature, Hanoi Train Street, and the French Quarter for a late lunch.",
      stops: [
        {
          order: 1,
          time: "07:30",
          type: "meal",
          name: "Pho Gia Truyen (Bat Dan) — breakfast pho",
          area: "Old Quarter",
          address: "49 Bat Dan St.",
          coords: [105.8484, 21.0349],
          duration: "45 min",
          description:
            "The best bowl of pho bo (beef noodle soup) in Hanoi, according to most locals. You queue, order, pay, and sit — self-service. Slurp loudly, add chili and lime to taste. Opens 06:00, closes when broth runs out (~10:00). Pho Gia Truyen uses 30 kg of beef bones simmered 8 hours — clear yet deep, unlike the dense soups of southern China; closer to the layered finish of clear tea. $3 a bowl. Note: you don't pick the beef cut — the master gives you the 'signature combo': tendons, shank, raw beef slices blanched in the soup.",
          estimatedCost: "~$3",
          transitFromPrev: "7 min walk from hotel",
        },
        {
          order: 2,
          time: "09:00",
          type: "sight",
          name: "Ho Chi Minh Mausoleum",
          area: "Ba Dinh",
          coords: [105.8342, 21.0369],
          duration: "1.5 hours",
          description:
            "The embalmed body of 'Uncle Ho' lies in a granite mausoleum overlooking Ba Dinh Square — where he declared independence from France in 1945. Strict dress code (covered shoulders and knees, no shorts). Silence inside, no photos. Closed Mondays and Fridays. Behind the mausoleum, the 'Ho Chi Minh Museum' — Soviet-era Brutalist architecture, traces Ho's life from studying in France through leading Vietnamese independence. Free, 2 hours to see it all.",
          estimatedCost: "Free",
          bookingTip: "Arrive by 09:00 — line moves fast early, slows to 45 min by 10:30.",
          transitFromPrev: "Grab car, 15 min",
        },
        {
          order: 3,
          time: "11:00",
          type: "sight",
          name: "Temple of Literature (Van Mieu)",
          area: "Dong Da",
          coords: [105.8357, 21.0282],
          duration: "1.5 hours",
          description:
            "Vietnam's first university, founded 1070. Five courtyards of pavilions, a dragon-carved pond, and 82 stone stelae listing the names of successful exam candidates from 1442-1779 — each mounted on a stone turtle. The most Confucian corner of Hanoi — the Chinese cultural influence on Vietnam in concrete. Late June, Vietnamese university entrance exams; parents come light incense for their children. Look closely at the names — many are still common Vietnamese surnames today.",
          estimatedCost: "~$1.50",
          transitFromPrev: "Grab car, 10 min",
        },
        {
          order: 4,
          time: "13:00",
          type: "meal",
          name: "Banh Mi 25",
          area: "Old Quarter",
          address: "25 Hang Ca",
          coords: [105.8509, 21.0367],
          duration: "45 min",
          description:
            "The best banh mi in Hanoi. Crispy baguette, pate, pork, pickled carrot and daikon, cilantro, chili. Order the 'Banh Mi 25 Special' with all meats — $2. Eat sitting on a plastic stool across the street. Banh mi is a French colonial heritage — Vietnam made the French baguette crispier, cheaper, and more everyday than France. A sweet product of cultural fusion.",
          estimatedCost: "~$2",
          transitFromPrev: "Grab car, 15 min",
        },
        {
          order: 5,
          time: "14:30",
          type: "sight",
          name: "Hanoi Train Street",
          area: "Hoan Kiem",
          coords: [105.8458, 21.0300],
          duration: "1 hour",
          description:
            "A narrow residential alley with a working train track running through it. You can sit in a café while the 15:20 or 19:20 train rumbles past 2 meters from your coffee. Access requires you to enter via a café (they collect a 50,000 VND cover — gray fee that allows tourists in). The moment the train passes, the entire café freezes — you hear the metallic screech, feel the ground shake, the train roars past your eyes — Hanoi's unique 'industrial-residential immersion.'",
          estimatedCost: "~$2",
          bookingTip: "Check train times locally — schedule shifts often. The cafés will tell you.",
          transitFromPrev: "10 min walk",
        },
        {
          order: 6,
          time: "16:30",
          type: "sight",
          name: "Hanoi Opera House + French Quarter walk",
          area: "French Quarter",
          coords: [105.8577, 21.0246],
          duration: "1 hour",
          description:
            "A 1911 neoclassical opera house modeled on the Paris Opera. You can't usually go inside without a performance, but walk the surrounding French Quarter streets (Trang Tien, Ngo Quyen) for 1920s villas and wide boulevards — a colonial contrast to the Old Quarter's chaos. The 'Sofitel Legend Metropole' next door is the 1901 colonial hotel — Princess Diana, Charlie Chaplin, French Prime Ministers stayed here. Lobby is open to walk through; the 'Bamboo Bar' next door serves an oriental cocktail ($10), sit by the century-old window — Vietnam's most luxurious afternoon.",
          estimatedCost: "Free",
          transitFromPrev: "Grab car, 10 min",
        },
        {
          order: 7,
          time: "19:00",
          type: "meal",
          name: "Ngon Garden",
          area: "French Quarter",
          address: "70 Nguyen Du",
          coords: [105.8481, 21.0199],
          duration: "1.5 hours",
          description:
            "A garden-setting food hall showcasing 50+ Vietnamese regional dishes — order a mix of starters, soups, grilled items, and desserts. Tourist-polished but solid quality. Good for a send-off dinner. 'Pho Cuon' (rice-paper rolls) + 'Cha Ca' (grilled fish) + 'Banh Xeo' (Vietnamese crepe) + 'Cafe Sua Da' (iced coffee) combo set $18 covers north-central-south Vietnam. Open-air garden tables under hanging Vietnamese lanterns, small wooden bridge over a stream — the most romantic farewell dinner setting in Hanoi.",
          estimatedCost: "~$18",
          transitFromPrev: "10 min walk",
        },
      ],
    },
    {
      dayNumber: 4,
      theme: "West Lake + Airport",
      summary:
        "Tran Quoc Pagoda, a West Lake breakfast, one last egg coffee, and a calm drive to the airport.",
      stops: [
        {
          order: 1,
          time: "08:00",
          type: "sight",
          name: "Tran Quoc Pagoda",
          area: "West Lake",
          address: "Thanh Nien Rd.",
          coords: [105.8377, 21.0481],
          duration: "1 hour",
          description:
            "Hanoi's oldest pagoda (built 541 CE). Red-and-gold stupa on a small island in West Lake, connected by a short causeway. Monks walking past bodhisattva statues. Peaceful way to start the last day. Pink lotus pond in summer, peak July-August. The 'Tran Quoc' (Defender of the Country) stele — the origin of the Vietnamese name.",
          estimatedCost: "Free (donation welcome)",
          transitFromPrev: "Grab car, 15 min",
        },
        {
          order: 2,
          time: "09:30",
          type: "meal",
          name: "Egg coffee at Giang Café",
          area: "Old Quarter",
          address: "39 Nguyen Huu Huan",
          coords: [105.8554, 21.0331],
          duration: "45 min",
          description:
            "Hanoi invented egg coffee in 1946 when milk was scarce. Giang is where the original family still runs it — a yolk whipped with sweetened condensed milk floats on hot espresso. Tastes like liquid tiramisu. Walk upstairs to the tiny second-floor seating — the décor hasn't changed in 70 years. $1 a cup, order two. With a 'Vietnamese baguette sandwich' ($2) — egg yolk butter + ham + cucumber, simple combo.",
          estimatedCost: "~$2",
          transitFromPrev: "Grab car, 10 min",
        },
        {
          order: 3,
          time: "11:00",
          type: "shopping",
          name: "Dong Xuan Market",
          area: "Old Quarter",
          coords: [105.8496, 21.0383],
          duration: "1 hour",
          description:
            "Hanoi's largest covered market — 4 floors of clothing, bags, household goods, knock-offs, and the food stalls in the back. Good for last-minute souvenir shopping (silk scarves, coffee, lotus tea). Bargain 30-50% off first prices. 'Trung Nguyen' Vietnamese coffee grounds ($4 a bag) — Vietnam's largest brand, stronger than Indonesian. 'Hoa Sen' lotus tea ($5 a bag) — green tea fermented inside a lotus flower, unique Vietnamese, perfect gift.",
          estimatedCost: "~$15 for a few gifts",
          transitFromPrev: "5 min walk",
        },
        {
          order: 4,
          time: "13:00",
          type: "meal",
          name: "Bun Rieu at 40 Hang Tre",
          area: "Old Quarter",
          coords: [105.8556, 21.0359],
          duration: "1 hour",
          description:
            "One last local meal — bun rieu is a tomato-crab noodle soup unique to northern Vietnam, topped with pork and fried tofu. A sit-on-a-tiny-stool street kitchen. The old lady stirring the pot has been there since 1988. $2 a bowl. Soup base from local Hanoi small tomatoes — sweet-tart, completely different from a Western tomato soup. This is 'home cooking' Vietnamese; eating it you have a 'I want to grow old like this too' feeling.",
          estimatedCost: "~$3",
          transitFromPrev: "5 min walk",
        },
        {
          order: 5,
          time: "14:30",
          type: "rest",
          name: "Hotel stop + luggage",
          area: "Old Quarter",
          coords: [105.8533, 21.0352],
          duration: "1 hour",
          description:
            "Back to hotel, shower if needed, collect bags from storage. Pre-arrange the airport transfer.",
          estimatedCost: "Free",
          transitFromPrev: "5 min walk",
        },
        {
          order: 6,
          time: "16:30",
          type: "transit",
          name: "Return to Noi Bai airport",
          area: "Old Quarter → HAN",
          coords: [105.8070, 21.2187],
          duration: "45 min",
          description:
            "Pre-booked hotel transfer to Noi Bai. Budget 3 hours before international departure — Noi Bai's security lines can be slow. Duty free is limited but the 'Trung Nguyen Coffee' gift box ($12) is worth bringing back for friends. There's a 'Pho 24' (Hanoi pho chain) at the airport — one last bowl before boarding.",
          estimatedCost: "~$15",
          transitFromPrev: "Driver pickup at hotel",
        },
      ],
    },
  ],
  packingTips: [
    "A cross-body bag with zipper — Old Quarter scooter drivers snatch loose bags",
    "Long pants or skirt for temple/mausoleum visits",
    "Hand sanitizer — you'll eat with your hands a lot",
    "Small umbrella or poncho — afternoon showers are frequent in dry season too",
    "Cash belt or money pouch — ATMs are everywhere but queues can be long",
    "Anti-diarrheal — Vietnamese spices may surprise your stomach, bring some just in case",
    "Small gifts for local friends (foreign chocolates, perfumes) — Vietnamese value gestures, small gifts return as big hospitality",
  ],
  budgetEstimate: "~$50-80/day excluding hotel (Halong Bay day is the splurge — $60 one-off)",
  generalTips: [
    "Use Grab for every taxi — prices are fixed and transparent in the app",
    "Never take 'Mai Linh' taxis from the street that approach you — they're fake",
    "Crossing the street: walk at a slow, steady pace; scooters flow around you. Don't stop suddenly.",
    "Tipping isn't expected but rounded-up change is appreciated",
    "SIM card: Vietnamobile or Viettel eSIM at the airport, ~$8 for 10GB",
    "Vietnamese meal hours differ from the West — breakfast 5-9am (street pho), lunch 12-1pm, dinner 6-8pm",
  ],
};

export default hanoi4dSolo;
