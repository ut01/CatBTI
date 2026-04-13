/**
 * 生成分享图片 — 纯 Canvas 绘制，无外部依赖
 */

import { getCatAvatar } from './cat-avatar.js'

const LEVEL_NUM = { L: 1, M: 2, H: 3 }
const LEVEL_LABEL = { L: '低', M: '中', H: '高' }

/**
 * 加载图片，返回 Promise<HTMLImageElement>
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * 生成分享卡片并下载
 */
export async function generateShareImage(primary, userLevels, dimOrder, dimDefs, mode, config) {
  const ui = config?.display?.ui || {}
  const dpr = 2
  const W = 720
  const H = 1800
  const canvas = document.createElement('canvas')
  canvas.width = W * dpr
  canvas.height = H * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  // 预加载图片
  const avatarSrc = getCatAvatar(primary)
  const qrSrc = new URL('../img/qr_code_embeded_cat_img.png', import.meta.url).href
  const [avatarImg, qrImg] = await Promise.all([
    loadImage(avatarSrc).catch(() => null),
    loadImage(qrSrc).catch(() => null),
  ])

  // 背景
  ctx.fillStyle = '#faf6f0'
  ctx.fillRect(0, 0, W, H)

  // 卡片白底
  const cardX = 32, cardY = 32, cardW = W - 64, cardH = H - 64
  roundRect(ctx, cardX, cardY, cardW, cardH, 20)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.shadowColor = 'transparent'

  let y = cardY + 48

  // Kicker
  ctx.textAlign = 'center'
  ctx.font = '400 22px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = '#7a6560'
  const kickerText =
    mode === 'catnip' || mode === 'drunk'
      ? ui.resultKickerCatnip || ui.resultKickerDrunk || '猫薄荷彩蛋 · CatBTI 隐藏款'
      : mode === 'fallback'
        ? ui.resultKickerFallback || '十五维对不上猫粮 · CatBTI 兜底款'
        : ui.resultKickerNormal || '你的 CatBTI 主猫格'
  ctx.fillText(kickerText, W / 2, y)
  y += 32

  // 猫咪头像
  if (avatarImg) {
    const avatarSize = 234
    const avatarX = (W - avatarSize) / 2
    ctx.save()
    roundRect(ctx, avatarX, y, avatarSize, avatarSize, 46)
    ctx.clip()
    ctx.drawImage(avatarImg, avatarX, y, avatarSize, avatarSize)
    ctx.restore()
    // 头像边框阴影
    ctx.save()
    ctx.shadowColor = 'rgba(196, 92, 38, 0.12)'
    ctx.shadowBlur = 24
    ctx.shadowOffsetY = 10
    roundRect(ctx, avatarX, y, avatarSize, avatarSize, 46)
    ctx.strokeStyle = 'rgba(196, 92, 38, 0.08)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.restore()
    y += avatarSize + 20
  }

  // 类型代码
  ctx.textAlign = 'center'
  ctx.font = '900 72px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = '#c45c26'
  ctx.fillText(primary.code, W / 2, y)
  y += 40

  // 中文名
  ctx.font = '600 32px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = '#3d2f2f'
  ctx.fillText(primary.cn, W / 2, y)
  y += 36

  // 匹配度徽章
  const matchLabel = ui.matchLabel || 'CatBTI 猫格重合度'
  const exactLabel = ui.exactLabel || '十五维精准对齐'
  const badgeText =
    `${matchLabel} ${primary.similarity}%` + (primary.exact != null ? ` · ${exactLabel} ${primary.exact}/15` : '')
  ctx.font = '500 20px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
  const badgeW = ctx.measureText(badgeText).width + 40
  roundRect(ctx, (W - badgeW) / 2, y - 16, badgeW, 36, 18)
  ctx.fillStyle = '#fde8d4'
  ctx.fill()
  ctx.fillStyle = '#c45c26'
  ctx.fillText(badgeText, W / 2, y + 6)
  y += 44

  // Intro
  ctx.font = 'italic 600 22px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = '#3d2f2f'
  const introLines = wrapText(ctx, primary.intro || '', cardW - 80)
  for (const line of introLines) {
    ctx.fillText(line, W / 2, y)
    y += 30
  }
  y += 16

  // 雷达图
  const radarCx = W / 2
  const radarCy = y + 150
  const radarR = 130
  drawShareRadar(ctx, radarCx, radarCy, radarR, userLevels, dimOrder, dimDefs)
  y = radarCy + radarR + 40

  // 维度条形图
  y += 10
  ctx.textAlign = 'left'
  const barX = cardX + 48
  const barMaxW = cardW - 96
  const dimNameW = 110

  for (const dim of dimOrder) {
    const level = userLevels[dim] || 'M'
    const val = LEVEL_NUM[level]
    const def = dimDefs[dim]
    if (!def) continue

    const name = def.name.replace(/^[A-Za-z0-9]+\s*/, '')

    // 维度名
    ctx.font = '600 16px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.fillStyle = '#3d2f2f'
    ctx.fillText(name, barX, y)

    // 进度条背景
    const progX = barX + dimNameW
    const progW = barMaxW - dimNameW - 50
    const progH = 12
    roundRect(ctx, progX, y - 10, progW, progH, 6)
    ctx.fillStyle = '#fde8d4'
    ctx.fill()

    // 进度条填充
    const fillW = (val / 3) * progW
    roundRect(ctx, progX, y - 10, fillW, progH, 6)
    ctx.fillStyle = val === 3 ? '#a34a1e' : val === 2 ? '#c45c26' : '#b8860b'
    ctx.fill()

    // 等级标签
    ctx.textAlign = 'right'
    ctx.font = '600 14px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.fillStyle = val === 3 ? '#a34a1e' : val === 2 ? '#c45c26' : '#b8860b'
    ctx.fillText(LEVEL_LABEL[level], barX + barMaxW, y)
    ctx.textAlign = 'left'

    y += 26
  }

  y += 24

  // 二维码区域
  if (qrImg) {
    const qrBlockW = 260
    const qrBlockH = 300
    const qrBlockX = (W - qrBlockW) / 2

    // QR block 背景
    const grad = ctx.createLinearGradient(qrBlockX, y, qrBlockX, y + qrBlockH)
    grad.addColorStop(0, '#fffaf5')
    grad.addColorStop(1, '#fde8d4')
    roundRect(ctx, qrBlockX, y, qrBlockW, qrBlockH, 18)
    ctx.fillStyle = grad
    ctx.fill()
    ctx.strokeStyle = '#ead9cc'
    ctx.lineWidth = 1
    ctx.stroke()

    // QR 图片
    const qrImgSize = 180
    const qrImgX = (W - qrImgSize) / 2
    const qrImgY = y + 20
    ctx.save()
    roundRect(ctx, qrImgX, qrImgY, qrImgSize, qrImgSize, 18)
    ctx.clip()
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(qrImgX, qrImgY, qrImgSize, qrImgSize)
    ctx.drawImage(qrImg, qrImgX, qrImgY, qrImgSize, qrImgSize)
    ctx.restore()

    // QR 文字
    ctx.textAlign = 'center'
    ctx.font = '400 16px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.fillStyle = '#7a6560'
    ctx.fillText('扫码测你的猫格', W / 2, qrImgY + qrImgSize + 28)
    ctx.font = '400 14px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.fillStyle = '#b5a399'
    ctx.fillText('分享给朋友一起测猫格', W / 2, qrImgY + qrImgSize + 50)

    y += qrBlockH + 20
  }

  // 底部水印
  ctx.textAlign = 'center'
  ctx.font = '400 18px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = '#b5a399'
  ctx.fillText(ui.shareWatermark || 'CatBTI 猫格测试 · 仅供娱乐', W / 2, y + 10)

  // 裁剪画布到实际内容高度
  const finalH = y + 50
  const finalCanvas = document.createElement('canvas')
  finalCanvas.width = W * dpr
  finalCanvas.height = finalH * dpr
  const fctx = finalCanvas.getContext('2d')
  fctx.drawImage(canvas, 0, 0)

  // 下载
  const link = document.createElement('a')
  link.download = `CatBTI-${primary.code}.png`
  link.href = finalCanvas.toDataURL('image/png')
  link.click()
}

