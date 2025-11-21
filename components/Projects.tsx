import React, { useEffect, useRef } from 'react';
import { useContent } from '../contexts/ContentContext';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 bg-concrete-100" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <span className="text-safety-500 font-semibold tracking-wider uppercase inline-block mb-2 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-safety-500 after:mx-auto after:mt-2">
              Dự Án Tiêu Biểu
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-construction-900 mt-2">Những Dấu Ấn Công Trình</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
                key={project.id} 
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 reveal"
                style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-construction-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-construction-900 text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide shadow-sm">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="absolute top-0 right-6 transform -translate-y-1/2 w-12 h-12 bg-construction-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-[-50%] transition-all duration-300">
                    <ArrowUpRight size={24} />
                </div>

                <h3 className="text-xl font-bold text-construction-900 mb-3 group-hover:text-construction-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-concrete-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 border-t border-concrete-100 pt-4">
                  {project.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-[10px] text-concrete-500 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-sm font-bold text-construction-800 font-mono">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;