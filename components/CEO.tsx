import React from 'react';
import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';

export const CEO: React.FC = () => {
  return (
    <section className="px-6 py-32 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        
        {/* Image / Visual Side */}
        
        <div className="w-full md:w-1/2">
          <Reveal width="100%">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-900">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                src="/CEO.jpg"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.opacity = '0';
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.style.backgroundColor = '#27272a'; // zinc-800
                    const span = document.createElement('span');
                    span.innerText = 'Founder Image';
                    span.className = 'absolute inset-0 flex items-center justify-center text-zinc-500 uppercase tracking-widest text-sm';
                    e.currentTarget.parentElement.appendChild(span);
                  }
                }}
                alt="Founder & CEO of Kliksit"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur px-4 py-2 border border-white/10 rounded-lg z-10">
                <span className="text-white text-sm font-medium tracking-wider uppercase">Founder & CEO</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Text Content Side */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
           <Reveal>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Meet the<br />Visionary
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
              <p>
                He is a system engineering student, entrepreneur, and creator with a strong focus on discipline, execution, and problem-solving. After running multiple small businesses and building websites, ads, and branding for various companies, he founded Kliksit to offer digital solutions with a personal touch.
              </p>
              <p>
                With a background in engineering and automation, he combines creativity with technical precision—building clean, high-performing websites, AI-driven systems, and impactful content for businesses that want to grow smarter.
              </p>
              <p>
                Outside of work, he’s passionate about sports, self-development, and learning new skills, bringing the same drive and consistency to every project he takes on.
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};