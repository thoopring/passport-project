import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Taipei, 3 days, solo, budget, balanced pace.
 *
 * A solo traveler's take on Taipei — night markets every evening, Taipei
 * 101 for the view, a Jiufen day trip, a proper beef noodle soup pilgrimage.
 * Hand-curated; coordinates are real.
 */
const taipei3dSolo: TripPlan = {
  destination: "Taipei",
  destinationCountry: "Taiwan",
  durationDays: 3,
  overview:
    "Three days solo in Taipei — arguably Asia's most underrated capital. Walkable, friendly, food obsessed. This plan is built around three things: night markets every night, one big city view, and a day trip to Jiufen for the tea house that inspired Spirited Away. Budget-friendly; you can do most meals for under $10.",
  bestSeasonNote:
    "October–November and March–April are the most comfortable months. Summer (June-Sept) is hot and humid with typhoons; winter is mild (~15°C) but often rainy.",
  currencyTip:
    "New Taiwan Dollar (NT$ or TWD). 30 TWD ≈ $1. Cards work at 7-Eleven and larger restaurants. Night markets are cash-only. Get an EasyCard at any metro station for transit + convenience store payments.",
  languageTip:
    "Mandarin Chinese. English signs in the metro and at tourist sites; less common at night markets. Point-and-pay works. 'Xièxiè' (thank you) and a small nod go a long way.",
  emergencyNumber: "110 (police), 119 (ambulance/fire)",
  hotel: {
    name: "Ximen Citizen Hotel",
    area: "Ximending",
    address: "No. 77, Kunming St., Wanhua District",
    coords: [121.5076, 25.0433],
    rationale:
      "Ximending is Taipei's Shibuya — pedestrian-only, youthful, and open until 2am. Citizen Hotel is a no-frills business hotel at 3-star prices with a metro station 2 minutes from the lobby. You're 15 min by MRT to every other major district.",
    priceTier: "$",
    estimatedNightlyRate: "~$65/night",
  },
  airportTransit: {
    method: "MRT Taoyuan Airport Line (Express) → Taipei Main",
    duration: "~45 min + 5 min metro",
    cost: "~$5",
    instructions:
      "From Taoyuan (TPE), follow signs to the MRT. Take the purple Airport Line Express (stops only twice) to Taipei Main Station — ~35 min. Transfer to the blue MRT line one stop to Ximen Station. Buy an EasyCard at the ticket counter (NT$100 deposit) — you'll use it for everything for 3 days.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Central Taipei + first night market",
      summary:
        "Longshan Temple, a beef noodle pilgrimage, a city view from Elephant Mountain, and Shilin Night Market for dinner.",
      stops: [
        {
          order: 1,
          time: "09:30",
          type: "sight",
          name: "Longshan Temple",
          area: "Wanhua",
          address: "No. 211, Guangzhou St., Wanhua District",
          coords: [121.4999, 25.0373],
          duration: "1 hour",
          description:
            "Taipei's oldest and most atmospheric temple, founded 1738. Buddhist, Taoist, and folk deities share the same altars. Watch locals perform jiaobei (moon blocks) divination in the main hall. Free and open from 06:00.",
          estimatedCost: "Free",
          transitFromPrev: "5 min walk from hotel",
        },
        {
          order: 2,
          time: "11:00",
          type: "meal",
          name: "Lin Dong Fang Beef Noodle",
          area: "Zhongshan",
          address: "No. 274, Bade Rd., Zhongshan District",
          coords: [121.5409, 25.0478],
          duration: "1 hour",
          description:
            "Taiwan's national dish, done by a 40-year institution. Order the half-tendon half-shank bowl with clear broth. Get there by 11:15 to skip the 30-min line that starts at noon.",
          estimatedCost: "~$8",
          transitFromPrev: "MRT blue → red line to Zhongxiao Fuxing, 15 min",
        },
        {
          order: 3,
          time: "13:00",
          type: "shopping",
          name: "Eslite Xinyi (bookstore + lifestyle)",
          area: "Xinyi",
          coords: [121.5671, 25.0390],
          duration: "1.5 hours",
          description:
            "A 24-hour flagship bookstore that's become Taipei's cultural living room. Six floors of books, stationery, tea sets, clothing. The 3rd-floor English travel section is excellent for filling any Taipei gaps in your plan.",
          estimatedCost: "~$15 if you buy a book",
          transitFromPrev: "MRT red line to Xiangshan, 10 min",
        },
        {
          order: 4,
          time: "15:30",
          type: "sight",
          name: "Taipei 101 Observation Deck",
          area: "Xinyi",
          coords: [121.5644, 25.0336],
          duration: "1.5 hours",
          description:
            "The 508-meter tower that was briefly the world's tallest. The 89th-floor indoor observatory shows you the tuned mass damper — a 660-ton pendulum that keeps the building steady in typhoons. The 91st floor outdoor deck is the real view. Time it for ~17:00 to catch day + sunset in one ticket.",
          estimatedCost: "~$20",
          bookingTip: "Buy online 1 day ahead to skip the ticket queue; sunset slots often sell out.",
          transitFromPrev: "10 min walk",
        },
        {
          order: 5,
          time: "17:30",
          type: "sight",
          name: "Elephant Mountain (Xiangshan) hike",
          area: "Xinyi",
          coords: [121.5775, 25.0275],
          duration: "1.5 hours",
          description:
            "20 minutes of steep stone stairs for Taipei 101's most famous photo angle. Sunset here is the Taipei iconic view — 101 tower framed by the Xinyi skyline. Bring water.",
          estimatedCost: "Free",
          transitFromPrev: "MRT to Xiangshan then 10 min walk to trailhead",
        },
        {
          order: 6,
          time: "20:00",
          type: "meal",
          name: "Shilin Night Market",
          area: "Shilin",
          coords: [121.5242, 25.0881],
          duration: "2 hours",
          description:
            "Taipei's biggest night market. Order targets: oyster omelet, stinky tofu (be brave), flame-torched beef cubes at the entrance, bubble milk tea, shaved mango ice. The underground food court is cleaner; the outdoor alleys are more fun.",
          estimatedCost: "~$18 for multiple dishes",
          transitFromPrev: "MRT red line to Jiantan, 25 min",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Day trip: Jiufen + Shifen",
      summary:
        "Train up the coast to Jiufen for tea-house lanterns, stop at Shifen for sky lanterns on the way back.",
      stops: [
        {
          order: 1,
          time: "08:30",
          type: "transit",
          name: "TRA train to Ruifang",
          area: "Taipei Main → Ruifang",
          coords: [121.8099, 25.1094],
          duration: "45 min",
          description:
            "Walk or metro to Taipei Main. Buy a ticket on the TRA (Taiwan Railways Administration) local train to Ruifang. Sit on the right for ocean views after the tunnels.",
          estimatedCost: "~$2.50",
          transitFromPrev: "MRT to Taipei Main, 5 min",
        },
        {
          order: 2,
          time: "10:00",
          type: "sight",
          name: "Jiufen Old Street",
          area: "Jiufen",
          coords: [121.8440, 25.1093],
          duration: "3 hours",
          description:
            "A gold-mining mountain town turned atmospheric tourist village. Narrow stone stairs, hanging red lanterns, tea houses perched over the sea. A-Mei Tea House at Shu Qi Road is the most Instagrammed — but also 40-min wait on weekends. Siidcha or Jioufen Teahouse are quieter and equally scenic.",
          estimatedCost: "~$10 for a pot of tea",
          bookingTip: "Go on a weekday. Avoid Saturday — Jiufen becomes a bus-tour mob.",
          transitFromPrev: "Bus 788 or 1062 from Ruifang, 15 min",
        },
        {
          order: 3,
          time: "13:30",
          type: "meal",
          name: "Ah Gan Yi Taro Balls",
          area: "Jiufen",
          coords: [121.8445, 25.1093],
          duration: "30 min",
          description:
            "The most famous snack in Jiufen — chewy taro and sweet potato balls in red bean soup. Try it hot in winter or on shaved ice in summer. Cash only.",
          estimatedCost: "~$3",
          transitFromPrev: "2 min walk within the old street",
        },
        {
          order: 4,
          time: "14:30",
          type: "transit",
          name: "Shuttle bus → Shifen",
          area: "Jiufen → Shifen",
          coords: [121.7778, 25.0416],
          duration: "45 min",
          description:
            "Take bus 788 back to Ruifang then TRA Pingxi Line east to Shifen. Or book a one-way shuttle (~$8). The train is cheaper and has nicer views of the valley.",
          estimatedCost: "~$3",
          transitFromPrev: "Bus back to Ruifang",
        },
        {
          order: 5,
          time: "16:00",
          type: "activity",
          name: "Shifen Sky Lantern release",
          area: "Shifen",
          coords: [121.7779, 25.0407],
          duration: "1 hour",
          description:
            "Buy a paper lantern at a train-station-side shop (~$5), write wishes on all four sides with a brush, release it over the railway tracks when trains aren't coming. Touristy but genuinely magical at dusk.",
          estimatedCost: "~$5",
          transitFromPrev: "Walk from Shifen train station",
        },
        {
          order: 6,
          time: "17:30",
          type: "sight",
          name: "Shifen Waterfall",
          area: "Shifen",
          coords: [121.7865, 25.0424],
          duration: "1 hour",
          description:
            "A 20-meter wide, Niagara-style falls. 10-min walk from the lantern area via a pedestrian bridge over the river. Good photo stop before catching the train back.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
        },
        {
          order: 7,
          time: "20:30",
          type: "meal",
          name: "Raohe Street Night Market",
          area: "Songshan",
          coords: [121.5773, 25.0504],
          duration: "1.5 hours",
          description:
            "Smaller and more focused than Shilin — pepper buns baked in clay ovens at the entrance (the line is worth it), medicinal spare-rib soup, and a single 600-meter stretch so you can see it all.",
          estimatedCost: "~$15",
          transitFromPrev: "Train → Songshan Station, 1 hour total",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Chiang Kai-shek + Yongkang + Dadaocheng",
      summary:
        "A memorial, the foodie street, and Taipei's best preserved old neighborhood. One more dumpling stop before the airport.",
      stops: [
        {
          order: 1,
          time: "09:00",
          type: "sight",
          name: "Chiang Kai-shek Memorial Hall",
          area: "Zhongzheng",
          coords: [121.5216, 25.0357],
          duration: "1.5 hours",
          description:
            "A white marble monument with a 6.3-meter bronze Chiang Kai-shek. Watch the changing of the guards at the top of every hour — a slow-motion choreographed ritual. The gardens outside are peaceful.",
          estimatedCost: "Free",
          transitFromPrev: "MRT red line to CKS Memorial Hall, 10 min",
        },
        {
          order: 2,
          time: "11:00",
          type: "meal",
          name: "Din Tai Fung (Yongkang original)",
          area: "Yongkang",
          address: "No. 194, Xinyi Rd. Sec. 2",
          coords: [121.5294, 25.0338],
          duration: "1 hour",
          description:
            "The original 1972 location of the Michelin-starred xiao long bao empire. 18 folds per dumpling. Also order the drunken chicken, the wonton soup, and chocolate xiao long bao for dessert.",
          estimatedCost: "~$25",
          bookingTip: "Arrive by 11:15 to get in before the 11:45 rush; no reservations for under 4 people.",
          transitFromPrev: "15 min walk from CKS",
        },
        {
          order: 3,
          time: "12:30",
          type: "shopping",
          name: "Yongkang Street stroll",
          area: "Da'an",
          coords: [121.5299, 25.0331],
          duration: "1 hour",
          description:
            "The most walkable food-and-shopping street in the city. Smoothies, mango shaved ice, coffee shops, small boutiques. Window-shop your way from Din Tai Fung to the MRT.",
          estimatedCost: "~$8 for a dessert stop",
          transitFromPrev: "Walk",
        },
        {
          order: 4,
          time: "14:00",
          type: "sight",
          name: "Dadaocheng Old Street (Dihua Street)",
          area: "Datong",
          coords: [121.5097, 25.0573],
          duration: "1.5 hours",
          description:
            "Taipei's best-preserved old neighborhood — late-Qing Dynasty baroque shophouses selling dried goods, tea, Chinese medicine, fabric. Stop at Xiahai City God Temple for a matchmaking charm. ASW Tea House has the best bubble tea in old Taipei.",
          estimatedCost: "~$6",
          transitFromPrev: "MRT green → red line to Daqiaotou, 15 min",
        },
        {
          order: 5,
          time: "16:00",
          type: "meal",
          name: "Fuhang Soy Milk",
          area: "Zhongzheng",
          coords: [121.5242, 25.0429],
          duration: "45 min",
          description:
            "A breakfast institution with a queue until 10:00 every morning. If you're going late in the day, try their newer afternoon-friendly location nearby. Order hot salty soy milk + youtiao fried dough + dan bing egg crepe. Cash only.",
          estimatedCost: "~$5",
          transitFromPrev: "MRT orange line, 20 min",
        },
        {
          order: 6,
          time: "17:30",
          type: "rest",
          name: "Daan Forest Park",
          area: "Da'an",
          coords: [121.5358, 25.0328],
          duration: "45 min",
          description:
            "Taipei's Central Park. A rest stop before the airport journey — pond with turtles, jogging path, the city skyline over the trees. Buy a tea from the park-side stand.",
          estimatedCost: "~$3",
          transitFromPrev: "MRT red line to Daan Park, 15 min",
        },
        {
          order: 7,
          time: "19:00",
          type: "transit",
          name: "Return to Taoyuan airport",
          area: "Da'an → TPE",
          coords: [121.2336, 25.0777],
          duration: "55 min",
          description:
            "MRT red line to Taipei Main, switch to Airport Line Express. 2 hours before international departure is enough — Taoyuan security is fast.",
          estimatedCost: "~$5",
          transitFromPrev: "MRT",
        },
      ],
    },
  ],
  packingTips: [
    "Compact umbrella — Taipei rains suddenly year-round",
    "Cash wallet — most night market stalls don't take cards",
    "Moleskin or blister pads — 15,000+ steps/day on concrete",
    "Hand fan in summer — humidity is brutal",
  ],
  budgetEstimate: "~$70-100/day excluding hotel",
  generalTips: [
    "Buy an EasyCard on arrival — works for MRT, buses, YouBike, and most convenience stores",
    "No eating on the MRT — NT$1,500-7,500 fine. No drinking either (including water).",
    "Tipping is not customary; 10% service at mid-range is auto-added",
    "7-Eleven and FamilyMart are your friend for ATM, SIM cards, bill payment, and ramen at 2am",
  ],
};

export default taipei3dSolo;
