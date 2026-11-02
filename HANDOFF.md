# TE Walrath — Landing Page Handoff (v3)

Design source: `Walrath Landing v3.dc.html` (open in browser to see the live reference).
Target stack: Next.js 15 (App Router) + Tailwind CSS + Framer Motion + lucide-react.

---

## 1. Design direction

"Cinematic industrial." Immersion comes from full-bleed photography and restrained
typography — **not** from heavy motion. Deliberately avoided: marquees, scroll progress
bars, per-element stagger, parallax on every block.

### Palette

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0D0E10` | Body text, photo scrims, dark bands |
| `paper` | `#FFFFFF` | Page background |
| `surface` | `#F6F7F7` | Alternating section background (Soil Technologies) |
| `hairline` | `#E3E5E8` / `#E7E9EB` | Borders, dividers, grid gaps |
| `muted` | `#4A5057` | Body copy |
| `meta` | `#6B7280` | Mono labels, captions |
| `accent` | `#C62828` | Eyebrows, numerals, rules, buttons |
| `accent-hover` | `#8E1F1F` | Button/link hover |
| `accent-light` | `#FF8A8A` | Accent on dark photo bands only (contrast) |
| `open` | `#1E9E52` | "Open now" status dot |

Red is **structural**: section eyebrows, list numerals, 1px rules, primary buttons. No red
fills behind large areas, no per-division color coding.

### Type

- Display + UI: **Archivo** (400/500/600/700). Headings at weight **500**, letter-spacing `-.01em`.
  Large type is light-weight and calm — do not bold headlines.
- Labels/meta: **IBM Plex Mono** (400/500), uppercase, letter-spacing `.14em`–`.32em`, 10–12px.
- Wordmark: Archivo 600, letter-spacing `.14em`, "WALRATH".

### Motion budget (keep it this small)

1. Hero image: `kenburns` — scale 1.02 → 1.09 over 30s, `ease-in-out infinite alternate`.
2. Hero content: staggered `fadeIn` (opacity + 14px rise), delays 0 / .15s / .3s / .45s.
3. Section blocks: single fade + 16px rise on enter, `.9s cubic-bezier(.2,.7,.2,1)`, **once**.
   In React use `whileInView` + `viewport={{ once: true, amount: 0.08 }}`.
4. Image hover: `scale(1.06)` over 1.1–1.2s. Button hover: background only.

Nothing else animates. Respect `prefers-reduced-motion` by disabling 1 and 3.

---

## 2. Page structure

```
<Nav/>                 sticky, blurred white, mono links, live status dot, main phone
<Hero/>                full-bleed photo, centered type, 2 CTAs               (~94vh)
<Overview/>            2-col: headline + company paragraph + 4 stats
<Division id="trucking">
  <Band/>              full-bleed photo, "Division 01 / Trucking"            (~78vh)
  2-col: 10-item equipment list  |  copy + Walrath Marine callout
<Division id="soil">   surface bg
  <Band/>              "Division 02 / Soil Technologies"
  centered lede, 4 product cards (1px grid), material handling list + photo
<Division id="supply">
  <Band/>              "Division 03 / Landscape Supply"
  3 bulk category tiles
  <Locations id="yards"/>   tab row + detail (address/phone/email/hours/products/map)
  <Calculator id="calc"/>   3 sliders → cubic yards (volume only)
  <Rentals/>                5 equipment tiles
<Heritage id="heritage"/>   dark section, photo at 22% opacity, 4-step timeline
<Footer/>                   white, 3 link columns + contractor login disclosure
```

Section rhythm: white → white → white → **surface** → white → **dark**. Only two non-white
backgrounds in the whole page; keep it that way.

---

## 3. Content — all verified against tewalrath.com

> Everything below is taken from their live site. Do not embellish. Where the site doesn't
> publish a number (tonnage, delivery radius, truck counts, per-yard hours other than
> Tacoma), the design deliberately omits it.

### Company

- Family owned and operated since **1968**, 50+ years of experience.
- 1968: Tom Walrath Sr. becomes an owner/operator with a **1963 Peterbilt log truck**.
- Operated a single truck for almost 20 years; wife **Marlene** did all the book work.
- **May 1987**: Tom Jr. starts driving alongside his dad.
- Tom Sr. and Marlene are retired; **Tom Jr. runs the company** and still drives when needed.
- Now **120+ employees**, the main truck yard, **4 Walrath Landscape Supply locations**, and
  the **Walrath Marine** division.
