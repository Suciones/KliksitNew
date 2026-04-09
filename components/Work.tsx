import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from './ui/CursorContext';
import { X, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectData {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string; // Cover image
  description: string;
  technologies: string[];
  gallery: string[];
  link: string;
}

const projects: ProjectData[] = [
  { 
    id: 1, 
    title: "AleNegrea Lash Studio", 
    category: "Personal Portfolio", 
    image: "/AleNegrea.png", 
    year: "2024",
    description: "alenegrea.studio is a modern personal portfolio website designed to present the creative identity and professional work of Alen Negrea. The website focuses on clean minimalism, aesthetic balance, and an intuitive user experience. Its layout highlights visuals, services, and personal brand elements through a smooth, structured interface that feels both professional and artistic.",
    technologies: ["Figma", "HTML5", "CSS3", "JavaScript"],
    gallery: [
      "/alenegrea1.png",
      "/alenegrea2.png",
      "/alenegrea3.png"
    ],
    link: "https://alenegrea.studio"
  },
  { 
    id: 2, 
    title: "AquaBuild", 
    category: "Professional Services", 
    image: "/aquabuild1.png", 
    year: "2024",
    description: "AquaBuild is a modern and visually appealing website designed for a professional pool-building company. The goal of the project was to create a digital presence that reflects trust, craftsmanship, and premium service quality while making it easy for potential clients to explore pool design options and request quotes.\n\nThe website combines clear visual communication with an intuitive layout to guide visitors through the company’s services, past projects, and contact options. The overall tone of the website is professional, refreshing, and trust-building—reflecting AquaBuild’s dedication to premium pool craftsmanship.",
    technologies: ["Figma", "React.js", "HTML5", "CSS3", "JavaScript"],
    gallery: [
      "/aquabuild2.png",
      "/aquabuild3.png",
      "/aquabuild4.png",
      "/aquabuild5.png"
    ],
    link: "#"
  },
  { 
    id: 3, 
    title: "AERO", 
    category: "E-commerce / Education", 
    image: "/aero1.png", 
    year: "2024",
    description: "AERO is a modern, minimalistic online bookstore designed as part of a mentorship program. The goal of the project was to create a clean and intuitive digital platform where users can easily explore books, view details, and understand the core value of reading as part of personal and professional growth.\n\nAERO focuses on simplicity, readability, and an elegant user journey. The design elevates the content while maintaining a calming, book-friendly aesthetic.",
    technologies: ["Figma", "React.js", "HTML5", "CSS3", "JavaScript"],
    gallery: [
      "/aero2.png",
      "/aero3.png"
    ],
    link: "#"
  },
  { 
    id: 4, 
    title: "STAG", 
    category: "E-commerce", 
    image: "/stag1.png", 
    year: "2024",
    description: "STAG is a modern e-commerce website focused on health, wellness, and performance-enhancing products. The goal of the project was to build a clean, trustworthy, and conversion-optimized digital storefront where customers can easily explore and purchase high-quality health supplements, hydration products, and lifestyle essentials.\n\nThe design emphasizes clarity, credibility, and a smooth shopping experience. STAG presents health products in a fresh and modern interface that appeals to fitness-minded customers and everyday buyers looking to improve their wellbeing.",
    technologies: ["Figma", "React.js", "HTML5", "CSS3", "JavaScript"],
    gallery: [
      "/stag2.png",
      "/stag3.png",
      "/stag4.png",
      "/stag5.png"
    ],
    link: "#"
  },
];

export const Work: React.FC = () => {
  const { setCursorType } = useCursor();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const openProject = (project: ProjectData) => {
    setSelectedProject(project);
    setCursorType('default'); // Reset cursor when modal opens so user can click X
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section id="work" className="px-6 py-32 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-zinc-800 pb-8">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">Selected<br/>Work</h2>
          </Reveal>
          <Reveal delay={0.2}>
             <p className="text-zinc-400 mb-2">Explore our recent projects</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group cursor-none ${index % 2 === 1 ? 'md:mt-24' : ''}`}
              onMouseEnter={() => !selectedProject && setCursorType('project')}
              onMouseLeave={() => setCursorType('default')}
              onClick={() => openProject(project)}
            >
              <Reveal delay={0.1 * index}>
                <div className="overflow-hidden rounded-lg mb-6 relative">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-[500px] object-cover bg-zinc-900 grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      // Fallback visual if image fails to load
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.backgroundColor = '#18181b';
                        const div = document.createElement('div');
                        div.className = 'w-full h-[500px] flex items-center justify-center bg-zinc-900 text-zinc-700 text-sm uppercase tracking-widest';
                        div.innerText = 'Image Not Found';
                        e.currentTarget.parentElement.appendChild(div);
                      }
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs uppercase border border-white/10 z-10">
                    {project.year}
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                  <h3 className="text-3xl font-medium group-hover:text-zinc-300 transition-colors">{project.title}</h3>
                  <span className="text-zinc-500 text-sm uppercase tracking-wider">{project.category}</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
           <Reveal>
            <span className="text-zinc-500 text-sm uppercase tracking-widest border-b border-zinc-800 pb-1">
              Contact for more examples
            </span>
           </Reveal>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
            // Force default cursor on the modal overlay so interactions work properly
            onMouseEnter={() => setCursorType('default')}
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
              onClick={closeProject}
            />
            
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-zinc-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 shadow-2xl flex flex-col no-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={closeProject}
                className="absolute top-6 right-6 z-20 p-2 bg-black/50 backdrop-blur rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Cover Image */}
              <div className="w-full h-64 md:h-96 relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.backgroundColor = '#27272a';
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMiLz48L3N2Zz4='; // basic placeholder
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-12">
                  <span className="text-blue-400 text-sm uppercase tracking-widest font-medium mb-2 block">{selectedProject.category}</span>
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">{selectedProject.title}</h3>
                </div>
              </div>

              {/* Content Grid */}
              <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Left: Description & Tech */}
                <div className="md:col-span-1 space-y-8">
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">About the Project</h4>
                    <p className="text-zinc-300 leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 border border-zinc-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Only show link if it's not a placeholder '#' */}
                  {selectedProject.link && selectedProject.link !== '#' && (
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors group"
                    >
                      Visit Live Site <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Right: Gallery */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.gallery.map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`${selectedProject.title} gallery ${i+1}`}
                      className="w-full h-64 object-cover rounded-lg border border-zinc-800 hover:opacity-80 transition-opacity"
                      onError={(e) => {
                         e.currentTarget.style.display = 'none';
                      }}
                    />
                  ))}
                  {/* Decorative placeholder if odd number */}
                  {selectedProject.gallery.length % 2 !== 0 && (
                    <div className="w-full h-64 bg-zinc-800/50 rounded-lg flex items-center justify-center border border-zinc-800">
                       <span className="text-zinc-600 text-xs uppercase tracking-widest">More coming soon</span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};