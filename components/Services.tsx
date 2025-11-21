import React, { useEffect, useRef } from 'react';
import { Ruler, HardHat, FileText, Search, PenTool, Box, Truck, Home, Building2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

// Extended icon map for flexibility
const iconMap: Record<string, React.ReactNode> = {
  Ruler: <Ruler className="w-8 h-8" />,
  HardHat: <HardHat className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
  PenTool: <PenTool className="w-8 h-8" />,
  Box: <Box className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
  Home: <Home className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />
};

const Services: React.FC = () => {
  const { services } = useContent();
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
    <section id="services" className="py-20 bg-construction-900 text-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 reveal">
            <div className="max-w-2xl">
                <span className="text-safety-500 font-semibold tracking-wider uppercase">Lĩnh Vực Hoạt Động</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">Giải Pháp Xây Dựng Toàn Diện</h2>
                <p className="text-concrete-200 mt-4 text-lg">
                    Tôi cung cấp các dịch vụ kỹ thuật chất lượng cao, đảm bảo tuân thủ nghiêm ngặt các tiêu chuẩn xây dựng Việt Nam và Quốc tế.
                </p>
            </div>
            <button className="hidden lg:block px-6 py-3 border border-concrete-600 hover:bg-white hover:text-construction-900 rounded transition-colors duration-300 mt-6 lg:mt-0">
                Tải Hồ Sơ Năng Lực
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
                key={service.id} 
                className="bg-construction-800 p-8 rounded-lg hover:bg-construction-700 transition-all duration-300 border border-construction-700 group reveal hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-construction-600 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-construction-900/50">
                {iconMap[service.icon] || <HardHat className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-safety-500 transition-colors">{service.title}</h3>
              <p className="text-concrete-300 leading-relaxed group-hover:text-concrete-100 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;