- Main office: **11405 24th Ave East, Tacoma, WA 98445** · **(253) 531-7499** · support@tewalrath.com

### Division 01 — Trucking

Lede: "Specializing in bulk material supply transportation. A wide variety of truck and
trailer combinations, joined with extensive product options, ensures our ability to provide
exactly what our customers need exactly where they need it."

Equipment list (their exact 10, keep order):
Dump Truck & Pup Trailer · Dump Truck & Transfer Trailer · Side Dump Truck · Belt Trailers ·
Pneumatic Tankers · Heavy Haul — Low Boy Services · Bottom Dump Trailers · High Cube Dump &
Pup · Self-Loader Log Truck · Logs, Poles, Hauling

Walrath Marine callout: specialty service provider on the water; marine facility with
**loading dock and land ramp** in the **Port of Tacoma**; materials and equipment transported
and placed in all types of marine applications.

### Division 02 — Soil Technologies

Lede: the **digital blender** precisely measures ingredients in soil and sand mixes, gravel
for driveways and pathways, ballfield infield mix, topdressing, and sand for golf courses,
parks and playfields.

Quality statement: made with only quality ingredients — compost, clean graded sand or sandy
loam, and trusted amendments such as high mineral volcanic sand — **no subsoil, sawdust or fillers**.

Four named products (their descriptions, condensed):

1. **3-Way Topsoil** — premium all-purpose topsoil: compost, clean mined sand, screened sandy loam.
2. **TURF Booster Mix** — Walrath Signature Blend: fine St. Helens mineral sand, coarse washed
   sand, Compost Plus. Meets requirements for Turf in the Post-Construction Soil Quality &
   Depth BMP in the WDOE Stormwater Manual.
3. **Premium Garden Blend** — Walrath Signature Blend for raised beds, berming, vegetables:
   screened topsoil, custom compost blend, sand for filtration.
4. **Bioretention / Rain Garden Soil** — designed for porosity and infiltration; well-graded
   specified aggregate + quality compost to meet agency specifications.

Material handling:
- Custom soil and sand mix blends (landscaping, lawn & garden, lightweight rooftop and potting
  soils, bioretention medias, rain garden soils for stormwater filtering).
- **Screening plants** — mobile screeners for screening and sizing material on your work site.
- **Crushing & grinding** — portable crushing plant for crushed rock, concrete and asphalt;
  full line of equipment to grind and process wood waste and construction debris.
- **Rail offload** — The Railyard in Tacoma offloads bulk material shipped by rail cars and
  transports it to any location; offload equipment can be brought to any rail spur.
- **Bagging services** — 1-ton "super sacks"; specialty bagging equipment on your site.
- Production and handling locations: **Lacey · Tacoma Main Office · Gig Harbor · Everett**.
- Equipment: dozer and loader rental **with operator**.
- Also relevant: they are a **rooflite Certified Blender** (site nav) — not yet surfaced in v3,
  a good candidate if you want one more credibility item.

### Division 03 — Landscape Supply

Lede: bulk materials for home or business — topsoil, bark, compost, gravel, and nursery
plants. **We deliver any size load.**

Bulk categories (matches their catalog): Aggregates (sand & gravel) · Mulches (bark & ground
cover) · Soil & Amendments.

Locations:

| Yard | Address | Phone | Email | Hours |
|---|---|---|---|---|
| Tacoma | 4810 Portland Ave E, Tacoma, WA 98404 | (253) 472-1252 | wlst@tewalrath.com | Mon–Fri 7:30a–4:30p · Sat 8a–4p · Sun closed |
| Gig Harbor | 4521 56th St NW, Gig Harbor, WA 98335 | (253) 858-8184 | wlsg@tewalrath.com | "See our Google page for the most up-to-date hours" |
| Olympia | 9418 Old Highway 99 SE, Olympia, WA 98501 | (360) 754-3722 | wlso@tewalrath.com | "See our Google page for the most up-to-date hours" |
| NE Tacoma | Northeast Tacoma | (253) 572-3009 | support@tewalrath.com | No public bulk yard at this time |

