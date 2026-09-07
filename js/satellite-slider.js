/**
 * SHETUE LAND OSINT TOOLKIT - SATELLITE COMPARISON SLIDER
 * Interactive Before / After Split Slider showing historical land development
 */

class SatelliteSlider {
  constructor() {
    this.wrapper = null;
    this.afterLayer = null;
    this.handle = null;
    this.isDragging = false;
  }

  init(wrapperId = "satellite-slider-wrapper") {
    this.wrapper = document.getElementById(wrapperId);
    if (!this.wrapper) return;

    this.afterLayer = this.wrapper.querySelector(".slider-after-layer");
    this.handle = this.wrapper.querySelector(".slider-handle");

    // Draw canvas scenes
    this.draw2010Scene("canvas-before-2010");
    this.draw2025Scene("canvas-after-2025");

    // Event Listeners for dragging
    const onMove = (clientX) => {
      if (!this.isDragging) return;
      const rect = this.wrapper.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      this.afterLayer.style.width = `${percentage}%`;
      this.handle.style.left = `${percentage}%`;
    };

    this.handle.addEventListener("mousedown", () => { this.isDragging = true; });
    window.addEventListener("mouseup", () => { this.isDragging = false; });
    window.addEventListener("mousemove", (e) => onMove(e.clientX));

    // Touch events for mobile
    this.handle.addEventListener("touchstart", () => { this.isDragging = true; });
    window.addEventListener("touchend", () => { this.isDragging = false; });
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) onMove(e.touches[0].clientX);
    });

    // Click on container moves slider
    this.wrapper.addEventListener("click", (e) => {
      const rect = this.wrapper.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
      this.afterLayer.style.width = `${percentage}%`;
      this.handle.style.left = `${percentage}%`;
    });
  }

  draw2010Scene(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width = 1200;
    const h = canvas.height = 700;

    // Background: Low-lying green & earthy paddy land
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#1c3821");
    bgGrad.addColorStop(0.5, "#254d2e");
    bgGrad.addColorStop(1, "#18331d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Natural meandering irrigation canal / ditch
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.bezierCurveTo(250, 200, 150, 450, 300, 700);
    ctx.lineWidth = 45;
    ctx.strokeStyle = "#1b4332";
    ctx.stroke();

    // Paddy field sub-divisions (natural ridges / ails)
    ctx.strokeStyle = "rgba(74, 124, 89, 0.4)";
    ctx.lineWidth = 3;
    for (let x = 80; x < w; x += 160) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 40, h);
      ctx.stroke();
    }
    for (let y = 60; y < h; y += 140) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y + 20);
      ctx.stroke();
    }

    // Dirt path
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(460, h);
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#4a3b2c";
    ctx.stroke();

    // Natural trees & vegetative clusters
    ctx.fillStyle = "#10381f";
    for (let i = 0; i < 40; i++) {
      const rx = (i * 123) % (w - 100) + 50;
      const ry = (i * 97) % (h - 100) + 50;
      ctx.beginPath();
      ctx.arc(rx, ry, 12 + (i % 8), 0, Math.PI * 2);
      ctx.fill();
    }

    // Overlay Grid & Satellite Metadata HUD
    this.drawHUDOverlay(ctx, w, h, "DEC 2010 | CNES/Airbus | 0.5m GSD", "AGRICULTURAL LAND (NAL) - ZERO ENCROACHMENTS");
  }

  draw2025Scene(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width = 1200;
    const h = canvas.height = 700;

    // Background: Modern developed urban land with sand filling
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#2b2f38");
    bgGrad.addColorStop(0.5, "#3d424e");
    bgGrad.addColorStop(1, "#262930");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Front Paved Asphalt Road
    ctx.fillStyle = "#181a20";
    ctx.fillRect(0, 520, w, 140);

    // Road White Markings
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 4;
    ctx.setLineDash([30, 25]);
    ctx.beginPath();
    ctx.moveTo(0, 590);
    ctx.lineTo(w, 590);
    ctx.stroke();
    ctx.setLineDash([]);

    // Parcel PRC-001 Earth-filled lot
    const px = 380, py = 160, pw = 420, ph = 340;
    ctx.fillStyle = "#a89f91"; // Sandy earth fill
    ctx.fillRect(px, py, pw, ph);

    // 10-foot RCC Brick Boundary Wall (Solid Perimeter Outline)
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 8;
    ctx.strokeRect(px, py, pw, ph);

    // RCC Boundary Corner Pillars
    ctx.fillStyle = "#facc15";
    [
      [px, py],
      [px + pw, py],
      [px + pw, py + ph],
      [px, py + ph]
    ].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Gate on front boundary
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(px + 140, py + ph - 8, 80, 16);

    // Parcel Label in Center
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(px + 90, py + 120, 240, 70);
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 90, py + 120, 240, 70);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 18px 'Outfit', sans-serif";
    ctx.fillText("PARCEL PRC-001 (BS 1204)", px + 105, py + 148);
    ctx.fillStyle = "#10b981";
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillText("14.50 Decimals | Enclosed", px + 105, py + 172);

    // Adjacent Plot PRC-002 North Disputed Overlap Marker
    ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
    ctx.fillRect(px, py - 60, pw, 50);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(px, py - 60, pw, 50);
    ctx.setLineDash([]);

    ctx.fillStyle = "#f87171";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillText("⚠️ NORTH OVERLAP (2.5 DEC) - DISPUTE IN TITLE SUIT 142/2024", px + 10, py - 30);

    // Overlay HUD
    this.drawHUDOverlay(ctx, w, h, "FEB 2025 | Maxar WorldView-3 | 0.3m GSD", "PERIMETER WALL COMPLETED - TITLE DISPUTE FLAGGED");
  }

  drawHUDOverlay(ctx, w, h, captureDetails, status) {
    // Top HUD Bar
    ctx.fillStyle = "rgba(11, 17, 30, 0.75)";
    ctx.fillRect(20, 20, 480, 42);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.strokeRect(20, 20, 480, 42);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 12px 'JetBrains Mono', monospace";
    ctx.fillText(`SENSOR: ${captureDetails}`, 35, 46);

    // Crosshairs
    ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
    ctx.lineWidth = 1;
    const cx = w / 2, cy = h / 2;
    ctx.beginPath();
    ctx.moveTo(cx - 25, cy); ctx.lineTo(cx + 25, cy);
    ctx.moveTo(cx, cy - 25); ctx.lineTo(cx, cy + 25);
    ctx.stroke();

    // Bottom Status HUD
    ctx.fillStyle = "rgba(11, 17, 30, 0.75)";
    ctx.fillRect(20, h - 50, 520, 32);
    ctx.fillStyle = "#facc15";
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.fillText(`OSINT STATUS: ${status}`, 35, h - 30);
  }
}

window.satelliteSlider = new SatelliteSlider();
