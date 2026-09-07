/**
 * SHETUE LAND OSINT TOOLKIT - GIS & SPATIAL ENGINE
 * Powered by Leaflet.js with Satellite, Dark Matter, and OpenStreetMap layers
 */

class GISManager {
  constructor() {
    this.map = null;
    this.parcelLayers = {};
    this.waypointLayers = [];
    this.baseLayers = {};
    this.initialized = false;
  }

  initMap(elementId = "gis-map-canvas") {
    if (this.initialized || !document.getElementById(elementId)) return;

    // Center on Dhaka, Bangladesh (Badda Coordinates)
    this.map = L.map(elementId, {
      center: [23.784600, 90.426800],
      zoom: 17,
      maxZoom: 21,
      zoomControl: true
    });

    // Base Maps
    const esriSatellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 20
      }
    );

    const cartoDark = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 20
      }
    );

    const osmStandard = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }
    );

    // Default to Satellite Imagery for OSINT
    esriSatellite.addTo(this.map);

    this.baseLayers = {
      "High-Res Satellite (Esri)": esriSatellite,
      "Tactical Dark Matter": cartoDark,
      "OpenStreetMap Roads": osmStandard
    };

    L.control.layers(this.baseLayers, null, { position: 'topright' }).addTo(this.map);

    // Load initial spatial data
    this.renderParcels();
    this.renderWaypoints();

    this.initialized = true;

    // Invalidate map size after tab transitions
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }

  renderParcels() {
    const parcels = window.dataManager.getParcels();

    // Clear existing parcel layers
    Object.values(this.parcelLayers).forEach(layer => this.map.removeLayer(layer));
    this.parcelLayers = {};

    parcels.forEach(p => {
      if (!p.coordinates || p.coordinates.length < 3) return;

      const isDisputed = p.status.includes("DISPUTE");
      const polyColor = isDisputed ? "#ef4444" : "#10b981";
      const fillColor = isDisputed ? "#ef4444" : "#10b981";

      const polygon = L.polygon(p.coordinates, {
        color: polyColor,
        weight: 3,
        opacity: 0.9,
        fillColor: fillColor,
        fillOpacity: 0.25,
        dashArray: isDisputed ? "6, 6" : null
      }).addTo(this.map);

      // Interactive Popup
      const popupHtml = `
        <div style="font-family: 'Inter', sans-serif; min-width: 240px;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.15); padding-bottom:6px; margin-bottom:8px;">
            <strong style="color:#38bdf8; font-size:14px;">${p.id} (${p.plotBS ? 'BS Plot ' + p.plotBS : ''})</strong>
            <span style="font-size:10px; font-weight:bold; padding:2px 8px; border-radius:12px; background:${isDisputed ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}; color:${isDisputed ? '#f87171' : '#34d399'};">
              ${p.status}
            </span>
          </div>
          <table style="width:100%; font-size:12px; border-collapse:collapse; color:#e2e8f0;">
            <tr><td style="color:#94a3b8; padding:3px 0;">Mouza:</td><td><b>${p.mouza} (JL ${p.jlNo})</b></td></tr>
            <tr><td style="color:#94a3b8; padding:3px 0;">RS Plot:</td><td>${p.plotRS}</td></tr>
            <tr><td style="color:#94a3b8; padding:3px 0;">BS Khatian:</td><td>${p.khatianBS}</td></tr>
            <tr><td style="color:#94a3b8; padding:3px 0;">Area:</td><td style="color:#06b6d4;"><b>${p.areaDecimal} Dec (${p.areaKatha} Katha)</b></td></tr>
            <tr><td style="color:#94a3b8; padding:3px 0;">Owner:</td><td>${p.owner}</td></tr>
            <tr><td style="color:#94a3b8; padding:3px 0;">Tax Status:</td><td>${p.taxYear}</td></tr>
          </table>
          <div style="margin-top:10px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.1); font-size:11px; color:#cbd5e1;">
            <em>${p.remarks || ''}</em>
          </div>
        </div>
      `;

      polygon.bindPopup(popupHtml);
      this.parcelLayers[p.id] = polygon;

      // If parcel has disputed overlap polygon, render it in bright flashing red
      if (p.disputedOverlapCoords) {
        const overlapPoly = L.polygon(p.disputedOverlapCoords, {
          color: "#f43f5e",
          weight: 2,
          fillColor: "#dc2626",
          fillOpacity: 0.55,
          dashArray: "3, 3"
        }).addTo(this.map);

        overlapPoly.bindPopup(`
          <div style="font-family:'Inter',sans-serif; color:#f87171; font-size:12px;">
            <strong>⚠️ Encroached / Overlap Zone (2.5 Decimals)</strong>
            <p style="margin:4px 0 0; color:#e2e8f0;">Northern boundary overlap contested in Title Suit 142/2024.</p>
          </div>
        `);
      }
    });
  }

  renderWaypoints() {
    const waypoints = window.dataManager.getWaypoints();
    this.waypointLayers.forEach(l => this.map.removeLayer(l));
    this.waypointLayers = [];

    waypoints.forEach(w => {
      const marker = L.circleMarker([w.lat, w.lng], {
        radius: 6,
        fillColor: "#06b6d4",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(this.map);

      marker.bindPopup(`
        <div style="font-size:12px; font-family:'Inter', sans-serif;">
          <strong style="color:#38bdf8;">${w.name}</strong> (DGPS RTK)
          <div style="color:#94a3b8; margin-top:3px;">Lat: ${w.lat.toFixed(6)}<br>Lon: ${w.lng.toFixed(6)}</div>
          <div style="color:#cbd5e1; margin-top:4px;">${w.desc}</div>
        </div>
      `);

      this.waypointLayers.push(marker);
    });
  }

  focusParcel(parcelId) {
    const layer = this.parcelLayers[parcelId];
    if (layer && this.map) {
      this.map.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 19 });
      layer.openPopup();
    }
  }

  loadKMLString(kmlText) {
    try {
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlText, "text/xml");
      const coordsElements = kmlDoc.getElementsByTagName("coordinates");

      if (!coordsElements.length) {
        throw new Error("No <coordinates> elements found in KML file.");
      }

      const rawCoords = coordsElements[0].textContent.trim();
      const coordPairs = rawCoords.split(/\s+/).map(str => {
        const parts = str.split(",");
        const lon = parseFloat(parts[0]);
        const lat = parseFloat(parts[1]);
        return [lat, lon];
      }).filter(pair => !isNaN(pair[0]) && !isNaN(pair[1]));

      if (coordPairs.length < 3) {
        throw new Error("KML polygon must contain at least 3 coordinates.");
      }

      const customPoly = L.polygon(coordPairs, {
        color: "#38bdf8",
        weight: 3,
        fillColor: "#0284c7",
        fillOpacity: 0.35
      }).addTo(this.map);

      customPoly.bindPopup("<strong>Imported KML Boundary</strong>").openPopup();
      this.map.fitBounds(customPoly.getBounds());

      return { success: true, count: coordPairs.length };
    } catch (err) {
      console.error("KML Parse Error:", err);
      return { success: false, error: err.message };
    }
  }
}

window.gisManager = new GISManager();
