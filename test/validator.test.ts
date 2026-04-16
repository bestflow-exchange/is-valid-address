import { describe, it, expect } from 'vitest'
import {
  validateAddress,
  detectAddressChain,
  validateAddressMulti,
  validateAddressBatch,
  isValidForAnyChain,
  isValidForAllChains
} from '../src/validator'
import { ChainType } from '../src/types'
import {
  getAllChains
} from '../src/regex'

describe('Address Validation', () => {
  describe('validateAddress', () => {
    describe('Ethereum (ETH)', () => {
      const chain: ChainType = 'ETH'

      it('should validate correct EVM addresses', () => {
        const validAddresses = [
          '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })

      it('should reject invalid EVM addresses', () => {
        const invalidAddresses = [
          '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF', // too short
          '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF22', // too long
          'd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', // missing 0x
          '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DG2', // invalid hex char
          '0xGhfghfghfghfghfghfghfghfghfghfghfghg' // invalid hex
        ]

        invalidAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(false)
        })
      })
    })

    describe('Solana (SOL)', () => {
      const chain: ChainType = 'SOL'

      it('should validate correct Solana addresses', () => {
        const validAddresses = [
          'As9sJJkxjwobsHS3W1RqCUiCY8tTvyvQzVFA4WEjd4NS'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })

      it('should reject invalid Solana addresses', () => {
        const invalidAddresses = [
          '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', // EVM format
          'As9sJJkxjwobsHS3W1RqCUiCY8tTvyvQzVFA4WEjd4NSS',
          'Sol123'
        ]

        invalidAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(false)
        })
      })
    })

    describe('Bitcoin (BTC)', () => {
      const chain: ChainType = 'BTC'

      it('should validate correct Bitcoin addresses', () => {
        const validAddresses = [
          '1G9G2jhagYANVyzWMZvCmjmccBsvWbYUha',
          'bc1q5cvu93zcp64nlzjzpexl3a6a74lkr7vs3zd99x',
          'bc1p4sdjmaf26s0js99apk8vathq07f7zjt7n4l47mtfun80smgnt3vq6n265z'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })

      it('should reject invalid Bitcoin addresses', () => {
        const invalidAddresses = [
          '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2',
          '2G9G2jhagYANVyzWMZvCmjmccBsvWbYUha', // invalid legacy prefix
          '1G9G2jhagYANVyzWMZvCmjmccBsvWbYUha0', // base58 excludes 0
          'bc1q5cvu93zcp64nlzjzpexl3a6a74lkr7vs3zd99!', // invalid symbol
          'bc2q5cvu93zcp64nlzjzpexl3a6a74lkr7vs3zd99x', // invalid bech32 prefix
          'bc1p4sdjmaf26s0js99apk8vathq07f7zjt7n4l47mtfun80smgnt3vq6n265z#' // invalid symbol
        ]

        invalidAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(false)
        })
      })
    })

    describe('Dogecoin (DOGE)', () => {
      const chain: ChainType = 'DOGE'

      it('should validate correct Dogecoin addresses', () => {
        const validAddresses = [
          'DCKhnSC5vTzmkaGBXdtSWTA8CSWeMjksfM'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })

      it('should reject invalid Dogecoin addresses', () => {
        const invalidAddresses = [
          'DCKhnSC5vTzmkaGBXdtSWTA8CSWeMjksf0', // base58 excludes 0
          'DCKhnSC5vTzmkaGBXdtSWTA8CSWeMjksfI', // base58 excludes I
          'XCKhnSC5vTzmkaGBXdtSWTA8CSWeMjksfM' // invalid prefix
        ]

        invalidAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(false)
        })
      })
    })

    describe('Bitcoin Cash (BCH)', () => {
      const chain: ChainType = 'BCH'

      it('should validate correct Bitcoin Cash addresses', () => {
        const validAddresses = [
          '1AfobFZTPvKU6uHkzKLufrsZTZoMusGA3H'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })
    })

    describe('Zcash (ZEC)', () => {
      const chain: ChainType = 'ZEC'

      it('should validate correct Zcash addresses', () => {
        const validAddresses = [
          't1Sn2aV2Z3nV6LZbzZju6sk2Bur2cPo999r' // Transparent
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })
    })

    describe('Monero (XMR)', () => {
      const chain: ChainType = 'XMR'

      it('should validate correct Monero addresses', () => {
        const validAddresses = [
          '4AfUP827TeRZ1cck3tZThgZbRCEwBrpcJTkA1LCiyFVuMH4b5y59bKMZHGb9y58K3gSjWDCBsB4RkGsGDhsmMG5R2qmbLeW'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })
    })

    describe('Litecoin (LTC)', () => {
      const chain: ChainType = 'LTC'

      it('should validate correct Litecoin addresses', () => {
        const validAddresses = [
          'ltc1qmm8nm4567yqffe98alx558uvxcjy0djghdeeae'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })
    })

    describe('Tron (TRX)', () => {
      const chain: ChainType = 'TRX'

      it('should validate correct Tron addresses', () => {
        const validAddresses = [
          'TFBkqueKVeGHGDtvy8LGuYa33PKkH4jqYJ'
        ]

        validAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(true)
        })
      })

      it('should reject invalid Tron addresses', () => {
        const invalidAddresses = [
          '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', // EVM format
          'TFBkqueKVeGHGDtvy8LGuYa33PKkH4jqY',
          'TFBkqueKVeGHGDtvy8LGuYa33PKkH4jqYJJ',
          'TFBkqueKVeGHGDtvy8LGuYa33PKkH4jqY0'
        ]

        invalidAddresses.forEach((address) => {
          expect(validateAddress(address, chain)).toBe(false)
        })
      })
    })

    describe('Edge cases', () => {
      it('should handle empty string', () => {
        expect(validateAddress('', 'ETH')).toBe(false)
      })

      it('should handle whitespace only', () => {
        expect(validateAddress(' ', 'ETH')).toBe(false)
      })

      it('should handle trimmed whitespace', () => {
        expect(validateAddress(' 0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2 ', 'ETH')).toBe(true)
      })

      it('should handle null/undefined gracefully', () => {
        expect(validateAddress(null as unknown as string, 'ETH')).toBe(false)
        expect(validateAddress(undefined as unknown as string, 'ETH')).toBe(false)
      })
    })
  })

  describe('detectAddressChain', () => {
    it('should detect EVM address format', () => {
      const chains = detectAddressChain('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2')
      expect(chains).toContain('ETH')
    })

    it('should detect Solana address', () => {
      const chains = detectAddressChain('As9sJJkxjwobsHS3W1RqCUiCY8tTvyvQzVFA4WEjd4NS')
      expect(chains).toContain('SOL')
    })

    it('should detect Tron address', () => {
      const chains = detectAddressChain('TFBkqueKVeGHGDtvy8LGuYa33PKkH4jqYJ')
      expect(chains).toContain('TRX')
    })

    it('should return empty array for invalid address', () => {
      expect(detectAddressChain('invalidaddress123')).toEqual([])
    })

    it('should handle null, undefined and whitespace input', () => {
      expect(detectAddressChain(null as unknown as string)).toEqual([])
      expect(detectAddressChain(undefined as unknown as string)).toEqual([])
      expect(detectAddressChain('   ')).toEqual([])
    })

    it('should return multiple chains when address matches multiple formats', () => {
      // An address that could theoretically match multiple chain formats
      const chains = detectAddressChain('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2')
      expect(Array.isArray(chains)).toBe(true)
      expect(chains.length).toBeGreaterThan(0)
    })
  })

  describe('validateAddressMulti', () => {
    it('should validate against multiple chains', () => {
      const result = validateAddressMulti('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', ['ETH', 'TRX', 'BTC'])

      expect(result.ETH).toBe(true)
      expect(result.TRX).toBe(false)
      expect(result.BTC).toBe(false)
    })

    it('should validate against all chains by default', () => {
      const result = validateAddressMulti('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2')
      expect(Object.keys(result).length).toBe(9)
    })

    it('should return false for all requested chains when input is empty', () => {
      const result = validateAddressMulti('   ', ['ETH', 'TRX', 'BTC'])
      expect(result).toEqual({
        ETH: false,
        TRX: false,
        BTC: false
      })
    })
  })

  describe('validateAddressBatch', () => {
    it('should validate multiple addresses', () => {
      const addresses = [
        '0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2',
        'invalid',
        '0x0000000000000000000000000000000000000000'
      ]

      const results = validateAddressBatch(addresses, 'ETH')

      expect(results).toEqual([true, false, true])
    })

    it('should throw error for non-array input', () => {
      expect(() =>
        validateAddressBatch('single' as unknown as string[], 'ETH')
      ).toThrow('Addresses must be provided as an array')
    })

    it('should return empty array for empty input array', () => {
      expect(validateAddressBatch([], 'ETH')).toEqual([])
    })
  })

  describe('isValidForAnyChain', () => {
    it('should return true if valid for at least one chain', () => {
      expect(isValidForAnyChain('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', ['ETH', 'TRX', 'BTC'])).toBe(true)
    })

    it('should return false if not valid for any chain', () => {
      expect(isValidForAnyChain('invalid', ['ETH', 'TRX', 'BTC'])).toBe(false)
    })

    it('should return false for empty chain list', () => {
      expect(isValidForAnyChain('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', [])).toBe(false)
    })
  })

  describe('isValidForAllChains', () => {
    it('should return true only if valid for all chains', () => {
      expect(isValidForAllChains('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', ['ETH', 'ETH'])).toBe(true)
      expect(isValidForAllChains('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', ['ETH', 'TRX'])).toBe(false)
    })

    it('should return false for invalid or empty input regardless of chains', () => {
      expect(isValidForAllChains('invalid', ['ETH'])).toBe(false)
      expect(isValidForAllChains('   ', ['ETH'])).toBe(false)
    })

    it('should return false for valid input with empty chain list', () => {
      expect(isValidForAllChains('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', [])).toBe(false)
    })
  })
})

describe('Regex Module', () => {
  describe('getAllChains', () => {
    it('should return all supported chains', () => {
      const chains = getAllChains()

      expect(chains).toContain('ETH')
      expect(chains).toContain('SOL')
      expect(chains).toContain('BTC')
      expect(chains).toContain('DOGE')
      expect(chains).toContain('BCH')
      expect(chains).toContain('ZEC')
      expect(chains).toContain('XMR')
      expect(chains).toContain('LTC')
      expect(chains).toContain('TRX')
      expect(chains.length).toBe(9)
    })
  })
})
