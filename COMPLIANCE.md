# Questling compliance checklist

A plain-English guide to what a children's-activity app needs on the App Store,
focused on COPPA and Apple's rules. Written for the person building Questling, not
for a lawyer.

> **This is not legal advice.** I'm the developer, not an attorney, and neither is
> the tool that helped draft this. It's meant to be honest and accurate so you know
> what to look at and what to ask. Anything genuinely legal, especially the items in
> the "Run these past a lawyer" section at the bottom, should be confirmed by a real
> attorney before you rely on it. Laws also change, so treat dates and rules here as
> a starting point, not the final word.

---

## The short version (where you stand today)

The good news is that Questling is in about the strongest privacy position an app
can be in: **it collects nothing.** Everything the app saves lives on the user's
own device, there's no backend, no accounts, and no analytics inside the app. The
website sets no cookies and its analytics is cookieless.

Almost every privacy rule, COPPA included, is built around *collecting* personal
information and what you do with it. When you collect nothing, most of the heavy
machinery (parental consent flows, data-deletion requests, breach obligations)
simply doesn't get triggered. That's not a loophole. It's the cleanest way to build
a kids' product, and it's the design you already have.

The work below is mostly about **saying this correctly** to Apple and, later,
**re-checking it** when the subscription adds a payment step.

---

## 1. Apple's App Store privacy questions

When you submit in App Store Connect, Apple makes you fill out the **App Privacy**
section (the "privacy nutrition label" shown on your listing). It asks, data type
by data type, whether your app collects it.

Here's the key definition, in Apple's own framing: data is only "collected" if it
**leaves the device** in a way that you or a third party can access. Data that stays
on the phone and is never transmitted does **not** count as collected.

That means, for Questling as it exists today:

- [ ] Answer the App Privacy questionnaire as **"Data Not Collected."**
- [ ] The Memory Journal photos, gems, quests, and rewards all stay on-device, so
      none of them are "collected." Don't over-declare them out of caution. Declaring
      data you don't actually collect is its own kind of inaccurate.
- [ ] Provide your privacy policy URL: `https://getquestling.com/privacy`. Apple
      requires a reachable privacy policy link in the listing metadata. You have one.
- [ ] Set an age rating in the questionnaire (a screen-free activity app with no
      objectionable content is typically **4+**).

Two Apple requirements that people worry about but that **don't apply to you right
now**, because of how you built it:

