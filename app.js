const YARDS = [
  {
    city: "Tacoma",
    name: "Walrath Landscape Supply — Tacoma",
    addr: "4810 Portland Ave E, Tacoma, WA 98404",
    phone: "(253) 472-1252",
    tel: "tel:2534721252",
    email: "wlst@tewalrath.com",
    hours: "See our Google page for the most up-to-date hours",
    maps: "https://goo.gl/maps/d4XXSGqsRHw",
    img: "img/yards/tacoma.jpg",
    note: "Family-owned and operated, proudly serving the Tacoma community since 2000. Bulk materials for commercial and residential projects — topsoil, medium and fine bark, compost, and aggregates. Select mulch, compost and soil products in 40–50 lb bags; select aggregates in 50–60 lb bags. We deliver any size load.",
    stock: [
      "Topsoil",
      "Medium & fine bark",
      "Compost",
      "Utility sand",
      "Pea gravel",
      "Drain rock",
      "Bagged materials",
      "House Blend potting soil",
    ],
  },
  {
    city: "Gig Harbor",
    name: "Walrath Landscape Supply — Gig Harbor",
    addr: "4521 56th St NW, Gig Harbor, WA 98335",
    phone: "(253) 858-8184",
    tel: "tel:2538588184",
    email: "wlsg@tewalrath.com",
    hours: "See our Google page for the most up-to-date hours",
    maps: "https://goo.gl/maps/4PNUB9agf6U2",
    img: "img/yards/gigharbor.jpg",
    note: "Proudly serving Gig Harbor since 2014. Bulk materials and nursery plants for landscapers and homeowners, plus hardscape (flagstone, pavers, brick, steps, patios, walls, benches, fire kits — including Castohn®), Aquascapes® pond supplies, outdoor furniture, and John Deere equipment rental by the day, week, or month.",
    stock: [
      "Bulk materials",
      "Nursery plants",
      "Mulches & bark",
      "Sand & gravel",
      "Soils & amendments",
      "Hardscape & pavers",
      "Equipment rental",
      "Bagged goods",
    ],
  },
  {
    city: "Olympia",
    name: "Walrath Landscape Supply — Olympia",
    addr: "9418 Old Highway 99 SE, Olympia, WA 98501",
    phone: "(360) 754-3722",
    tel: "tel:3607543722",
    email: "wlso@tewalrath.com",
    hours: "See our Google page for the most up-to-date hours",
    maps: "https://www.google.com/maps/place/Walrath+Landscape+Supply/@46.9514699,-122.8622127,553m",
    img: "img/yards/olympia.jpg",
    note: "Proudly serving the Olympia community since 2023. Large selection of bulk materials for residential and commercial customers — topsoil, mulch, soil amendments, compost, and aggregates. Bagged House Blend, mushroom compost, utility sand, pea gravel, drain rock, and more. We deliver any size load.",
    stock: [
      "Topsoil",
      "Mulch",
      "Soil amendments",
      "Compost",
      "Aggregates",
      "Bagged materials",
      "House Blend potting soil",
    ],
  },
  {
    city: "NE Tacoma",
    name: "Northeast Tacoma (closed to public)",
    addr: "2244 Marine View Dr, Tacoma, WA 98422",
    phone: "(253) 572-3009",
    tel: "tel:2535723009",
    email: "support@tewalrath.com",
    hours: "Permanently closed to the public — no bulk yard at this time",
    maps: "https://tewalrath.com/landscape-supply-2/northeast-tacoma/",
    img: "img/yards/netacoma.jpg",
    note: "Walrath has stopped selling bulk materials to the public at NE Tacoma while restructuring operations. Please visit Tacoma (4810 Portland Ave E) or Gig Harbor (4521 56th St NW) — and as always, we can deliver any size load. Portland Avenue Nursery is now part of the Walrath family; customers with a valid business license can get 20% off plant orders at any of their 3 nursery sites.",
    stock: ["Delivery — any size load", "Redirect to Tacoma or Gig Harbor"],
  },
];

