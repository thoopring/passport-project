import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Reykjavik, 4 days, couple, midrange.
 *
 * Reykjavik base + Golden Circle day + South Coast day + Blue Lagoon
 * send-off. Built for a couple who want Iceland's iconic landscapes
 * without an extreme self-drive ring road. Every coordinate is a real
 * site; every restaurant is a real, currently-operating spot. Text
 * fields enriched beyond typical API output — samples are the
 * conversion surface.
 */
const reykjavik4dCouple: TripPlan = {
  destination: "Reykjavik",
  destinationCountry: "Iceland",
  durationDays: 4,
  overview:
    "Four days for a couple who want Iceland's greatest hits without the all-in ring-road commitment. You'll base in Reykjavik 101 — the downtown core walks beautifully — and use it as your launchpad for two big day trips: the Golden Circle (Þingvellir, Geysir, Gullfoss) and the South Coast (waterfalls and a black-sand beach you'll never forget). Day 4 is a slow Blue Lagoon morning before your flight. By the end of it the country will have dealt you mossy lava, geothermal steam, a cathedral of basalt columns by the sea, and a sky that turns three colors on the way back to your hotel — and you'll have eaten salmon four ways. Iceland is small in distance and enormous in feeling.",
  bestSeasonNote:
    "June through August is the comfortable midnight-sun window — long daylight, every road open, but the priciest months and you'll need a sleep mask. Late September through October is the value sweet spot: leaves turning, full ring road still drivable, aurora season starting (your odds rise dramatically after September 20). November through February is dark (4 hours of light per day) but maximum aurora chance and the lowest prices; pack for serious cold and bring spike grippers. Avoid March's transitional weather (mud + slush + closed roads). Volcanic activity on the Reykjanes peninsula (where Blue Lagoon and KEF airport are) has been recurring since 2023 — check Icelandic Met Office (vedur.is) within 48 hours of your trip.",
  currencyTip:
    "Iceland is one of the most card-friendly countries on earth. Visa, Mastercard, Apple Pay, Google Pay — 99% of places. Self-service gas pumps require a chip-and-PIN card; ask your bank for a 4-digit PIN before you fly or you'll be stuck. Currency is Icelandic Króna (ISK); 130 ISK ≈ $1. ATMs only useful for tipping cash (not customary anyway) — skip them. Tap water is free, clean, and tastes amazing — buy a refillable bottle, never bottled water (~$5 a small bottle).",
  languageTip:
    "Icelandic is the language but English fluency is the highest in Europe outside the UK — you'll never need a phrase book. The one Icelandic word worth learning is 'takk' (thanks). Place names are unpronounceable on purpose ('Eyjafjallajökull') — locals find your attempt charming, just try. The Icelandic phonebook still uses patronymics — Jón Einarsson is Jón son of Einar — which is why every staff name tag is just a first name.",
  emergencyNumber: "112 (all emergencies, English-speaking dispatch, free from any phone)",
  hotel: {
    name: "Hotel Borg by Keahotels",
    area: "Reykjavik 101 (downtown), Austurvöllur square",
    address: "Pósthússtræti 11, 101 Reykjavík",
    coords: [-21.9388, 64.1466],
    rationale:
      "Hotel Borg has been on Austurvöllur square since 1930 — Iceland's first proper hotel, built for the 1000-year parliament celebration. The Art Deco rooms have aged into something quietly perfect: marble bathrooms, original brass fittings, blackout curtains that matter (midnight sun). You're 4 minutes' walk from Hallgrímskirkja, 6 minutes from the Sun Voyager and harbor, and the Flybus airport shuttle stops at BSÍ terminal 12 minutes away. Kol or Skál — two of Reykjavik's best restaurants — are a 5-minute walk. The square itself is where Icelanders gather for protests, concerts, and the Christmas market — sleeping above it puts you inside the city's living room.",
    priceTier: "$$$",
    estimatedNightlyRate: "~$280/night",
  },
  airportTransit: {
    method: "Flybus shuttle (Keflavik International → BSÍ Bus Terminal) + 5 min walk",
    duration: "~50 minutes",
    cost: "~$30 round-trip",
    instructions:
      "Book Flybus ahead at re.is — board outside KEF arrivals (look for the orange Flybus signs immediately past customs, no need to leave the building). Buses depart every 30–40 min, timed to flight arrivals, runs even at 4am. Drops you at BSÍ Bus Terminal in central Reykjavik — Hotel Borg is 12 minutes' walk through downtown (or pay $7 extra for the door-to-door 'Flybus+' to your hotel lobby — worth it on first arrival with luggage). On return, the BSÍ pickup is 2.5 hours before your departure for international flights. A taxi from KEF is ~$170 each way — only worth it for groups of 4. Do not rent a car at KEF unless you're driving the ring road — Reykjavik's downtown is walkable and parking is a paid hassle.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Reykjavik downtown — first impressions",
      summary:
        "Land, drop bags, and walk the colorful 101 — the church, the waterfront, hot dog from the world's most famous stand, harbor at golden hour, dinner of fresh-caught fish.",
      stops: [
        {
          order: 1,
          time: "13:30",
          type: "rest",
          name: "Hotel Borg check-in",
          area: "Austurvöllur square",
          coords: [-21.9388, 64.1466],
          duration: "45 min",
          description:
            "Drop bags, the Art Deco lobby will already feel like a small bonus. If your room isn't ready, the Borg Espresso Bar pulls excellent coffee and the bar runs a complimentary afternoon hot-water + tea station. Ask the concierge for an updated weather + aurora forecast (Vedur.is) — Iceland's weather changes every 2 hours and tomorrow's plan will hinge on it.",
          estimatedCost: "—",
          transitFromPrev: "Flybus drop-off",
        },
        {
          order: 2,
          time: "14:30",
          type: "sight",
          name: "Hallgrímskirkja",
          area: "Skólavörðuholt",
          address: "Hallgrímstorg 1, 101 Reykjavík",
          coords: [-21.9266, 64.1417],
          duration: "1 hour",
          description:
            "The basalt-column-shaped church (architect Guðjón Samúelsson, finished 1986 after 41 years of construction) is Reykjavik's tallest building and obvious from anywhere downtown. Pay $10 each for the elevator to the 73-meter tower — the whole peninsula opens up: Faxaflói bay, the colorful tin-roofed houses (Reykjavik painted them as a job-creation program in the Depression), Esja mountain across the water. Inside, the 5,275-pipe Klais organ runs free 30-minute lunchtime concerts most Mondays at 12:00 — even atheists soften when the bass pipes shake the floor.",
          estimatedCost: "~$10/person tower entry",
          bookingTip: "No advance booking; arrive before 16:30 (last elevator).",
          transitFromPrev: "8 min walk uphill from hotel",
        },
        {
          order: 3,
          time: "16:00",
          type: "meal",
          name: "Bæjarins Beztu Pylsur",
          area: "Old Harbor",
          address: "Tryggvagata 1, 101 Reykjavík",
          coords: [-21.9387, 64.1500],
          duration: "20 min",
          description:
            "Open since 1937, the world's most famous hot dog stand — Bill Clinton ate here in 2004 and made it international news. Order 'eina með öllu' (one with everything): lamb-pork-beef sausage, sweet brown mustard, remoulade, fried + raw onions, ketchup. $6, eaten standing on the corner. The line moves fast even when it looks long. Iceland's fast-food working class lunch — locals eat 4–5 a year on average, even now.",
          estimatedCost: "~$6",
          transitFromPrev: "10 min downhill walk",
        },
        {
          order: 4,
          time: "17:00",
          type: "sight",
          name: "Sun Voyager (Sólfar) + Harpa concert hall",
          area: "Sæbraut waterfront",
          coords: [-21.9226, 64.1473],
          duration: "1 hour",
          description:
            "The skeletal stainless-steel Viking ship sculpture (Jón Gunnar Árnason, 1990) sits on the seafront pointing across the bay — at golden hour the steel goes copper and the mountain Esja behind it goes pink. Walk 8 minutes east along the water to Harpa, the glass-paneled concert hall that looks like crystallized basalt (Studio Olafur Eliasson + Henning Larsen, 2011). The lobby is free to enter; the geometry of the panels reflecting the harbor is the photo. If there's a free chamber-music rehearsal happening you can sometimes sit in.",
          estimatedCost: "Free",
          transitFromPrev: "7 min walk along the harbor path",
        },
        {
          order: 5,
          time: "19:30",
          type: "meal",
          name: "Matur og Drykkur",
          area: "Old Harbor (Grandi neighborhood)",
          address: "Grandagarður 2, 101 Reykjavík",
          coords: [-21.9460, 64.1535],
          duration: "2 hours",
          description:
            "Modern Icelandic with a deep respect for old methods — chef Hrefna Sætran's tasting menu rotates weekly but expect cured arctic char with brown butter, lamb shoulder slow-cooked overnight in birch smoke, and a wild-blueberry skyr for dessert. The 'Saltfish 1.0 vs 2.0' course (traditional salted cod vs the chef's modern reinterpretation, side-by-side) is a tiny bit of theater that's worth ordering. Go for the tasting menu — $95/person and 7 courses; à la carte is fine but the menu was designed to flow. Booking essential, even Tuesdays.",
          estimatedCost: "~$110/person with wine pairing",
          bookingTip: "Reserve via website 1–2 weeks ahead; ask for the corner banquette.",
          transitFromPrev: "Walk along Old Harbor, 12 min",
        },
        {
          order: 6,
          time: "22:00",
          type: "activity",
          name: "Slippbarinn (cocktail nightcap)",
          area: "Reykjavik Marina Hotel",
          coords: [-21.9446, 64.1531],
          duration: "1 hour",
          description:
            "Iceland's first cocktail bar, opened 2012, still the standard. Order the 'Birch & Brimstone' (birch-syrup old fashioned with sulfur-water sparkle, somehow more pleasant than it sounds) or whatever the bartender suggests. In summer the sun is still up at 23:00 — bizarre to drink a nightcap in golden light. In winter, the bar is a cozy refuge with sheepskin throws on the chairs. Stay for one and walk back along the harbor — Reykjavik at midnight is among the safest cities in the world.",
          estimatedCost: "~$22/cocktail",
          transitFromPrev: "Built-in (next door)",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Golden Circle classic",
      summary:
        "The classic full-day loop — tectonic-plate rift, geyser eruption, two-tiered waterfall, plus a tomato-greenhouse lunch you'll talk about. Self-drive in summer, guided bus in winter.",
      stops: [
        {
          order: 1,
          time: "08:30",
          type: "transit",
          name: "Pickup or rental car start",
          area: "Reykjavik 101",
          coords: [-21.9388, 64.1466],
          duration: "30 min",
          description:
            "Two ways: (a) book a small-group tour with Reykjavik Excursions or Iceland Horizon (~$95/person, 9 hours, English guide, picks up at hotel) — best in winter for ice-tested drivers; or (b) self-drive a rental from Lotus or Budget at BSÍ (~$110/day for a small 4WD) — best in summer for flexibility. The Golden Circle is a 230 km loop, perfectly drivable in a regular car April-October.",
          estimatedCost: "~$95–110",
          transitFromPrev: "Hotel pickup or 12 min walk to BSÍ",
        },
        {
          order: 2,
          time: "10:00",
          type: "sight",
          name: "Þingvellir National Park",
          area: "Bláskógabyggð",
          coords: [-21.1295, 64.2559],
          duration: "1.5 hours",
          description:
            "UNESCO site with two stories layered on top of each other. Geologically it's the visible boundary between the North American and Eurasian tectonic plates — you can literally walk between them in the Almannagjá rift gorge, the cliff on your left is North America, the cliff on your right is Europe, the gap widens 2cm a year. Politically it's where the Alþingi (the world's oldest still-functioning parliament, founded 930 CE) met outdoors for centuries. Walk the gorge to the Lögberg (Law Rock) where speakers stood, then the small church and Öxarárfoss waterfall behind it. Allow 90 min; parking $10 (P1 lot is closest).",
          estimatedCost: "~$10 parking",
          bookingTip: "No entry fee; arrive before 11:00 to beat tour buses.",
          transitFromPrev: "Drive 50 min from Reykjavik",
        },
        {
          order: 3,
          time: "12:00",
          type: "sight",
          name: "Geysir geothermal area",
          area: "Haukadalur",
          coords: [-20.3047, 64.3127],
          duration: "1 hour",
          description:
            "The original 'geyser' — the word comes from this place — is dormant now, but its neighbor Strokkur reliably erupts every 5–10 minutes, shooting 20–30 meters straight up. Stand on the upwind side (signs show prevailing direction) and have your phone ready in burst mode; the eruption builds with a turquoise dome that flips inside-out in half a second. Walk the boardwalk loop to see Litli-Geysir (small bubbling pool) and Blesi (deep blue silica spring). Free; the small visitor center has clean toilets and a coffee stand.",
          estimatedCost: "Free",
          transitFromPrev: "Drive 50 min east",
        },
        {
          order: 4,
          time: "13:30",
          type: "meal",
          name: "Friðheimar tomato greenhouse",
          area: "Reykholt",
          coords: [-20.5165, 64.2619],
          duration: "1.5 hours",
          description:
            "Lunch inside a working geothermal-heated tomato greenhouse — you eat among the vines, bumblebees included (they pollinate). The fixed menu is tomato soup with all-you-can-eat fresh-baked bread + butter ($28), and it's far better than that sounds — basil grown 5 meters from your table, sourdough still warm. Add the 'Green Lady' (tomato + Icelandic gin cocktail) if you're not driving. Reservations essential — they release tables 14 days ahead and Saturdays sell out same-day.",
          estimatedCost: "~$32/person with drink",
          bookingTip: "Book at fridheimar.is exactly 14 days out at 09:00 Iceland time.",
          transitFromPrev: "Drive 15 min south",
        },
        {
          order: 5,
          time: "15:30",
          type: "sight",
          name: "Gullfoss waterfall",
          area: "Hvítá river",
          coords: [-20.1245, 64.3275],
          duration: "1 hour",
          description:
            "The 'Golden Falls' is 32 meters in two tiers, dropping into a narrow canyon that throws spray a hundred meters into the air on a sunny day — that's the rainbow you've seen in every Iceland photo. There are two viewpoints: the upper observation platform (parking near the visitor center, easy 5-min walk) and the lower path that puts you 20 meters from the lip (longer walk, slippery, wear waterproof). Both are free. The visitor center has a $14 lamb soup that's earned its reputation among cold-and-windswept tourists.",
          estimatedCost: "Free",
          transitFromPrev: "Drive 15 min north",
        },
        {
          order: 6,
          time: "17:00",
          type: "activity",
          name: "Secret Lagoon (Gamla Laugin)",
          area: "Flúðir village",
          coords: [-20.3105, 64.1379],
          duration: "1.5 hours",
          description:
            "The smarter alternative to Blue Lagoon if you want hot water now: 38–40°C natural spring pool surrounded by black gravel and steam, a small geyser erupting in the corner every 5 min. Built in 1891, it's the oldest public pool in Iceland. Cheaper ($35 vs $70 at Blue Lagoon), less crowded, and the water has the same silica-rich healing properties. Towel rental + locker included; bring your own swimsuit. Stay until your fingers prune; this is the day's reset.",
          estimatedCost: "~$35/person",
          bookingTip: "Book ahead at secretlagoon.is — 17:00 slot is the sunset glow.",
          transitFromPrev: "Drive 20 min south",
        },
        {
          order: 7,
          time: "20:00",
          type: "meal",
          name: "Fiskmarkaðurinn (back in Reykjavik)",
          area: "Aðalstræti, Reykjavik 101",
          address: "Aðalstræti 12",
          coords: [-21.9412, 64.1474],
          duration: "1.5 hours",
          description:
            "If Matur og Drykkur was the modern-traditional, Fiskmarkaðurinn is modern-Asian-Icelandic crossover — sushi-grade Icelandic langoustine, Arctic char with miso, lamb shoulder with Korean glaze. Chef Hrefna Sætran's other restaurant, slightly more theatrical. The 'fiskmarkaður' tasting menu ($120) walks the line beautifully. The basement room with low candles is the request when booking.",
          estimatedCost: "~$110/person",
          bookingTip: "Reserve 1 week ahead; the chef's counter is 4 seats and books fastest.",
          transitFromPrev: "Drive 1 hour 30 min back to Reykjavik",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "South Coast — waterfalls + black sand",
      summary:
        "The drama day. Two enormous waterfalls (one you walk behind), a black-sand beach guarded by basalt sea stacks, and a sleepy seaside village that ends with a red-roofed church on a hill.",
      stops: [
        {
          order: 1,
          time: "08:00",
          type: "transit",
          name: "Drive south on Route 1",
          area: "Reykjavik → Selfoss → Hvolsvöllur",
          coords: [-20.4106, 63.7536],
          duration: "1.5 hours",
          description:
            "The Ring Road south is mostly farmland-and-volcanoes flat — Eyjafjallajökull (the volcano that grounded European flights in 2010) sits to your left as you drive east. Stop at the N1 gas station in Selfoss for the iconic Icelandic gas-station hot dog (genuinely good) and any last-minute snacks; small bottle of water, fruit. Phone reception drops past Selfoss for stretches; download offline Google Maps before leaving Reykjavik.",
          estimatedCost: "~$15 fuel one-way",
          transitFromPrev: "—",
        },
        {
          order: 2,
          time: "10:00",
          type: "sight",
          name: "Seljalandsfoss waterfall (walk behind it)",
          area: "South Iceland",
          coords: [-19.9886, 63.6157],
          duration: "1 hour",
          description:
            "60-meter ribbon waterfall fed by the Eyjafjallajökull glacier — one of the few waterfalls in Iceland you can walk behind. The path is slippery; wear actual waterproof, not just water-resistant, you WILL get sprayed. From behind the curtain looking out you see daylight through a wall of falling water — the photo every couple takes here. Parking is $10 (P1 lot, automated meter). The neighbor 600 meters east, Gljúfrabúi, is hidden inside a slot canyon — wade through ankle-deep stream to enter, and the cathedral of mist inside is more dramatic than Seljalandsfoss itself.",
          estimatedCost: "~$10 parking",
          bookingTip: "No entry fee. Arrive by 10:00 — tour buses descend at 11:00.",
          transitFromPrev: "Drive 30 min east",
        },
        {
          order: 3,
          time: "11:30",
          type: "sight",
          name: "Skógafoss waterfall",
          area: "Skógar",
          coords: [-19.5117, 63.5320],
          duration: "1 hour",
          description:
            "60 meters tall, 25 meters wide — perfectly rectangular, perfectly classical. There's a staircase on the right side (370 steps) climbing to a viewing platform on top; the view from above is across the south coast plains. From the base you stand in the spray and the rainbow is almost guaranteed in afternoon sun. Local legend: a Viking buried treasure behind the falls and you can sometimes find a glint of gold; in 2002 archaeologists actually did find a Viking sword nearby. Free.",
          estimatedCost: "Free",
          transitFromPrev: "Drive 30 min east",
        },
        {
          order: 4,
          time: "13:00",
          type: "meal",
          name: "Mia's Country Van (or Black Beach Restaurant)",
          area: "Vík",
          coords: [-19.0098, 63.4165],
          duration: "1 hour",
          description:
            "Lunch in or around Vík — Mia's Country Van (food truck, summer only) does outstanding fish and chips with Icelandic cod from a converted vintage van; or the Black Beach Restaurant inside the Reynisfjara visitor building does sit-down lamb soup ($16) with views of the basalt cliffs. Either is fine. Skip the Skool Beans coffee bus next door — cute but average. Save room: dinner in Reykjavik is the day's payoff.",
          estimatedCost: "~$22/person",
          transitFromPrev: "Drive 25 min east",
        },
        {
          order: 5,
          time: "14:30",
          type: "sight",
          name: "Reynisfjara black-sand beach + basalt columns",
          area: "Vík í Mýrdal",
          coords: [-19.0440, 63.4067],
          duration: "1.5 hours",
          description:
            "Volcanic-glass black sand, hexagonal basalt columns climbing the cliff (Iceland called Hálsanefshellir cave; Game of Thrones called it the Eastwatch by the Sea), and the Reynisdrangar sea stacks rising offshore — the basalt fingers Icelandic legend says are trolls who got caught by sunrise. Important: the 'sneaker waves' here are deadly serious — 5 tourists have drowned since 2007. Stay at least 30 meters back from the waterline, never turn your back on the ocean. Watch the warning lights at the parking lot before walking down.",
          estimatedCost: "~$10 parking",
          bookingTip: "No booking. Best light is 14:00–16:00 — basalt columns side-lit.",
          transitFromPrev: "Drive 5 min south",
        },
        {
          order: 6,
          time: "16:30",
          type: "sight",
          name: "Vík village + Reyniskirkja red-roof church",
          area: "Vík í Mýrdal",
          coords: [-19.0044, 63.4185],
          duration: "45 min",
          description:
            "Iceland's southernmost village (300 people) sits on a hill, the red-roofed Reyniskirkja church on the highest point. The church is symbolically significant: built in 1929, it's the only structure expected to survive when the Katla volcano under Mýrdalsjökull glacier eventually erupts — locals run an evacuation drill twice a year and the church is their muster point. Walk up for the photo and the panorama back across Reynisfjara. The Víkurprjón wool factory in town has good Icelandic sweaters at honest prices ($150–250) if you want a souvenir that lasts forever.",
          estimatedCost: "Free",
          transitFromPrev: "5 min drive back uphill",
        },
        {
          order: 7,
          time: "20:00",
          type: "meal",
          name: "Dill — Iceland's Michelin star",
          area: "Reykjavik 101",
          address: "Hverfisgata 12",
          coords: [-21.9343, 64.1457],
          duration: "2.5 hours",
          description:
            "Iceland's first Michelin-starred restaurant (2017), still the only one in the country. Chef Gunnar Karl Gíslason runs a 7-course tasting ($230 with wine pairing) built entirely on Icelandic ingredients — fermented seaweed butter, charcoal-cured arctic char, glacier-water sorbet, lamb that's been salt-cured in a sheep barn three valleys away. The room seats 22, books 6–8 weeks ahead. If you have one big food night in Iceland, this is it. Or skip and go to Skál at Hlemmur Mathöll if you want casual neo-Icelandic for ~$60/person.",
          estimatedCost: "~$230/person with pairings",
          bookingTip: "Reserve 6–8 weeks ahead at dillrestaurant.is. Tuesdays book last.",
          transitFromPrev: "Drive 2 hours 30 min back to Reykjavik",
        },
      ],
    },
    {
      dayNumber: 4,
      theme: "Blue Lagoon + airport",
      summary:
        "Slow morning, the famous milk-blue geothermal pool, lunch with a view, and an unhurried Flybus to KEF.",
      stops: [
        {
          order: 1,
          time: "09:30",
          type: "rest",
          name: "Hotel breakfast + check-out",
          area: "Hotel Borg",
          coords: [-21.9388, 64.1466],
          duration: "1 hour",
          description:
            "Borg's breakfast is the best of any 4-star in town — house-cured salmon, skyr with wild blueberries, sourdough from the bakery next door. Eat slowly; the Blue Lagoon is engineered for relaxation and you should arrive in that mode already. Check out by 11:00 (luggage stored at reception free until you collect at 13:00).",
          estimatedCost: "Included if breakfast booked",
          transitFromPrev: "—",
        },
        {
          order: 2,
          time: "11:00",
          type: "transit",
          name: "Flybus from BSÍ → Blue Lagoon",
          area: "Reykjanes peninsula",
          coords: [-22.4493, 63.8804],
          duration: "45 min",
          description:
            "Flybus runs an explicit 'Reykjavik → Blue Lagoon → KEF airport' route that lets you do exactly what you want — bring all your luggage, stop at Blue Lagoon (they have an attended luggage room), then continue to the airport on the next bus. Round-trip from BSÍ ~$50/person; book at re.is. Departures every hour from BSÍ. Sit on the right side for views of the Reykjanes lava fields — you'll pass through 5,000-year-old solidified lava with bright-green moss covering it.",
          estimatedCost: "~$50/person",
          transitFromPrev: "12 min walk to BSÍ",
        },
        {
          order: 3,
          time: "12:00",
          type: "activity",
          name: "Blue Lagoon (Comfort or Premium package)",
          area: "Grindavík, Reykjanes",
          address: "Norðurljósavegur 9, 240 Grindavík",
          coords: [-22.4493, 63.8804],
          duration: "2.5 hours",
          description:
            "The famous one — milky turquoise from silica suspension, set in black lava rock, water 38–40°C all year. Bookings are timed-entry only; the Comfort package ($75) is plenty (entry, towel, drink, silica mud mask). Premium ($120) adds robes, slippers, second mask, sparkling wine — overkill unless you want a slow afternoon. Critical tip: condition your hair before entering and wear a tied-back bun — the silica + minerals turn untreated hair into hay for a week. Lockers, wristband payment, no cash needed inside. The swim-up bar serves complimentary drinks (the wristband counts your free ones — usually 1).",
          estimatedCost: "~$75/person Comfort",
          bookingTip: "Book at bluelagoon.com 2–3 weeks ahead minimum, especially summer/Christmas. Volcanic activity in Reykjanes occasionally closes the lagoon — check 24h before via their site.",
          transitFromPrev: "Bus drops at the entrance",
        },
        {
          order: 4,
          time: "14:30",
          type: "meal",
          name: "Lava Restaurant (inside Blue Lagoon complex)",
          area: "Reykjanes",
          coords: [-22.4493, 63.8804],
          duration: "1 hour",
          description:
            "Set in the lava cliff overlooking the lagoon — the dining room is built into the rock face, full window-wall onto the milky water. The 3-course set lunch is $90 — Icelandic lamb, fresh fish, skyr dessert — with the most beautiful lunch view in the country. Less stressful than rushing to airport food; the restaurant is happy to call you a Flybus pickup when you're done.",
          estimatedCost: "~$90/person",
          bookingTip: "Book lunch at the same time as your Lagoon ticket — they coordinate the timing.",
          transitFromPrev: "Built-in (changing room → restaurant in 5 min)",
        },
        {
          order: 5,
          time: "16:30",
          type: "transit",
          name: "Flybus → Keflavik International (KEF)",
          area: "Reykjanes",
          coords: [-22.6056, 63.9999],
          duration: "20 min",
          description:
            "Flybus pickup at the Lagoon entrance — same ticket as your morning leg. KEF is small and security is fast (allow 90 min for international); the airport's restaurants are below average — Lava already fed you well. Duty-free is on the airside; Brennivín (Iceland's caraway schnapps), 66°North fleece, lavafrá tea, and Icelandic chocolate are the buy-back-home items. Total trip from BL → KEF ~25 minutes including the bus shuffle.",
          estimatedCost: "Included in earlier ticket",
          transitFromPrev: "Bus from Blue Lagoon entrance",
        },
      ],
    },
  ],
  packingTips: [
    "Waterproof (not just water-resistant) jacket — Iceland weather rotates 4 times in an afternoon",
    "Fleece or wool layer — even in July evenings hit 8°C",
    "Sturdy walking shoes with grip — every viewpoint involves wet rock",
    "Swimsuit — geothermal pools are everywhere, not just Blue Lagoon",
    "Eye mask + earplugs — midnight sun in summer, partying neighbors any season",
    "Reusable water bottle — Iceland tap water is the best you'll ever taste, free everywhere",
    "Microfiber travel towel for spontaneous hot-springs stops outside the bookable lagoons",
    "Power bank — phones drain fast in cold; offline Google Maps + Aurora app are essential",
  ],
  budgetEstimate: "~$320–450/day for a couple excluding hotel (Iceland is pricey: $25 burgers, $14 beers, $90 dinners are normal)",
  generalTips: [
    "Download the SafeTravel.is app and 112 Iceland app — the latter sends your location to emergency services if you press a button on a hike",
    "Tipping is not customary; service is included. Round up if you really want to thank.",
    "Aurora forecast: vedur.is (Met Office) shows aurora intensity (0–9) and cloud cover overlay — 4+ on a clear night = strong likelihood",
    "Driving in winter: rent 4WD, stay below speed limit, never drive into a snowstorm — pull over and wait it out",
    "F-roads (mountain interior) require 4x4 by law and are closed Oct–June — don't even try in a regular car",
    "Toilets in remote areas are scarce and pay-to-use ($2 coin) — use every cafe stop",
    "Sunday in Reykjavik: many small shops close, but restaurants and the Blue Lagoon stay open",
    "Don't bathe in the moss — it's 200 years old and footprints stay for decades",
  ],
};

export default reykjavik4dCouple;
