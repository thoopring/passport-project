import type { LocaleTranslations } from "../i18n";

/**
 * Japanese translations for sample plans. Sparse-override structure;
 * fields that aren't text (coords, prices, structural data) inherit from
 * the base English plan in lib/samples/{slug}.ts.
 *
 * Coverage as of 2026-04-27:
 *   All 10 samples FULL — tagline + audience (gallery cards) + overview +
 *   days × stops + tips. tokyo / paris / seoul / bangkok / osaka /
 *   nyc / bali / taipei / hanoi / london.
 *
 * Tone: 丁寧な「です・ます」, service-friendly. Place names: 漢字 for
 * Japanese cities, カタカナ for foreign cities. Currency: 円 for Japan
 * domestic, native currency for foreign destinations.
 */
const ja: LocaleTranslations = {
  "tokyo-4d-couple": {
    tagline: "カップル4日間 — 神社、寿司、鎌倉の夕日まで。",
    audience: "カップル · ミドルレンジ",
    destination: "東京",
    destinationCountry: "日本",
    overview:
      "東京の象徴的な姿と、静かでロマンチックなひとときをバランスよく楽しめるカップル向け4日間プランです。毎日の朝と夜を記憶に残る食事で締めくくり、何百年も前の神社がネオンの街と共存する町並みをゆっくり歩き、ホテルの窓から残せる夕日で一日を終えます。",
    bestSeasonNote:
      "桜の3月末〜4月初旬、または紅葉の11月中旬がベストシーズン。ゴールデンウィーク(4月末〜5月初旬)は国内旅行客で価格と混雑が跳ね上がるため避けてください。",
    currencyTip:
      "日本は意外にも現金中心の国です。到着後すぐ7-ElevenのATMで3〜5万円ほどおろしておきましょう。小さな食堂や神社では海外カードより現金が確実に通ります。",
    languageTip:
      "Google翻訳のカメラモードでメニューがすぐ読めます。「すみません」と軽い挨拶ができれば、どこでも温かく迎えてもらえますよ。",
    emergencyNumber: "110(警察)、119(救急/消防)",
    hotel: {
      name: "ホテルグレイスリー新宿",
      area: "新宿",
      address: "東京都新宿区歌舞伎町1-19-1, 160-8466",
      rationale:
        "成田から4日間の旅行なら新宿が最適なベース。成田エクスプレスがホテルから徒歩6分の駅に到着し、必要なJRと地下鉄路線がすべてここから分岐します。夕食も徒歩圏内。エントランス上のゴジラの頭はおまけの楽しみ。",
      estimatedNightlyRate: "1泊 約14,000円",
    },
    airportTransit: {
      method: "成田エクスプレス(N'EX) → JR新宿駅",
      duration: "約80分",
      cost: "約3,500円(外国人向け往復割引あり)",
      instructions:
        "成田第1ターミナルで入国審査を終えたら、青い「JR」サインに沿って地下1階へ。JR EAST トラベルサービスセンターで外国人往復チケットを購入(パスポート必要)。新宿行きN'EXは終点なので、どの列車でも安心。新宿駅南口から歌舞伎町を抜けて徒歩6分の平坦な道。",
    },
    days: [
      {
        theme: "渋谷 & 原宿",
        summary: "東京で最も写真映えする2エリアを半日で巡り、夕暮れにあの有名なスクランブル交差点でフィニッシュ。",
        stops: [
          {
            name: "明治神宮",
            area: "渋谷",
            address: "東京都渋谷区代々木神園町1-1",
            duration: "1時間30分",
            description:
              "1920年にボランティア10万人が植えた70ヘクタールの森に囲まれた神社。鳥居をくぐり、玉砂利の参道に入った瞬間、都会の音が消えます。",
            estimatedCost: "無料",
            transitFromPrev: "新宿からJR山手線(4分)、原宿駅から徒歩5分",
          },
          {
            name: "竹下通り",
            area: "原宿",
            duration: "1時間",
            description:
              "東京のティーンファッションの震源地。買わなくても、虹色の綿菓子とクレープ屋が織り成す感覚の爆発は一度歩く価値あり。",
            estimatedCost: "おやつ約1,200円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "AFURI 原宿(柚子塩ラーメン)",
            area: "原宿",
            duration: "45分",
            description:
              "暑い日にぴったりの軽くて柑橘の香るラーメン。入口の券売機で食券を買ってカウンターに渡せば5分でずるずる。",
            estimatedCost: "約1,500円",
            transitFromPrev: "徒歩3分",
          },
          {
            name: "表参道",
            area: "表参道",
            duration: "1時間",
            description:
              "東京のシャンゼリゼ。安藤忠雄、ヘルツォーグ&ド・ムーロン、SANAAが手がけたフラッグシップが並ぶケヤキ並木。ウィンドウショッピングだけで建築散歩になります。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "渋谷スクランブル & ハチ公像",
            area: "渋谷",
            duration: "1時間",
            description:
              "世界一有名な交差点。一度自分で渡って、2階のスターバックスから例のポストカードショットを残しましょう。ハチ公への挨拶もお忘れなく。",
            estimatedCost: "無料(コーヒーを買うなら約600円)",
            transitFromPrev: "東京メトロ銀座線4分",
          },
          {
            name: "魚べい 渋谷道玄坂",
            area: "渋谷",
            duration: "1時間",
            description:
              "注文した寿司がミニ新幹線レールで席まで運ばれてくるハイテク回転寿司。クオリティ良し、楽しさも本物、二人で約4,500円でしっかりお腹いっぱい。",
            estimatedCost: "1人 約2,400円",
            bookingTip: "タブレット注文は英語対応。ピーク時は15〜20分待ち、券売機で名前登録してドリンクで一息。",
            transitFromPrev: "徒歩8分",
          },
        ],
      },
      {
        theme: "古い東京: 浅草 & 上野",
        summary: "下町で過ごす一日 — 歴史ある寺院、屋台の路地、東京最高の博物館クラスター。",
        stops: [
          {
            name: "浅草寺",
            area: "浅草",
            address: "東京都台東区浅草2-3-1",
            duration: "1時間30分",
            description:
              "東京最古の寺院(645年創建)。巨大な赤提灯の雷門をくぐり、仲見世商店街を抜けて本堂へ。10時前に到着すれば人混みなしで撮影可能。",
            estimatedCost: "無料",
            transitFromPrev: "渋谷から東京メトロ銀座線 → 浅草、約35分",
          },
          {
            name: "仲見世通り",
            area: "浅草",
            duration: "45分",
            description:
              "200メートルの屋台通り。人形焼き(人形型のカステラ)、煎餅、伝統工芸品が並びます。浅草九重の揚げまんじゅう(あんこを揚げたパン)が真理。",
            estimatedCost: "おやつ約1,000円",
            transitFromPrev: "組み込み",
          },
          {
            name: "大黒家天麩羅",
            area: "浅草",
            duration: "1時間",
            description:
              "130年の天麩羅老舗。天丼(ご飯の上の天麩羅)が濃厚で甘く、日本以外ではなかなか出会えない味。行列はありますが回転は早めです。",
            estimatedCost: "約2,200円",
            bookingTip: "予約不可。11時45分または14時に行けば行列が短め。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "東京国立博物館",
            area: "上野",
            address: "東京都台東区上野公園13-9",
            duration: "2時間",
            description:
              "日本最古かつ最大の博物館。他は飛ばして本館だけでOK。2階の侍の甲冑と刀ギャラリーは世界的水準。",
            estimatedCost: "約900円",
            transitFromPrev: "東京メトロ銀座線 浅草 → 上野、5分、徒歩10分",
          },
          {
            name: "上野公園散策",
            area: "上野",
            duration: "1時間",
            description:
              "東京初の公立公園。不忍池の周りを歩いて、小さな橋を渡り弁天堂まで。夏は蓮の花が満開。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "アメヤ横丁",
            area: "上野",
            duration: "1時間30分",
            description:
              "戦後の闇市が東京で最もにぎやかな食べ歩き通りに変身した場所。立ち飲みバーを渡り歩きながら串、立ち寿司、お酒一杯。",
            estimatedCost: "1人 約3,200円",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "築地、銀座 & 皇居",
        summary: "寿司の朝食、皇室庭園散策、そして世界一洗練されたショッピングストリートでの夜。",
        stops: [
          {
            name: "築地場外市場の朝食",
            area: "築地",
            address: "東京都中央区築地4丁目",
            duration: "1時間30分",
            description:
              "卸売市場自体は豊洲に移転しましたが、場外市場はそのまま残り、寿司カウンター・玉子焼き・ウニ屋の天国です。すしざんまい本店が素晴らしいおまかせ朝食を出してくれます。",
            estimatedCost: "約4,000円",
            bookingTip: "8時30分までに到着。ほとんどの店は13時に閉まります。",
            transitFromPrev: "新宿から東京メトロ丸ノ内線 → 日比谷線、約25分",
          },
          {
            name: "浜離宮恩賜庭園",
            area: "汐留",
            duration: "1時間",
            description:
              "17世紀の将軍の庭園。海水が入る池と300年もののマツの木があります。島の上の中島茶屋で抹茶と和菓子をいただくのがおすすめ。",
            estimatedCost: "入園 約400円 + お茶 約1,000円",
            transitFromPrev: "徒歩15分",
          },
          {
            name: "皇居東御苑",
            area: "千代田",
            duration: "1時間30分",
            description:
              "江戸城の名残が残る無料公園。元天守台の石垣を歩き、諏訪の茶屋も探してみてください。月・金は休園。",
            estimatedCost: "無料",
            transitFromPrev: "東京メトロ日比谷線 新橋 → 日比谷を徒歩、約15分",
          },
          {
            name: "とんかつ まい泉 青山",
            area: "青山",
            duration: "1時間",
            description:
              "元銭湯を改装した東京で最も愛されるとんかつ屋。黒豚ロースセットを注文してください。キャベツおかわり自由、雑穀米にも変更可。",
            estimatedCost: "約2,400円",
            transitFromPrev: "東京メトロ千代田線、約10分",
          },
          {
            name: "銀座ショッピング街",
            area: "銀座",
            duration: "2時間",
            description:
              "ハイブランドに興味がなくても、日曜の歩行者天国時間の中央通りを歩き、6階建ての伊東屋文具店を訪れ、Apple Storeの屋上ビューを見に行ってください。",
            estimatedCost: "無料〜$$$$",
            transitFromPrev: "東京メトロ銀座線、8分",
          },
          {
            name: "焼鳥 今井",
            area: "青山",
            duration: "1時間30分",
            description:
              "鶏のあらゆる部位を備長炭で焼くミシュラン級の焼鳥屋。おまかせコースが正解。長くて都会的な一日の完璧なフィナーレ。",
            estimatedCost: "1人 約6,000円",
            bookingTip: "1〜2週間前にホテルコンシェルジュ経由で予約。英語通話OK。",
            transitFromPrev: "東京メトロ、約15分",
          },
        ],
      },
      {
        theme: "日帰り: 鎌倉",
        summary: "東京の南へ1時間。日本初の幕府の拠点だった都市。寺院、大仏、夕日のための広い砂浜。",
        stops: [
          {
            name: "鎌倉行き列車",
            area: "東京駅 → 鎌倉",
            duration: "1時間",
            description:
              "東京駅からJR横須賀線直通で鎌倉まで。JR EAST 外国人窓口で鎌倉フリーパスを買えば、午後乗る江ノ電も無制限。",
            estimatedCost: "往復 約2,000円",
            transitFromPrev: "新宿 → 中央線 → 東京駅、約20分",
          },
          {
            name: "鶴岡八幡宮",
            area: "鎌倉",
            address: "神奈川県鎌倉市雪ノ下2-1-31",
            duration: "1時間",
            description:
              "1063年創建、鎌倉で最も重要な神社。武士の行列道だった若宮大路を上り、急な階段の上から街と海を一望してください。",
            estimatedCost: "無料",
            transitFromPrev: "鎌倉駅から徒歩10分",
          },
          {
            name: "頼朝そば",
            area: "小町通り",
            duration: "1時間",
            description:
              "鎌倉の工芸・おやつ通り、小町通りを歩きながら、伝統的なそば屋ならどこでもどうぞ。手切りのそばに冷たいつゆ — 軽くて朝の登山後にぴったり。",
            estimatedCost: "約1,600円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "江ノ電 長谷駅",
            area: "鎌倉 → 長谷",
            duration: "10分",
            description:
              "1902年敷設の単線路面電車。海岸沿いを走ります。右側の席に座って海の景色をどうぞ。",
            estimatedCost: "パスに含む",
            transitFromPrev: "鎌倉駅まで徒歩5分",
          },
          {
            name: "高徳院(鎌倉大仏)",
            area: "長谷",
            address: "神奈川県鎌倉市長谷4-2-28",
            duration: "1時間",
            description:
              "1252年鋳造の13.35メートルの青銅大仏。1498年の津波で本堂が崩れて以来、600年以上も野ざらしで雨を受けながら座っています。追加20円で大仏内部にも入れますよ。",
            estimatedCost: "約400円 + 内部20円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "由比ヶ浜の夕日",
            area: "由比ヶ浜",
            duration: "1時間",
            description:
              "鎌倉の弓型サーフィンビーチ。オフシーズンはほぼ無人。砂浜に座って、岬の向こうに沈む太陽を眺めてください。日本の旅を締めくくるのに完璧な一場面。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
    ],
    packingTips: [
      "脱ぎやすい靴 — 神社、旅館、一部のレストランで靴を脱ぎます",
      "小さなサブバッグ — 東京は公共のゴミ箱がほぼなく、一日中ゴミを持ち歩きます",
      "モバイルバッテリー — Googleマップと翻訳がバッテリーを食います",
      "現金財布 — 小さな食堂はいまだ現金のみが多いです",
    ],
    budgetEstimate: "ホテル除き2人で1日 16,000〜24,000円",
    generalTips: [
      "1日目にSuica ICカード発行 — 全電車・バス・自販機がタッチ決済",
      "コンビニ食(7-Eleven、Lawson、FamilyMart)は本当に良いです。朝食はコンビニで決まり",
      "チップ文化なし — むしろスタッフが戸惑います",
      "博物館の多くは月曜休館 — スケジュール作成時にご注意",
    ],
  },

  "paris-3d-family": {
    tagline: "子ども2人と3日間 — エッフェル塔、ルーブル、そしてディズニーまるまる1日。",
    audience: "子連れファミリー · ミドルレンジ",
    destination: "パリ",
    destinationCountry: "フランス",
    overview:
      "小さな子ども2人と一緒に、パリの象徴を2時間で崩れずに楽しみたい家族のための3日間。毎日大きなスポット1つに長めの公園時間を組み合わせ、ちゃんとしたトイレのあるランチを挟み、翌朝のクロワッサンを楽しめるエネルギーが残るよう早めに切り上げます。",
    bestSeasonNote:
      "5〜6月と9月がベスト。公園が気持ちよく、メトロも涼しく、博物館の行列も真夏よりずっと短いです。",
    currencyTip:
      "博物館とレストランのほとんどはコンタクトレス決済OK。アイスクリーム、メリーゴーランド、小さなパン屋用に40〜60ユーロ分の小銭は用意しておきましょう。",
    languageTip:
      "英語で尋ねる前に「Bonjour(ボンジュール)」から始めましょう。パリジャンの親切度が劇的に変わります。",
    emergencyNumber: "112(EU緊急)、15(医療)",
    hotel: {
      name: "シタディーン トゥール エッフェル パリ",
      area: "パリ15区、エッフェル塔近く",
      address: "132 Boulevard de Grenelle, 75015 Paris",
      rationale:
        "キチネット付きアパートホテルで家族に大助かり(パジャマで朝食、昼間のおやつ、子どものシリアル用ミルク)。エッフェル塔まで徒歩、ビル・アケム駅まで徒歩 — そこから4駅でルーブル。シャルル・ド・ゴール空港からはRER B + メトロ6番がベビーカーフレンドリーで最も格安。",
      estimatedNightlyRate: "1泊 約28,000円",
    },
    airportTransit: {
      method: "RER B → メトロ6号線(または初日のみタクシー)",
      duration: "電車 約75分 / タクシー 約50分",
      cost: "電車 家族券 約20€ / タクシー 約56€",
      instructions:
        "荷物と疲れた子どもがいるならCDGから左岸まで56ユーロ定額タクシーが最高。電車ルート: CDG第2ターミナルからRER Bサインを追ってパリ中心行きのどの車両でも → Denfert-Rochereauでメトロ6号線(Charles de Gaulle-Étoile方向)に乗換 → Bir-Hakeimで下車。シタディーンまで徒歩5分。RER Bは一部階段があるので、ベビーカー+大荷物ならタクシー推奨。",
    },
    days: [
      {
        theme: "エッフェル塔 & シャン・ド・マルス公園",
        summary: "象徴から始める → 公園で長めのピクニック → 本物のパリジャン遊び場で子どものエネルギー解放。",
        stops: [
          {
            name: "エッフェル塔(2階)",
            area: "シャン・ド・マルス",
            address: "5 Avenue Anatole France, 75007 Paris",
            duration: "1時間30分",
            description:
              "頂上チケットはスキップで — 2階も同じ感動で行列が短く、ベビーカーが入るエレベーター付き。2か月前に時間指定の階段+エレベーターチケットをオンライン予約。",
            estimatedCost: "大人 約30€、子ども 約15€",
            bookingTip: "toureiffel.parisで正確に60日前のパリ時間8時30分に発売。2時間以内に売り切れ。",
            transitFromPrev: "ホテルから徒歩10分",
          },
          {
            name: "ブーランジェリー・ユトピーでピクニック",
            area: "シャン・ド・マルス",
            duration: "1時間",
            description:
              "高級パン屋でバゲット、ジャンボン・ブール・サンドイッチ、フルーツ、ペストリーを買って、シャン・ド・マルスの芝に広げてエッフェル塔を見ながら食事。どんなレストランより安く、静かで、記憶に残ります。",
            estimatedCost: "家族 約32€",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "シャン・ド・マルス メリーゴーランド & 遊び場",
            area: "シャン・ド・マルス",
            duration: "1時間30分",
            description:
              "公園の南端に100年もの本物のメリーゴーランドが。隣には砂・滑り台・登り網のある柵付き遊び場。子どもが発散する時間。",
            estimatedCost: "メリーゴーランド 約6€",
            transitFromPrev: "組み込み",
          },
          {
            name: "ホテル休憩(子どもお昼寝)",
            area: "15区",
            duration: "1時間30分",
            description:
              "家族旅行では必須。アパートホテルに戻ってお茶を一杯、子どもにアニメを見せて。もう1か所詰め込みたい衝動はガマンを。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "カフェ・コンスタン",
            area: "Rue Saint-Dominique",
            duration: "1時間30分",
            description:
              "シェフ クリスチャン・コンスタンの近所ビストロ。本格フレンチ、子ども歓迎、迅速サービス、まじめなキッズメニュー。ローストチキン+フリット+1人1個のプロフィトロール。",
            estimatedCost: "家族 約100€",
            bookingTip: "TheForkで1週間前予約 — 家族予約を快く受けてくれます。",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "ルーブルハイライト & チュイルリー",
        summary: "子どものペースで素早く博物館 → メリーゴーランドとセーヌ川ボート。ルーブルを「全部見よう」とせず、5つに絞って出ましょう。",
        stops: [
          {
            name: "ルーブル美術館(子ども向けコース)",
            area: "1区",
            address: "Rue de Rivoli, 75001 Paris",
            duration: "2時間",
            description:
              "地下のカルーゼル入口からどうぞ — ピラミッドより行列がずっと短いです。モナ・リザ(ドゥノン翼2階)、ミロのヴィーナス、サモトラケのニケ、エジプトのミイラ、ナポレオン3世のアパルトマン — これだけで十分。子どもには宝探しと言ってあげて。",
            estimatedCost: "大人 約30€、18歳未満無料",
            bookingTip: "louvre.frで1週間前に時間指定チケット。火曜休館。",
            transitFromPrev: "Bir-Hakeimからメトロ6→1号線、約25分",
          },
          {
            name: "チュイルリー庭園",
            area: "1区",
            duration: "1時間30分",
            description:
              "ルーブルを出るとすぐチュイルリー。中央池の横の緑の椅子貸出でおもちゃのヨットを借りて、長い棒で押しながら遊びます。シンプルで象徴的で幸せな時間。",
            estimatedCost: "ボートレンタル 約6€",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "アンジェリーナ(ホットチョコレート + ランチ)",
            area: "Rue de Rivoli",
            duration: "1時間",
            description:
              "100年のティールーム。温かいガナッシュのような濃厚ホットチョコレートで有名。子どもはクロックムッシュ、両親はサラダ・ニソワーズ、みんなでモンブラン1皿。",
            estimatedCost: "家族 約90€",
            bookingTip: "6人未満は予約不可 — 13時に行けば行列短め。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "バトー・ムーシュ セーヌ川クルーズ",
            area: "Pont de l'Alma",
            duration: "1時間30分",
            description:
              "アルマ橋発の70分オープントップボート。すべての有名な橋の下を通り、ノートルダム、ルーブル、エッフェル塔を川から眺めます。ベビーカー乗船OK。",
            estimatedCost: "大人 約20€、子ども 約10€",
            transitFromPrev: "チュイルリーからメトロ1→9号線、約15分",
          },
          {
            name: "ホテル休憩 + 早めの夕食準備",
            area: "15区",
            duration: "1時間30分",
            description:
              "アパートホテルに戻ってキチネットでパスタを茹でてパジャマで夕食。鐘の音を聞きながら子どもはぐっすり。",
            estimatedCost: "買い出し 約20€",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "ディズニーランド・パリ",
        summary: "一番大きな日を最後に。パリ市内からRERで35分、丸一日使う価値あり。",
        stops: [
          {
            name: "RER Aでディズニーランドへ",
            area: "Châtelet → Marne-la-Vallée",
            duration: "1時間",
            description:
              "Bir-HakeimからメトロでCharles de Gaulle-Étoile、RER Aに乗換でMarne-la-Vallée Chessy方面。終点が公園入口なので、降りればすぐディズニーランド。",
            estimatedCost: "家族往復 約35€",
            transitFromPrev: "Bir-Hakeimまで徒歩10分",
          },
          {
            name: "ディズニーランド・パーク(午前ファンタジーランド)",
            area: "Marne-la-Vallée",
            address: "Boulevard de Parc, 77700 Coupvray",
            duration: "4時間",
            description:
              "みんながビッグサンダーに集まっている間にファンタジーランドから。順番: It's a Small World → Peter Pan's Flight → Dumbo → Mad Hatter Teacups → メリーゴーランド。オーベルジュ・ド・サンドリヨンでプリンセス食事を希望なら数か月前に予約。",
            estimatedCost: "家族1日券 約450€",
            bookingTip: "disneylandparis.comで購入 — ゲート価格は約55€高くなります。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ケイシーズ・コーナー ランチ(メインストリート)",
            area: "ディズニーランド・パーク",
            duration: "1時間",
            description:
              "メインストリートUSAのホットドッグとチリフライ。ピアノのライブ演奏が流れます。パリ・ディズニーの食事は意外といい — さっと食べてまた遊びに行く家族にぴったり。",
            estimatedCost: "家族 約70€",
            transitFromPrev: "組み込み",
          },
          {
            name: "アドベンチャーランド & フロンティアランド",
            area: "ディズニーランド・パーク",
            duration: "3時間",
            description:
              "Pirates of the Caribbean(子どももOK)、Indiana Jonesコースター(身長制限あり)、Phantom Manor(少し怖いお化け屋敷 — 子どもの性格を確認)、Big Thunder Mountainエリアの景色。",
            estimatedCost: "含む",
            transitFromPrev: "組み込み",
          },
          {
            name: "ディズニー・イルミネーション",
            area: "城ステージ",
            duration: "30分",
            description:
              "毎晩、城で繰り広げられる花火 + プロジェクションショー。旅をこのクライマックスで締めくくり。メインストリートで30分前に場所取り。",
            estimatedCost: "含む",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "RER AでBir-Hakeim復帰",
            area: "Marne-la-Vallée → パリ",
            duration: "1時間",
            description:
              "電車は深夜まで運行。Charles de Gaulle-Étoileに着く前に子どもたちは寝ているはず。",
            estimatedCost: "午前のチケットに含む",
            transitFromPrev: "徒歩5分",
          },
        ],
      },
    ],
    packingTips: [
      "軽量な折りたたみベビーカー — パリの石畳は本物です",
      "おやつ・ウェットティッシュ・手指消毒剤が入る小さなバックパック",
      "1人1本の小さな水筒 — レストランで無料で詰めてくれます",
      "3日目用ディズニー/プリンセス衣装 — 着ていった子どもは目に見えて幸せそう",
    ],
    budgetEstimate: "4人家族、ホテルとディズニーチケット除き1日 約360〜450€",
    generalTips: [
      "パリの博物館は18歳未満すべて無料 — パスポート持参を",
      "子どもが好きなシリアルを持参 — 慣れた朝食がぐずりを防ぎます",
      "カフェの多くはコーヒーを買えば清潔なトイレ無料 — 動線づくりに参考に",
      "有料博物館3か所以上なら「Paris Museum Pass」が元取れます",
    ],
  },

  "seoul-3d-foodie": {
    tagline: "フーディー3日間 — 市場、焼肉、ドライエイジド韓牛、漢江チメク。",
    audience: "ソロ · フーディー",
    destination: "ソウル",
    destinationCountry: "韓国",
    overview:
      "食べることがソウル訪問の第一の理由のソロフーディー向け3日間。毎日カルチャーアンカー1つに食事スポット3〜4つを組み合わせます。有名市場、近所の小さな店、そして1日1回のちゃんとした夕食。3日目にはスンドゥブとトゥブチゲの違いがわかるようになります。",
    bestSeasonNote:
      "4〜5月(桜、温暖)と9〜10月(秋、乾燥)がベスト。8月の湿気は避けて。",
    currencyTip:
      "コンビニで買えるT-moneyカード — 地下鉄・バス・一部タクシーすべてカバー。到着したらシティ/ウリATMで20〜30万ウォン引き出し。",
    languageTip:
      "ハングル24文字を覚えるだけで看板の半分は読めます — 出発前30分のYouTube入門で十分。「アンニョンハセヨ」「カムサハムニダ」がどこでも通じます。",
    emergencyNumber: "112(警察)、119(医療/消防)",
    hotel: {
      name: "L7ホンデ by ロッテ",
      area: "ホンデ(弘大)",
      address: "ソウル特別市麻浦区楊花路141",
      rationale:
        "弘大はソウルで最も歩きやすい食事・ナイトライフエリア。インディーカフェ、明け方BBQ、ストリートパフォーマンスがいっぱい。L7は弘大入口駅(仁川空港鉄道直通、50分)から徒歩3分、ルーフトップバーから漢江ビューも。シングル1泊 約16,000円。",
      estimatedNightlyRate: "1泊 約16,000円",
    },
    airportTransit: {
      method: "空港鉄道(AREX) → 弘大入口駅",
      duration: "約50分",
      cost: "約1,000円",
      instructions:
        "ICN第1・第2ターミナル地下からAREXサインに沿って。直通エクスプレスチケット9,000ウォン — 座席指定、43分でソウル駅。ソウル駅から通勤線で2駅戻って弘大入口駅(またはT-money持ちなら2号線が便利)。ホテルは1番出口からサイン通り。",
    },
    days: [
      {
        theme: "市場 & 宮殿",
        summary: "市場の朝食、ソウルの代表的な宮殿、そして韓屋村の夕方。",
        stops: [
          {
            name: "広蔵市場の朝食",
            area: "鍾路",
            address: "ソウル特別市鍾路区昌慶宮路88",
            duration: "1時間30分",
            description:
              "ソウル最古の市場、屋台の女王。中央のビンデトッ(緑豆チヂミ)おばさん、麻薬キンパ屋台、トッポッキ1皿。立ち食いで次のコースへ。",
            estimatedCost: "約1,600円",
            transitFromPrev: "弘大入口から2号線 → 1号線乗換 → 鍾路5街、約25分",
          },
          {
            name: "景福宮",
            area: "鍾路",
            address: "ソウル特別市鍾路区社稷路161",
            duration: "2時間",
            description:
              "朝鮮王朝の正宮、1395年創建。11時の守門将交代式は必見。韓服レンタル(近くで約1,300円)すれば入場料も無料。",
            estimatedCost: "約400円(韓服着用なら無料)",
            bookingTip: "火曜休館。11時・13時30分に無料英語ガイドツアーあり。",
            transitFromPrev: "5号線 → 3号線景福宮駅、約15分",
          },
          {
            name: "北村韓屋村散策",
            area: "北村",
            duration: "1時間30分",
            description:
              "2つの宮殿の間にある600年もの韓屋が復元された住宅街。嘉会洞の路地に観光案内所の無料地図に載った8つのフォトスポット。住民が暮らす町なので静かに。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "三清洞のカフェ",
            area: "三清洞",
            duration: "1時間",
            description:
              "北村から下りるカフェ・ギャラリーストリート。伝統茶屋ならどこでもOK、五味子茶に薬菓1皿。",
            estimatedCost: "約1,000円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "土俗村サムゲタン",
            area: "鍾路",
            duration: "1時間",
            description:
              "韓国で最も有名な参鶏湯。1,800円の食事ですが歴代大統領が食べてきました。ピーク時30分待ち — 17時に行くと並ばずに入れます。",
            estimatedCost: "約1,800円",
            bookingTip: "予約不可。並ぶ価値あり。",
            transitFromPrev: "徒歩20分",
          },
          {
            name: "清渓川散策",
            area: "鍾路",
            duration: "1時間",
            description:
              "50年間高速道路の下に埋もれていたものが2005年に復元された11kmの都心の川。市庁東側の最初の2kmは夜間ライトアップ。寝る前の静かな回復散歩。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩20分",
          },
        ],
      },
      {
        theme: "焼肉、マッコリ & ホンデの夜",
        summary: "ゆったり朝、意義深い戦争記念館、そして韓国グリル文化の深層へ。",
        stops: [
          {
            name: "オニオン安国(ブランチ + パン)",
            area: "安国",
            duration: "1時間",
            description:
              "韓屋をベーカリーカフェに改装。ソウルで最も美しいペストリー陳列。ソルトブレッドとパンドーロは必食。インスタ映えと正当な人気。",
            estimatedCost: "約1,600円",
            transitFromPrev: "3号線安国駅、徒歩5分",
          },
          {
            name: "戦争記念館",
            area: "龍山",
            address: "ソウル特別市龍山区梨泰院路29",
            duration: "2時間",
            description:
              "朝鮮戦争とその起源を扱う無料の世界級博物館。屋外の軍用機・戦車・青銅の「兄弟像」が1章、本館がもう1章。重いですが必須の文脈。",
            estimatedCost: "無料",
            transitFromPrev: "安国から6号線 → 三角地駅、約25分",
          },
          {
            name: "ホンデ 麻浦カルメッキサル",
            area: "ホンデ",
            duration: "1時間30分",
            description:
              "豚のカルメッキサル(横隔膜)BBQ — 海外の韓国BBQでは絶対に見られない部位。ホステル近くのカルメッキサル店ならどこでも。スタッフが焼いてくれます。",
            estimatedCost: "約3,000円",
            transitFromPrev: "6号線 → 弘大入口、約25分",
          },
          {
            name: "延南洞のカフェクロール",
            area: "延南洞",
            duration: "2時間",
            description:
              "ソウルで最もヒップなカフェエリア、ホンデのすぐ西。カフェ3軒巡って。韓国のスペシャルティコーヒーシーンはアジア最高水準。Felt、Fritz Coffee、英語看板のない場所もおすすめ。",
            estimatedCost: "約2,000円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ムッチャゴル ポジャンマチャ",
            area: "ホンデ",
            duration: "1時間30分",
            description:
              "ソウルクラシック屋台のおつまみ。ソジュ、マッコリ、パジョン、そしてコプチャン1皿(想像よりずっとおいしい)。隣の人と少しでも話してみて。",
            estimatedCost: "約3,200円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ホンデのストリートパフォーマンス",
            area: "弘益大学通り",
            duration: "1時間30分",
            description:
              "週末の夜、弘益大前の歩行者通りはK-popダンスクルー、インディーバンド、アクロバット師でいっぱい。無料、にぎやか、楽しい。時差に耐える分だけお楽しみを。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩5分",
          },
        ],
      },
      {
        theme: "江南、漢江 & ラストミール",
        summary: "江南へ渡って博物館1つ、狎鴎亭ランチ、漢江の夕日。",
        stops: [
          {
            name: "奉恩寺",
            area: "江南",
            duration: "1時間",
            description:
              "江南の高層ビルの間に挟まれた1,200年の寺院 — 視覚的コントラストが核。外国人向け無料テンプルステイもあるが1時間散策で十分。",
            estimatedCost: "無料",
            transitFromPrev: "2号線 → 7号線、約30分",
          },
          {
            name: "スターフィールドCOEX & ピョルマダン図書館",
            area: "江南",
            duration: "1時間",
            description:
              "地下ショッピングモールの真ん中にある2階吹き抜けオープン図書館 — 5万冊無料、ソウルで最も撮られる屋内スポットの1つ。ゆっくり歩いて、見渡して、写真1枚。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ボンアンドブレッド(ドライエイジドビーフ)",
            area: "狎鴎亭",
            duration: "1時間30分",
            description:
              "一度贅沢するならここ。Bone & Breadは韓牛を店内で直接ドライエイジング。ランチのリブアイセット約8,000円、東京のどことでも肩を並べられます。事前予約必須。",
            estimatedCost: "約8,000円",
            bookingTip: "Catch Tableアプリで1週間前予約。",
            transitFromPrev: "7号線 → 狎鴎亭ロデオ、約15分",
          },
          {
            name: "カロスキル(街路樹キル)",
            area: "新沙",
            duration: "1時間30分",
            description:
              "韓国デザイナーブランド、カフェ、人間観察ができる葉茂る並木のブティック通り。明洞より観光地化されていません。",
            estimatedCost: "無料〜$$$",
            transitFromPrev: "3号線 → 新沙駅徒歩10分",
          },
          {
            name: "漢江公園(盤浦)",
            area: "盤浦",
            duration: "1時間30分",
            description:
              "川辺まで降りてコンビニで500円のレジャーシート借り、フードトラックの配達アプリ(BBQチキンやクッネ)でチメク注文。シーズンなら19時30分の盤浦大橋噴水ショー。",
            estimatedCost: "約2,000円",
            transitFromPrev: "9号線 → 新盤浦駅徒歩10分",
          },
          {
            name: "カンブチキン(韓国式フライド)",
            area: "ホンデ",
            duration: "1時間",
            description:
              "旅を韓国国民おやつで締めくくり: 韓国フライドチキン。ハーフ&ハーフ(醤油ニンニク + 甘辛)にビール。サクサクモチモチ、完璧。",
            estimatedCost: "約3,000円",
            transitFromPrev: "9号線 → 弘大入口、約25分",
          },
        ],
      },
    ],
    packingTips: [
      "脱ぎやすい靴 — 寺院や伝統食堂で靴を脱ぎます",
      "小さな傘 — ソウルはほぼ毎月突然のにわか雨",
      "ウェットティッシュ — 屋台料理 + ティッシュ不足",
      "1日目は空腹で — 止まらなくなります",
    ],
    budgetEstimate: "ホテル除き1日 約11,000〜16,000円",
    generalTips: [
      "地下鉄がタクシーより速く清潔で安い — T-moneyカード必携",
      "チップ文化なし",
      "レストランのおかずは無料 — 追加費用ではありません",
      "博物館の多くは月曜休館",
    ],
  },

  "bangkok-4d-solo": {
    tagline: "ソロ・節約4日間 — 寺院、屋台料理、アユタヤ日帰り。",
    audience: "ソロ · 節約",
    destination: "バンコク",
    destinationCountry: "タイ",
    overview:
      "タイトな予算でバンコクの3つの顔 — 寺院のバンコク、屋台のバンコク、不思議な夜のバンコク — をすべて見たいソロ旅行者向けの4日間。1食700円を超えず、暑くなる前に王宮を観て、金曜にはカオサンロードの武勇伝を1つ持ち帰ります。",
    bestSeasonNote:
      "11〜2月が乾燥して(相対的に)涼しいです。それ以外は11時には汗だく。4月は一部エリアで地球上最も暑い月。",
    currencyTip:
      "銀行ATM(Krungsri または SCB)で5,000〜10,000バーツ引き出し — 紫色の独立型ATMは220バーツ手数料なので避けて。屋台料理はほぼ現金のみ。",
    languageTip:
      "Google翻訳のタイ語オフラインパックを入れておきましょう — タイ文字は外国人には推測不可能。「コップンカップ(男性話者の感謝)」と言えば微笑みが返ってきます。",
    emergencyNumber: "1155(観光警察)、1669(医療)",
    hotel: {
      name: "Lub d Bangkok Siam(8人混合ドミトリー)",
      area: "サイアム",
      address: "925/9 Rama I Road, Pathum Wan, Bangkok 10330",
      rationale:
        "Lub d SiamはBTS National Stadiumから4分、サイアム・スクエアから8分。市内のどこへもBTS1〜2駅で行けます(リバーボート含む)。ホステルは清潔で有名、エアコン/作業スペース完備、ドミベッドごとにプライバシーカーテン。BKKスワンナプームから空港鉄道がPhaya Thaiまで運んでくれてホテルまで15分。",
      estimatedNightlyRate: "1泊 約2,500円",
    },
    airportTransit: {
      method: "空港鉄道 → BTSスカイトレイン",
      duration: "約50分",
      cost: "約300円",
      instructions:
        "スワンナプーム(BKK)地下から緑のAirport Rail Linkサインに沿って。City Line終点Phaya Thaiまでトークン1枚(45バーツ)。BTSスクンビット線へ乗換(1階上 — トークン1枚追加、26バーツ)、サイアムまで2駅、シーロム線に乗換て1駅、National Stadiumで下車。ホステルは右に徒歩4分。",
    },
    days: [
      {
        theme: "王室のバンコク",
        summary: "暑さとドレスコード詐欺の前に午前中に大寺院3つを終わらせて。夕方はパッタイ食い倒れ。",
        stops: [
          {
            name: "王宮 & ワット・プラケオ",
            area: "プラナコーン",
            address: "Na Phra Lan Road, Phra Borom Maha Ratchawang",
            duration: "2時間",
            description:
              "8時30分の開門時刻に到着 — 10時には45分待ちです。長ズボンと肩を覆う服は必須、でないと入場拒否。ワット・プラケオの中のエメラルド仏は小さいですが、囲む金が圧倒的。",
            estimatedCost: "約2,000円",
            bookingTip: "外で「今日は閉まってる」と言う人は無視 — トゥクトゥク詐欺です。",
            transitFromPrev: "BTS Saphan Taksin → チャオプラヤー・エクスプレスボートTha Chang船着場(計約30分)",
          },
          {
            name: "ワット・ポー(寝釈迦仏)",
            area: "プラナコーン",
            duration: "1時間",
            description:
              "バスケットコートより長い46メートルの黄金の寝釈迦仏。後ろの壁の108個の青銅の鉢にコインを入れてください — 音が催眠的。タイマッサージの発祥地でもあります。現地で1,300円で受けられますよ。",
            estimatedCost: "約800円 + マッサージ1,300円",
            transitFromPrev: "南に徒歩10分",
          },
          {
            name: "ターチャン市場の麺",
            area: "ターチャン船着場",
            duration: "45分",
            description:
              "船着場すぐ隣の家族屋台。ボートヌードル(クイティアオ・ルア)注文 — 小さな器、大きな味、1杯200円。",
            estimatedCost: "約400円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ワット・アルン(暁の寺)",
            area: "トンブリー",
            duration: "1時間30分",
            description:
              "5バーツのフェリーで川を渡ります。ワット・アルンの中央プラーンは19世紀の貿易商がバラストとして持ち込んだ陶器の破片で覆われています。急な階段を上ると都市最高のチャオプラヤービュー。",
            estimatedCost: "入場約400円 + フェリー25円",
            transitFromPrev: "5バーツのフェリーで川を渡る",
          },
          {
            name: "ホステル昼寝",
            area: "サイアム",
            duration: "1時間30分",
            description:
              "気温38度。戻って寝てください。街は夕方に再び目覚め、その時エネルギーが必要です。",
            estimatedCost: "無料",
            transitFromPrev: "ボートでSaphan Taksin → BTS National Stadium、約40分",
          },
          {
            name: "ティップ・サマイ パッタイ",
            area: "プラナコーン",
            duration: "1時間",
            description:
              "バンコクで最も有名なパッタイ — 1966年から同じやり方。エビ入りの卵で包んだバージョン。15〜20分待ち必須、その価値あり。",
            estimatedCost: "約700円",
            transitFromPrev: "ホステルからタクシー/Grab、約25分",
          },
        ],
      },
      {
        theme: "市場 & カオサン",
        summary: "午前は週末市場、川の夕日、カオサンロードの武勇伝のための夜。",
        stops: [
          {
            name: "チャトゥチャック・ウィークエンドマーケット",
            area: "チャトゥチャック",
            address: "587/10 Kamphaeng Phet 2 Rd",
            duration: "3時間",
            description:
              "35エーカーに15,000店。迷子になります — それがポイント。セクション: 服(1〜6)、アート(7)、食べ物(26〜27)、犬(あります)。提示価格の60%で交渉。",
            estimatedCost: "ショッピングすれば約4,000円",
            bookingTip: "土・日のみ営業。9時に着かないとよく蒸されます。",
            transitFromPrev: "BTS Mo Chit、約15分、徒歩5分",
          },
          {
            name: "チャトゥチャック・フードコート",
            area: "チャトゥチャック内",
            duration: "1時間",
            description:
              "セクション26は食の迷宮。マンゴースティッキーライス、ココナッツの殻に入ったココナッツアイスクリーム、焼き串各種。プラスチック椅子に座って手で。",
            estimatedCost: "約800円",
            transitFromPrev: "組み込み",
          },
          {
            name: "ホステル休憩 + 温かいシャワー",
            area: "サイアム",
            duration: "2時間",
            description:
              "熱中症は本物。戻ってシャワー、スマホ充電、整備。",
            estimatedCost: "無料",
            transitFromPrev: "BTS Mo Chit → Siam → National Stadium、約25分",
          },
          {
            name: "チャオプラヤー川ボートで夕日",
            area: "サトーン船着場",
            duration: "1時間",
            description:
              "30バーツのオレンジ旗ローカルボートのチケットでサトーン船着場からPhra Athitまで川を遡ります。夕日が寺院を照らし、空気はやっと涼しく。バンコクで最高に使われた1ドル。",
            estimatedCost: "約100円",
            transitFromPrev: "BTS Saphan Taksin、約15分",
          },
          {
            name: "カオサンロード屋台料理",
            area: "カオサン",
            duration: "1時間",
            description:
              "有名なバックパッカー通り。50バーツのパッシーユー1皿と30バーツのバナナロティをどのカートからでも。串刺しのサソリおじさんは2003年から同じ人で、20バーツで写真OK。",
            estimatedCost: "約700円",
            transitFromPrev: "Phra Athit船着場から徒歩10分",
          },
          {
            name: "カオサン・バークロール",
            area: "カオサン",
            duration: "2時間",
            description:
              "ホステルバーを選んで100バーツのバケツ1杯、14か国の人と話して、深夜前に去る。聞いたとおりの体験です。",
            estimatedCost: "約1,000円",
            transitFromPrev: "組み込み",
          },
        ],
      },
      {
        theme: "日帰り: アユタヤ",
        summary: "タイ古都、80km北。廃墟の寺院、レンガの塔、木の根に絡まれた仏頭。",
        stops: [
          {
            name: "アユタヤ行き列車",
            area: "フアランポーン → アユタヤ",
            duration: "1時間30分",
            description:
              "フアランポーンから3等通勤列車(15バーツ)。窓は開いていてプラスチック座席で遅いですが本物。これが旅です。",
            estimatedCost: "約70円",
            transitFromPrev: "MRTフアランポーン",
          },
          {
            name: "ワット・マハタート(木の中の仏頭)",
            area: "アユタヤ歴史公園",
            duration: "1時間30分",
            description:
              "菩提樹の根に絡まった砂岩の仏頭 — アユタヤで最も撮られるイメージ。周りの廃墟は巨大で、観光バスが着く前はほぼ無人。",
            estimatedCost: "約300円",
            transitFromPrev: "駅からトゥクトゥク、約400円",
          },
          {
            name: "Lung Lekのボートヌードル",
            area: "アユタヤ",
            duration: "45分",
            description:
              "小さな器、濃厚な汁、牛肉。地元民は空き器をテーブルに積んで数えます — 挑戦してみて。",
            estimatedCost: "約500円",
            transitFromPrev: "トゥクトゥク約200円",
          },
          {
            name: "ワット・プラ・シー・サンペット & ヴィハーン・プラ・モンコン・ボピット",
            area: "アユタヤ歴史公園",
            duration: "1時間30分",
            description:
              "1つの台座に巨大な復元チェディ3基 — 象徴的なアユタヤのスカイライン。隣のヴィハーンには第二次大戦の爆撃後1950年代に再建された12メートルの青銅仏。",
            estimatedCost: "約300円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ワット・チャイワッタナーラーム(夕日)",
            area: "アユタヤ",
            duration: "1時間",
            description:
              "川向こうのクメール様式寺院。タイ中部で最も写真映えする夕日。反射する堀がレンガ塔を倍にしてくれます。",
            estimatedCost: "約300円",
            transitFromPrev: "トゥクトゥク約400円",
          },
          {
            name: "バンコク行き列車",
            area: "アユタヤ → フアランポーン",
            duration: "1時間30分",
            description:
              "また遅い列車。寝て、フルーツを食べて、田んぼが流れていくのを見て。",
            estimatedCost: "約70円",
            transitFromPrev: "駅までトゥクトゥク約400円",
          },
        ],
      },
      {
        theme: "チャイナタウン & ラストミール",
        summary: "バンコクで最も食の密度が高い通りで締めくくり。寺院とルーフトップバーも組み込みで。",
        stops: [
          {
            name: "ワット・トライミット(黄金の仏)",
            area: "チャイナタウン入口",
            duration: "45分",
            description:
              "5.5トンの純金仏が200年間漆喰の下に隠れていて、1955年に作業員が落として発見された場所。金の価値だけで2億5,000万ドル。",
            estimatedCost: "約400円",
            transitFromPrev: "MRT Hua Lamphong、徒歩5分",
          },
          {
            name: "サンペーン・レーン卸売市場",
            area: "チャイナタウン",
            duration: "1時間",
            description:
              "1.5kmにわたって密集した狭い路地 — ビーズ、織物、干物、プラスチックおもちゃ。意図的に道に迷ってください。",
            estimatedCost: "約1,300円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "Nai Mong Hoy Tod(牡蠣オムレツ)",
            area: "ヤワラート通り",
            duration: "45分",
            description:
              "1968年から牡蠣のパンケーキを焼くミシュラン・ビブグルマンの屋台。シグネチャーはホイトッ・クロップ — 牡蠣をレースのようにカリカリに焼いたクレープにチリソース。",
            estimatedCost: "約800円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ホステル + 昼寝",
            area: "サイアム",
            duration: "2時間",
            description: "最後のシエスタ。夜が長くなります。",
            estimatedCost: "無料",
            transitFromPrev: "MRT + BTS、約30分",
          },
          {
            name: "ヤワラート屋台料理クロール",
            area: "チャイナタウン",
            duration: "2時間",
            description:
              "ヤワラート通りは地球上で屋台の密度が最も高いエリア。T&K Seafood(カレークラブ)、Guay Jub Ouan Pochana(胡椒のロール麺)、マンゴースティッキーライスの屋台。ゆっくり歩いて、絶え間なく食べて。",
            estimatedCost: "約2,000円",
            transitFromPrev: "MRT Wat Mangkon、徒歩5分",
          },
          {
            name: "Lebua Sky Bar",
            area: "シーロム",
            duration: "1時間",
            description:
              "ハングオーバー2のルーフトップ。はい、観光地っぽくてカクテル2,800円です。それでも64階のチャオプラヤー夜景オープンエアはポストカードそのもの。ドレスコード: 長ズボンと足の甲を覆う靴。",
            estimatedCost: "約3,000円",
            transitFromPrev: "タクシー約700円",
          },
        ],
      },
    ],
    packingTips: [
      "寺院ドレスコード用にゆったりした軽い長ズボン1本",
      "再利用可能水筒 — 7-Elevenどこでも1バーツで満たしてくれます",
      "DEET入り虫除けスプレー(夕方用)",
      "ドミトリー用の耳栓",
    ],
    budgetEstimate: "ホステル除き1日 約5,000〜7,000円",
    generalTips: [
      "Grab(現地版Uber)を使って — 値切り・詐欺なし",
      "小銭(20・50バーツ)を常備 — 屋台は1000札のおつりを嫌います",
      "水道水は飲めません — ペットボトル水はどこでも7バーツ",
      "トゥクトゥクは事前に値段交渉しないと観光客の罠",
    ],
  },

  "osaka-3d-foodie": {
    tagline: "日本の台所、3日間 — たこ焼き、お好み焼き、そして京都まる1日。",
    audience: "ソロ · フーディー · ミドルレンジ",
    destination: "大阪",
    destinationCountry: "日本",
    overview:
      "食べに来たソロ旅行者のための3日間。大阪は日本の台所 — 「食い倒れ」という言葉がここで生まれました。道頓堀のネオン路地を歩き、ちゃんとした市場の朝食を食べ、寺院の雰囲気のために京都で1日を過ごしてから、最後の夜は焼き鳥でしめます。",
    bestSeasonNote:
      "大阪城公園の桜の4月、または紅葉と散策に良い天気の10月末がベスト。ゴールデンウィーク(4月末〜5月初)は国内旅行で価格が跳ね上がるので避けて。",
    currencyTip:
      "小さな食堂と道頓堀の屋台はやはり現金が王様。到着後すぐ7-ElevenのATMで2〜3万円おろしておきましょう。大手チェーンはカードとIC交通カード対応。",
    languageTip:
      "東京より英語メニューが少なめ。「これ ください」を覚えて指差せばOK — 地元民もそう注文します。Google翻訳のカメラが大助かり。",
    emergencyNumber: "110(警察)、119(救急/消防)",
    hotel: {
      name: "クロスホテル大阪",
      area: "心斎橋",
      address: "大阪市中央区心斎橋筋2-5-15, 542-0085",
      rationale:
        "心斎橋は道頓堀まで徒歩5分、地下鉄駅まで徒歩4分、しかもアーケードの中なので雨に濡れません。客室は小さいですがデザインが良く、ロビーカフェが遅くまで開いていて食べ歩き後の一息に最適。",
      estimatedNightlyRate: "1泊 約16,000円",
    },
    airportTransit: {
      method: "南海ラピート → 難波 → 御堂筋線 → 心斎橋",
      duration: "約60分",
      cost: "約2,000円(片道)",
      instructions:
        "関西空港(KIX)から南海ラピート特急直通でなんばまで約40分。なんばから御堂筋線で1駅、心斎橋まで、ホテルまで徒歩5分。南海窓口で外国人専用ラピート+ICOCAパッケージを買えば約500円節約。",
    },
    days: [
      {
        theme: "道頓堀フードクロール",
        summary: "到着して荷物だけ置いて大阪のネオンの真ん中へ。たこ焼き、お好み焼き、川辺の灯り、そして深夜のラーメン。",
        stops: [
          {
            name: "道頓堀運河 + グリコサイン",
            area: "道頓堀",
            duration: "45分",
            description:
              "戎橋の上ですべての日本旅行ガイドの「大阪の章」に登場するグリコランニングマンの写真を撮って。観光地っぽいけど一度はやるべき。その後は運河沿いを歩いて看板観賞。",
            estimatedCost: "無料",
            transitFromPrev: "ホテルから徒歩5分",
          },
          {
            name: "たこ焼き わなか 千日前",
            area: "道頓堀",
            address: "大阪市中央区難波千日前11-19",
            duration: "30分",
            description:
              "外はカリッ、中はタコとだしがとろけるたこ焼きの真髄。わなかは老舗で値段も良心的、いまだに地元民が並びます。ソース+マヨ+鰹節+青のりのクラシック8個を注文。",
            estimatedCost: "約800円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "心斎橋筋アーケード",
            area: "心斎橋",
            duration: "1時間",
            description:
              "道頓堀から心斎橋まで600メートルの屋根付きショッピング街。ドラッグストア、ファッション、カフェ、割引家電。次の食事の前に消化させるのにぴったり。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩8分",
          },
          {
            name: "美津のお好み焼き",
            area: "道頓堀",
            address: "大阪市中央区道頓堀1-4-15",
            duration: "1時間",
            description:
              "1945年創業、ミシュランビブグルマンのお好み焼き。シグネチャーの山芋焼きを注文 — 山芋を使った生地がどこよりもふわふわ。目の前の鉄板で焼いてくれます。",
            estimatedCost: "約1,800円",
            bookingTip: "予約不可。ピーク時20〜30分待ち — その時間に運河を一周するとちょうど良い。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "法善寺横丁の提灯路地",
            area: "難波",
            duration: "30分",
            description:
              "法善寺の横の50mの石畳路地 — 紙提灯と小さな居酒屋がぎっしり。寺院では苔むした不動明王像に水をかけて運を願います。古い大阪の最も写真映えする一枚。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩3分",
          },
          {
            name: "金龍ラーメン(道頓堀)",
            area: "道頓堀",
            duration: "30分",
            description:
              "緑の巨大ドラゴン看板が深夜まで開いているラーメン店。豚骨醤油ベース、テーブルにキムチとニラが食べ放題。24時間ニンニク臭が付きまといますが、それだけの価値あり。",
            estimatedCost: "約1,200円",
            transitFromPrev: "徒歩3分",
          },
        ],
      },
      {
        theme: "京都日帰り",
        summary: "30分の電車1本で日本の古都へ。早朝の伏見稲荷、料亭ランチ、夕方ラッシュ前に大阪復帰。",
        stops: [
          {
            name: "JR新快速 → 京都",
            area: "新大阪 → 京都駅",
            duration: "30分",
            description:
              "新大阪からJR京都線新快速直通。晴れた日は右側の席から伊吹山が見えます。",
            estimatedCost: "約700円",
            transitFromPrev: "心斎橋から新大阪まで地下鉄、約15分",
          },
          {
            name: "伏見稲荷大社",
            area: "伏見",
            address: "京都市伏見区深草薮之内町68",
            duration: "2時間",
            description:
              "山に沿って連なる1万本の朱色の鳥居。人なしで写真を撮るには8時45分までに到着。10時30分には団体客でいっぱいに。四ツ辻交差点(約30分上)まで上ると街のビュー — 観光客のほとんどはその前で引き返します。",
            estimatedCost: "無料",
            transitFromPrev: "JR奈良線5分 + 徒歩3分",
          },
          {
            name: "錦市場の屋台",
            area: "京都中心部",
            duration: "1時間30分",
            description:
              "「京の台所」と呼ばれる400mの屋根付き市場。タコたまご(卵の中の小さなタコ)、豆乳ドーナツ、新鮮な湯葉。6〜8軒の屋台で少しずつランチ代わりに。",
            estimatedCost: "約1,800円",
            transitFromPrev: "JR奈良線 → 京都駅 → 地下鉄四条、約20分",
          },
          {
            name: "清水寺",
            area: "東山",
            duration: "1時間30分",
            description:
              "1,200年の木造寺院、釘1本も使わずに13mの柱が支えています。後ろの音羽の滝で3つの流れ(長寿・学業・恋愛)から1つ選んで飲んでみて。",
            estimatedCost: "約400円",
            transitFromPrev: "四条から206番バス → 五条坂停留所、徒歩約25分",
          },
          {
            name: "産寧坂・二寧坂",
            area: "東山",
            duration: "1時間",
            description:
              "清水から下りる江戸時代保存通り。抹茶ソフトクリーム、着物レンタル観察、日本で最も写真撮られる通り。食べ歩きしながらゆっくり下って。",
            estimatedCost: "約1,000円",
            transitFromPrev: "清水から徒歩",
          },
          {
            name: "大阪復帰",
            area: "京都 → 心斎橋",
            duration: "1時間",
            description:
              "祇園四条駅まで歩いて京阪線 → 淀屋橋で御堂筋線に乗換 → 心斎橋。夕食前にホテルで一息。",
            estimatedCost: "約800円",
            transitFromPrev: "祇園四条駅まで徒歩10分",
          },
          {
            name: "串カツ だるま(新世界本店)",
            area: "新世界",
            address: "大阪市浪速区恵美須東2-3-9",
            duration: "1時間30分",
            description:
              "串カツ(揚げ串)は大阪のもう1つの名物。だるまは1929年の元祖。共有ソースの二度漬け禁止 — このエリアのルール。フルコースなら15串おまかせを。",
            estimatedCost: "約2,700円",
            bookingTip: "行列が短いのは19時30分前または21時以降。",
            transitFromPrev: "御堂筋線心斎橋 → 動物園前、約10分",
          },
        ],
      },
      {
        theme: "大阪城、市場の朝食、ラストミール",
        summary: "黒門市場の朝食、大阪で最も有名な城をぐるり、そして上品な最後の夕食。",
        stops: [
          {
            name: "黒門市場の朝食",
            area: "日本橋",
            address: "大阪市中央区日本橋2-4-1",
            duration: "1時間30分",
            description:
              "新鮮なウニ、マグロの刺身、焼き和牛串、田舎以外で最高のイチゴを売る600mの屋台市場。立ち食いで、シェアして、最後まで行かず軽めに。",
            estimatedCost: "約3,000円",
            transitFromPrev: "ホテルから徒歩10分",
          },
          {
            name: "大阪城",
            area: "中央区",
            address: "大阪市中央区大阪城1-1",
            duration: "2時間",
            description:
              "秀吉の16世紀の城、20世紀にコンクリートで再建。外観が核 — エメラルドグリーンの瓦屋根、金箔装飾、堀に映る姿。歴史マニアでなければ内部博物館はパス、城周りの公園散歩のほうが良い。",
            estimatedCost: "天守閣入場 約700円",
            bookingTip: "9時ちょうどに到着すれば団体バス回避。11時には天守閣の行列が30分超。",
            transitFromPrev: "千日前線 → 谷町線 → 谷町四丁目、約15分",
          },
          {
            name: "春駒寿司",
            area: "天満",
            duration: "1時間30分",
            description:
              "天神橋筋(2.6km、日本最長の商店街)のアーケードの下にある近所の寿司屋。東京の1/3の値段でミシュラン級のおまかせを出してくれます。カウンター席を強く推奨。",
            estimatedCost: "約4,000円(ランチおまかせ)",
            bookingTip: "ランチは予約不可。12時30分までに到着でカウンター席可能。",
            transitFromPrev: "大阪城から地下鉄 → 南森町、約10分",
          },
          {
            name: "梅田スカイビル",
            area: "梅田",
            duration: "1時間30分",
            description:
              "2つのタワーが頂上の展望台でつながった「空中庭園」。東に生駒山、西に大阪湾。日没直前に行けば昼+夜を一度に。",
            estimatedCost: "約1,300円",
            transitFromPrev: "御堂筋線で約20分",
          },
          {
            name: "遠藤寿司(早めの夕食)",
            area: "福島",
            duration: "1時間",
            description:
              "ラストミールのための立ち食い寿司カウンター。5貫セット700円のみ。隣が中央魚市場なのであり得ないほど新鮮で、あり得ないほど安い。2〜3セット注文してください。",
            estimatedCost: "約2,000円",
            bookingTip: "19時30分閉店、18時30分までに入場が必要。",
            transitFromPrev: "JR環状線で約10分",
          },
          {
            name: "道頓堀夜景散歩(再び)",
            area: "道頓堀",
            duration: "1時間",
            description:
              "ここで始まったので、ここで終わらせて。すべてが光る夜の運河は完全に別の街。コンビニで缶ビール1本買って橋にもたれて旅を締めくくり。",
            estimatedCost: "約400円",
            transitFromPrev: "JR環状線 → 心斎橋地下鉄、約15分",
          },
        ],
      },
    ],
    packingTips: [
      "脱ぎやすい靴 — 神社・旅館・一部食堂で靴を脱ぎます",
      "市場購入用の小さなバッグ(柚子ジャムの瓶など)",
      "胃薬 — 必ず食べ過ぎる",
      "携帯傘 — 大阪の雨は予告なし",
    ],
    budgetEstimate: "ホテル除き1日 約12,000〜17,000円",
    generalTips: [
      "初日にICOCA ICカード発行 — 全電車・バス・自販機タッチ",
      "大阪弁(関西弁)は親しみやすくカジュアル。「おおきに」=ありがとう",
      "チップは失礼。おつりを受け取って",
      "道頓堀の名声と裏腹に屋台のほとんどは21時閉店 — 深夜の予定は事前確認",
    ],
  },

  "nyc-4d-couple": {
    tagline: "カップル4日間 — ミッドタウンの象徴、ブルックリン橋、ブロードウェイ、メット。",
    audience: "カップル · ミドルレンジ",
    destination: "ニューヨーク",
    destinationCountry: "アメリカ",
    overview:
      "ニューヨークをチェックリストのように走り回らず、じっくり観たいカップル向けの4日間。毎日マンハッタンのアイコン1か所、地元のように食べ、夕日にブルックリン橋を渡り、最後の夜はブロードウェイで締めくくり。ホテルはミッドタウン徒歩動線と空港アクセスを両立。",
    bestSeasonNote:
      "4月末〜6月初、または9月中旬〜10月末がベスト — 穏やかな天気、長い日照、耐えられる人混み。7月の湿気と2月の寒さは避けて。",
    currencyTip:
      "一部のボデガと1ドルピザ以外はどこでもカード。座って食べるレストランで18〜22%のチップは選択肢ではありません — それがスタッフの実収入です。",
    languageTip:
      "もちろん英語。ただニューヨーカーはスピード重視 — 早く注文、歩道を塞がず、メトロカードは改札到着前に出しておいて。",
    emergencyNumber: "911(全緊急)",
    hotel: {
      name: "Pod 51 ホテル ミッドタウン・イースト",
      area: "ミッドタウン・イースト",
      address: "230 E 51st St, New York, NY 10022",
      rationale:
        "ミッドタウン・イーストはセントラルパーク・グランドセントラル・市内最高の地下鉄乗換まで徒歩圏で、タイムズスクエアより一段静かなブロックです。Pod 51はコンパクトなモダン客室に夕日用のルーフトップ、JFK行きのE線が1ブロック先。",
      estimatedNightlyRate: "1泊 約25,000円",
    },
    airportTransit: {
      method: "JFK エアトレイン + LIRR → グランドセントラル",
      duration: "約55分",
      cost: "約2,000円(片道)",
      instructions:
        "JFKからエアトレインのサイン(空港内無料)に沿ってジャマイカ駅。ジャマイカでLIRRグランドセントラル行きチケット購入(オフピーク約1,500円、ピーク2,000円)。グランドセントラルからホテルまで北に徒歩8分。ラッシュアワーはUberの半額。エアトレインはE線地下鉄($2.90)とも繋がっていますが乗換2回で1時間。",
    },
    days: [
      {
        theme: "ミッドタウンのアイコン",
        summary: "ポストカード的なマンハッタンでウォームアップ — セントラルパーク、MoMA、クラシックなデリのランチ、夕暮れのロックフェラーセンター。",
        stops: [
          {
            name: "セントラルパーク(ザ・ポンド + ガップストー橋)",
            area: "ミッドタウン",
            duration: "1時間30分",
            description:
              "グランド・アーミー・プラザ(5番街 & 59丁目)から入場。ザ・ポンド沿いに北に歩き、ガップストー橋を渡ってシープ・メドウまで。公園の南端が最も象徴的な景色 + 自転車が少ないエリア。ベセスダ・テラスのキオスクでダンテエスプレッソを1杯。",
            estimatedCost: "無料",
            transitFromPrev: "ホテルから徒歩10分",
          },
          {
            name: "近代美術館(MoMA)",
            area: "ミッドタウン",
            address: "11 W 53rd St",
            duration: "2時間",
            description:
              "全部見ようとしないで。5階から — ヴァン・ゴッホの星月夜、ピカソのアヴィニョンの娘たち、ダリの記憶の固執、モネの睡蓮。すべて1部屋に。残りはボーナス。4階の戦後アメリカンコレクションも世界トップクラス。",
            estimatedCost: "約4,000円",
            bookingTip: "オンラインの時間指定予約で入口の行列回避。金曜夕方16〜20時はUNIQLOスポンサーで無料、ただし非常に混雑。",
            transitFromPrev: "徒歩15分",
          },
          {
            name: "カッツ・デリカテッセン",
            area: "ロウアー・イースト・サイド",
            address: "205 E Houston St",
            duration: "1時間",
            description:
              "1888年からのパストラミ・オン・ライ。入口でもらうチケットを大事に。カッターステーションでパストラミ・オン・ライを注文 + カッターに1ドルチップ(分厚く切ってくれます)。大きいので2人でシェア。",
            estimatedCost: "サンドイッチ1個+サイド2品 約4,000円",
            transitFromPrev: "F線5番街 → 2番街、約20分",
          },
          {
            name: "ニューヨーク公共図書館(ブライアントパーク側)",
            area: "ミッドタウン",
            duration: "45分",
            description:
              "ライオン像が両脇の大理石階段を上って中へ。91メートル天井のローズ・メイン・リーディングルーム — 100年間人々が本物の仕事をしてきた巨大なウッドテーブル。無料。",
            estimatedCost: "無料",
            transitFromPrev: "F線 → 42丁目-ブライアントパーク、約15分",
          },
          {
            name: "トップ・オブ・ザ・ロック展望台",
            area: "ミッドタウン",
            duration: "1時間",
            description:
              "エンパイアステートより良い — スカイラインの中からマンハッタンを見るので。日没30分前のスロットを予約すれば昼+夜を一度に。エンパイアステートが正面真ん中に見えます。",
            estimatedCost: "約6,000円",
            bookingTip: "オンライン予約、ゴールデンアワー30分前 — 2〜3日前に売り切れ。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "キーンズ・ステーキハウス",
            area: "ミッドタウン",
            address: "72 W 36th St",
            duration: "1時間30分",
            description:
              "1885年のチョップハウス。天井にパイプクラブの粘土パイプ9万本がぶら下がっています。マトンチョップが有名ですが本当の注文は骨付きプライムリブ。ブル・ムース・ルームに座って。",
            estimatedCost: "1人 約11,000円",
            bookingTip: "OpenTableで1〜2週間前にプライムタイム予約。当日も21時スロットがよく空いています。",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "ブルックリン + 夕日の橋",
        summary: "地下鉄でDUMBOへ、最も写真映えするブルックリンコーナー散策、ピザ論争のあのピザ、そしてゴールデンアワーに橋を渡ってマンハッタン復帰。",
        stops: [
          {
            name: "A線 → ハイ・ストリート(DUMBO)",
            area: "DUMBO",
            duration: "25分",
            description:
              "ミッドタウンからA/C線でハイ・ストリート-ブルックリン・ブリッジ。出て石畳の坂を下りてワシントン・ストリートへ — レンガ倉庫の間からマンハッタン橋が額縁のように見えるクラシックな写真の場所。",
            estimatedCost: "約400円",
            transitFromPrev: "ホテルから徒歩5分",
          },
          {
            name: "ワシントン・ストリート + マンハッタン橋ビュー",
            area: "DUMBO",
            duration: "30分",
            description:
              "ワシントンとウォーターの交差点に立って。マンハッタン橋がエンパイアステートを額縁にします。これがあのブルックリンの写真。11時前に行かないと団体客に遭遇。",
            estimatedCost: "無料",
            transitFromPrev: "組み込み",
          },
          {
            name: "ジュリアナ・ピザ",
            area: "DUMBO",
            address: "19 Old Fulton St",
            duration: "1時間",
            description:
              "パッツィ・グリマルディの元祖店 — 隣のグリマルディズを売却して80歳でジュリアナを開店。マルゲリータとクラム・ホワイト・パイを注文。一部スライスは現金のみ。",
            estimatedCost: "2人 約4,000円",
            bookingTip: "予約不可。11時15分までに行って12時のラッシュ前に席確保。",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ブルックリン橋公園 + ジェーンズ・カルーセル",
            area: "DUMBO",
            duration: "1時間30分",
            description:
              "公園を西に散歩 — グリーンウェイ、1922年製の回転木馬(ガラス亭で保護)、川向こうのマンハッタンビュー。戻りはブルックリン・ハイツ・プロムナードで違う角度。",
            estimatedCost: "回転木馬乗るなら約400円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "タイムアウト・マーケット(フードホール)",
            area: "DUMBO",
            duration: "1時間",
            description:
              "21の厳選ブルックリンレストランが1つ屋根の下。屋上席からマンハッタンスカイラインビュー。夕日散歩前の午後のおやつに。",
            estimatedCost: "約3,500円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ブルックリン橋を歩く(東→西)",
            area: "ブルックリン橋",
            duration: "45分",
            description:
              "1.8km。ブルックリン側の公園からスタート、太陽がスカイラインの後ろに沈む頃にマンハッタンへ。南側(歩行者)レーン維持(北側は自転車)。",
            estimatedCost: "無料",
            transitFromPrev: "ブルックリン入口まで徒歩10分",
          },
          {
            name: "ロンバルディ・ピザ(米国初の認可ピザ屋)",
            area: "リトルイタリー",
            address: "32 Spring St",
            duration: "1時間",
            description:
              "1905年の石炭窯ピッツェリア。今でも最高かの議論は終わりませんが、歴史は否定不可。ピザの日を締めくくり。",
            estimatedCost: "2人 約4,500円",
            transitFromPrev: "シティホール駅から徒歩10分",
          },
        ],
      },
      {
        theme: "ローワー・マンハッタン + 自由の女神",
        summary: "9/11メモリアル、リバティーフェリー、午後はハイラインを散歩、そしてブロードウェイ1本。",
        stops: [
          {
            name: "9/11メモリアル & 博物館",
            area: "ファイナンシャル・ディストリクト",
            address: "180 Greenwich St",
            duration: "2時間30分",
            description:
              "ツインタワーの跡地に建てられた1エーカーのリフレクティングプール2つ、すべての名前が刻まれています。地下の博物館は圧倒的 — 精神的エネルギーを別途確保して。オキュラス乗換駅から出てください、それは見るべき。",
            estimatedCost: "博物館 約4,000円、メモリアル広場は無料",
            bookingTip: "博物館チケットは2〜3日前にオンライン予約。ウォークインは1時間以上待ち。",
            transitFromPrev: "レキシントン → E線ワールド・トレード・センター、約20分",
          },
          {
            name: "イータリー・ダウンタウン",
            area: "ファイナンシャル・ディストリクト",
            duration: "1時間",
            description:
              "重い午前とフェリーの間の軽めのランチ。パスタカウンターとピザカウンターはどちらもローマ風で速い。バーでワイン1杯。",
            estimatedCost: "約4,000円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "スタチュー・クルーズ・フェリー → リバティ島",
            area: "バッテリーパーク",
            duration: "2時間",
            description:
              "スタチュー・クルーズだけがリバティ・エリスに着岸。チケット1枚で両島可能。クラウンはパス — 小さな窓に長い待ち。台座アクセスで十分。",
            estimatedCost: "約3,200円",
            bookingTip: "1日前にオンライン予約。夏の週末は11時にウォークイン売り切れ。",
            transitFromPrev: "フェリーターミナルまで徒歩15分",
          },
          {
            name: "ハイライン(ガンズヴォート → 34丁目)",
            area: "チェルシー / ミートパッキング",
            duration: "1時間",
            description:
              "古い高架貨物線の上の2.3km線形公園。ガンズヴォートから北へ。30丁目あたりでヴェッセルとハドソンヤードのシェッド。34丁目出口で地下鉄。",
            estimatedCost: "無料",
            transitFromPrev: "1線サウスフェリー → 14丁目、1駅",
          },
          {
            name: "ジョー・アレン(プレシアター)",
            area: "シアター・ディストリクト",
            address: "326 W 46th St",
            duration: "1時間",
            description:
              "1965年のクラシック — 公演前の俳優・スタッフ・観客の席。壁のポスターは有名な興行失敗作。ミートローフかバーガーを頼めば1時間で出てきます。",
            estimatedCost: "1人 約7,000円",
            bookingTip: "18時ちょうど予約 — 20時カーテンに合わせてテーブル回転。",
            transitFromPrev: "A線約15分",
          },
          {
            name: "ブロードウェイ公演",
            area: "シアター・ディストリクト",
            duration: "2時間30分",
            description:
              "本格ブロードウェイの夜。TodayTixまたはタイムズスクエアのTKTSブース(15時オープン)で当日半額チェック。最近のロングラン: ハミルトン、ライオンキング、ウィキッド、ブック・オブ・モルモン。",
            estimatedCost: "公演・席により1人 約11,000〜35,000円",
            bookingTip: "TKTSブース: 14時45分にラインナップを先に見て列に合流。またはTodayTixアプリ。",
            transitFromPrev: "劇場まで徒歩5分",
          },
        ],
      },
      {
        theme: "アッパー・イースト + お別れ",
        summary: "メット、セントラルパーク貯水池散歩、そして最後の完璧なスライスの後にJFK電車。",
        stops: [
          {
            name: "メトロポリタン美術館",
            area: "アッパー・イースト・サイド",
            address: "1000 5th Ave",
            duration: "3時間",
            description:
              "3時間でも足りません。集中: エジプト・ウィング(1階)、ヨーロッパ絵画1200〜1800(2階、611〜644室)、アメリカン・ウィング中庭。デンドゥール神殿があの写真。すべての翼を見ようとしないで。",
            estimatedCost: "約4,000円(観光客定価)",
            bookingTip: "オンライン予約で発券窓口の行列回避。10時オープンで到着すればエジプト・ウィングをほぼ独り占め。",
            transitFromPrev: "6線86丁目 + 徒歩10分、ホテルから約25分",
          },
          {
            name: "セントラルパーク貯水池一周",
            area: "アッパー・イースト・サイド",
            duration: "45分",
            description:
              "ジャッキー・Oで有名になった1.58マイルランニングコース。南にミッドタウンスカイライン、西にアッパー・ウェスト・サイド。晴れた日は最も澄んだビュー。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ジョーズ・ピザ(タイムズスクエア)",
            area: "ミッドタウン",
            address: "1435 Broadway",
            duration: "20分",
            description:
              "$3.50のプレーンスライス、テイクアウト。これ自体がニューヨーク体験。半分に折って歩きながら食べて。油を拭くナプキン持参。",
            estimatedCost: "約600円",
            transitFromPrev: "1線86丁目 → タイムズスクエア、約15分",
          },
          {
            name: "ストランド書店",
            area: "ユニオン・スクエア",
            address: "828 Broadway",
            duration: "1時間",
            description:
              "1927年から18マイルの本。2階の旅行コーナー、3階の希少本ルーム。最後の日のスポットとして、磁石のお土産よりはるかに良いものを持って帰れます。",
            estimatedCost: "平均購入 約3,500円",
            transitFromPrev: "N線約10分",
          },
          {
            name: "マグノリア・ベーカリー(ウェストビレッジ本店)",
            area: "ウェストビレッジ",
            duration: "30分",
            description:
              "注文はカップケーキじゃなくてバナナプディング。小カップ1つが旅のデザートのフィナーレ。",
            estimatedCost: "約1,100円",
            transitFromPrev: "徒歩15分",
          },
          {
            name: "JFK復帰(LIRR)",
            area: "グランドセントラル → JFK",
            duration: "55分",
            description:
              "歩くか6線でグランドセントラル。LIRRでジャマイカ、エアトレインでターミナルへ。国際線は2時間、国内線は90分の余裕。",
            estimatedCost: "約2,000円",
            transitFromPrev: "地下鉄でグランドセントラル、約10分",
          },
        ],
      },
    ],
    packingTips: [
      "歩きやすい靴 — 1日15,000歩以上を予想",
      "携帯傘 — NYCの雨は突然",
      "夏でも軽いジャケット(地下鉄エアコンが北極)",
      "マイボトル — NYCの水道水は清潔でどこでも無料補充",
    ],
    budgetEstimate: "2人でホテル除き1日 約27,000〜40,000円(NYCは高い — 座って食べる2食 + 入場料込み)",
    generalTips: [
      "7日間無制限メトロカード($34) — 12回から元取れる",
      "マンハッタンではUber/Liftが地下鉄より遅い — 渋滞勝つ",
      "屋台ホットドッグは大丈夫、心配いりません",
      "座って食べるレストランで18〜22%チップ。バーで1杯$1。ホテル荷物1個$1。",
    ],
  },

  "bali-5d-couple": {
    tagline: "カップル5日間 — ウブドのライステラス、スミニャックビーチ、ウルワツの夕日。",
    audience: "カップル · リラクゼーション · ミドルレンジ",
    destination: "バリ",
    destinationCountry: "インドネシア",
    overview:
      "2拠点で組んだ5日間 — ライステラスと川渓谷ヨガのウブド2泊、ビーチと夕日ディナーのスミニャック3泊。崖の寺院のウルワツ日帰り1回。観光と同じくらい休息も求めるカップル向けのペース。",
    bestSeasonNote:
      "5月・6月・9月がベスト — 乾燥して湿度低く、人混みが少ない。12〜2月(雨季)と7〜8月(最も混雑)は避けて。3月のニュピ(沈黙の日)は24時間島全体が止まります。",
    currencyTip:
      "インドネシアルピア(IDR)。15,000 IDR ≈ $1。中・高級店はカード、屋台・ワルンは現金。ATMはコンビニ(Circle K、Indomaret)内のみ — 路上ATMはスキミング危険。",
    languageTip:
      "バハサ・インドネシア。「テリマカシ(ありがとう)」一言で80%解決。観光地では英語よく通じます。",
    emergencyNumber: "112(全緊急)、118(救急)",
    hotel: {
      name: "オベロイ・ビーチ・リゾート(スミニャック)",
      area: "スミニャック",
      address: "Jl. Kayu Aya, Seminyak 80361",
      rationale:
        "スミニャックはカップル単一拠点として最適 — ビーチフロント、ディナー徒歩圏、空港40分。オベロイは50年もののリゾートで専用ビーチ、大人向けの雰囲気、茅葺きヴィラ。3〜5泊をここ、1〜2泊はウブドで(Day 1参照)。",
      estimatedNightlyRate: "1泊 約30,000円",
    },
    airportTransit: {
      method: "DPS → ウブド プライベートトランスファー",
      duration: "約75分",
      cost: "約3,500円(片道)",
      instructions:
        "ングラ・ライ国際空港(DPS)からホテル(コマネカ・アット・ビスマ)に事前にピックアップ依頼。空港タクシーは高く観光客の行列が長い。Gojek/Grabアプリは空港ピックアップエリア禁止ですがドロップオフOK。",
    },
    days: [
      {
        theme: "到着 → ウブド",
        summary: "到着、ウブドへプライベートドライブ、川ビューヴィラにチェックイン、フライト疲労回復のための穏やかな夕方。",
        stops: [
          {
            name: "DPS空港 → ウブド",
            area: "バリ南部 → 中部",
            duration: "1時間30分",
            description: "予約済み運転手が到着ロビーで名前ボードを持って待機。デンパサールの渋滞を抜けるとライスフィールドと小さな寺院が広がります。",
            estimatedCost: "約3,500円",
            transitFromPrev: "到着",
          },
          {
            name: "コマネカ・アット・ビスマ(ウブド) — チェックイン",
            area: "ウブド",
            duration: "2時間",
            description: "荷物を解いて、チャンプアン川渓谷の上に浮かぶインフィニティプールで泳ぐ。最初の散歩前に時差回復。",
            estimatedCost: "ウブド拠点 約25,000円/泊",
            transitFromPrev: "運転手ドロップオフ",
          },
          {
            name: "チャンプアン・リッジウォーク",
            area: "ウブド",
            duration: "1時間30分",
            description: "2つの川渓谷の間をつなぐ平坦な2km舗装の尾根 — 両側に背の高い草、午後の遅い光が幻想的。イバホテルから始まり、カルサカフェまで歩いてコーヒー1杯、戻る。",
            estimatedCost: "無料",
            transitFromPrev: "ホテルから徒歩10分",
          },
          {
            name: "モザイク・レストラン・ガストロノミック",
            area: "サンギンガン",
            address: "Jl. Raya Sanggingan",
            duration: "2時間",
            description: "フレンチテクニック + インドネシアン素材のガーデンダイニングルーム。8コース「ディスカバリーメニュー」。食事した分のハーブが育つ庭を通って退店。",
            estimatedCost: "ワイン込み 1人 約13,000円",
            bookingTip: "1週間前にウェブサイト予約。日曜定休。",
            transitFromPrev: "Gojek車で約10分",
          },
        ],
      },
      {
        theme: "ウブド: ライステラス + 寺院 + 滝",
        summary: "フルウブドデー — 早朝のテガラランライステラス、聖水寺院、滝で水浴び、夜の儀式舞踊。",
        stops: [
          {
            name: "テガラランライステラス(日の出)",
            area: "テガララン",
            duration: "1時間30分",
            description: "1000年もののバリ灌漑システム(スバック)が作った棚田。6時45分到着 — 7時30分には霧が晴れ9時には団体バス。写真のためにテラスの下まで降りて。",
            estimatedCost: "入場 約300円 + ブランコ 約300円",
            transitFromPrev: "ホテル車で約20分",
          },
          {
            name: "カウィ・レスト・ライステラス",
            area: "テガララン",
            duration: "1時間",
            description: "テラスビューの朝食。ピサンゴレン(揚げバナナ)、ナシゴレン、濃いバリコーヒー。気取らない場所、ビューがメイン。",
            estimatedCost: "約1,600円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "プラ・ティルタ・エンプル(聖水寺院)",
            area: "タンパクシリン",
            duration: "1時間30分",
            description: "10世紀の寺院、バリヒンドゥー教徒が11個の地下泉でムルカット(浄化儀式)を行います。入口でサロン+腰帯を借りて列に従えば参加可能。着替え持参を。",
            estimatedCost: "入場 約400円 + サロン約300円",
            transitFromPrev: "車で約25分",
          },
          {
            name: "ワルン・リトル・バード",
            area: "ウブド中心部",
            duration: "1時間",
            description: "観光レストランの半額で伝統バリ式ライステーブル(リスタフェル)を出す小さなワルン。ナシ・チャンプル — 1皿に12種類の小さなおかず。ベジタリアン選択肢も優秀。",
            estimatedCost: "約1,300円",
            transitFromPrev: "車で約35分、ウブド復帰",
          },
          {
            name: "テゲヌンガン滝",
            area: "ケメヌ",
            duration: "2時間",
            description: "150段下りると広い滝壺。服の下に水着を着て泳いで、岩で乾かしてまた登る。バリの癒しの一瞬。",
            estimatedCost: "入場 約150円",
            transitFromPrev: "車で約25分南",
          },
          {
            name: "プラ・ダラム・ウブド ケチャ・ファイヤーダンス",
            area: "ウブド",
            duration: "1時間30分",
            description: "60人合唱団がラーマヤナの物語を聞かせ、クライマックスにファイヤーダンス。毎日19時30分。前列は写真用、音響はどこでも素晴らしい。",
            estimatedCost: "約1,100円",
            bookingTip: "18時30分から入口で発券、ほぼ売り切れなし。",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "ウブド → スミニャック",
        summary: "ウブド最後の朝、スミニャックへ移動、ビーチモード・チェックイン。",
        stops: [
          {
            name: "ザ・ヨガ・バーン モーニングヨガ",
            area: "ウブド",
            duration: "1時間30分",
            description: "ライスフィールドの上のオープンエア竹のシャラでハタまたはヴィンヤサのドロップインクラス。ウォークインOK、マット提供。ヨガをしない人にもウブドの代表的体験。",
            estimatedCost: "約1,300円",
            bookingTip: "繁忙期は20分早めに到着。",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "セニマン・コーヒー・スタジオ",
            area: "ウブド中心部",
            duration: "1時間",
            description: "バリ産シングルオリジンコーヒー、店内ロースティング。吊り下げ椅子に座ってプアオーバー1杯、ブレックファストサンドイッチ。ウブド3rdウェーブカフェの元祖。",
            estimatedCost: "約1,300円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ウブド → スミニャック ドライブ",
            area: "中部 → 南部",
            duration: "1時間30分",
            description: "コマネカで事前手配の運転手。南下する道はバトゥブラン(石彫りの村)とデンパサール渋滞を通過。アラスハルムカフェで一度休憩しても良い。",
            estimatedCost: "約3,500円",
            transitFromPrev: "ホテルまで徒歩10分",
          },
          {
            name: "オベロイ — チェックイン + ビーチ",
            area: "スミニャック",
            duration: "3時間",
            description: "チェックイン、着替えてホテル専用ビーチ散歩。オベロイのサンベッドは宿泊者専用。ナシゴレンとビンタンビールでカバナランチ。",
            estimatedCost: "ビーチランチ 約5,000円",
            transitFromPrev: "運転手到着",
          },
          {
            name: "ダブルシックスビーチの夕日",
            area: "スミニャック",
            duration: "1時間30分",
            description: "オベロイから砂浜沿いに南へ。ダブルシックス到着でビーチバーのビーンバッグ(ラ・プランチャのパステルストライプが有名)に陣取り、カクテル1杯、インド洋に落ちる夕日。",
            estimatedCost: "カクテル 約2,000円",
            transitFromPrev: "ビーチ沿いに徒歩15分",
          },
          {
            name: "メラ・プティ",
            area: "スミニャック",
            address: "Jl. Petitenget",
            duration: "2時間",
            description: "高い天井の竹のカテドラルのようなダイニングルーム。シェフ マデ・スワルサのモダンインドネシアン — 皮がカリッとしたルンダン、サンバル・マタを添えた焼きスナッパー。最初のスミニャックディナーに完璧。",
            estimatedCost: "1人 約9,000円",
            bookingTip: "3〜5日前にウェブサイト予約、19時30分〜20時30分がプライム。",
            transitFromPrev: "Gojek約5分",
          },
        ],
      },
      {
        theme: "ウルワツ日帰り",
        summary: "ブキット半島の半日 — パダンパダン・シークレットビーチ、崖の寺院、夕日のファイヤーダンス。",
        stops: [
          {
            name: "ウルワツへドライブ",
            area: "スミニャック → ブキット",
            duration: "1時間",
            description: "1日運転手を事前予約(8時間で約6,000円)。ジンバランを経てブキットに上る道は景色良し。ウルワツループをすると運転手に伝えて。",
            estimatedCost: "1日 約6,000円",
            transitFromPrev: "ホテルで運転手ピックアップ",
          },
          {
            name: "パダンパダンビーチ",
            area: "ウルワツ",
            duration: "2時間",
            description: "岩の間の狭い階段を下りるとホワイトサンドの小さなコーブ。「食べて、祈って、恋をして」最後のシーン撮影地。泳いで、サンベッド借りて、屋台のナシゴレン。",
            estimatedCost: "入場約150円 + サンベッド約400円",
            transitFromPrev: "運転手",
          },
          {
            name: "シングル・フィン(サーファー崖カフェ)",
            area: "ウルワツ",
            duration: "1時間30分",
            description: "ウルワツポイントの崖の上 — 世界級のレフトハンドサーフブレイクが真下。ツナトスタダと冷たいビール。8フィート波に乗るプロを観察。",
            estimatedCost: "約4,000円",
            transitFromPrev: "運転手約15分",
          },
          {
            name: "プラ・ルフール・ウルワツ(崖の寺院)",
            area: "ウルワツ",
            duration: "1時間30分",
            description: "70mの崖上の11世紀ヒンドゥー寺院。入口でサロンレンタル(チケット込み)。マカクザル注意 — メガネ盗みます。寺院両側の崖道を全部歩いて。",
            estimatedCost: "約500円",
            transitFromPrev: "車で5分",
          },
          {
            name: "ウルワツ寺院 ケチャ・ファイヤーダンス",
            area: "ウルワツ",
            duration: "1時間",
            description: "海の上のパフォーマー後ろに沈む夕日の崖の円形劇場で。ウブド版とは違う — これは夕日ポストカード版。到着して発券。",
            estimatedCost: "約1,300円",
            transitFromPrev: "寺院から徒歩5分",
          },
          {
            name: "ジンバランベイ シーフードBBQ",
            area: "ジンバラン",
            duration: "2時間",
            description: "ビーチのシーフードワルンを選んで — メネガまたはインタンシーフードが安全。砂の上のテーブル、重さで売る焼きスナッパー/ロブスター/エビ、夕日は過ぎたが波音だけで充分。バリのシグネチャーディナー。",
            estimatedCost: "1人 約6,000円",
            transitFromPrev: "運転手約25分北",
          },
        ],
      },
      {
        theme: "スミニャック最終日",
        summary: "スパの朝、チャングのライスパディランチ、最後の夕日、そして遅い飛行機の空港移動。",
        stops: [
          {
            name: "ボディワークス・スパ",
            area: "スミニャック",
            address: "Jl. Kayu Jati",
            duration: "2時間",
            description: "バリ式マッサージ本場物。2時間「リチュアル」パッケージにマッサージ + スクラブ + フラワーバス。ホテルスパより安く、技師が良い。",
            estimatedCost: "1人 約7,000円",
            bookingTip: "ウェブサイトWhatsAppで1日前予約。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ザ・ローン チャング",
            area: "チャング",
            duration: "2時間",
            description: "ビーチフロントレストラン + プール + 芝生。ポケボウル、バーガー、スムージー。日本に帰っても話す昼食。",
            estimatedCost: "約4,500円",
            transitFromPrev: "Gojek車で約25分北",
          },
          {
            name: "タナロット寺院",
            area: "タバナン",
            duration: "2時間",
            description: "干潮時のみ歩いて入れる岩の上の16世紀寺院。17〜18時の夕日に合わせて。寺院自体は外国人入場不可だが崖道とビューがメイン。",
            estimatedCost: "約700円",
            transitFromPrev: "車で約30分",
          },
          {
            name: "スンダラ・ビーチ・クラブ(フォーシーズンズ・ジンバラン)",
            area: "ジンバラン",
            duration: "2時間",
            description: "最後の夕食。長いビーチフロントプールデッキ、夕暮れのティキトーチ、シーフードとカクテル。高いがお別れディナー。ビーチフロントテーブル予約を。",
            estimatedCost: "1人 約12,000円",
            bookingTip: "5〜7日前にウェブサイト予約、18時30分の夕日スロット。",
            transitFromPrev: "車で約30分南",
          },
          {
            name: "スンダラ → DPS空港",
            area: "ジンバラン → 空港",
            duration: "30分",
            description: "スンダラのコンシェルジュに事前に車を予約。その時間なら空港まで30分。国際線チェックインの2時間余裕。",
            estimatedCost: "約2,000円",
            transitFromPrev: "ディナー後直行",
          },
        ],
      },
    ],
    packingTips: [
      "サロン(寺院入場必須 — 忘れたら入口で借りる)",
      "リーフセーフ日焼け止め(インドネシア一部ビーチでは通常品禁止)",
      "乾季でも午後のスコール用の軽いレインコート",
      "DEET虫除けスプレー(ウブドの夜用)",
      "ビーチ用ビーチサンダル + 寺院用ウォーキングサンダル1足",
    ],
    budgetEstimate: "2人でホテル除き1日 約27,000〜38,000円",
    generalTips: [
      "GojekとGrabダウンロード — 24/7英語タクシー、路上運転手の1/4の値段",
      "Circle Kや銀行内のATMだけ使用 — カードスキミング既知問題",
      "水はミネラルウォーターのみ、良い店の氷はOK",
      "チップ10%は喜ばれるが義務ではない。ポーターは荷物1個 5,000〜10,000 IDR",
    ],
  },

  "taipei-3d-solo": {
    tagline: "ソロ3日間 — 夜市、台北101、そして九份の提灯日。",
    audience: "ソロ · 節約",
    destination: "台北",
    destinationCountry: "台湾",
    overview:
      "ソロ台北3日間 — アジアで最も過小評価された首都です。歩きやすく、親切で、食に本気。このプランは3つの軸: 毎日夜市、1回の大きな街ビュー、そして「千と千尋の神隠し」のあの茶屋を訪ねる九份日帰り。節約フレンドリー — 食事のほとんどが1,500円以下。",
    bestSeasonNote:
      "10〜11月と3〜4月が最も快適。夏(6〜9月)は暑く湿度高く台風、冬は穏やか(約15℃)ですが雨が多い。",
    currencyTip:
      "新台湾ドル(NT$またはTWD)。30 TWD ≈ $1。7-Elevenと大きな店はカード。夜市は現金のみ。地下鉄駅でEasyCard発行 — 交通+コンビニ決済用。",
    languageTip:
      "標準中国語。地下鉄と観光地は英語表記、夜市は少なめ。指差しでOK。「シェイシェイ(ありがとう)」と軽い会釈で十分。",
    emergencyNumber: "110(警察)、119(救急/消防)",
    hotel: {
      name: "シーメンシティズンホテル",
      area: "西門町",
      address: "No. 77, Kunming St., Wanhua District",
      rationale:
        "西門町は台北の渋谷 — 歩行者天国、若く、深夜2時まで営業。シティズンホテルは3つ星価格の堅実なビジネスホテルでロビーから地下鉄駅徒歩2分。他の主要エリアまでMRTで15分。",
      estimatedNightlyRate: "1泊 約9,000円",
    },
    airportTransit: {
      method: "MRT桃園空港線(エクスプレス) → 台北駅",
      duration: "約45分 + 地下鉄5分",
      cost: "約700円",
      instructions:
        "桃園(TPE)からMRTサインに沿って紫の空港線エクスプレス(2駅のみ停車)で台北駅まで約35分。ブルーラインに乗換て1駅で西門駅。発券窓口でEasyCard発行(NT$100保証金) — 3日間すべての決済に使用。",
    },
    days: [
      {
        theme: "台北中心部 + 初の夜市",
        summary: "龍山寺、牛肉麺巡礼、象山から街ビュー、夕方は士林夜市。",
        stops: [
          {
            name: "龍山寺",
            area: "萬華",
            address: "No. 211, Guangzhou St., Wanhua District",
            duration: "1時間",
            description: "1738年創建、台北で最古かつ雰囲気のある寺院。仏教・道教・民間信仰の神々が同じ祭壇を共有。本殿で地元民が筊杯(月の占い)を行う様子を観察。無料、6時オープン。",
            estimatedCost: "無料",
            transitFromPrev: "ホテルから徒歩5分",
          },
          {
            name: "林東芳牛肉麺",
            area: "中山",
            address: "No. 274, Bade Rd., Zhongshan District",
            duration: "1時間",
            description: "台湾の国民食、40年の老舗。半筋・半すね肉の透き通ったスープを注文。11時15分までに到着しないと正午から始まる30分の行列に。",
            estimatedCost: "約1,000円",
            transitFromPrev: "MRTブルー → レッド → 忠孝復興、約15分",
          },
          {
            name: "誠品信義(書店 + ライフスタイル)",
            area: "信義",
            duration: "1時間30分",
            description: "台北の文化的リビングルームになった24時間フラッグシップ書店。6階の本、文房具、茶器、衣類。3階の英語旅行コーナーは台北日程のすき間埋めに最適。",
            estimatedCost: "本を買えば約2,000円",
            transitFromPrev: "MRTレッド → 象山、約10分",
          },
          {
            name: "台北101展望台",
            area: "信義",
            duration: "1時間30分",
            description: "かつて世界一だった508mタワー。89階屋内展望台では660トンの制振ペンデュラムが見えます — 台風でも揺れを抑える装置。91階屋外デッキが本当のビュー。17時頃に行けば昼+夕日を一度に。",
            estimatedCost: "約2,700円",
            bookingTip: "オンライン1日前予約で発券窓口の行列回避。夕日スロットは売り切れ多発。",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "象山ハイキング",
            area: "信義",
            duration: "1時間30分",
            description: "20分の急な石段の上に台北101の最も有名な写真アングル。ここの夕日が台北シグネチャービュー — 信義スカイラインの中に額縁のように入った101タワー。水持参。",
            estimatedCost: "無料",
            transitFromPrev: "MRT象山駅から登山口まで徒歩10分",
          },
          {
            name: "士林夜市",
            area: "士林",
            duration: "2時間",
            description: "台北最大の夜市。目標: 牡蠣オムレツ、臭豆腐(勇気あれば)、入口側のトーチ焼き牛キューブ、バブルミルクティー、マンゴーかき氷。地下フードコートが清潔、屋外路地が楽しい。",
            estimatedCost: "数品 約2,500円",
            transitFromPrev: "MRTレッド → 剣潭、約25分",
          },
        ],
      },
      {
        theme: "日帰り: 九份 + 十分",
        summary: "電車で海岸沿いを北上、九份の茶屋提灯、戻り道に十分のスカイランタン。",
        stops: [
          {
            name: "TRA電車 → 瑞芳",
            area: "台北駅 → 瑞芳",
            duration: "45分",
            description: "台北駅まで歩くか地下鉄。TRA(台湾鉄道)普通列車で瑞芳行き切符購入。トンネルを過ぎると右側の席から海ビュー。",
            estimatedCost: "約300円",
            transitFromPrev: "MRT台北駅、約5分",
          },
          {
            name: "九份老街",
            area: "九份",
            duration: "3時間",
            description: "金鉱の山村が雰囲気のある観光村に変身。狭い石段、吊り下がった赤提灯、海の上の茶屋。豎崎路の阿妹茶樓が最もInstagram用 — 週末40分待ち。シードチャや九份茶坊が静かで景色は同じ。",
            estimatedCost: "茶ポット1つ 約1,300円",
            bookingTip: "平日推奨。土曜は団体バス行列なので絶対避けて。",
            transitFromPrev: "瑞芳から788/1062番バス約15分",
          },
          {
            name: "阿柑姨芋圓",
            area: "九份",
            duration: "30分",
            description: "九份で最も有名なおやつ — もちもちのタロイモ・サツマイモ団子をあずきスープに浮かべて。冬は温かく、夏はかき氷で。現金のみ。",
            estimatedCost: "約400円",
            transitFromPrev: "老街内徒歩2分",
          },
          {
            name: "シャトル → 十分",
            area: "九份 → 十分",
            duration: "45分",
            description: "788番バスで瑞芳、TRA平渓線東行きで十分。または片道シャトル(約1,000円)。電車のほうが安く渓谷の景色も良い。",
            estimatedCost: "約400円",
            transitFromPrev: "バスで瑞芳復帰",
          },
          {
            name: "十分スカイランタン上げ",
            area: "十分",
            duration: "1時間",
            description: "駅の隣の店で紙ランタン購入(約700円)、筆で四方に願い事を書いて、電車が来ない時に線路上で上げる。観光地ですが夕暮れには本当に魔法のよう。",
            estimatedCost: "約700円",
            transitFromPrev: "十分駅から徒歩",
          },
          {
            name: "十分大瀑布",
            area: "十分",
            duration: "1時間",
            description: "幅20m、ナイアガラスタイル。スカイランタンエリアから川の歩道橋で徒歩10分。電車に乗る前の写真スポットに。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "饒河街夜市",
            area: "松山",
            duration: "1時間30分",
            description: "士林より小さく集中度高い — 入口の粘土窯で焼く胡椒餅(行列の価値あり)、薬膳スペアリブスープ、600m1本道で全部見られる。",
            estimatedCost: "約2,000円",
            transitFromPrev: "電車 → 松山駅、計1時間",
          },
        ],
      },
      {
        theme: "中正紀念堂 + 永康 + 大稲埕",
        summary: "記念堂、フーディーストリート、台北最も保存された旧街。空港前に最後の小籠包を1食。",
        stops: [
          {
            name: "中正紀念堂",
            area: "中正",
            duration: "1時間30分",
            description: "白大理石記念堂に6.3mの青銅の蒋介石像。毎正時の衛兵交代式 — スローモーション振り付けのような儀式。外の庭園も平和的。",
            estimatedCost: "無料",
            transitFromPrev: "MRTレッド → CKS紀念堂、約10分",
          },
          {
            name: "鼎泰豊(永康本店)",
            area: "永康",
            address: "No. 194, Xinyi Rd. Sec. 2",
            duration: "1時間",
            description: "1972年ミシュラン小籠包帝国の元祖。包子1つに18ひだ。酔っ払い鶏、ワンタンスープ、デザートのチョコ小籠包まで。",
            estimatedCost: "約3,500円",
            bookingTip: "11時15分までに到着で11時45分のラッシュ前入店。4人未満は予約不可。",
            transitFromPrev: "CKSから徒歩15分",
          },
          {
            name: "永康街散策",
            area: "大安",
            duration: "1時間",
            description: "台北で最も歩きやすい食事・ショッピング通り。スムージー、マンゴーかき氷、カフェ、小規模ブティック。鼎泰豊からMRTまでウィンドウショッピング。",
            estimatedCost: "デザート1杯 約1,100円",
            transitFromPrev: "徒歩",
          },
          {
            name: "大稲埕老街(迪化街)",
            area: "大同",
            duration: "1時間30分",
            description: "台北で最も保存された旧街 — 清末バロック様式の商家が乾物・茶・漢方・布を販売。霞海城隍廟で縁結びお守り。ASW茶坊が古台北最高のバブルティー。",
            estimatedCost: "約800円",
            transitFromPrev: "MRTグリーン → レッド → 大橋頭、約15分",
          },
          {
            name: "阜杭豆漿",
            area: "中正",
            duration: "45分",
            description: "毎朝10時まで行列の朝食老舗。遅い時間なら近くの午後営業店を試して。温かい塩豆漿 + 油條(揚げパン) + 蛋餅(卵クレープ)。現金のみ。",
            estimatedCost: "約700円",
            transitFromPrev: "MRTオレンジ線 約20分",
          },
          {
            name: "大安森林公園",
            area: "大安",
            duration: "45分",
            description: "台北のセントラルパーク。空港前の休憩スポット — 亀のいる池、ジョギングトラック、木々の上の街スカイライン。公園側の屋台で茶1杯。",
            estimatedCost: "約400円",
            transitFromPrev: "MRTレッド → 大安森林公園、約15分",
          },
          {
            name: "桃園空港復帰",
            area: "大安 → TPE",
            duration: "55分",
            description: "MRTレッド → 台北駅 → 空港線エクスプレス乗換。国際線2時間余裕で十分 — 桃園セキュリティは速い。",
            estimatedCost: "約700円",
            transitFromPrev: "MRT",
          },
        ],
      },
    ],
    packingTips: [
      "携帯傘 — 台北の雨は通年突然",
      "現金財布 — 夜市の屋台のほとんどはカード不可",
      "足保護パッド — コンクリート上1日15,000歩超",
      "夏の扇子 — 湿度が容赦ない",
    ],
    budgetEstimate: "ホテル除き1日 約9,000〜13,000円",
    generalTips: [
      "到着即EasyCard — MRT・バス・YouBike・コンビニすべて使用可",
      "MRT内飲食禁止 — NT$1,500〜7,500罰金。水もダメ。",
      "チップ文化なし。中級レストランは10%サービス料自動加算。",
      "7-ElevenとFamilyMartが友達 — ATM、SIM、公共料金、夜中2時のラーメン",
    ],
  },

  "hanoi-4d-solo": {
    tagline: "ソロ4日間 — 旧市街のフォー巡りとハロン湾日帰り。",
    audience: "ソロ · 節約",
    destination: "ハノイ",
    destinationCountry: "ベトナム",
    overview:
      "ソロハノイ4日間 — 東南アジアで最もキャラクターの濃い街の1つです。バイクのカオス、明け方の200円フォー、1000年の寺院、そして一度の贅沢としてハロン湾日帰り。節約フレンドリー、3食1,000円以下も可能。",
    bestSeasonNote:
      "10月〜4月が乾季のハノイで快適な気温。5〜9月は雨季、街は機能しますが午後の豪雨頻発。旧正月(1〜2月)前後は多くのレストランが閉店。",
    currencyTip:
      "ベトナムドン(VND)。24,000 VND ≈ $1。ホテルと観光レストランはカード、屋台料理と地元店は現金。小額紙幣(10k、20k、50kドン)が金。",
    languageTip:
      "ベトナム語。「カムオン(ありがとう)」でほとんど解決。ホテル外は英語限定的。Google翻訳のオフラインパックが毎日数回助けてくれます。",
    emergencyNumber: "113(警察)、115(救急)、114(消防)",
    hotel: {
      name: "ハノイ・ラ・シエスタ・クラシック・ママイ",
      area: "旧市街",
      address: "94 Ma May St., Hoan Kiem District",
      rationale:
        "マーマイ通りは旧市街の中心 — すべてのフォー屋台、ビアホイ(街角ビール)、週末の夜市が徒歩5分。ラ・シエスタは安定したサービス、夕日用ルーフトップバー、価格帯最高の朝食ビュッフェの小さなブティック。",
      estimatedNightlyRate: "1泊 約10,000円",
    },
    airportTransit: {
      method: "ホテルピックアップまたは86番空港バス",
      duration: "トランスファー約45分 / バス約60分",
      cost: "プライベート 約2,000円 / バス 約200円",
      instructions:
        "ノイバイ国際空港(HAN)から最も簡単なのはホテルピックアップ — 到着ロビーで名前ボード持った運転手が待機。節約: 86番空港バスが20分間隔でホアンキエム湖まで(約1時間、35,000 VND)。タクシー窓口のGrab/タクシーは約3,000円。空港で路上タクシーを拾わないで — 詐欺料金が一般的。",
    },
    days: [
      {
        theme: "旧市街入門",
        summary: "チェックイン、36の旧街散歩、伝統水上人形劇、そしてアジア最安のビアホイ。",
        stops: [
          {
            name: "ラ・シエスタ チェックイン + ルーフトップ",
            area: "旧市街",
            duration: "1時間",
            description: "荷物を解いて、シャワーを浴びて、ルーフトップへ。冷たいサイゴンビールと旧市街の赤茶色の瓦屋根の360度ビューで方向感覚を。",
            estimatedCost: "ビール 約500円",
            transitFromPrev: "空港から",
          },
          {
            name: "ホアンキエム湖 + 玉山祠",
            area: "ホアンキエム",
            duration: "1時間30分",
            description: "ハノイの心臓。湖を反時計回りに回って、赤いフック橋を渡って小さな島の玉山祠へ。太極拳をする祖母たち、デート中の若いカップル。一周で街の魂。",
            estimatedCost: "祠 約200円",
            transitFromPrev: "ホテルから徒歩5分",
          },
          {
            name: "旧市街の街名散歩",
            area: "旧市街",
            duration: "1時間",
            description: "旧市街の36通りはそれぞれ昔そこで売られていた品物の名前 — ハンバック(銀)、ハンガイ(絹)、ハンマー(紙)、ハンティック(錫)。湖からハンダオに沿って北へ、4〜5通りループ、伝統がどれだけ生きているか。",
            estimatedCost: "無料",
            transitFromPrev: "組み込み",
          },
          {
            name: "タンロン水上人形劇場",
            area: "ホアンキエム",
            address: "57B Dinh Tien Hoang",
            duration: "1時間",
            description: "11世紀ベトナムの芸術 — 人形が腰の深さの水の舞台で踊り、竹のカーテンの後ろから棒で操ります。ナレーションはベトナム語ですが視覚的コメディだけで十分。50分公演にライブ伝統音楽。",
            estimatedCost: "約500円",
            bookingTip: "公演30分前に発券 — 18時30分と20時公演は繁忙期売り切れ。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ブンチャ・タ",
            area: "旧市街",
            address: "21 Nguyen Huu Huan",
            duration: "1時間",
            description: "ハノイのシグネチャー — 甘いつけ汁にグリル豚肉、ブン(米麺)、新鮮なハーブの山。ブンチャ・タは雰囲気(古民家)が最高で、オバマ/ボーディン以後も品質が落ちていません。",
            estimatedCost: "約800円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ビアホイコーナー(タヒエン + ルオンゴックフエン)",
            area: "旧市街",
            duration: "1時間",
            description: "ハノイで最も有名な街角の小さな赤プラスチック椅子に座って。ビアホイは5,000ドン(30円)の新鮮ビール — 朝に丸ごと配達。ピーナッツ無料。キュレートされたバーではない街路の本当の夜文化。",
            estimatedCost: "約400円",
            transitFromPrev: "徒歩3分",
          },
        ],
      },
      {
        theme: "ハロン湾日帰り",
        summary: "旅唯一の贅沢 — 1,600の石灰岩カルスト島々を巡る長い1日。洞窟、カヤック、シーフードランチ。",
        stops: [
          {
            name: "ツアーシャトルピックアップ → ハロン",
            area: "旧市街 → ハロン",
            duration: "3時間",
            description: "予約済みクルーズツアーが7時30分〜8時頃に主要旧市街ホテルでピックアップ。中級デイクルーズ運営社を選んで(バヤ、インドシナ・ジャンク、パラダイス) — 5,000〜9,000円。東に3時間運転、トイレ休憩1回。",
            estimatedCost: "ツアーに含む",
            transitFromPrev: "ホテルロビーピックアップ",
          },
          {
            name: "ハロン湾クルーズ",
            area: "ハロン湾",
            duration: "5時間",
            description: "伝統的な「ジャンク」船に乗船、エメラルドの水の上にそびえる石灰岩カルストの間を航海。普通: 船内ランチ(数コースシーフード)、隠れラグーンでカヤック、スンソット(驚き)洞窟またはティエンクン(天宮)洞窟訪問、デッキでの水泳。",
            estimatedCost: "中級デイツアー 約7,500円",
            bookingTip: "フラミンゴトラベルやスリーランドトラベルなど正規エージェンシー予約を。2,500円格安ツアーは避けて — 船が安全ではない。",
            transitFromPrev: "港乗船",
          },
          {
            name: "ハノイ復帰",
            area: "ハロン → 旧市街",
            duration: "3時間",
            description: "バスで戻り、休憩1回。19時〜19時30分頃ホテル到着。長い1日 — ホテル近くの静かなディナーでご褒美。",
            estimatedCost: "含む",
            transitFromPrev: "港出発",
          },
          {
            name: "チャーカー・ラーボン",
            area: "旧市街",
            address: "14 Cha Ca St.",
            duration: "1時間",
            description: "1871年からの単一メニュー店 — ターメリックマリネのナマズをテーブル上の土器コンロでディルとネギと炒めて、米麺・ピーナッツ・魚醤と。メニューはこれだけ。屋台料理より贅沢する価値あり。",
            estimatedCost: "約1,600円",
            transitFromPrev: "ホテルから徒歩10分",
          },
        ],
      },
      {
        theme: "帝都ハノイ",
        summary: "ホー・チ・ミン廟、文廟、ハノイ・トレイン・ストリート、そして遅めのランチはフレンチクォーター。",
        stops: [
          {
            name: "フォーザーチュエン(バッダン) — 朝のフォー",
            area: "旧市街",
            address: "49 Bat Dan St.",
            duration: "45分",
            description: "現地民のほとんどが認めるハノイ最高のフォーボー(牛肉麺)。並んで、注文、支払い、座る — セルフサービス。大きく音を立てて啜って、唐辛子とライム追加。6時オープン、スープ切れで閉店(〜10時)。",
            estimatedCost: "約400円",
            transitFromPrev: "ホテルから徒歩7分",
          },
          {
            name: "ホー・チ・ミン廟",
            area: "バーディン",
            duration: "1時間30分",
            description: "「ホーおじさん」の遺体が花崗岩の廟に — 1945年彼がフランスから独立を宣言したバーディン広場の上。厳格なドレスコード(肩・膝を覆う、半ズボン禁止)。中は静寂。月・金休館。",
            estimatedCost: "無料",
            bookingTip: "9時到着 — 早めなら行列が早く、10時30分頃には45分に伸びます。",
            transitFromPrev: "Grabで約15分",
          },
          {
            name: "文廟(ヴァンミエウ)",
            area: "ドンダー",
            duration: "1時間30分",
            description: "ベトナム初の大学、1070年創建。5つの中庭の楼閣、龍の彫刻の池、1442〜1779年の科挙合格者の名前が刻まれた82の石碑 — 各々石亀の上に。ハノイで最も儒教的な隅。",
            estimatedCost: "約200円",
            transitFromPrev: "Grabで約10分",
          },
          {
            name: "バインミー25",
            area: "旧市街",
            address: "25 Hang Ca",
            duration: "45分",
            description: "ハノイ最高のバインミー。カリッとしたバゲット、パテ、豚肉、酢漬け人参・大根、コリアンダー、唐辛子。「バインミー25スペシャル」(全肉)を注文。道路向かいのプラ椅子で。",
            estimatedCost: "約300円",
            transitFromPrev: "Grabで約15分",
          },
          {
            name: "ハノイ・トレイン・ストリート",
            area: "ホアンキエム",
            duration: "1時間",
            description: "住宅街の路地の間の狭い道に実際に運行する列車レール。カフェに座っていれば15時20分または19時20分の列車がコーヒーカップから2m脇を通り過ぎます。カフェ経由で入場(50,000ドンカバーチャージ)。",
            estimatedCost: "約300円",
            bookingTip: "列車時刻は現地確認 — 頻繁に変わります。カフェが教えてくれる。",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ハノイ・オペラハウス + フレンチクォーター",
            area: "フレンチクォーター",
            duration: "1時間",
            description: "1911年パリオペラを模した新古典主義のオペラハウス。公演がない時は通常内部入場不可ですが、周りのフレンチクォーターの通り(チャンティエン、ゴクエン)は1920年代のヴィラと広い大通り — 旧市街のカオスとは植民地のコントラスト。",
            estimatedCost: "無料",
            transitFromPrev: "Grabで約10分",
          },
          {
            name: "ンゴンガーデン",
            area: "フレンチクォーター",
            address: "70 Nguyen Du",
            duration: "1時間30分",
            description: "ガーデン設定のフードホール、50種類以上のベトナム地方料理。前菜・スープ・グリル・デザートを混ぜて注文。観光地化されていますが品質安定。お別れディナーに。",
            estimatedCost: "約2,500円",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "西湖 + 空港",
        summary: "鎮国寺、西湖の朝、最後のエッグコーヒー、そして落ち着いた空港移動。",
        stops: [
          {
            name: "鎮国寺",
            area: "西湖",
            address: "Thanh Nien Rd.",
            duration: "1時間",
            description: "ハノイ最古の寺院(541年)。西湖の小島に赤と金の仏塔、短い堤防でつながっています。菩薩像の横を歩く僧侶たち。最終日の始まりとして平和的。",
            estimatedCost: "無料(寄付歓迎)",
            transitFromPrev: "Grabで約15分",
          },
          {
            name: "ジャンカフェ エッグコーヒー",
            area: "旧市街",
            address: "39 Nguyen Huu Huan",
            duration: "45分",
            description: "1946年牛乳不足の時代にハノイが発明したエッグコーヒー。ジャンは元祖の家族が今も運営 — 加糖練乳と泡立てた卵黄が熱いエスプレッソの上に浮かびます。液体ティラミスの味。狭い2階席へ。",
            estimatedCost: "約300円",
            transitFromPrev: "Grabで約10分",
          },
          {
            name: "ドンスアン市場",
            area: "旧市街",
            duration: "1時間",
            description: "ハノイ最大の屋根市場 — 4階の衣類、バッグ、生活用品、コピー品、奥のフードコーナー。最後のお土産買い物にいい(シルクスカーフ、コーヒー、ロータスティー)。最初の値段から30〜50%値切り。",
            estimatedCost: "ギフト数個 約2,000円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ブンリエウ(40 Hang Tre)",
            area: "旧市街",
            duration: "1時間",
            description: "最後のローカル一食 — ブンリエウは北ベトナム独自のトマト・カニ麺スープ、豚肉と揚げ豆腐トッピング。小さな椅子に座る街角キッチン。1988年からその場所で煮込んでいるおばあちゃん。",
            estimatedCost: "約400円",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ホテル立ち寄り荷物受取",
            area: "旧市街",
            duration: "1時間",
            description: "ホテル復帰、必要ならシャワー、保管所から荷物。空港送迎を事前要請。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ノイバイ空港復帰",
            area: "旧市街 → HAN",
            duration: "45分",
            description: "予約済みホテルピックアップでノイバイ。国際線3時間余裕 — ノイバイのセキュリティは遅め。",
            estimatedCost: "約2,000円",
            transitFromPrev: "ホテルピックアップ",
          },
        ],
      },
    ],
    packingTips: [
      "ジッパー付きクロスバッグ — 旧市街のバイクが緩いバッグを引っ掛けます",
      "寺院・廟用の長ズボンまたはスカート",
      "手指消毒剤 — 手で食べることが多いです",
      "小さな傘または雨具 — 乾季でも午後のスコール頻発",
      "現金ベルトまたはポーチ — ATMは多いが行列長め",
    ],
    budgetEstimate: "ホテル除き1日 約7,000〜11,000円(ハロン湾が贅沢 — 1回 8,000円)",
    generalTips: [
      "タクシーは絶対Grab — 値段固定・透明",
      "路上で寄ってくる「Mai Linh」タクシーは絶対乗らないで — 偽物",
      "道渡り: ゆっくり一定速度で歩けばバイクが避けてくれます。突然止まらない。",
      "チップ義務ではないが小銭の繰り上げは歓迎",
      "SIM: 空港でビエッテル/ベトナモバイル eSIM 約1,000円 / 10GB",
    ],
  },

  "london-4d-couple": {
    tagline: "カップル4日間 — 大英博物館、バラマーケット、オックスフォード日帰り。",
    audience: "カップル · ミドルレンジ",
    destination: "ロンドン",
    destinationCountry: "イギリス",
    overview:
      "観光バス感なくクラシックなロンドンを観たいカップル向けの4日間。午前は世界最高の無料博物館、午後はマーケットと王立公園散歩、そして1日はオックスフォードまるごと。ホテルはウエストエンド徒歩 + パディントン・エクスプレスでヒースローへ素早く行けるよう選定。",
    bestSeasonNote:
      "5月〜6月初、9月〜10月初がベスト — 快適な気温、長い日照、耐えられる人混み。7〜8月は暑く混雑、1月は最安だが最も暗い。",
    currencyTip:
      "ポンド(GBP)。カードとコンタクトレスがどこでも — 4日間現金一度も触らずに過ごせます。クレジットカードを地下鉄改札にタップすれば日次キャップ(約£8.10)が自動適用。",
    languageTip:
      "イギリス英語。「Ta」=ありがとう、「cheers」=ありがとう+さようなら、「sorted」=終わった。パブ注文はバーへ直行 — 席で待たない。",
    emergencyNumber: "999(全緊急)",
    hotel: {
      name: "ザ・Zホテル・ヴィクトリア",
      area: "ヴィクトリア",
      address: "19 Saint George's Dr, Pimlico",
      rationale:
        "ヴィクトリアはバッキンガム宮殿徒歩10分、ヒースロー行きエクスプレス線、4本の地下鉄路線乗換。Zホテルは小さいがモダンな客室、ウォーターフォールシャワー、安定したWi-Fi、まずまずのロビーカフェ — 終日外にいるカップルにぴったり。",
      estimatedNightlyRate: "1泊 約23,000円",
    },
    airportTransit: {
      method: "ヒースロー・エクスプレス → パディントン → 地下鉄でヴィクトリア",
      duration: "約35分",
      cost: "約5,000円(片道、または遅い地下鉄なら約700円)",
      instructions:
        "ヒースロー(LHR)からヒースロー・エクスプレスが15分間隔、ノンストップでパディントンまで15分。2週間前オンライン予約で約2,500円。パディントンからサークル線でヴィクトリアまで5駅12分。節約: ピカデリー地下鉄線がヴィクトリア直通50分、ピーク約700円/オフピーク約400円。コンタクトレスカードタップ — 紙チケット不要。",
    },
    days: [
      {
        theme: "ウェストミンスター & サウスバンク",
        summary: "ロンドンクラシックポストカードコース — ビッグベン、ウェストミンスター寺院、テート・モダン川沿い散歩、パブディナー。",
        stops: [
          {
            name: "ビッグベン + ウェストミンスター橋",
            area: "ウェストミンスター",
            duration: "45分",
            description: "エリザベスタワー(ビッグベンが入っている)は2017〜2022の清掃を経て1859年の姿 — できたばかりのゴシックのよう。ウェストミンスター橋を渡ってロンドンアイを入れた写真を。国会議事堂はすべての英国映画で見たあの川沿い。",
            estimatedCost: "無料",
            transitFromPrev: "地下鉄ディストリクト線ヴィクトリア → ウェストミンスター、約5分",
          },
          {
            name: "ウェストミンスター寺院",
            area: "ウェストミンスター",
            address: "20 Deans Yd",
            duration: "2時間",
            description: "1066年以来戴冠の教会。エドワード5世・8世以外すべてのイングランド君主がここで即位、ニュートン・ダーウィン・ホーキングが科学者コーナーに眠っています。レディチャペルの扇形天井のためにオーディオガイド + 2時間確保を。",
            estimatedCost: "約4,800円",
            bookingTip: "2〜3日前オンライン予約。土曜は1週間前売り切れ。",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "バラマーケット ランチ",
            area: "サザーク",
            duration: "1時間30分",
            description: "ロンドン最古のフードマーケット。立ち食いで — カパカセインのグリルドチーズ、ブリンディサのパエリア、ル・マルシェ・デュ・カルティエのダックコンフィ・バゲット。記憶に残るランチ。",
            estimatedCost: "約3,000円",
            transitFromPrev: "ジュビリー線ウェストミンスター → ロンドンブリッジ、約15分",
          },
          {
            name: "テート・モダン",
            area: "サウスバンク",
            duration: "2時間",
            description: "元発電所がヨーロッパで最も重要な現代美術館に。常設は無料。ロスコ、ピカソ、ベーコン、ポロック。10階のビューテラスが川向こうのセント・ポール大聖堂の無料最高ビュー。",
            estimatedCost: "無料(特別展別)",
            transitFromPrev: "川沿いに徒歩10分",
          },
          {
            name: "ミレニアム橋 + セント・ポール外観",
            area: "サウスバンク → シティ",
            duration: "45分",
            description: "歩行者専用ミレニアム橋を渡ってセント・ポール側へ。1710年レンの傑作の外観はまだ無料 — ウィスパリングギャラリーに登る決意ない限り有料内部はパス。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ザ・ジョージ・イン",
            area: "サザーク",
            address: "75-77 Borough High St.",
            duration: "1時間30分",
            description: "ロンドンに残る唯一のギャラリー付きコーチングイン — 1677年、ナショナル・トラスト所有。本格パブディナー: マッシュドピー添えのフィッシュ&チップスとウッドパネルルームの生ビール。ディケンズが飲んだ場所。",
            estimatedCost: "2人で飲み物込み 約5,800円",
            bookingTip: "OpenTableで予約 — ダイニングルーム小さく、ビアガーデンは早い者勝ち。",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "大英博物館 + コヴェント・ガーデン + ソーホー",
        summary: "午前は世界級博物館、午後はマーケットとセブンダイヤルズ、ディナーはソーホー。",
        stops: [
          {
            name: "大英博物館",
            area: "ブルームズベリー",
            address: "Great Russell St",
            duration: "3時間",
            description: "無料。800万点の遺物、94ギャラリー。集中: ロゼッタストーン(4室)、パルテノンマーブル(18室)、エジプトミイラ(62〜63室)、サットン・フー宝物(41室)。グレートコートのガラス天井だけでも行く価値。",
            estimatedCost: "無料",
            bookingTip: "無料時間指定チケットをオンライン予約でセキュリティ列回避。",
            transitFromPrev: "地下鉄ヴィクトリア → トッテナム・コート・ロード、約15分",
          },
          {
            name: "フラット・アイアン(コヴェント・ガーデン)",
            area: "コヴェント・ガーデン",
            address: "17-18 Henrietta St",
            duration: "1時間",
            description: "£14でフェザーステーキ、ドリッピングチップス、グリルドトマト、入店時のポップコーン。財布にも優しい完璧なロンドンランチ。予約不可 — 行って名前書いて、席空いたら通知。",
            estimatedCost: "1人 約3,300円",
            transitFromPrev: "徒歩15分",
          },
          {
            name: "コヴェント・ガーデン・マーケット + セブンダイヤルズ",
            area: "コヴェント・ガーデン",
            duration: "1時間30分",
            description: "1830年のコヴェント・ガーデン・マーケット建物にはクラフト屋台、2階の店舗、本物の訓練を受けたオペラを歌う無料のストリートパフォーマンス。北へセブンダイヤルズ — ニールズ・ヤード・レメディーズ、ケール色の路地写真スポット。",
            estimatedCost: "買わなければ無料",
            transitFromPrev: "徒歩5分",
          },
          {
            name: "ナショナル・ギャラリー",
            area: "トラファルガー広場",
            duration: "1時間30分",
            description: "無料。装飾翼パスして直行: ヴァン・ゴッホのひまわり(43室)、レオナルドの岩窟の聖母(9室)、ターナーの戦艦テメレール(34室)。90分で選択的に十分。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩15分",
          },
          {
            name: "トラファルガー広場 + アドミラルティ・アーチ散歩",
            area: "ホワイトホール",
            duration: "45分",
            description: "ネルソン記念柱、ライオン像、4台目には回転現代美術。ザ・モールに沿ってバッキンガム宮殿側へ — セント・ジェームズ・パーク横の遅い光散歩。",
            estimatedCost: "無料",
            transitFromPrev: "組み込み",
          },
          {
            name: "ボッカ・ディ・ルポ",
            area: "ソーホー",
            address: "12 Archer St",
            duration: "1時間30分",
            description: "ソーホー地下の地方イタリアン小皿 — すべてのメニューが特定のイタリアの村を明記。ヴィテッロ・トナート、ンドゥヤ添えのオレキエッテ、ブラータ + バローロ1杯。キッチンカウンター席がベスト。",
            estimatedCost: "ワイン込み 1人 約10,000円",
            bookingTip: "1週間前にウェブサイト予約、20時プライム。ウォークインカウンター席もたまに空き。",
            transitFromPrev: "徒歩10分",
          },
        ],
      },
      {
        theme: "日帰り: オックスフォード",
        summary: "電車1時間で大学都市 — カレッジ中庭、ボドリアン図書館、本格パブランチ、そしてロンドン復帰ディナー。",
        stops: [
          {
            name: "GWR電車 → オックスフォード",
            area: "パディントン → オックスフォード",
            duration: "1時間",
            description: "GWRパディントン-オックスフォード直通30分間隔。オフピーク往復オンライン約5,000円/人。遠くにウィンザー城を見るなら右側席。",
            estimatedCost: "往復 約5,000円",
            transitFromPrev: "地下鉄でパディントン、約15分",
          },
          {
            name: "クライスト・チャーチ・カレッジ",
            area: "オックスフォード",
            duration: "1時間30分",
            description: "オックスフォード最大カレッジ、1546年ヘンリー8世創建。グレートホールがハリー・ポッターのダイニングホールの実インスピレーション(映画は別の場所に複製)。レンのトムタワー。カレッジ裏のメドウ散歩もお忘れなく。",
            estimatedCost: "約2,800円",
            bookingTip: "10時オープン、9時45分到着で1番乗り。",
            transitFromPrev: "電車駅から徒歩10分",
          },
          {
            name: "ボドリアン図書館 + ラドクリフ・カメラ",
            area: "オックスフォード",
            duration: "1時間30分",
            description: "ヨーロッパ最古の図書館の1つ(1602年)と向かいの円形ラドクリフ・カメラ(1749年)。図書館ツアー(30分)で15世紀のデューク・ハンフリー・リーディングルーム見学。カメラは写真用 — 一般入場不可。",
            estimatedCost: "ボドリアンツアー 約1,500円",
            transitFromPrev: "徒歩10分",
          },
          {
            name: "ザ・ターフ・タバーン",
            area: "オックスフォード",
            address: "4 Bath Pl",
            duration: "1時間30分",
            description: "13世紀のパブ、石畳路地に隠れています。ビル・クリントンが「吸わなかった」場所、ホーキングが飲み、トールキンが編集した。本物のエール、日曜ならサンデーロースト、頭をかがめる低い梁。路地探しゲームが半分の楽しさ。",
            estimatedCost: "1人 約4,000円",
            transitFromPrev: "セント・ヘレンズ・パッセージで徒歩5分",
          },
          {
            name: "マグダレン・カレッジ 鹿公園 + アディソンズ・ウォーク",
            area: "オックスフォード",
            duration: "1時間30分",
            description: "マグダレン(発音は「モードリン」)には鹿公園、鐘楼、そしてC.S.ルイスがトールキンと歩いた2km川沿いループ。復帰電車前にゆっくり歩く1時間。",
            estimatedCost: "約1,300円",
            transitFromPrev: "徒歩15分",
          },
          {
            name: "ロンドン行き復帰電車",
            area: "オックスフォード → パディントン",
            duration: "1時間",
            description: "GWRでパディントン復帰。休憩タイム — 明日は博物館 + ハロッズデー。",
            estimatedCost: "往復に含む",
            transitFromPrev: "電車駅まで徒歩10分",
          },
          {
            name: "ディシューム・キングス・クロス",
            area: "キングス・クロス",
            address: "5 Stable St",
            duration: "1時間30分",
            description: "イラニ・カフェ風のインド料理、素敵なレンガ倉庫の設定。ハウス・ブラック・ダール(24時間煮込み)、ラム・ビリヤニ、チャイ。ディシュームは理由のあるロンドンの名所。",
            estimatedCost: "1人 約6,500円",
            bookingTip: "6人未満はウォークインのみ — テキストキュー、20時には45〜60分待ち。",
            transitFromPrev: "パディントンから地下鉄約12分",
          },
        ],
      },
      {
        theme: "V&A + ハロッズ + お別れ",
        summary: "最後の偉大な博物館1つ、ハロッズ巡り、アフタヌーンティー、そしてパディントン・エクスプレスでヒースロー。",
        stops: [
          {
            name: "ヴィクトリア&アルバート博物館",
            area: "サウス・ケンジントン",
            address: "Cromwell Rd",
            duration: "2時間30分",
            description: "無料。世界最大の装飾美術博物館。集中: ファッション・ギャラリー(40)、ジュエリー・ギャラリー(91)、キャスト・コート(46)、ティプーの虎(41)。ジョン・マデイスキー・ガーデンの中庭カフェがロンドンで最も美しい博物館カフェ。",
            estimatedCost: "無料",
            transitFromPrev: "地下鉄ディストリクト線、約10分",
          },
          {
            name: "ハロッズ",
            area: "ナイツブリッジ",
            address: "87-135 Brompton Rd",
            duration: "1時間30分",
            description: "7階、330部署、12万平米のリテール大聖堂。買わなくてもフードホール(1階奥)とエジプトテーマのエスカレーターは見るべき。3階のトイ・デパートメントは目的地そのもの。",
            estimatedCost: "買わなければ無料",
            transitFromPrev: "徒歩15分",
          },
          {
            name: "フォートナム&メイソン アフタヌーンティー",
            area: "ピカデリー",
            address: "181 Piccadilly",
            duration: "2時間",
            description: "本格ロンドンお別れ。フォートナム4階のダイヤモンド・ジュビリー・ティーサロン — フィンガーサンドイッチ、コーニッシュ・クロテッド・クリーム添えのスコーン、ペストリー、無限の紅茶。1840年代に遡る儀式。",
            estimatedCost: "1人 約13,000円",
            bookingTip: "2〜3週間前にウェブサイト予約、14〜15時30分がプライム。平日のほうが週末より楽。",
            transitFromPrev: "地下鉄ナイツブリッジ → グリーンパーク、約10分",
          },
          {
            name: "ピカデリー + リージェント・ストリート散歩",
            area: "ウエストエンド",
            duration: "1時間",
            description: "スコーンを消化させて。ピカデリーに沿ってロイヤル・アカデミーを過ぎ、ピカデリー・サーカスのエロス像まで、その後北へリージェント・ストリートの曲線アール・デコ・ファサード。188-196番地のハムリー玩具店は大人も寄る価値。",
            estimatedCost: "無料",
            transitFromPrev: "徒歩",
          },
          {
            name: "ホテル立ち寄り荷物受取",
            area: "ヴィクトリア",
            duration: "1時間",
            description: "地下鉄でヴィクトリア復帰、保管荷物を受け取って整理。21時のヒースロー・エクスプレスのために19時45分までにパディントン出発。国際線3時間余裕。",
            estimatedCost: "無料",
            transitFromPrev: "地下鉄約15分",
          },
          {
            name: "ヒースロー・エクスプレス → LHR",
            area: "パディントン → ヒースロー",
            duration: "20分",
            description: "ヒースロー・エクスプレス15分間隔。パディントン-LHR 15分 — ヨーロッパ最速の空港アクセス。オンライン予約で約2,500円。",
            estimatedCost: "約2,500円",
            transitFromPrev: "地下鉄サークル線ヴィクトリア → パディントン、約10分",
          },
        ],
      },
    ],
    packingTips: [
      "防水靴 — ロンドンの雨は弱いが頻繁",
      "携帯傘(黒、派手色NG) — 現地スタイル",
      "準フォーマル1着 — アフタヌーンティー、いいパブ、ボッカ・ディ・ルポのディナーに合う",
      "UKアダプター(タイプG) — 米・EUと完全に別物",
    ],
    budgetEstimate: "2人でホテル除き1日 約25,000〜42,000円(博物館 + パブランチ + 良いディナー構造)",
    generalTips: [
      "交通はコンタクトレスタップ — 日次キャップ約£8.10で自動適用",
      "エスカレーターでは右に立ち左を歩く。塞ぐとロンドナーがため息を。",
      "座って食べるレストランで10〜12.5%チップ(通常自動加算 — レシート確認)",
      "道渡るときはまず右を見て — 左側通行",
    ],
  },
};

export default ja;
