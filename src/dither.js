// Ordered (Bayer) dithering para as faixas decorativas e o retrato.
// Tudo é desenhado em um canvas de baixa resolução e ampliado com `image-rendering: pixelated`.

const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

const BAYER8 = (() => {
  const m = []
  for (let y = 0; y < 8; y++) {
    m[y] = []
    for (let x = 0; x < 8; x++) {
      const b = BAYER4[y % 4][x % 4] * 4
      const q = [0, 2, 3, 1][((y >> 2) << 1) | (x >> 2)]
      m[y][x] = b + q
    }
  }
  return m
})()

const hexToRgb = (hex) => {
  const h = hex.trim().replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name)

// Faixa: densidade sobe de cima para baixo (ou o contrário, com `reverse`).
export function drawBand(canvas, { cell = 4, reverse = false } = {}) {
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  if (!w || !h) return
  const cols = Math.ceil(w / cell)
  const rows = Math.ceil(h / cell)
  canvas.width = cols
  canvas.height = rows
  const ctx = canvas.getContext('2d')
  const img = ctx.createImageData(cols, rows)
  const [r, g, b] = hexToRgb(cssVar('--accent'))
  for (let y = 0; y < rows; y++) {
    let d = (y + 0.5) / rows
    if (reverse) d = 1 - d
    d = Math.pow(d, 1.7)
    // linhas alternadas vazias no topo dão o efeito de "scanline" da referência
    const sparse = d < 0.35 && y % 2 === 1
    for (let x = 0; x < cols; x++) {
      const on = !sparse && d > (BAYER4[y % 4][x % 4] + 0.5) / 16
      const i = (y * cols + x) * 4
      img.data[i] = r
      img.data[i + 1] = g
      img.data[i + 2] = b
      img.data[i + 3] = on ? 255 : 0
    }
  }
  ctx.putImageData(img, 0, 0)
}

// Retrato: imagem reduzida, níveis normalizados e quantizada em 4 tons do tema.
// Suavização 3x3 (box blur) para tirar o grão da foto antes de pontilhar.
const blur = (src, size) => {
  const out = new Float32Array(src.length)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let sum = 0
      let n = 0
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy
        if (yy < 0 || yy >= size) continue
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx
          if (xx < 0 || xx >= size) continue
          sum += src[yy * size + xx]
          n++
        }
      }
      out[y * size + x] = sum / n
    }
  }
  return out
}

const mix = (a, b, t) => a.map((c, i) => Math.round(c + (b[i] - c) * t))

// Retrato: imagem reduzida, suavizada, com níveis normalizados e quantizada em tons do tema.
// `strength` controla quanto do padrão Bayer aparece (1 = dither cheio, 0 = só faixas lisas).
export function drawPortrait(canvas, image, { size = 200, levels = 6, strength = 0.3 } = {}) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  canvas.width = size
  canvas.height = size
  ctx.imageSmoothingQuality = 'high'
  const s = Math.min(image.naturalWidth, image.naturalHeight)
  const sx = (image.naturalWidth - s) / 2
  const sy = (image.naturalHeight - s) / 2
  ctx.drawImage(image, sx, sy, s, s, 0, 0, size, size)
  const img = ctx.getImageData(0, 0, size, size)
  const px = img.data
  let lum = new Float32Array(size * size)
  for (let i = 0; i < lum.length; i++) {
    lum[i] = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255
  }
  lum = blur(blur(lum, size), size)

  // normaliza pelos percentis 2% e 98% para ignorar pontos isolados muito claros/escuros
  const sorted = Float32Array.from(lum).sort()
  const lo = sorted[Math.floor(sorted.length * 0.02)]
  const hi = sorted[Math.floor(sorted.length * 0.98)]
  const span = hi - lo || 1

  const dark = hexToRgb(cssVar('--tone-0'))
  const light = hexToRgb(cssVar('--tone-3'))
  const tones = Array.from({ length: levels }, (_, k) => mix(dark, light, k / (levels - 1)))
  const top = levels - 1

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x
      const v = Math.max(0, Math.min(1, (lum[i] - lo) / span))
      const t = 0.5 + ((BAYER8[y % 8][x % 8] + 0.5) / 64 - 0.5) * strength
      const q = Math.max(0, Math.min(top, Math.floor(v * top + t)))
      const [r, g, b] = tones[q]
      px[i * 4] = r
      px[i * 4 + 1] = g
      px[i * 4 + 2] = b
      px[i * 4 + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
}
