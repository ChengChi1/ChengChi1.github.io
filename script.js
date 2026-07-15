const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

if (header && nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    header.classList.toggle("is-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      header.classList.remove("is-open");
    }
  });
}

const definitionTrigger = document.querySelector("[data-definition-trigger]");
const definitionPanel = document.querySelector("[data-definition-panel]");

function setDefinitionOpen(isOpen) {
  if (!definitionTrigger || !definitionPanel) {
    return;
  }

  definitionPanel.hidden = !isOpen;
  definitionTrigger.classList.toggle("is-open", isOpen);
  definitionTrigger.setAttribute("aria-expanded", String(isOpen));
}

if (definitionTrigger && definitionPanel) {
  definitionTrigger.addEventListener("click", () => {
    setDefinitionOpen(definitionPanel.hidden);
  });

  document.addEventListener("click", (event) => {
    if (
      definitionPanel.hidden ||
      definitionTrigger.contains(event.target) ||
      definitionPanel.contains(event.target)
    ) {
      return;
    }

    setDefinitionOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !definitionPanel.hidden) {
      setDefinitionOpen(false);
      definitionTrigger.focus();
    }
  });
}

const publicationItems = document.querySelectorAll(".theme-papers .archive__item");
const paperFigureAssetVersion = "paper-figure-differential-diffusion-hoq-20260706";
const paperFigureSources = Array.from(
  { length: 42 },
  (_, index) =>
    `assets-paper-figures-paper-${String(index + 1).padStart(2, "0")}.jpg?v=${paperFigureAssetVersion}`,
);

const publicationAuthors = [
  "C. Chi, B. Cuenot, and D. Thévenin",
  "C. Chen, C. Chi, W. Han, L. Yang, and D. Thévenin",
  "C. Yu, C. Chi, C. Tang, and B. Gorr",
  "C. Chi",
  "C. Chi, C. Yu, B. Cuenot, U. Maas, and D. Thévenin",
  "C. Yu, L. Cai, C. Chi, S. Mashruk, A. Valera-Medina, and U. Maas",
  "C. Chi, W. Guan, Z. Ou, K. Sundmacher, and D. Thévenin",
  "Z. Ou, L. Guo, C. Chi, J. Zhao, H. Jin, and D. Thévenin",
  "Z. Ou, L. Guo, C. Chi, et al.",
  "C. Chi, Z. Ou, C. Yu, W. Han, and D. Thévenin",
  "A. Hemaizia, D. Thévenin, and C. Chi",
  "C. Chi, H. Theisel, and D. Thévenin",
  "C. Chi, D. Thévenin, A. J. Smits, S. Wolligandt, and H. Theisel",
  "Z. Zhang, A. Abdelsamie, C. Chi, D. Thévenin, and K. H. Luo",
  "C. Chi, W. Guan, V. Inna, and D. Thévenin",
  "W. Guan, C. Chi, W. Liang, and D. Thévenin",
  "C. Chi and D. Thévenin",
  "C. Chi, W. Han, and D. Thévenin",
  "C. Chi, W. Han, and D. Thévenin",
  "C. Chi, Z. Chen, and D. Thévenin",
  "C. Chen, C. Chi, D. Thévenin, W. Han, and L. Yang",
  "Y. Wang, C. Xu, C. Chi, and Z. Chen",
  "Y. Wang, C. Xu, C. Chi, Y. Yang, and Z. Chen",
  "C. Chi, A. Abdelsamie, and D. Thévenin",
  "C. Chi, A. Abdelsamie, and D. Thévenin",
  "C. Chi, A. Dernbecher, K. P. R. Subramanian, et al.",
  "W. Guan, C. Chi, A. G. Szanthoffer, and D. Thévenin",
  "W. Guan, A. Abdelsamie, C. Chi, Z. He, and D. Thévenin",
  "C. Chi, S. Sreekumar, and D. Thévenin",
  "C. Chi, X. Xu, and D. Thévenin",
  "C. Chi, G. Janiga, and D. Thévenin",
  "C. Chi, G. Janiga, K. Zähringer, and D. Thévenin",
  "C. Chi, G. Janiga, A. Abdelsamie, K. Zähringer, T. Turányi, and D. Thévenin",
  "W. Guan, F. Gharibi, C. Chi, A. Abdelsamie, and D. Thévenin",
  "Z. Ou, Y. Wan, C. Chi, Q. Xue, and D. Thévenin",
  "Z. Ou, Y. Wan, Q. Xue, C. Chi, F. Gharibi, and D. Thévenin",
  "A. Abdelsamie, S. Voss, C. Chi, et al.",
  "S. Wolligandt, C. Rössl, C. Chi, D. Thévenin, and H. Theisel",
  "Z. Ou, C. Chi, L. Guo, and D. Thévenin",
  "A. Abdelsamie, C. Chi, M. Nanjaiah, I. Skenderović, S. Suleiman, and D. Thévenin",
  "C. Chi, A. Abdelsamie, and D. Thévenin",
  "C. Chi, B. J. Lee, and H. G. Im",
];

