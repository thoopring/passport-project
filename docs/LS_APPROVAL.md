# LemonSqueezy Approval — Response Draft

Use the sections below to reply to the LS reviewer (Ankith or whoever). The
six requested items map 1:1 to six sections. Copy-paste into the email and
fill in the placeholders marked `[[...]]`.

---

## 1) Product website URL

**Primary:** https://checkvisamap.com

Key supporting pages:
- Home / product pitch: https://checkvisamap.com
- Pricing: https://checkvisamap.com/pricing
- Sample plans (free, public): https://checkvisamap.com/samples
- Start a plan: https://checkvisamap.com/plan/new
- Terms of Service: https://checkvisamap.com/terms
- Privacy Policy: https://checkvisamap.com/privacy
- Refund Policy: https://checkvisamap.com/refund

---

## 2) Pricing

Single-tier, one-time digital product. **USD $4.00 per plan.**

- No subscription, no recurring charge, no auto-renew.
- Each $4 purchase produces exactly one personalized trip itinerary delivered
  as a private web link + downloadable PDF.
- If a customer wants another plan later, they pay $4 again.
- LemonSqueezy handles local-currency conversion where applicable; the USD
  amount is the invariant.

Public pricing page: https://checkvisamap.com/pricing

Breakdown of what's included is visible at that page; reproduced here:

- Day-by-day itinerary tuned to pace and interests
- A hotel pick matched to the traveler's arrival airport
- Airport → hotel transit with real cost and duration
- Route map with numbered stops
- Restaurant picks with "why-here" notes
- Downloadable PDF for offline use
- Email delivery within ~60 seconds after payment

---

## 3) Demo video

[[ATTACH VIDEO LINK — see docs/DEMO_SCRIPT.md for the scene-by-scene plan.
Record it as a ~90-second screen capture showing: home page → wizard (6 steps)
→ loading/generation → post-payment wait → email receipt → plan page (map +
itinerary) → PDF download. Upload to YouTube as Unlisted or to Loom, paste
the link here.]]

Placeholder link: `[YOUR VIDEO URL HERE]`

---

## 4) Personal social media URLs (for KYB/KYC)

[[Fill these in yourself — the reviewer asked for personal profiles. Examples:
LinkedIn, personal Twitter/X, personal Instagram. One or two is enough; they
are verifying you are a real person, not scraping your feeds.]]

- LinkedIn: `[YOUR LINKEDIN URL]`
- X / Twitter: `[YOUR X URL]` (optional)
- Instagram: `[YOUR INSTAGRAM URL]` (optional)

If you don't have a LinkedIn, a GitHub profile with real activity also works
for KYB purposes.

---

## 5) Product description

**What it is.** gliddy is an AI-powered trip-planning tool. The
customer enters a destination, duration, arrival airport, a few interests,
a pace preference, and a budget tier. Anthropic's Claude generates a
personalized day-by-day itinerary — hotels, restaurants, attractions, and
transit — which is delivered to the customer's email as a private web link
plus a downloadable PDF.

**How it's made.** Plans are generated on-demand per purchase. There is no
pre-made catalog of plans; each purchase triggers a fresh generation pass
against the traveler's exact inputs. The system prompt enforces strict
rules: only well-known, established places; coordinates accurate; pacing
honored; hotel matched to the specified arrival airport; budget tier
respected. Generation takes 60-120 seconds.

**Who it's for.** Independent travelers (solo, couples, families, groups)
planning a trip of 2-14 days. Specifically useful for people who:
- Want a real day-by-day plan without paying a travel agent
- Don't want to spend a weekend researching every meal and transit option
- Travel internationally and want local currency/language tips inline
- Prefer a private, no-account purchase over a subscription tool

**Single purchase vs subscription.** Explicitly one-time. Each $4 is one
plan. We do not store payment methods beyond what LemonSqueezy retains for
the transaction itself.

**License / delivery model.** Digital product delivered immediately. The
customer receives:
1. A private URL (UUID-based, unguessable) to a mobile-responsive plan page
2. A downloadable PDF via the same page
3. An email with both above

The plan is licensed to the purchaser for personal travel use. It is not
resold, redistributed publicly, or transferred.

**Multilingual.** The generated plan can be delivered in English, Korean,
Japanese, or Chinese, based on the customer's selection.

**Our commitment on quality.** If generation fails, we refund automatically.
If the plan contains a hallucinated place (an AI error), we refund on
request within 14 days. See https://checkvisamap.com/refund.

**What gliddy is not.**
- Not a booking service. We do not reserve hotels, flights, transit, or
  tables. We recommend; the customer books.
- Not a travel agency. No human reviews the plan before delivery.
- Not visa/medical/legal advice.

---

## 6) Terms, Privacy, and Refund policy links

All three are linked prominently from the site footer on every page. Direct
URLs:

- Terms of Service: https://checkvisamap.com/terms
- Privacy Policy: https://checkvisamap.com/privacy
- Refund Policy: https://checkvisamap.com/refund

The footer on the landing page groups these under the "Legal" column. The
pricing page also links all three above the primary CTA.

---

## Suggested reply template

> Hi Ankith,
>
> Thank you for the review. Here are the items you requested:
>
> **Website.** https://checkvisamap.com — live product site.
>
> **Pricing.** Single-tier, one-time USD $4.00 per plan. Full breakdown at
> https://checkvisamap.com/pricing. No subscription.
>
> **Demo video.** [LINK] — a ~90-second walkthrough from landing page to
> delivered plan + PDF.
>
> **Personal social.** LinkedIn: [URL], X: [URL].
>
> **Product details.** We're an AI-powered trip-planning tool. The customer
> provides a destination, duration, arrival airport, and preferences; we
> generate a personalized day-by-day itinerary using Anthropic's Claude
> model and deliver it as a private web link + PDF to their email.
>
> Each purchase is a single digital product ($4). No subscription. The plan
> is licensed for personal travel use. Targeted at independent travelers
> planning international trips of 2-14 days. Multilingual support for
> English/Korean/Japanese/Chinese.
>
> If generation fails, we auto-refund. If the plan includes a clearly
> hallucinated place, we refund on request within 14 days. We do not book
> hotels, flights, or tickets — we only generate the itinerary.
>
> **Legal pages.** All three are linked from the footer on every page:
> - Terms: https://checkvisamap.com/terms
> - Privacy: https://checkvisamap.com/privacy
> - Refund: https://checkvisamap.com/refund
>
> Let me know if you need anything else.
>
> Best,
> MinSu
> [signature]

---

## Checklist before sending

- [ ] Replace `[YOUR VIDEO URL HERE]` with the actual demo video link
- [ ] Replace `[YOUR LINKEDIN URL]` etc with your profiles
- [ ] Confirm all 3 legal pages load: /terms /privacy /refund
- [ ] Confirm /pricing page is live
- [ ] Deploy latest commit so the above URLs resolve
- [ ] Try the demo yourself once (in Test Mode) — make sure the flow works
- [ ] Send the reply
