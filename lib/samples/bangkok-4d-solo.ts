import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Bangkok, 4 days, solo traveler, budget tier.
 *
 * Hostel base, street food heavy, public transit only. Coordinates pinned to
 * real landmarks. Text fields are intentionally enriched beyond typical API
 * output — samples are the conversion surface.
 */
const bangkok4dSolo: TripPlan = {
  destination: "Bangkok",
  destinationCountry: "Thailand",
  durationDays: 4,
  overview:
    "Four days for a solo traveler on a tight budget who wants to see Bangkok's three faces — temple Bangkok, street-food Bangkok, and weird-night Bangkok. You'll never spend more than $5 on a meal, you'll see the Grand Palace before the heat, and by Friday you'll have a Khao San Road story to take home. Bangkok is one of Asia's most accessible solo cities: cheap, safe, English-comfortable, never boring. After 3 days you'll have the dangerous thought of 'I could stay another month.'",
  bestSeasonNote:
    "November–February is the dry, (relatively) cool season — your prime window. Outside of that, you'll be soaked by 11am. April is the Songkran festival (Thai New Year water-fight) — the loudest, hottest period of the year (40°C+); thrilling to be drenched in it but plan for your phone to die. May–October is the monsoon, with predictable 30-minute torrential rain around 3–4pm — ideal time to take shelter in a café with Thai iced tea.",
  currencyTip:
    "Withdraw 5,000–10,000 baht (~$140–280) from a bank ATM (Krungsri, SCB, or Bangkok Bank) — avoid the standalone purple 'slim' ATMs which charge 220 baht (~$6) per transaction. Most street food is cash only. Konbini and large malls accept Visa and many UnionPay cards. A Wise card or Curve has the best exchange rate — set it up before you fly.",
  languageTip:
    "Download the Google Translate Thai pack offline before you leave — Thai script is impossible to guess for foreigners. 'Sawadee krap/ka' (hello, krap for male/ka for female) and 'Khop khun krap/ka' (thank you) get instant smiles. Pointing + smiling + the wai (palms together at chest) is universal. 'Mai sai pak chee' (no cilantro) is the foodie's secret phrase.",
  emergencyNumber: "1155 (tourist police, English-speaking), 1669 (medical), 191 (police)",
  hotel: {
    name: "Lub d Bangkok Siam (8-bed mixed dorm)",
    area: "Siam",
    address: "925/9 Rama I Road, Pathum Wan, Bangkok 10330",
    coords: [100.5360, 13.7460],
    rationale:
      "Lub d Siam puts you 4 minutes from BTS National Stadium and 8 minutes from Siam Square — meaning every part of the city, the river, and the temple district is one or two BTS stops away (river ferry transfers included). The hostel is famously clean, with strong AC and a real workspace, and dorm beds have privacy curtains and individual outlets. From BKK Suvarnabhumi, the Airport Rail Link drops you at Phaya Thai, then 2 BTS stops to Siam, total 15 minutes door-to-door. Dorm bed is ~$18/night — the savings cover 3 Michelin-listed street-food meals.",
    priceTier: "$",
    estimatedNightlyRate: "~$18/night",
  },
  airportTransit: {
    method: "Airport Rail Link → BTS Skytrain",
    duration: "~50 minutes",
    cost: "~$2",
    instructions:
      "From Suvarnabhumi (BKK) basement, follow the green Airport Rail Link signs. Buy a single token from the machine (45 baht) for the City Line to Phaya Thai (terminus). Transfer up one floor to the BTS Sukhumvit line — buy another token, 26 baht, ride 2 stops to Siam, transfer to Silom line, 1 stop to National Stadium. Hostel is 4 min walk on the right. After midnight when the Airport Rail Link stops, Grab to the hostel runs ~$12.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Royal Bangkok",
      summary:
        "Hit the three big temples in the morning before the heat and the dress-code touts. Eat your weight in pad thai for dinner.",
      stops: [
        {
          order: 1,
          time: "08:00",
          type: "sight",
          name: "Grand Palace & Wat Phra Kaew",
          area: "Phra Nakhon",
          address: "Na Phra Lan Road, Phra Borom Maha Ratchawang",
          coords: [100.4915, 13.7500],
          duration: "2 hours",
          description:
            "Get there at 8:30 sharp when the gates open — by 10am the lines are 45 minutes long. Wear long pants and covered shoulders or they will refuse you (a sarong rents at the gate for $1.50 but the deposit refund process is a mess). The Emerald Buddha inside Wat Phra Kaew is small (only 66cm tall) but the surrounding gold, colored glass, and porcelain pile-ups make you feel inside a 3D cartoon. Shoes off in front of the Buddha. As you exit, on the left of the main gate, an old woman sells grilled bananas at 2 baht apiece — eat them hot. That's the image Anthony Bourdain took home.",
          estimatedCost: "~$15",
          bookingTip: "Ignore anyone outside saying it's 'closed today' — that's a tuk-tuk scam, 99% of the time. Walk straight in.",
          transitFromPrev: "BTS to Saphan Taksin, then Chao Phraya Express boat to Tha Chang pier (~30 min total)",
        },
        {
          order: 2,
          time: "10:30",
          type: "sight",
          name: "Wat Pho (Reclining Buddha)",
          area: "Phra Nakhon",
          coords: [100.4933, 13.7466],
          duration: "1 hour",
          description:
            "A 46-meter gold Reclining Buddha that's longer than a basketball court. Drop coins one at a time into the 108 bronze bowls along the back wall — the sound is hypnotic for 3 minutes. The mother-of-pearl spirals on the soles of the Buddha's feet are auspicious symbols carved by hand. Wat Pho is also the birthplace of traditional Thai massage; the on-site school offers 1-hour massages for $10, 2-hour packages for $15 — better quality than any hotel spa. Pre-book to specify a female or male therapist.",
          estimatedCost: "~$6 + $10 massage",
          transitFromPrev: "10 min walk south",
        },
        {
          order: 3,
          time: "12:00",
          type: "meal",
          name: "Tha Tien Market noodles",
          area: "Tha Tien Pier",
          coords: [100.4933, 13.7440],
          duration: "45 min",
          description:
            "A handful of family stalls right by the pier. Order boat noodles (kuay teow ruea, the mini-bowls originally invented for eating on floating-market boats) — 4 spoonfuls per bowl, designed for sampling multiple broths. Classic combo: pork-blood broth + clear-beef-tendon + tom yum chicken at $1 a bowl each. Add a side of crispy pork rind (kaeb moo) for $0.40. The cheapest, happiest meal of your day in Bangkok.",
          estimatedCost: "~$3",
          transitFromPrev: "5 min walk",
        },
        {
          order: 4,
          time: "13:00",
          type: "sight",
          name: "Wat Arun (Temple of Dawn)",
          area: "Thonburi",
          coords: [100.4886, 13.7437],
          duration: "1.5 hours",
          description:
            "Cross the Chao Phraya on the 5-baht ferry (the green-shirted boatmen run every 5 minutes). Wat Arun's central prang is covered in broken porcelain donated by 19th-century Chinese trading ships as ballast — in sunlight the entire tower glints. Climb the steep 45-degree stairs to the mid-platform; the city's best Chao Phraya view sits there. On the way back, don't rush onto the ferry — at 'The Deck by Arun Residence' on the west bank, order Thai iced tea ($2) on the riverside terrace facing Wat Arun; come dusk when the gold lights flicker on, this is your sunset postcard.",
          estimatedCost: "~$3 entry + $0.20 ferry",
          transitFromPrev: "5-baht ferry across river",
        },
        {
          order: 5,
          time: "16:00",
          type: "rest",
          name: "Hostel siesta",
          area: "Siam",
          coords: [100.5360, 13.7460],
          duration: "1.5 hours",
          description:
            "It is 38°C. Go nap. The city wakes up again at sunset and you'll need energy. This is the 'tropical wisdom' Thais all observe — no outdoor activity at midday.",
          estimatedCost: "Free",
          transitFromPrev: "Boat back to Saphan Taksin → BTS to National Stadium, ~40 min",
        },
        {
          order: 6,
          time: "18:30",
          type: "meal",
          name: "Thip Samai Pad Thai",
          area: "Phra Nakhon",
          coords: [100.5025, 13.7530],
          duration: "1 hour",
          description:
            "Bangkok's most famous pad thai — they've been making it the same way since 1966 in the same wok. Order the signature shrimp version: noodles wrapped in a paper-thin egg crepe, opened tableside to reveal the dish — visual theater. $5 a portion. Add the orange juice ($2) — hand-squeezed, no water or sugar, in recycled glass soda bottles. 15–20 minute queue is normal; if you don't want to wait, takeout (the box keeps it warm 30 min).",
          estimatedCost: "~$5",
          transitFromPrev: "Taxi or Grab from hostel, ~25 min",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Markets & Khao San",
      summary:
        "Weekend market in the morning, river sunset, and a night out on Khao San Road for the story.",
      stops: [
        {
          order: 1,
          time: "09:00",
          type: "shopping",
          name: "Chatuchak Weekend Market",
          area: "Chatuchak",
          address: "587/10 Kamphaeng Phet 2 Rd",
          coords: [100.5510, 13.8000],
          duration: "3 hours",
          description:
            "15,000 stalls across 35 acres. You will get lost — that's the point. Sections to find: clothes (1–6), art (7), food (26–27), and yes, the puppy section (just look, don't buy). Bargain to 60% of the asking price. The 'Section 26 Coconut Ice Cream' stall (coconut ice cream served in a coconut shell, $1.50) is non-negotiable. Handcrafted leather bags, scented candles, Thai silk scarves are great souvenirs to bring home. The 'Chatuchak Guide' app has a built-in map but you'll throw it out and follow your nose.",
          estimatedCost: "~$30 if you actually shop",
          bookingTip: "Saturday and Sunday only. Get there at 9am or you'll roast by 11. Carry one big bottle of water ($1.50) in your backpack and sip constantly.",
          transitFromPrev: "BTS to Mo Chit, ~15 min, then 5 min walk",
        },
        {
          order: 2,
          time: "12:30",
          type: "meal",
          name: "Chatuchak food court",
          area: "Inside Chatuchak",
          coords: [100.5510, 13.7995],
          duration: "1 hour",
          description:
            "Section 26 is a food labyrinth. Try mango sticky rice ($4), coconut ice cream in the shell ($1.50), various grilled-meat skewers ($0.40 each), Thai fish-cake fritters ($3). Plastic stool, hands. 'Pad See Ew' (broad rice noodles stir-fried) + 'Tom Yum' soup + 'Mango Sticky Rice' are the weekend market trio.",
          estimatedCost: "~$6",
          transitFromPrev: "Built in",
        },
        {
          order: 3,
          time: "14:30",
          type: "rest",
          name: "Hostel break + cool shower",
          area: "Siam",
          coords: [100.5360, 13.7460],
          duration: "2 hours",
          description: "Heat exhaustion is real. Go back, shower, charge your phone, regroup.",
          estimatedCost: "Free",
          transitFromPrev: "BTS Mo Chit → Siam → National Stadium, ~25 min",
        },
        {
          order: 4,
          time: "17:00",
          type: "activity",
          name: "Chao Phraya river boat sunset",
          area: "Sathorn pier",
          coords: [100.5135, 13.7195],
          duration: "1 hour",
          description:
            "Buy a 30-baht orange-flag local boat ticket — a real commuter boat — and ride from Sathorn pier upriver as far as Phra Athit. Before you board, grab a cold beer ($1.50) from the pier kiosk, sit on the right side. In 30 minutes you pass Wat Arun, the Grand Palace, and Wat Phra Kaew's gold spires gilded by the setting sun, then the sky reddens over the river. The single best $1 you'll spend in Bangkok.",
          estimatedCost: "~$1",
          transitFromPrev: "BTS to Saphan Taksin, ~15 min",
        },
        {
          order: 5,
          time: "19:00",
          type: "meal",
          name: "Khao San Road street food",
          area: "Khao San",
          coords: [100.4972, 13.7587],
          duration: "1 hour",
          description:
            "The famous backpacker street. Grab a 50-baht pad see ew ($1.40) and a 30-baht banana roti ($0.85) from any cart. The scorpion-on-a-stick guy is the same one who's been there since 2003 — a scorpion or tarantula skewer is $0.85, photo with him for $0.55 tip. Khao San's 'chaos' is its soul — at the same moment you'll see blonde European backpackers, Indian families, Chinese university students, local high schoolers, drunk Australians, child beggars, masseuses, and tuk-tuk drivers all crossing each other.",
          estimatedCost: "~$5",
          transitFromPrev: "10 min walk from Phra Athit pier",
        },
        {
          order: 6,
          time: "20:30",
          type: "activity",
          name: "Khao San bar crawl",
          area: "Khao San",
          coords: [100.4970, 13.7585],
          duration: "2 hours",
          description:
            "Pick a hostel bar — 'Buddy Bar', 'Madame Musur', 'The Club Khaosan' all work. Get a 100-baht 'bucket' (bucket cocktail, usually Sangsom Thai rum + Red Bull + Coke), accompanied by life stories from 14 nationalities of backpackers. In an hour you'll know how a Norwegian woman opened a travel agency in Bangkok; in 2 hours someone will invite you to Chiang Mai for the weekend. Leave by midnight and walk back to the hostel sober. That's the legend of Khao San — every visitor has their own version.",
          estimatedCost: "~$8",
          transitFromPrev: "Built in",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Day trip: Ayutthaya",
      summary:
        "Thailand's old royal capital, 80km north. Ruined temples, brick stupas, and a Buddha head wrapped in tree roots.",
      stops: [
        {
          order: 1,
          time: "07:30",
          type: "transit",
          name: "Train to Ayutthaya",
          area: "Hua Lamphong → Ayutthaya",
          coords: [100.5600, 14.3530],
          duration: "1.5 hours",
          description:
            "Take the 3rd-class commuter train from Hua Lamphong (15 baht). Open windows, hard plastic seats, slow but real. This is how ordinary Thais travel — vendors come down the aisle with wooden trays selling chicken-rice, coconut juice, sliced mango. This is what 'on the road' actually means. Download Spotify offline music; the scenery shifts from city to rice paddies in 90 minutes, and you'll understand why so many Western backpackers come and never leave.",
          estimatedCost: "~$0.50",
          transitFromPrev: "MRT to Hua Lamphong",
        },
        {
          order: 2,
          time: "10:00",
          type: "sight",
          name: "Wat Mahathat (Buddha head in tree)",
          area: "Ayutthaya Historical Park",
          coords: [100.5680, 14.3565],
          duration: "1.5 hours",
          description:
            "A sandstone Buddha head wrapped in fig roots — the most photographed image in Ayutthaya. 500 years ago Burmese invaders decapitated the temple's Buddha statues, and the tree slowly grew around this fallen head. To photograph it you crouch (your head must not be higher than the Buddha's — Thai etiquette). The surrounding ruins span massive areas, almost empty before the tour buses arrive at 11am — perfect for imagining the glory of the Ayutthaya Kingdom in its prime.",
          estimatedCost: "~$2",
          transitFromPrev: "Tuk-tuk from station, ~$3",
        },
        {
          order: 3,
          time: "12:00",
          type: "meal",
          name: "Boat noodles at Lung Lek",
          area: "Ayutthaya",
          coords: [100.5640, 14.3520],
          duration: "45 min",
          description:
            "Tiny bowls, dark broth, beef. Locals stack the empty bowls on the table to count — a table of 8 stacked bowls is normal, challenge yourself. $0.85 a bowl, you can eat 10 and spend $8. The owner is from a 1950s family; the wall has black-and-white photos of local notables across the decades.",
          estimatedCost: "~$4",
          transitFromPrev: "Tuk-tuk, $2",
        },
        {
          order: 4,
          time: "13:30",
          type: "sight",
          name: "Wat Phra Si Sanphet & Wihan Phra Mongkhon Bophit",
          area: "Ayutthaya Historical Park",
          coords: [100.5570, 14.3567],
          duration: "1.5 hours",
          description:
            "Three giant restored chedis on a single platform — the iconic Ayutthaya skyline. The neighboring Wihan houses a 12-meter bronze Buddha rebuilt in the 1950s after WWII bombing. The Buddha sits in the bhumisparsha mudra (touching the earth), eyes half-cast toward you — standing at its feet alone, you stop talking. At the exit, in the shade of the trees, women sell coconuts ($1.50 each, opened with a machete on the spot, straw included).",
          estimatedCost: "~$2",
          transitFromPrev: "10 min walk",
        },
        {
          order: 5,
          time: "15:30",
          type: "sight",
          name: "Wat Chaiwatthanaram (sunset)",
          area: "Ayutthaya",
          coords: [100.5450, 14.3460],
          duration: "1 hour",
          description:
            "Across the river, this Khmer-style temple has the most photogenic sunset in central Thailand. The reflecting moat doubles the brick towers — if you arrive after the rainy season when the water is high, the effect is maximal. Rent a white traditional Thai outfit ($5 from a shop in front of the temple) for the Instagram shot. After sunset, gold LED lights bathe the whole temple; in 15 minutes the air shifts from brutal heat to a cool evening breeze, and you don't want to leave.",
          estimatedCost: "~$2",
          transitFromPrev: "Tuk-tuk, $3",
        },
        {
          order: 6,
          time: "17:30",
          type: "transit",
          name: "Train back to Bangkok",
          area: "Ayutthaya → Hua Lamphong",
          coords: [100.5170, 13.7370],
          duration: "1.5 hours",
          description:
            "Back on the slow train. Sleep, eat fruit, watch rice paddies pass. If you catch the last train (19:30), the return drops you into Bangkok as the neon goes on — the last 10 minutes watching the city's lights flicker on one by one, your own movie scene.",
          estimatedCost: "~$0.50",
          transitFromPrev: "Tuk-tuk to station, $3",
        },
      ],
    },
    {
      dayNumber: 4,
      theme: "Chinatown & last meals",
      summary:
        "End on Bangkok's most concentrated food street, with a temple and a rooftop bar built in.",
      stops: [
        {
          order: 1,
          time: "10:00",
          type: "sight",
          name: "Wat Traimit (Golden Buddha)",
          area: "Chinatown gateway",
          coords: [100.5132, 13.7385],
          duration: "45 min",
          description:
            "A 5.5-ton solid gold Buddha that was hidden under plaster for 200 years and only rediscovered when a workman dropped it in 1955 — that's the Wat Traimit miracle. Worth $250 million in gold alone (2026 prices). The Buddha is in the bhumisparsha mudra; 1.5 tons of solid gold visual impact stops you in your tracks. Ground floor free; upstairs a small museum tells the discovery story, worth the visit. As you exit you face the Chinatown gate — you're entering 'Bangkok's food utopia.'",
          estimatedCost: "~$3",
          transitFromPrev: "MRT to Hua Lamphong, 5 min walk",
        },
        {
          order: 2,
          time: "11:30",
          type: "shopping",
          name: "Sampeng Lane wholesale market",
          area: "Chinatown",
          coords: [100.5095, 13.7430],
          duration: "1 hour",
          description:
            "A narrow alley packed for 1.5km with every wholesale stall imaginable — beads, fabric, dried fish, plastic toys, Buddhist supplies. You'll get lost on purpose. This is the real foundation of 100 years of Thai-Chinese — every shop speaks Cantonese or Teochew, the owners descended from the Chinese migrants who came to Bangkok from the 1880s onward. Buy a few 'handcrafted gold-thread Thai silk scarves' ($4) or 'aromatic essential oils' ($5) to take home — 1/5 the price of a hotel gift shop.",
          estimatedCost: "~$10",
          transitFromPrev: "10 min walk",
        },
        {
          order: 3,
          time: "13:00",
          type: "meal",
          name: "Nai Mong Hoy Tod (oyster omelet)",
          area: "Yaowarat Road",
          coords: [100.5097, 13.7405],
          duration: "45 min",
          description:
            "A Bib Gourmand street stall doing crispy oyster pancakes since 1968. The signature 'Hoy Tod Krob' — oysters cooked into a lacy crispy crepe, served with chili sauce. Salty-sweet, juicy, and the crust crackles audibly. $5 a portion (8 oysters). The cook is a tall man, working 3–4 portions in one wok at the same time, his motion is performance art. Standing in line for 5 minutes is your sign of respect.",
          estimatedCost: "~$6",
          transitFromPrev: "10 min walk",
        },
        {
          order: 4,
          time: "14:30",
          type: "rest",
          name: "Hostel + nap",
          area: "Siam",
          coords: [100.5360, 13.7460],
          duration: "2 hours",
          description: "Last siesta. The night will be long.",
          estimatedCost: "Free",
          transitFromPrev: "MRT + BTS, ~30 min",
        },
        {
          order: 5,
          time: "18:00",
          type: "meal",
          name: "Yaowarat street food crawl",
          area: "Chinatown",
          coords: [100.5095, 13.7405],
          duration: "2 hours",
          description:
            "Yaowarat Road is the highest-density street-food zone on earth. Hit T&K Seafood (curry crab $11, garlic-prawn $8, the green-shirted family at the corner). Guay Jub Ouan Pochana (peppery rolled noodles $4, queue at 1am). Lek Nai (coconut-steamed betel-flower $2.50). Sai Mai See for cotton-candy rolls ($2). Walk slowly with a plastic stool from one stall to another. Cold local Singha or Chang beer with each.",
          estimatedCost: "~$15",
          transitFromPrev: "MRT to Wat Mangkon, 5 min walk",
        },
        {
          order: 6,
          time: "21:00",
          type: "activity",
          name: "Sky Bar at Lebua",
          area: "Silom",
          coords: [100.5170, 13.7220],
          duration: "1 hour",
          description:
            "The Hangover 2 rooftop. Yes, it's touristy. Yes, the cocktails are $20+. But standing in the open air on the 64th floor, both banks of the Chao Phraya glittering as a golden carpet below, the gold spire of Wat Arun in miniature in the distance — this is Bangkok on the movie poster. Dress code: long pants, closed-toe shoes (no sandals — change at the hostel before you go). The 'Hangovertini' cocktail ($30) is the same one from the film — drink it for the photo, your last postcard of the trip.",
          estimatedCost: "~$22",
          transitFromPrev: "Taxi, $5",
        },
      ],
    },
  ],
  packingTips: [
    "Loose, light long pants (one pair) for temple dress code — linen breathes best",
    "Reusable water bottle — refill at any 7-Eleven for 1 baht",
    "Bug spray with DEET for evenings — Soffel is the strong local brand",
    "Earplugs for the dorm — 8-bed rooms guarantee snoring",
    "Big pack of wet wipes — heat + small folding-stool stand setups make wipes a lifeline",
    "Aspirin / paracetamol — heat dehydration triggers headaches; Thai pharmacies are cheap but the language barrier is real",
  ],
  budgetEstimate: "~$35–55/day excluding hostel",
  generalTips: [
    "Use Grab (the local Uber) instead of street taxis — no bargaining, no scams, transparent pricing",
    "Always carry small bills (20s and 50s) — vendors hate breaking 1000s",
    "Tap water is not drinkable — bottled is 7 baht everywhere",
    "Tuk-tuks are a tourist trap unless you negotiate the price BEFORE getting in — usually 2–3× more than Grab",
    "The MRT (subway) and BTS (skytrain) are separate systems with separate tickets — but the Rabbit card works on the BTS",
    "International roaming SIM, or buy AIS Tourist SIM at the airport ($5 / 8 days / 15 GB)",
  ],
};

export default bangkok4dSolo;
