import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "Website Development",
    description: "Expert creation of Shopify, Wix, and Squarespace sites with a custom, client-aligned design process. We now offer AI-based websites featuring dynamic interfaces, smart content, and automated components.",
    tags: ["Shopify & Wix", "Custom Design", "AI Websites", "Dynamic Interfaces"]
  },
  {
    id: "02",
    title: "AI Automation",
    description: "Streamline your business with automated workflows, AI-powered chatbots, and customer support systems. We implement lead qualification automations and content generation workflows to optimize your processes.",
    tags: ["Workflows", "Chatbots", "Lead Automation", "Process Optimization"]
  },
  {
    id: "03",
    title: "Digital Marketing",
    description: "Comprehensive ad campaign management across Meta, Google, and TikTok. We craft social media strategies and handle complete rebranding including logos, style guides, and identity refreshes.",
    tags: ["Ad Management", "Social Strategy", "Rebranding", "Identity"]
  },
  {
    id: "04",
    title: "Media Production",
    description: "Professional photo shoots for menus, products, and marketing materials. We produce short-form influencer-style videos and complete content creation packages for TikTok and Instagram.",
    tags: ["Photography", "Short-form Video", "Content Packages", "Influencer Style"]
  }
];

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="px-6 py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="block text-sm uppercase tracking-widest text-zinc-500 mb-4">What We Offer</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Digital Services</h2>
        </Reveal>
        
        <div className="flex flex-col">
          {services.map((service) => (
            <div key={service.id} className="border-t border-zinc-800 last:border-b">
              <div 
                className="py-10 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer group hover:bg-zinc-900/30 transition-colors px-4"
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <div className="flex items-center gap-8">
                  <span className="text-zinc-500 text-sm font-mono">{service.id}</span>
                  <h3 className="text-3xl md:text-5xl font-light group-hover:pl-4 transition-all duration-300">{service.title}</h3>
                </div>
                <div className="mt-4 md:mt-0">
                   <motion.div 
                     animate={{ rotate: activeService === service.id ? 45 : 0 }}
                     className="p-2 rounded-full border border-zinc-700"
                   >
                     <Plus className="w-6 h-6 text-zinc-400" />
                   </motion.div>
                </div>
              </div>
              
              <AnimatePresence>
                {activeService === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-0 md:pl-16 pb-10 pr-4 md:pr-32">
                      <p className="text-xl text-zinc-400 mb-6 max-w-2xl">{service.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {service.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full border border-zinc-800 text-sm text-zinc-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};