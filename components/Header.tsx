import React, { useState, useEffect } from 'react';
import { Menu, X, Hammer, UserCog } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsOpen(false);

    // Find target element
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // Calculate offset to account for fixed header (approx 80px)
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-construction-900 font-bold text-xl group">
          <div className="p-2 bg-construction-600 rounded text-white group-hover:bg-construction-500 transition-colors">
             <Hammer className="w-6 h-6" />
          </div>
          <span className={`${isScrolled ? 'text-construction-900' : 'text-construction-900 md:text-white'} transition-colors tracking-tight`}>
            KS. NGUYỄN HOÀNG NGUYÊN
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8">
            {NAV_LINKS.map((link) => (
                <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-semibold uppercase tracking-wider hover:text-safety-500 transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-safety-500 after:transition-all after:duration-300 hover:after:w-full ${isScrolled ? 'text-concrete-800' : 'text-white'}`}
                >
                {link.name}
                </a>
            ))}
            </nav>
            
            <button 
                onClick={onAdminClick}
                className={`p-2 rounded-full hover:bg-white/10 transition-colors ${isScrolled ? 'text-concrete-400' : 'text-white/70'}`}
                title="Admin Login"
            >
                <UserCog size={20} />
            </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-construction-900 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? 'text-construction-900' : 'text-construction-900 md:text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t md:hidden animate-fadeIn">
          <nav className="flex flex-col p-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-3 px-4 hover:bg-concrete-100 text-concrete-800 font-medium border-b border-concrete-100 last:border-0"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <button
                onClick={() => {
                    setIsOpen(false);
                    onAdminClick();
                }}
                className="py-3 px-4 text-left text-construction-600 font-bold hover:bg-concrete-100 flex items-center gap-2"
            >
                <UserCog size={18} /> Đăng nhập Admin
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;