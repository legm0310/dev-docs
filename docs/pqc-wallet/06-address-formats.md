---
title: 06 address formats
order: 7
---

# Address Formats

This page explains the different address formats used by each account type in the Konet PQC Wallet.

## Address Format Overview

| Account Type | Primary Format       | Alternative Format    | Length   |
| ------------ | -------------------- | --------------------- | -------- |
| **ECDSA**    | `0x...` (hex)        | N/A                   | 20 bytes |
| **PQC**      | `pqc1p...` (Bech32m) | `0x...` (legacy)      | 32 bytes |
| **Hybrid**   | `0x...` (hex)        | `pqch1p...` (Bech32m) | 20 bytes |

## ECDSA Address Format

### Standard Format

```
0x742d35Cc6634C0532925a3b844Bc9e7595f8b2a1
```

**Characteristics:**

- **Prefix**: `0x` (hexadecimal indicator)
- **Length**: 40 hex characters (20 bytes)
- **Case**: Case-insensitive (checksummed addresses use mixed case)
- **Encoding**: Hexadecimal
- **Derivation**: `keccak256(PublicKey)[12:32]`

### Checksummed Format (EIP-55)

```
0x742d35Cc6634C0532925a3b844Bc9e7595f8b2a1
```

**Purpose:**

- Error detection for typos
- Mixed case provides checksum validation
- Recommended for user-facing displays

### Example

```
Public Key: 0x04a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
Keccak256:  0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
Address:    0x7890abcdef1234567890abcdef1234567890abcdef
```

## PQC Address Format

### Bech32m Format (Version 1 - Recommended)

```
pqc1p5cyxnuxmeuwuvkwfem96lqzszee2rssamrj7zc4uy5sw8hgctyqsf0x3e
```

**Structure:**

```
<HRP>1<version><data><checksum>
  │   │   │      │       └── 6-character BCH checksum
  │   │   │      └── Base32 encoded 32-byte address
  │   │   └── Version byte: 'p' = version 1 (quantum-safe)
  │   └── Separator (always "1")
  └── Human-Readable Part: 'pqc' (mainnet) or 'tpqc' (testnet)
```

**Characteristics:**

- **HRP**: `pqc` (mainnet) or `tpqc` (testnet)
- **Version**: `p` (version 1, quantum-safe)
- **Length**: ~62 characters
- **Address Bytes**: 32 bytes (256 bits)
- **Encoding**: Bech32m (BIP-350)
- **Derivation**: `keccak256(DilithiumPublicKey)` (full 32 bytes)

**Security:**

- ✅ Quantum-safe (256-bit classical / ~128-bit quantum)
- ✅ Recommended for all new PQC accounts

### Legacy Bech32 Format (Version 0 - Deprecated)

```
pqc1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx
```

**Structure:**

```
<HRP>1<version><data><checksum>
  │   │   │      │       └── 6-character BCH checksum
  │   │   │      └── Base32 encoded 20-byte address
  │   │   └── Version byte: 'q' = version 0 (legacy)
  │   └── Separator (always "1")
  └── Human-Readable Part: 'pqc' (mainnet) or 'tpqc' (testnet)
```

**Characteristics:**

- **HRP**: `pqc` (mainnet) or `tpqc` (testnet)
- **Version**: `q` (version 0, legacy)
- **Length**: ~42 characters
- **Address Bytes**: 20 bytes (160 bits)
- **Encoding**: Bech32 (BIP-173)
- **Derivation**: `keccak256(DilithiumPublicKey)[12:32]` (last 20 bytes)

**Security:**

- ❌ Not quantum-safe (160-bit classical / ~80-bit quantum)
- ⚠️ **Deprecated - use Version 1 instead**

### Algorithm-Specific HRPs

For explicit algorithm identification:

| Algorithm     | HRP     | Example                                                         |
| ------------- | ------- | --------------------------------------------------------------- |
| **ML-DSA-44** | `mld44` | `mld441p5cyxnuxmeuwuvkwfem96lqzszee2rssamrj7zc4uy5sw8hgctyq...` |
| **ML-DSA-65** | `mld65` | `mld651p5cyxnuxmeuwuvkwfem96lqzszee2rssamrj7zc4uy5sw8hgctyq...` |
| **ML-DSA-87** | `mld87` | `mld871p5cyxnuxmeuwuvkwfem96lqzszee2rssamrj7zc4uy5sw8hgctyq...` |

**Testnet Variants:**

- `tmld44`, `tmld65`, `tmld87` (testnet)

### Legacy Hex Formats (Deprecated)

```
pqc_0e584654f88e7626cbd389356f8a0b147666352b
pqc256_a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890
```

**Warning**: These formats are deprecated and should not be used for new addresses.

## Hybrid Address Format

### Standard Format (ECDSA-Compatible)

```
0x742d35Cc6634C0532925a3b844Bc9e7595f8b2a1
```

**Characteristics:**

