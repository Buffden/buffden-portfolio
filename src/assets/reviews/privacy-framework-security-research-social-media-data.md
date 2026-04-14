## Overview

This SoK paper examines how security and privacy researchers handle the privacy of individuals whose data appears in social media datasets. Reviewing **601 papers published over 16 years** across six academic disciplines, it maps observed behaviors onto an adapted version of Daniel Solove's comprehensive privacy taxonomy. The result is a structured framework of eleven privacy risk categories, distributed across the full research lifecycle, that gives researchers, reviewers, program committees, and institutional review boards a shared vocabulary for identifying and mitigating privacy harms — not just avoiding legal liability.

## Background & Motivation

Social media platforms have become essential data sources for security and privacy research. Academic work has used Twitter data to study misinformation, Reddit data to analyze radicalization, Facebook groups to understand coordinated inauthentic behavior, and YouTube comments to detect hate speech. These datasets are valuable precisely because they capture authentic human communication at scale — but that authenticity is also what makes them privacy-sensitive.

The problem this paper addresses is a structural gap between the quality of the research conducted on this data and the quality of the privacy handling it employs. Security and privacy researchers are generally sophisticated about the technical dimensions of their domain — they can design rigorous experiments, evaluate statistical significance, and build robust systems — but privacy in the research process itself is often treated as a checkbox. Does the paper have an IRB approval? Are usernames redacted? If so, the privacy question is considered answered.

This approach is insufficient. The actual privacy risks that arise from collecting, storing, processing, and publishing social media data are more numerous, more specific, and more nuanced than any checklist can capture. A researcher who anonymizes usernames before publishing a dataset has addressed one risk but may have left others untouched: the data may enable re-identification through content alone, the collection method may have violated platform terms or exposed vulnerable users, the storage practices may be inadequate, or the published findings may enable targeted harm even without explicit PII.

The paper's deeper motivation is the observation that this situation has not improved with time. Despite the passage of GDPR in 2018, despite increasing public attention to research ethics, and despite the publication of numerous ethics guidelines, the empirical evidence from reviewing 601 papers shows that privacy reporting quality has remained stubbornly low.

## Core Contribution

The paper makes three contributions. First, it adapts Solove's privacy taxonomy — originally developed as a legal and philosophical framework for understanding privacy violations — to the specific context of security research using social media data, producing a set of eleven concrete, actionable privacy risk categories. Second, it applies this taxonomy empirically to 601 papers to characterize the current state of privacy practice in the field, including how practices vary across disciplines and time. Third, it catalogs privacy-preserving techniques with explicit discussion of the trade-offs each introduces — acknowledging that reducing one privacy risk often creates or exacerbates another, and that no single technique is sufficient in isolation.

## Methodology

**Literature selection.** The authors define an inclusion criterion encompassing security and privacy research that collects or uses social media data and falls within six academic disciplines: computer science, information science, communication studies, social science, public health, and law. The 601-paper corpus spans **16 years** (approximately 2008 to 2024, covering the rise of social media as a research domain). The multi-disciplinary scope is important because privacy practices differ substantially across fields — computer science venues operate under different norms than public health venues, for example — and a single-discipline review would miss these differences.

**Coding scheme.** Each paper is coded on a structured coding scheme developed from Solove's taxonomy and adapted to the research context. The coding captures: what data was collected and how (API, scraping, donation, third-party purchase); whether consent was obtained and from whom; what anonymization or pseudonymization was applied; how data was stored and for how long; what was published (raw data, aggregated results, examples with PII); and whether institutional ethics review was obtained and reported.

**GDPR periodization.** The authors divide the corpus into pre-GDPR (before May 2018) and post-GDPR (May 2018 onward) windows to test whether the regulation's passage produced measurable changes in reporting behavior. This is a natural quasi-experimental design for assessing regulatory impact.

**Taxonomy application.** Each coded paper is then analyzed through the eleven-category risk taxonomy, with researchers identifying which risk categories apply to each paper's data practices and whether those risks were acknowledged or mitigated.

## Significant Findings

**Privacy reporting is sparse and not improving.** Only a minority of papers in the corpus report meaningful privacy handling details — specific anonymization methods, data retention periods, access controls, or consent mechanisms. This minority is not growing substantially over time. Even after GDPR's passage, the improvement in privacy reporting across the corpus is modest and inconsistent. The pattern suggests that external regulatory pressure alone is insufficient to change norms in an academic publishing culture that does not systematically reward privacy-careful reporting.

