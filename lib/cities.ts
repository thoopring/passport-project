/**
 * Curated city list used by the destination autocomplete in the home wizard.
 * Trust-builder: when users see their city in the dropdown they know it's
 * supported. Curated rather than "every city in the world" so we control
 * the experience and don't promise quality on towns we haven't tested.
 *
 * Each entry has ASCII alternatives in `aliases` so users typing "tokyo"
 * find "도쿄" / "東京" matches and vice versa.
 */

export interface CityOption {
  /** Canonical English name shown in the dropdown. */
  name: string;
  /** Country (English). Shown as secondary line. */
  country: string;
  /** Search aliases — Korean, Japanese, Chinese, French, lowercase variants. */
  aliases: string[];
  /** Region grouping for occasional UI grouping. */
  region: "asia" | "europe" | "americas" | "oceania" | "africa" | "middle-east";
}

export const CITIES: CityOption[] = [
  // ─── East Asia ───
  { name: "Tokyo", country: "Japan", aliases: ["도쿄", "東京", "东京", "tokyo"], region: "asia" },
  { name: "Osaka", country: "Japan", aliases: ["오사카", "大阪", "osaka"], region: "asia" },
  { name: "Kyoto", country: "Japan", aliases: ["교토", "京都", "kyoto"], region: "asia" },
  { name: "Sapporo", country: "Japan", aliases: ["삿포로", "札幌", "sapporo"], region: "asia" },
  { name: "Fukuoka", country: "Japan", aliases: ["후쿠오카", "福岡", "fukuoka"], region: "asia" },
  { name: "Okinawa", country: "Japan", aliases: ["오키나와", "沖縄", "okinawa"], region: "asia" },
  { name: "Nagoya", country: "Japan", aliases: ["나고야", "名古屋", "nagoya"], region: "asia" },
  { name: "Hiroshima", country: "Japan", aliases: ["히로시마", "広島", "hiroshima"], region: "asia" },
  { name: "Seoul", country: "South Korea", aliases: ["서울", "首爾", "seoul"], region: "asia" },
  { name: "Busan", country: "South Korea", aliases: ["부산", "釜山", "busan"], region: "asia" },
  { name: "Jeju", country: "South Korea", aliases: ["제주", "濟州", "jeju"], region: "asia" },
  { name: "Beijing", country: "China", aliases: ["베이징", "北京", "beijing", "北京市"], region: "asia" },
  { name: "Shanghai", country: "China", aliases: ["상하이", "上海", "shanghai"], region: "asia" },
  { name: "Hong Kong", country: "Hong Kong", aliases: ["홍콩", "香港", "hong kong", "hongkong"], region: "asia" },
  { name: "Taipei", country: "Taiwan", aliases: ["타이베이", "台北", "타이페이", "taipei"], region: "asia" },
  { name: "Macau", country: "Macau", aliases: ["마카오", "澳門", "macau", "macao"], region: "asia" },

  // ─── Southeast Asia ───
  { name: "Bangkok", country: "Thailand", aliases: ["방콕", "曼谷", "バンコク", "bangkok"], region: "asia" },
  { name: "Chiang Mai", country: "Thailand", aliases: ["치앙마이", "清邁", "chiangmai", "chiang mai"], region: "asia" },
  { name: "Phuket", country: "Thailand", aliases: ["푸켓", "普吉", "phuket"], region: "asia" },
  { name: "Krabi", country: "Thailand", aliases: ["끄라비", "krabi"], region: "asia" },
  { name: "Pattaya", country: "Thailand", aliases: ["파타야", "pattaya"], region: "asia" },
  { name: "Singapore", country: "Singapore", aliases: ["싱가포르", "新加坡", "singapore"], region: "asia" },
  { name: "Kuala Lumpur", country: "Malaysia", aliases: ["쿠알라룸푸르", "吉隆坡", "kuala lumpur", "kl"], region: "asia" },
  { name: "Penang", country: "Malaysia", aliases: ["페낭", "檳城", "penang"], region: "asia" },
  { name: "Bali", country: "Indonesia", aliases: ["발리", "巴厘島", "bali"], region: "asia" },
  { name: "Jakarta", country: "Indonesia", aliases: ["자카르타", "雅加達", "jakarta"], region: "asia" },
  { name: "Yogyakarta", country: "Indonesia", aliases: ["욕야카르타", "日惹", "yogyakarta", "jogja"], region: "asia" },
  { name: "Hanoi", country: "Vietnam", aliases: ["하노이", "河內", "hanoi"], region: "asia" },
  { name: "Ho Chi Minh City", country: "Vietnam", aliases: ["호치민", "胡志明市", "saigon", "ho chi minh"], region: "asia" },
  { name: "Da Nang", country: "Vietnam", aliases: ["다낭", "峴港", "da nang", "danang"], region: "asia" },
  { name: "Hoi An", country: "Vietnam", aliases: ["호이안", "會安", "hoi an", "hoian"], region: "asia" },
  { name: "Manila", country: "Philippines", aliases: ["마닐라", "馬尼拉", "manila"], region: "asia" },
  { name: "Cebu", country: "Philippines", aliases: ["세부", "宿霧", "cebu"], region: "asia" },
  { name: "Boracay", country: "Philippines", aliases: ["보라카이", "長灘島", "boracay"], region: "asia" },
  { name: "Siem Reap", country: "Cambodia", aliases: ["씨엠립", "暹粒", "siem reap"], region: "asia" },
  { name: "Phnom Penh", country: "Cambodia", aliases: ["프놈펜", "金邊", "phnom penh"], region: "asia" },
  { name: "Vientiane", country: "Laos", aliases: ["비엔티안", "永珍", "vientiane"], region: "asia" },
  { name: "Yangon", country: "Myanmar", aliases: ["양곤", "仰光", "yangon"], region: "asia" },

  // ─── South Asia ───
  { name: "Mumbai", country: "India", aliases: ["뭄바이", "孟買", "mumbai", "bombay"], region: "asia" },
  { name: "Delhi", country: "India", aliases: ["델리", "德里", "delhi", "new delhi"], region: "asia" },
  { name: "Jaipur", country: "India", aliases: ["자이푸르", "齋浦爾", "jaipur"], region: "asia" },
  { name: "Goa", country: "India", aliases: ["고아", "果阿", "goa"], region: "asia" },
  { name: "Bengaluru", country: "India", aliases: ["벵갈루루", "邦加羅爾", "bangalore", "bengaluru"], region: "asia" },
  { name: "Kathmandu", country: "Nepal", aliases: ["카트만두", "加德滿都", "kathmandu"], region: "asia" },
  { name: "Colombo", country: "Sri Lanka", aliases: ["콜롬보", "可倫坡", "colombo"], region: "asia" },
  { name: "Malé", country: "Maldives", aliases: ["말레", "馬累", "male", "malé"], region: "asia" },

  // ─── Europe ───
  { name: "Paris", country: "France", aliases: ["파리", "巴黎", "パリ", "paris"], region: "europe" },
  { name: "Nice", country: "France", aliases: ["니스", "尼斯", "nice"], region: "europe" },
  { name: "Lyon", country: "France", aliases: ["리옹", "里昂", "lyon"], region: "europe" },
  { name: "Marseille", country: "France", aliases: ["마르세유", "馬賽", "marseille"], region: "europe" },
  { name: "Bordeaux", country: "France", aliases: ["보르도", "波爾多", "bordeaux"], region: "europe" },
  { name: "London", country: "United Kingdom", aliases: ["런던", "倫敦", "ロンドン", "londres", "london"], region: "europe" },
  { name: "Edinburgh", country: "United Kingdom", aliases: ["에든버러", "愛丁堡", "edinburgh"], region: "europe" },
  { name: "Dublin", country: "Ireland", aliases: ["더블린", "都柏林", "dublin"], region: "europe" },
  { name: "Rome", country: "Italy", aliases: ["로마", "羅馬", "ローマ", "rome", "roma"], region: "europe" },
  { name: "Florence", country: "Italy", aliases: ["피렌체", "佛羅倫斯", "florence", "firenze"], region: "europe" },
  { name: "Venice", country: "Italy", aliases: ["베네치아", "威尼斯", "venice", "venezia"], region: "europe" },
  { name: "Milan", country: "Italy", aliases: ["밀라노", "米蘭", "milan", "milano"], region: "europe" },
  { name: "Naples", country: "Italy", aliases: ["나폴리", "那不勒斯", "naples", "napoli"], region: "europe" },
  { name: "Cinque Terre", country: "Italy", aliases: ["친퀘테레", "五漁村", "cinque terre"], region: "europe" },
  { name: "Barcelona", country: "Spain", aliases: ["바르셀로나", "巴塞羅那", "バルセロナ", "barcelona"], region: "europe" },
  { name: "Madrid", country: "Spain", aliases: ["마드리드", "馬德里", "madrid"], region: "europe" },
  { name: "Seville", country: "Spain", aliases: ["세비야", "塞維亞", "seville", "sevilla"], region: "europe" },
  { name: "Granada", country: "Spain", aliases: ["그라나다", "格拉納達", "granada"], region: "europe" },
  { name: "Lisbon", country: "Portugal", aliases: ["리스본", "里斯本", "lisbon", "lisboa"], region: "europe" },
  { name: "Porto", country: "Portugal", aliases: ["포르토", "波爾圖", "porto"], region: "europe" },
  { name: "Berlin", country: "Germany", aliases: ["베를린", "柏林", "berlin"], region: "europe" },
  { name: "Munich", country: "Germany", aliases: ["뮌헨", "慕尼黑", "munich", "münchen"], region: "europe" },
  { name: "Frankfurt", country: "Germany", aliases: ["프랑크푸르트", "法蘭克福", "frankfurt"], region: "europe" },
  { name: "Hamburg", country: "Germany", aliases: ["함부르크", "漢堡", "hamburg"], region: "europe" },
  { name: "Amsterdam", country: "Netherlands", aliases: ["암스테르담", "阿姆斯特丹", "amsterdam"], region: "europe" },
  { name: "Brussels", country: "Belgium", aliases: ["브뤼셀", "布魯塞爾", "brussels", "bruxelles"], region: "europe" },
  { name: "Vienna", country: "Austria", aliases: ["빈", "維也納", "vienna", "wien"], region: "europe" },
  { name: "Salzburg", country: "Austria", aliases: ["잘츠부르크", "薩爾茨堡", "salzburg"], region: "europe" },
  { name: "Zurich", country: "Switzerland", aliases: ["취리히", "蘇黎世", "zurich", "zürich"], region: "europe" },
  { name: "Geneva", country: "Switzerland", aliases: ["제네바", "日內瓦", "geneva", "genève"], region: "europe" },
  { name: "Interlaken", country: "Switzerland", aliases: ["인터라켄", "interlaken"], region: "europe" },
  { name: "Prague", country: "Czech Republic", aliases: ["프라하", "布拉格", "prague", "praha"], region: "europe" },
  { name: "Budapest", country: "Hungary", aliases: ["부다페스트", "布達佩斯", "budapest"], region: "europe" },
  { name: "Krakow", country: "Poland", aliases: ["크라쿠프", "克拉科夫", "krakow", "kraków"], region: "europe" },
  { name: "Warsaw", country: "Poland", aliases: ["바르샤바", "華沙", "warsaw"], region: "europe" },
  { name: "Copenhagen", country: "Denmark", aliases: ["코펜하겐", "哥本哈根", "copenhagen", "københavn"], region: "europe" },
  { name: "Stockholm", country: "Sweden", aliases: ["스톡홀름", "斯德哥爾摩", "stockholm"], region: "europe" },
  { name: "Oslo", country: "Norway", aliases: ["오슬로", "奧斯陸", "oslo"], region: "europe" },
  { name: "Bergen", country: "Norway", aliases: ["베르겐", "卑爾根", "bergen"], region: "europe" },
  { name: "Helsinki", country: "Finland", aliases: ["헬싱키", "赫爾辛基", "helsinki"], region: "europe" },
  { name: "Reykjavik", country: "Iceland", aliases: ["레이캬비크", "雷克雅維克", "reykjavik", "reykjavík"], region: "europe" },
  { name: "Athens", country: "Greece", aliases: ["아테네", "雅典", "athens", "athína"], region: "europe" },
  { name: "Santorini", country: "Greece", aliases: ["산토리니", "聖托里尼", "santorini"], region: "europe" },
  { name: "Mykonos", country: "Greece", aliases: ["미코노스", "米科諾斯", "mykonos"], region: "europe" },
  { name: "Istanbul", country: "Turkey", aliases: ["이스탄불", "伊斯坦堡", "istanbul"], region: "europe" },
  { name: "Cappadocia", country: "Turkey", aliases: ["카파도키아", "卡帕多奇亞", "cappadocia"], region: "europe" },
  { name: "Dubrovnik", country: "Croatia", aliases: ["두브로브니크", "杜布羅夫尼克", "dubrovnik"], region: "europe" },
  { name: "Split", country: "Croatia", aliases: ["스플리트", "斯普利特", "split"], region: "europe" },

  // ─── Americas ───
  { name: "New York", country: "United States", aliases: ["뉴욕", "紐約", "ニューヨーク", "new york", "nyc"], region: "americas" },
  { name: "Los Angeles", country: "United States", aliases: ["로스앤젤레스", "洛杉磯", "los angeles", "la"], region: "americas" },
  { name: "San Francisco", country: "United States", aliases: ["샌프란시스코", "舊金山", "san francisco", "sf"], region: "americas" },
  { name: "Las Vegas", country: "United States", aliases: ["라스베이거스", "拉斯維加斯", "las vegas", "vegas"], region: "americas" },
  { name: "Honolulu", country: "United States", aliases: ["호놀룰루", "檀香山", "honolulu", "hawaii"], region: "americas" },
  { name: "Maui", country: "United States", aliases: ["마우이", "茂宜島", "maui"], region: "americas" },
  { name: "Chicago", country: "United States", aliases: ["시카고", "芝加哥", "chicago"], region: "americas" },
  { name: "Miami", country: "United States", aliases: ["마이애미", "邁阿密", "miami"], region: "americas" },
  { name: "Seattle", country: "United States", aliases: ["시애틀", "西雅圖", "seattle"], region: "americas" },
  { name: "Boston", country: "United States", aliases: ["보스턴", "波士頓", "boston"], region: "americas" },
  { name: "Washington D.C.", country: "United States", aliases: ["워싱턴", "華盛頓", "washington", "dc"], region: "americas" },
  { name: "New Orleans", country: "United States", aliases: ["뉴올리언스", "紐奧良", "new orleans"], region: "americas" },
  { name: "Toronto", country: "Canada", aliases: ["토론토", "多倫多", "toronto"], region: "americas" },
  { name: "Vancouver", country: "Canada", aliases: ["밴쿠버", "溫哥華", "vancouver"], region: "americas" },
  { name: "Montreal", country: "Canada", aliases: ["몬트리올", "蒙特利爾", "montreal", "montréal"], region: "americas" },
  { name: "Quebec City", country: "Canada", aliases: ["퀘벡시티", "魁北克市", "quebec", "québec"], region: "americas" },
  { name: "Mexico City", country: "Mexico", aliases: ["멕시코시티", "墨西哥城", "mexico city", "ciudad de méxico"], region: "americas" },
  { name: "Cancun", country: "Mexico", aliases: ["칸쿤", "坎昆", "cancun", "cancún"], region: "americas" },
  { name: "Tulum", country: "Mexico", aliases: ["툴룸", "圖盧姆", "tulum"], region: "americas" },
  { name: "Havana", country: "Cuba", aliases: ["아바나", "哈瓦那", "havana", "habana"], region: "americas" },
  { name: "Rio de Janeiro", country: "Brazil", aliases: ["리우데자네이루", "里約熱內盧", "rio de janeiro", "rio"], region: "americas" },
  { name: "São Paulo", country: "Brazil", aliases: ["상파울루", "聖保羅", "são paulo", "sao paulo"], region: "americas" },
  { name: "Buenos Aires", country: "Argentina", aliases: ["부에노스아이레스", "布宜諾斯艾利斯", "buenos aires"], region: "americas" },
  { name: "Patagonia", country: "Argentina", aliases: ["파타고니아", "巴塔哥尼亞", "patagonia"], region: "americas" },
  { name: "Lima", country: "Peru", aliases: ["리마", "利馬", "lima"], region: "americas" },
  { name: "Cusco", country: "Peru", aliases: ["쿠스코", "庫斯科", "cusco"], region: "americas" },
  { name: "Machu Picchu", country: "Peru", aliases: ["마추픽추", "馬丘比丘", "machu picchu"], region: "americas" },
  { name: "Santiago", country: "Chile", aliases: ["산티아고", "聖地亞哥", "santiago"], region: "americas" },
  { name: "Bogota", country: "Colombia", aliases: ["보고타", "波哥大", "bogota", "bogotá"], region: "americas" },
  { name: "Cartagena", country: "Colombia", aliases: ["카르타헤나", "卡塔赫納", "cartagena"], region: "americas" },

  // ─── Oceania ───
  { name: "Sydney", country: "Australia", aliases: ["시드니", "悉尼", "sydney"], region: "oceania" },
  { name: "Melbourne", country: "Australia", aliases: ["멜버른", "墨爾本", "melbourne"], region: "oceania" },
  { name: "Brisbane", country: "Australia", aliases: ["브리즈번", "布里斯班", "brisbane"], region: "oceania" },
  { name: "Gold Coast", country: "Australia", aliases: ["골드코스트", "黃金海岸", "gold coast"], region: "oceania" },
  { name: "Cairns", country: "Australia", aliases: ["케언스", "凱恩斯", "cairns"], region: "oceania" },
  { name: "Perth", country: "Australia", aliases: ["퍼스", "珀斯", "perth"], region: "oceania" },
  { name: "Auckland", country: "New Zealand", aliases: ["오클랜드", "奧克蘭", "auckland"], region: "oceania" },
  { name: "Queenstown", country: "New Zealand", aliases: ["퀸스타운", "皇后鎮", "queenstown"], region: "oceania" },
  { name: "Wellington", country: "New Zealand", aliases: ["웰링턴", "惠靈頓", "wellington"], region: "oceania" },
  { name: "Fiji", country: "Fiji", aliases: ["피지", "斐濟", "fiji"], region: "oceania" },

  // ─── Middle East / Africa ───
  { name: "Dubai", country: "United Arab Emirates", aliases: ["두바이", "杜拜", "dubai"], region: "middle-east" },
  { name: "Abu Dhabi", country: "United Arab Emirates", aliases: ["아부다비", "阿布達比", "abu dhabi"], region: "middle-east" },
  { name: "Doha", country: "Qatar", aliases: ["도하", "多哈", "doha"], region: "middle-east" },
  { name: "Tel Aviv", country: "Israel", aliases: ["텔아비브", "特拉維夫", "tel aviv"], region: "middle-east" },
  { name: "Jerusalem", country: "Israel", aliases: ["예루살렘", "耶路撒冷", "jerusalem"], region: "middle-east" },
  { name: "Petra", country: "Jordan", aliases: ["페트라", "佩特拉", "petra"], region: "middle-east" },
  { name: "Cairo", country: "Egypt", aliases: ["카이로", "開羅", "cairo"], region: "africa" },
  { name: "Marrakech", country: "Morocco", aliases: ["마라케시", "馬拉喀什", "marrakech", "marrakesh"], region: "africa" },
  { name: "Casablanca", country: "Morocco", aliases: ["카사블랑카", "卡薩布蘭卡", "casablanca"], region: "africa" },
  { name: "Cape Town", country: "South Africa", aliases: ["케이프타운", "開普敦", "cape town"], region: "africa" },
  { name: "Nairobi", country: "Kenya", aliases: ["나이로비", "奈洛比", "nairobi"], region: "africa" },
  { name: "Zanzibar", country: "Tanzania", aliases: ["잔지바르", "桑給巴爾", "zanzibar"], region: "africa" },
];

