## Overview

Mobile advertising fraud is one of the most financially significant and technically underexplored problems in mobile security. This work introduces FraudDetective, a dynamic analysis framework that does not merely flag apps as fraudulent but traces fraudulent behaviors to the specific internal components responsible — identifying whether the culprit is the app developer's code, a third-party advertising library, or some other embedded SDK. Applied to **48,172 apps from the Google Play Store**, the system uncovers **74 fraudulent apps** responsible for **34,453 distinct ad fraud instances**. The most striking finding is that **98.6% of those fraudulent behaviors originate from embedded third-party ad libraries** — not from the app publishers themselves. This fundamentally changes who should be held accountable in mobile ad fraud enforcement.

## Background & Motivation

Mobile advertising is a multi-hundred-billion-dollar industry. App developers monetize free applications by embedding advertising SDKs — small software libraries provided by ad networks like Google AdMob, Meta Audience Network, or dozens of smaller networks — that display ads to users and report back metrics (impressions, clicks, conversions) to the ad network in exchange for payment. The integrity of this system depends on those metrics being accurate: advertisers pay based on reported interactions, and publishers receive payment based on the same data.

Ad fraud subverts this by generating false metrics. The primary fraud types in the mobile context include:

- **Click injection**: The malicious component listens for broadcast events (like `ACTION_PACKAGE_ADDED`, which fires when a new app is installed) and injects fraudulent clicks at the moment a new app is installed, falsely claiming credit for the install as a paid conversion.
- **Click flooding**: Generating a continuous stream of click events across all currently visible ads, regardless of whether any user interaction occurred, to statistically increase the chance that some future genuine conversion is attributed to the fraudulent click.
- **Impression fraud**: Reporting that an ad was displayed and viewed when it was never rendered or was hidden from the user (e.g., displayed in a zero-pixel view or off-screen).
- **SDK spoofing**: Generating fake traffic that appears to come from legitimate app sessions without those sessions ever occurring.

The existing defense landscape is inadequate. Ad networks deploy server-side fraud detection based on traffic anomalies, but these approaches detect fraud at the network level and cannot identify which specific component within the app is responsible. App-store vetting uses static analysis, which is generally capable of flagging suspicious API calls but struggles to trace them to specific call sites across complex multi-library applications. The result is that developers are often held responsible for fraud committed by ad SDKs they integrated in good faith, while the actual culpable libraries continue operating across other apps.

## Core Contribution

FraudDetective's core contribution is component-level attribution. Rather than answering "is this app fraudulent?" it answers "which component in this app is generating fraudulent behaviors, and through what specific code path?" This attribution capability is achieved through a combination of Android platform instrumentation, dynamic execution, and dataflow tracking that connects observed fraudulent events back to their originating call stack.

This granularity matters for three reasons. First, it enables proportionate enforcement: app stores can remove or update specific SDKs without necessarily penalizing developers who integrated them unknowingly. Second, it enables ad network enforcement against specific library versions rather than entire publisher accounts. Third, it generates forensic evidence (specific call stacks, event sequences) that supports legal and regulatory action against SDK vendors.

## Methodology

**Android platform instrumentation.** The authors modify AOSP (Android Open Source Project) — the open-source Android operating system — to instrument the advertising framework at a low level. Specifically, they add instrumentation to the points where ad events (impressions, clicks, conversions) are recorded and reported, capturing the full Java call stack at the moment each event is generated. This stack trace identifies precisely which class, method, and line number initiated the event.

The instrumentation is inserted at the framework level (in the Android platform itself, not inside individual apps) which means it captures behavior regardless of how the app is structured or obfuscated. A library that uses reflection or dynamic class loading to call ad APIs is still caught because the instrumentation sits below the call.

**Input-to-event dataflow tracking.** The core technical challenge is distinguishing legitimate ad interactions from fraudulent ones. A legitimate click event is caused by a genuine user touch input; a fraudulent click is generated programmatically without any corresponding user action. FraudDetective tracks whether each recorded ad event can be traced back to a real user input event (touch, gesture, key press) within a configurable time window.

The system implements this as a dataflow analysis: it tracks the propagation of "user input taint" through the Android event dispatch system and marks ad events as user-initiated only if they can be connected to a tainted input event via the call chain. Events that cannot be connected to any recent user input are flagged as suspicious.

