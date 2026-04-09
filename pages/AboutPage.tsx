import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, Users, Target, Zap, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Kliksit - Our Story, Mission & Team | Digital Agency Cluj"
        description="Learn about Kliksit, a digital agency founded in Cluj-Napoca. We combine engineering precision with creative excellence to deliver websites, AI solutions, and branding that drive real results."
        canonical="https://kliksit.me/about"
      />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal width="100%">
            <span className="block text-sm uppercase tracking-widest text-zinc-500 mb-4">About Us</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              We Build Digital<br />Experiences That Matter
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mb-16">
              Kliksit is a full-service digital agency based in Cluj-Napoca, Romania. We were founded on a simple belief: every business deserves a powerful online presence, regardless of its size. Our team combines technical expertise with creative thinking to deliver solutions that not only look exceptional but also generate measurable results for our clients.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {[
              { icon: Target, title: "Our Mission", text: "To empower businesses with cutting-edge digital solutions that drive growth, enhance brand visibility, and create lasting customer relationships. We believe technology should serve people, not the other way around." },
              { icon: Users, title: "Our Approach", text: "Every project starts with a deep understanding of your business goals, target audience, and competitive landscape. We do not believe in one-size-fits-all solutions. Instead, we craft bespoke strategies that align with your unique vision and market position." },
              { icon: Zap, title: "Innovation First", text: "We stay at the forefront of digital innovation, integrating AI-powered tools, modern frameworks, and data-driven methodologies into everything we build. Our clients benefit from the latest technologies without the complexity of managing them." },
              { icon: Award, title: "Results Driven", text: "Beautiful design is meaningless without performance. Every website we build is optimized for speed, search engines, and conversions. Every marketing campaign is tracked, analyzed, and refined to maximize your return on investment." },
            ].map((item) => (
              <Reveal key={item.title} delay={0.1}>
                <div className="border border-zinc-800 rounded-xl p-8 hover:border-zinc-700 transition-colors">
                  <item.icon className="w-8 h-8 text-white mb-4" />
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="text-zinc-400 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="border-t border-zinc-800 pt-16">
              <h2 className="text-4xl font-bold tracking-tighter mb-8">Meet the Founder</h2>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-1/3">
                  <img
                    src="/CEO.jpg"
                    alt="Founder and CEO of Kliksit Digital Agency"
                    className="w-full aspect-[3/4] object-cover rounded-lg grayscale"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">Founder & CEO</h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    A system engineering student, entrepreneur, and creator with a strong focus on discipline, execution, and problem-solving. After running multiple small businesses and building websites, ads, and branding for various companies, he founded Kliksit to offer digital solutions with a personal touch.
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    With a background in engineering and automation, he combines creativity with technical precision, building clean, high-performing websites, AI-driven systems, and impactful content for businesses that want to grow smarter.
                  </p>
                  <p className="text-zinc-500 text-sm italic border-l border-zinc-700 pl-4">
                    Outside of work, he is passionate about sports, self-development, and learning new skills, bringing the same drive and consistency to every project he takes on.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Work Together?</h2>
              <p className="text-zinc-400 mb-8">Let us help you build something extraordinary.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