const correspondingAuthorPaperIndices = new Set([
  1, // A flame marker for ammonia/hydrogen/air premixed flames during flame/wall interactions.
  15, // Revisiting performance of reactivity stratification with hydrogen addition for ammonia combustion.
]);

function getPublicationIndex(item, fallbackIndex = 0) {
  const index = Number.parseInt(item?.dataset.paperIndex || "", 10);

  if (Number.isFinite(index) && index > 0) {
    return index - 1;
  }

  return fallbackIndex;
}

function isFirstOrCorrespondingAuthorPaper(index) {
  const authorText = publicationAuthors[index] || "";
  return /^C\.\s*Chi\b/.test(authorText) || correspondingAuthorPaperIndices.has(index);
}

function getPublicationYear(item) {
  return Number.parseInt(item.querySelector(".page__meta")?.textContent.trim() || "0", 10) || 0;
}

function reorderPublicationItemsByRoleAndYear() {
  document.querySelectorAll(".theme-papers").forEach((paperGroup) => {
    const listItems = Array.from(paperGroup.children).filter((child) =>
      child.classList.contains("list__item"),
    );

    listItems.sort((a, b) => {
      const itemA = a.querySelector(".archive__item");
      const itemB = b.querySelector(".archive__item");
      const indexA = getPublicationIndex(itemA);
      const indexB = getPublicationIndex(itemB);
      const roleDelta =
        Number(isFirstOrCorrespondingAuthorPaper(indexB)) -
        Number(isFirstOrCorrespondingAuthorPaper(indexA));

      if (roleDelta) {
        return roleDelta;
      }

      const yearDelta = getPublicationYear(itemB) - getPublicationYear(itemA);

      if (yearDelta) {
        return yearDelta;
      }

      return indexA - indexB;
    });

    listItems.forEach((item) => paperGroup.append(item));
  });
}

const venueAbbreviations = {
  "Applications in Energy and Combustion Science": "Appl. Energy Combust. Sci.",
  "Combustion and Flame": "Combust. Flame",
  "Computers and Fluids": "Comput. Fluids",
  "Energy & Fuels": "Energy Fuels",
  "Energy Conversion and Management": "Energy Convers. Manag.",
  "European Journal of Mechanics / B Fluids": "Eur. J. Mech. B Fluids",
  "Flow, Turbulence and Combustion": "Flow Turbul. Combust.",
  Fuel: "Fuel",
  "International Journal for Numerical Methods in Fluids": "Int. J. Numer. Meth. Fluids",
  "Journal of Computational Physics": "J. Comput. Phys.",
  "Journal of Fluid Mechanics": "J. Fluid Mech.",
  "Journal of Thermal Science": "J. Therm. Sci.",
  Particuology: "Particuology",
  "Physical Review Fluids": "Phys. Rev. Fluids",
  "Physics of Fluids": "Phys. Fluids",
  "Proceedings in Applied Mathematics and Mechanics": "PAMM",
  "Proceedings of the Combustion Institute": "Proc. Combust. Inst.",
  "Proceedings of the Conference on Vision, Modeling, and Visualization": "VMV Proc.",
};

