export interface SimilarityResult {
  score: number; // 0 to 100
  category: "Sempurna" | "Bagus Sekali" | "Cukup Baik" | "Perlu Latihan";
  description: string;
  userCanvasDataUrl?: string;
  overlayDataUrl?: string;
  referenceDataUrl?: string;
}

const GRID_SIZE = 80;
const PADDING = 10;

/**
 * Evaluasi penulisan standar presisi tinggi (seperti versi awal).
 * Mengukur tingkat kemiripan proporsi, lekukan, dan ketepatan jalur goresan (IoU, Precision, Recall).
 * Untuk mendapatkan nilai sempurna (80 - 100%), pengguna harus menuliskan karakter semirip dan serapi mungkin dengan karakter target.
 */
export function evaluateDrawingSimilarity(
  userCanvas: HTMLCanvasElement,
  referenceKana: string
): SimilarityResult {
  const userCtx = userCanvas.getContext("2d", { willReadFrequently: true });
  if (!userCtx) {
    return {
      score: 0,
      category: "Perlu Latihan",
      description: "Tidak dapat mengakses kanvas gambar.",
    };
  }

  const { width, height } = userCanvas;
  const userImgData = userCtx.getImageData(0, 0, width, height);
  const userPixels = userImgData.data;

  // 1. Deteksi batas goresan pengguna (bounding box)
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let totalDrawnPixels = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = userPixels[idx + 3];
      const r = userPixels[idx];
      const g = userPixels[idx + 1];
      const b = userPixels[idx + 2];
      const isNotWhite = r < 240 || g < 240 || b < 240;

      if (alpha > 40 && isNotWhite) {
        totalDrawnPixels++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Jika kanvas masih kosong atau goresan terlalu sedikit
  if (totalDrawnPixels < 30 || maxX <= minX || maxY <= minY) {
    return {
      score: 0,
      category: "Perlu Latihan",
      description: "Kanvas masih kosong atau goresan terlalu sedikit.",
    };
  }

  // 2. Offscreen canvas untuk normalisasi tulisan pengguna ke GRID_SIZE
  const normUserCanvas = document.createElement("canvas");
  normUserCanvas.width = GRID_SIZE;
  normUserCanvas.height = GRID_SIZE;
  const normUserCtx = normUserCanvas.getContext("2d", { willReadFrequently: true })!;

  normUserCtx.fillStyle = "#ffffff";
  normUserCtx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

  // Skalakan dan tempatkan di tengah grid dengan padding proporsional
  const drawnW = maxX - minX;
  const drawnH = maxY - minY;
  const maxDim = Math.max(drawnW, drawnH);
  const targetDim = GRID_SIZE - PADDING * 2;
  const scale = targetDim / maxDim;

  const destW = drawnW * scale;
  const destH = drawnH * scale;
  const destX = PADDING + (targetDim - destW) / 2;
  const destY = PADDING + (targetDim - destH) / 2;

  normUserCtx.drawImage(
    userCanvas,
    minX,
    minY,
    drawnW,
    drawnH,
    destX,
    destY,
    destW,
    destH
  );

  // 3. Offscreen canvas untuk karakter referensi Kana
  const refCanvas = document.createElement("canvas");
  refCanvas.width = GRID_SIZE;
  refCanvas.height = GRID_SIZE;
  const refCtx = refCanvas.getContext("2d", { willReadFrequently: true })!;

  refCtx.fillStyle = "#ffffff";
  refCtx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

  refCtx.font = `bold ${Math.round(GRID_SIZE * 0.72)}px "Noto Sans JP", sans-serif`;
  refCtx.fillStyle = "#293C3A";
  refCtx.textAlign = "center";
  refCtx.textBaseline = "middle";
  refCtx.fillText(referenceKana, GRID_SIZE / 2, GRID_SIZE / 2 + 2);

  // 4. Perbandingan matriks biner
  const uData = normUserCtx.getImageData(0, 0, GRID_SIZE, GRID_SIZE).data;
  const rData = refCtx.getImageData(0, 0, GRID_SIZE, GRID_SIZE).data;

  const uBinary: number[][] = [];
  const rBinary: number[][] = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    uBinary[y] = [];
    rBinary[y] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const idx = (y * GRID_SIZE + x) * 4;
      const uBrightness = (uData[idx] + uData[idx + 1] + uData[idx + 2]) / 3;
      uBinary[y][x] = uBrightness < 200 ? 1 : 0;

      const rBrightness = (rData[idx] + rData[idx + 1] + rData[idx + 2]) / 3;
      rBinary[y][x] = rBrightness < 200 ? 1 : 0;
    }
  }

  // Dilatasi matriks referensi 2px untuk mentolerir ketebalan alami pena/kuas
  const rDilated: number[][] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    rDilated[y] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      let isNear = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE) {
            if (rBinary[ny][nx] === 1) {
              isNear = 1;
              break;
            }
          }
        }
        if (isNear) break;
      }
      rDilated[y][x] = isNear;
    }
  }

  // Hitung metrik kecocokan
  let userStrokeCount = 0;
  let refStrokeCount = 0;
  let directIntersection = 0;
  let dilatedIntersection = 0;
  let union = 0;

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const u = uBinary[y][x];
      const r = rBinary[y][x];
      const rd = rDilated[y][x];

      if (u === 1) userStrokeCount++;
      if (r === 1) refStrokeCount++;

      if (u === 1 && r === 1) directIntersection++;
      if (u === 1 && rd === 1) dilatedIntersection++;
      if (u === 1 || r === 1) union++;
    }
  }

  if (refStrokeCount === 0 || union === 0) {
    return {
      score: 50,
      category: "Cukup Baik",
      description: "Evaluasi bentuk kana selesai.",
    };
  }

  // Rasio ketepatan goresan pada jalur referensi (Precision)
  const precision = userStrokeCount > 0 ? dilatedIntersection / userStrokeCount : 0;
  // Rasio kelengkapan goresan yang mencakup karakter (Recall)
  const recall = refStrokeCount > 0 ? dilatedIntersection / refStrokeCount : 0;
  // Rasio overlap bentuk (IoU)
  const iou = dilatedIntersection / (userStrokeCount + refStrokeCount - directIntersection);

  // Penalti kepadatan: mencegah coretan memblok seluruh kanvas
  const densityRatio = userStrokeCount / refStrokeCount;
  let penalty = 1.0;
  if (densityRatio > 2.2) {
    penalty = Math.max(0.2, 2.2 / densityRatio);
  } else if (densityRatio < 0.3) {
    penalty = Math.max(0.25, densityRatio / 0.3);
  }

  // Skor gabungan presisi: menuntut kemiripan bentuk dan proporsi yang tinggi untuk mencapai nilai sempurna
  const rawScore = (iou * 0.5 + precision * 0.3 + recall * 0.2) * 100 * penalty;
  const finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  // Kategori & deskripsi hasil
  let category: SimilarityResult["category"] = "Perlu Latihan";
  let description = "Bentuk tulisan belum cukup mirip dengan karakter target.";

  if (finalScore >= 80) {
    category = "Sempurna";
    description = "Luar biasa! Bentuk dan proporsi kana sangat tepat dan rapi.";
  } else if (finalScore >= 65) {
    category = "Bagus Sekali";
    description = "Bagus! Karakter dapat terbaca jelas dengan kemiripan tinggi.";
  } else if (finalScore >= 45) {
    category = "Cukup Baik";
    description = "Sudah cukup terbaca, pertahankan lekukan dan proporsi garis.";
  }

  // 5. Kanvas perbandingan overlay visual
  const overlayCanvas = document.createElement("canvas");
  overlayCanvas.width = GRID_SIZE * 2;
  overlayCanvas.height = GRID_SIZE * 2;
  const oCtx = overlayCanvas.getContext("2d")!;

  oCtx.fillStyle = "#FFF8F7";
  oCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  // Referensi sebagai bayang-bayang panduan
  oCtx.font = `bold ${Math.round(GRID_SIZE * 1.4)}px "Noto Sans JP", sans-serif`;
  oCtx.fillStyle = "rgba(85, 169, 160, 0.35)";
  oCtx.textAlign = "center";
  oCtx.textBaseline = "middle";
  oCtx.fillText(referenceKana, GRID_SIZE, GRID_SIZE + 4);

  // Tinta pengguna di atasnya
  oCtx.drawImage(
    normUserCanvas,
    0,
    0,
    GRID_SIZE,
    GRID_SIZE,
    0,
    0,
    GRID_SIZE * 2,
    GRID_SIZE * 2
  );

  return {
    score: finalScore,
    category,
    description,
    userCanvasDataUrl: normUserCanvas.toDataURL(),
    referenceDataUrl: refCanvas.toDataURL(),
    overlayDataUrl: overlayCanvas.toDataURL(),
  };
}