/**
 * 在分享图上绘制雷达图
 */
function drawShareRadar(ctx, cx, cy, maxR, userLevels, dimOrder, dimDefs) {
  const n = dimOrder.length
  const step = (Math.PI * 2) / n
  const start = -Math.PI / 2

  // 背景圆环
  for (let lv = 3; lv >= 1; lv--) {
    const r = (lv / 3) * maxR
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = lv === 3 ? 'rgba(196,92,38,0.08)' : lv === 2 ? 'rgba(196,92,38,0.05)' : 'rgba(196,92,38,0.03)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(196,92,38,0.15)'
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // 轴线 + 标签
  ctx.font = '400 12px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let i = 0; i < n; i++) {
    const angle = start + i * step
    const x = cx + Math.cos(angle) * maxR
    const y = cy + Math.sin(angle) * maxR
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(x, y)
    ctx.strokeStyle = 'rgba(196,92,38,0.12)'
    ctx.lineWidth = 0.5
    ctx.stroke()

    const lr = maxR + 24
    const lx = cx + Math.cos(angle) * lr
    const ly = cy + Math.sin(angle) * lr
    const label = (dimDefs[dimOrder[i]]?.name || dimOrder[i]).replace(/^[A-Za-z0-9]+\s*/, '')
    ctx.fillStyle = '#7a6560'
    ctx.fillText(label, lx, ly)
  }

  // 数据多边形
  const values = dimOrder.map((d) => LEVEL_NUM[userLevels[d]] || 2)
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const angle = start + i * step
    const r = (values[i] / 3) * maxR
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fillStyle = 'rgba(196,92,38,0.2)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(196,92,38,0.65)'
  ctx.lineWidth = 2
  ctx.stroke()

  // 数据点
  for (let i = 0; i < n; i++) {
    const angle = start + i * step
    const r = (values[i] / 3) * maxR
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#c45c26'
    ctx.fill()
  }
}

/**
 * 圆角矩形
 */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/**
 * 文字自动换行
 */
function wrapText(ctx, text, maxWidth) {
  if (!text) return []
  const lines = []
  let line = ''
  for (const char of text) {
    const test = line + char
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = char
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}
