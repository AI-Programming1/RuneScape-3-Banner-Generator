// -----------------------------
// Banner Rendering Functions
// -----------------------------

const SKILL_NAMES = [
  "Attack", "Defence", "Strength", "Constitution", "Ranged", "Prayer",
  "Magic", "Cooking", "Woodcutting", "Fletching", "Fishing", "Firemaking",
  "Crafting", "Smithing", "Mining", "Herblore", "Agility", "Thieving",
  "Slayer", "Farming", "Runecrafting", "Hunter", "Construction", "Summoning",
  "Dungeoneering", "Divination", "Invention", "Archaeology", "Necromancy"
];

// Auto-fit text into container
function fitText(element, maxSize, minSize) {
  let size = maxSize;
  const parent = element.parentNode;
  const boxWidth = parent.clientWidth - 20;
  const boxHeight = parent.clientHeight - 20;

  element.style.fontSize = size + "px";
  while (
    (element.scrollWidth > boxWidth || element.scrollHeight > boxHeight) &&
    size > minSize
  ) {
    size -= 1;
    element.style.fontSize = size + "px";
  }
}

function parseHiscore(data) {
  const lines = data.split("\n");
  const skills = [];
  for (let i = 0; i < SKILL_NAMES.length && i < 29; i++) {
    const parts = lines[i + 1]?.split(","); // +1 skips overall
    if (!parts || parts.length < 3) continue;
    skills.push({
      name: SKILL_NAMES[i],
      rank: parts[0],
      level: parts[1],
      xp: parts[2]
    });
  }
  return skills;
}

function renderBanner(banner, username, skills, color = "#ffffff") {
  banner.innerHTML = "";

  const inner = document.createElement("div");
  inner.className = "inner-box";
  inner.style.color = color;

  const title = document.createElement("h2");
  title.textContent = username;
  inner.appendChild(title);

  const list = document.createElement("ul");
  skills.forEach(skill => {
    if (parseInt(skill.level, 10) === -1) return;
    const li = document.createElement("li");
    li.textContent = `${skill.name}: Lv ${skill.level}`;
    list.appendChild(li);
  });
  inner.appendChild(list);

  banner.appendChild(inner);

  // Scale username & list independently
  fitText(title, 26, 14);
  fitText(list, 16, 10);
}

// Background utilities
function randomGradient() {
  const colors = [
    "#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb",
    "#84fab0", "#8fd3f4", "#fccb90", "#e0c3fc"
  ];
  const c1 = colors[Math.floor(Math.random() * colors.length)];
  const c2 = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

function applyBackground(el, bg) {
  if (bg.startsWith("data:") || bg.startsWith("http")) {
    el.style.backgroundImage = `url(${bg})`;
    el.style.backgroundSize = "cover";
  } else {
    el.style.background = bg;
  }
}

async function fetchHiscore(username) {
  const proxy = "https://api.allorigins.win/raw?url=";
  const url = `https://secure.runescape.com/m=hiscore/index_lite.ws?player=${encodeURIComponent(username)}`;
  const res = await fetch(proxy + encodeURIComponent(url));
  if (!res.ok) throw new Error("Failed to fetch");
  return res.text();
}
