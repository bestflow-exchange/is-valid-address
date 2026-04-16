import { CHAINS, type ChainType } from './types'

/**
 * Regular expressions for address validation across different blockchain networks.
 * These regexes validate format only (not checksums/network state).
 */
const PATTERN_SOURCES: Record<ChainType, string> = {
  // Ethereum and all EVM-compatible chains (Polygon, BSC, Arbitrum, Optimism, etc.)
  ETH: '^0x[0-9A-Fa-f]{40}$',

  // Solana base58 public key (32-byte key encoded to 32-44 chars)
  SOL: '^[1-9A-HJ-NP-Za-km-z]{32,44}$',

  // Bitcoin legacy (P2PKH/P2SH) and Bech32 (bc1q/bc1p)
  BTC: '^(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1(?:q|p)[0-9A-Za-z]{37,62})$',

  // Dogecoin (legacy prefixes D/A/9)
  DOGE: '^(?:D|A|9)[a-km-zA-HJ-NP-Z1-9]{33,34}$',

  // Bitcoin Cash legacy and simple cashaddr payload fallback
  BCH: '^(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|[0-9A-Za-z]{42})$',

  // Zcash (transparent t-addresses and shielded u-addresses)
  ZEC: '^(?:t[a-zA-Z0-9]{34}|u1[a-zA-Z0-9]{100,300})$',

  // Monero (standard addresses start with 4, integrated with 8)
  XMR: '^[48][A-Za-z0-9]{94}(?:[A-Za-z0-9]{11})?$',

  // Litecoin legacy and native SegWit
  LTC: '^(?:(?:L|M|3)[A-Za-z0-9]{33}|ltc1[0-9A-Za-z]{39})$',

  // Tron
  TRX: '^T[1-9A-HJ-NP-Za-km-z]{33}$'
}

const REGEX_PATTERNS: Record<ChainType, RegExp> = Object.fromEntries(
  CHAINS.map((chain) => [chain, new RegExp(PATTERN_SOURCES[chain])])
) as Record<ChainType, RegExp>

/**
 * Get the compiled regex pattern for a specific chain.
 */
export function getRegexPattern (chain: ChainType): RegExp {
  return REGEX_PATTERNS[chain]
}

/**
 * Get all supported chains.
 */
export function getAllChains (): readonly ChainType[] {
  return [...CHAINS]
}
