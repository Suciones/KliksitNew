import React from 'react';
import { Reveal } from './ui/Reveal';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black py-20 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-6">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tighter">KLIKSIT</h2>
          </Reveal>
          <div className="text-zinc-500 max-w-xs">
            <p>Designing the future of digital experiences. Cluj-Napoca, RO.</p>
          </div>
        </div>

        <div className="flex gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium uppercase tracking-widest text-sm">Socials</h4>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors cursor-none block">Instagram</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors cursor-none block">Twitter</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors cursor-none block">LinkedIn</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium uppercase tracking-widest text-sm">Sitemap</h4>
            {['work', 'about', 'services', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-zinc-500 hover:text-white transition-colors cursor-none text-left capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 flex justify-between text-zinc-600 text-sm">
        <span>© 2024 Kliksit Agency</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
};