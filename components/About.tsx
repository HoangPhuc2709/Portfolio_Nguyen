import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Briefcase } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const About: React.FC = () => {
  const { aboutData, experiences } = useContent();
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
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="reveal">
            <div className="inline-block px-3 py-1 bg-construction-100 text-construction-800 rounded-full text-sm font-semibold mb-4">
              {aboutData.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-construction-900 mb-6">
              {aboutData.titleLine1} <br />
              <span className="text-construction-600">{aboutData.titleLine2}</span>
            </h2>
            <p className="text-concrete-600 text-lg mb-6 leading-relaxed">
              {aboutData.description1}
            </p>
            <p className="text-concrete-600 text-lg mb-8 leading-relaxed">
              {aboutData.description2}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {aboutData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 text-concrete-800">
                  <CheckCircle2 className="w-5 h-5 text-safety-500 flex-shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="relative reveal" style={{ transitionDelay: '200ms' }}>
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-72 h-72 bg-construction-100 rounded-full opacity-50 blur-3xl animate-pulse"></div>
             <div className="bg-concrete-100 p-8 rounded-2xl relative z-10 border border-concrete-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-construction-900 mb-6 flex items-center gap-2">
                   <Briefcase className="text-construction-600" /> Kinh Nghiệm Làm Việc
                </h3>
                <div className="space-y-8">
                    {experiences.map((exp, idx) => (
                        <div key={exp.id} className="relative pl-8 border-l-2 border-construction-200 last:pb-0 group">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-construction-600 border-4 border-white group-hover:scale-125 transition-transform duration-300"></div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                <h4 className="text-lg font-bold text-construction-800 group-hover:text-construction-600 transition-colors">{exp.role}</h4>
                                <span className="text-sm text-concrete-500 font-medium bg-white px-2 py-0.5 rounded border border-concrete-200">{exp.period}</span>
                            </div>
                            <div className="text-construction-600 font-medium mb-2">{exp.company}</div>
                            <p className="text-concrete-600 text-sm">{exp.description}</p>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;