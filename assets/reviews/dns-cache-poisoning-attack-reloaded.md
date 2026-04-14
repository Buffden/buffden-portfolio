## Overview

DNS cache poisoning — a class of attack widely believed to have been practically defeated by randomization defenses introduced after the Kaminsky attack of 2008 — can be revived through careful exploitation of side channels in the Linux network stack. The attack is off-path: the adversary does not need to sit on a network segment where they can observe DNS traffic. They need only the ability to send and receive packets. Using ICMP-based and IP fragmentation-based side channels, an attacker can reduce the effective entropy protecting DNS transactions from 32 bits down to a level that makes brute-force poisoning feasible in seconds to minutes.

The work was assigned CVE-2020-25705 and prompted emergency patches in major Linux distributions, including Ubuntu, Debian, Fedora, and Red Hat Enterprise Linux. It represents one of the most significant rediscoveries of a supposedly closed attack class in recent network security history.

## Background & Motivation

DNS cache poisoning attacks work by convincing a recursive resolver — the intermediary that performs DNS lookups on behalf of end users — to cache a forged DNS record. If an attacker can get a resolver to cache a false mapping from a domain name to an attacker-controlled IP address, all queries that resolver answers using that cached entry will be redirected. The scope of harm is severe: email can be intercepted, HTTPS certificates can be obtained via DNS validation challenges, and users can be silently directed to phishing infrastructure.

The classical Kaminsky attack (2008) exploited the fact that DNS transaction IDs (TXIDs) were only 16 bits — 65,536 possible values — and resolvers reused predictable source ports. By sending a flood of forged responses with all possible TXID values before the legitimate answer arrived, an attacker could poison a cache entry with roughly one flood per second on modest hardware. The industry response was to randomize both TXID (16 bits) and source port (16 bits), yielding approximately 32 bits of combined entropy — around 4 billion possible combinations — which was considered computationally infeasible to brute-force within the typical time window of a DNS response.

The assumption underlying this defense was that an off-path attacker has no way to determine which TXID and source port a particular resolver has selected for a given query. This paper shows that assumption is wrong on Linux systems, because Linux's ICMP rate limiting and IP fragmentation reassembly mechanisms leak information that narrows the search space dramatically.

## Core Contribution

The paper's central contribution is a practical off-path DNS cache poisoning attack that bypasses TXID and source port randomization by exploiting two independent side channels in the Linux kernel:

1. **The ICMP global rate limiting side channel**, which allows an attacker to infer whether a forged packet with a specific source port was accepted or rejected based on observable changes in ICMP rate limiting behavior.

2. **The IP fragmentation side channel**, which allows an attacker to infer source port values by sending carefully constructed fragmented IP packets and observing whether the resolver's reassembly buffer accepts or rejects them.

Either side channel alone reduces the search space significantly. Combined with a divide-and-conquer scanning strategy, they make full cache poisoning achievable in approximately **38 seconds** on average against a vulnerable Linux resolver.

## Methodology

**Attack model.** The attacker is off-path: they can send and receive packets to/from the victim resolver but cannot observe the resolver's DNS queries or the legitimate authoritative server's responses. This is the standard adversary model for remote DNS attacks.

**The ICMP rate limit side channel.** Linux implements a global ICMP rate limit across all source addresses. Specifically, Linux limits the rate at which it generates ICMP Port Unreachable messages (Type 3, Code 3) in response to UDP packets sent to closed ports. The key insight is that if an attacker sends a forged UDP packet purporting to be a DNS response — and the source port in that forged packet matches the actual source port being used by the resolver for the current query — the resolver's behavior will differ from the case where the source port does not match. By probing the ICMP rate limit counter, the attacker can distinguish "this source port matched" from "this source port did not match," turning a 16-bit search space into one that can be scanned systematically.

Concretely: the attacker sends N forged DNS responses with varying source ports, then sends a probe packet designed to elicit an ICMP response from the resolver. If the ICMP rate limit has been exhausted (because the resolver processed and generated ICMP for the matching forged packet), the probe will not receive a response. If the limit has not been exhausted, it will. This binary oracle allows the attacker to test source port values in batches.

