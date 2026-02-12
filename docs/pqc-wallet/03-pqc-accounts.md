---
title: 03 pqc accounts
order: 4
---

# PQC Accounts

PQC (Post-Quantum Cryptography) accounts use ML-DSA-65 (Dilithium3) to provide quantum-resistant security against future quantum computing attacks.

## Overview

PQC accounts are designed for long-term security in the quantum computing era. They use ML-DSA-65 (Module-Lattice Digital Signature Algorithm), which is standardized in NIST FIPS 204.

## Technical Specifications

### Key Sizes

| Component       | Size                      | Format                        |
| --------------- | ------------------------- | ----------------------------- |
| **Private Key** | 4,032 bytes (32,256 bits) | Hex string (8,064 characters) |
| **Public Key**  | 1,952 bytes (15,616 bits) | Binary/Hex format             |
| **Address**     | 32 bytes (256 bits)       | Bech32m format (pqc1p...)     |
| **Signature**   | 3,309 bytes (26,472 bits) | Binary format                 |

### ML-DSA-65 Details

- **Algorithm**: ML-DSA-65 (CRYSTALS-Dilithium3)
- **NIST Level**: Level 3
- **Classical Security**: ~192 bits
- **Quantum Security**: ~128 bits
- **Standard**: NIST FIPS 204

### Address Derivation

```
PQC Address = keccak256(DilithiumPublicKey)
             = 32 bytes (quantum-safe)
```

**Version 1 (Recommended - Quantum-Safe):**

- Uses full 32-byte hash
- Provides 256-bit classical / ~128-bit quantum security
- Format: `pqc1p...` (Bech32m)

**Version 0 (Legacy - Not Quantum-Safe):**

- Uses last 20 bytes of hash
- Provides 160-bit classical / ~80-bit quantum security
- Format: `pqc1q...` (Bech32)
- ⚠️ **Not recommended for new accounts**

### Signature Format

| Component          | Size         | Description                               |
| ------------------ | ------------ | ----------------------------------------- |
| **Public Key**     | 1,952 bytes  | Included in transaction (non-recoverable) |
| **Signature**      | 3,309 bytes  | Dilithium signature                       |
| **Total Overhead** | ~5,261 bytes | Per transaction                           |

**Key Difference from ECDSA:**

- ECDSA signatures are **recoverable** (public key derived from signature)
- PQC signatures are **non-recoverable** (public key must be included)

## Address Formats

### Bech32m Format (Version 1 - Recommended)

```
pqc1p5cyxnuxmeuwuvkwfem96lqzszee2rssamrj7zc4uy5sw8hgctyqsf0x3e
```

- **HRP**: `pqc` (mainnet) or `tpqc` (testnet)
- **Version**: `p` (version 1, quantum-safe)
- **Length**: ~62 characters
- **Encoding**: Bech32m (BIP-350)

### Legacy Bech32 Format (Version 0 - Deprecated)

```
pqc1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx
```

- **HRP**: `pqc` (mainnet) or `tpqc` (testnet)
- **Version**: `q` (version 0, legacy)
- **Length**: ~42 characters
- **Encoding**: Bech32 (BIP-173)
- ⚠️ **Not quantum-safe - use Version 1 instead**

### Algorithm-Specific HRPs

For explicit algorithm identification:

| Algorithm | HRP     | Example      |
| --------- | ------- | ------------ |
| ML-DSA-44 | `mld44` | `mld441p...` |
| ML-DSA-65 | `mld65` | `mld651p...` |
| ML-DSA-87 | `mld87` | `mld871p...` |

## When to Use PQC Accounts

### ✅ Use PQC When:

1. **Long-Term Security Required**
   - Storing high-value assets for extended periods
   - Planning for quantum computing era (10-30 years)
   - Need quantum-resistant cryptography

2. **PQC-Enabled Networks**
   - Networks that support PQC transactions
   - Networks that prioritize quantum security
   - Future-proof blockchain infrastructure

3. **Maximum Quantum Security**
   - Defense against quantum attacks
   - Regulatory compliance requiring quantum resistance
   - Critical infrastructure protection