const schematicThemes = {
  "theme-wall-flame": {
    kind: "wall",
    label: "FWI",
    accent: "#e05242",
    secondary: "#2b7fa3",
  },
  "theme-interphase": {
    kind: "particle",
    label: "interface",
    accent: "#2c8c6b",
    secondary: "#d58a27",
  },
  "theme-flow": {
    kind: "flow",
    label: "flow",
    accent: "#2b7fa3",
    secondary: "#e05242",
  },
  "theme-mixture": {
    kind: "mixture",
    label: "mixing",
    accent: "#2c8c6b",
    secondary: "#d58a27",
  },
  "theme-reaction": {
    kind: "reaction",
    label: "limit",
    accent: "#dd5b3a",
    secondary: "#4468a8",
  },
  "theme-porous": {
    kind: "particle",
    label: "porous",
    accent: "#7b6f53",
    secondary: "#2b7fa3",
  },
  "theme-ai": {
    kind: "ai",
    label: "AI",
    accent: "#5f63b4",
    secondary: "#2c8c6b",
  },
  "theme-other": {
    kind: "method",
    label: "method",
    accent: "#65717a",
    secondary: "#2b7fa3",
  },
};

reorderPublicationItemsByRoleAndYear();

function getSchematicTheme(item) {
  const themeHost =
    item.closest(".research-branch--with-papers") ||
    item.closest(".research-domain--with-papers");

  return schematicThemes[themeHost?.id] || schematicThemes["theme-other"];
}

function detectPaperFeatures(title) {
  const text = title.toLowerCase();
  return {
    diffusion: /diffusion|transport|species|molecular/.test(text),
    emission: /emission|\\bno\\b|nox|pollutant/.test(text),
    ignition: /ignition|hotspot|pre-chamber|prechamber|hot jet/.test(text),
    neural: /neural|machine learning|data-driven|manifold|kinetic|reduced|marker/.test(text),
    porous: /porous|pore|ghost-cell|immersed|boundary|flow map|larynx/.test(text),
    temperature: /temperature|cryogenic|cool|ultra-lean|extinction|flammability/.test(text),
    particle: /particle|gasification|pyrolysis|spray|interphase/.test(text),
  };
}

