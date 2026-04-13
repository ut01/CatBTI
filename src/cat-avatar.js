const THEMES = {
  LIHUA: { fur: '#8f6843', inner: '#f6d0b2', accent: '#4a3424', pattern: 'tabby', mood: 'bright', accessory: 'bell' },
  RAGDOLL: { fur: '#f4efe9', inner: '#f7c9bf', accent: '#745b7a', pattern: 'point', mood: 'soft', accessory: 'bow' },
  EXOTIC: { fur: '#d8c2a7', inner: '#f2c3ac', accent: '#8f5a3c', pattern: 'flat', mood: 'sleepy', accessory: 'sun' },
  MAINE: { fur: '#9a7357', inner: '#efc8aa', accent: '#5b4030', pattern: 'mane', mood: 'calm', accessory: 'crown' },
  BRITISH: { fur: '#aeb7c3', inner: '#f2c7b5', accent: '#5a6472', pattern: 'solid', mood: 'soft', accessory: 'heart' },
  SIAMESE: { fur: '#f0ddc5', inner: '#f6c4b7', accent: '#5c3b31', pattern: 'point', mood: 'alert', accessory: 'spark' },
  ABY: { fur: '#b97c4d', inner: '#f2c2a3', accent: '#73482a', pattern: 'tabby', mood: 'bright', accessory: 'bolt' },
  BENGAL: { fur: '#d59b51', inner: '#f4c8a0', accent: '#6f4a1e', pattern: 'spots', mood: 'bright', accessory: 'star' },
  NORWEGIAN: { fur: '#c7c0b2', inner: '#f4ccb0', accent: '#687969', pattern: 'mane', mood: 'soft', accessory: 'leaf' },
  VAN: { fur: '#fff7ef', inner: '#f7cab0', accent: '#cf7a49', pattern: 'van', mood: 'calm', accessory: 'drop' },
  SPHYNX: { fur: '#d9a88c', inner: '#ebb498', accent: '#8b5e4d', pattern: 'solid', mood: 'wink', accessory: 'moon' },
  BIRMAN: { fur: '#ede2d0', inner: '#f6cdb6', accent: '#8a6755', pattern: 'point', mood: 'calm', accessory: 'lotus' },
  ORIENTAL: { fur: '#5b4640', inner: '#d7a290', accent: '#d3c0ad', pattern: 'slim', mood: 'bright', accessory: 'comet' },
  CORNISH: { fur: '#d9c6b0', inner: '#f2c4aa', accent: '#9f7656', pattern: 'curly', mood: 'wink', accessory: 'confetti' },
  AMERICAN: { fur: '#9c9fa5', inner: '#efc5ad', accent: '#4f5157', pattern: 'tabby', mood: 'calm', accessory: 'badge' },
  RUSSIAN: { fur: '#99a9ba', inner: '#efc2b3', accent: '#5b6f84', pattern: 'solid', mood: 'sleepy', accessory: 'snow' },
  ORANGE: { fur: '#de8b36', inner: '#f5c29d', accent: '#9e5213', pattern: 'tabby', mood: 'smile', accessory: 'fish' },
  PERSIAN: { fur: '#d9d0c8', inner: '#f2c5b0', accent: '#877870', pattern: 'flat', mood: 'sleepy', accessory: 'cloud' },
  JIANZHOU: { fur: '#2c2c2c', inner: '#e0b098', accent: '#e9c65e', pattern: 'mask', mood: 'alert', accessory: 'target' },
  CHARTREUX: { fur: '#92a0ab', inner: '#efc1ac', accent: '#55626f', pattern: 'solid', mood: 'calm', accessory: 'halo' },
  MUNCHKIN: { fur: '#f2d7b1', inner: '#f6c9ad', accent: '#8e6647', pattern: 'solid', mood: 'soft', accessory: 'ribbon' },
  EGYPTIAN: { fur: '#c8a27c', inner: '#efc0a6', accent: '#75553f', pattern: 'spots', mood: 'calm', accessory: 'gem' },
  SAVANNAH: { fur: '#d6b171', inner: '#f3c9a5', accent: '#6e5136', pattern: 'spots', mood: 'alert', accessory: 'flame' },
  BOMBAY: { fur: '#232323', inner: '#d4a78f', accent: '#f1da78', pattern: 'solid', mood: 'sleepy', accessory: 'moon' },
  HIMALAYAN: { fur: '#ece0d8', inner: '#f5c9b8', accent: '#71534a', pattern: 'point', mood: 'soft', accessory: 'flower' },
  HHHH: { fur: '#e3d0b7', inner: '#f4cab0', accent: '#8e6d58', pattern: 'patchwork', mood: 'wink', accessory: 'question' },
  DRUNK: { fur: '#e7d9c8', inner: '#f5c6af', accent: '#6e4f48', pattern: 'point', mood: 'dizzy', accessory: 'catnip' },
}

