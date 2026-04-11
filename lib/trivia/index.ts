/**
 * Travel trivia — used by the labor-illusion loading screen (P3) and the PDF
 * "Did you know?" callouts (P8). Hand-curated facts keyed by destination
 * country slug. Add more as the destinations expand.
 *
 * Slug format: lowercase country name, hyphenated. Match against
 * destinationCountry from the user input via `getTriviaForCountry()`.
 */

export const TRIVIA: Record<string, string[]> = {
  japan: [
    "Japan has more vending machines per capita than any country on Earth — about one for every 23 people.",
    "Tokyo's Shinjuku Station handles 3.6 million passengers per day, more than any station in the world.",
    "There are over 200 official ramen styles in Japan, each tied to a specific city or region.",
    "Japanese taxi doors open and close automatically — never grab the handle yourself.",
    "Japan has 6,852 islands, but only 430 are inhabited.",
    "The Japanese word 'forest bathing' (shinrin-yoku) is now a recognized form of preventive health care.",
    "There's an island in Japan (Aoshima) where cats outnumber humans 100 to 1.",
    "Nara's deer bow back when you bow to them — they've learned it from generations of tourists.",
    "Mount Fuji is climbable only for two months a year (July and August).",
    "Japan recycles about 84% of its aluminum cans — the highest rate in the world.",
  ],
  france: [
    "France is the most-visited country in the world, with about 90 million tourists per year.",
    "There are 1,200 different types of cheese made in France.",
    "The Louvre is the world's largest art museum — it would take 100 days to see every piece for 30 seconds.",
    "Paris has only one stop sign in the entire city. The rule is: priority to the right.",
    "France's TGV trains can run at over 320 km/h on regular service.",
    "The Eiffel Tower grows about 15 cm taller in summer due to thermal expansion.",
    "France produces over 1,500 different wines, more than any other country.",
    "The French eat about 30,000 tons of snails per year.",
    "Carcassonne, in southern France, is the inspiration for Disney's Sleeping Beauty Castle.",
    "France has the highest railway network density in Europe — almost every village has a station.",
  ],
  thailand: [
    "Thailand is the only Southeast Asian country never colonized by a European power.",
    "Bangkok's full ceremonial name is 169 letters long — the longest city name in the world.",
    "Thailand has over 35,000 Buddhist temples (wats).",
    "The Thai greeting 'wai' (palms together) has different heights depending on the recipient's seniority.",
    "Bangkok's Chinatown is one of the oldest and largest outside China itself.",
    "Thai food was named the world's favorite cuisine in a 2019 CNN poll.",
    "Thailand exports more rice than any other country — about 25% of global trade.",
    "The Phi Phi Islands were closed in 2018 to let coral recover from over-tourism.",
    "Thailand has 1,430 islands, most of them uninhabited.",
    "The Thai word for elephant, 'chang', is also the name of the country's most popular beer.",
  ],
  "south-korea": [
    "South Korea has the fastest average internet speed in the world.",
    "Seoul is one of the world's largest metropolitan areas, with 25 million people in the greater region.",
    "The Korean alphabet, Hangul, was invented in 1443 and is considered one of the most logical writing systems ever created.",
    "Korean BBQ restaurants traditionally have ventilation hoods built into every table.",
    "South Korea has 22 national parks covering 6.7% of the country.",
    "The DMZ between North and South Korea is the most heavily guarded border on Earth — yet it's an accidental wildlife sanctuary.",
    "Koreans eat more instant ramen per capita than anyone else (~75 packets per person per year).",
    "South Korea's high-speed KTX train connects Seoul to Busan in 2 hours and 15 minutes.",
    "Kimchi has 187 official varieties, recognized by UNESCO as cultural heritage.",
    "Seoul has more coffee shops per capita than New York or Tokyo.",
  ],
  "united-states": [
    "The US has the most national parks in the world — 63 in total.",
    "Alaska is bigger than Texas, California, and Montana combined.",
    "There are more public libraries in the US than McDonald's locations.",
    "Times Square in New York gets over 50 million visitors per year — more than the Eiffel Tower.",
    "The Library of Congress holds over 170 million items, making it the largest library in the world.",
    "California alone is the world's 5th-largest economy.",
    "The US Interstate Highway System is over 77,000 km long.",
    "Yellowstone was the world's first national park, established in 1872.",
    "The Smithsonian has 19 museums in Washington DC — all free to enter.",
  ],
  italy: [
    "Italy has more UNESCO World Heritage sites than any other country.",
    "Rome's Trevi Fountain collects about €3,000 in coins every day, donated to charity.",
    "Italy has more pasta shapes than any country — over 350 documented varieties.",
    "Venice is built on 118 small islands connected by 400 bridges.",
    "The Vatican is the world's smallest country, at 0.49 km².",
    "Italy produces about 600 million liters of olive oil per year — the world's second-largest producer.",
    "Florence's Duomo took 142 years to build.",
    "Italians invented eyeglasses in the 13th century.",
    "Pizza Margherita was created in 1889 to honor Queen Margherita — its colors match the Italian flag.",
  ],
  spain: [
    "Spain has the second-highest number of UNESCO World Heritage sites in the world (after Italy).",
    "Spaniards eat dinner around 9-10pm — among the latest in Europe.",
    "Spain has 8,000 km of coastline.",
    "La Sagrada Familia in Barcelona has been under construction since 1882 and isn't finished yet.",
    "Flamenco was added to UNESCO's intangible cultural heritage list in 2010.",
    "Spain produces about 50% of the world's olive oil.",
    "The Spanish language is the world's second most-spoken native language.",
    "Tomatoes, potatoes, and chocolate were brought to Europe through Spain.",
  ],
  "united-kingdom": [
    "The UK has more castles per square mile than any other country.",
    "The London Underground (the Tube) is the world's oldest underground railway, opened in 1863.",
    "Big Ben is technically the bell, not the tower (which is now called Elizabeth Tower).",
    "There are over 30,000 pubs in the UK.",
    "Cheddar cheese originated in the village of Cheddar, England, around the 12th century.",
    "The British Library holds over 170 million items and adds about 3 million new ones per year.",
    "Stonehenge predates the Egyptian pyramids by about 500 years.",
    "Britain invented the modern postal service, the postage stamp, and the post box (1840s).",
  ],
  germany: [
    "Germany has over 1,500 different beer brands.",
    "There are 25,000 castles in Germany.",
    "German is the most widely spoken native language in Europe.",
    "Berlin has more bridges than Venice (over 1,700).",
    "Germany invented the printing press, the car, the MP3 format, and aspirin.",
    "Octoberfest actually starts in mid-September.",
    "Germany has more zoos than any country in Europe (over 400).",
    "Munich's Hofbräuhaus opened in 1589 and still serves beer today.",
  ],
  vietnam: [
    "Vietnam is the world's second-largest exporter of coffee.",
    "Hanoi's Old Quarter is over 1,000 years old.",
    "Ha Long Bay has nearly 2,000 limestone islands and islets.",
    "Vietnam has the longest cave in the world (Son Doong) — large enough to hold a 40-story skyscraper.",
    "Pho was originally a breakfast food in northern Vietnam.",
    "Vietnam grows about 90% of the world's cashew nuts.",
    "There are over 50 million motorbikes in Vietnam — almost one per two people.",
  ],
};

