/**
 * Crypto Address Validator.
 * Lightweight TypeScript library for format-level cryptocurrency address validation across multiple chains.
 */

// Types and constants
export { CHAINS, type ChainType } from './types'

// Core validation functions
export {
  validateAddress,
  detectAddressChain,
  validateAddressMulti,
  validateAddressBatch,
  isValidForAnyChain,
  isValidForAllChains
} from './validator'

// Utility functions
export { getAllChains } from './regex'
