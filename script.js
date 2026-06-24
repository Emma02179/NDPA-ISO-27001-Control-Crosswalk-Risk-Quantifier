// ---------------------------------------------------------------
// NDPA 2023 - ISO/IEC 27001 Crosswalk + FAIR Risk Quantifier Controller
// ---------------------------------------------------------------

const STORAGE_KEY = "ndpa-iso-risk-register-v1";
const TRIALS = 10000;

let register = loadRegister();
let lastSimResult = null;

// ---------------------------------------------------------------
// Tabs Navigation
// ---------------------------------------------------------------
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("tab--active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("panel--active"));
    tab.classList.add("tab--active");
    document.getElementById(tab.dataset.panel).classList.add("panel--active");
  });
});

// ---------------------------------------------------------------
// Crosswalk Rendering & UI Management
// ---------------------------------------------------------------
function renderCrosswalk(filterText = "") {
  const tbody = document.getElementById("xwalkTbody");
  if (!tbody) return;

  const query = filterText.toLowerCase().trim();

  const filtered = CROSSWALK.filter(item => {
    if (!query) return true;
    return item.ndpaSection.toLowerCase().includes(query) ||
           item.ndpaTitle.toLowerCase().includes(query) ||
           item.ndpaSummary.toLowerCase().includes(query) ||
           item.isoControls.some(c => c.code.toLowerCase().includes(query) || c.title.toLowerCase().includes(query));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<div class="p-4 text-center text-muted">No crosswalk mappings found matching "${escapeHtml(filterText)}"</div>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => `
    <div class="x-table__tr" id="row-${item.id}">
      <div class="x-table__td"><strong class="badge badge--mono">${escapeHtml(item.ndpaSection)}</strong></div>
      <div class="x-table__td">
        <div class="x-table__title">${escapeHtml(item.ndpaTitle)}</div>
        <div class="x-table__summary">${escapeHtml(item.ndpaSummary)}</div>
        <div class="x-table__pipeline">
          <button class="btn btn--link-action" onclick="pipelineToQuantifier('${item.id}')">Quantify This Gap →</button>
        </div>
      </div>
      <div class="x-table__td">
        <div class="iso-box">
          ${item.isoControls.map(c => `
            <div class="iso-ctrl">
              <span class="badge badge--primary">${escapeHtml(c.code)}</span>
              <strong class="iso-ctrl__title">${escapeHtml(c.title)}</strong>
              <p class="iso-ctrl__desc">${escapeHtml(c.summary)}</p>
            </div>
          `).join("")}
          <div class="rationale">
            <span class="rationale__label">Mapping Rationale:</span> ${escapeHtml(item.rationale)}
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function populateCrosswalkDropdown() {
  const select = document.getElementById("formXwalkRef");
  if (!select) return;
  CROSSWALK.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = `${item.ndpaSection} - ${item.ndpaTitle}`;
    select.appendChild(opt);
  });
}

document.getElementById("xwalkSearch").addEventListener("input", e => {
  renderCrosswalk(e.target.value);
});

document.getElementById("formXwalkRef").addEventListener("change", e => {
  const id = e.target.value;
  if (!id) return;
  const item = CROSSWALK.find(c => c.id === id);
  if (item) {
    document.getElementById("riskTitleInput").value = `Compliance Gap: ${item.ndpaTitle} (${item.ndpaSection})`;
  }
});

window.pipelineToQuantifier = function(id) {
  const tab = document.querySelector('[data-panel="panel-quantifier"]');
  if (tab) tab.click();
  const select = document.getElementById("formXwalkRef");
  if (select) {
    select.value = id;
    select.dispatchEvent(new Event("change"));
  }
};

// ---------------------------------------------------------------
// FAIR Quantitative Monte Carlo Engine
// ---------------------------------------------------------------
document.getElementById("quantForm").addEventListener("submit", () => {
  const minTef = parseFloat(document.getElementById("tefMin").value);
  const modeTef = parseFloat(document.getElementById("tefMode").value);
  const maxTef = parseFloat(document.getElementById("tefMax").value);

  const minLm = parseFloat(document.getElementById("lmMin").value);
  const modeLm = parseFloat(document.getElementById("lmMode").value);
  const maxLm = parseFloat(document.getElementById("lmMax").value);

  if (modeTef < minTef || modeTef > maxTef || modeLm < minLm || modeLm > maxLm) {
    alert("Validation Error: Most Likely mode metrics must lie inside Min and Max bounds.");
    return;
  }

  const annualLosses = [];
  let aggregateLossSum = 0;

  for (let i = 0; i < TRIALS; i++) {
    const sampledTef = sampleTriangular(minTef, modeTef, maxTef);
    const eventCount = samplePoisson(sampledTef);

    let trialYearLoss = 0;
    for (let e = 0; e < eventCount; e++) {
      trialYearLoss += sampleTriangular(minLm, modeLm, maxLm);
    }

    annualLosses.push(trialYearLoss);
    aggregateLossSum += trialYearLoss;
  }

  annualLosses.sort((a, b) => a - b);

  const aleMean = aggregateLossSum / TRIALS;
  const p10 = annualLosses[Math.floor(TRIALS * 0.10)];
  const p50 = annualLosses[Math.floor(TRIALS * 0.50)];
  const p90 = annualLosses[Math.floor(TRIALS * 0.90)];

  lastSimResult = {
    title: document.getElementById("riskTitleInput").value,
    xwalkRef: document.getElementById("formXwalkRef").value,
    ale: aleMean,
    p10, p50, p90,
    raw: annualLosses
  };

  document.getElementById("aleValue").textContent = formatNaira(aleMean);
  document.getElementById("percentileRow").innerHTML = `
    <div class="percentile">
      <span class="percentile__label">P10 (Optimistic)</span>
      <span class="percentile__value">${formatNaira(p10)}</span>
    </div>
    <div class="percentile">
      <span class="percentile__label">P50 (Median)</span>
      <span class="percentile__value">${formatNaira(p50)}</span>
    </div>
    <div class="percentile">
      <span class="percentile__label">P90 (Critical)</span>
      <span class="percentile__value">${formatNaira(p90)}</span>
    </div>
  `;

  drawHistogram(annualLosses);
  document.getElementById("quantResults").hidden = false;
});

function sampleTriangular(min, mode, max) {
  const u = Math.random();
  const fc = (mode - min) / (max - min);
  if (u < fc) {
    return min + Math.sqrt(u * (max - min) * (mode - min));
  } else {
    return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
  }
}

function samplePoisson(lambda) {
  if (lambda === 0) return 0;
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

function drawHistogram(losses) {
  const svg = document.getElementById("histogramSvg");
  const minLoss = losses[0];
  const maxLoss = losses[losses.length - 1];

  document.getElementById("histMinLabel").textContent = formatNaira(minLoss);
  document.getElementById("histMaxLabel").textContent = formatNaira(maxLoss);

  const numBins = 30;
  const binWidth = (maxLoss - minLoss) / numBins;
  const bins = new Array(numBins).fill(0);

  losses.forEach(l => {
    let idx = Math.floor((l - minLoss) / binWidth);
    if (idx >= numBins) idx = numBins - 1;
    if (idx < 0) idx = 0;
    bins[idx]++;
  });

  const maxBinCount = Math.max(...bins);
  const svgWidth = 600;
  const svgHeight = 200;
  const colWidth = svgWidth / numBins;

  let pathsHtml = "";
  bins.forEach((count, i) => {
    const h = maxBinCount > 0 ? (count / maxBinCount) * svgHeight : 0;
    const x = i * colWidth;
    const y = svgHeight - h;
    pathsHtml += `<rect x="${x}" y="${y}" width="${colWidth - 1}" height="${h}" fill="#EEF0FE" stroke="#4F46E5" stroke-width="0.5"/>`;
  });

  svg.innerHTML = pathsHtml;
}

// ---------------------------------------------------------------
// Risk Register Management
// ---------------------------------------------------------------
document.getElementById("addToRegisterBtn").addEventListener("click", () => {
  if (!lastSimResult) return;
  register.push({
    id: "reg-" + Date.now(),
    title: lastSimResult.title,
    xwalkRef: lastSimResult.xwalkRef,
    ale: lastSimResult.ale,
    p10: lastSimResult.p10,
    p50: lastSimResult.p50,
    p90: lastSimResult.p90,
    timestamp: new Date().toISOString()
  });
  saveRegister();
  renderRegister();
  alert("Added to Corporate Risk Register.");
  document.querySelector('[data-panel="panel-register"]').click();
});

function renderRegister() {
  const list = document.getElementById("registerList");
  const empty = document.getElementById("registerEmpty");
  const summary = document.getElementById("registerSummary");

  if (register.length === 0) {
    list.innerHTML = "";
    summary.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  let totalAle = 0, maxP90 = 0;
  register.forEach(r => {
    totalAle += r.ale;
    if (r.p90 > maxP90) maxP90 = r.p90;
  });

  summary.innerHTML = `
    <div class="summary-stat">
      <span class="summary-stat__label">Total Portfolio ALE (Mean exposure)</span>
      <span class="summary-stat__value">${formatNaira(totalAle)}</span>
    </div>
    <div class="summary-stat">
      <span class="summary-stat__label">Peak Critical Impact Tail (Max P90)</span>
      <span class="summary-stat__value text-danger">${formatNaira(maxP90)}</span>
    </div>
  `;

  list.innerHTML = register.map(r => {
    const matchedRef = CROSSWALK.find(c => c.id === r.xwalkRef);
    const contextLabel = matchedRef ? `Linked Framework Gap: ${matchedRef.ndpaSection}` : "Standalone Exposure Profile";

    return `
      <div class="reg-card">
        <div class="reg-card__header">
          <div>
            <h3 class="reg-card__title">${escapeHtml(r.title)}</h3>
            <span class="reg-card__context">${escapeHtml(contextLabel)}</span>
          </div>
          <button class="btn btn--danger-link" onclick="deleteRisk('${r.id}')">Remove</button>
        </div>
        <div class="reg-card__metrics">
          <div><strong>ALE (Mean):</strong> ${formatNaira(r.ale)}</div>
          <div><strong>P10:</strong> ${formatNaira(r.p10)}</div>
          <div><strong>P50:</strong> ${formatNaira(r.p50)}</div>
          <div><strong>P90:</strong> ${formatNaira(r.p90)}</div>
        </div>
      </div>
    `;
  }).join("");
}

window.deleteRisk = function(id) {
  if (!confirm("Remove this entry from the corporate risk profile?")) return;
  register = register.filter(r => r.id !== id);
  saveRegister();
  renderRegister();
};

function saveRegister() { localStorage.setItem(STORAGE_KEY, JSON.stringify(register)); }
function loadRegister() { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }

// ---------------------------------------------------------------
// JSON Backup Import/Export Logic
// ---------------------------------------------------------------
document.getElementById("exportRegisterBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(register, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ndpa-iso-register-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importRegisterBtn").addEventListener("click", () => {
  document.getElementById("importRegisterFile").click();
});

document.getElementById("importRegisterFile").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported)) throw new Error("Format is invalid.");
      register = imported;
      saveRegister();
      renderRegister();
      alert(`Successfully imported ${imported.length} risk scenarios.`);
    } catch (err) {
      alert("Import failed. Make sure this is a valid JSON file exported from this application.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

// ---------------------------------------------------------------
// Initialization Utilities
// ---------------------------------------------------------------
function formatNaira(n) { return "₦" + Math.round(n).toLocaleString("en-NG"); }
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

renderCrosswalk();
populateCrosswalkDropdown();
renderRegister();