function schematicOverlay(features, id, accent, secondary) {
  const pieces = [];

  if (features.diffusion) {
    pieces.push(`
      <path d="M42 28 C62 18 78 38 96 28" stroke="${secondary}" stroke-width="2" fill="none" opacity=".55"/>
      <path d="M88 24 L98 28 L88 32" stroke="${secondary}" stroke-width="2" fill="none" opacity=".55"/>
    `);
  }

  if (features.emission) {
    pieces.push(`
      <circle cx="130" cy="28" r="3" fill="#2c8c6b" opacity=".9"/>
      <circle cx="145" cy="39" r="2.5" fill="#2c8c6b" opacity=".7"/>
      <circle cx="119" cy="45" r="2" fill="#2c8c6b" opacity=".65"/>
    `);
  }

  if (features.ignition) {
    pieces.push(`
      <path d="M136 70 l6 -12 l6 12 l-6 -4 Z" fill="${accent}" opacity=".85"/>
      <circle cx="142" cy="62" r="14" fill="${accent}" opacity=".08"/>
    `);
  }

  if (features.neural) {
    pieces.push(`
      <circle cx="133" cy="31" r="3" fill="${secondary}"/>
      <circle cx="150" cy="43" r="3" fill="${secondary}"/>
      <circle cx="132" cy="57" r="3" fill="${secondary}"/>
      <path d="M136 33 L147 41 M147 45 L136 56" stroke="${secondary}" stroke-width="1.6" opacity=".7"/>
    `);
  }

  if (features.porous) {
    pieces.push(`
      <circle cx="42" cy="31" r="5" fill="#fff" stroke="${accent}" stroke-width="1.6" opacity=".75"/>
      <circle cx="58" cy="50" r="4" fill="#fff" stroke="${accent}" stroke-width="1.6" opacity=".65"/>
      <circle cx="43" cy="68" r="3" fill="#fff" stroke="${accent}" stroke-width="1.6" opacity=".6"/>
    `);
  }

  if (features.temperature) {
    pieces.push(`
      <path d="M118 78 C130 55 145 55 157 78" stroke="${secondary}" stroke-width="2.2" fill="none" opacity=".75"/>
      <path d="M118 78 C130 68 145 68 157 78" stroke="${accent}" stroke-width="2.2" fill="none" stroke-dasharray="4 4" opacity=".75"/>
    `);
  }

  if (features.particle) {
    pieces.push(`
      <circle cx="112" cy="36" r="7" fill="url(#${id}-hot)" opacity=".85"/>
      <path d="M122 36 h18" stroke="${secondary}" stroke-width="1.8" opacity=".6"/>
      <path d="M135 31 l6 5 l-6 5" stroke="${secondary}" stroke-width="1.8" fill="none" opacity=".6"/>
    `);
  }

  return pieces.join("");
}

