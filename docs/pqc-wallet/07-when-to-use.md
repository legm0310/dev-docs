---
title: 07 when to use
order: 8
---

# When to Use Each Account Type

This guide helps you decide which account type is best for your specific use case.

## Decision Tree

```
Do you need quantum resistance?
│
├─ No → Use ECDSA Account
│       (Maximum compatibility, lowest gas costs)
│
└─ Yes → Do you need Ethereum compatibility?
         │
         ├─ No → Use PQC Account
         │       (Pure quantum resistance, PQC networks)
         │
         └─ Yes → Use Hybrid Account
                 (Quantum resistance + compatibility)
```

## Use Case Scenarios

### Scenario 1: Standard Ethereum dApp Interaction

**Requirements:**

- Interact with existing Ethereum dApps
- Use MetaMask or other standard wallets
- Deploy to Ethereum mainnet/testnets

**Recommendation:** ✅ **ECDSA Account**

**Reasoning:**

- Full compatibility with Ethereum ecosystem
- Lowest gas costs
- Standard address format (0x...)
- Works with all existing tools

**Example Use Cases:**

- DeFi interactions (Uniswap, Aave, etc.)
- NFT trading
- Standard token transfers
- Smart contract interactions

---

### Scenario 2: Long-Term Asset Storage

**Requirements:**

- Store high-value assets for 10+ years
- Protect against future quantum attacks
- Future-proof security

**Recommendation:** ✅ **PQC Account** or ✅ **Hybrid Account**

**Reasoning:**

- Quantum-resistant cryptography
- Long-term security guarantee
- NIST Level 3 security

**Choose PQC if:**

- Don't need immediate Ethereum compatibility
- PQC-enabled network
- Pure quantum security focus

**Choose Hybrid if:**

- Need both quantum resistance AND compatibility
- May need to interact with Ethereum ecosystem
- Migration from existing ECDSA account

**Example Use Cases:**

- Long-term savings accounts
- Inheritance planning
- High-value asset storage
- Regulatory compliance requiring quantum resistance

---

### Scenario 3: High-Frequency Trading

**Requirements:**

- Many transactions per day
- Gas cost optimization critical
- Fast transaction processing

**Recommendation:** ✅ **ECDSA Account**

**Reasoning:**

- Smallest signature size (65 bytes)
- Lowest gas costs (~1,040 gas per transaction)
- Fast transaction processing
- Standard Ethereum compatibility

**Example Use Cases:**

- DEX trading bots
- Arbitrage operations
- High-frequency DeFi strategies
- Cost-sensitive operations

---

### Scenario 4: Migration from Existing Account

**Requirements:**

- Upgrade existing ECDSA account
- Maintain address compatibility (if possible)
- Add quantum resistance

**Recommendation:** ✅ **Hybrid Account**

**Reasoning:**

- Can use existing ECDSA private key
- Maintains ECDSA address format (if desired)
- Adds quantum resistance
- Smooth migration path

**Migration Steps:**

1. Export existing ECDSA private key
2. Create Hybrid account (use existing ECDSA key, generate PQC key)
3. Transfer funds to Hybrid address
4. Update any dApps/contracts referencing your address

**Example Use Cases:**

- Upgrading existing wallet
- Adding quantum security to current account
- Future-proofing existing infrastructure

---

### Scenario 5: PQC-Only Network

**Requirements:**

- Network only supports PQC transactions
- No ECDSA compatibility needed
- Pure PQC environment

**Recommendation:** ✅ **PQC Account**

**Reasoning:**

- Network requirement
- No need for ECDSA compatibility
- Optimized for PQC networks
- Lower gas costs than Hybrid

**Example Use Cases:**

- PQC-native blockchain networks
- Quantum-focused applications
- Research and development
- PQC-specific protocols

---

### Scenario 6: Critical Infrastructure

**Requirements:**

- Maximum security required
- Defense against all attack vectors
- Regulatory compliance
- Long-term viability

**Recommendation:** ✅ **Hybrid Account**

**Reasoning:**

- Defense against both classical and quantum attacks
- Dual signature requirement (both must be valid)
- Maximum security guarantee
- Future-proof design

**Example Use Cases:**

- Enterprise blockchain solutions
- Government applications
- Financial infrastructure
- Critical system security

---

### Scenario 7: Development and Testing

**Requirements:**

- Quick iteration
- Low gas costs for testing
- Standard tooling compatibility

**Recommendation:** ✅ **ECDSA Account**

**Reasoning:**

- Fast development cycle
- Low gas costs for frequent testing
- Works with all development tools
- Easy to reset/recreate

**Example Use Cases:**

- Smart contract development
- dApp testing
- Prototype development
- Learning and experimentation

---

## Comparison by Priority

