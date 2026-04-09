const WUDO_BASE_URL = 'https://wudoseo.com';
const WUDO_API_KEY = import.meta.env.VITE_WUDO_API_KEY || '';

export interface WudoBlog {
  title: string;
  slug: string;
  metaDescription: string;
  excerpt: string;
  featuredImageUrl: string;
  ogImageUrl: string;
  category: string;
  readingTimeMinutes: number;
  wordCount: number;
  keywords: string[];
  publishedAt: string;
  htmlContent?: string;
  cssContent?: string;
  jsContent?: string;
  schemaOrgJson?: string;
}

export interface WudoBlogListResponse {
  blogs: WudoBlog[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface WudoCategory {
  category: string;
  count: number;
}

async function wudoFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${WUDO_BASE_URL}${path}`, {
    headers: {
      'X-Api-Key': WUDO_API_KEY,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`Wudo API ${res.status}: ${res.statusText}`);
  return res.json();
}

export function isWudoConfigured(): boolean {
  return WUDO_API_KEY.length > 0;
}

export function getWudoImageUrl(relativePath: string): string {
  if (relativePath.startsWith('http')) return relativePath;
  return `${WUDO_BASE_URL}${relativePath}`;
}

export async function listWudoBlogs(page = 1, pageSize = 12): Promise<WudoBlogListResponse> {
  return wudoFetch<WudoBlogListResponse>(`/api/v1/blogs?page=${page}&pageSize=${pageSize}&sort=newest`);
}

export async function getWudoBlog(slug: string): Promise<WudoBlog> {
  return wudoFetch<WudoBlog>(`/api/v1/blogs/${slug}`);
}

export async function getRelatedBlogs(slug: string, limit = 3): Promise<WudoBlog[]> {
  return wudoFetch<WudoBlog[]>(`/api/v1/blogs/${slug}/related?limit=${limit}`);
}

export async function getWudoCategories(): Promise<WudoCategory[]> {
  return wudoFetch<WudoCategory[]>(`/api/v1/blogs/categories`);
}
