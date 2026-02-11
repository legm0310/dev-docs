---
title: 02 ecdsa accounts
order: 3
---

# 02 ecdsa accounts

ECDSA (Elliptic Curve Digital Signature Algorithm) accounts are the traditional Ethereum-compatible account type, using secp256k1 elliptic curve cryptography.

## Overview

ECDSA accounts provide maximum compatibility with the existing Ethereum ecosystem while maintaining classical cryptographic security.

## Technical Specifications

### Key Sizes

| Component             | Size                | Format                             |
| --------------------- | ------------------- | ---------------------------------- |
| **Private Key**       | 32 bytes (256 bits) | Hex string (64 characters)         |
| **Public Key**        | 64 bytes (512 bits) | Uncompressed (without 0x04 prefix) |
| **Public Key (Full)** | 65 bytes            | Uncompressed (with 0x04 prefix)    |
| **Address**           | 20 bytes (160 bits) | Hex string with 0x prefix          |

### Address Derivation

```
Address = keccak256(PublicKey)[12:32]
         = Last 20 bytes of Keccak256 hash
```

**Example:**

```
Public Key: 0x04a1b2c3d4e5f6...
Keccak256: 0x1234567890abcdef... (32 bytes)
Address:   0x7890abcdef... (last 20 bytes)
```

### Signature Format

| Component | Size     | Description                  |
| --------- | -------- | ---------------------------- |
| **R**     | 32 bytes | Signature component R        |
| **S**     | 32 bytes | Signature component S        |
| **V**     | 1 byte   | Recovery ID (27, 28, or 35+) |
| **Total** | 65 bytes | Complete signature           |

**Recovery ID (V):**

- `27` or `28`: Pre-EIP-155 (legacy)
- `35 + chainId*2` or `36 + chainId*2`: EIP-155 (chain-specific)

## Address Format

### Standard Format

```
0x742d35Cc6634C0532925a3b844Bc9e7595f8b2a1
```

- **Prefix**: `0x` (hexadecimal)
- **Length**: 40 hex characters (20 bytes)
- **Case**: Case-insensitive (checksummed addresses use mixed case)

### Checksummed Format (EIP-55)

```
0x742d35Cc6634C0532925a3b844Bc9e7595f8b2a1
```

Mixed case provides error detection for typos.

## When to Use ECDSA Accounts

### ✅ Use ECDSA When:

{% stepper %}
{% step %}

### Maximum Compatibility Required

- Interacting with existing Ethereum dApps
- Using standard Ethereum tools (MetaMask, Remix, etc.)
- Deploying to Ethereum mainnet or testnets
  {% endstep %}

{% step %}

### Classical Security is Sufficient

- Short-term transactions
- Low-value operations
- When quantum threat is not immediate concern
  {% endstep %}

{% step %}

### Gas Cost Optimization

- ECDSA signatures are smallest (65 bytes)
- Lowest gas costs for transactions
- Efficient for high-frequency operations
  {% endstep %}

{% step %}

### Existing Infrastructure

- Migrating existing Ethereum accounts
- Using existing smart contracts
- Maintaining backward compatibility
  {% endstep %}
  {% endstepper %}

### ❌ Don't Use ECDSA When:

{% stepper %}
{% step %}

### Long-Term Security Required

- Storing high-value assets long-term
- Planning for quantum computing era
- Need quantum-resistant cryptography
  {% endstep %}

{% step %}

### PQC-Only Networks

- Networks that require PQC signatures
- Networks that don't support ECDSA
  {% endstep %}

{% step %}

### Maximum Security Needed

- Defense against both classical and quantum attacks
- Critical infrastructure
- Regulatory compliance requiring quantum resistance
  {% endstep %}
  {% endstepper %}

## Security Considerations

### Classical Security

- **Current Status**: ✅ Secure against classical attacks
- **Security Level**: \~128-bit classical security
- **Attack Resistance**: Resistant to all known classical attacks

### Quantum Vulnerability

- **Grover's Algorithm**: Reduces security to \~128-bit (still secure for now)
- **Shor's Algorithm**: Can break ECDSA if quantum computers become powerful enough
- **Timeline**: Estimated 10-30 years before practical quantum attacks

### Best Practices

{% stepper %}
{% step %}

### Use Strong Randomness

Ensure private keys are generated with cryptographically secure random number generators
{% endstep %}

{% step %}

### Secure Storage

Encrypt private keys with strong passwords
{% endstep %}

{% step %}

### Never Share Private Keys

Private keys should never be transmitted or stored insecurely
{% endstep %}

{% step %}

### Regular Backups

Maintain secure backups of private keys and recovery phrases
{% endstep %}
{% endstepper %}

## Account Creation

### From Random Generation

{% code title="Example" %}

```javascript
// Create new ECDSA account
const account = await createECDSAAccount(password);
```

{% endcode %}

### From Mnemonic

{% code title="Example" %}

```javascript
// Derive ECDSA account from mnemonic
const account = await createECDSAAccountFromMnemonic();
```

{% endcode %}

### From Private Key Import

{% code title="Example" %}

```javascript
// Import existing ECDSA account
const privateKey = '0x1234...'; // 64 hex characters
const account = await importECDSAAccount(privateKey, password);
```

{% endcode %}

## Transaction Signing

ECDSA transactions use standard Ethereum transaction formats:

- **LegacyTx (Type 0)**: Original transaction format
- **AccessListTx (Type 1)**: EIP-2930, includes access list
- **DynamicFeeTx (Type 2)**: EIP-1559, includes max fee and priority fee

All transaction types use 65-byte ECDSA signatures.

## Limitations

{% stepper %}
{% step %}

### No Quantum Resistance

Vulnerable to future quantum attacks
{% endstep %}

{% step %}

### Fixed Security Level

Cannot be upgraded without creating new account
{% endstep %}

{% step %}

### Signature Malleability

ECDSA signatures can be modified (mitigated by EIP-155)
{% endstep %}
{% endstepper %}

## Migration Path

If you need quantum resistance later:

{% stepper %}
{% step %}

### Create Hybrid Account

Generate new Hybrid account with both ECDSA and PQC keys
{% endstep %}

{% step %}

### Transfer Funds

Move funds from ECDSA to Hybrid account
{% endstep %}

{% step %}

### Update References

Update any dApps or contracts referencing your address
{% endstep %}
{% endstepper %}

See [Hybrid Accounts](https://doc-wallet.corenet.sbs/broken-reference) for migration details.

## Related Documentation

- [Account Comparison](https://doc-wallet.corenet.sbs/broken-reference) - Compare all account types
- [PQC Accounts](https://doc-wallet.corenet.sbs/broken-reference) - Quantum-resistant accounts
- [Hybrid Accounts](https://doc-wallet.corenet.sbs/broken-reference) - Combined ECDSA + PQC
- [When to Use Each Account Type](https://doc-wallet.corenet.sbs/broken-reference) - Decision guide
