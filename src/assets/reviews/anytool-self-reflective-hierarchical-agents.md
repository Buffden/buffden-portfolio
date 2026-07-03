## Overview

Scaling the tool-use capabilities of LLM agents runs into a problem that grows faster than the agents themselves: as the number of available APIs increases, naive tool selection degrades rapidly. Passing 16,000 API descriptions into a context window is not feasible. Filtering them arbitrarily loses recall. AnyTool addresses this by treating tool selection as a hierarchical search problem rather than a flat retrieval problem: tools are organized by category, the agent narrows from categories to relevant subcategories to specific APIs, and a self-reflection loop recovers from failed attempts rather than declaring failure on the first miss. On ToolBench, AnyTool achieves a 58.2% average pass rate compared to 38.9% for direct GPT-4 baselines and substantially outperforms ToolLLM. On AnyToolBench, a more realistic benchmark the authors construct to address evaluation artifacts in the existing suite, AnyTool achieves 73.8% against 36.6% for the best ToolLLM variant.

## Background & Motivation

ToolBench established the paradigm for evaluating LLM agents on real-world API use, but it brings a structural problem in its default evaluation protocol. Many tasks on ToolBench can be "solved" according to the evaluation metric by returning any plausible-looking output, even if the API call was never correctly executed. Pass rates computed on the full ToolBench suite therefore overstate actual capability. The authors perform a systematic audit and identify a substantial proportion of tasks where prior systems "pass" without meaningfully using the required tools. This inflates headline numbers across the literature and makes it difficult to tell how much progress is being made.

The second motivation is scale. Rapid API, the API marketplace ToolBench draws from, hosts over 16,000 endpoints organized into hundreds of categories. No retrieval system that treats these as a flat list scales to that size: embedding-based retrieval misses APIs with poorly described functions, and BM25-style keyword matching fails on APIs where the function name does not match the user's natural language request. What's needed is a selection mechanism that exploits the categorical structure already present in API repositories.

## Core Contribution

AnyTool proposes three components that work together.

The **API retriever** operates hierarchically. Rather than searching across all 16,000 APIs simultaneously, the retriever first identifies relevant tool categories from the query, then narrows to subcategories, then selects specific candidate APIs within those subcategories. This mirrors how a human developer would approach API discovery: "I need something in the payments category, probably in the Stripe or Braintree subcategory, and specifically the charge-customer endpoint", rather than scanning an alphabetical list of 16,000 options.

The **solver** uses depth-first search with a decision tree (DFSDT) to plan multi-step solutions involving multiple APIs. For queries requiring tool chaining (fetch weather for a city, convert the temperature to Fahrenheit, post the result to a messaging endpoint), the solver maintains a tree of candidate plans and expands the most promising branch at each step, backtracking when a planned API call fails or returns unexpected output.

The **self-reflection mechanism** reactivates the retrieval and solving pipeline when an initial solution attempt fails rather than returning an empty result or a fabricated response. If the solver exhausts a branch of the decision tree without success, the self-reflection module re-analyzes the query and the failure mode, generates a revised API retrieval query, and restarts the pipeline with updated candidate tools. This allows the agent to recover from errors in its initial tool selection without manual intervention.

**AnyToolBench** is a new evaluation benchmark the authors introduce to address the measurement artifacts in existing ToolBench evaluation. It filters tasks to those requiring correct multi-API execution with verifiable outputs, and it provides ground-truth API lists that specify exactly which tool categories and specific endpoints are required to solve each task. This makes pass rates meaningful: a system "passes" a task only if it actually invoked the correct APIs and produced correct outputs, not if it returned a plausible-sounding string that the metric scored generously.

## Methodology

The retriever is built on GPT-4's function calling interface, which provides structured tool descriptions and argument schemas to the model. At each level of the hierarchy, the model is given descriptions of tools at that level and asked to select which warrant further exploration. The depth-first search constrains this to manageable branching factors: at the category level, the model selects a small number of categories; within each category, it selects a small number of subcategories; within each subcategory, it selects specific APIs. This reduces the effective search space at each stage from thousands to tens.

