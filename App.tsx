import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CursorProvider } from './components/ui/CursorContext';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <CursorProvider>
        <main className="bg-background text-white min-h-screen selection:bg-white selection:text-black">
          <CustomCursor />
          <AnimatePresence mode="wait">
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>

          {!isLoading && (
            <div className="animate-in fade-in duration-1000">
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </div>
          )}
        </main>
      </CursorProvider>
    </BrowserRouter>
  );
};

export default App;
