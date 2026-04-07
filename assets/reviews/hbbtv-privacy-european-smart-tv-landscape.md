# I Still Know What You Watched Last Sunday (NDSS 2023)

## Summary

### Paper Overview

This paper investigates the privacy implications of the Hybrid Broadcast Broadband TV (HbbTV) protocol, a standard used across Europe and beyond that allows broadcasters to deliver interactive, internet-based content as overlays on top of traditional broadcast television. Unlike standard linear TV, HbbTV enables bi-directional communication between Smart TVs and broadcasters, meaning the television is no longer just receiving content but actively sending data back. The authors analyze traffic from 36 TV channels across five European countries — Italy, Germany, France, Austria, and Finland — using both on-device traffic capture and off-device inspection to identify tracking behavior, consent violations, and insecure data handling. Their central finding is that the situation has not meaningfully improved from what prior studies found nearly a decade earlier: channels routinely contact tracking services before users have had any chance to consent, some still transmit sensitive data including login credentials over unencrypted HTTP, and the existing denylist-based tools available to privacy-conscious users cover only a fraction of the tracking domains in use.

### User Study & Proposed Solution

The paper complements the technical analysis with a user awareness survey conducted in Italy involving 174 participants. The survey reveals that a significant majority of Smart TV owners cannot identify any concrete security or privacy risk associated with their device, which the authors attribute to a lingering mental model in which televisions are passive, one-directional appliances. Interestingly, when participants were presented with specific risky scenarios, their concern levels increased noticeably, suggesting the gap is more about awareness than indifference. As a response to both the technical findings and the user survey, the authors propose HbbTV Blocker, a Raspberry Pi-based gateway tool that intercepts Smart TV traffic and enforces per-channel denylists to block known tracking and advertising domains. The tool is positioned as a practical middle ground between blocking everything and leaving users entirely unprotected.

## Discussion

### What Works

There is a lot to like about this paper. The dual-method approach — combining active traffic measurement with a user survey — is well-motivated and produces findings that reinforce each other in a satisfying way. The technical methodology is also unusually transparent: the authors document exactly which Smart TV models they used, explain why they needed multiple devices for compatibility reasons, describe the four-phase consent timing structure of their traffic capture, and acknowledge where their off-device setup diverges from on-device behavior and why both are still necessary. That kind of methodological honesty is not always present in papers like this, and it made the work more credible.

### Limitations

What I found less convincing was the HbbTV Blocker as a solution. The paper itself admits it shifts responsibility to the user, requires maintaining and updating denylists manually, and was only tested against nine Italian channels. A Raspberry Pi gateway is not something a typical Smart TV owner is going to set up, and the paper gestures toward this limitation without fully reckoning with it. A brief discussion of what a realistic deployment path would look like — whether ISPs, device manufacturers, or regulators could implement something analogous at scale — would have made the contribution feel more complete.

### Surprising Observations

One finding that genuinely surprised me was the case of HSE, the German shopping channel, which was transmitting login credentials including credit card details over plain HTTP. This was identified in a prior study from 2014 and was still unresolved when this paper was published in 2023. That is nearly a decade of a known, documented vulnerability involving financial data going unaddressed, which the paper notes but treats somewhat briefly given how striking it is.

I also found the section on tracking pixels more interesting than I expected — the idea that a 1×1 invisible GIF is being loaded by over half the channels studied to silently profile viewing behavior is a technique I associate with 2000s-era email marketing, not modern television. An example tracing exactly what data one of those pixel requests carries and what the receiving service does with it would have grounded that discussion considerably.

### Open Questions

The survey results also raised a question the paper does not fully answer: if users become concerned when shown specific scenarios but remain unaware in general, is the problem primarily one of communication, regulation, or platform design? The implications section points at all three without landing firmly on any of them.