The self-reflection step is invoked when the solver signals failure: either the DFSDT exhausted its budget without finding a successful execution path, or the final output failed a basic sanity check. The reflection prompt provides the original query, the failed execution trace, and a structured request for diagnosis. The model identifies where the tool selection went wrong and produces a revised retrieval query, which restarts the pipeline. The number of reflection attempts is bounded (the authors use up to two reflections in their experiments) to prevent infinite loops.

All experiments use Azure OpenAI GPT-4 as the base model. The system requires no fine-tuning: the hierarchical retrieval and reflection behaviors emerge from prompting and the structured function calling interface, not from weight updates.

## Significant Findings

On the **filtered ToolBench** (the subset where existing evaluations are not artificially inflated), AnyTool achieves category-level pass rates of 52.2% (G1-I: instruction-following with a single tool), 61.4% (G1-T: tool-specific queries), 67.6% (G1-C: category-level tool selection), 58.9% (G2-I: two-tool instruction following), 45.9% (G2-C: two-tool category selection), and 63.2% (G3-I: three-tool instruction following), for an average of **58.2%**. The corresponding average for direct GPT-4 application without AnyTool's retrieval infrastructure is 38.9%.

On **AnyToolBench**, the gap between AnyTool and baselines is larger precisely because the benchmark is harder to game. AnyTool achieves 73.8%; the best ToolLLM variant with GPT-4 achieves 36.6%; plain GPT-4 achieves 14.0%. The doubling of pass rate over the best baseline on a benchmark constructed to eliminate metric artifacts is a strong result.

The self-reflection mechanism accounts for a substantial portion of this improvement. When reflections are disabled, pass rates on AnyToolBench drop approximately 40 to 50% on the subset of tasks where the first retrieval attempt fails. This means reflection is not recovering from edge cases; it is essential to baseline performance on tasks that require correct multi-step API chaining.

## Critical Assessment

The paper's strongest methodological contribution is AnyToolBench itself. The honest audit of existing evaluation protocols is more valuable than it might appear: a field that measures itself with a metric that rewards fabricated outputs will optimize for fabrication. Introducing a benchmark that requires verifiable execution is a direct correction to an incentive problem.

The primary weakness is GPT-4 dependency. AnyTool requires GPT-4's function calling capabilities at every stage: retrieval, solving, and reflection. The cost implications for production deployment are significant (16,000 API calls generates substantial prompt volume) and the paper does not benchmark inference cost or latency per query. For research purposes this is acceptable; for practitioners estimating deployment feasibility it is a gap.

The hierarchical retrieval approach inherits a brittleness from API documentation quality. When API descriptions are accurate and specific, the category hierarchy provides a meaningful filtering signal. When descriptions are generic or misleading (as a non-trivial fraction of real-world API documentation is), the retriever selects categories by surface-level keyword matching and the hierarchy provides less benefit. The paper's evaluation uses Rapid API's documentation, which is maintained at commercial quality; the performance on internal or poorly documented APIs may differ substantially.

## Why This Paper Matters

AnyTool matters for two distinct reasons, and they operate at different timescales.

In the near term, it provides a practical blueprint for agents operating across large heterogeneous tool collections. The flat-retrieval paradigm that characterizes most current tool-use systems does not scale past a few hundred tools. The hierarchical approach AnyTool demonstrates, and its integration with GPT-4's native function calling, is directly applicable to production settings where the available tool inventory is large and growing.

In the longer term, the paper's contribution to evaluation methodology may matter more than its specific architecture. AnyToolBench demonstrates that existing pass-rate metrics can be satisfied by systems that never correctly execute the required APIs. If the field is measuring the wrong thing, optimizing for that metric produces the wrong systems. The pattern of introducing a more rigorous benchmark alongside an architecture contribution is becoming more common in the agent literature, and for good reason: the field's progress is only as real as its ability to measure it accurately.

The self-reflection mechanism also points toward a broader architectural principle. The ability to recognize a failed attempt and revise the approach, rather than returning the best result from a single pass, is qualitatively different from the retry-on-failure patterns common in software systems. Reflection is not just retrying with different parameters; it is generating a diagnosis of why the first attempt failed and using that diagnosis to construct a better second attempt. That capacity (structured self-correction) is likely to be a component of more capable agent systems regardless of the specific domain.
