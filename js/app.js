/**
 * SHETUE LAND OSINT TOOLKIT - MAIN APPLICATION CONTROLLER
 * Routing, Event Dispatching, Dynamic Table Rendering, and UI State
 */

class AppController {
  constructor() {
    this.currentView = "dashboard";
  }

  init() {
    this.bindNavigation();
    this.renderKPIs();
    this.renderAllTables();
    this.bindSearch();
    this.bindCalculator();
    this.bindDueDiligence();

    // Populate initial due diligence audit
    const ddrContainer = document.getElementById("due-diligence-output");
    if (ddrContainer && window.DueDiligenceManager) {
      ddrContainer.innerHTML = window.DueDiligenceManager.generateReport("PRC-001");
    }

    // Initialize default GIS map and satellite slider when their views become visible
    window.VaultManager.initDropzone("vault-dropzone", "hash-output-display");

    // Live clock update
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const el = document.getElementById("header-live-time");
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " UTC+6";
    }
  }

  bindNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = link.getAttribute("data-view");
        this.switchView(targetView);

        // Update active class
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Close mobile sidebar if open
        const sidebar = document.getElementById("app-sidebar");
        if (sidebar) sidebar.classList.remove("open");
      });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle-btn");
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        const sidebar = document.getElementById("app-sidebar");
        if (sidebar) sidebar.classList.toggle("open");
      });
    }

    // Sub-tab switching inside Official Records view
    const recordTabs = document.querySelectorAll(".record-subtab-btn");
    recordTabs.forEach(btn => {
      btn.addEventListener("click", () => {
        recordTabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetSub = btn.getAttribute("data-subtab");
        document.querySelectorAll(".record-subtab-content").forEach(c => c.style.display = "none");
        const activeContent = document.getElementById(targetSub);
        if (activeContent) activeContent.style.display = "block";
      });
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    const views = document.querySelectorAll(".view-section");
    views.forEach(v => v.classList.remove("active"));

    const target = document.getElementById(`${viewName}-view`);
    if (target) {
      target.classList.add("active");
    }

    // Update Header Title
    const titleMap = {
      dashboard: "Portfolio Command Center",
      records: "Official Government Records & Title Chain",
      gis: "Interactive Geospatial GIS & Cadastral Mapping",
      satellite: "Temporal Remote Sensing & Satellite Evidence",
      survey: "Ground Field Survey & Geotagged Evidence",
      disputes: "Litigation & Dispute Management Docket",
      vault: "Cryptographic Evidence Vault & Chain of Custody",
      reports: "Due Diligence Generator & Multi-Unit Calculator",
      admin: "Repository Administration & Database Sync"
    };

    const headerTitle = document.getElementById("current-view-title");
    if (headerTitle) headerTitle.textContent = titleMap[viewName] || "Land OSINT System";

    // View-specific initializations
    if (viewName === "gis") {
      setTimeout(() => {
        window.gisManager.initMap("gis-map-canvas");
      }, 100);
    } else if (viewName === "satellite") {
      setTimeout(() => {
        window.satelliteSlider.init("satellite-slider-wrapper");
      }, 100);
    }
  }

  renderKPIs() {
    const parcels = window.dataManager.getParcels();
    const totalParcels = parcels.length;
    const totalDecimals = parcels.reduce((sum, p) => sum + (p.areaDecimal || 0), 0);
    const totalKatha = parcels.reduce((sum, p) => sum + (p.areaKatha || 0), 0);
    const totalAcres = parcels.reduce((sum, p) => sum + (p.areaAcre || 0), 0);

    const clearCount = parcels.filter(p => p.status.includes("CLEAR")).length;
    const disputedCount = parcels.filter(p => p.status.includes("DISPUTE")).length;
    const clearPct = totalParcels ? ((clearCount / totalParcels) * 100).toFixed(1) : 0;

    const elTotalParcels = document.getElementById("kpi-total-parcels");
    const elTotalDecimals = document.getElementById("kpi-total-decimals");
    const elTotalAcres = document.getElementById("kpi-total-acres");
    const elClearPct = document.getElementById("kpi-clear-pct");
    const elDisputedCount = document.getElementById("kpi-disputed-count");

    if (elTotalParcels) elTotalParcels.textContent = totalParcels;
    if (elTotalDecimals) elTotalDecimals.textContent = `${totalDecimals.toFixed(2)} Dec (${totalKatha.toFixed(1)} K)`;
    if (elTotalAcres) elTotalAcres.textContent = `${totalAcres.toFixed(4)} Acres`;
    if (elClearPct) elClearPct.textContent = `${clearPct}% Clear`;
    if (elDisputedCount) elDisputedCount.textContent = `${disputedCount} Flagged`;
  }

  renderAllTables() {
    this.renderKPIs();
    this.renderMasterRegisterTable();
    this.renderKhatianTable();
    this.renderDeedTable();
    this.renderMutationTable();
    this.renderTaxTable();
    this.renderDisputesTable();
    this.renderEvidenceTable();
    this.renderChronologyTable();
    this.renderWaypointsTable();
    this.renderPhotosTable();
    this.renderMeasurementsTable();
  }

  renderMasterRegisterTable(filteredParcels = null) {
    const tbody = document.querySelector("#master-register-table tbody");
    if (!tbody) return;

    const parcels = filteredParcels || window.dataManager.getParcels();
    tbody.innerHTML = "";

    parcels.forEach(p => {
      const isDisputed = p.status.includes("DISPUTE");
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${p.id}</strong></td>
        <td>${p.mouza} (JL ${p.jlNo})</td>
        <td><span style="font-family:'JetBrains Mono'; font-size:12px;">RS: ${p.plotRS} / BS: ${p.plotBS}</span></td>
        <td><strong>${p.areaDecimal.toFixed(2)} Dec</strong><br><span style="color:#94a3b8; font-size:11px;">${p.areaKatha} Katha</span></td>
        <td>${p.landClass}</td>
        <td>${p.owner}</td>
        <td><span style="color:#38bdf8; font-size:12px;">${p.mutationCase}</span></td>
        <td><span style="color:#34d399; font-size:12px;">${p.taxYear}</span></td>
        <td><span class="tag-badge ${isDisputed ? 'disputed' : 'clear'}">${p.status}</span></td>
        <td style="text-align:right;">
          <button class="btn btn-secondary btn-sm" onclick="window.app.viewOnMap('${p.id}')">Map</button>
          <button class="btn btn-primary btn-sm" onclick="window.app.generateDDR('${p.id}')">Audit</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderKhatianTable() {
    const tbody = document.querySelector("#khatian-table tbody");
    if (!tbody) return;
    const khatians = window.dataManager.getKhatians();
    tbody.innerHTML = "";
    khatians.forEach(k => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${k.id}</strong></td>
        <td><span class="tag-badge verified">${k.survey}</span></td>
        <td><b>${k.khatianNo}</b></td>
        <td>${k.mouza}</td>
        <td>${k.plots}</td>
        <td>${k.owners}</td>
        <td>${k.area}</td>
        <td><span class="tag-badge ${k.verified === 'VERIFIED' ? 'clear' : 'pending'}">${k.verified}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderDeedTable() {
    const tbody = document.querySelector("#deed-table tbody");
    if (!tbody) return;
    const deeds = window.dataManager.getDeeds();
    tbody.innerHTML = "";
    deeds.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${d.id}</strong></td>
        <td><b>Deed No. ${d.deedNo}</b> (${d.year})</td>
        <td>${d.sro}</td>
        <td><span class="tag-badge verified">${d.type}</span></td>
        <td>${d.vendor}</td>
        <td>${d.purchaser}</td>
        <td><strong>${d.area.toFixed(2)} Dec</strong></td>
        <td>BDT ${d.consideration.toLocaleString()}</td>
        <td><span class="tag-badge clear">${d.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderMutationTable() {
    const tbody = document.querySelector("#mutation-table tbody");
    if (!tbody) return;
    const mutations = window.dataManager.getMutations();
    tbody.innerHTML = "";
    mutations.forEach(m => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${m.caseNo}</strong></td>
        <td>${m.circle}</td>
        <td>${m.applicant}</td>
        <td>Plot ${m.plotBS}</td>
        <td>${m.appliedArea} Dec / ${m.approvedArea} Dec</td>
        <td>Khatian ${m.khatianNo} (${m.dcrNo})</td>
        <td>${m.orderDate}</td>
        <td><span class="tag-badge ${m.status.includes('APPROVED') ? 'clear' : 'pending'}">${m.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderTaxTable() {
    const tbody = document.querySelector("#tax-table tbody");
    if (!tbody) return;
    const taxes = window.dataManager.getTaxes();
    tbody.innerHTML = "";
    taxes.forEach(t => {
      const isCleared = t.status === "CLEARED";
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${t.receiptId}</strong></td>
        <td>Holding ${t.holdingNo} (${t.mouza})</td>
        <td>Plot ${t.plot}</td>
        <td>${t.payer}</td>
        <td><b>${t.bengaliYear}</b></td>
        <td>${t.receiptNo}</td>
        <td>BDT ${t.amount.toLocaleString()}</td>
        <td><span class="tag-badge ${isCleared ? 'clear' : 'disputed'}">${t.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderDisputesTable() {
    const tbody = document.querySelector("#disputes-table tbody");
    if (!tbody) return;
    const disputes = window.dataManager.getDisputes();
    tbody.innerHTML = "";
    disputes.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#f87171;">${d.id}</strong></td>
        <td><span class="tag-badge disputed">${d.parcelId}</span></td>
        <td><b>${d.caseNo}</b><br><span style="font-size:11px; color:#94a3b8;">${d.court}</span></td>
        <td>${d.caseType}</td>
        <td>${d.plaintiff} vs ${d.defendant}</td>
        <td><span class="tag-badge pending">${d.injunction}</span></td>
        <td>${d.stage}</td>
        <td><strong style="color:#fbbf24;">${d.nextDate}</strong></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderEvidenceTable() {
    const tbody = document.querySelector("#evidence-table tbody");
    if (!tbody) return;
    const evidence = window.dataManager.getEvidence();
    tbody.innerHTML = "";
    evidence.forEach(e => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${e.id}</strong></td>
        <td>${e.desc}</td>
        <td>${e.source}</td>
        <td>${e.custodian}</td>
        <td><span style="font-family:'JetBrains Mono'; font-size:11px; color:#34d399;">${e.sha256.substring(0, 20)}...</span></td>
        <td><span class="tag-badge clear">${e.state}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderChronologyTable() {
    const tbody = document.querySelector("#chronology-table tbody");
    if (!tbody) return;
    const chronology = window.dataManager.getChronology();
    tbody.innerHTML = "";
    chronology.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8; font-size:14px;">${c.year}</strong></td>
        <td><span class="tag-badge verified">${c.type}</span></td>
        <td>${c.event}</td>
        <td><strong style="color:#34d399; font-size:12px;">${c.weight}</strong></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderWaypointsTable() {
    const tbody = document.querySelector("#waypoints-table tbody");
    if (!tbody) return;
    const waypoints = window.dataManager.getWaypoints();
    tbody.innerHTML = "";
    waypoints.forEach(w => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${w.name}</strong></td>
        <td>${w.lat.toFixed(6)}</td>
        <td>${w.lng.toFixed(6)}</td>
        <td>${w.ele} m</td>
        <td>${w.desc}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderPhotosTable() {
    const tbody = document.querySelector("#photos-table tbody");
    if (!tbody) return;
    tbody.innerHTML = `
      <tr>
        <td><strong>PH-2026-001</strong></td>
        <td>PRC-001</td>
        <td>South-West RCC Boundary Pillar (CP-01)</td>
        <td>23.784400, 90.426500</td>
        <td>Facing North-East</td>
        <td><span class="tag-badge clear">GEOTAG_VERIFIED</span></td>
      </tr>
      <tr>
        <td><strong>PH-2026-002</strong></td>
        <td>PRC-001</td>
        <td>Main entrance gate and 10ft brick boundary wall</td>
        <td>23.784400, 90.426900</td>
        <td>Facing North</td>
        <td><span class="tag-badge clear">GEOTAG_VERIFIED</span></td>
      </tr>
      <tr>
        <td><strong>PH-2026-003</strong></td>
        <td>PRC-002</td>
        <td>Illegal corrugated tin fence erected on northern margin</td>
        <td>23.784910, 90.427100</td>
        <td>Facing North-West</td>
        <td><span class="tag-badge disputed">DISPUTE_EVIDENCE</span></td>
      </tr>
    `;
  }

  renderMeasurementsTable() {
    const tbody = document.querySelector("#measurements-table tbody");
    if (!tbody) return;
    const measurements = window.dataManager.getMeasurements();
    tbody.innerHTML = "";
    measurements.forEach(m => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:#38bdf8;">${m.id}</strong></td>
        <td>${m.stationFrom} &rarr; ${m.stationTo}</td>
        <td><strong>${m.distanceFt.toFixed(2)} ft</strong></td>
        <td>${m.links.toFixed(2)} links</td>
        <td>${m.bearing}&deg;</td>
        <td>${m.feature}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  bindSearch() {
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const allParcels = window.dataManager.getParcels();
        if (!query) {
          this.renderMasterRegisterTable(allParcels);
          return;
        }

        const filtered = allParcels.filter(p =>
          p.id.toLowerCase().includes(query) ||
          p.mouza.toLowerCase().includes(query) ||
          p.owner.toLowerCase().includes(query) ||
          (p.plotBS && p.plotBS.toLowerCase().includes(query)) ||
          p.status.toLowerCase().includes(query)
        );
        this.renderMasterRegisterTable(filtered);
      });
    }
  }

  bindCalculator() {
    const convertBtn = document.getElementById("btn-calc-convert");
    if (convertBtn) {
      convertBtn.addEventListener("click", () => {
        const inputVal = document.getElementById("calc-input-val").value;
        const inputUnit = document.getElementById("calc-input-unit").value;
        const res = window.LandCalculator.convert(inputVal, inputUnit);

        if (!res) {
          this.showToast("Please enter a valid positive number.", "danger");
          return;
        }

        document.getElementById("res-decimals").textContent = res.decimals.toFixed(4);
        document.getElementById("res-katha").textContent = res.katha.toFixed(4);
        document.getElementById("res-bigha").textContent = res.bigha.toFixed(4);
        document.getElementById("res-acres").textContent = res.acres.toFixed(4);
        document.getElementById("res-sqft").textContent = res.squareFeet.toLocaleString(undefined, { maximumFractionDigits: 2 });
        document.getElementById("res-sqm").textContent = res.squareMeters.toLocaleString(undefined, { maximumFractionDigits: 2 });
      });
    }

    const annaBtn = document.getElementById("btn-calc-anna");
    if (annaBtn) {
      annaBtn.addEventListener("click", () => {
        const totDec = document.getElementById("anna-tot-dec").value;
        const anna = document.getElementById("anna-val").value;
        const ganda = document.getElementById("ganda-val").value;
        const kara = document.getElementById("kara-val").value;
        const kranti = document.getElementById("kranti-val").value;
        const til = document.getElementById("til-val").value;

        const res = window.LandCalculator.calculate16Anna(totDec, anna, ganda, kara, kranti, til);
        if (!res) {
          this.showToast("Please specify total plot decimals.", "danger");
          return;
        }

        document.getElementById("anna-res-pct").textContent = `${res.sharePercentage.toFixed(4)}%`;
        document.getElementById("anna-res-dec").textContent = `${res.allocatedDecimals.toFixed(4)} Dec`;
        document.getElementById("anna-res-katha").textContent = `${res.allocatedKatha.toFixed(4)} Katha`;
        document.getElementById("anna-res-sqft").textContent = `${res.allocatedSqFt.toFixed(2)} Sq. Ft`;
      });
    }
  }

  bindDueDiligence() {
    const genBtn = document.getElementById("btn-generate-ddr");
    if (genBtn) {
      genBtn.addEventListener("click", () => {
        const selectedParcelId = document.getElementById("ddr-parcel-select").value;
        this.generateDDR(selectedParcelId);
      });
    }
  }

  generateDDR(parcelId) {
    this.switchView("reports");
    const container = document.getElementById("due-diligence-output");
    if (container) {
      container.innerHTML = window.DueDiligenceManager.generateReport(parcelId);
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }

  viewOnMap(parcelId) {
    this.switchView("gis");
    setTimeout(() => {
      window.gisManager.focusParcel(parcelId);
    }, 250);
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Instantiate global app controller
window.app = new AppController();
document.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