**Automatic exploration.** To observe fraudulent behavior, the app must actually run. FraudDetective uses automated UI exploration (based on the Android monkey testing tool and a custom interaction policy) to exercise apps without predefined scripts. The key design choice is that the system does not use scripted test scenarios — it explores the app's UI state space dynamically, which means it can discover fraudulent behaviors that only trigger in specific app states that a script writer might not have anticipated.

**Scale deployment.** The full pipeline is applied to 48,172 apps from Google Play, representing a large-scale real-world evaluation. Each app is installed, exercised for a fixed time budget, and analyzed for fraudulent events with attribution.

## Significant Findings

**The scale of fraud.** 74 apps among the 48,172 analyzed exhibit confirmed ad fraud behavior. These apps collectively generate 34,453 distinct fraudulent ad events during the analysis period — a rate that, extrapolated to the actual user population of these apps (many of which have millions of installs), implies enormous financial impact on the advertising ecosystem.

**Third-party library culpability.** The finding that **98.6% of fraudulent behaviors originate from third-party ad libraries** rather than app developer code is the paper's most important empirical result. It means that the mobile ad fraud problem is primarily a supply chain problem within the advertising technology stack, not a developer integrity problem. The implication is that enforcement against app developers — which is how most current ad network fraud response works — is misdirected. The appropriate enforcement target is the SDK vendors.

**Specific fraud patterns.** The analysis identifies concrete fraud patterns including click injection triggered by `ACTION_PACKAGE_ADDED` broadcasts (where a library fires clicks the moment any app is installed on the device, attempting to claim conversion credit), background click flooding where ad clicks are generated continuously without any UI being visible to the user, and impression reporting for ads that were loaded in hidden web views.

**Attribution precision.** FraudDetective's call stack attribution allows the authors to identify not just which library is responsible but which specific version and which specific code path. This is operationally important: different versions of the same library may have different fraud behavior, and precise version attribution is necessary for effective remediation.

## Critical Assessment

The strongest aspect of FraudDetective is its platform-level instrumentation approach. By modifying Android itself rather than working at the app or SDK level, the system achieves visibility that is essentially unbypassable without access to the device's operating system. This is a significant architectural advantage over approaches that rely on app-level hooking, which can be defeated by obfuscation or anti-analysis techniques.

The 98.6% third-party library attribution figure is startling and important, but it comes with a caveat: the system analyzes 48,172 apps, finds 74 fraudulent ones, and the 98.6% figure applies to the behaviors within those 74 apps. It is not a claim that 98.6% of all ad fraud industry-wide originates from third-party libraries. The sample is a random draw from Google Play, which has its own curation and vetting, and apps not on Google Play may show different distributions. This qualification does not diminish the finding's importance but should inform how it is cited and generalized.

The scalability limitation is real. Dynamic analysis requires actually running each app, which takes time, infrastructure, and careful resource management. The paper does not fully characterize the time cost per app or the infrastructure required to run at the scale of the full Play Store. In practice, deploying FraudDetective as a real-time Play Store vetting tool would require significant investment in device farms or emulator infrastructure.

The automated UI exploration, while effective for finding some fraud patterns, may miss behaviors that only trigger under specific user interaction sequences. An attacker who knows FraudDetective's exploration policy could in principle design SDK code that is dormant during automated testing and active only under specific real-user interaction patterns.

## Why This Paper Matters

Mobile advertising fraud is estimated to cost the industry tens of billions of dollars annually. More importantly from a security perspective, it is not just a financial problem: fraudulent behaviors like click injection require apps to monitor system-wide broadcast events (like app installation events), which represents a form of covert surveillance that users have not consented to. The same capabilities that enable ad fraud can be repurposed for tracking user behavior across app boundaries.

FraudDetective matters because it moves the field from detection to attribution, and attribution is what accountability requires. As long as fraud detection produces only app-level flags, the response options are limited and often misdirected. When attribution can identify the specific SDK version and code path responsible, enforcement becomes targeted and evidence-based.

The finding that third-party ad libraries are responsible for nearly all observed fraud also has implications for the regulatory conversation about mobile app stores. If SDKs — which are not individually vetted the way apps are — are the primary vector, then app store security review processes need to extend their scope to cover the SDKs that apps embed. This paper provides the empirical evidence for that policy argument.
