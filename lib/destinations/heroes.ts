/**
 * Destination → hero photo lookup for paid plan rendering.
 *
 * Source-of-truth for the cinematic photo that lands at the top of every
 * /plan/[id] view and the cover of every PDF. The site's emotional
 * arrival moment.
 *
 * Two tiers:
 *   - Tier A (13 cities): verified Unsplash IDs — same set already used by
 *     the live samples gallery, so they've been visually checked and
 *     confirmed not silently swapped by Unsplash.
 *   - Tier B (17 cities): candidate Unsplash IDs for popular destinations
 *     the AI generator may produce plans for. Less battle-tested than
 *     Tier A; if Unsplash silently swaps an image to something off-brand,
 *     swap the ID inline. Cold-start fallback (no hero) handles a broken
 *     image gracefully — the plan view still renders cleanly without it.
 *
 * Aliases let Claude return the destination name in the user's locale
 * ("도쿄", "東京", "东京", "Tokyo") and still resolve to the same entry.
 */

export interface DestinationHero {
  /** Unsplash photo ID (no leading slash). Fallback when localFile is
   *  not yet self-hosted. Used by the URL builder. */
  unsplashId: string;
  /** When present, points to a self-hosted JPEG under
   *  /public/destinations/{localFile}. Takes precedence over Unsplash —
   *  removes the silent-swap risk for migrated destinations. Path is
   *  RELATIVE (e.g. "reykjavik/hero.jpg"); the resolver prepends
   *  "/destinations/". */
  localFile?: string;
  /** All accepted spellings for this destination. Lowercased ASCII or
   *  verbatim CJK. Lookup is case-insensitive. */
  aliases: string[];
  /** One-line note about what's in the photo so swaps stay on-brand. */
  shotNote: string;
}

