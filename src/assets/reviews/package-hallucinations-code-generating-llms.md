## Overview

Code-generating large language models, when asked to write code that uses external libraries, sometimes fabricate package names that do not exist. These fabricated packages — "hallucinations" in the AI sense — are not random noise. They are plausible-sounding names in the style of real packages, often closely related to a genuine package's name or functionality. An attacker who predicts or enumerates these names and registers them on public package registries before a developer installs the AI-recommended dependency turns a model quality problem into a software supply chain compromise.

This work — a Distinguished Paper Award winner at USENIX Security 2025 — evaluates this threat across **16 popular code-generating models**, two programming languages, and **576,000 generated code samples**, finding hallucination rates of at least 5.2% for commercial models and 21.7% for open-source models — rates that translate into millions of exploitable opportunities as AI-assisted development becomes standard practice.

## Background & Motivation

AI-assisted code generation has moved from a curiosity to a central part of many developers' workflows in a remarkably short time. Tools like GitHub Copilot, ChatGPT, and various IDE-integrated assistants are now used by tens of millions of developers to generate boilerplate, write functions from natural language descriptions, and suggest complete implementations for common tasks. When a developer accepts a code suggestion that includes an `import` statement or a dependency declaration, they typically trust that the suggested package name is real and safe.

This trust is predicated on the assumption that the model knows what packages exist. That assumption is partially correct — models trained on large code corpora have seen the names of popular packages many times and reproduce them reliably — but it breaks down at the margins. For less common packages, for packages in niche domains, or when the model is operating in a less familiar programming environment, hallucinated names appear with non-trivial frequency.

The supply chain attack mechanism this creates is a variant of a technique already documented in non-AI contexts: **dependency confusion** and **typosquatting**. An attacker registers a malicious package under a plausible name, waits for developers to install it (either because they discovered it through a search or because a tool recommended it), and delivers malicious code through the installation process. The novelty with LLM hallucinations is that the attacker does not need to choose which name to register; the model does that for them. The attacker's job is simply to register names that models are likely to hallucinate, which the paper shows is predictable.

## Core Contribution

The paper makes three connected contributions. First, it provides the most comprehensive empirical measurement of LLM package hallucination to date, covering 16 models across commercial and open-source categories, two programming languages (Python and JavaScript), and a range of prompt types and model configurations. Second, it demonstrates that hallucinated package names are not random — they follow predictable patterns — and shows that an attacker can operationalize this predictability to pre-register names before they appear in developer code. Third, it evaluates several mitigation strategies and demonstrates significant hallucination reduction while preserving code functionality.

The Distinguished Paper Award from USENIX Security reflects the community's recognition that this work defines a new threat category with broad and immediate relevance.

## Methodology

**Model selection.** The study includes 16 models spanning both commercial offerings (including models from OpenAI and other major providers) and open-source alternatives (including models from the Llama and CodeLlama families). This diversity is essential for characterizing whether hallucination is a property of specific models or a systemic property of the code generation paradigm.

**Sample generation.** The authors generate 576,000 code samples by prompting each model with a diverse set of coding tasks — drawn from realistic developer scenarios like "write a function to parse JSON from an HTTP response" or "implement a web scraper using Python" — and capturing the complete generated output including all import statements and dependency declarations. This scale is sufficient to estimate hallucination rates with statistical confidence and to characterize the distribution of hallucinated names.

**Package validation.** Each package name that appears in generated code is checked against the live package registries (PyPI for Python, npm for JavaScript) to determine whether it exists. Names that do not exist in the registry are classified as hallucinations. The authors exclude obvious toy names and common patterns that any reasonable developer would recognize as placeholders, focusing on plausible-looking names that a developer might realistically attempt to install.

**Attack operationalization.** To demonstrate exploitability, the authors implement and evaluate a pre-registration attack: they identify the most frequently hallucinated names across their sample, register a subset of them on the relevant registries (using benign placeholder packages for ethical reasons), and measure how long it takes for the registered packages to be installed by real developers who received the corresponding LLM recommendations. This end-to-end demonstration establishes that the threat is not theoretical.

**Mitigation evaluation.** The authors evaluate several mitigation strategies including: post-generation validation (checking generated package names against registry APIs before presenting them to the developer), fine-tuning on curated datasets with only verified package names, prompt engineering approaches that instruct the model to use only well-known packages, and retrieval-augmented generation that grounds the model in a verified package catalog.

