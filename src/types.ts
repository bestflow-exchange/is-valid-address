/**
 * Supported blockchain networks for address validation.
 */
export const CHAINS = [
  'ETH',
  'SOL',
  'BTC',
  'DOGE',
  'BCH',
  'ZEC',
  'XMR',
  'LTC',
  'TRX'
] as const

export type ChainType = typeof CHAINS[number]
