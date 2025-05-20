
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import PriceTicker from './PriceTicker';
import HectaLogo from './HectaLogo';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Mercado & Preços', href: '/mercado' },
  { name: 'Operação & Logística', href: '/operacao' },
  { name: 'Certificações', href: '/certificacoes' },
  { name: 'Tecnologia & Inclusão', href: '/tecnologia' },
  { name: 'Contato', href: '/contato' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-white/90 backdrop-blur-sm' : 'bg-white'}`}>
      <div className="w-full bg-hecta-green text-white">
        <div className="container mx-auto">
          <PriceTicker />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center" aria-label="Hecta Chia">
            <HectaLogo className="h-10" />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-hecta-green hover:text-hecta-gold transition-colors duration-200 font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Button className="bg-hecta-gold hover:bg-hecta-gold/80 text-white">
            Login Plataforma
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-hecta-green hover:text-hecta-gold"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-hecta-green hover:text-hecta-gold py-2 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-hecta-gold hover:bg-hecta-gold/80 text-white w-full">
                Login Plataforma
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
