## Overview

HbbTV (Hybrid Broadcast Broadband TV) is a standard that adds two-way internet connectivity to broadcast television. By combining network traffic measurement across 36 channels in five European countries with a user survey of 174 participants, this research shows that Smart TVs running HbbTV actively transmit viewer information to third-party tracking infrastructure — often before any consent mechanism is presented — and that awareness of this behavior among ordinary users is minimal. The title is a reference to the film "I Still Know What You Did Last Summer," and it is apt: despite years of GDPR enforcement and public attention to smart device privacy, European broadcast television channels continue to engage in tracking practices that would be unambiguously problematic if observed in a web browser context.

## Background & Motivation

HbbTV (Hybrid Broadcast Broadband TV) was standardized by a consortium of European broadcasters and technology vendors as a way to deliver interactive television applications alongside conventional broadcast signals. The standard allows a broadcaster to embed metadata in the broadcast stream that instructs the Smart TV to load a web application from an internet server. This application then runs on the TV and can overlay interactive content — catch-up players, voting interfaces, supplementary information — on top of the broadcast image. From the broadcaster's perspective, HbbTV is an advertising and engagement platform. From a privacy perspective, the moment HbbTV loads an internet-hosted application, the TV transitions from a passive broadcast receiver to an active internet client, transmitting identifying information to servers under the broadcaster's or third party's control.

The critical difference from web browsers is that users have no equivalent of a browser's address bar, developer tools, or cookie management interface. The networking activity of HbbTV applications is entirely invisible to viewers, who typically have no mental model that their television is making HTTP requests to external servers while they watch the news. This invisibility makes privacy violations harder to detect, harder to contest, and harder to regulate in practice, even where regulation theoretically applies.

GDPR, which came into force in May 2018, requires informed consent before personal data is collected and transmitted. In a smart TV context, this means that any tracking requests — including loading third-party advertising trackers or analytics beacons — should be preceded by an affirmative consent action from the viewer. The paper tests whether this is actually happening.

## Core Contribution

The paper makes two interconnected contributions. The first is a large-scale network measurement of HbbTV traffic from real broadcast channels, documenting specific tracking behaviors, consent timing, and data transmission practices with packet-level evidence. The second is a user study that measures how much ordinary viewers understand about what their televisions do on the network, and how that understanding changes when they are shown specific scenarios drawn from the measurement results.

Together, these contributions establish both the technical reality of the problem and its human dimension — the gap between what is happening and what users believe is happening.

The authors also build and evaluate **HbbTV Blocker**, a privacy tool implemented as a Raspberry Pi gateway that intercepts HbbTV traffic and applies per-channel domain-based filtering to block tracking requests.

## Methodology

