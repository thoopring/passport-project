/**
 * Curated international airport list for the wizard's airport autocomplete.
 *
 * Strategy: include the airports a typical international traveler would
 * actually fly into for the destinations we cover. The point isn't
 * exhaustive coverage — it's making the user's search resolve cleanly
 * for the top 95% of cases. Cold-start cities can still be free-typed
 * (the popup falls back to plain text input if nothing matches).
 *
 * Each entry has aliases for Korean / Japanese / Chinese / French
 * spellings so a Korean traveler typing "나리타" or "인천" gets the same
 * autocomplete dropdown as one typing "Narita" or "ICN".
 */

export interface AirportOption {
  /** IATA 3-letter code, uppercase. The canonical identifier. */
  code: string;
  /** Common English name shown in the dropdown. */
  name: string;
  /** City the airport serves (English). */
  city: string;
  /** Country (English). */
  country: string;
  /** Search aliases — Korean / Japanese / Chinese / French / variants. */
  aliases: string[];
}

export const AIRPORTS: AirportOption[] = [
  // ─── East Asia ───
  { code: "NRT", name: "Narita Intl", city: "Tokyo", country: "Japan", aliases: ["나리타", "成田", "成田空港", "narita", "tokyo narita"] },
  { code: "HND", name: "Haneda", city: "Tokyo", country: "Japan", aliases: ["하네다", "羽田", "羽田空港", "haneda", "tokyo haneda"] },
  { code: "KIX", name: "Kansai Intl", city: "Osaka", country: "Japan", aliases: ["간사이", "関西", "関西空港", "kansai", "osaka"] },
  { code: "ITM", name: "Itami", city: "Osaka", country: "Japan", aliases: ["이타미", "伊丹", "itami"] },
  { code: "NGO", name: "Chubu Centrair", city: "Nagoya", country: "Japan", aliases: ["중부", "中部国際", "centrair", "nagoya"] },
  { code: "FUK", name: "Fukuoka", city: "Fukuoka", country: "Japan", aliases: ["후쿠오카", "福岡", "fukuoka"] },
  { code: "CTS", name: "New Chitose", city: "Sapporo", country: "Japan", aliases: ["치토세", "新千歳", "chitose", "sapporo"] },
  { code: "OKA", name: "Naha", city: "Okinawa", country: "Japan", aliases: ["나하", "那覇", "naha", "okinawa"] },
  { code: "ICN", name: "Incheon Intl", city: "Seoul", country: "South Korea", aliases: ["인천", "인천공항", "仁川", "incheon", "seoul"] },
  { code: "GMP", name: "Gimpo", city: "Seoul", country: "South Korea", aliases: ["김포", "김포공항", "金浦", "gimpo", "kimpo"] },
  { code: "PUS", name: "Busan Gimhae", city: "Busan", country: "South Korea", aliases: ["부산", "김해", "金海", "busan", "gimhae"] },
  { code: "CJU", name: "Jeju", city: "Jeju", country: "South Korea", aliases: ["제주", "濟州", "jeju"] },
  { code: "PEK", name: "Beijing Capital", city: "Beijing", country: "China", aliases: ["베이징", "北京", "首都国際", "beijing", "capital"] },
  { code: "PKX", name: "Beijing Daxing", city: "Beijing", country: "China", aliases: ["다싱", "大兴", "daxing"] },
  { code: "PVG", name: "Shanghai Pudong", city: "Shanghai", country: "China", aliases: ["푸동", "浦东", "pudong", "shanghai"] },
  { code: "SHA", name: "Shanghai Hongqiao", city: "Shanghai", country: "China", aliases: ["홍차오", "虹桥", "hongqiao"] },
  { code: "CAN", name: "Guangzhou Baiyun", city: "Guangzhou", country: "China", aliases: ["광저우", "广州", "白云", "guangzhou", "baiyun"] },
  { code: "HKG", name: "Hong Kong Intl", city: "Hong Kong", country: "Hong Kong", aliases: ["홍콩", "香港", "chek lap kok", "hong kong"] },
  { code: "TPE", name: "Taoyuan Intl", city: "Taipei", country: "Taiwan", aliases: ["타오위안", "타이베이", "桃園", "taoyuan", "taipei"] },
  { code: "TSA", name: "Taipei Songshan", city: "Taipei", country: "Taiwan", aliases: ["송산", "松山", "songshan"] },
  { code: "MFM", name: "Macau Intl", city: "Macau", country: "Macau", aliases: ["마카오", "澳门", "macau"] },

  // ─── Southeast Asia ───
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand", aliases: ["방콕", "수완나품", "曼谷", "suvarnabhumi", "bangkok"] },
  { code: "DMK", name: "Don Mueang", city: "Bangkok", country: "Thailand", aliases: ["돈므앙", "ดอนเมือง", "don mueang", "don muang"] },
  { code: "HKT", name: "Phuket Intl", city: "Phuket", country: "Thailand", aliases: ["푸켓", "ภูเก็ต", "phuket"] },
  { code: "CNX", name: "Chiang Mai Intl", city: "Chiang Mai", country: "Thailand", aliases: ["치앙마이", "เชียงใหม่", "chiang mai"] },
  { code: "SIN", name: "Changi", city: "Singapore", country: "Singapore", aliases: ["싱가포르", "차이", "新加坡", "changi", "singapore"] },
  { code: "KUL", name: "Kuala Lumpur Intl", city: "Kuala Lumpur", country: "Malaysia", aliases: ["쿠알라룸푸르", "吉隆坡", "kuala lumpur", "klia"] },
  { code: "MNL", name: "Ninoy Aquino", city: "Manila", country: "Philippines", aliases: ["마닐라", "馬尼拉", "manila", "naia"] },
  { code: "CEB", name: "Mactan-Cebu", city: "Cebu", country: "Philippines", aliases: ["세부", "宿务", "cebu", "mactan"] },
  { code: "DPS", name: "Ngurah Rai (Bali)", city: "Bali (Denpasar)", country: "Indonesia", aliases: ["발리", "덴파사르", "巴厘", "bali", "denpasar"] },
  { code: "CGK", name: "Soekarno-Hatta", city: "Jakarta", country: "Indonesia", aliases: ["자카르타", "雅加达", "jakarta", "soekarno"] },
  { code: "SGN", name: "Tan Son Nhat", city: "Ho Chi Minh City", country: "Vietnam", aliases: ["호치민", "胡志明", "tan son nhat", "saigon"] },
  { code: "HAN", name: "Noi Bai", city: "Hanoi", country: "Vietnam", aliases: ["하노이", "河内", "noi bai", "hanoi"] },
  { code: "DAD", name: "Da Nang Intl", city: "Da Nang", country: "Vietnam", aliases: ["다낭", "岘港", "da nang"] },
  { code: "PNH", name: "Phnom Penh Intl", city: "Phnom Penh", country: "Cambodia", aliases: ["프놈펜", "金边", "phnom penh"] },
  { code: "REP", name: "Siem Reap Intl", city: "Siem Reap", country: "Cambodia", aliases: ["시엠립", "暹粒", "siem reap"] },
  { code: "RGN", name: "Yangon Intl", city: "Yangon", country: "Myanmar", aliases: ["양곤", "ヤンゴン", "rangoon", "yangon"] },

  // ─── South Asia ───
  { code: "DEL", name: "Indira Gandhi Intl", city: "New Delhi", country: "India", aliases: ["델리", "新德里", "delhi"] },
  { code: "BOM", name: "Chhatrapati Shivaji Intl", city: "Mumbai", country: "India", aliases: ["뭄바이", "孟买", "mumbai", "bombay"] },
  { code: "BLR", name: "Kempegowda Intl", city: "Bangalore", country: "India", aliases: ["벵갈루루", "班加罗尔", "bangalore", "bengaluru"] },
  { code: "CMB", name: "Bandaranaike Intl", city: "Colombo", country: "Sri Lanka", aliases: ["콜롬보", "科伦坡", "colombo"] },
  { code: "KTM", name: "Tribhuvan Intl", city: "Kathmandu", country: "Nepal", aliases: ["카트만두", "加德满都", "kathmandu"] },

  // ─── Middle East ───
  { code: "DXB", name: "Dubai Intl", city: "Dubai", country: "UAE", aliases: ["두바이", "ドバイ", "迪拜", "dubai", "dubaï"] },
  { code: "DWC", name: "Al Maktoum (DWC)", city: "Dubai", country: "UAE", aliases: ["알막툼", "maktoum", "dwc"] },
  { code: "AUH", name: "Abu Dhabi Intl", city: "Abu Dhabi", country: "UAE", aliases: ["아부다비", "阿布扎比", "abu dhabi"] },
  { code: "DOH", name: "Hamad Intl", city: "Doha", country: "Qatar", aliases: ["도하", "ドーハ", "多哈", "doha"] },
  { code: "IST", name: "Istanbul", city: "Istanbul", country: "Turkey", aliases: ["이스탄불", "イスタンブール", "伊斯坦布尔", "istanbul"] },
  { code: "SAW", name: "Sabiha Gökçen", city: "Istanbul", country: "Turkey", aliases: ["사비하 괵첸", "sabiha", "gokcen"] },
  { code: "TLV", name: "Ben Gurion", city: "Tel Aviv", country: "Israel", aliases: ["텔아비브", "特拉维夫", "tel aviv", "ben gurion"] },
  { code: "RUH", name: "King Khalid Intl", city: "Riyadh", country: "Saudi Arabia", aliases: ["리야드", "利雅得", "riyadh"] },

  // ─── Europe ───
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France", aliases: ["샤를드골", "シャルル・ド・ゴール", "戴高乐", "charles de gaulle", "paris", "roissy"] },
  { code: "ORY", name: "Orly", city: "Paris", country: "France", aliases: ["오를리", "オルリー", "奥利", "orly"] },
  { code: "LHR", name: "Heathrow", city: "London", country: "United Kingdom", aliases: ["히드로", "ヒースロー", "希思罗", "heathrow", "london"] },
  { code: "LGW", name: "Gatwick", city: "London", country: "United Kingdom", aliases: ["개트윅", "ガトウィック", "盖特威克", "gatwick"] },
  { code: "STN", name: "Stansted", city: "London", country: "United Kingdom", aliases: ["스탠스테드", "斯坦斯特德", "stansted"] },
  { code: "LTN", name: "Luton", city: "London", country: "United Kingdom", aliases: ["루턴", "卢顿", "luton"] },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands", aliases: ["스히폴", "암스테르담", "スキポール", "史基浦", "schiphol", "amsterdam"] },
  { code: "FRA", name: "Frankfurt", city: "Frankfurt", country: "Germany", aliases: ["프랑크푸르트", "フランクフルト", "法兰克福", "frankfurt"] },
  { code: "MUC", name: "Munich", city: "Munich", country: "Germany", aliases: ["뮌헨", "ミュンヘン", "慕尼黑", "munich", "münchen"] },
  { code: "BER", name: "Berlin Brandenburg", city: "Berlin", country: "Germany", aliases: ["베를린", "ベルリン", "柏林", "berlin", "brandenburg"] },
  { code: "ZRH", name: "Zurich", city: "Zurich", country: "Switzerland", aliases: ["취리히", "チューリッヒ", "苏黎世", "zurich", "zürich"] },
  { code: "GVA", name: "Geneva", city: "Geneva", country: "Switzerland", aliases: ["제네바", "ジュネーブ", "日内瓦", "geneva", "genève"] },
  { code: "VIE", name: "Vienna", city: "Vienna", country: "Austria", aliases: ["빈", "ウィーン", "维也纳", "vienna", "wien"] },
  { code: "FCO", name: "Fiumicino (Rome)", city: "Rome", country: "Italy", aliases: ["피우미치노", "로마", "フィウミチーノ", "罗马", "fiumicino", "rome", "roma"] },
  { code: "MXP", name: "Milan Malpensa", city: "Milan", country: "Italy", aliases: ["말펜사", "밀라노", "マルペンサ", "马尔彭萨", "malpensa", "milan", "milano"] },
  { code: "VCE", name: "Venice Marco Polo", city: "Venice", country: "Italy", aliases: ["베네치아", "ベネチア", "威尼斯", "venice", "venezia", "marco polo"] },
  { code: "BCN", name: "Barcelona–El Prat", city: "Barcelona", country: "Spain", aliases: ["바르셀로나", "バルセロナ", "巴塞罗那", "barcelona", "el prat"] },
  { code: "MAD", name: "Madrid–Barajas", city: "Madrid", country: "Spain", aliases: ["마드리드", "マドリード", "马德里", "madrid", "barajas"] },
  { code: "LIS", name: "Humberto Delgado", city: "Lisbon", country: "Portugal", aliases: ["리스본", "リスボン", "里斯本", "lisbon", "lisboa"] },
  { code: "ATH", name: "Athens Eleftherios Venizelos", city: "Athens", country: "Greece", aliases: ["아테네", "アテネ", "雅典", "athens"] },
  { code: "PRG", name: "Václav Havel (Prague)", city: "Prague", country: "Czechia", aliases: ["프라하", "プラハ", "布拉格", "prague", "praha"] },
  { code: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden", aliases: ["스톡홀름", "ストックホルム", "斯德哥尔摩", "stockholm", "arlanda"] },
  { code: "CPH", name: "Copenhagen", city: "Copenhagen", country: "Denmark", aliases: ["코펜하겐", "コペンハーゲン", "哥本哈根", "copenhagen", "københavn"] },
  { code: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway", aliases: ["오슬로", "オスロ", "奥斯陆", "oslo", "gardermoen"] },
  { code: "HEL", name: "Helsinki-Vantaa", city: "Helsinki", country: "Finland", aliases: ["헬싱키", "ヘルシンキ", "赫尔辛基", "helsinki"] },
  { code: "KEF", name: "Keflavik (Reykjavik)", city: "Reykjavik", country: "Iceland", aliases: ["케플라비크", "레이캬비크", "ケプラヴィーク", "凯夫拉维克", "keflavik", "reykjavik"] },
  { code: "DUB", name: "Dublin", city: "Dublin", country: "Ireland", aliases: ["더블린", "ダブリン", "都柏林", "dublin"] },
  { code: "WAW", name: "Warsaw Chopin", city: "Warsaw", country: "Poland", aliases: ["바르샤바", "ワルシャワ", "华沙", "warsaw", "warszawa"] },
  { code: "BUD", name: "Budapest Ferenc Liszt", city: "Budapest", country: "Hungary", aliases: ["부다페스트", "ブダペスト", "布达佩斯", "budapest"] },

  // ─── Americas ───
  { code: "JFK", name: "John F. Kennedy", city: "New York", country: "United States", aliases: ["존에프케네디", "ニューヨーク", "肯尼迪", "jfk", "kennedy", "new york"] },
  { code: "LGA", name: "LaGuardia", city: "New York", country: "United States", aliases: ["라과디아", "ラガーディア", "拉瓜迪亚", "laguardia"] },
  { code: "EWR", name: "Newark Liberty", city: "New York", country: "United States", aliases: ["뉴어크", "ニューアーク", "纽瓦克", "newark"] },
  { code: "LAX", name: "Los Angeles Intl", city: "Los Angeles", country: "United States", aliases: ["로스앤젤레스", "ロサンゼルス", "洛杉矶", "lax", "los angeles"] },
  { code: "SFO", name: "San Francisco Intl", city: "San Francisco", country: "United States", aliases: ["샌프란시스코", "サンフランシスコ", "旧金山", "sfo", "san francisco"] },
  { code: "ORD", name: "Chicago O'Hare", city: "Chicago", country: "United States", aliases: ["오헤어", "시카고", "オヘア", "奥黑尔", "ohare", "chicago"] },
  { code: "BOS", name: "Boston Logan", city: "Boston", country: "United States", aliases: ["보스턴", "ボストン", "波士顿", "boston", "logan"] },
  { code: "MIA", name: "Miami Intl", city: "Miami", country: "United States", aliases: ["마이애미", "マイアミ", "迈阿密", "miami"] },
  { code: "SEA", name: "Seattle-Tacoma", city: "Seattle", country: "United States", aliases: ["시애틀", "シアトル", "西雅图", "seattle", "tacoma"] },
  { code: "DFW", name: "Dallas/Fort Worth", city: "Dallas", country: "United States", aliases: ["댈러스", "ダラス", "达拉斯", "dallas", "fort worth"] },
  { code: "ATL", name: "Atlanta", city: "Atlanta", country: "United States", aliases: ["애틀랜타", "アトランタ", "亚特兰大", "atlanta"] },
  { code: "DEN", name: "Denver Intl", city: "Denver", country: "United States", aliases: ["덴버", "デンバー", "丹佛", "denver"] },
  { code: "LAS", name: "Las Vegas (Harry Reid)", city: "Las Vegas", country: "United States", aliases: ["라스베이거스", "ラスベガス", "拉斯维加斯", "las vegas"] },
  { code: "HNL", name: "Honolulu (Daniel K. Inouye)", city: "Honolulu", country: "United States", aliases: ["호놀룰루", "ホノルル", "檀香山", "honolulu", "hawaii"] },
  { code: "YVR", name: "Vancouver Intl", city: "Vancouver", country: "Canada", aliases: ["밴쿠버", "バンクーバー", "温哥华", "vancouver"] },
  { code: "YYZ", name: "Toronto Pearson", city: "Toronto", country: "Canada", aliases: ["토론토", "トロント", "多伦多", "toronto", "pearson"] },
  { code: "YUL", name: "Montreal Trudeau", city: "Montreal", country: "Canada", aliases: ["몬트리올", "モントリオール", "蒙特利尔", "montreal"] },
  { code: "MEX", name: "Mexico City Intl", city: "Mexico City", country: "Mexico", aliases: ["멕시코시티", "メキシコシティ", "墨西哥城", "mexico city"] },
  { code: "CUN", name: "Cancun Intl", city: "Cancun", country: "Mexico", aliases: ["칸쿤", "カンクン", "坎昆", "cancun"] },
  { code: "GRU", name: "Sao Paulo Guarulhos", city: "São Paulo", country: "Brazil", aliases: ["상파울루", "サンパウロ", "圣保罗", "sao paulo", "guarulhos"] },
  { code: "GIG", name: "Rio de Janeiro Galeao", city: "Rio de Janeiro", country: "Brazil", aliases: ["리우데자네이루", "リオ", "里约", "rio", "galeao"] },
  { code: "EZE", name: "Buenos Aires Ezeiza", city: "Buenos Aires", country: "Argentina", aliases: ["부에노스아이레스", "ブエノスアイレス", "布宜诺斯艾利斯", "buenos aires", "ezeiza"] },
  { code: "SCL", name: "Santiago de Chile", city: "Santiago", country: "Chile", aliases: ["산티아고", "サンティアゴ", "圣地亚哥", "santiago"] },
  { code: "LIM", name: "Lima Jorge Chavez", city: "Lima", country: "Peru", aliases: ["리마", "リマ", "利马", "lima", "jorge chavez"] },
  { code: "CUZ", name: "Cusco Alejandro Velasco", city: "Cusco", country: "Peru", aliases: ["쿠스코", "クスコ", "库斯科", "cusco"] },
  { code: "BOG", name: "Bogota El Dorado", city: "Bogotá", country: "Colombia", aliases: ["보고타", "ボゴタ", "波哥大", "bogota", "el dorado"] },

  // ─── Oceania ───
  { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia", aliases: ["시드니", "シドニー", "悉尼", "sydney"] },
  { code: "MEL", name: "Melbourne Tullamarine", city: "Melbourne", country: "Australia", aliases: ["멜버른", "メルボルン", "墨尔本", "melbourne"] },
  { code: "BNE", name: "Brisbane", city: "Brisbane", country: "Australia", aliases: ["브리즈번", "ブリスベン", "布里斯班", "brisbane"] },
  { code: "AKL", name: "Auckland", city: "Auckland", country: "New Zealand", aliases: ["오클랜드", "オークランド", "奥克兰", "auckland"] },

  // ─── Africa ───
  { code: "CAI", name: "Cairo Intl", city: "Cairo", country: "Egypt", aliases: ["카이로", "カイロ", "开罗", "cairo"] },
  { code: "JNB", name: "OR Tambo (Johannesburg)", city: "Johannesburg", country: "South Africa", aliases: ["요하네스버그", "ヨハネスブルク", "约翰内斯堡", "johannesburg", "or tambo"] },
  { code: "CPT", name: "Cape Town Intl", city: "Cape Town", country: "South Africa", aliases: ["케이프타운", "ケープタウン", "开普敦", "cape town"] },
  { code: "NBO", name: "Nairobi Jomo Kenyatta", city: "Nairobi", country: "Kenya", aliases: ["나이로비", "ナイロビ", "内罗毕", "nairobi"] },
  { code: "CMN", name: "Casablanca Mohammed V", city: "Casablanca", country: "Morocco", aliases: ["카사블랑카", "カサブランカ", "卡萨布兰卡", "casablanca"] },
];

/**
 * Search airports. Matches IATA code (exact), name (prefix), city, country,
 * or any alias (including non-Latin scripts). Returns up to `limit` results
 * scored by match strength.
 */
export function searchAirports(query: string, limit = 6): AirportOption[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];

  type Scored = { airport: AirportOption; score: number };
  const scored: Scored[] = [];

  for (const a of AIRPORTS) {
    const codeMatch = a.code.toLowerCase() === q;
    const codePrefix = a.code.toLowerCase().startsWith(q);
    const namePrefix = a.name.toLowerCase().startsWith(q);
    const cityPrefix = a.city.toLowerCase().startsWith(q);
    const cityIncludes = a.city.toLowerCase().includes(q);
    const countryPrefix = a.country.toLowerCase().startsWith(q);
    const aliasMatch = a.aliases.some((al) =>
      al.toLowerCase().includes(q),
    );

    let score = 0;
    if (codeMatch) score = 100;
    else if (codePrefix) score = 80;
    else if (namePrefix) score = 60;
    else if (cityPrefix) score = 50;
    else if (cityIncludes) score = 30;
    else if (countryPrefix) score = 20;
    else if (aliasMatch) score = 40;

    if (score > 0) scored.push({ airport: a, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.airport);
}
