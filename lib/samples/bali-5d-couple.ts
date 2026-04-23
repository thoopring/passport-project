import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Bali, 5 days, couple, relaxation-focused, midrange.
 *
 * Two bases: 2 nights in Ubud for rice-terrace serenity, 3 nights in
 * Seminyak for beach. A Uluwatu sunset day trip. Hand-curated.
 */
const bali5dCouple: TripPlan = {
  destination: "Bali",
  destinationCountry: "Indonesia",
  durationDays: 5,
  overview:
    "Five days designed around two bases — two nights in Ubud for rice terraces and river valley yoga mornings, three in Seminyak for beach time and sunset dinners. One day trip south to Uluwatu for the cliff temple. Paced for a couple who want rest as much as sightseeing.",
  bestSeasonNote:
    "May, June, and September are the sweet spots — dry, low humidity, smaller crowds. Avoid December-February (wet season) and July-August (most crowded). Nyepi silent day in March closes the entire island for 24 hours.",
  currencyTip:
    "Indonesian Rupiah (IDR). 15,000 IDR ≈ $1. Cards work at mid-to-high-end places; street stalls and warungs are cash. Use ATMs at convenience stores (Circle K, Indomaret), not on the street.",
  languageTip:
    "Bahasa Indonesia. Say 'terima kasih' (thank you) and you've covered 80% of interactions. English is widely spoken at tourist sites.",
  emergencyNumber: "112 (all emergencies), 118 (ambulance)",
  hotel: {
    name: "The Oberoi Beach Resort (Seminyak)",
    area: "Seminyak",
    address: "Jl. Kayu Aya, Seminyak 80361",
    coords: [115.1544, -8.6843],
    rationale:
      "Seminyak is the best single base for a couple — beach-front, walkable to dinner, 40 min from the airport. The Oberoi is a 50-year-old resort with its own beach access, a quiet adults-oriented vibe, and thatched-roof villas. You'll spend Nights 3-5 here; Nights 1-2 in Ubud (see day 1).",
    priceTier: "$$$",
    estimatedNightlyRate: "~$220/night",
  },
  airportTransit: {
    method: "Private transfer from DPS → Ubud",
    duration: "~75 min",
    cost: "~$25 one-way",
    instructions:
      "From Ngurah Rai International (DPS), pre-arrange a private driver through your hotel (Komaneka at Bisma has the best service). Taxis at the airport are expensive and cars queue aggressively for tourists. Gojek/Grab apps are banned from the airport pickup area but legal at the drop-off.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Arrival → Ubud",
      summary:
        "Land, private drive to Ubud, check into a river-view villa, recover from the flight with a gentle evening.",
      stops: [
        {
          order: 1,
          time: "11:00",
          type: "transit",
          name: "DPS airport → Ubud",
          area: "Bali south → central",
          coords: [115.2626, -8.5069],
          duration: "1.5 hours",
          description:
            "Pre-booked driver meets you at arrivals with a name sign. The drive north passes rice fields and small temples once you're past Denpasar traffic.",
          estimatedCost: "~$25",
          transitFromPrev: "Arrival",
        },
        {
          order: 2,
          time: "13:00",
          type: "rest",
          name: "Komaneka at Bisma (Ubud) — check-in",
          area: "Ubud",
          coords: [115.2563, -8.5103],
          duration: "2 hours",
          description:
            "Unpack, swim at the infinity pool hanging over the Tjampuhan river valley. Jet-lag recovery before the first walk.",
          estimatedCost: "~$180/night for Ubud base",
          transitFromPrev: "Driver drop-off",
        },
        {
          order: 3,
          time: "16:00",
          type: "sight",
          name: "Campuhan Ridge Walk",
          area: "Ubud",
          coords: [115.2563, -8.5056],
          duration: "1.5 hours",
          description:
            "A flat 2 km paved ridge between two river valleys — tall grass on both sides, late-afternoon light. Start at Ibah Hotel, walk to the Karsa Kafe at the end, coffee, turn back.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk from hotel",
        },
        {
          order: 4,
          time: "19:00",
          type: "meal",
          name: "Mozaic Restaurant Gastronomique",
          area: "Sanggingan",
          address: "Jl. Raya Sanggingan",
          coords: [115.2495, -8.4997],
          duration: "2 hours",
          description:
            "A French-technique, Indonesian-ingredient tasting menu in a garden dining room. The 8-course 'Discovery Menu' is the order. Exit through the herb garden they just pulled your dinner's cilantro from.",
          estimatedCost: "~$95/person with wine",
          bookingTip: "Reserve 1 week ahead via their website; closed Sundays.",
          transitFromPrev: "Gojek car, 10 min",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Ubud: rice terraces + temple + waterfall",
      summary:
        "A full Ubud day — the Tegallalang rice terraces at sunrise, a holy water temple, a waterfall swim, and a ceremonial dance at night.",
      stops: [
        {
          order: 1,
          time: "06:30",
          type: "sight",
          name: "Tegallalang Rice Terraces (sunrise)",
          area: "Tegallalang",
          coords: [115.2793, -8.4322],
          duration: "1.5 hours",
          description:
            "Subak (the 1,000-year-old Balinese irrigation system) carved into hillsides. Arrive at 06:45 — mist clears by 07:30 and tour buses arrive at 09:00. Walk down into the terraces for the photo.",
          estimatedCost: "~$2 entry + $2 for the swing if you want it",
          transitFromPrev: "Pre-arranged car from hotel, 20 min",
        },
        {
          order: 2,
          time: "09:00",
          type: "meal",
          name: "Kawi Resto Rice Terrace",
          area: "Tegallalang",
          coords: [115.2797, -8.4348],
          duration: "1 hour",
          description:
            "Breakfast overlooking the terraces. Pisang goreng (fried banana), nasi goreng, strong Balinese coffee. Unpretentious and the view is included.",
          estimatedCost: "~$12",
          transitFromPrev: "5 min walk",
        },
        {
          order: 3,
          time: "11:00",
          type: "sight",
          name: "Pura Tirta Empul (Holy Water Temple)",
          area: "Tampaksiring",
          coords: [115.3138, -8.4156],
          duration: "1.5 hours",
          description:
            "A 10th-century temple where Balinese Hindus perform melukat, a purification ritual, in pools fed by 11 underground springs. You can participate (rent a sarong + sash at the gate, follow the line). Bring a change of clothes.",
          estimatedCost: "~$3 + $2 sarong rental",
          transitFromPrev: "Car, 25 min",
        },
        {
          order: 4,
          time: "13:00",
          type: "meal",
          name: "Warung Little Bird",
          area: "Ubud central",
          coords: [115.2621, -8.5070],
          duration: "1 hour",
          description:
            "A small warung serving traditional Balinese rijsttafel (rice table) at half the tourist-restaurant price. Get the nasi campur — rice with a dozen small sides. Vegetarian options excellent.",
          estimatedCost: "~$10",
          transitFromPrev: "Car, 35 min back to Ubud",
        },
        {
          order: 5,
          time: "15:00",
          type: "activity",
          name: "Tegenungan Waterfall",
          area: "Kemenuh",
          coords: [115.2879, -8.5756],
          duration: "2 hours",
          description:
            "150 steps down to a wide waterfall pool. Swim (wear a swimsuit under clothes), dry on the rocks, climb back. A proper Bali reset moment.",
          estimatedCost: "~$1 entry",
          transitFromPrev: "Car, 25 min south",
        },
        {
          order: 6,
          time: "19:30",
          type: "activity",
          name: "Kecak Fire Dance at Pura Dalem Ubud",
          area: "Ubud",
          coords: [115.2585, -8.5070],
          duration: "1.5 hours",
          description:
            "A 60-man choral performance telling the Ramayana story, climaxing in a fire dance. Nightly at 19:30. Front-row seats only matter for photos; acoustics are excellent from any seat.",
          estimatedCost: "~$8",
          bookingTip: "Buy at the gate from 18:30; rarely sells out.",
          transitFromPrev: "10 min walk",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Ubud → Seminyak",
      summary:
        "One more Ubud morning, then transit to Seminyak and check into beach mode.",
      stops: [
        {
          order: 1,
          time: "07:00",
          type: "activity",
          name: "Morning yoga at The Yoga Barn",
          area: "Ubud",
          coords: [115.2613, -8.5102],
          duration: "1.5 hours",
          description:
            "Drop-in hatha or vinyasa class in an open-air bamboo shala over a rice paddy. Accepts walk-ins; mats provided. The signature Ubud experience even for non-yoga people.",
          estimatedCost: "~$10",
          bookingTip: "Arrive 20 min early — classes fill up in high season.",
          transitFromPrev: "10 min walk",
        },
        {
          order: 2,
          time: "09:00",
          type: "meal",
          name: "Seniman Coffee Studio",
          area: "Ubud central",
          coords: [115.2618, -8.5062],
          duration: "1 hour",
          description:
            "Bali-grown single-origin coffee, roasted on-site. Sit on a suspended chair, drink a pour-over, eat a breakfast sandwich. The original Ubud third-wave café.",
          estimatedCost: "~$10",
          transitFromPrev: "5 min walk",
        },
        {
          order: 3,
          time: "11:00",
          type: "transit",
          name: "Ubud → Seminyak drive",
          area: "Central → south",
          coords: [115.1544, -8.6843],
          duration: "1.5 hours",
          description:
            "Pre-booked driver from Komaneka. The drive south passes through Batubulan (stone carving villages) and Denpasar traffic. Stop at Alas Harum café if you need to break it up.",
          estimatedCost: "~$25",
          transitFromPrev: "10 min walk back to hotel",
        },
        {
          order: 4,
          time: "13:00",
          type: "rest",
          name: "The Oberoi — check-in + beach",
          area: "Seminyak",
          coords: [115.1544, -8.6843],
          duration: "3 hours",
          description:
            "Check in, change, walk the hotel's private beach frontage. The Oberoi's sunbeds are yours; order a nasi goreng and a Bintang for a beach-cabana lunch.",
          estimatedCost: "~$35 for beach lunch",
          transitFromPrev: "Driver arrival",
        },
        {
          order: 5,
          time: "17:00",
          type: "sight",
          name: "Double-Six Beach sunset",
          area: "Seminyak",
          coords: [115.1580, -8.6902],
          duration: "1.5 hours",
          description:
            "Walk south from the Oberoi along the wet sand. At Double-Six, grab a beanbag at the beach bars (La Plancha has the pastel-striped ones), order a cocktail, watch the sun drop into the Indian Ocean.",
          estimatedCost: "~$15 for a cocktail",
          transitFromPrev: "15 min walk along the beach",
        },
        {
          order: 6,
          time: "20:00",
          type: "meal",
          name: "Merah Putih",
          area: "Seminyak",
          address: "Jl. Petitenget",
          coords: [115.1553, -8.6791],
          duration: "2 hours",
          description:
            "High-ceilinged bamboo cathedral of a dining room. Modern Indonesian by chef Made Suwarsa — rendang with crispy skin, grilled snapper with sambal matah. Perfect for a first Seminyak dinner.",
          estimatedCost: "~$65/person",
          bookingTip: "Book 3-5 days ahead via their website for prime 19:30-20:30 slots.",
          transitFromPrev: "Gojek, 5 min",
        },
      ],
    },
    {
      dayNumber: 4,
      theme: "Uluwatu day trip",
      summary:
        "A half-day in the Bukit peninsula — secret beach at Padang Padang, the cliff temple, and a sunset fire dance.",
      stops: [
        {
          order: 1,
          time: "10:00",
          type: "transit",
          name: "Drive to Uluwatu",
          area: "Seminyak → Bukit",
          coords: [115.0852, -8.8293],
          duration: "1 hour",
          description:
            "Pre-arrange a driver for the day (~$45 for 8 hours). The road south through Jimbaran and up onto the Bukit is scenic; let the driver know you're doing the Uluwatu loop.",
          estimatedCost: "~$45 for the full day",
          transitFromPrev: "Driver pickup at hotel",
        },
        {
          order: 2,
          time: "11:00",
          type: "rest",
          name: "Padang Padang Beach",
          area: "Uluwatu",
          coords: [115.1044, -8.8121],
          duration: "2 hours",
          description:
            "Down a tight staircase between rocks, a small cove with white sand. The beach the 'Eat Pray Love' final scene was shot at. Swim, rent a sunbed, have a beach-stall nasi goreng.",
          estimatedCost: "~$1 entry + $3 sunbed",
          transitFromPrev: "Driver",
        },
        {
          order: 3,
          time: "14:00",
          type: "meal",
          name: "Single Fin (surfer cliff café)",
          area: "Uluwatu",
          coords: [115.0878, -8.8289],
          duration: "1.5 hours",
          description:
            "Perched on the cliff over Uluwatu point — the world-class left-hand surf break is literally below you. Tuna tostadas and a cold beer. Watch pros ride 8-foot waves.",
          estimatedCost: "~$30",
          transitFromPrev: "Driver, 15 min",
        },
        {
          order: 4,
          time: "16:30",
          type: "sight",
          name: "Pura Luhur Uluwatu (Cliff Temple)",
          area: "Uluwatu",
          coords: [115.0846, -8.8293],
          duration: "1.5 hours",
          description:
            "An 11th-century Hindu temple on a 70-meter cliff. Rent a sarong at the gate (included in ticket). Watch out for macaques — they will steal your glasses. Walk the cliff path along both sides of the temple.",
          estimatedCost: "~$4",
          transitFromPrev: "5 min drive",
        },
        {
          order: 5,
          time: "18:00",
          type: "activity",
          name: "Kecak Fire Dance at Uluwatu Temple",
          area: "Uluwatu",
          coords: [115.0844, -8.8293],
          duration: "1 hour",
          description:
            "The one at the cliff amphitheater, with the sun setting behind the performers over the ocean. Different from the Ubud version — this one is the sunset-postcard version. Book on arrival at the ticket booth.",
          estimatedCost: "~$10",
          transitFromPrev: "5 min walk from the temple",
        },
        {
          order: 6,
          time: "20:00",
          type: "meal",
          name: "Jimbaran Bay seafood BBQ",
          area: "Jimbaran",
          coords: [115.1655, -8.7727],
          duration: "2 hours",
          description:
            "Pick a seafood warung on the beach — Menega or Intan Seafood are safe. Tables on the sand, grilled snapper/lobster/prawns by weight, sunset already past but the sea is loud and dark. The signature Bali dinner.",
          estimatedCost: "~$45/person",
          transitFromPrev: "Driver, 25 min north",
        },
      ],
    },
    {
      dayNumber: 5,
      theme: "Seminyak final day",
      summary:
        "Spa morning, lunch at the rice paddies of Canggu, final sunset, and a late-flight transfer to the airport.",
      stops: [
        {
          order: 1,
          time: "10:00",
          type: "activity",
          name: "Bodyworks Spa",
          area: "Seminyak",
          address: "Jl. Kayu Jati",
          coords: [115.1559, -8.6835],
          duration: "2 hours",
          description:
            "Balinese massage done right. The 2-hour 'Ritual' package includes massage + scrub + flower bath. Cheaper than the hotel spa, better technicians.",
          estimatedCost: "~$55/person",
          bookingTip: "Book 1 day ahead via WhatsApp on their website.",
          transitFromPrev: "5 min walk",
        },
        {
          order: 2,
          time: "12:30",
          type: "meal",
          name: "The Lawn Canggu",
          area: "Canggu",
          coords: [115.1381, -8.6496],
          duration: "2 hours",
          description:
            "Beach-front restaurant + pool + grass lawn. Poke bowls, burgers, and smoothies. The lunch you'll talk about when you get home.",
          estimatedCost: "~$35",
          transitFromPrev: "Gojek car, 25 min north",
        },
        {
          order: 3,
          time: "15:00",
          type: "sight",
          name: "Tanah Lot Temple",
          area: "Tabanan",
          coords: [115.0868, -8.6212],
          duration: "2 hours",
          description:
            "A 16th-century temple on a rocky outcrop accessible only at low tide. Time your visit for 17:00-18:00 sunset. The temple itself isn't open to foreigners, but the cliff walk and the view are the draw.",
          estimatedCost: "~$5",
          transitFromPrev: "Car, 30 min",
        },
        {
          order: 4,
          time: "18:30",
          type: "meal",
          name: "Sundara Beach Club (Four Seasons Jimbaran)",
          area: "Jimbaran",
          coords: [115.1645, -8.7764],
          duration: "2 hours",
          description:
            "Last dinner. A long beachfront pool-deck, tiki torches at dusk, seafood and cocktails. Expensive, but it's the send-off dinner. Book a beachfront table.",
          estimatedCost: "~$90/person",
          bookingTip: "Reserve 5-7 days ahead via their site for the 18:30 sunset slot.",
          transitFromPrev: "Car, 30 min south",
        },
        {
          order: 5,
          time: "21:00",
          type: "transit",
          name: "Sundara → DPS airport",
          area: "Jimbaran → airport",
          coords: [115.1671, -8.7463],
          duration: "30 min",
          description:
            "Ask Sundara concierge to pre-book a car. 30 min max to the airport at that hour. Budget 2 hours for international check-in.",
          estimatedCost: "~$15",
          transitFromPrev: "Car directly from dinner",
        },
      ],
    },
  ],
  packingTips: [
    "Sarong (required to enter most temples — the gate rents them if you forget)",
    "Reef-safe sunscreen (Indonesia bans standard sunscreen at many beaches)",
    "A light raincoat for afternoon showers even in dry season",
    "Insect repellent with DEET for Ubud evenings",
    "Flip-flops for beaches + one pair of walking sandals for temples",
  ],
  budgetEstimate: "~$200-280/day for a couple excluding hotel",
  generalTips: [
    "Download Gojek and Grab — 24/7 taxis in English, 1/4 the price of street drivers",
    "Avoid ATMs that aren't inside Circle K or a bank — card skimming is a known issue",
    "Drink bottled water only; ice at good restaurants is fine",
    "Tipping 10% is appreciated but not expected; 5,000-10,000 IDR per bag for porters is standard",
  ],
};

export default bali5dCouple;
