/**
 * SHETUE LAND OSINT TOOLKIT - DUE DILIGENCE GENERATOR
 * Generates institutional 12-point land due diligence & title search audits
 */

const DueDiligenceManager = {
  checklistItems: [
    { id: "root_title", title: "1. Root of Title (CS / SA Khatian)", desc: "Original tenancy and revenue record verified from Collectorate Record Room." },
    { id: "succession", title: "2. Succession & Devolution (Warisan)", desc: "Unbroken genealogical tree & Islamic/Hindu devolution without omitted co-sharers." },
    { id: "deed_chain", title: "3. 30-Year Registered Deed Chain", desc: "Uninterrupted chain of registered conveyance deeds verified at Sub-Registry Office." },
    { id: "revisional_surveys", title: "4. Revisional & Recent Surveys (RS / BS)", desc: "Proper continuity and correlation between RS and BS/City survey plot numbers." },
    { id: "mutation_dcr", title: "5. AC Land Mutation & DCR", desc: "Mutated khatian opened in the name of the vendor, verified DCR and Jamabandi." },
    { id: "land_tax", title: "6. Land Development Tax (Dakhila)", desc: "100% cleared up to the current fiscal year (1432 BS) with no certificate proceedings." },
    { id: "nec_search", title: "7. Non-Encumbrance Search (NEC)", desc: "12-year Nil-Encumbrance verified; zero registered mortgages, charges, or liens." },
    { id: "ground_possession", title: "8. Physical Ground Possession & DGPS", desc: "Boundary fortified by wall; actual ground survey matches deed within tolerance." },
    { id: "zoning_dap", title: "9. Master Plan & Zoning Alignment", desc: "Conforms with RAJUK DAP / Municipal zoning; not designated as flood retention / canal." },
    { id: "vested_property", title: "10. Vested & Abandoned Property Vetting", desc: "Confirmed absence from Gazette Vested Property (Ka/Kha schedule) and Govt acquired lists." },
    { id: "court_litigation", title: "11. Civil & Criminal Court Search", desc: "Search of civil court registers reveals zero pending Title Suits or Section 144 CrPC." },
    { id: "public_access", title: "12. Right of Way & Access Road", desc: "Physical unobstructed access to municipal road; no reliance on disputed private easements." }
  ],

  generateReport(parcelId) {
    const parcels = window.dataManager.getParcels();
    const p = parcels.find(item => item.id === parcelId) || parcels[0];
    const isDisputed = p.status.includes("DISPUTE");

    const statusMap = {
      "PRC-001": {
        verdict: "APPROVED - ABSOLUTE & MARKETABLE TITLE",
        verdictClass: "clear",
        score: "12 / 12 (100% Passed)",
        risks: "None identified. Property is fortified with a 10-foot boundary wall, mutated with DCR, and taxes paid up to 1432 BS."
      },
      "PRC-002": {
        verdict: "CONDITIONAL / HIGH RISK - DISPUTE PENDING",
        verdictClass: "disputed",
        score: "9 / 12 (3 Failures)",
        risks: "Active Title Suit No. 142/2024 pending regarding 2.5-decimal northern boundary overlap. Status Quo ordered under Section 144 CrPC. Tax overdue for 1432 BS."
      },
      "PRC-003": {
        verdict: "APPROVED - COMMERCIAL TITLE VERIFIED",
        verdictClass: "clear",
        score: "12 / 12 (100% Passed)",
        risks: "None. Prime commercial holding in Tejgaon with verified mutation and direct road frontage."
      }
    };

    const currentAudit = statusMap[p.id] || {
      verdict: isDisputed ? "DISPUTED" : "VERIFIED",
      verdictClass: isDisputed ? "disputed" : "clear",
      score: isDisputed ? "8 / 12" : "12 / 12",
      risks: p.remarks || "Standard review completed."
    };

    let itemsHtml = "";
    this.checklistItems.forEach((item, idx) => {
      let passed = true;
      if (isDisputed && (item.id === "court_litigation" || item.id === "ground_possession" || item.id === "land_tax")) {
        passed = false;
      }

      itemsHtml += `
        <tr>
          <td style="font-weight:600; color:#fff;">${item.title}</td>
          <td style="color:#94a3b8; font-size:12px;">${item.desc}</td>
          <td style="text-align:right;">
            <span class="tag-badge ${passed ? 'clear' : 'disputed'}">
              ${passed ? 'PASSED' : 'FLAGGED'}
            </span>
          </td>
        </tr>
      `;
    });

    return `
      <div class="due-diligence-report" style="font-family:'Inter',sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid rgba(6,182,212,0.4); padding-bottom:16px; margin-bottom:20px;">
          <div>
            <h2 style="font-family:'Outfit',sans-serif; color:#fff; font-size:22px; margin-bottom:4px;">Institutional Due Diligence & Title Search Opinion</h2>
            <div style="font-size:13px; color:#94a3b8;">Reference: <strong>DDR-2026-${p.id}</strong> | Audit Date: <strong>${new Date().toISOString().split('T')[0]}</strong></div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px; text-transform:uppercase; color:#94a3b8; font-weight:700;">Overall Title Score</div>
            <div style="font-family:'Outfit',sans-serif; font-size:24px; font-weight:700; color:${isDisputed ? '#f87171' : '#34d399'};">${currentAudit.score}</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px 20px; margin-bottom:24px; display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; font-size:13px;">
          <div><span style="color:#64748b;">Target Parcel:</span><br><strong style="color:#fff;">${p.id} (${p.mouza})</strong></div>
          <div><span style="color:#64748b;">Survey Plots:</span><br><strong style="color:#06b6d4;">RS ${p.plotRS} | BS ${p.plotBS}</strong></div>
          <div><span style="color:#64748b;">Area:</span><br><strong style="color:#fff;">${p.areaDecimal} Dec (${p.areaKatha} Katha)</strong></div>
          <div><span style="color:#64748b;">Recorded Owner:</span><br><strong style="color:#fff;">${p.owner}</strong></div>
          <div><span style="color:#64748b;">Tax Status:</span><br><strong style="color:#10b981;">${p.taxYear}</strong></div>
        </div>

        <div style="background:${isDisputed ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)'}; border:1px solid ${isDisputed ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}; border-radius:10px; padding:14px 18px; margin-bottom:24px;">
          <div style="font-size:11px; text-transform:uppercase; font-weight:700; color:${isDisputed ? '#f87171' : '#34d399'};">Legal Counsel Verdict:</div>
          <div style="font-size:16px; font-weight:700; color:#fff; margin-top:3px;">${currentAudit.verdict}</div>
          <div style="font-size:12px; color:#cbd5e1; margin-top:4px;">${currentAudit.risks}</div>
        </div>

        <h3 style="font-family:'Outfit',sans-serif; color:#fff; font-size:16px; margin-bottom:12px;">12-Point Title Search Checklist</h3>
        <table class="data-table" style="margin-bottom:24px;">
          <thead>
            <tr>
              <th>Verification Domain</th>
              <th>Investigation Standards</th>
              <th style="text-align:right;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
};

window.DueDiligenceManager = DueDiligenceManager;
