## Overview

This paper investigates the privacy implications of the Hybrid Broadcast Broadband TV (HbbTV) protocol, a widely deployed standard that overlays internet-based interactivity on top of broadcast TV. Because HbbTV enables two-way communication, Smart TVs can transmit data back to broadcasters and third parties rather than acting as passive receivers. The authors analyze traffic from 36 channels across Italy, Germany, France, Austria, and Finland, using both on-device and off-device capture to measure tracking behavior, consent timing, and insecure data transmission.

## Core Contribution

The central contribution is a combined technical and user-centric assessment. The technical side documents persistent privacy violations, including tracking requests before meaningful consent and continued use of unencrypted channels in some cases. The user-study side shows that many Smart TV owners cannot name concrete privacy risks until they are shown explicit scenarios, indicating that lack of awareness is a major part of the problem.

## Methodology

The study combines packet-level traffic analysis with a survey of 174 participants in Italy. The measurement setup explicitly distinguishes consent phases to evaluate whether tracking starts before user choice. The authors also compare on-device and off-device instrumentation and discuss where the two approaches diverge. To explore mitigation, they implement HbbTV Blocker, a Raspberry Pi gateway that applies per-channel denylist filtering.

## Significant Findings

The findings indicate that privacy practices have improved little relative to earlier studies despite years of public attention. Multiple channels contact tracking infrastructure before consent is established, and denylist tools currently cover only a subset of active tracking domains. The paper also reports a severe case involving transmission of sensitive account information over plain HTTP, showing that basic security hygiene can still fail in production broadcast ecosystems.

## Critical Assessment

The paper is strongest when it links technical evidence with user understanding, and the methodological transparency improves credibility. The main weakness is the practicality of the proposed blocker: it shifts operational burden to end users, depends on denylist maintenance, and has limited deployment validation. The work clearly diagnoses the problem but leaves open who should own scalable mitigation in practice, whether broadcasters, platform vendors, network operators, or regulators.

## Why This Paper Matters

This study shows that connected-TV privacy risks are not theoretical edge cases but recurring, observable behaviors in mainstream channels. It also highlights a governance gap between what users think TVs do and what TVs actually do on the network. As smart television becomes a default household platform, this gap has direct implications for consent, compliance, and consumer protection.