Per-yard notes:
- **Tacoma** — serving the community since **2000**. Select mulch, compost and soil products in
  40–50 lb bags; select aggregates in 50–60 lb bags. House Blend potting soil.
- **Gig Harbor** — bulk materials and plants, plus hardscape: flagstone, pavers and brick,
  steps, patios, walls, benches, fire kits; premier partner **Castohn®**.
- **Olympia** — serving since **2023**; **The Barn Nursery** is at this location
  (thebarnnurseryolympia.com).
- **NE Tacoma** — stopped selling bulk materials to the public while restructuring operations;
  customers directed to Tacoma or Gig Harbor; delivery of any size load continues.

> **Live status rule:** only Tacoma has published hours, so only Tacoma gets the computed
> open/closed indicator (and the one in the nav). The others must show their "see Google"
> line. Don't fake hours for Gig Harbor / Olympia.

Equipment rental tiles (labels come from their own image filenames — don't add a brand claim
unless you confirm it): 333G · 35G · 17G Mini Excavator · 50G Mini Excavator · 323E Skid Steer Loader.

### Calculator

Volume only: `cubicYards = (lengthFt × widthFt × (depthIn / 12)) / 27`.
Sliders: Length 1–200 ft, Width 1–200 ft, Depth 1–24 in (step 0.5). Defaults 24 / 14 / 3.
Secondary readouts: coverage (ft²) and cubic feet.