### Priority: Maximum Compatibility

| Rank | Account Type | Compatibility Score  |
| ---- | ------------ | -------------------- |
| 1    | **ECDSA**    | 100%                 |
| 2    | **Hybrid**   | 100% (ECDSA address) |
| 3    | **PQC**      | 20% (limited)        |

**Choose:** ECDSA or Hybrid

---

### Priority: Quantum Resistance

| Rank | Account Type | Quantum Security |
| ---- | ------------ | ---------------- |
| 1    | **PQC**      | ✅ Full          |
| 1    | **Hybrid**   | ✅ Full          |
| 3    | **ECDSA**    | ❌ None          |

**Choose:** PQC or Hybrid

---

### Priority: Gas Cost Optimization

| Rank | Account Type | Gas Cost (Approx.) |
| ---- | ------------ | ------------------ |
| 1    | **ECDSA**    | ~21,000 gas        |
| 2    | **PQC**      | ~210,000 gas       |
| 3    | **Hybrid**   | ~228,000 gas       |

**Choose:** ECDSA

---

### Priority: Long-Term Security

| Rank | Account Type | Security Level     |
| ---- | ------------ | ------------------ |
| 1    | **Hybrid**   | Maximum (dual)     |
| 2    | **PQC**      | High (quantum)     |
| 3    | **ECDSA**    | Medium (classical) |

**Choose:** Hybrid or PQC

---

### Priority: Migration Path

| Rank | Account Type | Migration Ease            |
| ---- | ------------ | ------------------------- |
| 1    | **Hybrid**   | ✅ Easy (from ECDSA)      |
| 2    | **PQC**      | ⚠️ Moderate (new account) |
| 3    | **ECDSA**    | N/A (starting point)      |

**Choose:** Hybrid

---

## Decision Matrix

| Requirement                | ECDSA  | PQC    | Hybrid |
| -------------------------- | ------ | ------ | ------ |
| **Ethereum Compatibility** | ✅✅✅ | ❌     | ✅✅✅ |
| **Quantum Resistance**     | ❌     | ✅✅✅ | ✅✅✅ |
| **Gas Cost**               | ✅✅✅ | ❌     | ❌     |
| **Long-Term Security**     | ❌     | ✅✅   | ✅✅✅ |
| **Migration Path**         | N/A    | ❌     | ✅✅✅ |
| **Storage Efficiency**     | ✅✅✅ | ✅✅   | ❌     |
| **Transaction Speed**      | ✅✅✅ | ✅✅   | ✅✅   |

**Legend:**

- ✅✅✅ = Excellent
- ✅✅ = Good
- ✅ = Acceptable
- ❌ = Poor/Not Available

## Common Questions

### Q: Can I use ECDSA for long-term storage?

**A:** ECDSA is secure against classical attacks but vulnerable to future quantum attacks. For assets you plan to hold for 10+ years, consider PQC or Hybrid accounts.

### Q: Do I need Hybrid if I already have PQC?

**A:** Only if you need Ethereum compatibility. If you're on a PQC-only network and don't need ECDSA compatibility, PQC alone is sufficient.

### Q: Can I switch account types later?

**A:** Yes, but you'll need to:

1. Create a new account of the desired type
2. Transfer funds to the new address
3. Update any references to your old address

### Q: Which is more secure: PQC or Hybrid?

**A:** Both provide quantum resistance. Hybrid adds defense in depth (both signatures must be valid), but PQC alone is already quantum-resistant.

### Q: Why would I choose Hybrid over PQC?

**A:** Choose Hybrid if you need:

- Ethereum compatibility (standard 0x address)
- Ability to use existing Ethereum tools
- Migration from ECDSA without changing address format

## Summary Recommendations

| Your Situation                | Recommended Account Type |
| ----------------------------- | ------------------------ |
| Standard Ethereum user        | **ECDSA**                |
| Long-term storage (10+ years) | **PQC** or **Hybrid**    |
| High-frequency trading        | **ECDSA**                |
| Migrating existing account    | **Hybrid**               |
| PQC-only network              | **PQC**                  |
| Critical infrastructure       | **Hybrid**               |
| Development/testing           | **ECDSA**                |
| Maximum security              | **Hybrid**               |
| Cost optimization             | **ECDSA**                |
| Future-proofing               | **PQC** or **Hybrid**    |

## Related Documentation

- [Overview](./01-overview.md) - Account types overview
- [ECDSA Accounts](./02-ecdsa-accounts.md) - ECDSA details
- [PQC Accounts](./03-pqc-accounts.md) - PQC details
- [Hybrid Accounts](./04-hybrid-accounts.md) - Hybrid details
- [Account Comparison](./05-account-comparison.md) - Detailed comparison
