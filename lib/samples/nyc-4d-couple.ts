import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: New York City, 4 days, couple, midrange.
 *
 * Covers the Manhattan-and-Brooklyn must-sees without forcing a grind —
 * museum mornings, walking afternoons, one Broadway night. Hand-curated;
 * coordinates are real, pinned to well-known landmarks.
 */
const nyc4dCouple: TripPlan = {
  destination: "New York City",
  destinationCountry: "United States",
  durationDays: 4,
  overview:
    "Four days for a couple who want to see New York without sprinting through a checklist. You'll do one Manhattan icon a day, eat like a local, cross the Brooklyn Bridge at sunset, and finish with a Broadway show. Hotel picked for Midtown walkability plus airport access.",
  bestSeasonNote:
    "Late April–early June or mid-September through late October are the sweet spots — mild weather, long daylight, manageable crowds. July humidity and February cold are the months to avoid.",
  currencyTip:
    "Cards everywhere except some bodegas and dollar pizza slices. Tipping 18-22% at sit-down restaurants is non-negotiable — it's a real income, not a bonus.",
  languageTip:
    "English, obviously. But know that New Yorkers value speed: order quickly, don't block the sidewalk, have your MetroCard ready at the turnstile.",
  emergencyNumber: "911 (all emergencies)",
  hotel: {
    name: "Pod 51 Hotel Midtown East",
    area: "Midtown East",
    address: "230 E 51st St, New York, NY 10022",
    coords: [-73.9695, 40.7561],
    rationale:
      "Midtown East puts you within walking distance of Central Park, Grand Central, and the best subway connections in the city, while being a quieter block than Times Square. Pod 51 has compact modern rooms and a rooftop for sunset. The E train to JFK is one block away.",
    priceTier: "$$",
    estimatedNightlyRate: "~$180/night",
  },
  airportTransit: {
    method: "AirTrain + LIRR from JFK → Grand Central",
    duration: "~55 minutes",
    cost: "~$15 one-way",
    instructions:
      "From JFK, follow AirTrain signs (free within the airport) → Jamaica Station. At Jamaica, buy an LIRR ticket to Grand Central (~$11 off-peak, ~$15 peak). From Grand Central, walk 8 min north to the hotel. Cheaper than Uber by half at rush hour. The AirTrain also connects to the E subway ($2.90) but it's 1 hour with two transfers.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Midtown icons",
      summary:
        "Ease in with the postcard Manhattan — Central Park, MoMA, a classic deli lunch, and Rockefeller Center at dusk.",
      stops: [
        {
          order: 1,
          time: "09:00",
          type: "sight",
          name: "Central Park (The Pond + Gapstow Bridge)",
          area: "Midtown",
          coords: [-73.9732, 40.7681],
          duration: "1.5 hours",
          description:
            "Enter at Grand Army Plaza (5th Ave & 59th). Walk north along The Pond, cross Gapstow Bridge, continue to Sheep Meadow. The south end of the park has the most iconic views and fewest bikes. Get coffee from the Dante espresso bar at the Bethesda Terrace kiosk.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk from hotel",
        },
        {
          order: 2,
          time: "11:00",
          type: "sight",
          name: "Museum of Modern Art (MoMA)",
          area: "Midtown",
          address: "11 W 53rd St",
          coords: [-73.9776, 40.7614],
          duration: "2 hours",
          description:
            "Don't try to see everything. Go to the 5th floor first for Van Gogh's Starry Night, Picasso's Demoiselles, Dali's Persistence of Memory, and Monet's Water Lilies in one room. Everything else is a bonus. Their 4th-floor postwar American collection is also world-class.",
          estimatedCost: "~$30",
          bookingTip: "Book timed-entry online to skip the door line. Free Friday evenings 16:00-20:00 via UNIQLO sponsorship but very crowded.",
          transitFromPrev: "15 min walk",
        },
        {
          order: 3,
          time: "13:30",
          type: "meal",
          name: "Katz's Delicatessen",
          area: "Lower East Side",
          address: "205 E Houston St",
          coords: [-73.9874, 40.7223],
          duration: "1 hour",
          description:
            "The pastrami on rye since 1888. You'll get a ticket at the door — hold onto it. Go to the cutter station, order pastrami on rye, and tip the cutter a dollar for the thick-cut honor. Share — it's a big sandwich.",
          estimatedCost: "~$28 for one sandwich + 2 sides",
          transitFromPrev: "F train from 5th Ave → 2nd Ave, 20 min",
        },
        {
          order: 4,
          time: "15:30",
          type: "sight",
          name: "New York Public Library (Bryant Park side)",
          area: "Midtown",
          coords: [-73.9822, 40.7532],
          duration: "45 min",
          description:
            "Walk up the marble lion-flanked steps, then inside to the Rose Main Reading Room — a 91-meter cathedral ceiling over wooden tables where people have done actual work for 100 years. Free to visit.",
          estimatedCost: "Free",
          transitFromPrev: "F train to 42nd St-Bryant Park, 15 min",
        },
        {
          order: 5,
          time: "17:00",
          type: "sight",
          name: "Top of the Rock observation deck",
          area: "Midtown",
          coords: [-73.9782, 40.7587],
          duration: "1 hour",
          description:
            "Better than Empire State because you're IN the skyline, not looking at Midtown. Book the timed-entry 30 min before sunset to catch both day and night views in one session. The Empire State is visible front and center.",
          estimatedCost: "~$44",
          bookingTip: "Book online, choose the sunset slot 30 min before golden hour — it sells out 2-3 days ahead.",
          transitFromPrev: "5 min walk",
        },
        {
          order: 6,
          time: "19:30",
          type: "meal",
          name: "Keens Steakhouse",
          area: "Midtown",
          address: "72 W 36th St",
          coords: [-73.9871, 40.7512],
          duration: "1.5 hours",
          description:
            "A 1885 chophouse where the ceiling is coated with 90,000 clay pipes from the Pipe Club. The mutton chop is famous but the bone-in prime rib is the real order. Sit in the Bull Moose Room.",
          estimatedCost: "~$80/person",
          bookingTip: "Book via OpenTable 1-2 weeks ahead for prime dinner time; same-day often has a 9pm slot.",
          transitFromPrev: "10 min walk",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Brooklyn day + Bridge at sunset",
      summary:
        "Take the train to DUMBO, walk Brooklyn's most photographed corners, eat pizza from the pizza argument, and cross the bridge back to Manhattan at golden hour.",
      stops: [
        {
          order: 1,
          time: "09:30",
          type: "transit",
          name: "A train to High St (DUMBO)",
          area: "DUMBO",
          coords: [-73.9896, 40.7025],
          duration: "25 min",
          description:
            "Take the A/C from Midtown to High St-Brooklyn Bridge. Exit and walk down the cobblestone slope to Washington Street — this is where the classic Manhattan Bridge framed by brick warehouses photo gets taken.",
          estimatedCost: "~$3",
          transitFromPrev: "5 min walk from hotel",
        },
        {
          order: 2,
          time: "10:00",
          type: "sight",
          name: "Washington Street + Manhattan Bridge view",
          area: "DUMBO",
          coords: [-73.9894, 40.7025],
          duration: "30 min",
          description:
            "Stand at the intersection of Washington and Water. The Manhattan Bridge frames the Empire State Building. This is the Brooklyn photo. Go early — tour groups arrive by 11.",
          estimatedCost: "Free",
          transitFromPrev: "Built in",
        },
        {
          order: 3,
          time: "11:00",
          type: "meal",
          name: "Juliana's Pizza",
          area: "DUMBO",
          address: "19 Old Fulton St",
          coords: [-73.9937, 40.7027],
          duration: "1 hour",
          description:
            "Patsy Grimaldi's original spot; he sold Grimaldi's next door then started Juliana's at 80. Order a classic Margherita and a white pie with clams. Cash only for some slices.",
          estimatedCost: "~$30 for two",
          bookingTip: "No reservations. Arrive by 11:15 to grab a table before the 12:00 rush.",
          transitFromPrev: "10 min walk",
        },
        {
          order: 4,
          time: "12:30",
          type: "rest",
          name: "Brooklyn Bridge Park & Jane's Carousel",
          area: "DUMBO",
          coords: [-73.9966, 40.7026],
          duration: "1.5 hours",
          description:
            "Walk west through the park — greenway, Jane's Carousel (1922, housed in a glass pavilion), and the view across to Manhattan. Take the Brooklyn Heights Promenade as the backend for a different angle.",
          estimatedCost: "~$3 if you ride the carousel",
          transitFromPrev: "10 min walk",
        },
        {
          order: 5,
          time: "15:30",
          type: "meal",
          name: "Time Out Market (food hall)",
          area: "DUMBO",
          coords: [-73.9899, 40.7010],
          duration: "1 hour",
          description:
            "21 curated Brooklyn restaurants under one roof. Rooftop seating with a Manhattan skyline view. Mid-afternoon snack while you wait for the sunset walk back.",
          estimatedCost: "~$25",
          transitFromPrev: "5 min walk",
        },
        {
          order: 6,
          time: "18:00",
          type: "activity",
          name: "Walk the Brooklyn Bridge (east → west)",
          area: "Brooklyn Bridge",
          coords: [-73.9969, 40.7061],
          duration: "45 min",
          description:
            "1.8 km across. Start on the Brooklyn side at the park, walk the pedestrian deck west into Manhattan as the sun drops behind the skyline. Stay on the south side (pedestrians one side, cyclists the other).",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk to the Brooklyn-side entrance",
        },
        {
          order: 7,
          time: "20:00",
          type: "meal",
          name: "Lombardi's Pizza (first licensed pizzeria in U.S.)",
          area: "Little Italy",
          address: "32 Spring St",
          coords: [-73.9955, 40.7216],
          duration: "1 hour",
          description:
            "1905 coal-fired pizzeria. Debate about whether it's still the best is endless; history is indisputable. Closes circle on the pizza day.",
          estimatedCost: "~$32 for two",
          transitFromPrev: "10 min walk from City Hall subway",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Lower Manhattan + Statue of Liberty",
      summary:
        "The 9/11 Memorial, the Liberty ferry, and an afternoon walking the High Line before a Broadway show.",
      stops: [
        {
          order: 1,
          time: "09:00",
          type: "sight",
          name: "9/11 Memorial & Museum",
          area: "Financial District",
          address: "180 Greenwich St",
          coords: [-74.0134, 40.7115],
          duration: "2.5 hours",
          description:
            "Two 1-acre reflecting pools set into the footprints of the Twin Towers, carved with every name. The museum below ground is overwhelming; budget mental energy for it. Exit through the Oculus transit hub — it's worth seeing.",
          estimatedCost: "~$29 museum, memorial plaza is free",
          bookingTip: "Book museum tickets 2-3 days ahead online; walk-ins often wait 1+ hours.",
          transitFromPrev: "E train from Lexington Ave → World Trade Center, 20 min",
        },
        {
          order: 2,
          time: "12:30",
          type: "meal",
          name: "Eataly Downtown",
          area: "Financial District",
          coords: [-74.0140, 40.7127],
          duration: "1 hour",
          description:
            "A faster, lighter lunch between the heavy morning and the ferry. The pasta counter and the pizza counter are both Roman-style and fast. Grab a glass of wine at the bar.",
          estimatedCost: "~$30",
          transitFromPrev: "5 min walk",
        },
        {
          order: 3,
          time: "14:00",
          type: "transit",
          name: "Statue Cruises ferry → Liberty Island",
          area: "Battery Park",
          coords: [-74.0175, 40.7033],
          duration: "2 hours",
          description:
            "Only Statue Cruises (the official concessionaire) docks at Liberty and Ellis. Tickets include both islands. Skip the crown — long wait for a small window. Pedestal access is enough.",
          estimatedCost: "~$24",
          bookingTip: "Book online 1 day ahead; walk-up sells out by 11:00 on summer weekends.",
          transitFromPrev: "15 min walk to ferry terminal",
        },
        {
          order: 4,
          time: "16:30",
          type: "sight",
          name: "The High Line (Gansevoort → 34th St)",
          area: "Chelsea / Meatpacking",
          coords: [-74.0075, 40.7400],
          duration: "1 hour",
          description:
            "A 2.3 km linear park on an old elevated freight rail. Walk north from Gansevoort St. At about 30th St there's the Vessel and the Hudson Yards Shed. Exit at 34th to catch the subway.",
          estimatedCost: "Free",
          transitFromPrev: "1 subway stop: 1 train from South Ferry → 14th St",
        },
        {
          order: 5,
          time: "18:00",
          type: "meal",
          name: "Joe Allen (pre-theater)",
          area: "Theater District",
          address: "326 W 46th St",
          coords: [-73.9885, 40.7594],
          duration: "1 hour",
          description:
            "A 1965 pre-theater classic — actors, crew, and audiences before shows. Posters on the wall are for famous flops. Order the meatloaf or the burger and you'll be out in an hour.",
          estimatedCost: "~$50/person",
          bookingTip: "Reserve for 18:00 sharp — they turn tables for 20:00 curtain.",
          transitFromPrev: "A train, 15 min",
        },
        {
          order: 6,
          time: "20:00",
          type: "activity",
          name: "Broadway show",
          area: "Theater District",
          coords: [-73.9857, 40.7587],
          duration: "2.5 hours",
          description:
            "A proper Broadway night. Check TodayTix or the TKTS booth in Times Square (opens 15:00) for same-day half-price tickets. Recent long-runners: Hamilton, The Lion King, Wicked, The Book of Mormon.",
          estimatedCost: "~$80-250/person depending on show + seat",
          bookingTip: "TKTS booth: go at 14:45 for 20:00 show to get the lineup before the queue. Or TodayTix app.",
          transitFromPrev: "5 min walk to the theater",
        },
      ],
    },
    {
      dayNumber: 4,
      theme: "Upper East Side + send-off",
      summary:
        "The Met, a Central Park reservoir walk, and one final perfect slice before the JFK train.",
      stops: [
        {
          order: 1,
          time: "09:30",
          type: "sight",
          name: "The Metropolitan Museum of Art",
          area: "Upper East Side",
          address: "1000 5th Ave",
          coords: [-73.9632, 40.7794],
          duration: "3 hours",
          description:
            "Three hours is barely enough. Focus: Egyptian wing (ground floor), European Paintings 1200-1800 (2nd floor, Rooms 611-644), American Wing courtyard. The Temple of Dendur is the one photo you'll take. Don't try to do every wing.",
          estimatedCost: "~$30 (suggested donation for NY residents; fixed for tourists)",
          bookingTip: "Skip the ticket queue by buying online. Arrive at 10:00 opening to have the Egyptian wing to yourself.",
          transitFromPrev: "6 train to 86th St + 10 min walk, 25 min from hotel",
        },
        {
          order: 2,
          time: "12:30",
          type: "rest",
          name: "Central Park Reservoir loop",
          area: "Upper East Side",
          coords: [-73.9627, 40.7857],
          duration: "45 min",
          description:
            "The 1.58-mile running loop made famous by Jackie O. Midtown skyline to the south, Upper West Side to the west. Clearest views on a sunny day.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
        },
        {
          order: 3,
          time: "13:30",
          type: "meal",
          name: "Joe's Pizza (Times Square)",
          area: "Midtown",
          address: "1435 Broadway",
          coords: [-73.9866, 40.7562],
          duration: "20 min",
          description:
            "A $3.50 plain slice on the go. The quintessential New York experience. Fold in half, eat while walking. Napkin for the grease.",
          estimatedCost: "~$4",
          transitFromPrev: "1 train from 86th → Times Sq, 15 min",
        },
        {
          order: 4,
          time: "14:30",
          type: "shopping",
          name: "Strand Bookstore",
          area: "Union Square",
          address: "828 Broadway",
          coords: [-73.9908, 40.7335],
          duration: "1 hour",
          description:
            "18 miles of books since 1927. The travel section on the second floor, the rare book room on the third. The kind of last-day stop that lets you bring home something better than a magnet.",
          estimatedCost: "~$25 average purchase",
          transitFromPrev: "N train, 10 min",
        },
        {
          order: 5,
          time: "16:30",
          type: "meal",
          name: "Magnolia Bakery (West Village original)",
          area: "West Village",
          coords: [-74.0058, 40.7359],
          duration: "30 min",
          description:
            "The banana pudding is the order, not the cupcake. A small cup is dinner-dessert perfection for the end of a trip.",
          estimatedCost: "~$8",
          transitFromPrev: "15 min walk",
        },
        {
          order: 6,
          time: "18:00",
          type: "transit",
          name: "Return to JFK via LIRR",
          area: "Grand Central → JFK",
          coords: [-73.7781, 40.6413],
          duration: "55 min",
          description:
            "Walk or take the 6 train back to Grand Central. LIRR to Jamaica, AirTrain to your JFK terminal. Budget 2 hours before international departure, 90 minutes for domestic.",
          estimatedCost: "~$15",
          transitFromPrev: "Subway to Grand Central, 10 min",
        },
      ],
    },
  ],
  packingTips: [
    "Comfortable walking shoes — expect 15,000+ steps per day",
    "A compact umbrella — NYC rain is sudden",
    "Light jacket for evenings even in summer (subway AC is arctic)",
    "Your own water bottle — NYC tap is clean and free refills everywhere",
  ],
  budgetEstimate: "~$200-300/day for a couple excluding hotel (NYC is expensive — this includes 2 sit-down meals + tickets)",
  generalTips: [
    "Get a 7-Day Unlimited MetroCard ($34) — breaks even at ~12 rides",
    "Uber/Lyft is often slower than the subway in Manhattan — traffic wins",
    "Street vendor hot dogs are fine; don't worry",
    "Tip 18-22% at sit-down. $1/drink at bars. $1 per bag for hotel.",
  ],
};

export default nyc4dCouple;