**Traffic measurement.** The study captures HbbTV network traffic from 36 television channels across five countries: Italy, Germany, France, Austria, and Finland. Traffic is captured using both on-device instrumentation (modifying the Smart TV's software stack to capture traffic from within the device) and off-device instrumentation (capturing traffic at the network level using a Raspberry Pi connected between the TV and the router). The authors explicitly compare these two approaches and discuss where they diverge — an important methodological contribution, since on-device and off-device captures can miss different categories of traffic due to encryption, local loopback, or certificate pinning.

To analyze consent timing, the measurement setup is designed to distinguish three phases: before any user interaction (boot and channel load), after channel load but before any consent dialog, and after a consent action has been taken. Traffic captured in the first two phases represents pre-consent data transmission and is the primary focus of the privacy analysis.

**User survey.** 174 participants in Italy complete a structured survey about their Smart TV usage and their beliefs about what data their televisions collect and transmit. The survey uses both direct questions ("Do you believe your TV sends data to third parties while you watch TV?") and scenario-based questions that describe specific data flows and ask participants whether they consider these acceptable.

## Significant Findings

**Pre-consent tracking is common.** Multiple channels in the measurement dataset contact tracking infrastructure — including well-known advertising and analytics platforms — before any consent dialog is displayed to the viewer. This is a direct GDPR violation if the data transmitted includes personal or device-identifying information, which in many cases it does. Device identifiers, broadcast channel information, and viewer session identifiers are among the data categories observed in pre-consent traffic.

**Unencrypted transmission of sensitive data.** The paper documents at least one severe case in which account-related information — data that would constitute personal data under GDPR's definition — is transmitted over plain HTTP rather than HTTPS. This means the data is visible to any network observer on the path between the TV and the server. In an era where HTTPS is the default for virtually all web traffic, the presence of plaintext sensitive data transmission in broadcast television applications reflects a significant security hygiene failure.

**Denylist coverage is incomplete.** The authors evaluate whether existing tracker blocklists — the same lists used by browser extensions and DNS-based content blockers — cover the tracking domains observed in HbbTV traffic. They find that coverage is partial: a meaningful fraction of active HbbTV tracking domains are not present in any standard blocklist, which means existing generic blocking tools do not adequately protect Smart TV viewers.

**User awareness is low, but improves with exposure.** Before being shown measurement results, the majority of survey participants cannot name specific privacy risks associated with their Smart TV. After being shown specific scenarios — "while you were watching this channel, your TV sent these identifiers to these servers" — significantly more participants express concern and indicate a desire for control. This finding suggests that the privacy problem is partially one of information asymmetry: users who understand what is happening want it to stop, but the invisibility of the behavior prevents awareness from forming naturally.

**HbbTV Blocker partially effective.** The HbbTV Blocker prototype, implemented on a Raspberry Pi running a DNS-based filtering approach with per-channel denylists, successfully blocks a subset of observed tracking requests. However, its effectiveness is limited by the incompleteness of the underlying denylists and the operational overhead of maintaining channel-specific blocking rules. It also requires technical setup that most viewers cannot accomplish.

## Critical Assessment

The paper's strongest contribution is its combination of technical rigor and human-centered measurement. Many privacy papers focus exclusively on technical evidence without asking what users know, believe, or prefer. The survey component here contextualizes the measurement findings in a way that makes the policy implications concrete: this is not merely a regulatory compliance problem, it is a problem of fundamental informed consent failure.

The methodological transparency is also commendable. The authors document the differences between on-device and off-device traffic capture, acknowledge where the two approaches disagree, and discuss the implications for measurement validity. This kind of methodological honesty is rare and valuable.

The paper's main limitation is the practicality of its proposed mitigation. HbbTV Blocker requires users to purchase and configure hardware, maintain channel-specific blocklists, and understand the technical relationship between their TV and the gateway device. This is not a solution that scales to ordinary households. The paper correctly identifies this limitation but does not propose an alternative path to scalable mitigation — leaving open the question of who is responsible for implementing effective controls. Broadcasters have financial incentives not to. Platform vendors are subject to competitive pressure. Network operators have limited visibility into encrypted traffic. Regulators have shown themselves to be slow in this space.

The geographic scope, while covering five countries, does not fully represent the diversity of European broadcasting markets, and the sample of 36 channels is relatively small given the breadth of the HbbTV deployment across Europe.

## Why This Paper Matters

Smart television is becoming the default household screen. As linear broadcast viewing declines and streaming and hybrid services grow, Smart TVs occupy a position in the home that combines the intimacy and pervasiveness of television with the data collection capabilities of an internet-connected device. The HbbTV standard is the mechanism through which broadcast television acquires those internet-connected capabilities.

This paper matters because it provides empirical evidence — at the packet level — that the privacy promises made by GDPR are not being kept in this context. It shows that consent-before-collection requirements, which are clear in the regulation's text, are routinely violated in practice. It demonstrates that users have been given no tools, no interfaces, and no mental models to understand or contest this. And it shows that generic privacy tools developed for the web do not transfer effectively to the television context.

The governance gap this paper identifies — between what the law requires, what broadcasters do, and what users understand — is a gap that will grow as smart television becomes more connected and as advertising technology migrates from the open web (where it faces browser-based controls) into the living room (where it currently faces none). The paper is a timely and technically grounded contribution to a conversation that urgently needs more empirical grounding.
