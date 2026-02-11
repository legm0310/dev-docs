---
title: README
order: 1
---

# Konet PQC Wallet - Account Types Documentation

This GitBook documentation explains the different account types supported by the Konet PQC Wallet, their technical specifications, and when to use each type.

## Table of Contents

1. [Overview](./01-overview.md)
2. [ECDSA Accounts](./02-ecdsa-accounts.md)
3. [PQC Accounts](./03-pqc-accounts.md)
4. [Hybrid Accounts](./04-hybrid-accounts.md)
5. [Account Comparison](./05-account-comparison.md)
6. [Address Formats](./06-address-formats.md)
7. [When to Use Each Account Type](./07-when-to-use.md)

## Quick Reference

| Account Type | Private Key | Public Key  | Address             | Signature   | Use Case             |
| ------------ | ----------- | ----------- | ------------------- | ----------- | -------------------- |
| **ECDSA**    | 32 bytes    | 64 bytes    | 20 bytes (0x...)    | 65 bytes    | Legacy compatibility |
| **PQC**      | 4,032 bytes | 1,952 bytes | 32 bytes (pqc1p...) | 3,309 bytes | Quantum-safe future  |
| **Hybrid**   | 4,064 bytes | 2,016 bytes | 20 bytes (0x...)    | 3,374 bytes | Migration path       |

## Getting Started

Start with the [Overview](./01-overview.md) to understand the different account types, then dive into specific account types based on your needs.
