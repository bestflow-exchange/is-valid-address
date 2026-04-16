# Crypto Address Validator

Lightweight TypeScript library for format-level cryptocurrency address validation across multiple chains.

## Features

- **9 Supported Chains**: Ethereum, Solana, Bitcoin, Dogecoin, Bitcoin Cash, Zcash, Monero, Litecoin, Tron
- **TypeScript Support**: Full TypeScript types included
- **Auto-Detection**: Automatically detect which chain(s) an address is valid for
- **Chain Validation**: Validate addresses against specific chains
- **Batch Validation**: Validate multiple addresses at once
- **EVM Compatible**: Ethereum and all EVM-compatible chains share the same address format

> This package validates **address format only**. It does not validate on-chain existence or checksum semantics beyond regex-level rules

## Installation

```bash
npm install is-valid-address
```

## Usage

### Validate Address

```typescript
import { validateAddress } from 'is-valid-address';

validateAddress('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', 'ETH'); // true
validateAddress('invalid', 'ETH'); // false
```

### Detect Chain

```typescript
import { detectAddressChain } from 'is-valid-address';

detectAddressChain('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2'); // ['ETH']
detectAddressChain('invalid'); // []
```

### Validate Against Multiple Chains

```typescript
import { validateAddressMulti } from 'is-valid-address';

validateAddressMulti('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', ['ETH', 'TRX']);
// { ETH: true, TRX: true }
```

### Batch Validation

```typescript
import { validateAddressBatch } from 'is-valid-address';

validateAddressBatch(['0xd264...', 'invalid', '0x000...'], 'ETH');
// [true, false, true]
```

### Check if Valid for Any/All Chains

```typescript
import { isValidForAnyChain, isValidForAllChains } from 'is-valid-address';

isValidForAnyChain('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', ['ETH', 'TRX']); // true
isValidForAllChains('0xd2644255cFAA94F881F0e26eCeFC0F1a85C66DF2', ['ETH', 'ETH']); // true
```

## Supported Chains

| Symbol | Name |
|--------|------|
| ETH | Ethereum |
| SOL | Solana |
| BTC | Bitcoin |
| DOGE | Dogecoin |
| BCH | Bitcoin Cash |
| ZEC | Zcash |
| XMR | Monero |
| LTC | Litecoin |
| TRX | Tron |

## API Reference

### `validateAddress(address: string, chain: ChainType): boolean`

Validates an address for a specific chain.

### `detectAddressChain(address: string): ChainType[]`

Automatically detects which chain(s) an address is valid for.

### `validateAddressMulti(address: string, chains?: ChainType[]): Partial<Record<ChainType, boolean>>`

Validates an address against multiple chains or all chains if not specified.

### `validateAddressBatch(addresses: string[], chain: ChainType): boolean[]`

Validates multiple addresses against the same chain.

### `isValidForAnyChain(address: string, chains: ChainType[]): boolean`

Checks if an address is valid for at least one of the provided chains.

### `isValidForAllChains(address: string, chains: ChainType[]): boolean`

Checks if an address is valid for all of the provided chains.

## Types

```typescript
type ChainType = 'ETH' | 'SOL' | 'BTC' | 'DOGE' | 'BCH' | 'ZEC' | 'XMR' | 'LTC' | 'TRX';
```

## License

MIT