function schematicMotif(kind, id, accent, secondary) {
  const hot = `url(#${id}-hot)`;
  const cool = `url(#${id}-cool)`;

  if (kind === "wall") {
    return `
      <rect x="22" y="20" width="12" height="68" rx="2" fill="${cool}" stroke="${secondary}" stroke-width="1.4"/>
      <path d="M28 23 v62" stroke="#fff" stroke-width="1" opacity=".7"/>
      <path d="M36 30 C54 34 47 54 65 58 C82 62 76 82 101 84" stroke="${secondary}" stroke-width="2" fill="none" opacity=".45"/>
      <path d="M73 83 C55 70 61 48 79 34 C79 52 100 55 101 77 C98 92 80 94 73 83Z" fill="${hot}" stroke="${accent}" stroke-width="1.2"/>
      <path d="M82 82 C75 73 78 61 88 52 C89 66 99 69 95 82 C92 89 85 89 82 82Z" fill="#fff" opacity=".55"/>
    `;
  }

  if (kind === "particle") {
    return `
      <circle cx="78" cy="56" r="25" fill="${hot}" stroke="${accent}" stroke-width="1.5"/>
      <circle cx="78" cy="56" r="14" fill="#fff" opacity=".25"/>
      <path d="M35 32 C55 20 84 19 111 30" stroke="${secondary}" stroke-width="2" fill="none" opacity=".5"/>
      <path d="M117 31 l-8 4 l2 -8" stroke="${secondary}" stroke-width="2" fill="none" opacity=".5"/>
      <path d="M46 78 C67 92 101 90 126 72" stroke="${secondary}" stroke-width="2" fill="none" opacity=".5"/>
      <circle cx="132" cy="43" r="6" fill="${cool}" stroke="${secondary}" stroke-width="1.2"/>
      <circle cx="148" cy="63" r="4" fill="${cool}" stroke="${secondary}" stroke-width="1.2"/>
    `;
  }

  if (kind === "flow") {
    return `
      <path d="M22 32 H104 C125 32 124 16 108 18" stroke="${secondary}" stroke-width="3" fill="none" opacity=".55"/>
      <path d="M19 55 H132 C151 55 151 76 132 74" stroke="${secondary}" stroke-width="3" fill="none" opacity=".48"/>
      <path d="M31 78 H86" stroke="${secondary}" stroke-width="3" fill="none" opacity=".42"/>
      <path d="M73 86 C56 69 61 48 82 37 C80 56 104 60 101 80 C96 93 79 95 73 86Z" fill="${hot}" stroke="${accent}" stroke-width="1.2"/>
      <circle cx="132" cy="35" r="13" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="5 4" opacity=".75"/>
    `;
  }

  if (kind === "mixture") {
    return `
      <rect x="22" y="25" width="132" height="16" rx="8" fill="${secondary}" opacity=".16"/>
      <rect x="35" y="48" width="118" height="16" rx="8" fill="${accent}" opacity=".18"/>
      <rect x="23" y="71" width="133" height="16" rx="8" fill="${secondary}" opacity=".13"/>
      <path d="M24 57 C45 40 60 74 82 57 S120 40 148 58" stroke="${accent}" stroke-width="3" fill="none"/>
      <path d="M52 26 v58 M104 26 v58" stroke="${secondary}" stroke-width="1.4" stroke-dasharray="4 4" opacity=".55"/>
      <circle cx="48" cy="36" r="3" fill="${secondary}"/>
      <circle cx="118" cy="77" r="3" fill="${accent}"/>
    `;
  }

  if (kind === "reaction") {
    return `
      <path d="M30 82 H151 M30 82 V22" stroke="#7d878e" stroke-width="1.5"/>
      <path d="M32 80 C55 74 68 33 91 32 C116 31 129 70 150 79" stroke="${secondary}" stroke-width="3" fill="none"/>
      <path d="M32 80 C56 73 72 53 93 52 C116 51 132 73 150 80" stroke="${accent}" stroke-width="3" fill="none" stroke-dasharray="6 5"/>
      <path d="M76 31 l4 -9 l4 9" fill="${accent}" opacity=".85"/>
      <circle cx="93" cy="52" r="5" fill="${hot}" opacity=".85"/>
    `;
  }

  if (kind === "ai") {
    return `
      <path d="M34 76 C58 34 93 94 124 41 C135 23 150 28 158 43" stroke="${accent}" stroke-width="3" fill="none"/>
      <circle cx="45" cy="38" r="5" fill="${secondary}"/>
      <circle cx="75" cy="27" r="5" fill="${secondary}"/>
      <circle cx="75" cy="64" r="5" fill="${secondary}"/>
      <circle cx="108" cy="45" r="5" fill="${secondary}"/>
      <circle cx="137" cy="31" r="5" fill="${secondary}"/>
      <path d="M50 38 L70 29 M50 40 L70 62 M80 29 L103 43 M80 63 L103 47 M113 44 L132 33" stroke="${secondary}" stroke-width="1.7" opacity=".55"/>
      <path d="M134 76 C123 65 129 49 142 41 C142 54 155 58 154 73 C151 84 139 84 134 76Z" fill="${hot}" opacity=".85"/>
    `;
  }

  return `
    <path d="M25 24 H154 V84 H25 Z" fill="${cool}" stroke="${secondary}" stroke-width="1.4"/>
    <path d="M25 44 H154 M25 64 H154 M55 24 V84 M88 24 V84 M121 24 V84" stroke="#fff" stroke-width="1" opacity=".75"/>
    <path d="M35 73 C59 27 89 92 122 39 C132 23 146 30 154 43" stroke="${accent}" stroke-width="3" fill="none"/>
    <path d="M45 52 h26 M58 39 v26 M111 55 h26" stroke="${secondary}" stroke-width="2" opacity=".7"/>
  `;
}

function getVenueAbbreviation(venue) {
  const normalizedVenue = venue.replace(/\s+/g, " ").trim();
  return venueAbbreviations[normalizedVenue] || normalizedVenue;
}

function getPublicationLinkLabel(href) {
  return href.includes("doi.org/") ? "DOI" : "Paper";
}

