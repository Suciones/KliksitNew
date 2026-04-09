import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, Globe, Bot, Megaphone, Camera } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "We build high-performance websites that convert visitors into customers. From sleek Shopify stores and elegant Wix sites to fully custom React and Next.js applications, our development team creates digital experiences tailored to your brand identity and business objectives.",
    features: [
      "Custom Shopify, Wix, and Squarespace development",
      "AI-enhanced websites with dynamic interfaces and smart content",
      "Responsive design optimized for all devices and screen sizes",
      "Performance optimization for fast load times and high Core Web Vitals",
      "SEO-friendly architecture with clean URLs and structured data",
      "E-commerce solutions with secure payment integration"
    ]
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Streamline your business operations with intelligent automation that works around the clock. Our AI solutions handle repetitive tasks, qualify leads, and provide instant customer support, allowing your team to focus on strategic growth initiatives that move the needle.",
    features: [
      "Custom AI chatbots for customer service and lead qualification",
      "Automated email and SMS marketing workflows",
      "Intelligent lead scoring and nurturing sequences",
      "Content generation and social media scheduling automation",
      "CRM integration and data synchronization pipelines",
      "Process optimization consulting and implementation"
    ]
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Reach the right audience with the right message at the right time. Our marketing team manages comprehensive advertising campaigns across Meta, Google, and TikTok while developing social media strategies that build authentic connections with your target customers.",
    features: [
      "Paid advertising on Meta, Google Ads, and TikTok",
      "Social media strategy development and management",
      "Complete brand identity design including logos and style guides",
      "Search engine optimization for long-term organic growth",
      "Email marketing campaigns with advanced segmentation",
      "Analytics reporting and performance optimization"
    ]
  },
  {
    icon: Camera,
    title: "Media Production",
    description: "Elevate your brand with professional visual content that captures attention and tells your story. From product photography to short-form video content optimized for social media, our production team delivers assets that make your brand stand out in crowded feeds.",
    features: [
      "Professional product and food photography",
      "Short-form video production for TikTok and Instagram Reels",
      "Influencer-style content creation packages",
      "Brand photography and team headshots",
      "Video editing and post-production services",
      "Content strategy for visual platforms"
    ]
  }
];

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Our Services - Web Development, AI, Marketing & Media | Kliksit"
        description="Explore Kliksit's full range of digital services: custom website development, AI automation, digital marketing campaigns, and professional media production for growing businesses."
        canonical="https://kliksit.me/services"
      />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal width="100%">
            <span className="block text-sm uppercase tracking-widest text-zinc-500 mb-4">What We Do</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              Services Built for<br />Modern Businesses
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mb-20">
              We offer a comprehensive suite of digital services designed to help businesses establish a commanding online presence, automate their operations, and connect with their ideal customers. Every solution is tailored to your specific needs and goals.
            </p>
          </Reveal>

          <div className="space-y-16">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={0.1}>
                <div className="border border-zinc-800 rounded-2xl p-8 md:p-12 hover:border-zinc-700 transition-colors">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-zinc-500 font-mono text-sm">0{index + 1}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{service.title}</h2>
                      <p className="text-zinc-400 leading-relaxed">{service.description}</p>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">What is included</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-zinc-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Have a Project in Mind?</h2>
              <p className="text-zinc-400 mb-8">Tell us about your vision and our AI will draft an instant strategy brief.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
