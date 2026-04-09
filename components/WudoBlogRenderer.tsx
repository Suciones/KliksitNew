import React, { useEffect, useRef, useState } from 'react';

interface WudoBlogRendererProps {
  slug: string;
}

export const WudoBlogRenderer: React.FC<WudoBlogRendererProps> = ({ slug }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = `/blog/${slug}`;

    // Fetch the blog HTML content
    fetch(`${basePath}/content.html`)
      .then((res) => res.text())
      .then((content) => {
        setHtml(content);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Inject the blog CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${basePath}/blog-styles.css`;
    link.setAttribute('data-wudo-blog', 'true');
    document.head.appendChild(link);

    return () => {
      document.querySelectorAll('[data-wudo-blog]').forEach((el) => el.remove());
    };
  }, [slug]);

  // Add lazy loading to all images after HTML is rendered
  useEffect(() => {
    if (!html || !containerRef.current) return;
    containerRef.current.querySelectorAll('img').forEach((img) => {
      img.setAttribute('loading', 'lazy');
    });
  }, [html]);

  // Execute JS after HTML is rendered
  useEffect(() => {
    if (!html || !containerRef.current) return;

    const basePath = `/blog/${slug}`;
    const timer = setTimeout(() => {
      fetch(`${basePath}/script.js`)
        .then((res) => res.text())
        .then((js) => {
          try {
            const fn = new Function(js);
            fn();
          } catch (e) {
            console.warn('Wudo blog JS error:', e);
          }
        })
        .catch(() => {});
    }, 200);

    return () => clearTimeout(timer);
  }, [html, slug]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-64 bg-zinc-800 rounded-xl" />
        <div className="h-6 bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-800 rounded w-5/6" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="wudo-blog-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
