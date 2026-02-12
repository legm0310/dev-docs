---
title: 04 hybrid accounts
order: 5
---

# Hybrid Accounts

Hybrid accounts combine both ECDSA and PQC (ML-DSA-65) cryptography, providing defense against both classical and quantum attacks while maintaining full Ethereum compatibility.

## Overview

Hybrid accounts are the recommended migration path for users who need quantum resistance without sacrificing compatibility with the existing Ethereum ecosystem.

## Technical Specifications

### Key Sizes

| Component             | Size                      | Format                        |
| --------------------- | ------------------------- | ----------------------------- |
| **ECDSA Private Key** | 32 bytes (256 bits)       | Hex string (64 characters)    |
| **ECDSA Public Key**  | 64 bytes (512 bits)       | Uncompressed (without 0x04)   |
| **PQC Private Key**   | 4,032 bytes (32,256 bits) | Hex string (8,064 characters) |
| **PQC Public Key**    | 1,952 bytes (15,616 bits) | Binary/Hex format             |
| **Total Private Key** | 4,064 bytes               | Combined storage              |
| **Total Public Key**  | 2,016 bytes               | Combined storage              |
| **Address**           | 20 bytes (160 bits)       | Hex format (0x...)            |
| **ECDSA Signature**   | 65 bytes                  | Standard ECDSA                |
| **PQC Signature**     | 3,309 bytes               | ML-DSA-65                     |
| **Total Signature**   | 3,374 bytes               | Both signatures               |

### Address Derivation

Hybrid accounts use **ECDSA address** for backward compatibility:

```
Hybrid Address = keccak256(ECDSAPublicKey)[12:32]
                = Last 20 bytes of ECDSA public key hash
                = Standard Ethereum address format (0x...)
```

**Alternative (Not Used):**

```
Hybrid Address = keccak256(ECDSAPublicKey || DilithiumPublicKey)[12:32]
```

The wallet uses ECDSA address derivation to maintain compatibility with existing Ethereum infrastructure.

### Signature Format

Hybrid transactions require **both** signatures:

| Component          | Size         | Description               |
| ------------------ | ------------ | ------------------------- |
| **ECDSA V**        | 1 byte       | Recovery ID               |
| **ECDSA R**        | 32 bytes     | ECDSA signature component |
| **ECDSA S**        | 32 bytes     | ECDSA signature component |
| **PQC Public Key** | 1,952 bytes  | Included in transaction   |
| **PQC Signature**  | 3,309 bytes  | Dilithium signature       |
| **Total Overhead** | ~5,326 bytes | Per transaction           |

**Both signatures must be valid** for the transaction to be accepted.

## Address Format

### Standard Format (ECDSA-Compatible)

```
0x742d35Cc6634C0532925a3b844Bc9e7595f8b2a1
```

- **Format**: Standard Ethereum address (0x-prefixed hex)
- **Length**: 40 hex characters (20 bytes)
- **Compatibility**: Full Ethereum ecosystem compatibility

### Bech32m Format (PQC-Enabled)

Hybrid accounts can also be represented in Bech32m format:

```
pqch1p5cyxnuxmeuwuvkwfem96lqzszee2rssamrj7zc4uy5sw8hgctyq2dlhhw
```

- **HRP**: `pqch` (mainnet) or `tpqch` (testnet)
- **Version**: `p` (version 1, quantum-safe)
- **Length**: ~62 characters
- **Encoding**: Bech32m (BIP-350)

## When to Use Hybrid Accounts

### ✅ Use Hybrid When:

1. **Migration Path Needed**
   - Upgrading from ECDSA to quantum-resistant
   - Maintaining existing address compatibility
   - Gradual transition to PQC

2. **Maximum Security Required**
   - Defense against both classical and quantum attacks
   - Critical infrastructure
   - High-value asset storage

3. **Full Compatibility Needed**
   - Must work with existing Ethereum dApps
   - Need standard Ethereum address format
   - Maintaining backward compatibility

4. **Future-Proofing**
   - Preparing for quantum computing era
   - Long-term security planning
   - Regulatory compliance

### ❌ Don't Use Hybrid When:

1. **Gas Cost Optimization**
   - High-frequency transactions
   - Cost-sensitive operations
   - Hybrid has highest gas costs (~5.3KB overhead)

2. **PQC-Only Networks**
   - Networks that only support PQC (no ECDSA)
   - Pure PQC applications
   - No need for ECDSA compatibility

3. **Simple Use Cases**
   - Temporary accounts
   - Test accounts
   - When quantum threat is not immediate

4. **Storage Constraints**
   - Limited storage for private keys (4KB+)
   - Mobile devices with storage limitations

## Security Considerations

### Dual Security Model

Hybrid accounts provide defense in depth:

