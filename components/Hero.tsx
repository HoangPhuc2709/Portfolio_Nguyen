import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Hero: React.FC = () => {
  const { heroData } = useContent();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      // Calculate offset to account for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden group">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://picsum.photos/id/1076/1920/1080"
          alt="Construction Site"
          className="w-full h-full object-cover animate-zoom-slow"
        />
        <div className="absolute inset-0 bg-construction-900/70 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-safety-500 font-bold uppercase tracking-[0.2em] mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
          {heroData.name}
        </h2>
        <div className="overflow-hidden mb-6">
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              {heroData.title}
            </h1>
        </div>
        
        <p className="text-lg md:text-xl text-concrete-200 max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
          {heroData.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-construction-600 text-white font-semibold rounded overflow-hidden transition-all duration-300 shadow-lg shadow-construction-600/30 hover:bg-construction-500 hover:shadow-construction-500/50 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center">
               {heroData.cta} <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-construction-900 transition-colors duration-300"
          >
            Liên Hệ Ngay
          </a>
        </div>
      </div>
      
      {/* Decorative Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <div className="w-0.5 h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
      </div>
    </section>
  );
};

export default Hero;