- **Format**: Standard Ethereum address (0x-prefixed hex)
- **Length**: 40 hex characters (20 bytes)
- **Derivation**: `keccak256(ECDSAPublicKey)[12:32]`
- **Compatibility**: Full Ethereum ecosystem compatibility

**Purpose:**

- Maintains backward compatibility with existing Ethereum infrastructure
- Works with all standard Ethereum tools and dApps

### Bech32m Format (PQC-Enabled)

```
pqch1p5cyxnuxmeuwuvkwfem96lqzszee2rssamrj7zc4uy5sw8hgctyq2dlhhw
```

**Structure:**

```
<HRP>1<version><data><checksum>
  │   │   │      │       └── 6-character BCH checksum
  │   │   │      └── Base32 encoded 32-byte address
  │   │   └── Version byte: 'p' = version 1 (quantum-safe)
  │   └── Separator (always "1")
  └── Human-Readable Part: 'pqch' (mainnet) or 'tpqch' (testnet)
```

**Characteristics:**

- **HRP**: `pqch` (mainnet) or `tpqch` (testnet)
- **Version**: `p` (version 1, quantum-safe)
- **Length**: ~62 characters
- **Address Bytes**: 32 bytes (256 bits)
- **Encoding**: Bech32m (BIP-350)
- **Derivation**: `keccak256(ECDSAPublicKey || DilithiumPublicKey)` (full 32 bytes)

**Note**: The wallet primarily uses ECDSA address format for Hybrid accounts to maintain compatibility.

## Address Derivation Details

### ECDSA Address

```
1. Generate ECDSA key pair
2. Get public key (64 bytes, uncompressed)
3. Hash: keccak256(publicKey) → 32 bytes
4. Take last 20 bytes: hash[12:32]
5. Format: "0x" + hex(hash[12:32])
```

### PQC Address (Version 1)

```
1. Generate Dilithium key pair
2. Get public key (1,952 bytes)
3. Hash: keccak256(publicKey) → 32 bytes
4. Use full 32 bytes (quantum-safe)
5. Encode: Bech32m("pqc", version=1, 32-byte hash)
```

### PQC Address (Version 0 - Legacy)

```
1. Generate Dilithium key pair
2. Get public key (1,952 bytes)
3. Hash: keccak256(publicKey) → 32 bytes
4. Take last 20 bytes: hash[12:32]
5. Encode: Bech32("pqc", version=0, 20-byte hash)
```

### Hybrid Address

```
1. Generate both ECDSA and Dilithium key pairs
2. Get ECDSA public key (64 bytes)
3. Hash: keccak256(ecdsaPublicKey) → 32 bytes
4. Take last 20 bytes: hash[12:32]
5. Format: "0x" + hex(hash[12:32])
```

## Address Validation

### ECDSA Address Validation

- ✅ Starts with `0x`
- ✅ Exactly 40 hex characters after `0x`
- ✅ Valid hexadecimal characters (0-9, a-f, A-F)
- ✅ Optional: EIP-55 checksum validation

### PQC Address Validation

- ✅ Valid HRP (`pqc`, `tpqc`, `mld44`, `mld65`, `mld87`, etc.)
- ✅ Contains exactly one `1` separator
- ✅ Valid Bech32/Bech32m character set
- ✅ Valid checksum (Bech32 for v0, Bech32m for v1+)
- ✅ Correct payload length (20 bytes for v0, 32 bytes for v1)

### Hybrid Address Validation

- ✅ ECDSA format: Same as ECDSA validation
- ✅ Bech32m format: Same as PQC validation with `pqch`/`tpqch` HRP

## Address Conversion

### PQC: Legacy to Bech32m

```javascript
// Convert legacy 20-byte address to 32-byte Bech32m
// Note: Requires original public key (cannot convert address alone)
const publicKey = ...; // Original Dilithium public key
const address32 = keccak256(publicKey); // Full 32 bytes
const bech32m = encodePQCAddress("pqc", 1, address32);
```

### Hybrid: ECDSA to Bech32m

```javascript
// Convert ECDSA address to Hybrid Bech32m
// Note: Requires both public keys
const combined = ecdsaPublicKey.concat(dilithiumPublicKey);
const address32 = keccak256(combined); // Full 32 bytes
const bech32m = encodePQCAddress('pqch', 1, address32);
```

## Best Practices

1. **Use Version 1 Addresses**: Always use 32-byte Bech32m addresses for PQC accounts
2. **Validate Before Use**: Always validate address format before transactions
3. **Display Checksummed**: Use EIP-55 checksummed format for ECDSA addresses
4. **Preserve Format**: Maintain address format when copying/storing
5. **Network Awareness**: Use correct HRP for mainnet vs testnet

## Related Documentation

- [ECDSA Accounts](/docs/pqc-wallet/02-ecdsa-accounts.md) - ECDSA account details
- [PQC Accounts](/docs/pqc-wallet/03-pqc-accounts.md) - PQC account details
- [Hybrid Accounts](/docs/pqc-wallet/04-hybrid-accounts.md) - Hybrid account details
- [Account Comparison](/docs/pqc-wallet/05-account-comparison.md) - Compare all account types
