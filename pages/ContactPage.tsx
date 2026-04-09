import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { GeminiContact } from '../components/GeminiContact';
import { Reveal } from '../components/ui/Reveal';
import { MapPin, Mail, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Contact Kliksit - Start Your Digital Project | Free AI Brief"
        description="Get in touch with Kliksit to discuss your next digital project. Describe your vision and our AI strategist will generate a free project brief instantly. Based in Cluj-Napoca, Romania."
        canonical="https://kliksit.me/contact"
      />

      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal width="100%">
            <span className="block text-sm uppercase tracking-widest text-zinc-500 mb-4">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              Let's Build Something<br />Extraordinary
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Whether you need a stunning website, intelligent automation, a full marketing strategy, or professional media content, we are here to help. Describe your project below and our AI strategist will draft an instant brief, or reach out directly using the contact details provided.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="border border-zinc-800 rounded-xl p-6 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-zinc-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-zinc-400 text-sm">Cluj-Napoca, Romania</p>
                </div>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 flex items-start gap-4">
                <Mail className="w-6 h-6 text-zinc-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a href="mailto:suciu.andrei.corneliu@gmail.com" className="text-zinc-400 text-sm hover:text-white transition-colors">suciu.andrei.corneliu@gmail.com</a>
                </div>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 flex items-start gap-4">
                <Phone className="w-6 h-6 text-zinc-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Availability</h3>
                  <p className="text-zinc-400 text-sm">Mon — Fri, 9:00 — 18:00 CET</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <GeminiContact />
    </>
  );
};

export default ContactPage;
