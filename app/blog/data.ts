export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  /** Optional hero image used as og:image on the post's detail page. */
  heroImage?: string;
}

// Unsplash photo URL builder — same pattern as lib/samples/index.ts.
// Hand-picked, vibrant daylight photos; never moody/grey.
const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const BLOG_POSTS: Record<string, BlogPost> = {
  "3-days-paris-with-kids": {
    title: "3 Days in Paris with Kids: A Practical Itinerary That Actually Works",
    date: "2026-06-01",
    category: "Destination Guides",
    excerpt:
      "Paris with children is genuinely doable — if you stop trying to do everything. Here's an honest three-day plan built around how kids actually behave, including what to expect on the Bateaux Mouches and how to survive the Louvre.",
    content: `
<p>Paris has a reputation for being difficult with kids, and honestly, some of that reputation is earned. The cobblestones eat strollers, the museums are enormous, and a toddler standing in a two-hour queue for the Eiffel Tower is nobody's idea of a vacation. But three days, planned well, can be quietly wonderful. The city rewards people who slow down — and kids force you to slow down.</p>

<p>This itinerary is built around one rule: pick fewer things and actually enjoy them.</p>

<h2>Day 1 — Trocadéro, the Seine, and Your First Real Meal</h2>

<p>Skip the Eiffel Tower queue on day one. Instead, walk to the Trocadéro esplanade across the river. It's free, there's no line, and you get the photograph everyone wants. Kids can run around on the wide plaza while you decompress from travel. Save the tower itself for the evening on day two or three if you want — the lit-up version is worth it — but it doesn't need to anchor your whole first day.</p>

<p>In the afternoon, take the Seine river cruise. The main operator, Bateaux Mouches, departs from Pont de l'Alma (Alma-Marceau metro, line 9). The standard sightseeing cruise runs about 70 minutes and covers Notre-Dame, the Louvre, the Orsay, and both riverbanks. Adults pay around €15, children under 12 around €6. Sitting on the upper open-air deck is the right call in decent weather; kids stay engaged watching the city go past in a way they rarely do in a museum.</p>

<p>A few honest notes on Bateaux Mouches: it is the most tourist-heavy of the Seine cruise operators — large boats, recorded commentary in eight languages, gift shop on the dock. If that bothers you, Vedettes du Pont Neuf (departing from Île de la Cité, a smaller boat) has a quieter feel. But for families, the size of the Bateaux Mouches fleet actually helps: more departures, easier to find seats, better bathroom access. Skip the evening dinner cruise with young kids — it starts late, costs significantly more, and the dress code expectation is stressful when you're already managing tired children.</p>

<p>For dinner, head toward the Marais. Rue des Rosiers has good falafel (L'As du Fallafel, if the queue isn't too long), and the streets are interesting enough to walk off dinner before bed.</p>

<h2>Day 2 — The Louvre, Done Right</h2>

<p>Go early. The Louvre opens at 9am and the first hour is noticeably calmer. Book tickets online the night before — the queues at the pyramid entrance on a summer day are brutal, and the online lane bypasses most of them.</p>

<p>With kids, two to three hours is the ceiling. Pick a route and stick to it: the Egyptian antiquities wing (genuinely exciting for children — mummies, giant statues, hieroglyphs), the medieval moat visible through the basement-level glass floor, and the Mona Lisa if you want it, though the crowd around it is dense and the painting smaller than expected. Don't try to do the whole museum. The Louvre is essentially a small city — treating it as one is how families end up exhausted and resentful by noon.</p>

<p>Afternoon: walk to the Jardin du Luxembourg. The Marionnettes du Luxembourg puppet theatre runs weekend afternoon shows (check the schedule; it's cheap and surreally French). The pond in the center has wooden sailboats to rent — children push them with a stick, which is a low-tech pleasure that hasn't changed in about a century. There's a good playground near the south end of the garden.</p>

<p>Dinner on Rue Mouffetard, a market street with cheap crêpe stands and bistros that don't mind children. It's tourist-adjacent but not exhausting about it.</p>

<h2>Day 3 — Montmartre Before the Crowds</h2>

<p>Get to Montmartre early. By 10am the hill is filling with tour groups; by noon the main square around the artists is genuinely hard to move through. At 8:30 or 9am, it's calm and the views from the steps of Sacré-Cœur are unobstructed. The basilica itself is free and relatively quick — twenty minutes is enough for most kids.</p>

<p>Take the funicular up (one metro ticket each direction — it runs on the same system) and walk down. The walk down through the residential back streets is more interesting than the tourist-facing main path. Stop at a boulangerie for breakfast on the hill; pain au chocolat purchased from an actual Montmartre bakery is one of those things children will remember.</p>

<p>If you're flying home that day, head to your airport by early afternoon — Charles de Gaulle's RER B connection from the city center takes about 45 minutes but the line runs infrequently and security queues are unpredictable. Don't cut it close.</p>

<h2>A Few Practical Notes</h2>

<ul>
  <li><strong>Museum entry:</strong> French national museums (Louvre, Orsay, Rodin) are free for all visitors under 18. Bring a passport or ID for the kids.</li>
  <li><strong>Transport:</strong> A Paris Visite pass covering zones 1–3 covers all metro, RER, and bus within central Paris. Buy it at any metro station or the airport.</li>
  <li><strong>Strollers:</strong> Fine on main boulevards, difficult on cobblestone side streets in Montmartre and Le Marais. A lightweight umbrella stroller survives better than a large frame.</li>
  <li><strong>Timing:</strong> July and August are the busiest months by a significant margin. Late April, May, or September offers cooler weather, shorter queues, and the same open restaurants and attractions.</li>
</ul>

<p>If you want a structured day-by-day plan tailored to your kids' specific ages, <a href="/">gliddy</a> builds personalized itineraries that account for things like nap schedules, walking distance, and whether your eight-year-old is actually interested in Impressionism. Three days in Paris is enough time to feel like you've been somewhere, if you're not trying to prove you've been everywhere.</p>
`,
  },

  "tokyo-itinerary-how-many-days": {
    title: "Tokyo Itinerary: How Many Days Do You Really Need?",
    date: "2026-05-01",
    category: "Destination Guides",
    excerpt:
      "The honest answer to 'how long should I stay in Tokyo' — broken down by traveler type, side-trip plans, and the trade-offs you'll actually feel on the ground.",
    heroImage: UNSPLASH("photo-1542051841857-5f90071e7989"),
    content: `
<p>If you've ever opened a planning doc for Tokyo, you already know the trap: every guide tells you a different number. Three days. Five days. Ten days. The truth is more boring and more useful — the right answer depends on three things: <strong>what kind of traveler you are, whether you're side-tripping</strong>, and <strong>how much downtime you actually want</strong>.</p>

<p>Here's the framework we use when we build personalized Tokyo plans — and what each duration actually buys you.</p>

<h2>3 days in Tokyo: a teaser, not a trip</h2>

<p>Three days is enough to see Tokyo's greatest hits and walk away thinking "I need to come back." That's it. You'll get Shibuya, Asakusa, one good dinner in Shinjuku, maybe a half-day in Harajuku. You'll <em>not</em> get a sense of how Tokyo's neighborhoods differ, you'll miss Yokohama and Kamakura entirely, and you'll be running.</p>

<p>Recommend 3 days only if Tokyo is a stopover on a longer Japan trip and you're going to Kyoto / Osaka next. As a standalone, it's a frustrating tease.</p>

<h2>4 days in Tokyo: the sweet spot for most couples</h2>

<p>Four days is what we recommend most often. You get the iconic Tokyo experience (Shibuya, Meiji Shrine, Senso-ji, Tsukiji) plus one full side-trip day — usually <strong>Kamakura</strong> for the Great Buddha and beach, or <strong>Nikko</strong> if you want mountain shrines.</p>

<p>The key thing four days unlocks is <em>texture</em>. You stop counting attractions and start noticing the city — that the Yamanote line is faster than walking, that 7-Eleven egg sandwiches are genuinely good, that the area around your hotel has its own pulse at 10pm.</p>

<p>For couples, four days is also when "let's just sit at this kissaten coffee shop for an hour" becomes possible without guilt. That's the part of Tokyo most short trips miss.</p>

<p>If you want a concrete template, our <a href="/samples/tokyo-4d-couple">Tokyo 4-day couple sample plan</a> shows the full structure: hotel pick matched to Narita transit, day-by-day stops with realistic transit times, and one Kamakura sunset day.</p>

<h2>5–6 days: when to splurge on time</h2>

<p>Add a fifth day if any of these is true:</p>
<ul>
  <li>You're a foodie. Tokyo has more Michelin stars than Paris — five days lets you actually book two of them.</li>
  <li>You want a <strong>Hakone</strong> overnight (hot spring ryokan + Mt. Fuji view). This eats two days but pays back in memory.</li>
  <li>You're traveling with kids. Park-style activities (DisneySea, TeamLab, Ueno Zoo) burn time fast.</li>
  <li>You like cities. Five days is when Tokyo stops feeling like a checklist.</li>
</ul>

<p>Six days only if you're a serious city person or you're building in a recovery day. Past six, your time/money ratio drops — at that point you should be adding Kyoto, not more Tokyo.</p>

<h2>7+ days: Tokyo plus a side region</h2>

<p>If you have a week or more, don't spend it all in Tokyo. The classic structure is <strong>4 days Tokyo + 3 days Kyoto/Osaka</strong>, which gives you both megacity and historic Japan. Some travelers do 5 + 2 instead, leaning into Tokyo, but most regret not seeing Kyoto.</p>

<p>The other strong 7-day option is <strong>Tokyo + Hakone + Kyoto</strong>: 3 nights Tokyo, 1 night ryokan, 3 nights Kyoto. That's our favorite first-Japan-trip shape.</p>

<h2>The honest checklist</h2>

<p>Before you book, answer these:</p>
<ol>
  <li><strong>Is this your only stop in Japan?</strong> If yes, 5+ days. If no, 3–4 is fine.</li>
  <li><strong>Are you a city person or a nature person?</strong> Tokyo rewards city people. Nature people should plan a 1-day Nikko or Hakone escape inside any 4+ day trip.</li>
  <li><strong>How much downtime do you need?</strong> Tokyo is denser than most travelers expect. Add one buffer day per four days of "doing things."</li>
</ol>

<p>If you'd rather not figure all this out alone, that's literally what we built <a href="/">gliddy</a> for — tell us your dates and a few preferences and we'll send back a day-by-day Tokyo plan with hotel pick, transit, restaurants, and a route map. Takes a couple minutes.</p>

<h2>Related reading</h2>
<ul>
  <li><a href="/samples/tokyo-4d-couple">See a real 4-day Tokyo plan →</a></li>
  <li><a href="/blog/seoul-food-guide-3-days">Seoul food guide (if Japan + Korea is on the table)</a></li>
  <li><a href="/blog/ai-trip-planners-vs-generic-itineraries">AI trip planners vs generic itineraries</a></li>
</ul>
`,
  },

  "bangkok-solo-travel-guide": {
    title: "Bangkok Solo Travel Guide for First-Timers (2026)",
    date: "2026-05-06",
    category: "Destination Guides",
    excerpt:
      "A realistic 4-day Bangkok solo plan: where to stay, how to eat street food without getting sick, which temples are worth it, and the day trip nobody regrets.",
    heroImage: UNSPLASH("photo-1508009603885-50cf7c579365"),
    content: `
<p>Bangkok is the easiest first solo trip in Asia. The food is incredible, the transit works, English signage is everywhere on the main routes, and your money goes further than almost anywhere else. The trap most first-timers fall into isn't safety or culture shock — it's <strong>doing too much</strong>. Four days of nonstop temples will exhaust you faster than the heat.</p>

<p>Here's how to plan a Bangkok solo trip that you'll actually enjoy.</p>

<h2>How many days for a first-timer solo</h2>

<p>Four days is the sweet spot. Three feels rushed (you'll skip the side trip and regret it). Five is fine but the marginal day usually gets spent shopping or repeating things you already did. Our <a href="/samples/bangkok-4d-solo">Bangkok 4-day solo sample</a> walks through the structure we recommend.</p>

<h2>Where to stay solo</h2>

<p>The two solid neighborhoods for solo travelers:</p>

<ul>
  <li><strong>Sukhumvit (around Asok / Phrom Phong BTS):</strong> safe, modern, walkable, hotels start around $30/night for solid mid-range. Easy access to the BTS Skytrain and MRT. Best for first-timers.</li>
  <li><strong>Silom / Sathorn:</strong> business district by day, lively at night, slightly more upscale. Better if you want quieter mornings.</li>
</ul>

<p>Avoid Khao San Road unless you specifically want backpacker chaos. It's loud, scammy, and a long taxi from most attractions.</p>

<h2>Street food: how not to get sick</h2>

<p>Bangkok street food is some of the best in the world. The rule that keeps you healthy is simple: <strong>eat where there's a line of locals</strong>. Stalls with high turnover are safer than half-empty ones because the food hasn't been sitting. Other rules:</p>

<ul>
  <li>Watch the food being cooked — if it's hot off the wok or grill, it's almost always fine.</li>
  <li>Skip raw vegetables and pre-cut fruit at stalls. Stick to peeled fruit (mango, pineapple) you watch them cut.</li>
  <li>Bottled water only. Ice is generally fine in Bangkok proper — it's machine-made — but if you're sensitive, ask for "mai sai nam keng" (no ice).</li>
</ul>

<p>If you only eat one thing, make it <strong>boat noodles</strong>. If you eat two, add <strong>khao soi</strong> (technically northern but available citywide).</p>

<h2>The temple plan: less is more</h2>

<p>There are 400+ temples in Bangkok. Most first-timers do three:</p>

<ol>
  <li><strong>Wat Pho</strong> — the Reclining Buddha. Worth it. Go early (8am).</li>
  <li><strong>Wat Arun</strong> — the riverside porcelain temple. Best at golden hour from across the river.</li>
  <li><strong>Wat Phra Kaew + Grand Palace</strong> — the spectacle. Dress code is strict (covered shoulders and knees). Crowded, but iconic.</li>
</ol>

<p>Do all three in one day, in that order — they're geographically close. Leave the next day for something completely different.</p>

<h2>The Ayutthaya day trip nobody regrets</h2>

<p>If you do one side trip, make it <strong>Ayutthaya</strong>. It's the old Siamese capital, ruins everywhere, an hour and a half north by train ($2 each way). Rent a bike at the station and circle the ruins for a few hours. The contrast against modern Bangkok is the point.</p>

<p>Skip the floating market day trips unless you actively love crowds. Damnoen Saduak in particular has become more theme park than market.</p>

<h2>Solo safety realities</h2>

<p>Bangkok is safer than most Western cities for solo travelers. The actual risks are:</p>

<ul>
  <li><strong>Tuk-tuk scams</strong> — drivers who say a temple is "closed" and steer you to gem shops. Use Grab (the Southeast Asian Uber) or the BTS instead. Always.</li>
  <li><strong>Pickpocketing on crowded transit</strong> — keep your phone in a front pocket on the BTS.</li>
  <li><strong>Heat exhaustion</strong> — the real one. Carry water, take afternoon breaks in air-conditioned malls (Siam Paragon, EmQuartier — both are attractions in themselves).</li>
</ul>

<h2>The 4-day shape we recommend</h2>

<p>Day 1: Arrival, light walk around your neighborhood, evening Skytrain ride + a rooftop bar.<br>
Day 2: The three temples (Wat Pho, Wat Arun, Grand Palace), evening street food crawl.<br>
Day 3: Ayutthaya day trip.<br>
Day 4: Morning Chatuchak Market (Saturday/Sunday only — otherwise swap a Thai cooking class), afternoon spa, evening departure.</p>

<p>If you'd rather get this as a real day-by-day plan with hotel pick, restaurant recommendations, and a route map, that's what we build at <a href="/">gliddy</a>. Or copy the structure from our <a href="/samples/bangkok-4d-solo">Bangkok 4-day solo sample</a>.</p>

<h2>Related reading</h2>
<ul>
  <li><a href="/samples/bangkok-4d-solo">See the full Bangkok 4-day solo plan →</a></li>
  <li><a href="/samples/hanoi-4d-solo">Hanoi solo (if you're adding Vietnam)</a></li>
  <li><a href="/blog/ai-trip-planners-vs-generic-itineraries">AI trip planners vs generic itineraries</a></li>
</ul>
`,
  },

  "paris-with-kids-3-day-itinerary": {
    title: "Paris with Kids: A Realistic 3-Day Itinerary for Families",
    date: "2026-05-11",
    category: "Family Travel",
    excerpt:
      "Paris with kids works if you stop trying to do adult Paris with kids attached. Here's a 3-day plan that's actually fun for everyone — including one full Disneyland day.",
    heroImage: UNSPLASH("photo-1499856871958-5b9627545d1a"),
    content: `
<p>The mistake most families make in Paris isn't picking the wrong sights. It's picking <em>adult Paris</em> and then dragging kids through it. A 3-hour Louvre walk through ancient sculpture is not a kid activity. Pretending otherwise is how you end up with a meltdown in the Denon Wing at noon.</p>

<p>The Paris-with-kids plan that actually works has three principles: <strong>one big thing per day, one kid-led activity per day, and Disney gets its own day if you're doing it</strong>. Here's the shape.</p>

<h2>Where to stay with kids</h2>

<p>Pick a neighborhood with a park within a 5-minute walk. We recommend:</p>

<ul>
  <li><strong>Le Marais (3rd / 4th)</strong> — central, walkable, Place des Vosges park, kid-friendly restaurants on quiet side streets.</li>
  <li><strong>Saint-Germain (6th)</strong> — Luxembourg Gardens at your doorstep, classic Paris, mid-range hotels around €180/night.</li>
  <li><strong>Near Trocadéro (16th)</strong> — Eiffel Tower view, big park, calmer streets.</li>
</ul>

<p>Avoid the Champs-Élysées area with small kids — it's too commercial, too crowded, and the Metro stops are a haul.</p>

<h2>Day 1: Eiffel Tower + a real park afternoon</h2>

<p>Start with the obvious. Eiffel Tower in the morning — book tickets online, go up the lift to the second floor (the top is optional and the line is long). Take the photo at Trocadéro before, croissants after.</p>

<p>Then walk to Champ de Mars, the park behind the tower. Let the kids run for an hour. This is the trip's first lesson — <strong>parks are infrastructure, not breaks</strong>. Build them in.</p>

<p>Late lunch at a brasserie near the tower (Café Constant is reliable and kid-tolerant). Afternoon: Seine river cruise — yes the touristy one. Kids love boats; you get to sit for 90 minutes.</p>

<h2>Day 2: The Louvre (but only for 90 minutes) + Tuileries + a treat</h2>

<p>Here's the Louvre rule: <strong>see three things, then leave</strong>. Mona Lisa, Winged Victory, one Egyptian gallery. Done in 90 minutes. Anything longer breaks kids and adults.</p>

<p>Out into the Tuileries Garden afterward. There's an old-fashioned carousel and pony rides in summer. Get the kids one éclair from Pierre Hermé.</p>

<p>Afternoon: Jardin du Luxembourg. Toy sailboats on the pond is the iconic Parisian-kid activity (you rent them by the half-hour at the boat rental hut). Spend two hours. Don't plan anything else.</p>

<p>Evening: dinner near your hotel, early bedtime — tomorrow is Disney.</p>

<h2>Day 3: Disneyland Paris (the full day)</h2>

<p>Disneyland Paris is 45 minutes from central Paris by RER A train. If you have Disney-aged kids, give it the whole day. Buy tickets in advance, leave the hotel by 8:30am, plan to stay until park close (you'll catch the fireworks).</p>

<p>The two-park option (Disneyland + Walt Disney Studios) only makes sense if you're staying overnight at a Disney hotel. For a day trip, pick one — Disneyland Park has the castle and the classics; Walt Disney Studios has more thrill rides for older kids.</p>

<p>If your kids are too young for Disney (under 4) or too old (teens who eye-roll), swap this day for the <strong>Cité des Sciences</strong> (interactive science museum, the Géode IMAX, planetarium) — kid-paradise in northeast Paris.</p>

<p>Our <a href="/samples/paris-3d-family">Paris 3-day family sample plan</a> walks through the full version of this with hotel pick, transit times, and restaurant picks.</p>

<h2>What we'd skip with kids</h2>

<ul>
  <li><strong>Versailles</strong> — gorgeous but a full day, mostly walking, low kid payoff unless they specifically love castles.</li>
  <li><strong>Musée d'Orsay / Pompidou</strong> — adult museums, skip unless you have art-curious kids.</li>
  <li><strong>Long lunches</strong> — Parisian lunches run 90+ minutes by default. Pick brasseries (faster) over bistros, or pack picnic lunches for park days.</li>
</ul>

<h2>The honest expectations</h2>

<p>Paris with kids is not Paris-but-smaller. It's a different trip. You'll see fewer monuments. You'll eat at fewer "destination" restaurants. You'll spend more time in parks and less in museums.</p>

<p>That's not a downgrade — it's the point. You're showing your kids the city, not racing through a checklist. The Eiffel Tower at golden hour with two tired, happy kids eating ice cream is a better memory than five extra museums.</p>

<p>If you want a personalized version of this plan with your kids' ages, your specific arrival airport, and your dates, <a href="/">gliddy</a> builds those automatically — takes a couple minutes.</p>

<h2>Related reading</h2>
<ul>
  <li><a href="/samples/paris-3d-family">See the full Paris 3-day family plan →</a></li>
  <li><a href="/samples/london-4d-couple">London 4-day (if you're adding UK)</a></li>
  <li><a href="/blog/tokyo-itinerary-how-many-days">Tokyo itinerary: how many days do you need?</a></li>
</ul>
`,
  },

  "seoul-food-guide-3-days": {
    title: "Seoul Food Guide: What to Eat in 3 Days",
    date: "2026-05-16",
    category: "Destination Guides",
    excerpt:
      "Three days of Seoul eating, mapped properly — from Gwangjang Market breakfast to dry-aged hanwoo dinner to Han River fried chicken at midnight.",
    heroImage: UNSPLASH("photo-1517154421773-0529f29ea451"),
    content: `
<p>Seoul has the deepest food culture of any city we plan trips for. It's also the easiest to get wrong, because every blog post serves the same five dishes — bibimbap, bulgogi, kimchi, soju, fried chicken — and treats them like a checklist. Real Seoul eating is about <strong>where and when</strong>, not just what.</p>

<p>Here's a 3-day eating plan that ladders from market food to dry-aged hanwoo to Han River chicken, with the kind of structure that actually fits in a trip instead of being a list.</p>

<h2>Day 1: Markets and BBQ</h2>

<h3>Breakfast: Gwangjang Market (광장시장)</h3>

<p>Get to Gwangjang Market by 9am, before the tour buses. Sit at a <strong>bindaetteok</strong> (mung bean pancake) stall — the one with the loudest aunties is the right one. Order one bindaetteok and one bowl of <strong>kalguksu</strong> (knife-cut noodle soup). Wash it down with makgeolli if you're brave, barley tea if not. This is the canonical Seoul market breakfast.</p>

<p>Don't try to eat everything at the market. Walk through, see it, leave hungry. There's better food coming.</p>

<h3>Lunch: bibimbap, done properly</h3>

<p>Skip tourist bibimbap. Go to a place that serves <strong>dolsot bibimbap</strong> — the version in a hot stone bowl that crisps the rice at the bottom. You want that crust (<em>nurungji</em>). Mix everything together aggressively before eating. Most tourists don't mix enough.</p>

<h3>Dinner: Korean BBQ in Mapo</h3>

<p>Mapo neighborhood is BBQ central. Look for places grilling over actual charcoal, not gas — the smoke ring on the meat is the tell. Order <strong>samgyeopsal</strong> (pork belly) if it's your first time; <strong>woosamgyeop</strong> (thin-sliced beef brisket) if you've done samgyeopsal before. Cold beer or soju.</p>

<p>The Korean BBQ rule first-timers miss: <strong>let the staff cook for you</strong>. They will. You're not supposed to be cooking your own meat — they'll tell you when to flip and when to eat.</p>

<h2>Day 2: Markets, dry-aged hanwoo, late-night</h2>

<h3>Breakfast: Tongin Market or a Mandu shop</h3>

<p>Tongin Market does a dosirak (lunchbox) experience where you swap coins for stalls' offerings. Touristy but fun. Alternative: any 24-hour <strong>mandu</strong> (Korean dumpling) shop near your hotel. Steamed mandu + mandu-guk (dumpling soup) is the locals' breakfast.</p>

<h3>Lunch: cold noodles or a heavy stew</h3>

<p>Two paths, depending on weather. Hot day: <strong>naengmyeon</strong> (cold buckwheat noodles in icy broth) — Pyongyang Myeonok if you're near Euljiro, Ojang-dong if you want Hamheung-style with raw fish. Cold day: <strong>sundubu jjigae</strong> (silken tofu stew) or <strong>gamjatang</strong> (pork bone potato stew).</p>

<h3>Dinner: dry-aged hanwoo (this is the splurge)</h3>

<p>If you're going to splurge once in Seoul, do it on <strong>dry-aged hanwoo</strong>. Hanwoo is Korean native beef — equivalent to Wagyu in marbling, less famous internationally. Dry-aging concentrates the flavor. Restaurants like Born &amp; Bred or Seokparang serve it properly. Expect $80-150 per person, but this is one of the great steaks in the world.</p>

<p>Our <a href="/samples/seoul-3d-foodie">Seoul 3-day foodie sample plan</a> walks through where to do this with hotel and transit context.</p>

<h2>Day 3: Street food, fried chicken, and goodbye</h2>

<h3>Breakfast: Hotteok or Toast</h3>

<p>Either a street stall <strong>hotteok</strong> (sweet brown-sugar pancake) or a <strong>Korean-style toast</strong> from a chain like Egg Drop or Issac Toast. Both are quintessentially Seoul.</p>

<h3>Lunch: Myeongdong street food crawl</h3>

<p>Myeongdong is the touristy food street, and that's fine — go for the variety, not authenticity. Grab a <strong>tteokbokki</strong> (spicy rice cake), <strong>gyeran-ppang</strong> (egg bread), and <strong>fish-shaped bungeoppang</strong> with red bean. Walking food, low commitment.</p>

<h3>Afternoon snack: bingsu</h3>

<p>Korean shaved ice. Sulbing is the dominant chain and they do it well. Get the <strong>injeolmi</strong> (rice cake + roasted soy powder) version — it's the most Korean-tasting option and nothing in your home country tastes like it.</p>

<h3>Dinner: chimaek by the Han River</h3>

<p>The trip's final meal: <strong>chimaek</strong> (chicken + beer). Korean fried chicken at Yeouido Han River Park, sitting on the grass, watching the bridge fountain show at 9pm. Order delivery to the park — yes, that's a thing, the apps work in English, the chicken arrives in 20 minutes hot. This is Seoul.</p>

<h2>The honest takeaway</h2>

<p>Three days lets you taste the city. You won't get the regional cuisines (Jeolla province seafood, Andong specialties, Jeju seafood). You'll miss the temple food and the modern fine dining scene. That's fine — those are reasons to come back.</p>

<p>If you'd like this as a full personalized 3-day plan with hotel pick, restaurant addresses, and route map, <a href="/">gliddy</a> builds those in a couple minutes. Or copy the structure from our <a href="/samples/seoul-3d-foodie">Seoul 3-day foodie plan</a>.</p>

<h2>Related reading</h2>
<ul>
  <li><a href="/samples/seoul-3d-foodie">See the full Seoul 3-day foodie plan →</a></li>
  <li><a href="/samples/tokyo-4d-couple">Tokyo 4-day plan (if you're adding Japan)</a></li>
  <li><a href="/blog/tokyo-itinerary-how-many-days">Tokyo itinerary: how many days do you need?</a></li>
</ul>
`,
  },

  "ai-trip-planners-vs-generic-itineraries": {
    title: "AI Trip Planners vs Generic Itineraries: What Actually Changes",
    date: "2026-05-20",
    category: "Trip Planning",
    excerpt:
      "Why a generic 'best of Tokyo' itinerary fails almost everyone — and what an AI-built plan does differently. Side-by-side examples of where personalization matters.",
    heroImage: UNSPLASH("photo-1542051841857-5f90071e7989"),
    content: `
<p>Search "Tokyo 4 day itinerary" and you'll get 50 nearly identical pages. Same temples, same neighborhoods, same restaurants. They're not wrong — but they're not yours either. A first-time solo traveler arriving from JFK and a family of four with two kids flying into Haneda need <em>different plans</em>, not the same plan with a kid disclaimer.</p>

<p>That's the gap AI trip planners fill. Here's what actually changes when a plan is built around <strong>you</strong> instead of a generic template.</p>

<h2>What generic itineraries get wrong</h2>

<p>Most published itineraries are written for one imagined traveler — usually a 30-something couple on a midrange budget. If you fit that mold, you're fine. If you don't, you have to mentally translate every recommendation:</p>

<ul>
  <li><strong>Hotel picks</strong> are usually centered on the city's tourist core. If you're flying into a different airport or planning a side trip, that's the wrong base.</li>
  <li><strong>Day order</strong> doesn't account for which day you arrive jet-lagged. Generic plans put the must-see big thing on Day 1 — exactly when you're worst at appreciating it.</li>
  <li><strong>Restaurants</strong> are written for general taste. Foodies want different recs from picky eaters; vegetarians need a different plan entirely.</li>
  <li><strong>Pacing</strong> assumes you have the same stamina as the writer. Families and seniors need built-in rest, but generic plans don't differentiate.</li>
</ul>

<h2>What AI trip planning actually changes</h2>

<p>The point of an AI-built plan isn't novelty — it's <strong>personalization at a granularity that human travel writers can't economically deliver</strong>. A travel writer can't write 100 versions of "Tokyo 4 days." An AI can write yours.</p>

<p>Things that get personalized:</p>

<ol>
  <li><strong>Airport-aware hotel pick.</strong> Coming in from Narita? The plan starts you near a Skyliner stop. Haneda? Different neighborhood entirely.</li>
  <li><strong>Day order based on arrival timing.</strong> Late-night arrival gets a light Day 1. Morning arrival can absorb a big sight.</li>
  <li><strong>Pacing tuned to traveler type.</strong> Family with kids = parks built in, museum visits capped at 90 minutes. Foodie = three meals planned, snacks between. Senior = no consecutive long-walk days.</li>
  <li><strong>Side trip vs deeper city day.</strong> Generic plans default to a side trip. An AI plan reads your dates and asks whether you actually want one.</li>
  <li><strong>Restaurant style fit.</strong> "Best restaurants" lists ignore that you might want street food, vegetarian, allergy-aware, or family-friendly.</li>
</ol>

<h2>When generic itineraries are fine</h2>

<p>To be fair: if you're a confident traveler with travel experience, a flexible itinerary, and good improvising instincts, a generic plan can be a starting point you customize on the ground. That's how a lot of travel bloggers actually work.</p>

<p>The case for personalized plans is strongest when:</p>

<ul>
  <li>It's your first trip to a country or region.</li>
  <li>You're traveling with kids, seniors, dietary restrictions, or mobility considerations.</li>
  <li>Your time is limited (3-5 day trips) and the cost of a wasted half-day is high.</li>
  <li>You want to spend your planning time on the trip, not on the spreadsheet.</li>
</ul>

<h2>What an AI plan should include (and what's just filler)</h2>

<p>Not every AI trip tool is created equal. The good ones produce a plan that has:</p>

<ul>
  <li>A specific hotel recommendation matched to your arrival logistics.</li>
  <li>Day-by-day stops with realistic transit time between them.</li>
  <li>At least one restaurant per meal, with addresses.</li>
  <li>A route map you can actually use on the ground.</li>
  <li>An understanding of your traveler type that shows up in the choices, not just a one-line label.</li>
</ul>

<p>The bad ones produce a list of attractions, no transit context, generic restaurant names, and no map. You can get that from Wikipedia.</p>

<p>See real samples of what we mean: <a href="/samples/tokyo-4d-couple">Tokyo 4-day couple</a>, <a href="/samples/paris-3d-family">Paris 3-day family</a>, <a href="/samples/bangkok-4d-solo">Bangkok 4-day solo</a>. Each one is hand-built to the quality bar our generator targets.</p>

<h2>The bottom line</h2>

<p>Generic itineraries are free and they're a reasonable place to start. Personalized AI plans are paid and they save you the most common trip mistake — building the wrong shape of trip for who you actually are.</p>

<p>If you want to see what a personalized plan looks like for your trip specifically, <a href="/">gliddy</a> builds one in about ten minutes. $4, no subscription, delivered by email and PDF.</p>

<h2>Related reading</h2>
<ul>
  <li><a href="/samples">Browse all sample plans →</a></li>
  <li><a href="/blog/tokyo-itinerary-how-many-days">Tokyo itinerary: how many days do you need?</a></li>
  <li><a href="/blog/paris-with-kids-3-day-itinerary">Paris with kids: realistic 3-day plan</a></li>
</ul>
`,
  },
};