## Significant Findings

**Hallucination rates are significant and model-dependent.** Commercial models hallucinate package names at rates of at least **5.2%** of code samples, while open-source models hallucinate at rates of at least **21.7%**. These are averages; rates for specific models, specific programming languages, or specific task types can be substantially higher. The gap between commercial and open-source models likely reflects the additional safety and factuality fine-tuning applied to commercial offerings.

**Over 205,000 unique hallucinated package names** were identified across the full sample. This is not a small set of common errors — it is a large, diverse space of plausible-but-nonexistent names that represents a substantial pre-registration opportunity for attackers.

**Hallucinated names follow predictable patterns.** The most common patterns are: names that are close variations of real popular packages (adding or removing prefixes like `py-`, `node-`, or `js-`); names that combine recognizable functional terms in ways that suggest a plausible library (`requests-async-client`, `json-validator-utils`); and names that are shortened or abbreviated versions of real package names. These patterns mean that an attacker does not need to run all 576,000 samples to identify a target list — they can generate a much smaller set of high-probability candidates by applying the pattern rules directly.

**The attack is scalable.** The cost of registering packages on PyPI and npm is zero (both registries are free to publish to). An attacker can register thousands of hallucinated names for essentially no cost, then passively wait for LLM recommendations to drive installation traffic. The asymmetry between attacker cost (near zero) and defender cost (vetting every package every developer installs) strongly favors the attacker.

**Mitigations work but have trade-offs.** Post-generation registry validation reduces hallucinations significantly but requires real-time API access and introduces latency into the code generation workflow. Fine-tuning improves factuality on package names but reduces general code quality if the fine-tuning corpus is too narrowly focused. Prompt engineering is the lowest-cost approach but the least reliable. The authors recommend a layered approach, with registry validation as the most reliable first-line defense.

## Critical Assessment

The paper's empirical scope is its strongest feature. The combination of 16 models, 576,000 samples, two programming languages, and actual registry registration demonstration makes the threat case difficult to dispute. The Distinguished Paper Award reflects the security community's view that this is not incremental work but a genuine contribution to understanding a new attack class.

The main limitation is that the paper's measurement was conducted at a specific point in time, and LLMs improve rapidly. The specific hallucination rates reported for specific models will change as those models are updated. However, the paper's contribution is less about the exact numbers for particular models and more about establishing the existence and structure of the threat class — and that contribution is durable.

The mitigation discussion is directionally useful but acknowledges a fundamental tension: the most effective mitigations (registry validation, constrained generation) require changes to the code generation workflow that model providers must implement, and those providers have not historically treated factuality on package names as a safety-critical property. Changing that prioritization requires either regulatory pressure or high-profile supply chain incidents that are traceable to LLM hallucinations.

The ethical dimension of the pre-registration demonstration deserves acknowledgment. The authors registered packages and measured real developer installation behavior, which raises questions about informed consent from the developers whose behavior was observed. The paper addresses this in its ethics discussion, noting that the packages installed were benign and that the observation was necessary to establish real-world exploitability, but this is a methodological tension that future work in this space will need to navigate carefully.

## Why This Paper Matters

This paper identifies a security vulnerability that is a direct product of the AI-assisted development ecosystem itself. Every organization that uses LLM-based code assistants — and that set is growing extremely rapidly — is exposed to this threat. Unlike traditional supply chain attacks that require an attacker to compromise an existing maintainer account or find a specific typosquatting opportunity, this attack scales with AI adoption: the more LLMs are used for code generation, the larger the pool of hallucinated package names that can be pre-registered.

The paper reframes code-generation safety as a property that includes not just functional correctness but also supply chain integrity. A code suggestion that compiles and runs correctly but installs a malicious dependency is not a safe suggestion. This framing — that AI safety in the software development context encompasses the full deployment and dependency chain, not just the immediate code output — is a conceptual contribution that should inform how model providers, registry operators, IDE developers, and security teams think about AI-assisted coding tools going forward.

As AI coding assistants become ubiquitous, the package hallucination attack surface will grow with them. This paper provides the empirical foundation for understanding how large that surface is and what can be done to reduce it.
