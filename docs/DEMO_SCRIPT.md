# Demo Video Script — 90 seconds

Target length: **75–95 seconds**. Shorter is fine; longer risks the reviewer
skipping. Record as screen capture with voice-over (or text captions if
you prefer not to narrate in English).

## Tools
- **Recording**: Loom (easiest, free tier), QuickTime (Mac), OBS (any OS),
  or Windows built-in screen recorder.
- **Resolution**: 1080p at minimum.
- **Voice**: optional. Captions are fine if you don't want to narrate.
- **Hosting**: Loom (default), YouTube Unlisted, or Google Drive shared link.

## Before you start

1. Make sure `checkvisamap.com` is on the latest deploy (all my commits pushed).
2. Open LemonSqueezy dashboard → turn **Test Mode** ON.
3. Have the Stripe test card ready: `4242 4242 4242 4242`, CVV `123`, exp `12/30`.
4. Clear browser cookies / open a fresh incognito window so the landing
   page is clean (no previous-plan banners).
5. Set browser zoom to 100%. Close all other tabs.

## Scenes

### Scene 1 — Landing (0:00 → 0:08)

**Action**: Show `checkvisamap.com` home page. Scroll slowly from hero down
past the sample cards.

**Narration / Caption**:
> "gliddy is an AI-powered trip planner. $4 per plan. Let me show
> you what you get."

---

### Scene 2 — Start the wizard (0:08 → 0:18)

**Action**: Click "Plan my trip — $4". You land on `/plan/new`. Fill in:
- Destination: Tokyo
- Country: Japan
- 3 days
- Pick "couple"
- Pick "mixed"
- Must-visit: "Meiji Shrine, Tsukiji Market"
- Email: your real email

**Narration**:
> "A 6-step wizard asks for the essentials — destination, duration, who
> you're traveling with, style, budget, and email."

---

### Scene 3 — Progressive popups (0:18 → 0:30)

**Action**: On the loading page, popup questions appear. Answer quickly:
- Traveler count: (auto-set from couple → 2)
- Airport: NRT
- Flight arrival: skip
- Flight departure: skip
- Hotel booked: No
- Interests: Food, Culture
- Pace: Balanced

**Narration**:
> "As you wait, it asks follow-up questions like arrival airport, interests,
> and pace. You can answer these conversationally."

---

### Scene 4 — Review summary + checkout (0:30 → 0:42)

**Action**: Review screen appears. Point briefly at the summary fields, then
click "Pay $4". A new tab opens to LemonSqueezy checkout. Fill in:
- Card: 4242 4242 4242 4242
- Exp: 12/30, CVV: 123, ZIP: any
- Click **Complete Purchase**.

**Narration**:
> "Review your plan details, then pay $4 through LemonSqueezy. Single
> purchase — no subscription, no account."

---

### Scene 5 — Post-payment wait (0:42 → 0:52)

**Action**: After completing the charge, the new tab shows "Payment received
· We're building your trip plan" with a progress bar and rotating trivia.
Let it run for 5-8 seconds so the viewer sees the engagement.

**Narration**:
> "While the plan generates — usually a minute or two — you see progress,
> travel facts, and a heads-up that we'll also email the link."

---

### Scene 6 — Email + plan page (0:52 → 1:15)

**Action**: Switch to your email inbox. The email from `gliddy
<plans@checkvisamap.com>` should have arrived. Open it, click the link.

The plan page loads. Quickly demonstrate:
- Hotel card + airport transit card
- Scroll to show Day 1 with numbered stops, times, descriptions
- Show the map (Mapbox) with pins and polyline
- Scroll to Day 2, Day 3 briefly
- Point at the "Travel toolkit" affiliate sidebar

**Narration**:
> "The email arrives with a private link. The plan page has a hotel pick
> matched to your arrival airport, airport transit with real costs, and a
> day-by-day itinerary with a route map. Every stop has a short why-here
> note — not just names."

---

### Scene 7 — PDF download (1:15 → 1:25)

**Action**: Click the **Download PDF** button. Show the PDF opening — cover
page, map, hotel, day 1 spread. Scroll through 2-3 pages quickly.

**Narration**:
> "And a downloadable PDF for offline use while traveling."

---

### Scene 8 — Legal + close (1:25 → 1:30)

**Action**: Scroll to footer on any page. Point at the Terms / Privacy /
Refund links in the Legal column.

**Narration**:
> "Clear terms, privacy, and refund policy — all linked from every page.
> That's it — $4 per plan, no subscription, delivered in a minute."

---

## Filming tips

- **Speak at normal pace.** Don't rush — reviewers want to see the product
  work, not hear a fast-talking sales pitch.
- **Silence background audio.** Close Slack/Discord/music.
- **Show the URL bar** in Scene 1 and Scene 6 so the reviewer can see the
  real domain is being used.
- **Don't edit out the loading time.** Show 5-8 seconds of the wait screen
  so they can see the product actually generates live — this is evidence
  it's a real working product, not a mockup.
- **Natural cursor movement.** Jittery/too-fast mouse looks staged.
- **Optional intro/outro slide.** A 2-second title card at the start
  ("gliddy — demo") and a closing ("Questions? hello@checkvisamap.com")
  adds polish but isn't required.

## Upload + paste into LS_APPROVAL.md

Once recorded:
1. Upload to Loom (share → copy link) or YouTube (Visibility: Unlisted).
2. Paste the link into `docs/LS_APPROVAL.md` where it says `[YOUR VIDEO URL HERE]`.
3. Send the email.
