(() => {
const YARDS = {
  tacoma: {
    name: "Walrath Landscape Supply — Tacoma",
    area: "Tacoma and greater Tacoma",
    addr: "4810 Portland Ave E, Tacoma, WA 98404",
    phone: "(253) 472-1252",
    tel: "tel:2534721252",
    catalog: "https://tacoma.tewalrath.com/catalog",
    login: "https://tacoma.tewalrath.com",
    maps: "https://goo.gl/maps/d4XXSGqsRHw",
    note: "Serving since 2000. Hours are on Google. Bagged mulch, compost, and soil in 40–50 lb bags; select aggregates in 50–60 lb bags.",
  },
  gig: {
    name: "Walrath Landscape Supply — Gig Harbor",
    area: "Gig Harbor",
    addr: "4521 56th St NW, Gig Harbor, WA 98335",
    phone: "(253) 858-8184",
    tel: "tel:2538588184",
    catalog: "https://gigharbor.tewalrath.com/catalog",
    login: "https://gigharbor.tewalrath.com",
    maps: "https://goo.gl/maps/4PNUB9agf6U2",
    note: "Since 2014. Bulk materials, nursery, hardscape, and the only equipment rental.",
  },
  olympia: {
    name: "Walrath Landscape Supply — Olympia",
    area: "Olympia and Tumwater",
    addr: "9418 Old Highway 99 SE, Olympia, WA 98501",
    phone: "(360) 754-3722",
    tel: "tel:3607543722",
    catalog: "https://olympia.tewalrath.com/catalog",
    login: "https://olympia.tewalrath.com",
    maps: "https://www.google.com/maps/place/Walrath+Landscape+Supply/@46.9514699,-122.8622127,553m",
    note: "Serving since 2023. Hours are on Google.",
  },
};

const PROJECTS = {
  lawn: "For a new or patched lawn, start with soil and amendments. TURF Booster Mix is the blend for topdressing and new lawn installation.",
  garden: "For beds and pots, start with soil and amendments. Premium Garden Blend is for raised beds. House Blend potting soil is for containers.",
  drive: "For a driveway, path, or drainage, start with aggregates.",
  mulch: "To cover beds or a play area, start with mulch.",
  unsure: "Aggregates, mulches, and soil and amendments are all stocked. The yard can confirm the right product.",
};

const trail = [{ id: "who" }];

function choice(key) {
  for (let i = trail.length - 1; i >= 0; i -= 1) {
    const step = steps[trail[i].id];
    if (step && step.key === key && trail[i].choice) return trail[i].choice;
  }
  return null;
}

function choseOutside() {
  return trail.some((entry) => entry.id === "yard" && entry.choice?.id === "outside");
}

const steps = {
  who: {
    key: "who",
    question: "Who is this for?",
    help: "Answer a few questions. We’ll send you to order delivery, visit a yard, or the right Walrath division.",
    options: [
      { id: "homeowner", label: "Homeowner or renter", summary: "Homeowner or renter", next: "need-home" },
      { id: "contractor", label: "Landscape contractor or builder", summary: "Contractor or builder", next: "need-pro" },
      { id: "unsure", label: "I’m not sure", summary: "Not sure yet", next: "need-unsure" },
    ],
  },
  "need-home": {
    key: "need",
    question: "What do you need?",
    help: "Most yard projects start with bulk material. Plants and equipment rental are separate.",
    options: [
      { id: "bulk", label: "Bulk material for a yard project", summary: "Bulk material", next: "project" },
      { id: "plants", label: "Plants or nursery", summary: "Plants or nursery", next: "nursery" },
      { id: "rental", label: "Equipment rental", summary: "Equipment rental", next: "result-rental" },
      { id: "other", label: "Something else", summary: "Something else", next: "other" },
    ],
  },
  "need-pro": {
    key: "need",
    question: "What is the job?",
    help: "Retail yards handle bulk material and plants. Specialty specs go to another division.",
    options: [
      { id: "bulk", label: "Bulk material, pickup or delivery", summary: "Bulk material", next: "project" },
      { id: "plants", label: "Plants for a job", summary: "Plants for a job", next: "nursery" },
      { id: "rental", label: "Equipment rental", summary: "Equipment rental", next: "result-rental" },
      { id: "specialty", label: "Specialty work, not a retail yard order", summary: "Specialty work", next: "other" },
    ],
  },
  "need-unsure": {
    key: "need",
    question: "Which of these sounds closest?",
    help: "Pick the nearest match. You can go back if it is wrong.",
    options: [
      { id: "bulk", label: "I need dirt, bark, rock, or compost", summary: "Dirt, bark, rock, or compost", next: "project" },
      { id: "plants", label: "I need plants", summary: "Plants", next: "nursery" },
      { id: "truck", label: "I need a truck to haul something", summary: "A truck to haul something", next: "result-trucking" },
      { id: "spec", label: "I have a technical soil or sand spec", summary: "Technical soil or sand spec", next: "spec" },
    ],
  },
  project: {
    key: "project",
    question: "What are you working on?",
    help: "You don’t need the product name. We’ll match the project to a material.",
    options: [
      { id: "lawn", label: "New or patched lawn", summary: "Lawn", next: "fulfill" },
      { id: "garden", label: "Garden beds or pots", summary: "Garden beds or pots", next: "fulfill" },
      { id: "drive", label: "Driveway, path, or drainage", summary: "Driveway, path, or drainage", next: "fulfill" },
      { id: "mulch", label: "Cover beds or a play area", summary: "Cover or play area", next: "fulfill" },
      { id: "unsure", label: "I’m not sure", summary: "Material not chosen yet", next: "fulfill" },
    ],
  },
  fulfill: {
    key: "fulfill",
    question: "Pickup or delivery?",
    help: "Delivery is available from each yard. The catalog shows that yard’s zone.",
    options: [
      { id: "delivery", label: "Deliver it", summary: "Delivery", next: "yard" },
      { id: "pickup", label: "I’ll pick it up", summary: "Pickup", next: "yard" },
    ],
  },
  yard: {
    key: "yard",
    question: "Which area are you in?",
    help: "Choose the closest yard. If you are farther out, we can still open a catalog — that yard confirms the delivery zone.",
    options: [
      { id: "tacoma", label: "Tacoma and greater Tacoma", summary: "Tacoma", next: "result-bulk" },
      { id: "gig", label: "Gig Harbor", summary: "Gig Harbor", next: "result-bulk" },
      { id: "olympia", label: "Olympia and Tumwater", summary: "Olympia", next: "result-bulk" },
      { id: "outside", label: "Somewhere else", summary: "Outside the three yard areas", next: "yard-outside" },
    ],
  },
  "yard-outside": {
    key: "yard",
    question: "Which catalog should we open?",
    help: "Delivery may still be available. The yard confirms the zone and the truck in its catalog.",
    options: [
      { id: "tacoma", label: "Tacoma catalog", summary: "Tacoma catalog", next: "result-bulk" },
      { id: "gig", label: "Gig Harbor catalog", summary: "Gig Harbor catalog", next: "result-bulk" },
      { id: "olympia", label: "Olympia catalog", summary: "Olympia catalog", next: "result-bulk" },
    ],
  },
  nursery: {
    key: "nursery",
    question: "Where do you need plants?",
    help: "Gig Harbor, The Barn Nursery, and Portland Avenue Nursery are the three nursery locations. Plants are not in the bulk catalogs.",
    options: [
      { id: "gig", label: "Gig Harbor", summary: "Gig Harbor nursery", next: "result-nursery" },
      { id: "olympia", label: "Olympia", summary: "Olympia nursery", next: "result-nursery" },
      { id: "tacoma", label: "Tacoma", summary: "Tacoma nursery", next: "result-nursery" },
    ],
  },
  other: {
    key: "other",
    question: "Which of these is it?",
    help: "These are not retail yard orders.",
    options: [
      { id: "truck", label: "Hauling, moving equipment, poles, or cement", summary: "Trucking", next: "result-trucking" },
      { id: "soil", label: "Green roof, stormwater, or a custom soil spec", summary: "Soil Technologies", next: "result-soil" },
      { id: "sand", label: "Golf course or sports-field sand", summary: "Sand Products", next: "result-sand" },
    ],
  },
  spec: {
    key: "other",
    question: "Which spec is it?",
    help: "Soil Technologies and Sand Products are separate from the retail yards.",
    options: [
      { id: "soil", label: "Green roof, stormwater, bioretention, or a custom soil blend", summary: "Soil Technologies", next: "result-soil" },
      { id: "sand", label: "Golf course sand, divot mix, or sports-field infield", summary: "Sand Products", next: "result-sand" },
    ],
  },
};

function stepId() {
  return trail[trail.length - 1].id;
}

function isContractor() {
  return choice("who")?.id === "contractor";
}

function isDelivery() {
  return choice("fulfill")?.id === "delivery";
}

function bulkCopy(yard) {
  const project = PROJECTS[choice("project")?.id] || PROJECTS.unsure;
  const zone = choseOutside()
    ? " This yard confirms whether your address is in its delivery zone."
    : "";
  const load = isDelivery() ? " We deliver any size load." : "";
  const pro = isContractor()
    ? " Delivery zones and contractor account login are in that yard’s catalog."
    : "";
  return `${project}${load}${zone}${pro} ${yard.name} — ${yard.area}.`;
}

function results() {
  const yard = YARDS[choice("yard")?.id] || YARDS.tacoma;

  return {
    "result-bulk": {
      question: isDelivery() ? "Order delivery" : "Pick up at the yard",
      help: bulkCopy(yard),
      place: yard.name,
      meta: `${yard.addr} · ${yard.phone}`,
      calc: true,
      primary: {
        href: yard.catalog,
        label: isDelivery() ? "Order home delivery" : "View this yard’s catalog",
        external: true,
      },
      secondary: isDelivery()
        ? { href: yard.tel, label: `Call ${yard.phone}` }
        : { href: yard.maps, label: "Directions", external: true },
    },
    "result-nursery": nurseryResult(),
    "result-rental": {
      question: "Rent equipment in Gig Harbor",
      help: "John Deere 17G compact excavator from $240/day, 35G from $330/day, and 323E track skid steer from $370/day. Available by the day, week, or month. Call Gig Harbor for pricing and reservations.",
      place: YARDS.gig.name,
      meta: YARDS.gig.addr,
      primary: { href: YARDS.gig.tel, label: "Call (253) 858-8184" },
      secondary: { href: YARDS.gig.maps, label: "Directions", external: true },
    },
    "result-trucking": {
      question: "This is a trucking job",
      help: "Hauling, equipment moving, poles, and cement go to Walrath Trucking. Call dispatch at the main office.",
      place: "Trucking",
      meta: "Main office · (253) 531-7499",
      primary: { href: "tel:2535317499", label: "Call dispatch" },
      secondary: { href: "trucking.html", label: "Trucking services" },
    },
    "result-soil": {
      question: "This is a Soil Technologies project",
      help: "Green roof media, stormwater, bioretention, and custom spec blends are handled by Soil Technologies. Walrath is a rooflite certified blender.",
      place: "Soil Technologies",
      meta: "Not a retail yard order",
      primary: {
        href: "https://soiltech.tewalrath.com/",
        label: "Soil Technologies",
        external: true,
      },
      secondary: { href: "tel:2535317499", label: "Call (253) 531-7499" },
    },
    "result-sand": {
      question: "This is a Sand Products job",
      help: "Golf course sand, divot mix, and sports-field infield go to Sand Products. Call the main office and they’ll route it.",
      place: "Sand Products",
      meta: "Main office · (253) 531-7499 · support@tewalrath.com",
      primary: { href: "tel:2535317499", label: "Call the main office" },
      secondary: { href: "mailto:support@tewalrath.com", label: "Email support" },
    },
  };
}

function nurseryResult() {
  const where = choice("nursery")?.id;
  if (where === "olympia") {
    return {
      question: "The Barn Nursery",
      help: "Olympia plants are at The Barn Nursery, one of Walrath’s three nursery locations. Plants are not sold in the bulk catalog.",
      place: "The Barn Nursery — Olympia",
      meta: "thebarnnurseryolympia.com",
      primary: {
        href: "https://thebarnnurseryolympia.com/",
        label: "Open The Barn Nursery",
        external: true,
      },
      secondary: { href: YARDS.olympia.tel, label: `Call ${YARDS.olympia.phone}` },
    };
  }
  if (where === "tacoma") {
    return {
      question: "Portland Avenue Nursery",
      help: "Tacoma plants are at Portland Avenue Nursery, one of Walrath’s three nursery locations. Plants are not sold in the bulk catalog.",
      place: "Portland Avenue Nursery — Tacoma",
      meta: "portlandavenursery.com",
      primary: {
        href: "https://www.portlandavenursery.com/",
        label: "Open Portland Avenue Nursery",
        external: true,
      },
      secondary: { href: YARDS.tacoma.tel, label: `Call ${YARDS.tacoma.phone}` },
    };
  }
  return {
    question: "Nursery at Gig Harbor",
    help: "The Gig Harbor yard has the nursery on site. It is one of three Walrath nursery locations. Plants are not sold in the bulk catalog.",
    place: YARDS.gig.name,
    meta: `${YARDS.gig.addr} · ${YARDS.gig.phone}`,
    primary: { href: YARDS.gig.maps, label: "Directions", external: true },
    secondary: { href: YARDS.gig.tel, label: `Call ${YARDS.gig.phone}` },
  };
}

function linkAttrs(action) {
  const ext = action.external ? ' target="_blank" rel="noopener"' : "";
  return `href="${action.href}"${ext}`;
}

const SCENES = {
  who: "img/hero/hero.jpg",
  "need-home": "img/bands/supply.jpg",
  "need-pro": "img/yards/gigharbor.jpg",
  "need-unsure": "img/hero/hero.jpg",
  project: "img/bands/supply.jpg",
  fulfill: "img/hero/hero.jpg",
  yard: "img/bands/supply.jpg",
  "yard-outside": "img/hero/hero.jpg",
  nursery: "img/bands/supply.jpg",
  other: "img/bands/trucking.jpg",
  spec: "img/soil/production.jpg",
  "result-rental": "img/rentals/17g.jpg",
  "result-trucking": "img/bands/trucking.jpg",
  "result-soil": "img/bands/soil.jpg",
  "result-sand": "img/bulk/aggregates.jpg",
};

const YARD_PHOTO = {
  tacoma: "img/yards/tacoma.jpg",
  gig: "img/yards/gigharbor.jpg",
  olympia: "img/yards/olympia.jpg",
};

const PROJECT_PHOTO = {
  lawn: "img/bulk/soil.jpg",
  garden: "img/bulk/soil.jpg",
  drive: "img/bulk/aggregates.jpg",
  mulch: "img/bulk/mulches.jpg",
  unsure: "img/bands/supply.jpg",
};

function sceneSrc() {
  const id = stepId();
  if (id === "fulfill" || id === "yard" || id === "yard-outside") {
    return PROJECT_PHOTO[choice("project")?.id] || SCENES[id];
  }
  if (id === "result-bulk") {
    return YARD_PHOTO[choice("yard")?.id] || PROJECT_PHOTO[choice("project")?.id] || "img/hero/hero.jpg";
  }
  if (id === "result-nursery") {
    return YARD_PHOTO[choice("nursery")?.id] || "img/bands/supply.jpg";
  }
  return SCENES[id] || "img/hero/hero.jpg";
}

let shown = "a";
let sceneToken = 0;

function setScene(src) {
  const current = document.getElementById(`hero-${shown}`);
  if (!current || current.dataset.src === src) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    current.src = src;
    current.dataset.src = src;
    return;
  }
  const nextId = shown === "a" ? "b" : "a";
  const next = document.getElementById(`hero-${nextId}`);
  const photos = document.querySelector(".hero-photos");
  if (!next || !photos) return;
  const token = ++sceneToken;
  next.src = src;
  next.dataset.src = src;
  next.classList.remove("is-settled");
  photos.classList.remove("is-forward", "is-back");
  void photos.offsetWidth;
  photos.classList.add(motion === "back" ? "is-back" : "is-forward");
  current.classList.remove("is-on");
  next.classList.add("is-on");
  shown = nextId;
  window.setTimeout(() => {
    if (token !== sceneToken) return;
    photos.classList.remove("is-forward", "is-back");
    next.classList.add("is-settled");
  }, 1150);
}

function preloadScenes() {
  const srcs = new Set([
    ...Object.values(SCENES),
    ...Object.values(YARD_PHOTO),
    ...Object.values(PROJECT_PHOTO),
  ]);
  srcs.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function optionButton(opt, i) {
  return `<button type="button" class="guide-option" data-index="${i}"><span class="guide-label">${opt.label}</span><span class="guide-go" aria-hidden="true">→</span></button>`;
}

let motion = "forward";
let busy = false;
let firstPaint = true;

function playStep() {
  if (firstPaint) {
    firstPaint = false;
    return;
  }
  const copy = document.getElementById("guide-copy");
  const options = document.getElementById("guide-options");
  [copy, options].forEach((el) => {
    if (!el) return;
    el.classList.remove("is-in", "is-back");
    void el.offsetWidth;
    el.classList.add(motion === "back" ? "is-back" : "is-in");
  });
}

function render() {
  const id = stepId();
  const question = document.getElementById("guide-question");
  const help = document.getElementById("guide-help");
  const options = document.getElementById("guide-options");
  const back = document.getElementById("guide-back");
  const reset = document.getElementById("guide-reset");
  const path = document.getElementById("guide-path");
  const kicker = document.getElementById("guide-kicker");
  if (!question || !options || !back) return;

  options.classList.remove("is-leaving");
  back.disabled = false;
  reset.hidden = trail.length <= 1;
  if (kicker) kicker.textContent = trail.length <= 1 ? "Start here" : `Step ${trail.length}`;
  document.querySelector(".hero")?.classList.toggle("is-started", trail.length > 1);

  const result = results()[id];
  if (result) {
    question.textContent = result.question;
    help.textContent = result.help;
    const calc = result.calc
      ? '<a class="guide-calc" href="supply.html#calc">How much do I need?</a>'
      : "";
    options.innerHTML = `<div class="guide-result">
      <p class="guide-place">${result.place}</p>
      <p class="guide-meta">${result.meta}</p>
      ${calc}
      <div class="guide-buttons">
        <a class="btn btn-primary btn-sm" ${linkAttrs(result.primary)}>${result.primary.label}</a>
        <a class="btn btn-outline" ${linkAttrs(result.secondary)}>${result.secondary.label}</a>
      </div>
    </div>`;
  } else {
    const step = steps[id];
    question.textContent = step.question;
    help.textContent = step.help;
    options.innerHTML = step.options.map(optionButton).join("");
  }

  const items = trail
    .map((entry) => {
      const step = steps[entry.id];
      if (!step || !entry.choice) return "";
      return `<li>${entry.choice.summary}</li>`;
    })
    .filter(Boolean);
  path.innerHTML = items.join("");
  setScene(sceneSrc());
  playStep();
}

function choose(index) {
  if (busy) return;
  const step = steps[stepId()];
  const opt = step?.options[index];
  if (!opt) return;
  const go = () => {
    render();
    busy = false;
    document.getElementById("guide-question")?.focus({ preventScroll: true });
  };
  const commit = () => {
    trail[trail.length - 1].choice = opt;
    trail.push({ id: opt.next });
    motion = "forward";
    setScene(sceneSrc());
  };
  const btn = document.querySelector(`#guide-options .guide-option[data-index="${index}"]`);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (btn && !reduce) {
    busy = true;
    document.getElementById("guide-options")?.classList.add("is-leaving");
    btn.classList.add("is-picked");
    commit();
    window.setTimeout(go, 280);
  } else {
    commit();
    go();
  }
}

function openGuide() {
  const hero = document.querySelector(".hero");
  if (!hero || hero.classList.contains("is-open")) return;
  hero.classList.add("is-open");
  firstPaint = false;
  motion = "forward";
  render();
  document.getElementById("guide-question")?.focus({ preventScroll: true });
}

function closeGuide() {
  busy = false;
  trail.length = 0;
  trail.push({ id: "who" });
  motion = "back";
  const hero = document.querySelector(".hero");
  hero?.classList.remove("is-open", "is-started");
  setScene("img/hero/hero.jpg");
  document.getElementById("guide-open")?.focus({ preventScroll: true });
}

function back() {
  if (busy) return;
  if (trail.length <= 1) {
    closeGuide();
    return;
  }
  trail.pop();
  motion = "back";
  render();
  document.getElementById("guide-question")?.focus({ preventScroll: true });
}

function reset() {
  if (busy) return;
  trail.length = 0;
  trail.push({ id: "who" });
  motion = "back";
  render();
  document.getElementById("guide-question")?.focus({ preventScroll: true });
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest("#guide-open")) {
    event.preventDefault();
    openGuide();
    return;
  }
  const option = target.closest("#guide-options .guide-option");
  if (option) {
    event.preventDefault();
    choose(Number(option.dataset.index));
    return;
  }
  if (target.closest("#guide-back")) {
    event.preventDefault();
    back();
    return;
  }
  if (target.closest("#guide-reset")) {
    event.preventDefault();
    reset();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const options = document.getElementById("guide-options");
  if (!options) return;
  document.getElementById("guide-question")?.setAttribute("tabindex", "-1");
  options.addEventListener("keydown", (event) => {
    const buttons = [...options.querySelectorAll(".guide-option")];
    const index = buttons.indexOf(document.activeElement);
    if (index < 0) return;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      buttons[(index + 1) % buttons.length].focus();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      buttons[(index - 1 + buttons.length) % buttons.length].focus();
    }
  });
  preloadScenes();
});
})();