function appendHighlightedName(container, text, shouldMarkCorrespondingAuthor) {
  let cursor = 0;
  const namePattern = /C\.\s*Chi/g;

  for (const match of text.matchAll(namePattern)) {
    if (match.index > cursor) {
      container.append(document.createTextNode(text.slice(cursor, match.index)));
    }

    const highlight = document.createElement("strong");
    highlight.className = "publication-entry__author-highlight";
    highlight.textContent = match[0].replace(/\s+/, " ");

    if (shouldMarkCorrespondingAuthor) {
      const marker = document.createElement("sup");
      marker.className = "publication-entry__corresponding-marker";
      marker.title = "Corresponding author";
      marker.setAttribute("aria-label", " corresponding author");
      marker.textContent = "*";
      highlight.append(marker);
    }

    container.append(highlight);
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    container.append(document.createTextNode(text.slice(cursor)));
  }
}

function makeAuthorLine(authorText, shouldMarkCorrespondingAuthor) {
  const authors = document.createElement("p");
  authors.className = "publication-entry__authors";
  authors.setAttribute("aria-label", "Authors");
  appendHighlightedName(authors, authorText, shouldMarkCorrespondingAuthor);
  return authors;
}

function enhancePublicationEntry(item, index) {
  if (item.classList.contains("publication-entry")) {
    return;
  }

  const yearEl = item.querySelector(".page__meta");
  const titleEl = item.querySelector(".archive__item-title");
  const excerptEl = item.querySelector(".archive__item-excerpt");
  const venueEl = excerptEl?.querySelector("em");
  const linkEl = excerptEl?.querySelector(".paper-link");
  const year = yearEl?.textContent.trim() || "";
  const venue = venueEl?.textContent.trim() || "";
  const linkHref = linkEl?.getAttribute("href") || "";

  item.classList.add("publication-entry");

  if (titleEl && (year || venue)) {
    const meta = document.createElement("div");
    meta.className = "publication-entry__meta";

    if (year) {
      const yearBadge = document.createElement("span");
      yearBadge.className = "publication-entry__year";
      yearBadge.textContent = year;
      meta.append(yearBadge);
    }

    if (venue) {
      const venueBadge = document.createElement("span");
      venueBadge.className = "publication-entry__venue";
      venueBadge.textContent = getVenueAbbreviation(venue);
      venueBadge.title = venue;
      meta.append(venueBadge);
    }

    titleEl.before(meta);
  }

  if (titleEl && publicationAuthors[index]) {
    titleEl.after(makeAuthorLine(publicationAuthors[index], correspondingAuthorPaperIndices.has(index)));
  }

  yearEl?.remove();

  if (!excerptEl) {
    return;
  }

  excerptEl.replaceChildren();

  if (venue || year) {
    const citation = document.createElement("span");
    citation.className = "publication-entry__citation";

    if (venue) {
      const venueName = document.createElement("em");
      venueName.textContent = venue;
      citation.append(venueName);
    }

    if (year) {
      citation.append(document.createTextNode(`${venue ? ", " : ""}${year}.`));
    } else if (venue) {
      citation.append(document.createTextNode("."));
    }

    excerptEl.append(citation);
  }

  if (linkHref) {
    const links = document.createElement("span");
    const link = document.createElement("a");

    links.className = "publication-entry__links";
    link.className = "paper-link publication-entry__link";
    link.href = linkHref;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = getPublicationLinkLabel(linkHref);

    links.append(link);
    excerptEl.append(links);
  }
}

