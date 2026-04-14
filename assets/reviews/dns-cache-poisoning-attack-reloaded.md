## Overview

This paper revisits DNS cache poisoning and shows that defenses widely considered sufficient, especially randomization of transaction IDs and source ports, can still be bypassed. The authors demonstrate off-path poisoning by exploiting side channels such as IP fragmentation and related network behavior, allowing attackers to infer randomized values and inject forged DNS records into resolver caches.

## Core Contribution

The key contribution is a practical re-evaluation of DNS trust assumptions. Rather than breaking cryptography directly, the paper shows how indirect leakage channels can collapse the effective entropy that modern defenses rely on. In doing so, it reopens a class of attacks many practitioners believed was largely resolved.

## Methodology

The authors design concrete attack workflows that combine side-channel observation with spoofed response strategies to poison resolver caches. They validate these attacks on real systems instead of restricting the analysis to simulation. This experimental grounding strengthens the claim that the problem is operational and not purely theoretical.

## Significant Findings

The most important finding is that randomness-based DNS hardening can be much weaker in practice than expected when protocol edge cases leak information. The study also shows that vulnerable configurations remain common in deployed resolvers. As a result, attackers can succeed without privileged network position, provided they can reliably leverage side-channel signals.

## Critical Assessment

The paper is technically strong and persuasive, especially in its empirical validation. At the same time, parts of the side-channel explanation are dense and can be hard to follow without deep DNS background. The mitigation section is realistic but incomplete, offering partial defenses with trade-offs rather than a comprehensive fix. That honesty is valuable, but it also underscores that DNS poisoning remains an open engineering challenge.

## Why This Paper Matters

This work is important because it overturns a comforting assumption that operational randomness alone made cache poisoning mostly a historical issue. It highlights how lower-layer protocol behavior can quietly undermine higher-level security design and reinforces the need for defense-in-depth in critical internet infrastructure.