/** Country aliases — map common destination country names to trivia keys. */
const COUNTRY_ALIASES: Record<string, string> = {
  japan: "japan",
  france: "france",
  thailand: "thailand",
  korea: "south-korea",
  "south korea": "south-korea",
  "republic of korea": "south-korea",
  usa: "united-states",
  "united states": "united-states",
  "united states of america": "united-states",
  america: "united-states",
  italy: "italy",
  spain: "spain",
  uk: "united-kingdom",
  "united kingdom": "united-kingdom",
  britain: "united-kingdom",
  england: "united-kingdom",
  germany: "germany",
  deutschland: "germany",
  vietnam: "vietnam",
};

/** Generic facts used when no country-specific trivia exists. */
const GENERIC_TRIVIA: string[] = [
  "There are around 195 countries in the world, depending on how you count them.",
  "About 1.4 billion international tourist trips happen every year.",
  "The most-visited city in the world is Bangkok, with over 22 million arrivals annually.",
  "The longest non-stop commercial flight is Singapore to New York — over 18 hours.",
  "About 100,000 commercial flights take off every day worldwide.",
  "The world's largest airport by area is King Fahd International in Saudi Arabia — bigger than Manhattan.",
  "Antarctica is the only continent without a permanent population.",
  "The world's smallest hotel (Eh'häusl in Germany) sleeps two people.",
];

/** Look up trivia for a destination country. Falls back to generic. */
export function getTriviaForCountry(country: string): string[] {
  const key = country.toLowerCase().trim();
  const slug = COUNTRY_ALIASES[key] ?? key;
  return TRIVIA[slug] ?? GENERIC_TRIVIA;
}

/** Pick N random distinct trivia entries for a country. */
export function pickTrivia(country: string, count: number): string[] {
  const pool = getTriviaForCountry(country);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}
