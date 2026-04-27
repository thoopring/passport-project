import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Seoul, 3 days, solo foodie traveler, midrange.
 *
 * Built around food-first days with one cultural anchor each. Coordinates
 * pinned to real, well-known places. Text fields are intentionally
 * enriched beyond typical API output — samples are the conversion surface.
 */
const seoul3dFoodie: TripPlan = {
  destination: "Seoul",
  destinationCountry: "South Korea",
  durationDays: 3,
  overview:
    "Three days for a solo traveler whose main reason to visit Seoul is the food. Each day pairs one cultural anchor with three or four eating stops, balancing famous markets, neighborhood holes-in-the-wall, and one nicer dinner per day. By day three you'll know the difference between sundubu and dubu jjigae, why Korean BBQ is grilled by the staff (not you), and why every meal arrives with at least eight free side dishes. K-drama and K-pop will land different once you've walked the Hongdae streets they were filmed in.",
  bestSeasonNote:
    "April–May (cherry blossoms, mild) and September–October (autumn, dry) are the sweet spot. The cherry blossoms at Yeouido, Kyung Hee University, and Seokchon Lake peak the first week of April. In early October the ginkgos around Gwanghwamun and Bukchon turn blinding gold. August humidity will make you sweat through your shirt in 3 minutes — avoid it. Winter Seoul at -10°C is brutal outside but every interior is heated like summer; K-drama fans can come specifically for snowy hanbok photos — Gyeongbokgung's red torii under snow looks straight out of a film.",
  currencyTip:
    "T-money card from any convenience store (~$5) covers all subway, bus, and many taxi fares — and it works as a payment card at konbini and vending machines. Withdraw 200,000–300,000 won (~$150–225) from a Citibank, Shinhan, or Woori ATM on arrival — pick the 'Foreign Card' menu and most international Visas work. Myeongdong and Dongdaemun have currency exchange counters with better rates than the airport — bring your passport.",
  languageTip:
    "Korean is logical once you learn the 24-letter Hangul alphabet — try a 30-minute YouTube primer before you fly and you'll be reading subway station names by day 1. 'Annyeonghaseyo' (hello) and 'Gamsahamnida' (thank you) are universal. 'Igeo juseyo' (this one, please) plus a finger point handles ordering anywhere. Papago is more accurate than Google Translate for Korean — it's the app Koreans use themselves.",
  emergencyNumber: "112 (police), 119 (medical/fire), 1330 (24-hour Korea tourism hotline in English)",
  hotel: {
    name: "L7 Hongdae by Lotte",
    area: "Hongdae",
    address: "141 Yanghwa-ro, Mapo-gu, Seoul",
    coords: [126.9219, 37.5563],
    rationale:
      "Hongdae is the most walkable food-and-nightlife neighborhood in Seoul, full of indie cafés, late-night BBQ joints, and street performers — 3am isn't late here. L7 sits 3 minutes from Hongik University Station (Airport Railroad direct from ICN — 50 min, no transfers) and on the AREX Express line. The rooftop bar gives you a Han River view in the distance. The building has a konbini, Korean coffee chains, and a Michelin-listed bibimbap restaurant on the ground floor. Solo rooms run ~$120/night; the common area has free ramen and drinks — the modern chain branding turned all the way up.",
    priceTier: "$$$",
    estimatedNightlyRate: "~$120/night",
  },
  airportTransit: {
    method: "AREX Airport Express → Hongik University Station",
    duration: "~50 minutes",
    cost: "~$8",
    instructions:
      "From ICN Terminal 1 or 2 basement, follow the green AREX signs. The Express train ticket (9,000 won) is reserved-seat, 43 min direct to Seoul Station — then transfer to the AREX commuter line back two stops to Hongik University (or, if you have a T-money card, take Line 2 instead). Alternatively, the all-stop commuter line is ~30% cheaper but 15 min slower. After 23:00, AREX stops running and you'll need a taxi — ICN to central Seoul is ~$50–60 by cab.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Markets & Royal Palace",
      summary:
        "A market breakfast, the city's grandest royal palace, and dinner in the hanok village.",
      stops: [
        {
          order: 1,
          time: "08:30",
          type: "meal",
          name: "Gwangjang Market breakfast",
          area: "Jongno",
          address: "88 Changgyeonggung-ro, Jongno-gu",
          coords: [126.9999, 37.5704],
          duration: "1.5 hours",
          description:
            "Seoul's oldest market and the queen of street food — over 100 stalls packed under one roof. Hit the bindaetteok (mung-bean pancake) ladies in the central zone — green-bean batter freshly ground, fried on a giant griddle, paired with makgeolli (rice wine), $4 a portion. The mayak gimbap ('addictive seaweed roll') stands sell tiny bite-sized rolls dipped in yellow mustard sauce, $2.50 a serving. This is also a mukbang (eating-livestream) hotspot — you might catch a Korean YouTuber filming. Eat standing, then move to the next stall.",
          estimatedCost: "~$12",
          transitFromPrev: "Subway Line 2 from Hongik University → Line 1 transfer → Jongno-5(o)-ga, 25 min",
        },
        {
          order: 2,
          time: "10:30",
          type: "sight",
          name: "Gyeongbokgung Palace",
          area: "Jongno",
          address: "161 Sajik-ro, Jongno-gu",
          coords: [126.9770, 37.5796],
          duration: "2 hours",
          description:
            "The Joseon dynasty's main royal palace, founded in 1395. The 11:00 changing-of-the-guard ceremony at the Gwanghwamun gate is unmissable — five guards in Joseon-era costume slow-march, drum, and trumpet through 15 minutes that drop you 500 years back. Wear a hanbok (rented near the palace for ~$10/4 hours) and entry is free. Fall ginkgos carpet the courtyard in front of the Geunjeongjeon hall in golden yellow. After exiting, loop west to the small lanes of Hyoja-dong — a century-old rice-cake shop 'Gyeseongdang' is hidden there.",
          estimatedCost: "~$3 (free in hanbok)",
          bookingTip: "Closed Tuesdays. Free guided English tours at 11:00 and 13:30. Combo ticket with Bukchon and Changdeokgung (the 'Four Palaces Pass', ~$8) is the better deal.",
          transitFromPrev: "Subway Line 5 → Line 3 to Gyeongbokgung Station, ~15 min",
        },
        {
          order: 3,
          time: "13:00",
          type: "sight",
          name: "Bukchon Hanok Village walk",
          area: "Bukchon",
          coords: [126.9854, 37.5824],
          duration: "1.5 hours",
          description:
            "A residential neighborhood of restored 600-year-old wooden hanok houses with curved roof lines like crane wings, sandwiched between the two palaces. Walk Gahoe-dong's cobbled lanes — the free Bukchon visitor-center map marks 8 'photo spots'; spot 5 frames a narrow alley looking out toward N Seoul Tower in the distance, the canonical Instagram angle. People still live here — early mornings between 7–9am have the fewest visitors and you can hear housewives hanging laundry. Note: signs ask for quiet between 11:00–17:00 — it's a real request from residents.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
        },
        {
          order: 4,
          time: "15:00",
          type: "rest",
          name: "Café in Samcheong-dong",
          area: "Samcheong-dong",
          coords: [126.9826, 37.5840],
          duration: "1 hour",
          description:
            "The café-and-gallery street descending from Bukchon. Pick any traditional teahouse — order omija (5-flavor berry tea), the red infusion that hits sour, sweet, bitter, spicy, and salty all at once, paired with a small plate of yakgwa (honey-fried cookies). 'Cha Damseon' is a 50-year-old teahouse with wooden interiors where you can sit on a tatami mat for an entire afternoon alone. On the way out, peek into 'Geumdarae Gallery' — small contemporary exhibitions, free.",
          estimatedCost: "~$8",
          transitFromPrev: "10 min walk",
        },
        {
          order: 5,
          time: "17:30",
          type: "meal",
          name: "Tosokchon Samgyetang",
          area: "Jongno",
          coords: [126.9706, 37.5800],
          duration: "1 hour",
          description:
            "Korea's most famous samgyetang — a whole young chicken stuffed with sticky rice, ginseng, jujubes, and chestnuts, simmered in a clay pot for hours. It's a $15 meal but two presidents (Park Chung-hee, Moon Jae-in) have eaten here. The broth is milky white with intense ginseng aroma. Peak hours mean a 30-minute queue; arrive at 17:00 to walk straight in. Add a glass of insam-ju (ginseng wine, ~$3) — slightly bitter-sweet, locally called boyak (nourishing tonic).",
          estimatedCost: "~$15",
          bookingTip: "No reservations — worth the queue. Walk west from Gwanghwamun toward the Hyoja-dong neighborhood.",
          transitFromPrev: "20 min walk",
        },
        {
          order: 6,
          time: "20:00",
          type: "activity",
          name: "Cheonggyecheon stream walk",
          area: "Jongno",
          coords: [126.9784, 37.5694],
          duration: "1 hour",
          description:
            "An 11km urban stream that was buried under a freeway for nearly 30 years until then-mayor Lee Myung-bak demolished the overpass and restored it in 2005 — now a real waterway running through the heart of downtown. The first 2km east of City Hall light up at 6pm, and office workers leave their buildings to walk along it after work. Every early November the 'Cheonggyecheon Lantern Festival' fills the entire stream with LED light sculptures, the most romantic winter scene in Seoul. A quiet, restorative walk to digest the day's grease before bed.",
          estimatedCost: "Free",
          transitFromPrev: "20 min walk",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "BBQ, makgeolli & Hongdae night",
      summary:
        "A slower morning, a meaningful war memorial, then deep into Korean grill culture.",
      stops: [
        {
          order: 1,
          time: "10:00",
          type: "meal",
          name: "Onion Anguk (brunch + bread)",
          area: "Anguk",
          coords: [126.9839, 37.5786],
          duration: "1 hour",
          description:
            "A modern hanok converted into a bakery-café with the most beautiful pastry display in Seoul — large salt breads, fragrant pandoro, matcha croissants stacked into small towers. The 'Salt Bread' (소금빵) and 'Pandoro' are signatures, Instagram requirements. Sit on the wooden floor of the courtyard with a single-origin Korean coffee, looking at the hanok's tiled roof through paper windows. Opens 10am, mostly empty before 11am. The MMCA (Modern and Contemporary Art Museum) next door has free permanent exhibitions if you want to chain.",
          estimatedCost: "~$12",
          transitFromPrev: "Subway Line 3 to Anguk, 5 min walk",
        },
        {
          order: 2,
          time: "11:30",
          type: "sight",
          name: "War Memorial of Korea",
          area: "Yongsan",
          address: "29 Itaewon-ro, Yongsan-gu",
          coords: [126.9776, 37.5366],
          duration: "2 hours",
          description:
            "Free, world-class museum on the Korean War and its origins. The outdoor military hardware — fighter jets, tanks, ships you can climb into — tells half the story. The bronze 'Statue of Brothers' depicts a South Korean and a North Korean brother reuniting in embrace on the battlefield, the museum's most weighted page. The main hall walks the chronology; one wall holds the flags of the 16 UN nations who sent troops, with the casualty number under each. After the China hall, sit by the outdoor memorial pool for 10 minutes — this museum needs to be walked slowly, not rushed.",
          estimatedCost: "Free",
          transitFromPrev: "Subway Line 6 from Anguk → Triangle Station, 25 min",
        },
        {
          order: 3,
          time: "14:00",
          type: "meal",
          name: "Mapo galmaegisal at Hongdae",
          area: "Hongdae",
          coords: [126.9230, 37.5566],
          duration: "1.5 hours",
          description:
            "Pork-skirt BBQ — the cut you'll never see at a Western Korean BBQ joint. Fine-grained, balanced fat, more aromatic than samgyeopsal when grilled. Pick any place near the hostel labeled 'galmaegisal jeonmun' (skirt-meat specialist) — the staff grills, snips, flips for you, you just eat. Comes with 12 banchan, two kinds of kimchi, garlic slices, and perilla and lettuce leaves to wrap. Soju ($1.50/bottle), makgeolli ($3/jug), drink slowly. ~$22 for one person.",
          estimatedCost: "~$22",
          transitFromPrev: "Subway Line 6 → Hongik University, ~25 min",
        },
        {
          order: 4,
          time: "16:00",
          type: "rest",
          name: "Café crawl on Yeonnam-dong",
          area: "Yeonnam-dong",
          coords: [126.9249, 37.5631],
          duration: "2 hours",
          description:
            "Seoul's hippest café neighborhood, a 5-minute walk west of Hongdae. 3-café strategy: 'Felt' — industrial design, in-house roast, sit by the window facing the railway. 'Fritz Coffee' — Korean third-wave pioneer, the 'Old Dog' beans are rich. Third café: pick at random — Yeonnam-dong is full of independents with no English signage, and that's where the real treasures hide. 'Gyeongcheon Aein' teahouse near 'Yeonnam Manor' is a summer favorite — the cheese-mungbean shaved ice is dessert overload.",
          estimatedCost: "~$15",
          transitFromPrev: "10 min walk",
        },
        {
          order: 5,
          time: "19:00",
          type: "meal",
          name: "Mukja Golmok pojangmacha",
          area: "Hongdae",
          coords: [126.9220, 37.5560],
          duration: "1.5 hours",
          description:
            "Seoul's classic tent-bar food — pojangmacha is the temporary plastic-canopy roadside cart unique to Korea. Plastic chairs, bare bulbs, soju and makgeolli, seafood pajeon (scallion pancake), and gopchang (grilled intestines, much better than it sounds). Strike up a quick conversation with whichever Korean sits next to you — soju is a social lubricant. 'Eolkeunhan kimchi-jjigae' (spicy kimchi stew) is the winter must-order; tell the server 'eonni, kimchi-jjigae hana' (older sister, one kimchi-jjigae) and she'll call you 'younger sister' right back.",
          estimatedCost: "~$25",
          transitFromPrev: "10 min walk",
        },
        {
          order: 6,
          time: "21:30",
          type: "activity",
          name: "Hongdae street performances",
          area: "Hongik University street",
          coords: [126.9230, 37.5530],
          duration: "1.5 hours",
          description:
            "On weekend nights, the main pedestrian street in front of Hongik University fills with K-pop dance crews (synchronized 'knife-precision' choreographies), indie bands plugged in, jugglers, rap battles. Free, loud, joyful. Some crews are already signed — you might catch the 2024 street version of a 2026 debut idol. Beer in hand, stand for 30 minutes — this is Seoul's youngest 11pm.",
          estimatedCost: "Free",
          transitFromPrev: "5 min walk",
        },
      ],
    },
    {
      dayNumber: 3,
      theme: "Gangnam, Han River & last meals",
      summary:
        "Cross south of the river for one museum, lunch in Apgujeong, and a sunset on the Han.",
      stops: [
        {
          order: 1,
          time: "10:00",
          type: "sight",
          name: "Bongeunsa Temple",
          area: "Gangnam",
          coords: [127.0570, 37.5147],
          duration: "1 hour",
          description:
            "A 1,200-year-old Buddhist temple wedged between Gangnam skyscrapers — the visual contrast is the whole point. The COEX glass façades reflect the temple's tile roofs in their windows. The 500 wooden arhat statues in front of the main hall each have a different expression — you could stand looking at them for half an hour. Free 'Templestay' programs run for foreigners (1-hour version covers sutra copying, 108 prostrations, and walking meditation; reserve online). Walking north from Bongeunsa Road takes you straight into the Starfield Library next.",
          estimatedCost: "Free",
          transitFromPrev: "Subway Line 2 → Line 7, ~30 min",
        },
        {
          order: 2,
          time: "11:30",
          type: "shopping",
          name: "Starfield COEX & Library",
          area: "Gangnam",
          coords: [127.0589, 37.5126],
          duration: "1 hour",
          description:
            "An underground mall with a two-story open library at the center — 50,000 books free to read, with massive wooden bookshelves rising from floor to a 13-meter-high ceiling. One of the most photographed indoor spaces in Seoul. Books are mostly Korean but there's an English corner; a few sofas, a coffee bar. Right next door: COEX Aquarium, cinema, and the Starbucks flagship. Sit in the book sea for 45 minutes, then go eat.",
          estimatedCost: "Free",
          transitFromPrev: "10 min walk",
        },
        {
          order: 3,
          time: "13:00",
          type: "meal",
          name: "Born & Bred (dry-aged beef)",
          area: "Apgujeong",
          coords: [127.0410, 37.5275],
          duration: "1.5 hours",
          description:
            "If you'll splurge once on this trip, do it here. Born & Bred is the founding shop of in-house dry-aged Korean hanwoo beef in Seoul — glass cabinets show beef cuts with date labels. The lunch set 'rib-eye + vegetables + rice + banchan' runs ~$60, equivalent to a Tokyo Roppongi steakhouse at 3× the price. The chef cuts the meat himself; pair with a Korean clean-grain spirit (Songjuk, Baekamdang). Order the 'dry-aged ribeye' specifically — not the sirloin. Solo dining is welcomed; for two it's even better value.",
          estimatedCost: "~$60",
          bookingTip: "Reserve via Catch Table app 1 week in advance (Korean interface but the flow is intuitive).",
          transitFromPrev: "Subway Line 7 → Apgujeong-rodeo, ~15 min",
        },
        {
          order: 4,
          time: "15:30",
          type: "shopping",
          name: "Garosu-gil street",
          area: "Sinsa",
          coords: [127.0227, 37.5233],
          duration: "1.5 hours",
          description:
            "A leafy ginkgo-lined boutique street with Korean designer brands, café conversions, and great people-watching. 'ANDAR', 'OIIE', and the 'GENTLE MONSTER' eyewear flagship are all on this strip. 10× fewer tourists than Myeongdong, 10× more curated quality. In autumn the entire street goes yellow — Seoul's most photogenic shopping street. Sinsa Station, exit 8, walk straight 3 minutes. For K-beauty cosmetics, the Olive Young flagship is also on this street — every Korean brand you've seen on Instagram is here.",
          estimatedCost: "Free–$$$",
          transitFromPrev: "Subway Line 3 → Sinsa, 10 min walk",
        },
        {
          order: 5,
          time: "17:30",
          type: "rest",
          name: "Han River Park (Banpo)",
          area: "Banpo",
          coords: [126.9970, 37.5117],
          duration: "1.5 hours",
          description:
            "Seoul's after-work living room. Walk down to the river, rent a 5,000-won mat from any convenience store, and order chicken-and-beer (BBQ Chicken, Goobne) delivered straight to your spot via the Korean apps Coupang Eats or Baedal Minjok — 30 minutes from order to delivery, the uniquely Korean 'Hangang delivery' experience. From April to October on Friday, Saturday, and Sunday at 21:00 and 21:30, the Banpo Bridge 'Moonlight Rainbow Fountain' show — Seoul's most beautiful free night sight: a 1,140-meter rainbow fountain choreographed to music, water cascading back into the Han.",
          estimatedCost: "~$15",
          transitFromPrev: "Subway Line 9 → Sinbanpo, 10 min walk",
        },
        {
          order: 6,
          time: "20:30",
          type: "meal",
          name: "Kkanbu Chicken (Korean fried chicken)",
          area: "Hongdae",
          coords: [126.9224, 37.5570],
          duration: "1 hour",
          description:
            "End the trip on Korea's national snack: KFC (Korean Fried Chicken). Order the 'half-and-half' (yangnyeom-banban): half soy-garlic, half sweet-spicy, with a Korean draft beer ($3) — that's chimaek (chicken + beer). Kkanbu, BBQ, and Goobne are chains but all hold the standard. The signature crispness of Korean fried chicken comes from a double-fry technique with a pre-chill of the breaded skin — completely different from Chinese or Japanese fried chicken. Cooked to order, ~30 minutes, eat hot from the fryer.",
          estimatedCost: "~$22",
          transitFromPrev: "Subway Line 9 → Hongik University, ~25 min",
        },
      ],
    },
  ],
  packingTips: [
    "Slip-on shoes — you'll remove them at temples, traditional restaurants, and jjimjilbang saunas; lace-ups will annoy you",
    "A small umbrella — Seoul gets sudden showers most months, and the June–July monsoon is the wettest",
    "Hand wipes and pocket sanitizer — street food + public restrooms without paper are a real combination",
    "An empty stomach on day 1 — you will not stop eating",
    "A small Korean-won wallet — convenience stores and traditional markets still favor cash",
    "Room in your suitcase for sheet masks and cosmetics — Korean K-beauty is 30% cheaper than Western prices, and Olive Young is a must",
  ],
  budgetEstimate: "~$80–120/day excluding hotel",
  generalTips: [
    "Subway is faster, cleaner, and cheaper than taxis — get a T-money card",
    "Tipping is not expected anywhere",
    "Restaurants give free side dishes (banchan) with every meal — it's not extra and refills are free",
    "Most museums are closed Mondays",
    "Apple Pay arrived in Korea in 2023 and works in most chains; konbini and small shops still favor local cards",
    "Naver Map and Kakao Map are 10× more accurate than Google Maps in Korea — download before arrival, you can search store names in English",
  ],
};

export default seoul3dFoodie;
