import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Paris, 3 days, family with kids (ages ~5 and ~8), midrange.
 *
 * Optimized for stroller-friendly routes, plenty of bathroom-accessible meal
 * stops, and one big-ticket kid moment per day. Coordinates pinned to real
 * landmarks. Text fields are intentionally enriched beyond typical API
 * output — samples are the conversion surface.
 */
const paris3dFamily: TripPlan = {
  destination: "Paris",
  destinationCountry: "France",
  durationDays: 3,
  overview:
    "Three days designed for a family with two young kids who want to see the icons of Paris without anyone melting down by hour two. Each day pairs one big landmark with a long park session, includes a sit-down lunch with a real bathroom (Paris has very few public toilets and most are paid), and ends early enough that everyone has energy left for breakfast croissants the next morning. Family travel isn't a sprint, it's a rhythm — these 3 days teach you the rhythm. By day 3 the kids will know the word 'boulangerie' and demand a pain au chocolat from the apartment kitchen.",
  bestSeasonNote:
    "Late May–early June and September are the sweet spot — warm enough for parks, cool enough for the Métro, and shorter museum lines than peak summer. Late July to mid-August is Parisian fermeture annuelle (annual closures): many small restaurants shut for the month, which can be inconvenient with kids. The Christmas markets (late November to Christmas) at Hyde Park's Wonderland equivalent — Champs-Élysées illuminations, Trocadéro big wheel, La Défense market — turn winter Paris into a fairytale, but prepare mentally for sub-freezing temperatures and bundle the kids.",
  currencyTip:
    "Most museums and restaurants take Visa/Mastercard contactless, and Eiffel Tower tickets are online-only. Carry €40–60 in coins for: carousel rides (€3–4 each), ice cream (€3.50/scoop and up), small bakeries (often cash-only with a €5 minimum), and tips (a polite €1–2 in coins after good restaurant service is the right gesture).",
  languageTip:
    "When entering shops, asking for directions, or ordering — always start with 'Bonjour' (mornings/midday, 'Bonsoir' after 6pm), and exit with 'Merci, au revoir'. This single habit changes Parisians' behavior toward you, almost like switching cities. 'Excusez-moi' (excuse me) and 'S'il vous plaît' (please) are also key. Going straight to English without the French opener reads as rude — French first, English second is the formula. For kids, teach them 'Pardon' and 'Merci' — Parisians soften visibly at small children making the effort.",
  emergencyNumber: "112 (EU emergency), 15 (medical), 17 (police), 18 (fire)",
  hotel: {
    name: "Citadines Tour Eiffel Paris",
    area: "15th arrondissement, near Eiffel Tower",
    address: "132 Boulevard de Grenelle, 75015 Paris",
    coords: [2.2960, 48.8500],
    rationale:
      "The aparthotel with a kitchenette is a family lifesaver — pajama breakfasts with cereal and milk for the kids, midday snacks, and dinner delivered to the room when everyone is too tired to go out. 10-minute walk to the Eiffel Tower, 5-minute walk to Bir-Hakeim Métro (Line 6 above-ground stretch — the train crosses the Seine pointed straight at the Eiffel Tower, one of the most beautiful Métro segments in Paris); from there 4 stops to the Louvre. From CDG airport, the RER B + Métro 6 has all the necessary elevators, so traveling with a stroller and full luggage is manageable.",
    priceTier: "$$$",
    estimatedNightlyRate: "~$220/night",
  },
  airportTransit: {
    method: "RER B → Métro 6 (or taxi for the first day)",
    duration: "~75 min by train, ~50 min by taxi",
    cost: "~$20 train family ticket / €56 taxi flat-rate",
    instructions:
      "If you have luggage and tired kids, the €56 flat-rate taxi from CDG to the Left Bank is the smartest option — since 2025 all CDG-Paris taxis are flat-rate, no meter, no haggling. For the train route: from CDG Terminal 2, follow signs to RER B → take any train toward 'Paris' → change at Denfert-Rochereau to Métro 6 (direction Charles de Gaulle-Étoile) → exit at Bir-Hakeim. Citadines is a 5-minute walk. RER B has stairs at some stations — with a stroller plus full luggage, take the taxi. North of Paris the RER B has middling safety reputation; keep valuables close.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "The Eiffel Tower & Champ de Mars",
      summary:
        "Start with the most iconic image → spread out a long picnic blanket on the grass below it → let the kids burn off energy at a real Parisian playground.",
      stops: [
        {
          order: 1,
          time: "09:30",
          type: "sight",
          name: "Eiffel Tower (2nd floor)",
          area: "Champ de Mars",
          address: "5 Avenue Anatole France, 75007 Paris",
          coords: [2.2945, 48.8584],
          duration: "1.5 hours",
          description:
            "Skip the summit ticket — the 2nd floor has the same wow factor with shorter queues and elevators that fit strollers. Book the timed-entry stair-and-elevator ticket at toureiffel.paris exactly 60 days ahead at 8:30am Paris time — set an alarm, have your card ready, and grab the prime morning slot (10:00–11:30 for the best light) within seconds. After 2 hours all the good slots are gone. The Trocadéro plaza directly across the river is the classic postcard angle; arriving at 6:30am gets you the Eiffel Tower's full face almost to yourselves.",
          estimatedCost: "~$22/adult, ~$11/child",
          bookingTip: "Book at toureiffel.paris exactly 60 days ahead at 8:30am Paris time — slots sell out within 2 hours. The 'stairs + elevator' combo ticket is cheaper and faster.",
          transitFromPrev: "10 min walk from hotel",
          kidFriendly: true,
        },
        {
          order: 2,
          time: "12:00",
          type: "meal",
          name: "Picnic from Boulangerie Utopie",
          area: "Champ de Mars",
          coords: [2.3020, 48.8550],
          duration: "1 hour",
          description:
            "Pick up baguettes, jambon-beurre sandwiches, fruit, and pain au chocolat from a top boulangerie, then spread out on the Champ de Mars grass with the tower in view. Cheaper, calmer, and more memorable than any restaurant. Utopie's signature 'Charbon' (charcoal bread) and Pierre Hermé macarons are worth adding. There's a row of long benches along the Seine side if the grass is damp; the kids can chase pigeons while you eat.",
          estimatedCost: "~$25 for family",
          transitFromPrev: "5 min walk",
          kidFriendly: true,
        },
        {
          order: 3,
          time: "13:30",
          type: "activity",
          name: "Champ de Mars carousel & playground",
          area: "Champ de Mars",
          coords: [2.2998, 48.8550],
          duration: "1.5 hours",
          description:
            "A real, century-old carousel sits at the south end of the park — wooden horses, carriages, and bench seats are still hand-carved originals, €3 a ride. There's a fenced playground next to it with sand, slides, and climbing nets where local Parisian families come on weekends. Parents can sit on the benches watching the kids; the angle of the Eiffel Tower from here is also fantastic, so you'll take 100 photos by accident. There's a mobile coffee cart by the playground — the kind Parisians have stood at to drink their espresso since 8am.",
          estimatedCost: "~$5 for carousel rides",
          transitFromPrev: "Built in",
          kidFriendly: true,
        },
        {
          order: 4,
          time: "15:30",
          type: "rest",
          name: "Hotel break (kids nap)",
          area: "15th arrondissement",
          coords: [2.2960, 48.8500],
          duration: "1.5 hours",
          description:
            "Critical for a family trip. Get back to the apartment, parents make tea, kids watch a cartoon and fall asleep. Resist the urge to squeeze in another sight — otherwise the first meltdown lands at 4pm and ruins the entire dinner.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
          kidFriendly: true,
        },
        {
          order: 5,
          time: "18:00",
          type: "meal",
          name: "Café Constant",
          area: "Rue Saint-Dominique",
          coords: [2.3045, 48.8585],
          duration: "1.5 hours",
          description:
            "A neighborhood bistro by chef Christian Constant — real French food but more accessible than the starred places. Roast chicken (poulet rôti) + frites + a profiterole each is the move; the kid menu (menu enfant) is seriously made, not a token gesture. Servers smile when they see kids and fold a paper boat for the little one. Opens at 6pm, no reservation needed if you arrive by 7pm. The window faces Rue Saint-Dominique, one of the most family-walkable streets in Paris.",
          estimatedCost: "~$80 for family",
          bookingTip: "Reserve 1 week ahead via TheFork — note '2 small children' and they'll seat you against the wall.",
          transitFromPrev: "10 min walk",
          kidFriendly: true,
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Louvre highlights & Tuileries",
      summary:
        "A quick, kid-paced museum visit followed by carousel rides and a Seine boat. Don't try to 'do' the Louvre — pick 5 things and leave.",
      stops: [
        {
          order: 1,
          time: "09:00",
          type: "sight",
          name: "Louvre Museum (kid loop)",
          area: "1st arrondissement",
          address: "Rue de Rivoli, 75001 Paris",
          coords: [2.3376, 48.8606],
          duration: "2 hours",
          description:
            "Enter via the Carrousel du Louvre underground entrance — the line is dramatically shorter than the pyramid and there's an escalator. Hit only the kid-loop 5: Mona Lisa (Denon wing 2nd floor), Venus de Milo, Winged Victory, Egyptian mummies, and Napoleon III's apartments. Hand the kids the museum map and tell them it's a 'treasure hunt' — they circle each one as they find it. The best viewing spot for the Mona Lisa is 3 meters back to the right of the barrier — most people crowd the center, the right angle has gaps.",
          estimatedCost: "~$22/adult, free under 18",
          bookingTip: "Buy timed-entry tickets at louvre.fr 1 week ahead. Closed Tuesdays. The 9am opening slot has the Mona Lisa nearly to yourselves.",
          transitFromPrev: "Métro 6 → 1 from Bir-Hakeim → Palais Royal-Musée du Louvre, ~25 min",
          kidFriendly: true,
        },
        {
          order: 2,
          time: "11:30",
          type: "rest",
          name: "Tuileries Garden",
          area: "1st arrondissement",
          coords: [2.3270, 48.8635],
          duration: "1.5 hours",
          description:
            "Walk straight out the Louvre into the Tuileries. At the green chair stand by the central pond, rent toy wooden sailboats — €6 a session, kids push them around the basin with long sticks. Simple, iconic, joyful. The allées on either side are a sculpture park (Rodin replicas) for a relaxed walk. June through August, the north end hosts the 'Fête des Tuileries' mini-amusement park — spinning swings, ring toss, cotton candy.",
          estimatedCost: "~$5 boat rental",
          transitFromPrev: "5 min walk",
          kidFriendly: true,
        },
        {
          order: 3,
          time: "13:00",
          type: "meal",
          name: "Angelina (hot chocolate + lunch)",
          area: "Rue de Rivoli",
          coords: [2.3290, 48.8650],
          duration: "1 hour",
          description:
            "A century-old tea room. The signature 'L'Africain' hot chocolate is so thick — like drinking warm ganache — that a small cup satisfies the adults. Kids get a croque-monsieur, parents get the salade Niçoise, and everyone shares one Mont-Blanc dessert (chestnut cream piped like spaghetti over meringue, an Angelina invention). The pink takeaway box for the Mont-Blanc back to the hotel for late-afternoon snack also works.",
          estimatedCost: "~$70 for family",
          bookingTip: "No reservations for under 6 people — go at 13:00 for the shortest queue. Or skip straight to the takeaway window next door for a Mont-Blanc to go.",
          transitFromPrev: "5 min walk",
          kidFriendly: true,
        },
        {
          order: 4,
          time: "14:30",
          type: "activity",
          name: "Bateaux-Mouches Seine cruise",
          area: "Pont de l'Alma",
          coords: [2.3043, 48.8635],
          duration: "1.5 hours",
          description:
            "A 70-minute open-top boat from Pont de l'Alma. From the water you pass under every famous bridge, glide past Notre-Dame (reopened in 2024 after the 2019 fire), the Louvre, the Musée d'Orsay, and finish back at the Eiffel Tower. The audio is in French but English is also available for the kids if you prefer. On the upper open deck, the kids will love waving at people on every bridge as you pass under them. If you board at 7–9pm in summer, the Seine banks light up one bulb at a time, and if you're lucky you'll catch the Eiffel Tower's golden 5-minute hourly sparkle — the kids will scream.",
          estimatedCost: "~$16/adult, ~$8/child",
          transitFromPrev: "Métro 1 → 9 from Tuileries → Alma-Marceau, ~15 min",
          kidFriendly: true,
        },
        {
          order: 5,
          time: "16:30",
          type: "rest",
          name: "Hotel break + early dinner prep",
          area: "15th arrondissement",
          coords: [2.2960, 48.8500],
          duration: "1.5 hours",
          description:
            "Back to the aparthotel. Boil pasta in the kitchenette, eat in pajamas. The kids can hear distant church bells through the open window and sleep deeply — tomorrow is Disney all day. Parents can pop down to the Monoprix on Rue du Commerce for French cheese, charcuterie, and red wine for a late-night cheese platter on the small balcony.",
          estimatedCost: "~$15 groceries",
          transitFromPrev: "10 min walk",
          kidFriendly: true,
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Disneyland Paris",
      summary:
        "Save the biggest day for last. Disneyland is 35 minutes from central Paris by RER and worth a full day on its own.",
      stops: [
        {
          order: 1,
          time: "08:30",
          type: "transit",
          name: "RER A to Disneyland",
          area: "Châtelet → Marne-la-Vallée",
          coords: [2.7833, 48.8722],
          duration: "1 hour",
          description:
            "Take Métro 6 from Bir-Hakeim to Charles de Gaulle-Étoile, change to RER A toward Marne-la-Vallée Chessy. The terminus is the park entrance — you literally step off the train and the Sleeping Beauty Castle spires appear at the turnstile. Leave the hotel at 8am, arrive 9:30am for the rope-drop ceremony — Mickey appears with all the Disney characters, and your kid's face the moment they spot their first character is the trip's emotional peak.",
          estimatedCost: "~$25 family round-trip",
          transitFromPrev: "10 min walk to Bir-Hakeim",
          kidFriendly: true,
        },
        {
          order: 2,
          time: "10:00",
          type: "activity",
          name: "Disneyland Park (Fantasyland morning)",
          area: "Marne-la-Vallée",
          address: "Boulevard de Parc, 77700 Coupvray",
          coords: [2.7820, 48.8722],
          duration: "4 hours",
          description:
            "While everyone rushes to Big Thunder Mountain, you go straight to Fantasyland. Order: It's a Small World → Peter Pan's Flight → Dumbo → Mad Hatter teacups → carousel. For a princess meal, the 'Auberge de Cendrillon' (Cinderella Inn) needs to be booked months ahead via the app — 8 Disney princesses come to your table for photos, which your kid (especially a daughter) will remember for life. Download the 'Disneyland Paris' app for live wait times.",
          estimatedCost: "~$320 family day ticket",
          bookingTip: "Buy tickets at disneylandparis.com — gate prices are ~$40 more. Pre-buy 'Premier Access' ($10–15 per attraction) to skip the lines on the most popular rides — unnecessary on rainy days, recommended in July–August.",
          transitFromPrev: "5 min walk",
          kidFriendly: true,
        },
        {
          order: 3,
          time: "14:00",
          type: "meal",
          name: "Lunch at Casey's Corner (Main Street)",
          area: "Disneyland Park",
          coords: [2.7800, 48.8730],
          duration: "1 hour",
          description:
            "Hot dogs and chili fries on Main Street USA with a live piano player playing jazz. Disneyland Paris food is surprisingly good, and this place is the kids' favorite. 25 minutes to eat then back to the rides. If you want a sit-down French meal, 'Walt's an American Restaurant' is the best table-service in the park, but book in the app.",
          estimatedCost: "~$50 for family",
          transitFromPrev: "Built in",
          kidFriendly: true,
        },
        {
          order: 4,
          time: "15:30",
          type: "activity",
          name: "Adventureland & Frontierland",
          area: "Disneyland Park",
          coords: [2.7795, 48.8728],
          duration: "3 hours",
          description:
            "Pirates of the Caribbean (gentle for kids), Indiana Jones coaster (height limit), Phantom Manor (a slightly scarier Haunted Mansion — check kid tolerance), and Big Thunder Mountain area for the western scenery. Parents can take a turn over the Adventure Isle climbing bridges; the kids can run and climb for an hour. Between 3 and 5pm, queue for the 'Mickey meet & greet' at Town Square Theater — the wizard-robe Mickey, 40-min line but the photo quality is the best in the park.",
          estimatedCost: "Included",
          transitFromPrev: "Built in",
          kidFriendly: true,
        },
        {
          order: 5,
          time: "19:00",
          type: "sight",
          name: "Disney Illuminations",
          area: "Castle Stage",
          coords: [2.7798, 48.8722],
          duration: "30 min",
          description:
            "A nightly fireworks + projection show on the Sleeping Beauty Castle — Disney movie clips projected on the castle façade synced with the fireworks. Stake out a spot on Main Street 30 minutes ahead — the central plaza facing the castle is prime but packed; benches mid-Main Street give you the full panorama at a slightly lower angle. The show runs 20 minutes; afterward 50,000 people surge for the exits at once. Don't rush. Sit in place for 10 minutes, you'll get a photo of an empty Main Street with the castle lit up behind it.",
          estimatedCost: "Included",
          transitFromPrev: "5 min walk",
          kidFriendly: true,
        },
        {
          order: 6,
          time: "20:00",
          type: "transit",
          name: "RER A back to Bir-Hakeim",
          area: "Marne-la-Vallée → Paris",
          coords: [2.2960, 48.8540],
          duration: "1 hour",
          description:
            "Trains run until midnight — plenty of time. By the time you reach Charles de Gaulle-Étoile, the kids will be asleep. Cover them gently with your jacket, listen to the rails, watch the Paris lights flicker past the window — this is the quietest, tenderest stretch of the entire trip.",
          estimatedCost: "Included in morning ticket",
          transitFromPrev: "5 min walk",
          kidFriendly: true,
        },
      ],
    },
  ],
  packingTips: [
    "Light, foldable stroller — Paris cobblestones are real; 4 wheels are more stable than 3 on the rough surfaces",
    "Small backpack with snacks, wipes, hand sanitizer, and a change of clothes",
    "A small water bottle each — restaurants will refill them for free if you say 'une carafe d'eau, s'il vous plaît'",
    "A Disney/princess outfit for day 3 — kids who dress up get extra attention from cast members and visibly better photos",
    "Rain capes (not umbrellas, hard to use over a stroller) — Paris spring weather changes every 10 minutes",
    "Common kid medications (paracetamol, anti-nausea) — Paris pharmacies label everything in French and on-the-spot panic is no fun",
  ],
  budgetEstimate: "~$280–350/day for a family of 4, excluding hotel and Disney ticket",
  generalTips: [
    "All Paris museums are free for kids under 18 — bring passports as proof",
    "Bring kids' favorite cereal — tiny things like familiar breakfast prevent meltdowns",
    "Most cafés have free, clean toilets if you buy a coffee — plan stops around them",
    "If you'll do more than 3 paid museums, the 'Paris Museum Pass' (€55/2 days) pays for itself easily — Louvre + Orsay + Orangerie + Versailles makes it back",
    "Restaurants generally only open 12–14 and 19–22 with a closed gap — for a hungry kid in between, hit a boulangerie or Monoprix",
    "Paris pickpockets target the Métro and the Eiffel Tower / Trocadéro area — wear bag in front, backpack on your chest, never accept paper from a stranger",
  ],
};

export default paris3dFamily;
