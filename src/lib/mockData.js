export const CHAINS = ['ETH', 'SOL', 'ARB', 'BASE', 'AVAX', 'OP', 'BNB']

export const TOKENS = [
  'PEPE', 'WIF', 'BONK', 'TURBO', 'DEGEN',
  'BRETT', 'MOG', 'FLOKI', 'BOME', 'POPCAT',
  'MOTHER', 'GOAT', 'PNUT', 'CHILLGUY', 'SPX',
  'MOODENG', 'NEIRO', 'FRED', 'AERO', 'MORPHO',
  'TRUMP', 'MELANIA', 'FARTCOIN', 'AI16Z', 'VIRTUAL',
]

export const PAIRS = ['USDC', 'USDT', 'ETH', 'SOL', 'BNB']

export const SIGNAL_TYPES = {
  EARLY: 'EARLY MOMENTUM',
  LATE: 'TOO LATE',
  EXIT: 'EXIT SIGNAL',
}

const REASONINGS = {
  'EARLY MOMENTUM': [
    'Wallet cohort +340 in 4 min. Liquidity holding strong.',
    'Inflow velocity 4.2× baseline. Smart money entering.',
    'Cross-chain bridge activity spiked. Pre-move pattern confirmed.',
    'DEX volume 6× 24h avg. Price hasn\'t caught up yet.',
    'Top 20 wallet cluster accumulating quietly.',
    'On-chain metrics diverging upward. Breakout window open.',
    'Funding rate neutral, volume asymmetric. Spot-led move.',
    'LP depth deepening while price compresses. Coiling.',
  ],
  'TOO LATE': [
    'Price +180% in 40 min. Late entrants fund the exit.',
    'Influencer posts detected. Signal already priced in.',
    'Volume peaked 12 min ago. Risk/reward unfavorable.',
    'Retail FOMO incoming. Smart money already trimming.',
    'Social mentions 40× baseline. Euphoria phase active.',
    'Bid-side thinning on order books. Momentum weakening.',
    'Top holder wallets rotating out. Pattern confirmed.',
  ],
  'EXIT SIGNAL': [
    'Wallet cohort shrinking. −180 holders in 2 min.',
    'Liquidity removal from top 3 LPs. Exit incoming.',
    'On-chain divergence from price. Distribution active.',
    'Bridge outflows accelerating. Window closing fast.',
    'Dev wallet movement detected. High caution.',
    'Funding rate spike + volume drop. Trap pattern.',
    'Large wallet transferred to CEX. Prepare for pressure.',
  ],
}

export const TYPE_CONFIG = {
  'EARLY MOMENTUM': {
    accent: '#00FFC8',
    glow: 'rgba(0,255,200,0.10)',
    glowHover: 'rgba(0,255,200,0.18)',
    borderHover: 'rgba(0,255,200,0.22)',
    label: 'EARLY',
  },
  'TOO LATE': {
    accent: '#FFB800',
    glow: 'rgba(255,184,0,0.10)',
    glowHover: 'rgba(255,184,0,0.18)',
    borderHover: 'rgba(255,184,0,0.22)',
    label: 'LATE',
  },
  'EXIT SIGNAL': {
    accent: '#FF3364',
    glow: 'rgba(255,51,100,0.10)',
    glowHover: 'rgba(255,51,100,0.18)',
    borderHover: 'rgba(255,51,100,0.22)',
    label: 'EXIT',
  },
}

const WINDOWS = ['1 MIN', '2 MIN', '3 MIN', '5 MIN', '8 MIN']

let _counter = 0

function weightedType() {
  const r = Math.random()
  if (r < 0.45) return SIGNAL_TYPES.EARLY
  if (r < 0.75) return SIGNAL_TYPES.LATE
  return SIGNAL_TYPES.EXIT
}

export function generateSignal() {
  const type = weightedType()
  const token = TOKENS[Math.floor(Math.random() * TOKENS.length)]
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)]
  const chain = CHAINS[Math.floor(Math.random() * CHAINS.length)]
  const reasonList = REASONINGS[type]
  const reasoning = reasonList[Math.floor(Math.random() * reasonList.length)]
  const confidence = Math.floor(62 + Math.random() * 35)
  const window = WINDOWS[Math.floor(Math.random() * WINDOWS.length)]
  const isExit = type === SIGNAL_TYPES.EXIT
  const isLate = type === SIGNAL_TYPES.LATE

  return {
    id: `s-${++_counter}-${Date.now()}`,
    type,
    token: `${token}/${pair}`,
    chain,
    reasoning,
    confidence,
    window,
    timestamp: Date.now(),
    inflowVelocity: `${(1.4 + Math.random() * 7.5).toFixed(1)}×`,
    walletGrowth: `${isExit ? '−' : '+'}${Math.floor(40 + Math.random() * 480)}`,
    liquidityChange: `${isExit || isLate ? '−' : '+'}${Math.floor(4 + Math.random() * 48)}%`,
  }
}
