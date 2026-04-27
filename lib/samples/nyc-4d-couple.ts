import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: New York City, 4 days, couple, midrange.
 *
 * Covers the Manhattan-and-Brooklyn must-sees without forcing a grind —
 * museum mornings, walking afternoons, one Broadway night. Hand-curated;
 * coordinates are real, pinned to well-known landmarks. Text fields are
 * intentionally enriched beyond typical API output — samples are the
 * conversion surface.
 */
const nyc4dCouple: TripPlan = {
  destination: "New York City",
  destinationCountry: "United States",
  durationDays: 4,
  overview:
    "Four days for a couple who don't want to 'check off New York like a list.' One Manhattan icon a day, eat like a local, cross the Brooklyn Bridge at sunset, finish with a Broadway show. Hotel chosen in Midtown East — walking distance to Central Park and Grand Central, JFK accessible. The essence of New York isn't 'how much you saw' — it's the corner that hits you. These 4 days give you 3–4 of those moments.",
  bestSeasonNote:
    "Late April–early June or mid-September through late October are the sweet spots — mild weather, long daylight, manageable crowds. Spring cherry blossoms in Central Park bloom late April; fall foliage late October–early November turns the entire park gold. July humidity and February cold are the months to avoid. Christmas season (late November to early January) — the Rockefeller Center tree, the Bryant Park ice rink — is New York at its most festive, but also most crowded.",
  currencyTip:
    "Cards everywhere except some bodegas and dollar pizza slices. Tipping 18-22% at sit-down restaurants is non-negotiable — it's a real income, not a bonus. The 'Service charge included' line at the bottom of the receipt is rare. Apple Pay/Google Pay works on basically every subway and shop — you can leave the wallet, just bring the phone.",
  languageTip:
    "English, obviously. But know that New Yorkers value speed: order quickly, don't block the sidewalk, have your MetroCard ready at the turnstile. 'Excuse me' opens, 'Thank you' closes. Subway announcements are fast and accented — set your route on Google Maps so the phone listens for you. Locals in Central Park are extremely friendly — when you ask for directions, they stop and explain in detail.",
  emergencyNumber: "911 (all emergencies)",
  hotel: {
    name: "Pod 51 Hotel Midtown East",
    area: "Midtown East",
    address: "230 E 51st St, New York, NY 10022",
    coords: [-73.9695, 40.7561],
    rationale:
      "Midtown East puts you within walking distance of Central Park, Grand Central, and the best subway connections in the city, while being a quieter block than Times Square. Pod 51 has compact modern rooms and a rooftop for sunset. The E train to JFK is one block away. All rooms have private bathrooms (the Pod chain has dorm-style locations elsewhere — this one doesn't), Aesop toiletries, Marshall Bluetooth speakers. Best price-to-quality boutique in Midtown East.",
    priceTier: "$$",
    estimatedNightlyRate: "~$180/night",
  },
  airportTransit: {
    method: "AirTrain + LIRR from JFK → Grand Central",
    duration: "~55 minutes",
    cost: "~$15 one-way",
    instructions:
      "From JFK, follow AirTrain signs (free within the airport) → Jamaica Station. At Jamaica, buy an LIRR ticket to Grand Central (~$11 off-peak, ~$15 peak). From Grand Central, walk 8 min north to the hotel. Cheaper than Uber by half at rush hour. The AirTrain also connects to the E subway ($2.90) but it's 1 hour with two transfers. Black-suited 'private drivers' soliciting at the airport exit are unlicensed cabs — ignore and walk past.",
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
            "Enter at Grand Army Plaza (5th Ave & 59th). Walk north along The Pond, cross Gapstow Bridge (the bridge from the 'Valentine's Day' movie poster), continue to Sheep Meadow. The south end of the park has the most iconic views and fewest bikes. Get coffee from the Dante espresso bar at the Bethesda Terrace kiosk — Dante is the star Greenwich Village cocktail bar with a park outpost. On a weekend before 10am, you'll see locals walking dogs, jogging, pushing strollers — almost no tourists.",
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
            "Don't try to see everything. Go to the 5th floor first — Van Gogh's Starry Night, Picasso's Demoiselles d'Avignon, Dali's Persistence of Memory, Monet's Water Lilies, all in one room. Everything else is a bonus. Their 4th-floor postwar American collection (Pollock, Rothko, Warhol) is also world-class. The 3rd-floor design floor exhibits an iPhone prototype, an Eames chair, a Tom Ford bag as artworks — you'll rethink 'design is art.' Free MoMA app has audio guide in multiple languages.",
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
            "The pastrami on rye since 1888. You'll get a ticket at the door — hold onto it (lose it = $50 fine). Go to the cutter station, order pastrami on rye, and tip the cutter a dollar (he'll cut you thicker, prettier slices). One sandwich is enough for two; comes with sour pickles and coleslaw. This place has been a pilgrimage spot since the 'I'll have what she's having' scene from When Harry Met Sally — the table is still marked.",
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
            "Walk up the marble lion-flanked steps (Patience and Fortitude), then inside to the Rose Main Reading Room — a 91-meter cathedral ceiling over green-shaded lamps on wooden tables where people have done actual work for 100 years. Free to visit, anyone can sit and work. The 3rd-floor Rare Book Room occasionally exhibits the Gutenberg Bible (1455, the oldest movable-type print). On the way out, Bryant Park — outdoor cinema in summer, Bank of America Winter Village (free ice rink) in winter.",
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
            "Better than Empire State because you're IN the skyline, not looking at Midtown. Book the timed-entry 30 min before sunset to catch both day and night views in one session. The Empire State is visible front and center. The new 'Beam Experience' lets you sit on a suspended steel beam recreating the famous 1932 photo of workers eating lunch on a girder — $15 more than the standard ticket but worth it for the photo.",
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
            "A 1885 chophouse where the ceiling is coated with 90,000 clay pipes from the Pipe Club, each belonging to a member of the past 140 years (Roosevelt, Einstein among them). The mutton chop is the historic dish, but the bone-in prime rib is the real order. Sit in the Bull Moose Room — Theodore Roosevelt's old fixed booth, his elk photo on the wall. Single-malt whisky $15 a glass.",
          estimatedCost: "~$80/person",
          bookingTip: "Book via OpenTable 1-2 weeks ahead for prime dinner time; same-day often has a 9pm slot. Smart-casual.",
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
            "Take the A/C from Midtown to High St-Brooklyn Bridge. Exit and walk down the cobblestone slope to Washington Street — this is where the classic Manhattan Bridge framed by brick warehouses photo gets taken. Before 9am it's quiet; after 9am it's swamped with international tourists. DUMBO = 'Down Under the Manhattan Bridge Overpass,' formerly a sailor and dockworker district, now Brooklyn's most expensive condos.",
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
            "Stand at the intersection of Washington and Water. The Manhattan Bridge frames the Empire State Building. This is the Brooklyn photo. Go early — tour groups arrive by 11. Wear something light and clean (white tee, khakis, baseball cap) for the best photo. Almondine Bakery (French boulangerie) is across the street — buy a tuna sandwich + cappuccino ($15) to walk-and-eat along the waterfront.",
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
            "Patsy Grimaldi's original spot; he sold Grimaldi's next door to investors then started Juliana's at 80 with the family recipe. Order a classic Margherita and a white pie with clams (clams + garlic + olive oil + parsley, no tomato sauce) — the latter is Juliana's exclusive. Wood-fired crust crispy and chewy at once, with a glass of Italian red ($10). End on the homemade tiramisu by the Italian grandfather: yes.",
          estimatedCost: "~$30 for two",
          bookingTip: "No reservations. Arrive by 11:15 to grab a table before the 12:00 rush. Weekend wait runs 30 min+.",
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
            "Walk west through the park — greenway, Jane's Carousel (1922, housed in a glass pavilion), and the view across to Manhattan. Take the Brooklyn Heights Promenade as the back-end for a different angle — walking 20 min to mid-point, the Manhattan skyline + Statue of Liberty + Brooklyn Bridge all enter one frame, the ultimate New York postcard, used by Spike Lee in 'New York Stories.'",
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
            "21 curated Brooklyn restaurants under one roof. Rooftop seating with a Manhattan skyline view. Mid-afternoon snack while you wait for the sunset walk back. Pat LaFrieda filet sandwich ($18), Mr. Pao spicy chicken rice bowl ($15), Hannah's Bretzel German pretzel ($5). A Brooklyn craft beer (Brooklyn Lager $7), sit on the rooftop waiting for the bridge walk.",
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
            "1.8 km across. Start on the Brooklyn side at the park, walk the pedestrian deck west into Manhattan as the sun drops behind the skyline. Stay on the south side (pedestrians one side, cyclists the other). Mid-bridge wooden deck has hundreds of couple-locks (city cuts them off periodically). On a weekend dusk, street musicians play violin mid-bridge — pause hand in hand to listen, that's the 'New York moment.'",
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
            "1905 coal-fired pizzeria. Debate about whether it's still the best is endless; history is indisputable. Closes circle on the pizza day. Margherita classic + Soppressata Piccante (spicy Italian sausage). Mulberry Street, the Little Italy heart, hosts the September San Gennaro Festival — the whole street becomes an Italian festival with dancing, fireworks, even gambling tents.",
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
            "Two 1-acre reflecting pools set into the footprints of the Twin Towers, carved with every name. The museum below ground is overwhelming; budget mental energy for it. One section preserves the last steel structure of the Twin Towers, welds still visible; the 'Survivors' Stairs' shows how people escaped; the 'In Memoriam' wall holds every victim's photo across 300 meters. Exit through the Oculus transit hub — Calatrava-designed white wings, light pouring from above like a pterosaur skeleton, must-photograph.",
          estimatedCost: "~$29 museum, memorial plaza is free",
          bookingTip: "Book museum tickets 2-3 days ahead online; walk-ins often wait 1+ hours. Budget at least 2.5 hours, the emotion needs digestion.",
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
            "A faster, lighter lunch between the heavy morning and the ferry. The pasta counter and the pizza counter are both Roman-style and fast. At the standing bar, an Aperol Spritz ($10) + a prosciutto and gorgonzola plate ($15) — stand for 15 minutes and you're recharged for the ferry.",
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
            "Only Statue Cruises (the official concessionaire) docks at Liberty and Ellis. Tickets include both islands. Skip the crown — long wait for a small window. Pedestal access is enough — the view from the Statue's feet is incredible. Ellis Island was the 1892–1954 immigration inspection station — 17 million immigrants passed through. The museum lets you trace your ancestors (if you're European-American). This stop gives concrete meaning to 'the American Dream.'",
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
            "A 2.3 km linear park on an old elevated freight rail. Walk north from Gansevoort St — past Chelsea galleries, the Whitney Museum (Renzo Piano exterior), the Vessel and the Hudson Yards Shed at 30th. Exit at 34th to catch the subway. In autumn the wild grasses on either side go yellow, the Hudson sunset slants in from the west — the most walkable kilometer in New York.",
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
            "A 1965 pre-theater classic — actors, crew, and audiences before shows. Posters on the wall are for famous flops. Order the meatloaf or the burger and you'll be out in an hour. All servers are also actors; ask 'what have you been in' for surprising answers — your server might be tomorrow's Broadway star.",
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
            "A proper Broadway night. Check TodayTix or the TKTS booth in Times Square (opens 15:00) for same-day half-price tickets. Recent long-runners: Hamilton (hip-hop history of the U.S. founding), The Lion King (40+ years), Wicked, The Book of Mormon. Hamilton balcony seats at $100 will be 2 unforgettable hours.",
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
            "Three hours is barely enough. Focus: Egyptian wing (ground floor), European Paintings 1200-1800 (2nd floor, Rooms 611-644), American Wing courtyard. The Temple of Dendur is the one photo you'll take — a complete 2,000-year-old Egyptian temple transposed into one hall, light through the glass wall onto the stone = the museum's most beautiful moment. Don't try to do every wing. The Costume Institute Met Gala theme exhibit each May runs through the next May — you might catch a spectacular Lady Gaga gown.",
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
            "The 1.58-mile running loop made famous by Jackie O — she ran here nearly every day of her life. To the south, Midtown skyline; to the west, Upper West Side high-rises. On a clear day, you can simultaneously see Empire State, Chrysler Building, Rockefeller Center, and 1 World Trade Center in the distance. In early November the trees on the north end of the reservoir turn red — you're in the center, Manhattan at your back.",
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
            "A $3.50 plain slice on the go. The quintessential New York experience. Fold in half, eat while walking. Napkin for the grease. Joe's is the Greenwich Village original from 1975, and Spider-Man in the 2002 movie buys his pizza here before chasing the subway. The Times Square branch runs 11am–4am — the perfect last slice.",
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
            "18 miles of books since 1927. The travel section on the second floor, the rare book room on the third. The kind of last-day stop that lets you bring home something better than a magnet. Strand's own 'I'd rather be reading' canvas tote ($5) is the most recognizable New York-local gift. If you're a designer/writer, the typography section on the 2nd floor sometimes has out-of-print Japanese type design books at 80% less than Japan's prices.",
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
            "The banana pudding is the order, not the cupcake. A small cup is dinner-dessert perfection for the end of a trip. Magnolia became famous through 'Sex and the City' — but that was the cupcake; insiders order the pudding. The original West Village shop has been here since 1996, the verdigris copper sign at the corner. You sit on the bench outside, the wind off Bleecker Street carrying you, the perfect 'goodbye' moment to New York.",
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
            "Walk or take the 6 train back to Grand Central. LIRR to Jamaica, AirTrain to your JFK terminal. Budget 2 hours before international departure, 90 minutes for domestic. The LIRR passes through Queens — out the window is the 'Unisphere' globe sculpture left from the 1964 World's Fair. One last glance of the Manhattan skyline in the final seconds before the subway exits.",
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
    "Small dollar bills ($1, $5) for tips (coffee, bar, hotel) and yes, for taxis",
    "Portable battery — Google Maps + Uber drain phone fast",
  ],
  budgetEstimate: "~$200-300/day for a couple excluding hotel (NYC is expensive — this includes 2 sit-down meals + tickets)",
  generalTips: [
    "Get a 7-Day Unlimited MetroCard ($34) — breaks even at ~12 rides",
    "Uber/Lyft is often slower than the subway in Manhattan — traffic wins",
    "Street vendor hot dogs are fine; don't worry",
    "Tip 18-22% at sit-down. $1/drink at bars. $1 per bag for hotel. Taxi 15-20%.",
    "Download Citymapper — more accurate than Google Maps for NYC transit",
    "Sunset at the south end of Central Park is the most romantic free spot — beats any museum",
  ],
};

export default nyc4dCouple;