1. **Classical Security (ECDSA)**
   - Protects against current classical attacks
   - Maintains compatibility with existing infrastructure
   - Standard Ethereum security model

2. **Quantum Security (PQC)**
   - Protects against future quantum attacks
   - NIST Level 3 quantum resistance
   - Long-term security guarantee

### Security Benefits

- **Defense in Depth**: Both signatures must be valid
- **Attack Resistance**: Resistant to both classical and quantum attacks
- **Future-Proof**: Ready for quantum computing era
- **Backward Compatible**: Works with existing Ethereum infrastructure

### Best Practices

1. **Secure Key Storage**: Both keys must be stored securely (4KB+ total)
2. **Backup Both Keys**: Maintain backups of both ECDSA and PQC keys
3. **Recovery Phrases**: Use mnemonic phrases that can recover both keys
4. **Network Compatibility**: Verify network supports Hybrid transactions

## Account Creation

### From Random Generation

```javascript
// Create new Hybrid account
const account = await createHybridAccount(password, keccak256);
```

### From Mnemonic

```javascript
// Derive Hybrid account from mnemonic
const account = await createHybridAccountFromMnemonic(keccak256);
```

### From Key Import

```javascript
// Import existing Hybrid account
const ecdsaPrivateKey = '0x1234...'; // 64 hex characters
const ecdsaPublicKey = '0xabcd...'; // 128 hex characters
const dilithiumSecretKey = '0x5678...'; // 8,064 hex characters
const dilithiumPublicKey = '0xef01...'; // 3,904 hex characters

const account = await importHybridAccount(
  ecdsaPrivateKey,
  ecdsaPublicKey,
  dilithiumSecretKey,
  dilithiumPublicKey,
  password,
  keccak256,
);
```

### Migration from ECDSA

```javascript
// Upgrade existing ECDSA account to Hybrid
// 1. Export ECDSA private key
// 2. Create new Hybrid account with ECDSA key
// 3. Transfer funds to new Hybrid address
```

## Transaction Signing

Hybrid transactions use HybridTx format (Type 3):

- **Transaction Type**: Type 3 (HybridTx)
- **Signature Format**: Both ECDSA and PQC signatures required
- **Validation**: Both signatures must be valid
- **Gas Cost**: Highest due to dual signatures (~5.3KB overhead)

## Gas Cost Considerations

Hybrid transactions have the highest gas costs:

| Component          | Size         | Approximate Gas Cost |
| ------------------ | ------------ | -------------------- |
| ECDSA Signature    | 65 bytes     | ~1,040 gas           |
| PQC Public Key     | 1,952 bytes  | ~31,232 gas          |
| PQC Signature      | 3,309 bytes  | ~52,944 gas          |
| **Total Overhead** | ~5,326 bytes | **~85,216 gas**      |

**Gas Cost Comparison:**

- ECDSA: ~1,040 gas
- PQC: ~84,176 gas
- Hybrid: ~85,216 gas

## Migration Scenarios

### Scenario 1: ECDSA to Hybrid

1. **Export ECDSA Private Key**: Extract from existing account
2. **Create Hybrid Account**: Generate PQC key pair, use existing ECDSA key
3. **Transfer Funds**: Move funds to new Hybrid address
4. **Update References**: Update dApps/contracts to use new address

### Scenario 2: PQC to Hybrid

1. **Export PQC Keys**: Extract Dilithium key pair
2. **Generate ECDSA Key**: Create new ECDSA key pair
3. **Create Hybrid Account**: Combine both key pairs
4. **Transfer Funds**: Move funds to Hybrid address

### Scenario 3: New Account

1. **Create Hybrid Account**: Generate both key pairs simultaneously
2. **Fund Account**: Send initial funds to Hybrid address
3. **Use Both Signatures**: All transactions require both signatures

## Limitations

1. **Highest Gas Costs**: Most expensive transaction type
2. **Largest Key Storage**: Requires storing 4KB+ of private key data
3. **Dual Signature Requirement**: Both signatures must be valid
4. **Complexity**: More complex than single-signature accounts

## Advantages

1. **Maximum Security**: Defense against both classical and quantum attacks
2. **Full Compatibility**: Works with existing Ethereum infrastructure
3. **Future-Proof**: Ready for quantum computing era
4. **Migration Path**: Smooth transition from ECDSA to quantum-resistant

## Related Documentation

- [Account Comparison](/docs/pqc-wallet/05-account-comparison.md) - Compare all account types
- [ECDSA Accounts](/docs/pqc-wallet/02-ecdsa-accounts.md) - Legacy compatible accounts
- [PQC Accounts](/docs/pqc-wallet/03-pqc-accounts.md) - Quantum-resistant accounts
- [When to Use Each Account Type](/docs/pqc-wallet/07-when-to-use.md) - Decision guide
