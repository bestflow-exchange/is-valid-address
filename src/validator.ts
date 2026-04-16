import { getRegexPattern, getAllChains } from './regex'
import { type ChainType } from './types'

function normalizeAddress (address: string): string | null {
  if (typeof address !== 'string') {
    return null
  }

  const trimmed = address.trim()
  return trimmed.length > 0 ? trimmed : null
}

/**
 * Validate a cryptocurrency address for a specific chain.
 */
export function validateAddress (address: string, chain: ChainType): boolean {
  const normalizedAddress = normalizeAddress(address)

  if (normalizedAddress == null) {
    return false
  }

  return getRegexPattern(chain).test(normalizedAddress)
}

/**
 * Detect which chain(s) a cryptocurrency address is valid for.
 *
 * Note: This returns all chains where the address matches the format.
 */
export function detectAddressChain (address: string): ChainType[] {
  const normalizedAddress = normalizeAddress(address)

  if (normalizedAddress == null) {
    return []
  }

  const matchingChains: ChainType[] = []

  for (const chain of getAllChains()) {
    if (getRegexPattern(chain).test(normalizedAddress)) {
      matchingChains.push(chain)
    }
  }

  return matchingChains
}

/**
 * Validate an address against multiple chains.
 */
export function validateAddressMulti (
  address: string,
  chains: readonly ChainType[] = getAllChains()
): Partial<Record<ChainType, boolean>> {
  const normalizedAddress = normalizeAddress(address)
  const result: Partial<Record<ChainType, boolean>> = {}

  for (const chain of chains) {
    result[chain] = normalizedAddress != null && getRegexPattern(chain).test(normalizedAddress)
  }

  return result
}

/**
 * Batch-validate multiple addresses against the same chain.
 */
export function validateAddressBatch (
  addresses: readonly string[],
  chain: ChainType
): boolean[] {
  if (!Array.isArray(addresses)) {
    throw new TypeError('Addresses must be provided as an array')
  }

  return addresses.map((address) => validateAddress(address, chain))
}

/**
 * Check if an address is valid for any of the provided chains.
 */
export function isValidForAnyChain (address: string, chains: readonly ChainType[]): boolean {
  const normalizedAddress = normalizeAddress(address)

  if (normalizedAddress == null) {
    return false
  }

  return chains.some((chain) => getRegexPattern(chain).test(normalizedAddress))
}

/**
 * Check if an address is valid for all of the provided chains.
 */
export function isValidForAllChains (address: string, chains: readonly ChainType[]): boolean {
  const normalizedAddress = normalizeAddress(address)

  if (normalizedAddress == null || chains.length === 0) {
    return false
  }

  return chains.every((chain) => getRegexPattern(chain).test(normalizedAddress))
}