const state = {
  yard: 0,
  len: 24,
  wid: 14,
  depth: 3,
  login: false,
};

function cubicYards(len, wid, depthIn) {
  return (len * wid * (depthIn / 12)) / 27;
}

function updateClock() {
  const el = document.getElementById("yard-clock");
  if (!el) return;
  el.textContent = `${new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
  })} — Pacific`;
}

function renderYard() {
  if (!document.getElementById("yard-name")) return;
  const yard = YARDS[state.yard];

  document.getElementById("yard-name").textContent = yard.name;
  const statusEl = document.getElementById("yard-status");
  statusEl.textContent = yard.hours;
  statusEl.style.color = yard.city === "NE Tacoma" ? "#C62828" : "#6B7280";

  document.getElementById("yard-addr").textContent = yard.addr;
  document.getElementById("yard-phone").textContent = yard.phone;
  document.getElementById("yard-email").textContent = yard.email;
  document.getElementById("yard-hours").textContent = yard.hours;
  document.getElementById("yard-note").textContent = yard.note;

  const img = document.getElementById("yard-img");
  img.src = yard.img;
  img.alt = `${yard.city} location`;

  const stock = document.getElementById("yard-stock");
  stock.innerHTML = yard.stock.map((s) => `<span>${s}</span>`).join("");

  const call = document.getElementById("yard-call");
  call.href = yard.tel;
  call.textContent = `Call ${yard.phone}`;

  document.getElementById("yard-maps").href = yard.maps;

  document.querySelectorAll(".yard-tab").forEach((btn, i) => {
    btn.classList.toggle("is-active", i === state.yard);
  });
}

function renderCalc() {
  if (!document.getElementById("cubic-yards")) return;
  const cy = cubicYards(state.len, state.wid, state.depth);
  document.getElementById("len-display").textContent = `${state.len} ft`;
  document.getElementById("wid-display").textContent = `${state.wid} ft`;
  document.getElementById("depth-display").textContent = `${state.depth} in`;
  document.getElementById("cubic-yards").textContent = cy.toFixed(1);
  document.getElementById("coverage").textContent =
    `${(state.len * state.wid).toLocaleString()} ft²`;
  document.getElementById("cubic-feet").textContent = Math.round(
    state.len * state.wid * (state.depth / 12)
  ).toLocaleString();
}

function setupReveal() {
  const blocks = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!blocks.length) return;

  const show = (el) => {
    if (el.dataset.shown === "1") return;
    el.dataset.shown = "1";
    el.classList.add("is-shown");
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    blocks.forEach(show);
    return;
  }

  if (!window.IntersectionObserver) {
    blocks.forEach(show);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) show(e.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -8% 0px" }
  );

  blocks.forEach((el) => io.observe(el));

  const sweep = () => {
    const vh = window.innerHeight;
    blocks.forEach((el) => {
      if (el.dataset.shown === "1") return;
      if (el.getBoundingClientRect().top < vh * 0.98) show(el);
    });
  };

  window.addEventListener("scroll", sweep, { passive: true });
  window.addEventListener("resize", sweep);
  requestAnimationFrame(sweep);
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("nav-panel");

  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    panel?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  }

  document.querySelectorAll(".yard-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.yard = Number(btn.dataset.index);
      renderYard();
    });
  });

  const bindSlider = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      state[key] = Number(el.value);
      renderCalc();
    });
  };
  bindSlider("len", "len");
  bindSlider("wid", "wid");
  bindSlider("depth", "depth");

  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      state.login = !state.login;
      document.getElementById("login-panel").classList.toggle("is-open", state.login);
    });
  }

  updateClock();
  renderYard();
  renderCalc();
  setupReveal();

  setTimeout(() => {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.dataset.shown !== "1") {
        el.dataset.shown = "1";
        el.classList.add("is-shown");
      }
    });
  }, 2500);

  setInterval(updateClock, 60000);
});
