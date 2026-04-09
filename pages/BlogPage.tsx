import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { isWudoConfigured, listWudoBlogs, getWudoImageUrl, WudoBlog } from '../lib/wudo';

const BlogPage: React.FC = () => {
  const [apiBlogs, setApiBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!isWudoConfigured()) return;

    listWudoBlogs(1, 50)
      .then((res) => {
        const mapped: BlogPost[] = res.blogs.map((b: WudoBlog) => ({
          slug: b.slug,
          title: b.title,
          excerpt: b.metaDescription || b.excerpt || '',
          date: new Date(b.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author: 'Wudo',
          readTime: `${b.readingTimeMinutes} min read`,
          category: b.category,
          content: [],
          isWudo: true,
          coverImage: b.featuredImageUrl ? getWudoImageUrl(b.featuredImageUrl) : undefined,
        }));
        setApiBlogs(mapped);
      })
      .catch((err) => console.warn('Failed to fetch Wudo blogs:', err));
  }, []);

  // Merge local and API blogs, deduplicate by slug (local takes priority)
  const localSlugs = new Set(blogPosts.map((p) => p.slug));
  const uniqueApiBlogs = apiBlogs.filter((b) => !localSlugs.has(b.slug));
  const allPosts = [...blogPosts, ...uniqueApiBlogs];

  return (
    <>
      <SEOHead
        title="Blog - Digital Marketing, Web Development & AI Insights | Kliksit"
        description="Read the latest insights from Kliksit on web development, AI automation, digital marketing, and growing your business online."
        canonical="https://kliksit.me/blog"
      />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal width="100%">
            <span className="block text-sm uppercase tracking-widest text-zinc-500 mb-4">Our Blog</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              Insights &<br />Resources
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mb-16">
              Stay ahead of the curve with our latest articles on web development, AI automation, digital marketing, and business growth strategies. We share practical knowledge gained from real client projects and industry experience.
            </p>
          </Reveal>

          <div className="space-y-8">
            {allPosts.map((post, index) => (
              <Reveal key={post.slug} delay={0.1 * Math.min(index, 5)}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="block border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all group"
                >
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  )}
                  <div className="flex flex-col md:flex-row justify-between gap-6 p-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                        <span>{post.date}</span>
                        {post.isWudo && (
                          <span className="px-2 py-0.5 bg-white text-black text-xs font-bold rounded-full">Wudo</span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-zinc-300 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-zinc-400 leading-relaxed">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                        <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Want to Stay Updated?</h2>
              <p className="text-zinc-400 mb-8">Follow us on social media for the latest tips and industry news.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-zinc-700 px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black hover:border-white transition-colors"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