/**
 * Country names per locale. Only most-common destinations get full coverage;
 * rest fall back to English. Adding a country here is a one-line addition.
 */
const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  Japan: { ko: "일본", ja: "日本", zh: "日本", fr: "Japon" },
  "South Korea": { ko: "대한민국", ja: "韓国", zh: "韩国", fr: "Corée du Sud" },
  China: { ko: "중국", ja: "中国", zh: "中国", fr: "Chine" },
  "Hong Kong": { ko: "홍콩", ja: "香港", zh: "香港", fr: "Hong Kong" },
  Taiwan: { ko: "대만", ja: "台湾", zh: "台湾", fr: "Taïwan" },
  Macau: { ko: "마카오", ja: "マカオ", zh: "澳门", fr: "Macao" },
  Thailand: { ko: "태국", ja: "タイ", zh: "泰国", fr: "Thaïlande" },
  Singapore: { ko: "싱가포르", ja: "シンガポール", zh: "新加坡", fr: "Singapour" },
  Malaysia: { ko: "말레이시아", ja: "マレーシア", zh: "马来西亚", fr: "Malaisie" },
  Indonesia: { ko: "인도네시아", ja: "インドネシア", zh: "印度尼西亚", fr: "Indonésie" },
  Vietnam: { ko: "베트남", ja: "ベトナム", zh: "越南", fr: "Vietnam" },
  Philippines: { ko: "필리핀", ja: "フィリピン", zh: "菲律宾", fr: "Philippines" },
  Cambodia: { ko: "캄보디아", ja: "カンボジア", zh: "柬埔寨", fr: "Cambodge" },
  Laos: { ko: "라오스", ja: "ラオス", zh: "老挝", fr: "Laos" },
  Myanmar: { ko: "미얀마", ja: "ミャンマー", zh: "缅甸", fr: "Myanmar" },
  India: { ko: "인도", ja: "インド", zh: "印度", fr: "Inde" },
  Nepal: { ko: "네팔", ja: "ネパール", zh: "尼泊尔", fr: "Népal" },
  "Sri Lanka": { ko: "스리랑카", ja: "スリランカ", zh: "斯里兰卡", fr: "Sri Lanka" },
  Maldives: { ko: "몰디브", ja: "モルディブ", zh: "马尔代夫", fr: "Maldives" },
  France: { ko: "프랑스", ja: "フランス", zh: "法国", fr: "France" },
  "United Kingdom": { ko: "영국", ja: "イギリス", zh: "英国", fr: "Royaume-Uni" },
  Ireland: { ko: "아일랜드", ja: "アイルランド", zh: "爱尔兰", fr: "Irlande" },
  Italy: { ko: "이탈리아", ja: "イタリア", zh: "意大利", fr: "Italie" },
  Spain: { ko: "스페인", ja: "スペイン", zh: "西班牙", fr: "Espagne" },
  Portugal: { ko: "포르투갈", ja: "ポルトガル", zh: "葡萄牙", fr: "Portugal" },
  Germany: { ko: "독일", ja: "ドイツ", zh: "德国", fr: "Allemagne" },
  Netherlands: { ko: "네덜란드", ja: "オランダ", zh: "荷兰", fr: "Pays-Bas" },
  Belgium: { ko: "벨기에", ja: "ベルギー", zh: "比利时", fr: "Belgique" },
  Austria: { ko: "오스트리아", ja: "オーストリア", zh: "奥地利", fr: "Autriche" },
  Switzerland: { ko: "스위스", ja: "スイス", zh: "瑞士", fr: "Suisse" },
  "Czech Republic": { ko: "체코", ja: "チェコ", zh: "捷克", fr: "République tchèque" },
  Hungary: { ko: "헝가리", ja: "ハンガリー", zh: "匈牙利", fr: "Hongrie" },
  Poland: { ko: "폴란드", ja: "ポーランド", zh: "波兰", fr: "Pologne" },
  Denmark: { ko: "덴마크", ja: "デンマーク", zh: "丹麦", fr: "Danemark" },
  Sweden: { ko: "스웨덴", ja: "スウェーデン", zh: "瑞典", fr: "Suède" },
  Norway: { ko: "노르웨이", ja: "ノルウェー", zh: "挪威", fr: "Norvège" },
  Finland: { ko: "핀란드", ja: "フィンランド", zh: "芬兰", fr: "Finlande" },
  Iceland: { ko: "아이슬란드", ja: "アイスランド", zh: "冰岛", fr: "Islande" },
  Greece: { ko: "그리스", ja: "ギリシャ", zh: "希腊", fr: "Grèce" },
  Turkey: { ko: "튀르키예", ja: "トルコ", zh: "土耳其", fr: "Turquie" },
  Croatia: { ko: "크로아티아", ja: "クロアチア", zh: "克罗地亚", fr: "Croatie" },
  "United States": { ko: "미국", ja: "アメリカ", zh: "美国", fr: "États-Unis" },
  Canada: { ko: "캐나다", ja: "カナダ", zh: "加拿大", fr: "Canada" },
  Mexico: { ko: "멕시코", ja: "メキシコ", zh: "墨西哥", fr: "Mexique" },
  Cuba: { ko: "쿠바", ja: "キューバ", zh: "古巴", fr: "Cuba" },
  Brazil: { ko: "브라질", ja: "ブラジル", zh: "巴西", fr: "Brésil" },
  Argentina: { ko: "아르헨티나", ja: "アルゼンチン", zh: "阿根廷", fr: "Argentine" },
  Peru: { ko: "페루", ja: "ペルー", zh: "秘鲁", fr: "Pérou" },
  Chile: { ko: "칠레", ja: "チリ", zh: "智利", fr: "Chili" },
  Colombia: { ko: "콜롬비아", ja: "コロンビア", zh: "哥伦比亚", fr: "Colombie" },
  Australia: { ko: "호주", ja: "オーストラリア", zh: "澳大利亚", fr: "Australie" },
  "New Zealand": { ko: "뉴질랜드", ja: "ニュージーランド", zh: "新西兰", fr: "Nouvelle-Zélande" },
  Fiji: { ko: "피지", ja: "フィジー", zh: "斐济", fr: "Fidji" },
  "United Arab Emirates": { ko: "아랍에미리트", ja: "アラブ首長国連邦", zh: "阿联酋", fr: "Émirats arabes unis" },
  Qatar: { ko: "카타르", ja: "カタール", zh: "卡塔尔", fr: "Qatar" },
  Israel: { ko: "이스라엘", ja: "イスラエル", zh: "以色列", fr: "Israël" },
  Jordan: { ko: "요르단", ja: "ヨルダン", zh: "约旦", fr: "Jordanie" },
  Egypt: { ko: "이집트", ja: "エジプト", zh: "埃及", fr: "Égypte" },
  Morocco: { ko: "모로코", ja: "モロッコ", zh: "摩洛哥", fr: "Maroc" },
  "South Africa": { ko: "남아프리카", ja: "南アフリカ", zh: "南非", fr: "Afrique du Sud" },
  Kenya: { ko: "케냐", ja: "ケニア", zh: "肯尼亚", fr: "Kenya" },
  Tanzania: { ko: "탄자니아", ja: "タンザニア", zh: "坦桑尼亚", fr: "Tanzanie" },
};

