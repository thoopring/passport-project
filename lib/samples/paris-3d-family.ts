import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Paris, 3 days, family with kids (ages ~5 and ~8), midrange.
 *
 * Optimized for stroller-friendly routes, plenty of bathroom-accessible meal
 * stops, and one big-ticket kid moment per day. Coordinates pinned to real
 * landmarks.
 */
const paris3dFamily: TripPlan = {
  destination: "Paris",
  destinationCountry: "France",
  durationDays: 3,
  overview:
    "Three days designed for a family with two young kids who want to see the icons of Paris without melting down by hour two. Each day pairs one big landmark with a long park session, includes a sit-down lunch with a real bathroom, and ends early enough that everyone has energy left for breakfast croissants the next morning.",
  bestSeasonNote:
    "May–June and September are ideal: warm enough for parks, cool enough for the Métro, and shorter museum lines than peak summer.",
  currencyTip:
    "Most museums and restaurants take contactless cards. Carry €40–60 in coins for ice cream, carousel rides, and small bakeries.",
  languageTip:
    "Always start with 'Bonjour' before asking anything in English — Parisians are dramatically more helpful when you do.",
  emergencyNumber: "112 (EU emergency), 15 (medical)",
  hotel: {
    name: "Citadines Tour Eiffel Paris",
    area: "15th arrondissement, near Eiffel Tower",
    address: "132 Boulevard de Grenelle, 75015 Paris",
    coords: [2.2960, 48.8500],
    rationale:
      "An aparthotel with kitchenettes (huge for a family — breakfast in pajamas, midday snacks, milk for the kids' cereal). Walking distance to the Eiffel Tower and the Bir-Hakeim Métro station, which puts you 4 stops from the Louvre. From CDG, the RER B + Métro 6 is the cheapest stroller-friendly route.",
    priceTier: "$$$",
    estimatedNightlyRate: "~$220/night",
  },
  airportTransit: {
    method: "RER B → Métro 6 (or taxi for the first day)",
    duration: "~75 min by train, ~50 min by taxi",
    cost: "~$15 train family ticket / ~$70 taxi",
    instructions:
      "If you have luggage and tired kids, take a flat-rate taxi from CDG (€56 to the Left Bank, fixed by Paris law). For the train route: from CDG Terminal 2, follow signs to RER B, take any train toward Paris Centre, change at Denfert-Rochereau to Métro 6 (direction Charles de Gaulle-Étoile), exit Bir-Hakeim. Citadines is a 5-min walk. The RER B has steps in places — stick with the taxi if traveling with a stroller and full luggage.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "The Eiffel Tower & Champ de Mars",
      summary:
        "Start with the icon, follow with a long picnic in the park under it, and let the kids burn energy at a real Parisian playground.",
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
            "Skip the summit ticket — the 2nd floor has the same wow factor with shorter queues and elevators that fit strollers. Book the timed-entry stair-and-elevator ticket online 2 months in advance.",
          estimatedCost: "~$22/adult, ~$11/child",
          bookingTip: "Book at toureiffel.paris exactly 60 days ahead at 8:30am Paris time — slots sell out within 2 hours.",
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
            "Pick up baguettes, jambon-beurre sandwiches, fruit, and pastries from a top boulangerie, then spread out on the grass at the Champ de Mars with the tower in view. Cheaper, calmer, and more memorable than any restaurant.",
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
            "A real, century-old carousel sits at the south end of the park. There's a fenced playground with sand, slides, and climbing nets next to it. This is where you let the kids decompress.",
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
            "Critical for a family trip. Get back to the apartment, make tea, let the kids watch a cartoon, and resist the urge to squeeze in another sight.",
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
            "A neighborhood bistro by chef Christian Constant. Real French food, kids welcome, fast service, and a kid menu that isn't an afterthought. Roast chicken, frites, and a profiterole each is the move.",
          estimatedCost: "~$80 for family",
          bookingTip: "Reserve 1 week ahead via TheFork — they take family bookings seriously.",
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
            "Enter via the Carrousel du Louvre underground — much shorter line than the pyramid. Hit only: Mona Lisa (Denon wing 2nd floor), Venus de Milo, Winged Victory, Egyptian mummies, and Napoleon III's apartments. Tell the kids it's a treasure hunt.",
          estimatedCost: "~$22/adult, free under 18",
          bookingTip: "Buy timed-entry tickets at louvre.fr 1 week ahead. Closed Tuesdays.",
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
            "Walk straight out the Louvre into the Tuileries. Rent toy sailboats from the green chair stand at the central pond — kids push them around the basin with long sticks. Iconic, simple, joyful.",
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
            "A century-old tea room famous for the thickest hot chocolate in Paris (genuinely like drinking warm ganache). Kids get a croque-monsieur, parents get the salade Niçoise, and everyone shares an Mont-Blanc dessert.",
          estimatedCost: "~$70 for family",
          bookingTip: "No reservations for under 6 people — go at 13:00 for the shortest queue.",
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
            "A 70-minute open-top boat ride from Pont de l'Alma. You pass under every famous bridge and see Notre-Dame, the Louvre, and the Eiffel Tower from the water. Strollers welcome on board.",
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
            "Back to the aparthotel. Make pasta from the kitchenette, eat in pajamas, and call it a night. The kids will sleep through the bells.",
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
        "Save the biggest day for last. Disneyland is 35 minutes from central Paris by RER and worth the full day.",
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
            "Take Métro 6 from Bir-Hakeim to Charles de Gaulle-Étoile, change to RER A toward Marne-la-Vallée Chessy. The terminus is the park entrance — you literally step off the train into Disneyland.",
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
            "Hit Fantasyland first while crowds are at Big Thunder. Order: It's a Small World, Peter Pan's Flight, Dumbo, Mad Hatter teacups, and the carousel. Lunch at Auberge de Cendrillon if you want a princess meal (book months ahead).",
          estimatedCost: "~$320 family day ticket",
          bookingTip: "Buy tickets online via disneylandparis.com — gate prices are ~$40 more.",
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
            "Hot dogs and chili fries on Main Street USA with a piano player. Parisian Disney has surprisingly good park food — this is the right move for a family that wants speed.",
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
            "Pirates of the Caribbean (gentle for kids), Indiana Jones coaster (taller-only), Phantom Manor (a darker Haunted Mansion — check kid tolerance), and the Big Thunder Mountain area for the views.",
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
            "A nightly fireworks + projection show on the castle. End the trip on this high note. Stake out a spot on Main Street 30 minutes early.",
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
            "Trains run until midnight. The kids will be asleep before you reach Charles de Gaulle-Étoile.",
          estimatedCost: "Included in morning ticket",
          transitFromPrev: "5 min walk",
          kidFriendly: true,
        },
      ],
    },
  ],
  packingTips: [
    "Light, foldable stroller — Paris cobblestones are real",
    "Small backpack with snacks, wipes, hand sanitizer",
    "A small water bottle each — restaurants will refill them for free",
    "A Disney/princess outfit for day 3 — kids who dress up have visibly better days",
  ],
  budgetEstimate: "~$280–350/day for a family of 4, excluding hotel and Disney ticket",
  generalTips: [
    "All Paris museums are free for kids under 18 — bring passports as proof",
    "Bring kids' favorite cereal — tiny things like familiar breakfast prevent meltdowns",
    "Most cafés have free, clean toilets if you buy a coffee — plan stops around them",
    "Book a 'Paris Museum Pass' if you'll do more than 3 paid museums — pays for itself",
  ],
};

export default paris3dFamily;
