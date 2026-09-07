/**
 * SHETUE LAND OSINT TOOLKIT - CRYPTOGRAPHIC EVIDENCE VAULT
 * In-browser Web Crypto SHA-256 calculation, chain-of-custody, and timeline
 */

const VaultManager = {
  async calculateSHA256(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  },

  initDropzone(dropzoneId, outputId) {
    const dropzone = document.getElementById(dropzoneId);
    const output = document.getElementById(outputId);
    if (!dropzone || !output) return;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    dropzone.addEventListener("click", () => fileInput.click());

    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("drag-over");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("drag-over");
    });

    dropzone.addEventListener("drop", async (e) => {
      e.preventDefault();
      dropzone.classList.remove("drag-over");
      if (e.dataTransfer.files.length > 0) {
        await this.handleFile(e.dataTransfer.files[0], output);
      }
    });

    fileInput.addEventListener("change", async () => {
      if (fileInput.files.length > 0) {
        await this.handleFile(fileInput.files[0], output);
      }
    });
  },

  async handleFile(file, outputElement) {
    outputElement.innerHTML = `
      <div style="color:#06b6d4; display:flex; align-items:center; gap:8px;">
        <span class="pulse-dot"></span> Calculating SHA-256 checksum for: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)...
      </div>
    `;

    try {
      const sha256 = await this.calculateSHA256(file);
      const evidenceList = window.dataManager.getEvidence();
      const match = evidenceList.find(e => e.sha256.toLowerCase() === sha256.toLowerCase());

      const matchHtml = match
        ? `<div style="margin-top:8px; color:#34d399; font-weight:600;">
             ✓ MATCH VERIFIED: Registered as <strong>${match.desc}</strong> (${match.id}). Untampered original.
           </div>`
        : `<div style="margin-top:8px; color:#94a3b8;">
             ℹ️ New unregistered file checksum. You may add this signature to the Evidence Vault.
           </div>`;

      outputElement.innerHTML = `
        <div>
          <div style="color:#94a3b8; font-size:12px; margin-bottom:4px;">File: <strong>${file.name}</strong> | Size: ${(file.size / 1024).toFixed(2)} KB</div>
          <div style="background:#0b111e; padding:10px 14px; border-radius:6px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#38bdf8; word-break:break-all; border:1px solid rgba(255,255,255,0.08);">
            ${sha256}
          </div>
          ${matchHtml}
        </div>
      `;
    } catch (err) {
      outputElement.innerHTML = `<div style="color:#ef4444;">Error calculating hash: ${err.message}</div>`;
    }
  }
};

window.VaultManager = VaultManager;
