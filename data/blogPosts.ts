export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content: string[];
  isWudo?: boolean;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-agents-vs-rule-based-automation-business-growth-2026",
    title: "AI Agents vs Rule-Based Automation for Business Growth",
    excerpt: "Discover if AI agents or rule-based automation is right for your business growth in 2026. Learn the key differences.",
    date: "March 28, 2026",
    author: "Wudo",
    readTime: "12 min read",
    category: "AI & Automation",
    content: [],
    isWudo: true,
    coverImage: "/blog/ai-agents-vs-rule-based-automation-business-growth-2026/images/cover-featured-image-for-ai-agents-vs-rulebase.webp"
  }
];
