import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center transition-colors duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Link
          to="/"
          className="text-xl font-bold tracking-tighter cursor-pointer z-50 relative"
          aria-label="Kliksit homepage"
        >
          KLIKSIT
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
          {navLinks.map((item) =>
            item.href.startsWith('/#') ? (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="hover:text-white transition-colors duration-300 cursor-none"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="hover:text-white transition-colors duration-300 cursor-none"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <Link
          to="/contact"
          className="hidden md:block text-sm font-medium border border-zinc-700 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-none pointer-events-auto"
        >
          Let's Talk
        </Link>

        {/* Mobile Toggle */}
        <div className="md:hidden z-50 cursor-none pointer-events-auto" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 text-2xl"
        >
          {navLinks.map((item) =>
            item.href.startsWith('/#') ? (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="cursor-none hover:text-zinc-400 transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="cursor-none hover:text-zinc-400 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </motion.div>
      )}
    </>
  );
};
