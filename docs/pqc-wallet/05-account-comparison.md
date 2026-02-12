---
title: 05 account comparion
order: 6
---

# Account Comparison

This page provides a comprehensive comparison of all account types supported by the Konet PQC Wallet.

## Quick Comparison Table

| Feature                    | ECDSA            | PQC                 | Hybrid                |
| -------------------------- | ---------------- | ------------------- | --------------------- |
| **Cryptography**           | secp256k1        | ML-DSA-65           | secp256k1 + ML-DSA-65 |
| **Quantum Resistance**     | ❌ No            | ✅ Yes              | ✅ Yes                |
| **Ethereum Compatibility** | ✅ Full          | ⚠️ Limited          | ✅ Full               |
| **Address Format**         | 0x... (20 bytes) | pqc1p... (32 bytes) | 0x... (20 bytes)      |
| **Private Key Size**       | 32 bytes         | 4,032 bytes         | 4,064 bytes           |
| **Public Key Size**        | 64 bytes         | 1,952 bytes         | 2,016 bytes           |
| **Signature Size**         | 65 bytes         | 3,309 bytes         | 3,374 bytes           |
| **Transaction Overhead**   | ~65 bytes        | ~5,261 bytes        | ~5,326 bytes          |
| **Gas Cost (Approx.)**     | ~1,040 gas       | ~84,176 gas         | ~85,216 gas           |
| **Signature Recovery**     | ✅ Recoverable   | ❌ Non-recoverable  | ✅ ECDSA recoverable  |
| **NIST Security Level**    | N/A              | Level 3             | Level 3 (PQC)         |
| **Classical Security**     | ~128 bits        | ~192 bits           | ~192 bits (PQC)       |
| **Quantum Security**       | ~64 bits         | ~128 bits           | ~128 bits (PQC)       |

## Detailed Specifications

### Key Sizes

#### ECDSA Account

```
Private Key:  32 bytes  (256 bits)
Public Key:   64 bytes  (512 bits, uncompressed)
Address:      20 bytes  (160 bits)
Signature:   65 bytes  (520 bits)
```

#### PQC Account

```
Private Key:  4,032 bytes  (32,256 bits)
Public Key:   1,952 bytes  (15,616 bits)
Address:      32 bytes     (256 bits, quantum-safe)
Signature:    3,309 bytes  (26,472 bits)
```

#### Hybrid Account

```
ECDSA Private Key:  32 bytes
ECDSA Public Key:   64 bytes
PQC Private Key:    4,032 bytes
PQC Public Key:     1,952 bytes
Total Private Key:  4,064 bytes
Total Public Key:  2,016 bytes
Address:            20 bytes (ECDSA-compatible)
ECDSA Signature:    65 bytes
PQC Signature:      3,309 bytes
Total Signature:    3,374 bytes
```

## Security Comparison

### Classical Security

| Account Type | Security Level  | Attack Resistance                        |
| ------------ | --------------- | ---------------------------------------- |
| **ECDSA**    | ~128 bits       | Resistant to all known classical attacks |
| **PQC**      | ~192 bits       | Resistant to all known classical attacks |
| **Hybrid**   | ~192 bits (PQC) | Resistant to all known classical attacks |

### Quantum Security

| Account Type | Quantum Security | Grover's Algorithm | Shor's Algorithm |
| ------------ | ---------------- | ------------------ | ---------------- |
| **ECDSA**    | ~64 bits         | Vulnerable         | Vulnerable       |
| **PQC**      | ~128 bits        | Resistant          | Resistant        |
| **Hybrid**   | ~128 bits (PQC)  | Resistant          | Resistant        |

### Address Security

| Address Type       | Bytes | Classical Pre-image | Quantum Pre-image | Quantum Collision |
| ------------------ | ----- | ------------------- | ----------------- | ----------------- |
| **ECDSA (0x...)**  | 20    | 160 bits            | ~80 bits          | ~53 bits          |
| **PQC (pqc1p...)** | 32    | 256 bits            | ~128 bits         | ~85 bits          |
| **Hybrid (0x...)** | 20    | 160 bits            | ~80 bits          | ~53 bits          |

## Compatibility Comparison

### Ethereum Ecosystem

| Feature                     | ECDSA  | PQC        | Hybrid |
| --------------------------- | ------ | ---------- | ------ |
| **Standard Address Format** | ✅ Yes | ❌ No      | ✅ Yes |
| **MetaMask Compatibility**  | ✅ Yes | ❌ No      | ✅ Yes |
| **Remix IDE**               | ✅ Yes | ❌ No      | ✅ Yes |
| **Standard dApps**          | ✅ Yes | ❌ No      | ✅ Yes |
| **ERC-20 Tokens**           | ✅ Yes | ⚠️ Limited | ✅ Yes |
| **Smart Contracts**         | ✅ Yes | ⚠️ Limited | ✅ Yes |

### Network Support

