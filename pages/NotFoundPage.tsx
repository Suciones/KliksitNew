import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/ui/Reveal';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="404 - Page Not Found | Kliksit"
        description="The page you are looking for does not exist or has been moved."
        noindex={true}
      />

      <section className="pt-32 pb-20 px-6 min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <span className="text-8xl md:text-9xl font-bold tracking-tighter text-zinc-800">404</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mt-6 mb-4">
              Page Not Found
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              The page you are looking for does not exist or has been moved.
              Let us help you find your way back.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors"
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border border-zinc-700 px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black hover:border-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Browse Blog
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