/** Build a 1600px Unsplash image URL with sensible quality and crop. */
export function unsplashHeroUrl(id: string, width = 1600): string {
  return `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;
}

const HEROES: DestinationHero[] = [
  // All 28 entries below are self-hosted (2026-05-06 catalog migration
  // run via scripts/fetch-destination-photos.mjs). The script's HEAD
  // check caught two dead Unsplash IDs upstream — amsterdam and
  // marrakech — and they were dropped from the catalog rather than
  // shipped as broken hotlinks. Cold-start renderers for those two
  // cities now return null (no hero) until a replacement ID is verified.
  {
    unsplashId: "photo-1542051841857-5f90071e7989",
    localFile: "tokyo/hero.jpg",
    aliases: ["tokyo", "도쿄", "東京", "东京"],
    shotNote: "Shibuya scramble at twilight — neon, motion, iconic Tokyo.",
  },
  {
    unsplashId: "photo-1590559899731-a382839e5549",
    localFile: "osaka/hero.jpg",
    aliases: ["osaka", "오사카", "大阪"],
    shotNote: "Tsutenkaku Tower at twilight, framed by Shinsekai shop signs.",
  },
  {
    unsplashId: "photo-1517154421773-0529f29ea451",
    localFile: "seoul/hero.jpg",
    aliases: ["seoul", "서울", "ソウル", "首尔", "séoul"],
    shotNote: "Seoul cityscape with N Seoul Tower at twilight.",
  },
  {
    unsplashId: "photo-1470004914212-05527e49370b",
    localFile: "taipei/hero.jpg",
    aliases: ["taipei", "타이베이", "台北", "타이뻬이"],
    shotNote: "Jiufen tea house alley with red lanterns at dusk.",
  },
  {
    unsplashId: "photo-1508009603885-50cf7c579365",
    localFile: "bangkok/hero.jpg",
    aliases: ["bangkok", "방콕", "バンコク", "曼谷"],
    shotNote: "Wat Arun temple at golden hour against the river.",
  },
  {
    unsplashId: "photo-1528127269322-539801943592",
    localFile: "hanoi/hero.jpg",
    aliases: ["hanoi", "하노이", "ハノイ", "河内", "hanoï"],
    shotNote: "Halong Bay limestone karsts in emerald water.",
  },
  {
    unsplashId: "photo-1573790387438-4da905039392",
    localFile: "bali/hero.jpg",
    aliases: ["bali", "발리", "バリ", "巴厘", "巴厘岛", "denpasar", "ubud"],
    shotNote: "Tegallalang rice terraces under bright sunlight.",
  },
  {
    unsplashId: "photo-1499856871958-5b9627545d1a",
    localFile: "paris/hero.jpg",
    aliases: ["paris", "파리", "パリ", "巴黎"],
    shotNote: "Eiffel Tower from Trocadéro at golden hour.",
  },
  {
    unsplashId: "photo-1513635269975-59663e0ac1ad",
    localFile: "london/hero.jpg",
    aliases: ["london", "런던", "ロンドン", "伦敦", "londres"],
    shotNote: "Tower Bridge with double-decker red bus crossing.",
  },
  {
    unsplashId: "photo-1496442226666-8d4d0e62e6e9",
    localFile: "new-york/hero.jpg",
    aliases: [
      "new york",
      "new york city",
      "nyc",
      "뉴욕",
      "ニューヨーク",
      "纽约",
    ],
    shotNote: "Brooklyn Bridge with Manhattan skyline at sunset.",
  },
  {
    unsplashId: "photo-1531168556467-80aace0d0144",
    localFile: "reykjavik/hero.jpg",
    aliases: [
      "reykjavik",
      "레이캬비크",
      "레이캬빅",
      "レイキャビク",
      "雷克雅未克",
    ],
    shotNote: "Fjaðrárgljúfur canyon — mossy basalt walls + glacial river.",
  },
  {
    unsplashId: "photo-1526392060635-9d6019884377",
    localFile: "cusco/hero.jpg",
    aliases: ["cusco", "쿠스코", "クスコ", "库斯科"],
    shotNote: "Machu Picchu emerging from morning fog over the Andes.",
  },
  {
    unsplashId: "photo-1512453979798-5ea266f8880c",
    localFile: "dubai/hero.jpg",
    aliases: ["dubai", "두바이", "ドバイ", "迪拜", "dubaï"],
    shotNote: "Burj Khalifa skyline at sunset.",
  },
  {
    unsplashId: "photo-1545569341-9eb8b30979d9",
    localFile: "kyoto/hero.jpg",
    aliases: ["kyoto", "교토", "京都"],
    shotNote: "Fushimi Inari torii gate tunnel.",
  },
  {
    unsplashId: "photo-1525625293386-3f8f99389edd",
    localFile: "singapore/hero.jpg",
    aliases: ["singapore", "싱가포르", "シンガポール", "新加坡", "singapour"],
    shotNote: "Marina Bay Sands skyline at twilight.",
  },
  {
    unsplashId: "photo-1536599018102-9f803c140fc1",
    localFile: "hong-kong/hero.jpg",
    aliases: [
      "hong kong",
      "hongkong",
      "홍콩",
      "ホンコン",
      "香港",
    ],
    shotNote: "Victoria Harbour skyline at night.",
  },
  {
    unsplashId: "photo-1525874684015-58379d421a52",
    localFile: "rome/hero.jpg",
    aliases: ["rome", "로마", "ローマ", "罗马"],
    shotNote: "Colosseum at golden hour.",
  },
  {
    unsplashId: "photo-1583422409516-2895a77efded",
    localFile: "barcelona/hero.jpg",
    aliases: [
      "barcelona",
      "바르셀로나",
      "バルセロナ",
      "巴塞罗那",
      "barcelone",
    ],
    shotNote: "Park Güell mosaic terrace overlooking the city.",
  },
  // amsterdam removed 2026-05-06 — Unsplash photo-1534351590666-13e3e96c5017
  // returned non-200 in the migration HEAD-check. Add a verified
  // replacement when one is available.
  {
    unsplashId: "photo-1560969184-10fe8719e047",
    localFile: "berlin/hero.jpg",
    aliases: ["berlin", "베를린", "ベルリン", "柏林"],
    shotNote: "Brandenburg Gate at dusk.",
  },
  {
    unsplashId: "photo-1516550893923-42d28e5677af",
    localFile: "vienna/hero.jpg",
    aliases: ["vienna", "비엔나", "빈", "ウィーン", "维也纳", "vienne"],
    shotNote: "Schönbrunn Palace gardens.",
  },
  {
    unsplashId: "photo-1541849546-216549ae216d",
    localFile: "prague/hero.jpg",
    aliases: ["prague", "프라하", "プラハ", "布拉格"],
    shotNote: "Charles Bridge at sunrise with mist.",
  },
  {
    unsplashId: "photo-1524231757912-21f4fe3a7200",
    localFile: "istanbul/hero.jpg",
    aliases: ["istanbul", "이스탄불", "イスタンブール", "伊斯坦布尔"],
    shotNote: "Hagia Sophia at golden hour.",
  },
  {
    unsplashId: "photo-1506973035872-a4ec16b8e8d9",
    localFile: "sydney/hero.jpg",
    aliases: ["sydney", "시드니", "シドニー", "悉尼", "sydney"],
    shotNote: "Sydney Opera House from the harbour.",
  },
  {
    unsplashId: "photo-1501594907352-04cda38ebc29",
    localFile: "san-francisco/hero.jpg",
    aliases: [
      "san francisco",
      "샌프란시스코",
      "サンフランシスコ",
      "旧金山",
    ],
    shotNote: "Golden Gate Bridge in fog.",
  },
  {
    unsplashId: "photo-1605833556294-ea5c7a74f57d",
    localFile: "los-angeles/hero.jpg",
    aliases: [
      "los angeles",
      "la",
      "로스앤젤레스",
      "ロサンゼルス",
      "洛杉矶",
    ],
    shotNote: "LA skyline with palm trees at golden hour.",
  },
  {
    unsplashId: "photo-1518105779142-d975f22f1b0a",
    localFile: "mexico-city/hero.jpg",
    aliases: [
      "mexico city",
      "ciudad de méxico",
      "멕시코시티",
      "メキシコシティ",
      "墨西哥城",
      "mexico",
    ],
    shotNote: "Palacio de Bellas Artes from above.",
  },
  {
    unsplashId: "photo-1513735492246-483525079686",
    localFile: "lisbon/hero.jpg",
    aliases: ["lisbon", "리스본", "リスボン", "里斯本", "lisbonne"],
    shotNote: "Yellow tram on tile-covered street.",
  },
  // marrakech removed 2026-05-06 — Unsplash photo-1539020140153-e479b8c61e30
  // returned non-200 in the migration HEAD-check.
  {
    unsplashId: "photo-1539037116277-4db20889f2d4",
    localFile: "madrid/hero.jpg",
    aliases: ["madrid", "마드리드", "マドリード", "马德里"],
    shotNote: "Plaza Mayor under late afternoon light.",
  },
];

/**
 * Resolve a destination string (in any of 5 locales) to a hero photo URL.
 * Returns null when the destination isn't in the curated catalog — the
 * caller should render its layout WITHOUT a hero image rather than
 * picking a generic stand-in. Wrong photo > no photo.
 *
 * Local-first: when an entry has a localFile, returns the path under
 * /destinations/ (Vercel CDN, never breaks). Otherwise falls back to
 * the Unsplash URL builder.
 */
export function getDestinationHeroUrl(
  destination: string,
  width = 1600,
): string | null {
  if (!destination) return null;
  const norm = destination.toLowerCase().trim();
  for (const entry of HEROES) {
    if (entry.aliases.some((a) => a.toLowerCase() === norm)) {
      if (entry.localFile) return `/destinations/${entry.localFile}`;
      return unsplashHeroUrl(entry.unsplashId, width);
    }
  }
  return null;
}
