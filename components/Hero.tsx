import React from 'react';
import { Reveal, RevealText } from './ui/Reveal';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
      
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        <Reveal width="100%">
           <div className="relative">
             <h1 className="text-[12vw] leading-[0.9] font-bold tracking-tighter text-white">
              WE CRAFT
              <br />
              <span className="text-zinc-500 ml-[10vw]">DIGITAL</span>
              <br />
              REALITY.
            </h1>
            
            {/* Desktop Button - Significantly larger for visibility */}
            <motion.button 
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex absolute right-0 bottom-4 items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-bold text-lg tracking-widest hover:bg-zinc-200 transition-all z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              GET A FREE DEMO <ArrowRight className="w-6 h-6" />
            </motion.button>
           </div>
           
           {/* Mobile Button - Larger and more prominent */}
           <motion.button 
              onClick={scrollToContact}
              whileTap={{ scale: 0.95 }}
              className="md:hidden mt-8 w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black rounded-full font-bold text-base tracking-widest hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              GET A FREE DEMO <ArrowRight className="w-5 h-5" />
            </motion.button>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-between items-end mt-10 gap-10">
          <Reveal delay={0.5}>
            <div className="max-w-md">
              <RevealText 
                text="Kliksit is a forward-thinking digital agency based in Cluj-Napoca. We turn people's dreams into reality, merging aesthetics with technology to build brands that dominate their industry."
                className="text-xl text-zinc-400 leading-relaxed"
                delay={0.8}
              />
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="flex gap-4 items-center">
               <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center animate-spin-slow">
                 <ArrowDownRight className="w-6 h-6" />
               </div>
               <span className="text-sm uppercase tracking-widest">Scroll Down</span>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Background Elements */}
      <motion.div 
        className="absolute right-0 top-1/3 -z-10 opacity-20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <div className="w-[500px] h-[500px] bg-blue-900 rounded-full" />
      </motion.div>

    </section>
  );
};