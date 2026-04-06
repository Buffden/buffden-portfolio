export interface Paper {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  link: string;
  year: number;
  tags: string[];
  oneLiner: string;
  review: string;
  reviewPath: string;
}

export const papers: Paper[] = [
  {
    slug: "practical-automated-detection-of-malicious-npm-packages",
    title: "Practical Automated Detection of Malicious npm Packages",
    authors: "Adriana Sejfia, Max Schäfer",
    venue: "ICSE",
    link: "https://dl.acm.org/doi/pdf/10.1145/3510003.3510104",
    year: 2022,
    tags: ["software supply chain", "npm", "malware detection"],
    oneLiner: "Presents a practical approach for automatically detecting malicious npm packages in the JavaScript ecosystem.",
    review: "",
    reviewPath: "assets/reviews/practical-automated-detection-of-malicious-npm-packages.md"
  },
  {
    slug: "dns-cache-poisoning-attack-reloaded",
    title: "DNS Cache Poisoning Attack Reloaded: Revolutions with Side Channels",
    authors: "Keyu Man, Zhiyun Qian, Zhongjie Wang, Xiaofeng Zheng, Youjun Huang, Haixin Duan",
    venue: "CCS",
    link: "https://www.cs.ucr.edu/~zhiyunq/pub/ccs20_dns_poisoning.pdf",
    year: 2020,
    tags: ["DNS", "cache poisoning", "side channels", "network security"],
    oneLiner: "Shows how side channels can revive practical off-path DNS cache poisoning despite modern randomization defenses.",
    review: "",
    reviewPath: "assets/reviews/dns-cache-poisoning-attack-reloaded.md"

  },
  {
    slug: "package-hallucinations-code-generating-llms",
    title: "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs",
    authors: "Joseph Spracklen, Raveen Wijewickrama, A H M Nazmus Sakib, Anindya Maiti, Bimal Viswanath, Murtuza Jadliwala",
    venue: "USENIX Security",
    link: "https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-742-spracklen.pdf",
    year: 2025,
    tags: ["LLMs", "code generation", "package hallucinations", "software supply chain"],
    oneLiner: "Analyzes how code-generating LLMs hallucinate non-existent packages and the security risks that follow.",
    review: "",
    reviewPath: "assets/reviews/package-hallucinations-code-generating-llms.md"

  },
  {
    slug: "abuser-inside-apps-mobile-ad-fraud",
    title: "The Abuser Inside Apps: Finding the Culprit Committing Mobile Ad Fraud",
    authors: "Joongyum Kim, Jung-hwan Park, Sooel Son",
    venue: "NDSS",
    link: "https://www.ndss-symposium.org/wp-content/uploads/ndss2021_3B-1_23161_paper-1.pdf",
    year: 2021,
    tags: ["mobile security", "ad fraud", "Android", "dynamic analysis"],
    oneLiner: "Builds a framework to trace observed mobile ad fraud back to the responsible app components and user interactions.",
    review: "",
    reviewPath: "assets/reviews/abuser-inside-apps-mobile-ad-fraud.md"
  },
  {
    slug: "hbbtv-privacy-european-smart-tv-landscape",
    title: "I Still Know What You Watched Last Sunday: Privacy of the HbbTV Protocol in the European Smart TV Landscape",
    authors: "Carlotta Tagliaro, Florian Hahn, Riccardo Sepe, Alessio Aceti, Martina Lindorfer",
    venue: "NDSS",
    link: "https://ris.utwente.nl/ws/portalfiles/portal/319904007/ndss2023_f102_paper.pdf",
    year: 2023,
    tags: ["smart TV", "HbbTV", "privacy", "measurement"],
    oneLiner: "Examines privacy risks in HbbTV deployments and how smart TVs expose users to tracking and data leakage.",
    review: "",
    reviewPath: "assets/reviews/hbbtv-privacy-european-smart-tv-landscape.md"
  },
  {
    slug: "privacy-framework-security-research-social-media-data",
    title: "SoK: A Privacy Framework for Security Research Using Social Media Data",
    authors: "Kyle Beadle, Kieron Ivy Turk, Aliai Eusebi, Mindy Tran, Marilyne Ordekian, Enrico Mariconti, Yixin Zou, Marie Vasek",
    venue: "IEEE Symposium on Security and Privacy",
    link: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=11023489&tag=1",
    year: 2025,
    tags: ["SoK", "privacy", "social media", "research methods"],
    oneLiner: "Systematizes privacy risks and reporting gaps in security research that uses social media data.",
    review: "",
    reviewPath: "assets/reviews/privacy-framework-security-research-social-media-data.md"
  },

];