- **Account deletion.** Apple requires apps that let users *create an account* to
  also let them *delete* it in-app. Questling has no accounts, so this rule doesn't
  apply. Worth remembering if you ever add sign-in (please don't unless you must).
- **Sign in with Apple.** Only required if you offer a third-party login option.
  You don't, so it's not relevant.

---

## 2. Parents vs. the App Store Kids Category

This is a real decision and it's worth understanding, because the two lanes have
very different rules.

**The Kids Category** is a specific, opt-in section of the App Store (with age bands
like 5 and under, 6 to 8, 9 to 11). Putting an app there unlocks a stricter rulebook
under Apple guideline 5.1.4, including:

- No third-party analytics or third-party advertising without prior written consent.
- No transmitting personally identifiable info or device info to third parties.
- A required privacy policy and, often, a "parental gate" in front of external links
  and purchases.

**Your plan is the other lane: a parent-facing app** (Apple's closest primary
category is **Lifestyle**; **Education** is also plausible. Note there is no standalone
"Parenting" category on the App Store, so "Lifestyle" is likely the honest fit). In
this lane you are not bound by the Kids Category's extra technical rules, as long as
the app is genuinely presented to and operated by parents.

What keeps you safely in the parent lane:

- [ ] Keep the app's store listing, screenshots, and description speaking to
      **parents** ("you approve the quests," "you pick the rewards"), which is already
      how the site and app are framed.
- [ ] Keep the app **parent-operated** in practice: the parent runs it on their
      phone, the child doesn't have an account or their own install. This is central,
      both to the Kids Category question and to COPPA below.
- [ ] Don't select the Kids Category at submission unless you decide you want it. If
      you'd get any benefit from the Kids Category badge, that's a conversation to have
      with a lawyer first, because it raises the compliance bar rather than lowering it.

One honest caveat: Apple's reviewers make their own judgment about whether an app is
"primarily directed at children" regardless of the category you pick. Because
Questling collects nothing and is built to be run by a parent, the risk is low, but
it is Apple's call. See the lawyer list if you want certainty here.

---

## 3. COPPA in plain English

COPPA is the US children's privacy law (for kids under 13). It governs online
services that are directed to children, or that knowingly collect personal
information from children. Its core demand is **verifiable parental consent before
collecting a child's personal information.**

Why you're in a strong spot:

- You **collect no personal information from anyone**, child or adult. No collection
  means the consent machinery COPPA is famous for is not triggered. This is the
  single best thing you can do for COPPA, and you've already done it.
- The app is **run by the parent on the parent's device**. The child isn't the
  account holder because there is no account.

What to still keep in mind:

- [ ] Keep "collect nothing" true as the product grows. The moment anything about a
      user or child leaves the device (an email list tied to a kid, cloud sync of a
      journal, an in-app analytics SDK), COPPA and Apple's rules both change. Treat
      any future "let's just add tracking" idea as a decision with legal weight.
- [ ] If you ever add a newsletter or contact capture, that's a parent's email, kept
      separate from anything child-related, and it should be described honestly in the
      privacy policy.
- [ ] The FTC updated the COPPA Rule recently (a 2025 amendment). Most of it concerns
      how collected data is retained and shared, so with zero collection it's largely
      not applicable to you, but the recency is exactly why it's on the lawyer list.

---

## 4. The website

The site itself is low-risk: static files, no cookies, cookieless analytics. One
nuance is worth naming honestly:

- **Google Fonts and EU/UK visitors.** The site loads the Inter font from Google's
  servers, which means Google receives visitors' IP addresses. Under EU/UK privacy
  law an IP address can count as personal data, and a German court once ruled that
  embedding Google Fonts without consent was a GDPR violation. For most small,
  US-focused sites this is a minor issue, but if you expect meaningful EU or UK
  traffic it's worth closing.
  - [ ] **Optional fix that removes the issue entirely: self-host Inter** instead of
        loading it from Google. In this project that means installing the font locally
        (for example via `@fontsource/inter`) and pointing `BaseHead.astro` and the
        `--font` token at the local files, then deleting the `fonts.googleapis.com`
        links. Bonus: it also removes a render-blocking external request, so the site
        gets a little faster. I can do this whenever you want; it's a small change.
  - [ ] If you keep Google Fonts, the privacy policy already discloses the IP transfer,
        which is the honest baseline. Whether that disclosure is *sufficient* for EU/UK
        law is a lawyer question.
- [ ] **No cookie-consent banner is required** as the site stands, because it sets no
      cookies and stores nothing on the device, and the analytics is cookieless. The
      policy explains this. If you ever add anything that stores data on a visitor's
      device, revisit this.
- [ ] Confirm in your Cloudflare dashboard that Web Analytics is actually the
      **cookieless "Web Analytics"** product (not a cookie-based one) and that no other
      Cloudflare feature is injecting cookies. I verified the site's *source code* has
      no cookies or trackers, but Cloudflare's analytics is enabled at the dashboard
      and injected at the edge, so it doesn't appear in the code for me to check.

---

## 5. When the subscription goes live

Right now there's no payment, so none of this applies yet. When you add the Apple
in-app purchase subscription (likely via RevenueCat), several things change at once.
Do a pass on all of these before that build ships:

- [ ] **Update the App Privacy nutrition label.** Adding the RevenueCat SDK means your
      app will now collect at least **Purchases** and an **identifier** (an anonymous
      app-user ID). You'll need to change your answers from "Data Not Collected" to
      declare those, marked as used for **App Functionality**, not tracking. RevenueCat
      publishes step-by-step guidance for exactly which boxes to tick. Follow their
      current doc rather than guessing.
- [ ] **Update the privacy policy.** The policy already has a clearly labeled
      "Subscriptions (coming soon)" placeholder. Replace it with the real specifics
      (what Apple processes, what RevenueCat processes, links to their privacy terms)
      and change the "Last updated" date before the paywall turns on.
- [ ] **Use Apple's in-app purchase** for the subscription. Digital subscriptions must
      go through Apple IAP; you can't route around it with an outside payment link.
- [ ] **Add the required subscription disclosures** in the app and metadata: price,
      length of the term, and that it auto-renews, plus a **Restore Purchases** option
      and functional links to your **privacy policy and terms of use (EULA)** near the
      purchase screen. This is Apple guideline 3.1.2 and it's a common rejection reason.
- [ ] **Write a Terms of Use / EULA** if you don't have one. A paid product should have
      one, and Apple wants it linked from the purchase flow. This is a lawyer item.
- [ ] **Re-check the "collect nothing" story everywhere it appears** (the site copy,
      the app copy, marketing) so nothing still claims "zero data" in a way that the
      new purchase data contradicts.

---

## Pre-submission quick checklist

- [ ] Privacy policy is live at `getquestling.com/privacy` and reachable.
- [ ] App Privacy answered as "Data Not Collected" (today's state).
- [ ] Age rating completed (likely 4+).
- [ ] Category chosen deliberately (Lifestyle, parent-facing, not Kids Category unless
      you've decided otherwise with a lawyer).
- [ ] Store listing and screenshots speak to parents.
- [ ] No account = confirmed you skipped the account-deletion requirement correctly.
- [ ] Cloudflare Web Analytics confirmed cookieless in the dashboard.

---

## Run these past a lawyer

None of this is scary, but these are the specific points where "close enough" isn't
good enough and a real attorney should sign off:

1. **Is Questling "directed to children" under COPPA and Apple's review standard?**
   You're built to be parent-operated with zero collection, which is a strong
   position, but the "directed to children" determination is a legal judgment about
   your subject matter and marketing. Get it confirmed.
2. **Kids Category vs. Lifestyle.** If you ever consider the Kids Category, review the
   stricter obligations with counsel first.
3. **The 2025 COPPA Rule update.** Confirm nothing in the recent amendment creates an
   obligation for a zero-collection app like yours.
4. **EU/UK exposure, including the Google Fonts IP transfer** and the UK Children's
   Code (Age Appropriate Design Code), if you expect non-US traffic.
5. **Everything that arrives with the subscription:** the EULA/Terms, the updated
   privacy disclosures, and the RevenueCat data declarations.
6. **A final read of the privacy policy itself** before you lean on it publicly. It's
   written to be accurate and honest, but it hasn't been reviewed by an attorney.

If a lawyer is a stretch right now, prioritize items 1 and 5, since they're the two
most likely to matter for approval and for the paid launch.
