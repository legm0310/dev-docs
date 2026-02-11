---
title: 01 overview
order: 2
---

# 01 overview

The Konet PQC Wallet supports three types of accounts, each designed for different security and compatibility requirements:

## Account Types

### 1. ECDSA Accounts (Legacy)

Traditional Ethereum-compatible accounts using secp256k1 elliptic curve cryptography.

- **Cryptography**: secp256k1 (ECDSA)
- **Security Level**: Classical security (vulnerable to quantum attacks)
- **Compatibility**: Full Ethereum ecosystem compatibility
- **Use Case**: Existing accounts, maximum compatibility

### 2. PQC Accounts (Post-Quantum)

Quantum-resistant accounts using ML-DSA-65 (Dilithium3) post-quantum cryptography.

- **Cryptography**: ML-DSA-65 (NIST FIPS 204)
- **Security Level**: NIST Level 3 (~128-bit quantum security)
- **Compatibility**: PQC-enabled networks
- **Use Case**: Future-proof quantum-safe accounts

### 3. Hybrid Accounts

Accounts that combine both ECDSA and PQC cryptography for maximum security and compatibility.

- **Cryptography**: secp256k1 (ECDSA) + ML-DSA-65 (Dilithium)
- **Security Level**: Defense against both classical and quantum attacks
- **Compatibility**: Works with both ECDSA and PQC networks
- **Use Case**: Migration path, maximum security

## Key Differences

| Feature                    | ECDSA            | PQC                 | Hybrid            |
| -------------------------- | ---------------- | ------------------- | ----------------- |
| **Quantum Resistance**     | ❌ No            | ✅ Yes              | ✅ Yes            |
| **Ethereum Compatibility** | ✅ Full          | ⚠️ Limited          | ✅ Full           |
| **Key Size**               | Small            | Large               | Largest           |
| **Signature Size**         | Small (65 bytes) | Large (~3.3 KB)     | Largest (~3.4 KB) |
| **Gas Cost**               | Low              | Higher              | Highest           |
| **Address Format**         | 0x... (20 bytes) | pqc1p... (32 bytes) | 0x... (20 bytes)  |

## Security Considerations

### Quantum Threat Timeline

- **Current**: ECDSA is secure against classical attacks
- **Future**: Quantum computers may break ECDSA (estimated 10-30 years)
- **Solution**: PQC and Hybrid accounts provide quantum resistance

### Migration Strategy

1. **Phase 1**: Continue using ECDSA for maximum compatibility
2. **Phase 2**: Create Hybrid accounts for enhanced security
3. **Phase 3**: Migrate to PQC-only when quantum threat materializes

## Next Steps

- Learn about [ECDSA Accounts](./02-ecdsa-accounts.md) for legacy compatibility
- Learn about [PQC Accounts](./03-pqc-accounts.md) for quantum resistance
- Learn about [Hybrid Accounts](./04-hybrid-accounts.md) for maximum security
- See [Account Comparison](./05-account-comparison.md) for detailed specifications
- Understand [When to Use Each Account Type](./07-when-to-use.md) for decision guidance