const HANGUL_RE = /[가-힯]/;
const KANA_RE = /[぀-ゟ゠-ヿ]/;
const CJK_RE = /[一-鿿]/;

/**
 * Locale-aware city name. Picks the alias matching the locale's script:
 *   ko → first alias containing Hangul
 *   ja → first alias with kana, else CJK ideographs (kanji shared with ZH)
 *   zh → first alias with CJK ideographs (no kana)
 *   en/fr → canonical English name
 *
 * Falls back to canonical EN if no script-matching alias found. This avoids
 * having to maintain 5 explicit name fields per city while still showing
 * users their native script in the dropdown.
 */
export function getCityDisplayName(
  city: CityOption,
  locale: "en" | "ko" | "ja" | "zh" | "fr",
): string {
  if (locale === "en" || locale === "fr") return city.name;
  for (const alias of city.aliases) {
    if (locale === "ko" && HANGUL_RE.test(alias)) return alias;
    if (locale === "ja" && KANA_RE.test(alias)) return alias;
    if (locale === "ja" && CJK_RE.test(alias) && !HANGUL_RE.test(alias)) return alias;
    if (locale === "zh" && CJK_RE.test(alias) && !KANA_RE.test(alias) && !HANGUL_RE.test(alias))
      return alias;
  }
  return city.name;
}