**Disciplinary variation is large.** Computer science venues, which typically have more technically sophisticated reviewers and more structured methods sections, show stronger privacy reporting than some social science and humanities venues. However, this advantage is partial: CS papers are better at reporting on data anonymization but often weaker on consent and data retention. The variation underscores that privacy practice is shaped by disciplinary culture as much as by technical competence.

**The eleven risk categories span three phases.** The taxonomy organizes risks across the research lifecycle:

- *Collection phase risks* include: unauthorized collection (scraping in violation of platform terms or user expectations), collecting data from vulnerable populations without appropriate protections, and disproportionate collection (gathering more data than the research requires).

- *Processing phase risks* include: re-identification risk (anonymized data that remains linkable through content, timing, or graph structure), aggregation risk (combining individually innocuous data points to infer sensitive information), and representation risk (drawing conclusions from datasets that systematically underrepresent some populations while overrepresenting others, particularly given the demographic skew of major social platforms).

- *Dissemination phase risks* include: publishing data or findings in ways that enable targeted harm even without explicit PII, violating contextual integrity (publishing data outside the norms of the context where it was shared), and contributing to surveillance infrastructure by creating datasets or tools that law enforcement, intelligence agencies, or malicious actors can repurpose.

**Representation risk is underappreciated.** The paper highlights representation risk — the risk that findings derived from biased datasets are incorrectly generalized — as a privacy harm that the research community rarely discusses. If a dataset over-represents English-speaking, Western, younger, or politically engaged populations (which Twitter/X data, for example, substantially does), then conclusions drawn from it about "social media users generally" can mischaracterize the experiences of excluded groups. This is not merely a validity problem; it is a harm to those who are rendered invisible or misrepresented.

**GDPR's impact on practice is limited.** Despite being one of the most significant privacy regulations ever enacted, GDPR's passage did not produce a sharp improvement in privacy reporting behavior in the corpus. This finding is consistent with other empirical studies of GDPR's impact on research and suggests that compliance-focused regulation, without accompanying changes to journal and conference review processes, has limited effect on academic practice.

## Critical Assessment

The paper's greatest strength is that it provides a structured, empirically grounded framework where previously only vague exhortations existed. Telling researchers to "consider privacy" is useful only insofar as researchers know what considering privacy means in practice. The eleven-category taxonomy gives that instruction specific content: here are the specific risks, here is when they arise, and here are the techniques that reduce them (with honest acknowledgment of the trade-offs each technique introduces).

The longitudinal scope — 601 papers over 16 years — is genuinely impressive and gives the empirical results credibility that a smaller or more recent sample could not provide.

The paper's weakest area is institutional implementation. The recommendations for IRBs, ethics boards, and program committees are relatively high-level. "Require more detailed privacy reporting" is correct guidance but does not tell a specific program committee how to operationalize that requirement in a review rubric, how to train reviewers to apply it consistently, or how to handle the judgment calls that arise when a paper uses a public dataset in a way that is technically legal but arguably privacy-violating. The analytic framework is excellent; the institutional pathway for acting on it is underspecified.

Some edge cases — particularly the tension between the right to erasure (which GDPR provides to individuals) and research exemptions (which GDPR also provides, allowing certain data processing for legitimate scientific purposes) — are correctly identified as legally complex but would benefit from clearer applied examples of how researchers should navigate them in practice.

## Why This Paper Matters

Social media data is one of the most powerful and most widely used resources in contemporary empirical social science and security research. The volume of research that depends on it is enormous, and that research produces real outputs — policy recommendations, platform changes, content moderation algorithms — that affect real people. If the privacy practices underlying that research are systematically inadequate, the harms compound: individuals whose data was collected without meaningful consent see their information used to support conclusions they have no opportunity to contest.

This paper matters because it makes the privacy gap in this research domain empirically undeniable. It is not an argument that social media data should not be used in research — it is an argument that using it responsibly requires more than the current minimum. It provides the vocabulary, the framework, and the empirical baseline needed to make that argument operational in review processes, IRB procedures, and research design guidelines.

For researchers who work with social media data — including the security community, which increasingly relies on it for threat intelligence, abuse detection, and vulnerability research — this paper is a practical resource for identifying which risks their specific research design creates and what choices they can make to reduce those risks. That is a contribution that will outlast any specific finding and will remain relevant as social media platforms, data access policies, and privacy regulations continue to evolve.
