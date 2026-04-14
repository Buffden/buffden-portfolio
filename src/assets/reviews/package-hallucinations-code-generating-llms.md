## Overview

This paper studies package hallucinations produced by code-generating large language models. The core problem is that models sometimes recommend package names that do not exist, and attackers can register those names to deliver malicious code. The authors evaluate this behavior across multiple models and languages to understand both frequency and exploitability.

## Core Contribution

The key contribution is framing hallucinated dependencies as a supply chain attack surface rather than a mere model-quality issue. By showing that fabricated package names can be predicted and operationalized by adversaries, the paper connects LLM output errors directly to compromise risk in developer workflows.

## Methodology

The study performs large-scale prompting and code generation experiments, then analyzes generated imports and dependency references for validity. It characterizes hallucination patterns and tests whether adversaries could pre-register hallucinated names to intercept installations. The evaluation includes practical attack scenarios that demonstrate real compromise paths.

## Significant Findings

The results show that package hallucinations are not rare and often follow predictable naming structures. That predictability makes targeted exploitation feasible because attackers can anticipate likely hallucinated names and seed package ecosystems in advance. The paper also shows that the risk appears across model families and is not confined to one tool or one language environment.

## Critical Assessment

The work is compelling because it combines measurement with realistic exploitation, making the threat concrete. The mitigation discussion is directionally useful but still high level, with many recommendations depending on model improvements or developer discipline. Stronger system-level controls at registries, package managers, and CI pipelines would further strengthen the defensive path and reduce dependence on perfect user behavior.

## Why This Paper Matters

This paper introduces a security class that emerges from AI-assisted development itself. As generated code becomes common in production workflows, hallucinated dependencies create a scalable new vector for software supply chain abuse. The paper therefore reframes code-generation safety as not only correctness and productivity, but also ecosystem security.