**The IP fragmentation side channel.** IP fragmentation occurs when a packet exceeds the maximum transmission unit (MTU) of a network link. Linux maintains a reassembly queue that holds fragments waiting for a complete packet. This reassembly queue is keyed in part by the source address, destination address, and IP identification field. By sending specially crafted fragmented packets with specific IP ID values, an attacker can probe the state of the resolver's reassembly buffer and infer information about what source port the resolver is using for its current DNS query.

**Combined attack.** The two side channels are used in sequence: the IP fragmentation channel first narrows the source port search space from 65,536 possibilities to a manageable candidate set, and the ICMP channel then confirms the exact value. Once the source port is known, confirming the 16-bit TXID requires only 65,536 attempts — feasible within the DNS response window given modern network speeds.

**Validation.** The authors validate the attack against real-world DNS resolvers including BIND 9, Unbound, and dnsmasq running on Linux, as well as against major public resolvers. They measure an average poisoning time of approximately 38 seconds and confirm successful cache poisoning in controlled experiments.

## Significant Findings

The most important finding is that **Linux's global ICMP rate limiting creates a cross-connection side channel** that no one had systematically analyzed as an attack vector before. The Linux kernel's default ICMP rate limit (roughly 1,000 messages per second) was set for network efficiency reasons with no consideration of its implications for cryptographic randomization. The result is a side channel that is present in every Linux system running a DNS resolver — which includes the vast majority of internet-facing infrastructure.

The second important finding is that **the attack is practical at real network speeds**. The 38-second average poisoning time was measured over real internet paths, not in a lab with artificially low latency. An attacker can plausibly maintain the required packet rates from a standard rented server.

The paper also finds that **several major public DNS resolvers were vulnerable** at the time of disclosure, and that the vulnerability is not specific to any single resolver implementation — it arises from the Linux kernel behavior underlying all of them.

## Critical Assessment

The paper is technically rigorous and the experimental validation is thorough. The authors test on real systems rather than simulations, and their disclosure timeline (coordinated with Linux distributions and resolver vendors before publication) reflects responsible practice.

The attack's main practical constraint is **timing**. DNS queries typically have TTLs of minutes to hours before the cache entry expires, but the actual DNS transaction — the period during which the resolver is awaiting a response from the authoritative server — is measured in milliseconds to seconds. The 38-second average poisoning time means the attack must coincide with a period when the resolver is actively making a query for the target domain. An attacker can trigger this by causing their own DNS query to a controlled domain to induce the resolver to look it up, or by simply waiting. In practice this is not a severe constraint, but it does require some coordination.

The mitigation the paper recommends — disabling global ICMP rate limiting or making it per-source rather than global — is a straightforward kernel change. The subsequent Linux patches implement exactly this. However, the paper notes that other protocols and subsystems may have analogous global rate-limited resources that create similar side channels. The specific fix is narrow; the underlying design principle (that global rate limiters create cross-connection oracles) requires broader architectural attention.

The paper would be strengthened by more analysis of how long it takes for the attack to become relevant in a real deployment context — accounting for resolver restarts, cache TTL, and attacker detection risk. The controlled lab measurements are convincing but do not fully characterize operational feasibility against hardened infrastructure.

## Why This Paper Matters

This paper matters for three reasons.

First, it demonstrates that **closed vulnerabilities can be reopened**. The DNS community spent more than a decade believing that port and TXID randomization had adequately addressed cache poisoning. This work shows that a seemingly orthogonal subsystem — ICMP rate limiting — can silently undermine that entire defense. Security properties do not exist in isolation from the systems that implement them.

Second, it illustrates the **danger of shared mutable state** in operating system networking stacks. Global rate limiters, global counters, and global queues that affect behavior across independent connections create side channels. These design patterns appear throughout network code, and their security implications are rarely analyzed at design time. The paper's methodology — looking for cross-connection observable effects of global kernel state — is a template that can and should be applied to other protocols and subsystems.

Third, the work has **direct infrastructure impact**. DNS is the naming layer of the internet. Cache poisoning attacks against DNS translate immediately into capabilities for man-in-the-middle attacks, certificate issuance fraud, and phishing at scale. The fact that this attack was practical against Linux resolvers — which are the dominant implementation class for recursive resolvers worldwide — means the exposure was enormous until the patches were deployed. The paper's contribution to closing that window is a concrete and measurable benefit to internet security.