| Network Type             | ECDSA      | PQC    | Hybrid    |
| ------------------------ | ---------- | ------ | --------- |
| **Ethereum Mainnet**     | ✅ Yes     | ❌ No  | ⚠️ Future |
| **Ethereum Testnets**    | ✅ Yes     | ❌ No  | ⚠️ Future |
| **PQC-Enabled Networks** | ⚠️ Limited | ✅ Yes | ✅ Yes    |
| **Quorum L2**            | ✅ Yes     | ✅ Yes | ✅ Yes    |

## Performance Comparison

### Transaction Size

| Account Type | Base Transaction | Signature Overhead | Total Size   |
| ------------ | ---------------- | ------------------ | ------------ |
| **ECDSA**    | ~100 bytes       | 65 bytes           | ~165 bytes   |
| **PQC**      | ~100 bytes       | 5,261 bytes        | ~5,361 bytes |
| **Hybrid**   | ~100 bytes       | 5,326 bytes        | ~5,426 bytes |

### Gas Costs

| Operation                  | ECDSA       | PQC          | Hybrid       |
| -------------------------- | ----------- | ------------ | ------------ |
| **Signature Verification** | ~3,000 gas  | ~15,000 gas  | ~18,000 gas  |
| **Transaction Data**       | ~1,040 gas  | ~84,176 gas  | ~85,216 gas  |
| **Total (Approx.)**        | ~21,000 gas | ~210,000 gas | ~228,000 gas |

**Note**: Gas costs are approximate and vary by network.

### Storage Requirements

| Component               | ECDSA      | PQC          | Hybrid       |
| ----------------------- | ---------- | ------------ | ------------ |
| **Private Key Storage** | 32 bytes   | 4,032 bytes  | 4,064 bytes  |
| **Public Key Storage**  | 64 bytes   | 1,952 bytes  | 2,016 bytes  |
| **Account Data**        | ~200 bytes | ~6,000 bytes | ~6,200 bytes |

## Use Case Comparison

### When to Use Each Type

| Use Case                     | ECDSA   | PQC     | Hybrid  |
| ---------------------------- | ------- | ------- | ------- |
| **Maximum Compatibility**    | ✅ Best | ❌ Poor | ✅ Good |
| **Quantum Resistance**       | ❌ No   | ✅ Best | ✅ Best |
| **Gas Cost Optimization**    | ✅ Best | ❌ Poor | ❌ Poor |
| **Long-Term Security**       | ❌ Poor | ✅ Best | ✅ Best |
| **Migration Path**           | N/A     | ❌ No   | ✅ Best |
| **New Account Creation**     | ✅ Good | ✅ Good | ✅ Best |
| **Existing Account Upgrade** | N/A     | ❌ No   | ✅ Best |

## Decision Matrix

### Choose ECDSA If:

- ✅ Need maximum Ethereum compatibility
- ✅ Gas cost is a primary concern
- ✅ Short-term use (< 5 years)
- ✅ Quantum threat is not immediate

### Choose PQC If:

- ✅ Need quantum resistance
- ✅ Don't need ECDSA compatibility
- ✅ PQC-enabled network
- ✅ Long-term security (> 10 years)

### Choose Hybrid If:

- ✅ Need both quantum resistance AND compatibility
- ✅ Migrating from ECDSA
- ✅ Maximum security required
- ✅ Future-proofing critical infrastructure

## Migration Paths

### ECDSA → Hybrid

1. Export ECDSA private key
2. Create Hybrid account (use existing ECDSA key, generate PQC key)
3. Transfer funds to Hybrid address
4. **Result**: Quantum resistance + compatibility

### PQC → Hybrid

1. Export PQC keys
2. Generate ECDSA key pair
3. Create Hybrid account (combine both)
4. Transfer funds to Hybrid address
5. **Result**: Added compatibility

### Hybrid → PQC

1. Export PQC keys
2. Create PQC-only account
3. Transfer funds to PQC address
4. **Result**: Reduced gas costs (if compatibility not needed)

## Summary

| Account Type | Best For                               | Trade-offs                              |
| ------------ | -------------------------------------- | --------------------------------------- |
| **ECDSA**    | Maximum compatibility, low gas costs   | No quantum resistance                   |
| **PQC**      | Quantum resistance, long-term security | Limited compatibility, higher gas costs |
| **Hybrid**   | Best of both worlds                    | Highest gas costs, largest storage      |

## Related Documentation

- [ECDSA Accounts](/docs/pqc-wallet/02-ecdsa-accounts.md) - Detailed ECDSA specifications
- [PQC Accounts](/docs/pqc-wallet/03-pqc-accounts.md) - Detailed PQC specifications
- [Hybrid Accounts](/docs/pqc-wallet/04-hybrid-accounts.md) - Detailed Hybrid specifications
- [When to Use Each Account Type](/docs/pqc-wallet/07-when-to-use.md) - Decision guide
- [Address Formats](/docs/pqc-wallet/06-address-formats.md) - Address format details