/**
 * Locale-aware country name. Looks up the curated COUNTRY_NAMES map; if the
 * locale-specific name is missing, returns the English canonical name.
 */
export function getCityDisplayCountry(
  city: CityOption,
  locale: "en" | "ko" | "ja" | "zh" | "fr",
): string {
  if (locale === "en") return city.country;
  return COUNTRY_NAMES[city.country]?.[locale] ?? city.country;
}

/**
 * Filter cities by a free-text query. Searches the canonical English name,
 * the country, and all aliases (lowercase, accent-insensitive). Returns the
 * top `limit` matches, prefix-matched first then substring.
 */
export function searchCities(query: string, limit = 8): CityOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const nq = norm(q);

  const prefixHits: CityOption[] = [];
  const containsHits: CityOption[] = [];

  for (const c of CITIES) {
    const haystacks = [c.name, c.country, ...c.aliases];
    let matched: "prefix" | "contains" | null = null;
    for (const h of haystacks) {
      const nh = norm(h);
      if (nh.startsWith(nq)) {
        matched = "prefix";
        break;
      }
      if (nh.includes(nq)) {
        matched = matched ?? "contains";
      }
    }
    if (matched === "prefix") prefixHits.push(c);
    else if (matched === "contains") containsHits.push(c);
    if (prefixHits.length + containsHits.length >= limit * 2) break;
  }

  return [...prefixHits, ...containsHits].slice(0, limit);
}
