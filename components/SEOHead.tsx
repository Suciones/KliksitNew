import React, { useEffect } from 'react';

interface ArticleSchema {
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  section?: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: ArticleSchema;
  noindex?: boolean;
}

const BASE_URL = 'https://kliksit.me';

export const SEOHead: React.FC<SEOProps> = ({ title, description, canonical, ogImage, ogType = 'website', article, noindex }) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr: string = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:site_name', 'Kliksit Digital Agency', 'property');
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');

    if (noindex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    if (canonical) {
      setMeta('og:url', canonical, 'property');
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    if (ogImage) {
      setMeta('og:image', ogImage, 'property');
      setMeta('twitter:image', ogImage, 'name');
    }

    // Hreflang tags (en + ro + x-default)
    if (canonical) {
      const path = canonical.replace(BASE_URL, '');
      const hreflangs = [
        { lang: 'en', href: `${BASE_URL}${path}` },
        { lang: 'ro', href: `${BASE_URL}/ro${path}` },
        { lang: 'x-default', href: `${BASE_URL}${path}` },
      ];

      // Remove old hreflang tags
      document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());

      hreflangs.forEach(({ lang, href }) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        link.setAttribute('href', href);
        link.setAttribute('data-hreflang', 'true');
        document.head.appendChild(link);
      });
    }

    // Article JSON-LD structured data
    const existingArticleLD = document.querySelector('script[data-article-ld]');
    if (existingArticleLD) existingArticleLD.remove();

    if (article) {
      const articleLD = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        author: {
          '@type': 'Organization',
          name: article.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Kliksit',
          url: BASE_URL,
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        mainEntityOfPage: canonical || `${BASE_URL}/blog`,
        ...(article.image && { image: article.image.startsWith('http') ? article.image : `${BASE_URL}${article.image}` }),
        ...(article.section && { articleSection: article.section }),
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-article-ld', 'true');
      script.textContent = JSON.stringify(articleLD);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, ogImage, ogType, article, noindex]);

  return null;
};
