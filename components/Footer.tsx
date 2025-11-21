import React from 'react';
import { Hammer } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Footer: React.FC = () => {
  const { heroData } = useContent();
  return (
    <footer className="bg-construction-900 text-white py-12 border-t border-construction-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <Hammer className="w-6 h-6 text-safety-500" />
                <span className="font-bold text-xl uppercase">{heroData.name}</span>
            </div>
            <div className="text-concrete-400 text-sm text-center md:text-right">
                <p>&copy; {new Date().getFullYear()} Bản quyền thuộc về {heroData.name}.</p>
                <p className="mt-1">Xây dựng niềm tin - Kiến tạo giá trị.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;