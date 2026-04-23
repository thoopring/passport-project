import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Hanoi, 4 days, solo, budget.
 *
 * Old Quarter deep-dive, a Halong Bay day trip, and a pho crawl. Hand-curated
 * with real coordinates. Budget-focused — meals under $5 are common.
 */
const hanoi4dSolo: TripPlan = {
  destination: "Hanoi",
  destinationCountry: "Vietnam",
  durationDays: 4,
  overview:
    "Four days solo in Hanoi — one of Southeast Asia's most characterful cities. Scooter chaos, $2 pho at dawn, 1,000-year-old pagodas, and a Halong Bay day trip that's the one splurge. Budget-friendly throughout; you can eat three meals for under $10.",
  bestSeasonNote:
    "October through April is dry-season Hanoi with comfortable temps. May-September is the monsoon; the city still functions but expect afternoon downpours. Tet (Lunar New Year, late Jan/Feb) closes many restaurants.",
  currencyTip:
    "Vietnamese Dong (VND). 24,000 VND ≈ $1. Cards at hotels and tourist restaurants; street food and local places are cash only. Small denominations are gold — hold onto 10k, 20k, 50k notes.",
  languageTip:
    "Vietnamese. 'Cảm ơn' (thank you) covers most interactions. English is limited outside hotels; Google Translate offline pack saves you many times per day.",
  emergencyNumber: "113 (police), 115 (ambulance), 114 (fire)",
  hotel: {
    name: "Hanoi La Siesta Classic Ma May",
    area: "Old Quarter",
    address: "94 Ma May St., Hoan Kiem District",
    coords: [105.8533, 21.0352],
    rationale:
      "Ma May Street puts you in the heart of the Old Quarter — every pho stall, bia hoi (street beer), and weekend night market within 5 minutes on foot. La Siesta is a small boutique with reliable service, a rooftop bar for sunset, and the best breakfast buffet in its price range.",
    priceTier: "$$",
    estimatedNightlyRate: "~$75/night",
  },
  airportTransit: {
    method: "Pre-booked hotel transfer OR Airport Bus 86",
    duration: "~45 min transfer, ~60 min bus",
    cost: "~$15 private / $1.50 bus",
    instructions:
      "From Noi Bai International (HAN), the easiest option is a pre-booked transfer via your hotel — they'll have a driver holding your name sign at arrivals. Budget option: Airport Bus 86 runs every 20 minutes to Hoan Kiem Lake (~1 hour, 35,000 VND). Grab/taxi from the taxi counter is ~$20-25. Avoid hailing street taxis at the airport — scam rates are common.",
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
            "Drop bags, shower, and head to the rooftop. A cold Saigon Beer and a 360 view of the Old Quarter terra-cotta tile roofs to get your bearings.",
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
            "The heart of Hanoi. Walk around the lake counter-clockwise, cross the red Huc Bridge to Ngoc Son Temple on a tiny island. Local grandmothers doing tai chi, young couples on dates. The soul of the city in one loop.",
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
            "Each of the 36 streets in the Old Quarter is named for the product historically sold there — Hang Bac (silver), Hang Gai (silk), Hang Ma (paper goods), Hang Thiec (tin). Walk from the lake north along Hang Dao, loop through 4-5 streets, see how much tradition survives.",
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
            "An 11th-century Vietnamese art form — puppets dance on a waist-deep water stage, controlled by rods from behind a bamboo curtain. Narration is Vietnamese but the visual comedy carries. 50-minute show with live traditional music.",
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
            "Hanoi's signature dish — grilled pork patties in sweet dipping broth with rice noodles and piles of fresh herbs. Bun Cha Ta has the best ambiance (old-house setting) and the quality hasn't slipped since Obama/Bourdain.",
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
            "Sit on a tiny red plastic stool at the most famous street corner in Hanoi. Bia hoi is 5,000 VND (20¢) fresh beer poured from a keg delivered that morning. Peanuts are free. The street-level nightlife is the real experience — not a curated bar.",
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
            "Pre-booked cruise tour picks up from major Old Quarter hotels around 07:30-08:00. Choose a mid-range day-cruise operator (Bhaya, Indochina Junk, or Paradise) — $40-70 range. They drive you 3 hours east to Halong Bay, stop for one bathroom break.",
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
            "Board a traditional 'junk' boat, sail through Ha Long's limestone karsts rising from emerald water. Itinerary typically includes: lunch on board (multi-course seafood), kayaking in a hidden lagoon, visit to Sung Sot (Surprise) Cave or Thien Cung (Heavenly Palace) Cave, swimming off the top deck.",
          estimatedCost: "~$60 for a mid-range day tour",
          bookingTip: "Book with a rep agency like Flamingo Travel or Threeland Travel; avoid $20 bargain tours — boats are unsafe.",
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
            "Bus back with one rest stop. Arrive at your hotel 19:00-19:30. Long day — reward yourself with a quiet dinner close to the hotel.",
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
            "A single-dish restaurant since 1871 — turmeric-marinated catfish sautéed tableside on a clay brazier with dill and scallions, served over rice noodles with peanuts and fish sauce. The only thing on the menu. Worth the splurge over street food.",
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
            "The best bowl of pho bo (beef noodle soup) in Hanoi, according to most locals. You queue, order, pay, and sit — self-service. Slurp loudly, add chili and lime to taste. Opens 06:00, closes when broth runs out (~10:00).",
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
            "The embalmed body of 'Uncle Ho' lies in a granite mausoleum overlooking Ba Dinh Square — where he declared independence from France in 1945. Strict dress code (covered shoulders and knees, no shorts). Silence inside. Closed Mondays and Fridays.",
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
            "Vietnam's first university, founded 1070. Five courtyards of pavilions, a dragon-carved pond, and 82 stone stelae listing the names of successful exam candidates from 1442-1779 — each mounted on a stone turtle. The most Confucian corner of Hanoi.",
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
            "The best banh mi in Hanoi. Crispy baguette, pate, pork, pickled carrot and daikon, cilantro, chili. Order the 'Banh Mi 25 Special' with all meats. Eat sitting on a plastic stool across the street.",
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
            "A narrow residential alley with a working train track running through it. You can sit in a café while the 15:20 or 19:20 train rumbles past 2 meters from your coffee. Access requires you to enter via a café (they collect a 50,000 VND cover).",
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
            "A 1911 neoclassical opera house modeled on the Paris Opera. You can't usually go inside without a performance, but walk the surrounding French Quarter streets (Trang Tien, Ngo Quyen) for 1920s villas and wide boulevards — a colonial contrast to the Old Quarter's chaos.",
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
            "A garden-setting food hall showcasing 50+ Vietnamese regional dishes — order a mix of starters, soups, grilled items, and desserts. Tourist-polished but solid quality. Good for a send-off dinner.",
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
            "Hanoi's oldest pagoda (built 541 CE). Red-and-gold stupa on a small island in West Lake, connected by a short causeway. Monks walking past bodhisattva statues. Peaceful way to start the last day.",
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
            "Hanoi invented egg coffee in 1946 when milk was scarce. Giang is where the original family still runs it — a yolk whipped with sweetened condensed milk floats on hot espresso. Tastes like liquid tiramisu. Walk upstairs to the tiny second-floor seating.",
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
            "Hanoi's largest covered market — 4 floors of clothing, bags, household goods, knock-offs, and the food stalls in the back. Good for last-minute souvenir shopping (silk scarves, coffee, lotus tea). Bargain 30-50% off first prices.",
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
            "One last local meal — bun rieu is a tomato-crab noodle soup unique to northern Vietnam, topped with pork and fried tofu. A sit-on-a-tiny-stool street kitchen. The old lady stirring the pot has been there since 1988.",
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
            "Pre-booked hotel transfer to Noi Bai. Budget 3 hours before international departure — Noi Bai's security lines can be slow.",
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
  ],
  budgetEstimate: "~$50-80/day excluding hotel (Halong Bay day is the splurge — $60 one-off)",
  generalTips: [
    "Use Grab for every taxi — prices are fixed and transparent in the app",
    "Never take 'Mai Linh' taxis from the street that approach you — they're fake",
    "Crossing the street: walk at a slow, steady pace; scooters flow around you. Don't stop suddenly.",
    "Tipping isn't expected but rounded-up change is appreciated",
    "SIM card: Vietnamobile or Viettel eSIM at the airport, ~$8 for 10GB",
  ],
};

export default hanoi4dSolo;
