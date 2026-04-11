import type { TripPlan } from "../../types/trip-plan";

/**
 * Sample plan: Seoul, 3 days, solo foodie traveler, midrange.
 *
 * Built around food-first days with one cultural anchor each. Coordinates
 * pinned to real, well-known places.
 */
const seoul3dFoodie: TripPlan = {
  destination: "Seoul",
  destinationCountry: "South Korea",
  durationDays: 3,
  overview:
    "Three days for a solo traveler whose main reason to visit Seoul is the food. Each day pairs one cultural anchor with three or four eating stops, balancing famous markets, neighborhood holes-in-the-wall, and one nicer dinner. By day three you'll know the difference between sundubu and dubu jjigae.",
  bestSeasonNote:
    "April–May (cherry blossoms, mild) and September–October (autumn, dry) are perfect. Avoid the August humidity.",
  currencyTip:
    "T-money card from any convenience store covers all subway, bus, and many taxi fares. Withdraw 200,000–300,000 won from a Citibank or Woori ATM on arrival.",
  languageTip:
    "Korean is logical once you learn the 24-letter Hangul alphabet — try a 30-minute YouTube primer before you fly. 'Annyeong haseyo' (hello) and 'Gamsahamnida' (thank you) go a long way.",
  emergencyNumber: "112 (police), 119 (medical/fire)",
  hotel: {
    name: "L7 Hongdae by Lotte",
    area: "Hongdae",
    address: "141 Yanghwa-ro, Mapo-gu, Seoul",
    coords: [126.9219, 37.5563],
    rationale:
      "Hongdae is the most walkable food-and-nightlife neighborhood in Seoul, full of indie cafés, late-night BBQ joints, and street performers. L7 sits 3 minutes from Hongik University Station (Airport Railroad direct from ICN — 50 min, no transfers) and on the AREX Express line. The rooftop bar gives you a Han River view, and a single solo room runs ~$120/night.",
    priceTier: "$$$",
    estimatedNightlyRate: "~$120/night",
  },
  airportTransit: {
    method: "AREX Airport Express → Hongik University Station",
    duration: "~50 minutes",
    cost: "~$8",
    instructions:
      "From ICN Terminal 1 or 2 basement, follow signs to AREX. Buy the Express train ticket (9,000 won) — direct, reserved seat, 43 min to Seoul Station. From Seoul Station, transfer to AREX commuter line back two stops to Hongik University Station (or Line 2 — easier with a T-money card). Hotel is signed from Exit 1.",
  },
  days: [
    {
      dayNumber: 1,
      theme: "Markets & Royal Palace",
      summary:
        "A market breakfast, the city's grandest palace, and a hanok-village dinner.",
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
            "Seoul's oldest market and the queen of street food. Hit the bindaetteok (mung bean pancake) lady at the center, the mayak gimbap (mini seaweed rolls) stalls, and a tteokbokki bowl. Eat standing, then move on.",
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
            "Joseon dynasty's main royal palace, founded in 1395. Catch the changing-of-the-guard ceremony at 11:00 sharp. Wear a hanbok (rented for ~$10 nearby) and your entry is free.",
          estimatedCost: "~$3 (or free in hanbok)",
          bookingTip: "Closed Tuesdays. Free guided English tour at 11:00 and 13:30.",
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
            "A residential neighborhood of restored 600-year-old wooden houses sandwiched between the two palaces. Walk Gahoe-dong's cobbled lanes — there are 8 'photo spots' marked on free maps from the info center. Be quiet, people live here.",
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
            "The café-and-gallery street descending from Bukchon. Pick any traditional teahouse — most serve omija (5-flavor berry) tea and a small plate of yakgwa (honey cookies).",
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
            "Korea's most famous samgyetang (whole young chicken stuffed with sticky rice and ginseng, simmered for hours). It's a $15 meal and presidents have eaten it. Expect a 30-minute queue at peak; arrive at 17:00 to dodge it.",
          estimatedCost: "~$15",
          bookingTip: "No reservations. Worth the queue.",
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
            "An 11km urban stream that was buried under a freeway for 50 years and reopened in 2005. The first 2km from City Hall east are lit at night. A quiet, restorative walk before bed.",
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
            "A modern hanok converted into a bakery-café with the most beautiful pastry display in Seoul. The salt bread and pandoro are the must-orders. Perfect Instagram, deserved hype.",
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
            "Free, world-class museum on the Korean War and its origins. The outdoor military hardware (planes, tanks, the bronze 'Brothers' statue) tells half the story; the main hall tells the other. Heavy but essential context.",
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
            "Pork-skirt BBQ — the best cut you'll never see in a Western Korean BBQ. Pick any galmaegisal joint near the hostel. The staff grills for you.",
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
            "Seoul's hippest café neighborhood, immediately west of Hongdae. Pop into 3 cafés — the Korean specialty coffee scene is one of the best in Asia. Look for Felt, Fritz Coffee, and any place with no English signage.",
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
            "Seoul's classic tent-bar food. Order soju, makgeolli (rice wine), and a plate of pajeon (scallion pancake) and gopchang (grilled intestines, much better than it sounds). Talk to whoever sits next to you.",
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
            "On weekend nights, the main pedestrian street in front of Hongik University fills with K-pop dance crews, indie bands, and acrobats. Free, loud, joyful. Stay as long as your jet lag holds.",
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
            "A 1,200-year-old Buddhist temple wedged between Gangnam skyscrapers — the visual contrast is the whole point. Free 'Templestay' programs run for foreigners but a one-hour walk-through is plenty.",
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
            "An underground mall with a two-story open library at the center — 50,000 books, free to read, and one of the most photographed indoor spots in Seoul. Wander, browse, take the photo.",
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
            "If you'll splurge once on this trip, do it here. Born & Bred dry-ages Korean hanwoo beef on-site — the rib-eye lunch set is ~$60 and rivals anything in Tokyo. Reserve ahead.",
          estimatedCost: "~$60",
          bookingTip: "Reserve via Catch Table app 1 week in advance.",
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
            "A leafy boutique street with Korean designer brands, café conversions, and great people-watching. Less touristy than Myeongdong.",
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
            "Walk down to the river, rent a 5,000-won mat from any convenience store, and order chicken-and-beer delivered directly to the riverbank (real service — try BBQ Chicken or Goobne via the food trucks). The Banpo Bridge fountain show runs at 19:30 in season.",
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
            "End the trip on Korea's national snack: KFC (Korean Fried Chicken). Order the half-and-half (soy garlic + sweet spicy) with a beer. Crispy, sticky, perfect.",
          estimatedCost: "~$22",
          transitFromPrev: "Subway Line 9 → Hongik University, ~25 min",
        },
      ],
    },
  ],
  packingTips: [
    "Slip-on shoes — you'll remove them at temples and any traditional restaurant",
    "A small umbrella — Seoul gets sudden showers most months",
    "Hand wipes — street food + no napkins",
    "An empty stomach on day 1 — you will not stop eating",
  ],
  budgetEstimate: "~$80–120/day excluding hotel",
  generalTips: [
    "Subway is faster, cleaner, and cheaper than taxis — get a T-money card",
    "Tipping is not expected anywhere",
    "Restaurants give free side dishes (banchan) with every meal — it's not extra",
    "Most museums are closed Mondays",
  ],
};

export default seoul3dFoodie;
