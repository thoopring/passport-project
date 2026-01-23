// app/blog/data.ts

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  content: string; // HTML content
  category: string;
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  // --- 1. US Citizens Target ---
  'top-5-visa-free-countries-for-us-citizens-2026': {
    category: 'Destinations',
    title: 'Top 5 Visa-Free Countries for US Citizens in 2026 🇺🇸',
    date: '2026-01-23',
    excerpt: 'Holding a US passport is a superpower. Here are the best spots where you can just land and eat.',
    content: `
      <p class="lead">I get it. You want to travel, but you hate paperwork. Holding a US passport is a privilege, so let's use it. Here are my top 5 picks for 2026 where you can just show up.</p>
      <h2>1. Japan 🇯🇵 (90 Days)</h2>
      <p>Japan is still the king. The Yen is hovering around 145-150 to the Dollar. I spent a month there last spring and didn't break the bank.</p>
      <h2>2. Portugal 🇵🇹 (90 Days)</h2>
      <p>Lisbon is great, but head to Porto. A glass of Douro wine costs €4. You can enter through the e-gates, so no awkward convos with immigration.</p>
      <h2>3. South Korea 🇰🇷 (K-ETA Exempt!)</h2>
      <p>Good news: The K-ETA is temporarily exempted for US citizens in 2026. Seoul is safe, clean, and open 24/7.</p>
      <h2>4. Argentina 🇦🇷 (90 Days)</h2>
      <p>Steak dinner for $15? Yes, please. Buenos Aires feels like Paris but at 1/3 of the price. Bring cash (USD).</p>
      <h2>5. Singapore 🇸🇬 (90 Days)</h2>
      <p>It's pristine. Just fill out the SG Arrival Card (app) and go straight to Maxwell Food Centre.</p>
    `,
  },

  // --- 2. Visa Run Guide ---
  'thailand-cambodia-visa-run-guide-2026': {
    category: 'Visa Run',
    title: 'Ultimate Guide: Thailand to Cambodia Visa Run (2026) 🏃',
    date: '2026-01-22',
    excerpt: 'Is your Thai stamp dying? I did the Poipet run yesterday. Here is how not to get scammed.',
    content: `
      <p class="lead">My 60-day Thai stamp was expiring. So I took the bus to Poipet. Here is the truth.</p>
      <h2>The "Fake Consulate" Scam ⚠️</h2>
      <p>When you get off the bus in Aranyaprathet, men in blue shirts will point you to a fake "Visa Office". <strong>IGNORE THEM.</strong> Walk straight to the official immigration building.</p>
      <h2>The Real Cost</h2>
      <ul class="list-disc ml-5"><li>Cambodia Visa: $30 USD (plus 100-200 THB bribe usually).</li><li>Transport: Casino bus is only 300 THB.</li></ul>
    `,
  },

  // --- 3. Vietnam Info ---
  'vietnam-evisa-application-mistakes': {
    category: 'Guides',
    title: '5 Reasons Your Vietnam E-Visa Will Be Rejected 🚫',
    date: '2026-01-21',
    excerpt: 'I waited 7 days just to get rejected for a typo. Don\'t be like me.',
    content: `
      <p class="lead">Vietnam's E-visa is great, but their website is picky. One typo, and your vacation is ruined.</p>
      <h2>1. Name Order Disaster</h2>
      <p>In Vietnam, the name order is reversed. Type it EXACTLY as it appears on the bottom machine-readable zone of your passport.</p>
      <h2>2. Glasses in Photo 👓</h2>
      <p>I wore reading glasses in the upload. Rejected. The email just said "Bad Photo". Take them off!</p>
    `,
  },

  // --- 4. Digital Nomad ---
  'best-digital-nomad-visas-asia-2026': {
    category: 'Nomad Life',
    title: 'Best Digital Nomad Visas in Asia for 2026 💻',
    date: '2026-01-20',
    excerpt: 'Working from a cafe in Bali? Here are the legal ways to stay longer than 30 days.',
    content: `
      <p class="lead">Visa runs get old fast. I've lived in Asia for 4 years, and these are the best long-term visas.</p>
      <h2>1. Malaysia DE Rantau</h2>
      <p>Income req is $24k/year. You get a 12-month pass. KL has amazing internet speed.</p>
      <h2>2. Thailand DTV</h2>
      <p>The new Destination Thailand Visa gives you 5 years (180 days per entry). Game changer for nomads.</p>
    `,
  },

  // --- 5. Korean Target ---
  'hidden-visa-free-gems-for-koreans': {
    category: '한국인 여행',
    title: '한국인이라면 비자 없이 갈 수 있는 숨겨진 여행지 TOP 3 🇰🇷',
    date: '2026-01-19',
    excerpt: '남들 다 가는 일본 말고, 한국 여권만 있으면 프리패스인 이색 여행지.',
    content: `
      <p class="lead">한국 여권이 세계 2위인 건 아시죠? 한국인에게만 문을 활짝 열어준 이색 여행지를 소개합니다.</p>
      <h2>1. 키르기스스탄 (60일 무비자)</h2>
      <p>중앙아시아의 알프스. 물가는 한국의 절반인데 풍경은 스위스입니다.</p>
      <h2>2. 조지아 (365일 무비자)</h2>
      <p>1년 동안 비자 없이 살 수 있는 유일한 나라입니다. 와인 한 병에 5천 원!</p>
      <h2>3. 괌 & 사이판 (45일 무비자)</h2>
      <p>미국 본토는 ESTA가 필요하지만, 여기는 그냥 가도 됩니다.</p>
    `,
  },

  // --- 6. Funny Story ---
  'passport-photo-fails-real-story': {
    category: 'Funny Stories',
    title: 'Why My Passport Photo Got Rejected (Real Story) 📸',
    date: '2026-01-18',
    excerpt: 'I thought I looked cute. The immigration officer disagreed.',
    content: `
      <p class="lead">"Your bangs are covering 2% of your eyebrows." That is what the officer told me. Rejected.</p>
      <h2>The "Photoshop" Trap</h2>
      <p>I smoothed my skin slightly with an app. Biometric scanner flagged it. <strong>Do not use filters.</strong></p>
      <h2>The White Shirt Mistake</h2>
      <p>White shirt on white background = floating head. Automatic rejection. Wear black!</p>
    `,
  },

  // --- 7. Schengen Rule ---
  'schengen-90-180-rule-explained-pizza': {
    category: 'Must Know',
    title: 'The Schengen 90/180 Rule Explained with Pizza 🍕',
    date: '2026-01-17',
    excerpt: 'It is NOT "3 months per year". It is a rolling window. Do not get banned.',
    content: `
      <p class="lead">Imagine a pizza with 180 slices (days). You can only eat 90. But the pizza moves.</p>
      <h2>The Rolling Window</h2>
      <p>The 180-day period looks <strong>backwards</strong> from today. If you overstay even 1 day, fine is €500+. Use a calculator app!</p>
    `,
  },

  // --- 8. Hardest Visas ---
  'hardest-visas-to-get-in-the-world': {
    category: 'Interesting',
    title: 'Top 3 Hardest Visas to Get (Even for Strong Passports) 🔒',
    date: '2026-01-16',
    excerpt: 'North Korea is actually easier than #1 on this list.',
    content: `
      <p class="lead">Think your passport opens every door? Try getting into these.</p>
      <h2>1. Turkmenistan</h2>
      <p>Rejection rate is near 90%. You need a government invitation.</p>
      <h2>2. Equatorial Guinea</h2>
      <p>Unless you are an oil diplomat, good luck.</p>
    `,
  },

  // --- 9. Love & Visas ---
  'dating-a-foreigner-visa-guide': {
    category: 'Story',
    title: 'Dating a Foreigner? The Reality of "Love Visas" 💍',
    date: '2026-01-15',
    excerpt: 'So you fell in love in Bali. Now welcome to paperwork hell.',
    content: `
      <p class="lead">It starts with a sunset in Phuket. It ends with printing 500 pages of WhatsApp chats as proof.</p>
      <h2>The Solution: Third Countries</h2>
      <p>Instead of fighting for citizenship, meet in a "Neutral Country" like Thailand or Portugal where both are visa-free.</p>
    `,
  },

  // --- 10. Warning (KR) ---
  'damaged-passport-warning-stamps': {
    category: '긴급 경고',
    title: '[긴급] 여권에 "기념 스탬프" 찍었다가 출국 금지 당한 썰 😱',
    date: '2026-01-14',
    excerpt: '관광지 기념 도장, 여권에 절대 찍지 마세요. 입국 거부당합니다.',
    content: `
      <p class="lead">마추픽추나 대만 기차역 기념 도장. "추억이니까~" 하고 여권에 찍는 순간 여권은 <strong>폐기물</strong>이 됩니다.</p>
      <h2>실제 사례</h2>
      <p>베트남과 러시아에서 사증란 낙서/도장으로 입국 거부 및 강제 송환된 사례가 있습니다. 당장 재발급 받으세요.</p>
    `,
  },

  // --- 11. Passport Wars ---
  'passport-wars-korea-vs-usa': {
    category: 'Comparison',
    title: 'Passport Wars: South Korea 🇰🇷 vs USA 🇺🇸',
    date: '2026-01-13',
    excerpt: 'Who is stronger? The Eagle or the Tiger?',
    content: `
      <p class="lead">My friend (US citizen) and I (Korean) traveled together. He laughed at me... until Brazil.</p>
      <h2>The Brazil Incident</h2>
      <p>Koreans? Visa-free. Americans? Need a visa. 1:0 for Korea. Also, Koreans can use e-gates in the UK.</p>
    `,
  },

  // --- 12. Budget Tips ---
  'budget-backpacker-visa-guide': {
    category: 'Budget Travel',
    title: 'Surviving SE Asia on $500/Month: Visa Costs 🎒',
    date: '2026-01-12',
    excerpt: 'How to make your money last when visas cost $50 each.',
    content: `
      <p class="lead">Street food is $1, but visas are $50.</p>
      <h2>The Slow Travel Rule</h2>
      <p>Don't visit 4 countries in 1 month. That's $200 in visa fees. Pick ONE country (Vietnam) and stay for 90 days. You save money and actually see the culture.</p>
    `,
  },

  // --- 13. Foodie Visa ---
  'foodie-visa-guide-asia': {
    category: 'Food',
    title: 'I Applied for a Visa Just to Eat This Noodle 🍜',
    date: '2026-01-11',
    excerpt: 'Is a bowl of soup worth a $50 visa? Yes.',
    content: `
      <p class="lead">Some travel for history. I travel for lunch.</p>
      <h2>China (15-Day Visa Free!)</h2>
      <p>Go to Chengdu. Eat Hot Pot until you cry. It's life-changing.</p>
      <h2>India (E-Visa)</h2>
      <p>The website crashes, but the Butter Chicken in Delhi heals the soul.</p>
    `,
  },

  // --- 14. Nomad Dating ---
  'digital-nomad-dating-visa-love': {
    category: 'Gossip',
    title: 'Digital Nomad Dating: Which Country Has the Best Visa for Love? 💘',
    date: '2026-01-10',
    excerpt: 'Bali bros or Chiang Mai chill? Where to find your partner.',
    content: `
      <p class="lead">Let's be real. We are looking for connection.</p>
      <h2>Bali (Canggu)</h2>
      <p>High concentration of nomads. Cons: Traffic is horrendous. Dating scene is "transient".</p>
      <h2>Lisbon</h2>
      <p>Great for serious relationships. People stay longer on the D8 visa.</p>
    `,
  },

  // --- 15. Stamps Collection ---
  'coolest-passport-stamps-collection': {
    category: 'Collection',
    title: 'Most Beautiful Visa Stamps for Your Collection 🛂',
    date: '2026-01-09',
    excerpt: 'The Seychelle Coco de Mer stamp is legendary.',
    content: `
      <p class="lead">Digital visas are boring. We want ink!</p>
      <h2>Seychelles 🇸🇨</h2>
      <p>Their stamp is shaped like a "Coco de Mer" (butt-shaped coconut). It's iconic.</p>
      <h2>Antarctica 🇦🇶</h2>
      <p>Research stations stamp your passport with a penguin. (Warning: Stamp a separate book to be safe!).</p>
    `,
  },
};