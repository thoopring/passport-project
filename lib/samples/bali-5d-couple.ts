import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Bali, 5 days, couple, relaxation-focused, midrange.
 *
 * Two bases: 2 nights in Ubud for rice-terrace serenity, 3 nights in
 * Seminyak for beach. A Uluwatu sunset day trip. Hand-curated. Text
 * fields are intentionally enriched beyond typical API output —
 * samples are the conversion surface.
 */
const bali5dCouple: TripPlan = {
  destination: "Bali",
  destinationCountry: "Indonesia",
  durationDays: 5,
  overview:
    "Five days designed around two bases — two nights in Ubud for rice terraces and river-valley yoga mornings, three in Seminyak for beach time and sunset dinners. One day trip south to Uluwatu for the cliff temple. Paced for a couple who want rest as much as sightseeing. The essence of Bali isn't its monuments but the 'density of time' — between 7am yoga and 9pm candlelit dinner there are long stretches to stare at a tree, the sea, or simply nothing — that's what Bali actually sells you.",
  bestSeasonNote:
    "May, June, and September are the sweet spots — dry, low humidity, smaller crowds. Avoid December-February (wet season, daily afternoon downpours) and July-August (peak European holidays). Nyepi silent day in March closes the entire island for 24 hours — flights stop, shops close, you can't go outside, lights must be off — a unique experience but check the date 2 months ahead. Late October's 'Galungan' (Balinese-Hindu holiday) decorates the streets with 'penjor' (decorated bamboo poles) — beautiful but half the restaurants close.",
  currencyTip:
    "Indonesian Rupiah (IDR). 15,000 IDR ≈ $1. Cards work at mid-to-high-end places; street stalls and warungs are cash. Use ATMs at convenience stores (Circle K, Indomaret), not on the street — skimming is a known issue. Wise/Curve cards offer the best rates. Local prices are unbelievably low — nasi goreng $3, bottled water $0.40, 1-hour group massage $10.",
  languageTip:
    "Bahasa Indonesia. Say 'terima kasih' (thank you) and you've covered 80% of interactions. 'Permisi' (excuse me), 'Maaf' (sorry). English is widely spoken at tourist sites, menus are in English. Download the offline Indonesian pack on Google Translate. Gojek/Grab driver doesn't speak English? Type and translate — they all do it.",
  emergencyNumber: "112 (all emergencies), 118 (ambulance)",
  hotel: {
    name: "The Oberoi Beach Resort (Seminyak)",
    area: "Seminyak",
    address: "Jl. Kayu Aya, Seminyak 80361",
    coords: [115.1544, -8.6843],
    rationale:
      "Seminyak is the best single base for a couple — beach-front, walkable to dinner, 40 min from the airport. The Oberoi is a 50-year-old resort with its own beach access, an adults-only quiet vibe (no kids, calmer atmosphere), thatched-roof villas with private gardens. You'll spend Nights 3-5 here; Nights 1-2 in Ubud (see day 1). Oberoi's spa is one of the original Bali-massage pioneers in Asia — the founding masseuse Made Asu still works occasionally, book her signature Lomi-Lomi massage by reservation.",
    priceTier: "$$$",
    estimatedNightlyRate: "~$220/night",
  },
  airportTransit: {
    method: "Private transfer from DPS → Ubud",
    duration: "~75 min",
    cost: "~$25 one-way",
    instructions:
      "From Ngurah Rai International (DPS), pre-arrange a private driver through your Ubud hotel (Komaneka at Bisma is excellent). Taxis at the airport are expensive (>$50 monopoly pricing); Gojek/Grab apps are banned from the airport pickup area but legal at the drop-off (so hotel-to-airport works one-way). Late at night or with heavy luggage, take 'Blue Bird Taxi' — Bali's only legal metered taxi company.",
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
            "Pre-booked driver meets you at arrivals with a name sign. The drive north passes rice fields and small Hindu shrines once you're past Denpasar traffic — humid air carries the mingled scent of frangipani and cooking fires.",
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
            "Unpack, swim at the infinity pool hanging over the Tjampuhan river valley — your first jump in the water and you instantly understand why Bali is called 'the island of the gods.' The hotel serves a free afternoon 'jamu' (turmeric + lemon + honey, traditional herbal tonic) — jet-lag antidote. From the pool, you hear temple bells 10 km away.",
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
            "A flat 2 km paved ridge between two river valleys — tall grass on both sides catching the late afternoon gold. Start at Ibah Hotel, walk to Karsa Kafe at the end for a coconut water ($5) — Karsa sits in a thatched gazebo amid rice fields, you watch farmers harvest. Loop back on the alternate path; total 30 min — Ubud's classic 'walk with no purpose.'",
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
            "A French-technique, Indonesian-ingredient tasting menu in a garden dining room. The 8-course 'Discovery Menu' is the order — the chef harvests ingredients from the spice garden next door, each course paired with one Indonesian spice (turmeric, lemongrass, tamarind). The closer 'Bali Coffee Soufflé' is Asia's #1 dessert per Asia 50 Best — coffee from the chef-owned Kintamani plateau farm. With local 'Cap Tikus' brandy. Exit through the spice garden — you'll want to buy every spice to take home.",
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
            "Subak (the 1,000-year-old Balinese irrigation system) carved into hillsides. Arrive at 06:45 — mist clears by 07:30 and tour buses arrive at 09:00. Walk down into the terraces for the photo; locals offer to crown you with a traditional Hindu flower wreath ($1 tip). The 'Bali Swing' ($4) — 1 second to become an Instagram star suspended over the rice fields.",
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
            "Breakfast overlooking the terraces. Pisang goreng (fried banana, $2), nasi goreng, strong Balinese coffee. Unpretentious and the view is included. The Kawi coffee comes from the Kintamani highlands — Arabica with brown sugar and coconut milk, locally called 'Bali Coffee,' completely different from Italian espresso.",
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
            "A 10th-century temple where Balinese Hindus perform melukat, a purification ritual, in pools fed by 11 underground springs. You can participate (rent a sarong + sash at the gate, follow the line). Bring a change of clothes. If a woman is on her period, no entering the water. Nearby 'Gunung Kawi' (Khmer-style cave tombs) is also worth seeing but requires 600 stairs down.",
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
            "A small warung serving traditional Balinese rijsttafel (Nasi Campur — rice with a dozen small sides) at half the tourist-restaurant price. Vegetarian options excellent. $8 each, two people full, plus banana smoothie ($2.50) and traditional Balinese 'Klepon' dessert ($1, palm-sugar coconut rice balls).",
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
            "150 steps down to a wide waterfall pool. Swim (wear a swimsuit under clothes), dry on the rocks, climb back. A proper Bali reset moment — the second you jump in, six months of work stress washes off. Next door, 'D'Tukad River Club' ($20 entrance) is a cliff-edge infinity pool, popular Instagram spot.",
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
            "A 60-man choral performance telling the Ramayana story, climaxing in a fire dance. Nightly at 19:30. Front-row seats only matter for photos; acoustics are excellent from any seat. The chorus circles, repeating 'cak-cak-cak,' creating an epic atmosphere — you forget this is a tourist show and actually enter the Hindu mythology.",
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
            "Drop-in hatha or vinyasa class in an open-air bamboo shala over a rice paddy. Accepts walk-ins; mats provided. Even non-yoga people will feel the 'Ubud signature' — at 7am the sun comes through the bamboo roof, mist over distant rice fields, pure 'early morning bliss.' One class is $10. Half the teachers are Westerners (NY, London) who relocated to Ubud — English is no problem.",
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
            "Bali-grown single-origin coffee, roasted on-site. Sit on a suspended chair, drink a pour-over, eat a breakfast sandwich. The original Ubud third-wave café. Australian owner returned home a few years ago, but the local who took over keeps the standard. Single-origin Kintamani beans $8 a 250g bag — the perfect souvenir.",
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
            "Pre-booked driver from Komaneka. The drive south passes through Batubulan (stone carving villages) and Denpasar traffic. Stop at Alas Harum café if you need to break it up (and one more swing). The driver typically waits 45 min then continues — $4 tip.",
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
            "Check in, change, walk the hotel's private beach frontage. The Oberoi's sunbeds are yours; order a nasi goreng and a Bintang for a beach-cabana lunch ($35). The private beach has a lifeguard, safe water, swim freely.",
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
            "Walk south from the Oberoi along the wet sand. At Double-Six, grab a beanbag at the beach bars (La Plancha has the pastel-striped ones), order a cocktail ($15), watch the sun drop into the Indian Ocean. May–September, 'Ku De Ta' beach parties feature DJs on world tours — pricier but unforgettable.",
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
            "High-ceilinged bamboo cathedral of a dining room. Modern Indonesian by chef Made Suwarsa — rendang with crispy skin, grilled snapper with sambal matah. Perfect for a first Seminyak dinner. With local Hatten red wine ($28/bottle) — surprisingly good Balinese-highland wine. The chef often comes out to thank guests — that detail makes you feel specially looked after.",
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
            "Pre-arrange a driver for the day (~$45 for 8 hours). The road south through Jimbaran and up onto the Bukit is scenic; let the driver know you're doing the Uluwatu loop. He waits until after sunset and drives you back to Seminyak; tip $7.",
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
            "Down a tight staircase between rocks, a small cove with white sand. The beach the 'Eat Pray Love' final scene was shot at — Julia Roberts and Javier Bardem reunite here. Swim, rent a sunbed, have a beach-stall nasi goreng. Note: strong waves and currents — don't swim out far if you're not confident.",
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
            "Perched on the cliff over Uluwatu point — the world-class left-hand surf break is literally below you. Tuna tostadas ($20) and a cold beer ($5). Watch pros ride 8-foot waves. Every Sunday afternoon, 'Sunday Session' DJ from 3pm to 11pm — surfers from around the world gather, the entire beach is dancing.",
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
            "An 11th-century Hindu temple on a 70-meter cliff. Rent a sarong at the gate (included in ticket). Watch out for macaques — they will steal your glasses. If they do, the gatekeeper trades it back for a banana ($1). Walk the cliff path along both sides of the temple — view of west Bukit and the Indian Ocean. The temple is for Hindus only, but the cliff path is the attraction.",
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
            "The one at the cliff amphitheater, with the sun setting behind the performers over the ocean. Different from the Ubud version — this one is the sunset-postcard version. Book on arrival at the ticket booth. At the climax, a fire is lit and Rama walks through the flames — visual shock, sonic shock, lifelong memory.",
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
            "Pick a seafood warung on the beach — Menega or Intan Seafood are safe. Tables on the sand, grilled snapper/lobster/prawns by weight, sunset already past but the sea is loud and dark. Romantic to the max — moonlight, waves, grill smoke. 3-4 dishes + rice + drinks $45 per person. The signature Bali dinner.",
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
            "Balinese massage done right. The 2-hour 'Ritual' package includes massage + scrub + flower bath. Cheaper than the hotel spa, better technicians. Reserve Made Asu (the founding masseuse — semi-retired but still works occasionally), her Lomi-Lomi massage is one of the oldest techniques in Asia. 'The Body Shop' essential oils are sold separately to take home.",
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
            "Beach-front restaurant + pool + grass lawn. Poke bowls, burgers, and smoothies. The lunch you'll talk about when you get home. Canggu has become Bali's 'digital nomad capital' in recent years — the table next to you might host a Silicon Valley programmer relocated here, or a New Yorker who opened a café. The vibe in the air: 'I'm on vacation but my life is good.'",
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
            "A 16th-century temple on a rocky outcrop accessible only at low tide. Time your visit for 17:00-18:00 sunset. The temple itself isn't open to foreigners, but the cliff walk and the view are the draw. At the entrance, a 'sacred snake' cave ($1 to see, the snake is real but trained) — said to bring good luck. Sunset is crowded, but another beach 200m north gives you a 180° panorama for yourselves.",
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
            "Last dinner. A long beachfront pool-deck, tiki torches at dusk, seafood and cocktails. Expensive, but it's the send-off dinner. Book a beachfront table — Four Seasons service is impeccable. The 'Bali Tasting Menu' ($90/person) features local specialties — Babi Guling (suckling pig) + Lawar salad + Rendang. With 'Ke Indonesia Tasting' cocktail pack — 5 mini-cocktails infused with 5 Indonesian spices.",
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
            "Ask Sundara concierge to pre-book a car. 30 min max to the airport at that hour. Budget 2 hours for international check-in. On the way to the airport, the driver plays local music — Balinese gamelan percussion replays the images of the past 5 days in your mind.",
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
    "Waterproof phone pouch — ocean and waterfall photos",
    "Quick-dry towel — smaller than a beach towel, packs better",
  ],
  budgetEstimate: "~$200-280/day for a couple excluding hotel",
  generalTips: [
    "Download Gojek and Grab — 24/7 taxis in English, 1/4 the price of street drivers",
    "Avoid ATMs that aren't inside Circle K or a bank — card skimming is a known issue",
    "Drink bottled water only; ice at good restaurants is fine",
    "Tipping 10% is appreciated but not expected; 5,000-10,000 IDR per bag for porters is standard",
    "Balinese-Hindu etiquette: don't step on Canang sari (small bamboo offering baskets on the ground), don't walk in front of statues",
    "Club districts (Kuta, Legian) at night, be alert — occasional moto drive-by snatches of cameras worn around the neck",
  ],
};

export default bali5dCouple;