4. **New Account Creation**
   - Creating accounts from scratch
   - No need for ECDSA compatibility
   - PQC-native applications

### ❌ Don't Use PQC When:

1. **Maximum Compatibility Required**
   - Need to interact with standard Ethereum dApps
   - Using tools that don't support PQC
   - Deploying to Ethereum mainnet (ECDSA-only)

2. **Gas Cost Optimization**
   - High-frequency transactions
   - Cost-sensitive operations
   - PQC signatures are ~80x larger than ECDSA

3. **Existing Infrastructure**
   - Migrating existing ECDSA accounts
   - Using existing smart contracts expecting ECDSA
   - Maintaining backward compatibility

4. **Short-Term Use**
   - Temporary accounts
   - Test accounts
   - When quantum threat is not immediate

## Security Considerations

### Quantum Resistance

- **Grover's Algorithm**: Address provides ~128-bit quantum pre-image resistance
- **Shor's Algorithm**: ML-DSA-65 is resistant to Shor's algorithm
- **Security Level**: NIST Level 3 (~128-bit quantum security)

### Classical Security

- **Security Level**: ~192-bit classical security
- **Attack Resistance**: Resistant to all known classical and quantum attacks
- **Longevity**: Designed to remain secure for decades

### Best Practices

1. **Use Version 1 Addresses**: Always use 32-byte Bech32m addresses (pqc1p...)
2. **Secure Key Storage**: Private keys are large (4KB) - ensure secure storage
3. **Backup Recovery**: Maintain secure backups of private keys and recovery phrases
4. **Network Compatibility**: Verify network supports PQC before using

## Account Creation

### From Random Generation

```javascript
// Create new PQC account
const account = await createPQCAccount(password, keccak256);
```

### From Mnemonic

```javascript
// Derive PQC account from mnemonic
const account = await createPQCAccountFromMnemonic(keccak256);
```

### From Key Import

```javascript
// Import existing PQC account
const secretKey = '0x1234...'; // 8,064 hex characters
const publicKey = '0xabcd...'; // 3,904 hex characters
const account = await importPQCAccount(secretKey, publicKey, password, keccak256);
```

## Transaction Signing

PQC transactions use DilithiumTx format:

- **Transaction Type**: Type 2 (DilithiumTx)
- **Signature Format**: Public key + signature included
- **Gas Cost**: Higher due to larger signature size (~5KB overhead)

## Gas Cost Considerations

PQC transactions have higher gas costs:

| Component          | Size         | Approximate Gas Cost |
| ------------------ | ------------ | -------------------- |
| Public Key         | 1,952 bytes  | ~31,232 gas          |
| Signature          | 3,309 bytes  | ~52,944 gas          |
| **Total Overhead** | ~5,261 bytes | **~84,176 gas**      |

Compare to ECDSA: ~65 bytes = ~1,040 gas

**Gas Cost Ratio**: PQC is approximately **80x** more expensive than ECDSA.

## Limitations

1. **Larger Transaction Size**: ~5KB overhead per transaction
2. **Higher Gas Costs**: Significantly more expensive than ECDSA
3. **Limited Compatibility**: Not all networks/tools support PQC
4. **Non-Recoverable Signatures**: Public key must be included in transaction

## Migration Considerations

If you need ECDSA compatibility:

1. **Create Hybrid Account**: Generate account with both ECDSA and PQC keys
2. **Transfer Funds**: Move funds from PQC to Hybrid account
3. **Maintain Security**: Hybrid provides both quantum resistance and compatibility

See [Hybrid Accounts](/docs/pqc-wallet/04-hybrid-accounts.md) for details.

## Related Documentation

- [Account Comparison](/docs/pqc-wallet/05-account-comparison.md) - Compare all account types
- [ECDSA Accounts](/docs/pqc-wallet/02-ecdsa-accounts.md) - Legacy compatible accounts
- [Hybrid Accounts](/docs/pqc-wallet/04-hybrid-accounts.md) - Combined ECDSA + PQC
- [Address Formats](/docs/pqc-wallet/06-address-formats.md) - Detailed address format guide
- [When to Use Each Account Type](/docs/pqc-wallet/07-when-to-use.md) - Decision guide
