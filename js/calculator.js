/**
 * SHETUE LAND OSINT TOOLKIT - LAND CALCULATOR & 16-ANNA ENGINE
 * Instant multi-unit conversions, 16-Anna fractional inheritance, and coordinate area
 */

const LandCalculator = {
  // Conversion Constants
  SQ_FT_PER_DECIMAL: 435.6,
  SQ_FT_PER_KATHA: 720.0,
  KATHA_PER_BIGHA: 20.0,
  SQ_FT_PER_ACRE: 43560.0,
  SQ_METRES_PER_SQ_FT: 0.092903,
  SQ_FT_PER_SQ_METRE: 10.7639,
  DECIMALS_PER_HECTARE: 247.105,

  convert(value, fromUnit) {
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) {
      return null;
    }

    let sqFt = 0;
    switch (fromUnit.toLowerCase()) {
      case "decimal":
        sqFt = val * this.SQ_FT_PER_DECIMAL;
        break;
      case "katha":
        sqFt = val * this.SQ_FT_PER_KATHA;
        break;
      case "bigha":
        sqFt = val * this.KATHA_PER_BIGHA * this.SQ_FT_PER_KATHA;
        break;
      case "acre":
        sqFt = val * this.SQ_FT_PER_ACRE;
        break;
      case "sqft":
        sqFt = val;
        break;
      case "sqm":
        sqFt = val * this.SQ_FT_PER_SQ_METRE;
        break;
      case "hectare":
        sqFt = (val * this.DECIMALS_PER_HECTARE) * this.SQ_FT_PER_DECIMAL;
        break;
      default:
        sqFt = val;
    }

    const decimals = sqFt / this.SQ_FT_PER_DECIMAL;
    const katha = sqFt / this.SQ_FT_PER_KATHA;
    const bigha = katha / this.KATHA_PER_BIGHA;
    const acres = sqFt / this.SQ_FT_PER_ACRE;
    const sqM = sqFt * this.SQ_METRES_PER_SQ_FT;
    const hectares = decimals / this.DECIMALS_PER_HECTARE;

    return {
      squareFeet: sqFt,
      decimals: decimals,
      katha: katha,
      bigha: bigha,
      acres: acres,
      squareMeters: sqM,
      hectares: hectares
    };
  },

  calculate16Anna(totalDecimals, anna = 0, ganda = 0, kara = 0, kranti = 0, til = 0) {
    const totDec = parseFloat(totalDecimals);
    if (isNaN(totDec) || totDec <= 0) return null;

    const a = parseFloat(anna) || 0;
    const g = parseFloat(ganda) || 0;
    const ka = parseFloat(kara) || 0;
    const kr = parseFloat(kranti) || 0;
    const t = parseFloat(til) || 0;

    // 16 Anna = 76,800 Tils
    const totalTilsIn16Anna = 76800.0;
    const inputTils = (a * 20 * 4 * 3 * 20) + (g * 4 * 3 * 20) + (ka * 3 * 20) + (kr * 20) + t;

    const shareFraction = inputTils / totalTilsIn16Anna;
    const sharePercentage = shareFraction * 100.0;
    const allocatedDecimals = totDec * shareFraction;
    const allocatedKatha = (allocatedDecimals * this.SQ_FT_PER_DECIMAL) / this.SQ_FT_PER_KATHA;
    const allocatedSqFt = allocatedDecimals * this.SQ_FT_PER_DECIMAL;

    return {
      totalDecimals: totDec,
      shareFraction: shareFraction,
      sharePercentage: sharePercentage,
      allocatedDecimals: allocatedDecimals,
      allocatedKatha: allocatedKatha,
      allocatedSqFt: allocatedSqFt
    };
  },

  calculatePolygonArea(coords) {
    if (!coords || coords.length < 3) return null;

    const avgLat = coords.reduce((sum, p) => sum + p[0], 0) / coords.length;
    const latRad = (avgLat * Math.PI) / 180.0;

    const mPerLat = 111139.0;
    const mPerLon = 111139.0 * Math.cos(latRad);

    const projected = coords.map(p => [p[1] * mPerLon, p[0] * mPerLat]);

    let areaSqM = 0;
    const n = projected.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      areaSqM += projected[i][0] * projected[j][1];
      areaSqM -= projected[j][0] * projected[i][1];
    }
    areaSqM = Math.abs(areaSqM) / 2.0;

    const sqFt = areaSqM * this.SQ_FT_PER_SQ_METRE;
    return this.convert(sqFt, "sqft");
  }
};

window.LandCalculator = LandCalculator;