function makePaperSchematic(item, index) {
  const publicationIndex = getPublicationIndex(item, index);

  enhancePublicationEntry(item, publicationIndex);

  if (item.querySelector(".paper-schematic")) {
    return;
  }

  const title = item.querySelector(".archive__item-title")?.textContent || "";
  const paperFigureSource = paperFigureSources[publicationIndex];

  if (paperFigureSource) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");

    figure.className = "paper-schematic paper-schematic--image";
    image.className = "paper-schematic__image";
    image.src = paperFigureSource;
    image.alt = `Figure from the paper: ${title}`;
    image.loading = "lazy";
    image.decoding = "async";

    figure.append(image);
    item.classList.add("archive__item--visual");
    item.prepend(figure);
    return;
  }

  const meta = getSchematicTheme(item);
  const features = detectPaperFeatures(title);
  const id = `paper-schematic-${publicationIndex}`;
  const overlay = schematicOverlay(features, id, meta.accent, meta.secondary);
  const motif = schematicMotif(meta.kind, id, meta.accent, meta.secondary);
  const figure = document.createElement("figure");

  figure.className = "paper-schematic";
  figure.setAttribute("aria-hidden", "true");
  figure.innerHTML = `
    <svg class="paper-schematic__svg" viewBox="0 0 180 108" focusable="false">
      <defs>
        <linearGradient id="${id}-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="1" stop-color="#f4f8fa"/>
        </linearGradient>
        <linearGradient id="${id}-hot" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fff1b8"/>
          <stop offset=".58" stop-color="${meta.accent}"/>
          <stop offset="1" stop-color="#8f2f2f"/>
        </linearGradient>
        <linearGradient id="${id}-cool" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#eaf5f9"/>
          <stop offset="1" stop-color="${meta.secondary}"/>
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="178" height="106" rx="10" fill="url(#${id}-bg)" stroke="#dbe4e8"/>
      <path d="M18 87 H162" stroke="#dbe4e8" stroke-width="1"/>
      ${motif}
      ${overlay}
      <text x="18" y="18" class="paper-schematic__label">${meta.label}</text>
    </svg>
  `;

  item.classList.add("archive__item--visual");
  item.prepend(figure);
}

publicationItems.forEach(makePaperSchematic);

function getFoldedEntryMeta(listItem) {
  const preferredTerms = new Set(["date", "year", "amount", "allocation", "system", "country"]);
  return Array.from(listItem.querySelectorAll(":scope > dl > div"))
    .map((item) => {
      const term = item.querySelector("dt")?.textContent.trim() || "";
      const value = item.querySelector("dd")?.textContent.trim() || "";
      return { term, value };
    })
    .filter(({ term, value }) => preferredTerms.has(term.toLowerCase()) && value)
    .slice(0, 3);
}

function foldProjectEntry(listItem) {
  if (listItem.querySelector(":scope > .folded-entry")) {
    return;
  }

  const title = listItem.querySelector(":scope > h4");

  if (!title) {
    return;
  }

  const details = document.createElement("details");
  const summary = document.createElement("summary");
  const summaryTitle = document.createElement("span");
  const summaryMeta = document.createElement("span");
  const content = document.createElement("div");
  const metaItems = getFoldedEntryMeta(listItem);

  details.className = "folded-entry";
  summary.className = "folded-entry__summary";
  summaryTitle.className = "folded-entry__title";
  summaryMeta.className = "folded-entry__meta";
  content.className = "folded-entry__content";

  while (title.firstChild) {
    summaryTitle.append(title.firstChild);
  }

  title.remove();
  summary.append(summaryTitle);

  metaItems.forEach(({ term, value }) => {
    const chip = document.createElement("span");
    chip.textContent = `${term}: ${value}`;
    summaryMeta.append(chip);
  });

  if (metaItems.length) {
    summary.append(summaryMeta);
  }

  while (listItem.firstChild) {
    content.append(listItem.firstChild);
  }

  details.append(summary, content);

  if (listItem.id && window.location.hash === `#${listItem.id}`) {
    details.open = true;
  }

  listItem.append(details);
}

document
  .querySelectorAll(".funding-card .funding-list > li, .hpc-card .funding-list > li, .teaching-card .funding-list > li, .honors-card .funding-list > li")
  .forEach(foldProjectEntry);