export function getCatAvatar(type) {
  const theme = THEMES[type.code] || THEMES.HHHH
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" role="img" aria-label="${escapeAttr(type.cn || type.code)}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fff7ef" />
          <stop offset="100%" stop-color="#fde8d4" />
        </linearGradient>
      </defs>
      <rect width="220" height="220" rx="44" fill="url(#bg)" />
      <circle cx="110" cy="108" r="78" fill="#fffaf5" />
      <g transform="translate(0 4)">
        ${renderEars(theme)}
        <ellipse cx="110" cy="118" rx="62" ry="58" fill="${theme.fur}" />
        ${renderPattern(theme)}
        <ellipse cx="89" cy="132" rx="14" ry="11" fill="${theme.inner}" opacity="0.85" />
        <ellipse cx="131" cy="132" rx="14" ry="11" fill="${theme.inner}" opacity="0.85" />
        <ellipse cx="110" cy="146" rx="22" ry="17" fill="#fff2ea" />
        ${renderEyes(theme)}
        <path d="M110 142 l-7 8 h14z" fill="#d9838d" />
        <path d="M110 150 q-9 10 -18 0" fill="none" stroke="#6b4f45" stroke-width="3" stroke-linecap="round" />
        <path d="M110 150 q9 10 18 0" fill="none" stroke="#6b4f45" stroke-width="3" stroke-linecap="round" />
        <path d="M87 146 q-18 0 -28 6" fill="none" stroke="#6b4f45" stroke-width="2.6" stroke-linecap="round" />
        <path d="M87 151 q-18 3 -30 13" fill="none" stroke="#6b4f45" stroke-width="2.6" stroke-linecap="round" />
        <path d="M133 146 q18 0 28 6" fill="none" stroke="#6b4f45" stroke-width="2.6" stroke-linecap="round" />
        <path d="M133 151 q18 3 30 13" fill="none" stroke="#6b4f45" stroke-width="2.6" stroke-linecap="round" />
        ${renderAccessory(theme)}
      </g>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function renderEars(theme) {
  return `
    <path d="M66 80 L84 38 L103 88 Z" fill="${theme.fur}" />
    <path d="M154 80 L136 38 L117 88 Z" fill="${theme.fur}" />
    <path d="M77 78 L86 54 L95 80 Z" fill="${theme.inner}" opacity="0.95" />
    <path d="M143 78 L134 54 L125 80 Z" fill="${theme.inner}" opacity="0.95" />
  `
}

function renderPattern(theme) {
  const stroke = theme.accent
  if (theme.pattern === 'tabby') {
    return `
      <path d="M92 88 q18 -16 36 0" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round" opacity="0.85" />
      <path d="M80 103 q10 -10 20 0" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" opacity="0.8" />
      <path d="M120 103 q10 -10 20 0" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" opacity="0.8" />
    `
  }
  if (theme.pattern === 'spots') {
    return `
      <circle cx="88" cy="102" r="6" fill="${stroke}" opacity="0.65" />
      <circle cx="132" cy="97" r="7" fill="${stroke}" opacity="0.65" />
      <circle cx="148" cy="116" r="5" fill="${stroke}" opacity="0.55" />
      <circle cx="73" cy="120" r="5" fill="${stroke}" opacity="0.55" />
    `
  }
  if (theme.pattern === 'point') {
    return `
      <ellipse cx="110" cy="103" rx="30" ry="23" fill="${stroke}" opacity="0.28" />
      <ellipse cx="78" cy="90" rx="10" ry="8" fill="${stroke}" opacity="0.3" />
      <ellipse cx="142" cy="90" rx="10" ry="8" fill="${stroke}" opacity="0.3" />
    `
  }
  if (theme.pattern === 'mane') {
    return `
      <path d="M54 120 q12 -42 56 -46 q44 4 56 46 q-16 28 -56 31 q-40 -3 -56 -31z" fill="${stroke}" opacity="0.16" />
    `
  }
  if (theme.pattern === 'flat') {
    return `<ellipse cx="110" cy="122" rx="44" ry="12" fill="${stroke}" opacity="0.12" />`
  }
  if (theme.pattern === 'van') {
    return `
      <path d="M61 112 q16 -28 42 -16 q-11 23 -33 28z" fill="${theme.accent}" opacity="0.38" />
      <path d="M159 112 q-16 -28 -42 -16 q11 23 33 28z" fill="${theme.accent}" opacity="0.38" />
    `
  }
  if (theme.pattern === 'mask') {
    return `<ellipse cx="110" cy="106" rx="40" ry="28" fill="${theme.accent}" opacity="0.22" />`
  }
  if (theme.pattern === 'slim') {
    return `
      <path d="M108 82 l-5 18 h14 l-5 -18z" fill="${stroke}" opacity="0.55" />
      <path d="M91 96 q19 8 38 0" fill="none" stroke="${stroke}" stroke-width="3" opacity="0.55" />
    `
  }
  if (theme.pattern === 'curly') {
    return `
      <path d="M83 100 q7 -7 13 0 q6 7 12 0 q6 -7 12 0 q6 7 13 0" fill="none" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round" opacity="0.7" />
    `
  }
  if (theme.pattern === 'patchwork') {
    return `
      <path d="M63 108 q18 -24 42 -13 q-9 20 -35 25z" fill="${theme.accent}" opacity="0.33" />
      <path d="M157 114 q-16 -21 -38 -10 q9 18 29 22z" fill="#dca16f" opacity="0.35" />
    `
  }
  return ''
}

function renderEyes(theme) {
  const iris = theme.accent
  if (theme.mood === 'sleepy') {
    return `
      <path d="M80 117 q10 -8 20 0" fill="none" stroke="${iris}" stroke-width="4" stroke-linecap="round" />
      <path d="M120 117 q10 -8 20 0" fill="none" stroke="${iris}" stroke-width="4" stroke-linecap="round" />
    `
  }
  if (theme.mood === 'wink') {
    return `
      <circle cx="90" cy="117" r="7" fill="${iris}" />
      <circle cx="90" cy="117" r="2.5" fill="#fff" />
      <path d="M120 117 q10 -8 20 0" fill="none" stroke="${iris}" stroke-width="4" stroke-linecap="round" />
    `
  }
  if (theme.mood === 'dizzy') {
    return `
      <path d="M80 113 l12 12 M92 113 l-12 12" stroke="${iris}" stroke-width="4" stroke-linecap="round" />
      <path d="M128 113 l12 12 M140 113 l-12 12" stroke="${iris}" stroke-width="4" stroke-linecap="round" />
    `
  }
  if (theme.mood === 'smile') {
    return `
      <ellipse cx="90" cy="117" rx="8" ry="10" fill="${iris}" />
      <ellipse cx="130" cy="117" rx="8" ry="10" fill="${iris}" />
      <circle cx="93" cy="114" r="2.2" fill="#fff" />
      <circle cx="133" cy="114" r="2.2" fill="#fff" />
    `
  }
  if (theme.mood === 'soft') {
    return `
      <ellipse cx="90" cy="117" rx="7" ry="9" fill="${iris}" />
      <ellipse cx="130" cy="117" rx="7" ry="9" fill="${iris}" />
      <circle cx="93" cy="114" r="2.2" fill="#fff" />
      <circle cx="133" cy="114" r="2.2" fill="#fff" />
      <circle cx="73" cy="132" r="5" fill="#f4b2b7" opacity="0.5" />
      <circle cx="147" cy="132" r="5" fill="#f4b2b7" opacity="0.5" />
    `
  }
  return `
    <ellipse cx="90" cy="117" rx="8" ry="10" fill="${iris}" />
    <ellipse cx="130" cy="117" rx="8" ry="10" fill="${iris}" />
    <circle cx="93" cy="114" r="2.2" fill="#fff" />
    <circle cx="133" cy="114" r="2.2" fill="#fff" />
  `
}

function renderAccessory(theme) {
  const fill = theme.accent
  const common = 'opacity="0.92"'
  switch (theme.accessory) {
    case 'bell':
      return `<circle cx="110" cy="176" r="11" fill="${fill}" ${common} /><circle cx="110" cy="179" r="3" fill="#fff4d0" />`
    case 'bow':
      return `<path d="M98 175 l-14 -7 l3 16 z M122 175 l14 -7 l-3 16 z" fill="${fill}" ${common} /><circle cx="110" cy="177" r="5" fill="#fff" />`
    case 'crown':
      return `<path d="M91 58 l10 12 l9 -16 l10 16 l9 -12 l6 18 h-50z" fill="${fill}" ${common} />`
    case 'heart':
      return `<path d="M110 176 c-10 -10 -20 -15 -20 -26 a10 10 0 0 1 20 -4 a10 10 0 0 1 20 4 c0 11 -10 16 -20 26z" fill="${fill}" ${common} />`
    case 'leaf':
      return `<path d="M157 69 q18 2 22 20 q-20 2 -29 -15 z" fill="${fill}" ${common} /><path d="M161 87 q-7 9 -14 16" fill="none" stroke="${fill}" stroke-width="3" />`
    case 'bolt':
      return `<path d="M157 67 l-10 18 h11 l-8 17 l22 -23 h-11 l8 -12z" fill="${fill}" ${common} />`
    case 'star':
    case 'spark':
      return `<path d="M161 77 l5 11 l12 2 l-9 8 l2 12 l-10 -6 l-10 6 l2 -12 l-9 -8 l12 -2z" fill="${fill}" ${common} />`
    case 'drop':
      return `<path d="M160 65 q14 16 14 25 a14 14 0 1 1 -28 0 q0 -9 14 -25z" fill="${fill}" ${common} />`
    case 'moon':
      return `<path d="M160 68 a16 16 0 1 0 0 31 a13 13 0 1 1 0 -31z" fill="${fill}" ${common} />`
    case 'lotus':
    case 'flower':
      return `<circle cx="160" cy="86" r="5" fill="#fff5cf" /><circle cx="160" cy="74" r="7" fill="${fill}" ${common} /><circle cx="149" cy="82" r="7" fill="${fill}" ${common} /><circle cx="171" cy="82" r="7" fill="${fill}" ${common} />`
    case 'comet':
      return `<circle cx="160" cy="74" r="7" fill="${fill}" ${common} /><path d="M150 82 q-13 5 -22 18" fill="none" stroke="${fill}" stroke-width="5" stroke-linecap="round" opacity="0.7" />`
    case 'confetti':
      return `<circle cx="155" cy="73" r="4" fill="${fill}" /><circle cx="168" cy="84" r="4" fill="#f0a35f" /><circle cx="147" cy="89" r="4" fill="#e87d7d" />`
    case 'badge':
      return `<path d="M160 67 l5 10 l11 1 l-8 7 l3 11 l-11 -6 l-10 6 l2 -11 l-8 -7 l11 -1z" fill="${fill}" ${common} />`
    case 'snow':
      return `<path d="M160 66 v24 M148 78 h24 M151 69 l18 18 M169 69 l-18 18" stroke="${fill}" stroke-width="3.4" stroke-linecap="round" />`
    case 'fish':
      return `<path d="M160 176 q13 -8 22 0 q-9 8 -22 0z" fill="${fill}" ${common} /><circle cx="175" cy="176" r="1.6" fill="#fff" />`
    case 'cloud':
      return `<path d="M147 84 q2 -10 12 -10 q8 0 11 7 q9 -1 12 6 q3 8 -7 11 h-25 q-9 -2 -7 -10 q1 -4 4 -4z" fill="${fill}" opacity="0.34" />`
    case 'target':
      return `<circle cx="160" cy="80" r="14" fill="none" stroke="${fill}" stroke-width="4" /><circle cx="160" cy="80" r="6" fill="${fill}" opacity="0.7" />`
    case 'halo':
      return `<ellipse cx="160" cy="70" rx="18" ry="7" fill="none" stroke="${fill}" stroke-width="4" />`
    case 'ribbon':
      return `<path d="M152 66 l16 0 l-8 12z" fill="${fill}" ${common} /><path d="M160 78 l-9 15 h18z" fill="${fill}" opacity="0.55" />`
    case 'gem':
      return `<path d="M160 67 l11 11 l-11 14 l-11 -14z" fill="${fill}" ${common} />`
    case 'flame':
      return `<path d="M160 94 q-10 -10 -5 -21 q4 -8 5 -14 q3 6 10 14 q6 8 3 17 q-3 9 -13 10z" fill="${fill}" ${common} />`
    case 'question':
      return `<path d="M160 64 q10 0 10 9 q0 5 -6 9 q-4 3 -4 7" fill="none" stroke="${fill}" stroke-width="4" stroke-linecap="round" /><circle cx="160" cy="95" r="3.5" fill="${fill}" />`
    case 'catnip':
      return `<path d="M159 61 q13 7 13 20 q-15 2 -21 -10 q-5 -11 8 -10z" fill="#78a95b" opacity="0.95" /><path d="M160 63 q-2 17 -1 28" fill="none" stroke="#507a39" stroke-width="2.6" stroke-linecap="round" />`
    default:
      return ''
  }
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
