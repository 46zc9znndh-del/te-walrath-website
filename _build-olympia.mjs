import fs from "fs";
import https from "https";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

function cleanText(value) {
  if (!value) return "";
  return value
    .replace(/this\.select[\s\S]*$/i, "")
    .replace(/-->/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pickImage(images) {
  const preferred =
    images.find((u) => /width=1000/.test(u)) ||
    images.find((u) => /width=800/.test(u)) ||
    images.find((u) => !/width=80|width=10/.test(u));
  return preferred ? preferred.replace(/width=\d+,height=\d+/, "width=1200,height=900") : "";
}

function extract(body, name) {
  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ");

  let description = "";
  let usage = "";
  const d1 = text.match(/DESCRIPTION:\s*(.+?)(?:\s+USAGE:|\s+Delivering|\s+Prices include)/i);
  const u1 = text.match(/USAGE:\s*(.+?)(?:\s+Delivering|\s+Prices include|\s+Delivery Volume|\s+this\.select)/i);
  const d2 = text.match(/Description\s+(.+?)(?:\s+Uses\s+|\s+Delivering|\s+Prices include)/i);
  const u2 = text.match(/Uses\s+(.+?)(?:\s+Delivering|\s+Prices include|\s+Delivery Volume|\s+this\.select)/i);
  description = cleanText((d1 && d1[1]) || (d2 && d2[1]) || "");
  usage = cleanText((u1 && u1[1]) || (u2 && u2[1]) || "");

  const images = [...new Set([...body.matchAll(/https:\/\/imagedelivery\.net\/[^"'\s<>]+/g)].map((m) => m[0]))];
  return {
    name,
    description,
    usage,
    image: pickImage(images),
    thumb: pickImage(images).replace("width=1200,height=900", "width=600,height=450"),
  };
}

const CATALOG = {
  yard: "Olympia",
  phone: "(360) 754-3722",
  tel: "tel:3607543722",
  address: "9418 Old Highway 99 SE, Olympia, WA 98501",
  catalog: "https://olympia.tewalrath.com/catalog",
  maps: "https://www.google.com/maps/place/Walrath+Landscape+Supply/@46.9514699,-122.8622127,553m",
  note: "Delivering Monday through Saturday. Zone 1 delivery is included in catalog pricing. Extended zones have additional fees. The Olympia yard confirms tonnage and truck size.",
};

const PRODUCTS = [
  { category: "mulch", slug: "cedar-play-chips", name: "Cedar Play Chips", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "fine-bark", name: "Fine Red Bark", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "fine-dark-bark", name: "Fine Dark Bark", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "large-nugget-bark", name: "Medium Nugget Bark", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "medium-bark", name: "Medium Bark", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "small-nugget-bark", name: "Small Nugget Bark", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "walk-onpathway-bark", name: "Walk-On/Pathway Bark", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "sawdust-alder", name: "Sawdust (Alder)", categoryLabel: "Mulches & Ground Cover" },
  { category: "mulch", slug: "hog-fuel", name: "Hog Fuel", categoryLabel: "Mulches & Ground Cover" },
  { category: "sand", slug: "4-to-dust", name: "#4 to Dust", categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "1-12-clean-black", name: '1 1/4" Clean — Black', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "1-12-drain-rock", name: '1 1/2" Drain Rock', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "1-14-clean", name: '1 1/4" Clean — Grey', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "1-14-minus", name: '1 1/4" Minus — Grey', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "3x10-castle-rock", name: '3" × 10" Castle Rock', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "34-clean-black", name: '3/4" Clean — Black', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "34-to-3-castle-rock", name: '3/4" × 3" Castle Rock', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "38-pea-gravel", name: '3/8" Pea Gravel', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "58-minus", name: '5/8" Minus — Gray', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "78-drain-rock", name: '7/8" Drain Rock', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "utility-sand", name: "Utility Sand", categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "1-14-minus-black", name: '1 1/4" Minus — Black', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "58-minus-black", name: '5/8" Minus — Black', categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "pumice", name: "Pumice", categoryLabel: "Sand & Gravel" },
  { category: "sand", slug: "greens-grade-sand", name: "Greens Grade Sand", categoryLabel: "Sand & Gravel" },
  { category: "soil", slug: "3-way-topsoil", name: "3-Way Topsoil", categoryLabel: "Soils & Amendments" },
  { category: "soil", slug: "premium-garden-blend", name: "Premium Garden Blend", categoryLabel: "Soils & Amendments" },
  { category: "soil", slug: "turf-booster", name: "Turf Booster", categoryLabel: "Soils & Amendments" },
  { category: "soil", slug: "house-blend-potting-soil", name: "House Blend Potting Soil", categoryLabel: "Soils & Amendments" },
  { category: "soil", slug: "compost", name: "Compost", categoryLabel: "Soils & Amendments" },
  { category: "soil", slug: "moo-magic", name: "Moo Magic", categoryLabel: "Soils & Amendments" },
  { category: "soil", slug: "mushroom-compost", name: "Mushroom Compost", categoryLabel: "Soils & Amendments" },
];

const CATEGORIES = [
  {
    id: "mulch",
    slug: "mulch",
    title: "Mulches & Ground Cover",
    blurb: "Bark, chips, and ground cover for beds, paths, and play areas.",
    source: "https://olympia.tewalrath.com/category/mulch",
  },
  {
    id: "sand",
    slug: "sand-gravel",
    title: "Sand & Gravel",
    blurb: "Drain rock, clean and minus rock, pea gravel, and sand for base and drainage work.",
    source: "https://olympia.tewalrath.com/catalog",
  },
  {
    id: "soil",
    slug: "soil-amendments",
    title: "Soils & Amendments",
    blurb: "Topsoil, planting blends, compost, and potting soil for lawns, beds, and pots.",
    source: "https://olympia.tewalrath.com/category/soil-amendments",
  },
];

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nav(current) {
  return `<nav class="nav" aria-label="Primary">
    <div class="nav-inner">
      <a href="../index.html" class="wordmark">WALRATH</a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-panel" aria-label="Open menu">
        <span></span><span></span>
      </button>
      <div class="nav-panel" id="nav-panel">
        <div class="nav-links">
          <a href="../trucking.html">Trucking</a>
          <a href="../soil.html">Soil Technologies</a>
          <a href="../supply.html">Landscape Supply</a>
          <a href="index.html"${current === "catalog" ? ' aria-current="page"' : ""}>Olympia Catalog</a>
          <a href="../about.html">About</a>
        </div>
        <a class="nav-phone" href="${CATALOG.tel}">${CATALOG.phone}</a>
      </div>
    </div>
  </nav>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">WALRATH</div>
          <p class="footer-blurb">Olympia Landscape Supply — bulk materials with delivery Monday through Saturday.</p>
          <div class="footer-line">${CATALOG.address}</div>
          <a class="footer-line" href="${CATALOG.tel}">${CATALOG.phone}</a>
        </div>
        <div>
          <div class="footer-col-title">Olympia catalog</div>
          <div class="footer-links">
            <a href="index.html">All products</a>
            <a href="mulch.html">Mulches &amp; Ground Cover</a>
            <a href="sand-gravel.html">Sand &amp; Gravel</a>
            <a href="soil-amendments.html">Soils &amp; Amendments</a>
            <a href="${CATALOG.catalog}" target="_blank" rel="noopener">Order on BDP</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Company</div>
          <div class="footer-links">
            <a href="../supply.html">Landscape Supply</a>
            <a href="../supply.html#calc">Cubic Yard Calculator</a>
            <a href="../index.html">Home</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© TE Walrath. All rights reserved.</span>
        <span>Olympia · ${CATALOG.phone}</span>
      </div>
    </div>
  </footer>
  <script src="../app.js"></script>`;
}

function productCard(p) {
  return `<a class="product-card" href="${esc(p.slug)}.html">
    <div class="product-card-media">${p.image ? `<img src="${esc(p.thumb || p.image)}" alt="" width="600" height="450" loading="lazy" />` : ""}</div>
    <div class="product-card-body">
      <div class="eyebrow">${esc(p.categoryLabel)}</div>
      <h3>${esc(p.name)}</h3>
      <p>${esc((p.description || p.usage || "Available for pickup or delivery from Olympia.").slice(0, 140))}</p>
    </div>
  </a>`;
}

function shell({ title, description, body, current }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#0D0E10" />
  <link rel="icon" type="image/png" href="../img/brand/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav(current)}
  <main id="main">${body}</main>
  ${footer()}
</body>
</html>`;
}

fs.mkdirSync("olympia", { recursive: true });

const cleaned = [];
for (const item of PRODUCTS) {
  process.stdout.write(`build ${item.slug}\n`);
  const body = await get(`https://olympia.tewalrath.com/product/${item.slug}`);
  const data = extract(body, item.name);
  cleaned.push({
    ...item,
    description: data.description,
    usage: data.usage,
    image: data.image,
    thumb: data.thumb,
    orderUrl: `https://olympia.tewalrath.com/product/${item.slug}`,
  });
  await new Promise((r) => setTimeout(r, 180));
}

fs.writeFileSync("olympia/products.json", JSON.stringify({ catalog: CATALOG, categories: CATEGORIES, products: cleaned }, null, 2));

for (const p of cleaned) {
  const related = cleaned.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const body = `
    <div class="product-hero">
      <div class="wrap product-hero-grid">
        <div class="product-hero-copy">
          <div class="eyebrow">Olympia · ${esc(p.categoryLabel)}</div>
          <h1>${esc(p.name)}</h1>
          ${p.description ? `<p class="product-lead">${esc(p.description)}</p>` : ""}
          <div class="product-actions">
            <a class="btn btn-primary" href="${esc(p.orderUrl)}" target="_blank" rel="noopener">Order delivery</a>
            <a class="btn btn-outline" href="${CATALOG.tel}">Call ${CATALOG.phone}</a>
          </div>
        </div>
        <div class="product-hero-media">
          ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" width="1200" height="900" />` : ""}
        </div>
      </div>
    </div>
    <section class="wrap product-detail" data-reveal>
      <div class="product-detail-grid">
        <div>
          <div class="eyebrow">How it’s used</div>
          <h2>Project fit</h2>
          <p>${esc(p.usage || "Ask the Olympia yard which volume and truck size fit your job.")}</p>
          <p class="product-note">${esc(CATALOG.note)}</p>
        </div>
        <aside class="product-aside">
          <div class="eyebrow">Yard</div>
          <h3>Walrath Landscape Supply — Olympia</h3>
          <p>${esc(CATALOG.address)}</p>
          <p><a href="${CATALOG.tel}">${CATALOG.phone}</a></p>
          <div class="product-aside-actions">
            <a class="btn btn-primary btn-sm" href="${esc(p.orderUrl)}" target="_blank" rel="noopener">Open in Olympia catalog</a>
            <a class="btn btn-outline" href="${CATALOG.maps}" target="_blank" rel="noopener">Directions</a>
            <a class="btn btn-outline" href="../supply.html#calc">How much do I need?</a>
          </div>
        </aside>
      </div>
      ${
        related.length
          ? `<div class="product-related">
        <div class="eyebrow">More in this category</div>
        <div class="product-grid">${related.map(productCard).join("")}</div>
      </div>`
          : ""
      }
      <p class="product-crumb"><a href="index.html">Olympia catalog</a> / <a href="${esc(CATEGORIES.find((c) => c.id === p.category).slug)}.html">${esc(p.categoryLabel)}</a> / ${esc(p.name)}</p>
    </section>`;
  fs.writeFileSync(
    `olympia/${p.slug}.html`,
    shell({
      title: `${p.name} — Olympia Landscape Supply`,
      description: p.description || `${p.name} available for pickup or delivery from Walrath Landscape Supply Olympia.`,
      body,
      current: "product",
    })
  );
}

for (const cat of CATEGORIES) {
  const items = cleaned.filter((p) => p.category === cat.id);
  const body = `
    <section class="catalog-band">
      <div class="wrap">
        <div class="eyebrow">Olympia catalog</div>
        <h1>${esc(cat.title)}</h1>
        <p>${esc(cat.blurb)}</p>
        <div class="product-actions">
          <a class="btn btn-primary" href="${esc(cat.source)}" target="_blank" rel="noopener">Order this category</a>
          <a class="btn btn-outline" href="index.html">All Olympia products</a>
        </div>
      </div>
    </section>
    <section class="wrap catalog-section" data-reveal>
      <div class="product-grid">${items.map(productCard).join("")}</div>
    </section>`;
  fs.writeFileSync(
    `olympia/${cat.slug}.html`,
    shell({
      title: `${cat.title} — Olympia Landscape Supply`,
      description: cat.blurb,
      body,
      current: "catalog",
    })
  );
}

const indexBody = `
  <section class="catalog-band">
    <div class="wrap">
      <div class="eyebrow">Walrath Landscape Supply</div>
      <h1>Olympia catalog</h1>
      <p>Bulk mulches, sand and gravel, and soil blends from the Olympia yard. Review the product here, then order delivery in the live catalog.</p>
      <div class="product-actions">
        <a class="btn btn-primary" href="${CATALOG.catalog}" target="_blank" rel="noopener">Open live catalog</a>
        <a class="btn btn-outline" href="${CATALOG.tel}">Call ${CATALOG.phone}</a>
      </div>
    </div>
  </section>
  <section class="wrap catalog-section" data-reveal>
    <div class="catalog-cats">
      ${CATEGORIES.map(
        (c) => `<a class="catalog-cat" href="${esc(c.slug)}.html">
        <div class="eyebrow">${cleaned.filter((p) => p.category === c.id).length} products</div>
        <h2>${esc(c.title)}</h2>
        <p>${esc(c.blurb)}</p>
      </a>`
      ).join("")}
    </div>
    <div class="product-grid" style="margin-top:48px">${cleaned.map(productCard).join("")}</div>
  </section>`;

fs.writeFileSync(
  "olympia/index.html",
  shell({
    title: "Olympia Catalog — TE Walrath Landscape Supply",
    description: "Olympia bulk materials catalog: mulches, sand and gravel, and soils with delivery.",
    body: indexBody,
    current: "catalog",
  })
);

console.log(`built ${cleaned.length} products + 3 categories + index`);
console.log(
  cleaned
    .filter((p) => !p.description)
    .map((p) => p.slug)
    .join(", ") || "all products have descriptions"
);
