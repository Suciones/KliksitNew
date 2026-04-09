import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Work } from '../components/Work';
import { Services } from '../components/Services';
import { CEO } from '../components/CEO';
import { GeminiContact } from '../components/GeminiContact';

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Kliksit | Web Development & AI Automation Agency in Cluj-Napoca"
        description="Kliksit is a digital agency in Cluj-Napoca specializing in custom web development, AI automation, digital marketing, and branding for ambitious businesses."
        canonical="https://kliksit.me/"
      />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <CEO />
      <GeminiContact />
    </>
  );
};

export default HomePage;
