// -----------------------------
// Main Generator Logic
// -----------------------------

let currentGradient = null;
let uploadedBg = null;
let bgStorageKey = null;
const WORKER_URL = "https://your-worker.example.workers.dev";

// Handle gradient background
document.getElementById("gradientBtn")?.addEventListener("click", () => {
  currentGradient = randomGradient();
  uploadedBg = null;
  bgStorageKey = null;
  applyBackground(document.getElementById("banner"), currentGradient);
});

// Handle uploaded image
document.getElementById("bgImage")?.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async e2 => {
    uploadedBg = e2.target.result;
    currentGradient = null;

    bgStorageKey = "bg-" + Date.now();
    localStorage.setItem(bgStorageKey, uploadedBg);
    applyBackground(document.getElementById("banner"), uploadedBg);

    try {
      const res = await fetch(`${WORKER_URL}/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadedBg })
      });
      const { key } = await res.json();
      document.getElementById("banner").dataset.remoteBg = `${WORKER_URL}/bg/${key}`;
    } catch (err) {
      console.error("Worker KV upload failed:", err);
    }
  };
  reader.readAsDataURL(file);
});

// Handle text color live preview
document.getElementById("textColor")?.addEventListener("input", e => {
  const color = e.target.value;
  const inner = document.querySelector("#banner .inner-box");
  if (inner) {
    inner.style.color = color;
  }
});

// Generate button
document.getElementById("generateBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Enter a username!");

  const banner = document.getElementById("banner");
  const textColor = document.getElementById("textColor").value;

  banner.innerHTML = `<h2>${username}</h2><p>Loading...</p>`;

  try {
    const data = await fetchHiscore(username);
    const parsed = parseHiscore(data);
    renderBanner(banner, username, parsed, textColor);

    if (banner.dataset.remoteBg) {
      applyBackground(banner, banner.dataset.remoteBg);
    } else if (uploadedBg) {
      applyBackground(banner, uploadedBg);
    } else if (currentGradient) {
      applyBackground(banner, currentGradient);
    }

    let iframeUrl = `your-template.html?user=${encodeURIComponent(username)}&color=${encodeURIComponent(textColor)}`;
    if (banner.dataset.remoteBg) {
      iframeUrl += `&bgUrl=${encodeURIComponent(banner.dataset.remoteBg)}`;
    } else if (bgStorageKey) {
      iframeUrl += `&bgKey=${encodeURIComponent(bgStorageKey)}`;
    } else if (currentGradient) {
      iframeUrl += `&gradient=${encodeURIComponent(currentGradient)}`;
    }

    document.getElementById("iframeCode").value =
      `<iframe src="${iframeUrl}" style="width:335px;height:249px;border:none;"></iframe>`;
  } catch (err) {
    banner.innerHTML = `<p style="color:red;">Failed to fetch hiscores</p>`;
  }
});

// Auto-select iframe embed code on click
document.getElementById("iframeCode")?.addEventListener("click", function () {
  this.select();
});
