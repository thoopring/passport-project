import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Bangkok, 4 days, solo traveler, budget tier.
 *
 * Hostel base, street food heavy, public transit only. Coordinates pinned to
 * real landmarks.
 */
const bangkok4dSolo: TripPlan = {
  destination: "Bangkok",
  destinationCountry: "Thailand",
  durationDays: 4,
  overview:
    "Four days for a solo traveler on a tight budget who wants Bangkok's three faces: temple Bangkok, street-food Bangkok, and weird-night Bangkok. You'll never spend more than $5 on a meal, you'll see the Grand Palace before the heat, and you'll have a story to tell about Khao San Road by Friday.",
  bestSeasonNote:
    "November–February is dry and (relatively) cool — anything else and you'll be soaked by 11am. April is the hottest month on Earth in some neighborhoods.",
  currencyTip:
    "Withdraw 5,000–10,000 baht from a bank ATM (Krungsri or SCB — avoid the standalone purple ATMs which charge 220 baht). Most street food is cash only.",
  languageTip:
    "Download the Google Translate Thai pack offline — Thai script is unguessable for foreigners. 'Khop khun krap' (thank you, male speaker) gets you smiles.",
  emergencyNumber: "1155 (tourist police), 1669 (medical)",
  hotel: {
    name: "Lub d Bangkok Siam (8-bed mixed dorm)",
    area: "Siam",
    address: "925/9 Rama I Road, Pathum Wan, Bangkok 10330",
    coords: [100.5360, 13.7460],
    rationale:
      "Lub d Siam puts you 4 minutes from BTS National Stadium and 8 minutes from Siam Square — meaning every part of the city is one or two BTS stops away, including the river boats. The hostel is famously clean, has working AC and a real workspace, and the dorm beds have privacy curtains. From BKK Suvarnabhumi, the Airport Rail Link drops you at Phaya Thai (15 min from the door).",
    priceTier: "$",
    estimatedNightlyRate: "~$18/night",
  },
  airportTransit: {
    method: "Airport Rail Link → BTS Skytrain",
    duration: "~50 minutes",
    cost: "~$2",
    instructions:
      "From Suvarnabhumi (BKK) basement, follow the green Airport Rail Link signs. Buy a single token from the machine (45 baht) for the City Line to Phaya Thai (terminus). Transfer to the BTS Sukhumvit line (one floor up — buy another token, 26 baht), ride 2 stops to Siam, transfer to Silom line, 1 stop to National Stadium. Hostel is 4 min walk on the right.",
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
            "Get there at 8:30 sharp when the gates open — by 10am the lines are 45 minutes long. Wear long pants and covered shoulders or they will refuse you. The Emerald Buddha inside Wat Phra Kaew is small but the surrounding gold is overwhelming.",
          estimatedCost: "~$15",
          bookingTip: "Ignore anyone outside saying it's 'closed today' — that's a tuk-tuk scam.",
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
            "A 46-meter gold Reclining Buddha that's longer than a basketball court. Drop coins in the 108 bronze bowls along the back wall — the sound is hypnotic. This is also the birthplace of Thai massage; you can get one on-site for $10.",
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
            "A handful of family stalls right by the pier. Order boat noodles (kuay teow ruea) — small bowls, big flavor, $1.50 each.",
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
            "Cross the river on the 5-baht ferry. Wat Arun's central prang is covered in broken porcelain donated by 19th-century traders as ballast. Climb the steep steps for the Chao Phraya view — it's the best in the city.",
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
            "It is 38°C. Go nap. The city wakes up again at sunset and you'll need energy.",
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
            "Bangkok's most famous pad thai — they've been making it the same way since 1966. Order the wrapped-egg version with prawns. Expect to wait 15–20 minutes; it's worth it.",
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
            "15,000 stalls across 35 acres. You will get lost — that's the point. Sections to find: clothes (1–6), art (7), food (26–27), and the puppy section (which exists). Bargain to 60% of the asking price.",
          estimatedCost: "~$30 if you actually shop",
          bookingTip: "Saturday and Sunday only. Get there at 9am or you'll roast.",
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
            "Section 26 is a food labyrinth. Try mango sticky rice, coconut ice cream served in the shell, and any of the grilled-meat skewers. Sit on a plastic stool, eat with your hands.",
          estimatedCost: "~$6",
          transitFromPrev: "Built in",
        },
        {
          order: 3,
          time: "14:30",
          type: "rest",
          name: "Hostel break + hot shower",
          area: "Siam",
          coords: [100.5360, 13.7460],
          duration: "2 hours",
          description:
            "Heat exhaustion is real. Go back, shower, charge your phone, regroup.",
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
            "Buy a 30-baht orange-flag local boat ticket and ride from Sathorn pier upriver as far as Phra Athit. Sunset hits the temples and the air is finally cool. The single best $1 you'll spend in Bangkok.",
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
            "The famous backpacker street. Grab a 50-baht pad see ew and a 30-baht banana roti from any cart. The scorpion-on-a-stick guy is the same one from 2003 and yes, you can take a photo for 20 baht.",
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
            "Pick a hostel bar, get a 100-baht bucket, talk to strangers from 14 countries, leave by midnight. It's exactly what it sounds like.",
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
            "Take the 3rd-class commuter train from Hua Lamphong (15 baht). Open windows, plastic seats, slow but real. This is travel.",
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
            "A sandstone Buddha head wrapped in fig roots — the most photographed image in Ayutthaya. The surrounding ruins are massive and almost empty before the tour buses arrive.",
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
            "Tiny bowls, dark broth, beef. Locals stack the empty bowls on the table to count — challenge accepted.",
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
            "Three giant restored chedis on a single platform — the iconic Ayutthaya skyline. The neighboring Wihan houses a 12-meter bronze Buddha rebuilt in the 1950s after WWII bombing.",
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
            "Across the river, this Khmer-style temple has the most photogenic sunset in central Thailand. The reflecting moat doubles the brick towers.",
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
            "Back on the slow train. Sleep, eat fruit, watch rice paddies pass.",
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
            "A 5.5-ton solid gold Buddha that was hidden under plaster for 200 years and only rediscovered when a workman dropped it in 1955. Worth $250 million in gold alone.",
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
            "A narrow alley packed for 1.5km with every wholesale stall imaginable — beads, fabric, dried fish, plastic toys. You'll get lost on purpose.",
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
            "A Bib Gourmand stall doing crispy oyster pancakes since 1968. The signature dish is hoy tod krob — oysters cooked into a lacy crispy crepe with chili sauce.",
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
          description:
            "Last siesta. The night will be long.",
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
            "Yaowarat Road is the highest-density street-food zone on earth. Hit T&K Seafood (curry crab), Guay Jub Ouan Pochana (peppery rolled noodles), and any mango-sticky-rice stall. Walk slowly, eat constantly.",
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
            "The Hangover 2 rooftop. Yes, it's touristy. Yes, the cocktails are $20. But the open-air view from 64 floors over the Chao Phraya is the postcard you came for. Dress code: long pants and closed shoes.",
          estimatedCost: "~$22",
          transitFromPrev: "Taxi, $5",
        },
      ],
    },
  ],
  packingTips: [
    "Loose, light long pants (one pair) for temple dress code",
    "Reusable water bottle — refill at any 7-Eleven for 1 baht",
    "Bug spray with DEET for evenings",
    "Earplugs for the dorm",
  ],
  budgetEstimate: "~$35–55/day excluding hostel",
  generalTips: [
    "Use Grab (the local Uber) instead of street taxis — no bargaining, no scams",
    "Always carry small bills (20s and 50s) — vendors hate breaking 1000s",
    "Tap water is not drinkable — bottled is 7 baht everywhere",
    "Tuk-tuks are a tourist trap unless you negotiate the price BEFORE getting in",
  ],
};

export default bangkok4dSolo;
