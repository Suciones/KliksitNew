import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { WudoBlogRenderer } from '../components/WudoBlogRenderer';
import { Reveal } from '../components/ui/Reveal';
import { ArrowLeft, ArrowRight, Clock, Tag, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { isWudoConfigured, getWudoBlog, getWudoImageUrl, WudoBlog } from '../lib/wudo';

function parseDateToISO(dateStr: string): string {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  // Wudo API state
  const [wudoBlog, setWudoBlog] = useState<WudoBlog | null>(null);
  const [wudoLoading, setWudoLoading] = useState(false);
  const [wudoError, setWudoError] = useState(false);

  // Fetch from Wudo API if not found locally
  useEffect(() => {
    if (post || !slug || !isWudoConfigured()) return;

    setWudoLoading(true);
    getWudoBlog(slug)
      .then((blog) => {
        setWudoBlog(blog);
        setWudoLoading(false);
      })
      .catch(() => {
        setWudoError(true);
        setWudoLoading(false);
      });
  }, [slug, post]);

  const otherPosts = blogPosts.filter((p) => p.slug !== slug);

  // Loading state for API blogs
  if (wudoLoading) {
    return (
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="animate-pulse max-w-3xl mx-auto">
          <div className="h-8 bg-zinc-800 rounded w-3/4 mx-auto mb-4" />
          <div className="h-4 bg-zinc-800 rounded w-1/2 mx-auto" />
        </div>
      </section>
    );
  }

  // Not found
  if (!post && !wudoBlog) {
    if (wudoError || !isWudoConfigured()) {
      return (
        <section className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-zinc-400 mb-8">The article you are looking for does not exist.</p>
          <Link to="/blog" className="text-white underline hover:text-zinc-300">Back to Blog</Link>
        </section>
      );
    }
    return null;
  }

  // Render Wudo API blog (fetched dynamically via API)
  if (wudoBlog && wudoBlog.htmlContent && wudoBlog.cssContent) {
    return (
      <>
        <SEOHead
          title={`${wudoBlog.title} | Kliksit`}
          description={wudoBlog.metaDescription}
          canonical={`https://kliksit.me/blog/${wudoBlog.slug}`}
          ogType="article"
          article={{
            author: 'Wudo',
            datePublished: wudoBlog.publishedAt,
            image: wudoBlog.featuredImageUrl ? getWudoImageUrl(wudoBlog.featuredImageUrl) : undefined,
            section: wudoBlog.category,
          }}
        />

        <div className="pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">{wudoBlog.title}</h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                className="wudo-blog-wrapper"
                dangerouslySetInnerHTML={{ __html: wudoBlog.htmlContent }}
              />
            </Reveal>

            <ContinueReading posts={otherPosts} />
          </div>
        </div>
      </>
    );
  }

  // Render local Wudo blog (from public/blog/[slug]/)
  if (post!.isWudo) {
    return (
      <>
        <SEOHead
          title={`${post!.title} | Kliksit`}
          description={post!.excerpt}
          canonical={`https://kliksit.me/blog/${post!.slug}`}
          ogImage={post!.coverImage}
          ogType="article"
          article={{
            author: post!.author,
            datePublished: parseDateToISO(post!.date),
            image: post!.coverImage,
            section: post!.category,
          }}
        />

        <div className="pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">{post!.title}</h1>
            </Reveal>

            <Reveal delay={0.1}>
              <WudoBlogRenderer slug={post!.slug} />
            </Reveal>

            <ContinueReading posts={otherPosts} />
          </div>
        </div>
      </>
    );
  }

  // Render standard text blog post
  return (
    <>
      <SEOHead
        title={`${post!.title} | Kliksit`}
        description={post!.excerpt}
        canonical={`https://kliksit.me/blog/${post!.slug}`}
        ogImage={post!.coverImage}
        ogType="article"
        article={{
          author: post!.author,
          datePublished: parseDateToISO(post!.date),
          image: post!.coverImage,
          section: post!.category,
        }}
      />

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 mb-6 text-sm text-zinc-500">
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {post!.category}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post!.readTime}</span>
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post!.author}</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{post!.title}</h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-zinc-500 mb-12">{post!.date}</p>
          </Reveal>

          <div className="space-y-6">
            {post!.content.map((paragraph, index) => (
              <Reveal key={index} delay={0.05 * index}>
                <p className="text-lg text-zinc-300 leading-relaxed">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <ContinueReading posts={otherPosts} />
        </div>
      </article>
    </>
  );
};

// Shared "Continue Reading" section
const ContinueReading: React.FC<{ posts: typeof blogPosts }> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <Reveal delay={0.2}>
      <div className="mt-16 border-t border-zinc-800 pt-12">
        <h2 className="text-2xl font-bold tracking-tighter mb-8">Continue Reading</h2>
        <div className="space-y-6">
          {posts.map((other) => (
            <Link
              key={other.slug}
              to={`/blog/${other.slug}`}
              className="flex items-center justify-between border border-zinc-800 rounded-lg p-6 hover:border-zinc-600 transition-colors group"
            >
              <div>
                <h3 className="text-lg font-bold group-hover:text-zinc-300 transition-colors">{other.title}</h3>
                <span className="text-sm text-zinc-500">{other.date}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default BlogPostPage;