Disclaimer copy (keep — it's why we dropped tonnage): "Volume only — material weight varies by
product and moisture, so your yard will confirm tonnage and the right truck for the load. Each
location also has a volume calculator and delivery zones in its online catalog."

**Do not add a tons/density readout** unless Walrath supplies real per-product densities.

### Footer

- Divisions: Trucking · Soil Technologies · Landscape Supply · Walrath Marine · Equipment Rental
- Locations: the four emails above + The Barn Nursery
- Company: About Us · Our Blog · Career Opportunities · Cubic Yard Calculator · Contact Us
- Contractor login discloses the real per-yard catalogs (account login, delivery zones, volume
  calculator): `tacoma.tewalrath.com`, `gigharbor.tewalrath.com`, `olympia.tewalrath.com`
- Legal line: "© TE Walrath. All rights reserved." · Terms & Condition · Privacy Policy
- Social (on their site): Facebook (trucking + landscape supply), Instagram
  @walrathlandscapesupply, Yelp.

---

## 4. Images — action required

All photography in the reference is **hotlinked from tewalrath.com**. It renders in a browser
but must be localised before launch (their server blocks cross-origin fetch, so these could not
be downloaded automatically).

**Step 1:** download each file below. **Step 2:** move to `/public/img/…`. **Step 3:** swap to
`next/image` with real `width`/`height` and `priority` on the hero only.

Base: `https://tewalrath.com/wp-content/uploads/`

| Slot | Path |
|---|---|
| Hero | `2019/08/DSC0425.jpg` |
| Trucking band | `2019/09/te-walrath-trucking-1.jpg` |
| Soil band | `2019/02/Digital-blending-creates-the-perfect-soil-mix-1-1024x576.jpg` |
| Soil production photo | `2019/02/7vCknpKg.jpg` |
| Supply band | `2019/02/gig-harbor-aerial-shot.jpg` |
| Heritage backdrop | `2019/08/DSC0616.jpg` |
| Aggregates tile | `2025/12/1-1-4-Clean-Black-e1765483069804.jpg` |
| Mulches tile | `2025/12/Fine-Red-Bark-e1765483161591.jpeg` |
| Soil & amendments tile | `2025/12/House-Blend-Potting-Soil-1-e1765482889570.jpg` |
| Tacoma yard | `2019/02/WalrathCustApprDay2019-Marsh-11.jpg` |
| Gig Harbor yard | `2019/02/Gig-Harbor-location-and-product.jpg` |
| Olympia yard | `2019/07/WalrathCustApprDay2019-Marsh-17.jpg` |
| NE Tacoma | `2019/08/DSC0737.jpg` |
| Rentals ×5 | `2019/02/333G-Rental.jpg`, `2019/02/35G-Rental.jpg`, `2019/02/17G-mini-excavator-1.jpg`, `2019/02/50G-mini-excavator-1.jpg`, `2019/02/323E-skid-steer-loader-1.jpg` |

More usable stock in their gallery (`tewalrath.com/gallery/`), by category:
- Trucking: `2019/08/DSC0616|DSC0632|DSC0425|DSC0737|DSC0664|DSC0512.jpg`
- Production: `2019/02/1CsGrd8J|6Gqgj2jQ|7vCknpKg|AmHHh4em|aVler3lt|G3S_CbL3|lV5AJBsr|PKn_XNIw.jpg`
- Marine: `2019/02/CWjLQbbk|ljfby5Il|LzHiAgEX|S4xCeR8c|VTwAreQc|w8VMEJNZ.jpg`
- Landscape Supply: `2019/07/WalrathCustApprDay2019-Marsh-17|-16|-24|-37.jpg`,
  `2019/02/Gig-Harbor-5|Gig-Harbor-drone-view-1|gig-harbor-aerial-shot.jpg`
- Logos: `2022/01/WalrathTrucking.png`, `2018/04/walrath-logo-main-1.png`,
  `2018/04/walrath-logo-landscape-1.png`, `2018/04/walrath-logo-marine-1.png`,
  `2019/02/logo-walrath-bw.png`, `2018/10/50th-badge.png`

The wordmark is currently set as text ("WALRATH"). If you want their real logo, use
`2022/01/WalrathTrucking.png` (nav) and `2019/02/logo-walrath-bw.png` (footer).

---

## 5. Suggested React data module

```ts
// lib/walrath.ts
export const YARDS = [
  {
    slug: "tacoma",
    city: "Tacoma",
    name: "Walrath Landscape Supply — Tacoma",
    addr: "4810 Portland Ave E, Tacoma, WA 98404",
    phone: "(253) 472-1252",
    tel: "tel:2534721252",
    email: "wlst@tewalrath.com",
    hours: "Mon–Fri 7:30a–4:30p · Sat 8a–4p · Sun closed",
    liveHours: { weekday: [7.5, 16.5], saturday: [8, 16], sunday: null },
    maps: "https://goo.gl/maps/d4XXSGqsRHw",
    img: "/img/yards/tacoma.jpg",
    note: "Family-owned and operated, serving the Tacoma community since 2000. Select mulch, compost and soil products are available in 40–50 lb bags; select aggregates in 50–60 lb bags.",
    stock: ["Topsoil", "Medium & fine bark", "Compost", "Utility sand", "Pea gravel", "Drain rock", "Bagged materials", "House Blend potting soil"],
    catalog: "https://tacoma.tewalrath.com/catalog",
  },
  // gigHarbor / olympia / neTacoma — liveHours: null, hours: "See our Google page…"
] as const;

export const FLEET = [
  "Dump Truck & Pup Trailer", "Dump Truck & Transfer Trailer", "Side Dump Truck",
  "Belt Trailers", "Pneumatic Tankers", "Heavy Haul — Low Boy Services",
  "Bottom Dump Trailers", "High Cube Dump & Pup", "Self-Loader Log Truck",
  "Logs, Poles, Hauling",
] as const;

export const cubicYards = (l: number, w: number, depthIn: number) =>
  (l * w * (depthIn / 12)) / 27;
```

Suggested lucide-react icons (the reference uses mono numerals instead — icons are optional and
should stay sparse): `Truck` (trucking), `Layers` (soil), `Sprout` (supply), `Anchor` (marine),
`TrainFront` (rail offload), `Phone`, `MapPin`, `Clock`, `ArrowRight`.

---

## 6. Open items for the client

1. Real per-product densities if they want tonnage in the calculator.
2. Published hours for Gig Harbor and Olympia (site currently defers to Google).
3. Current status of the NE Tacoma / Everett sites — Everett appears only as a production &
   handling location, not a retail yard. Verify before promoting it.
4. Whether "4 Walrath Landscape Supply locations" (About page) counts NE Tacoma, which no longer
   sells bulk to the public — the stat and the yard list disagree slightly on their own site.
5. Licensed photography; the gallery images are 2019-era and fairly low-resolution.
6. Contractor login: wire to the existing per-yard catalog accounts rather than building new auth.
