
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import PriceTicker from './PriceTicker';

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
          <a href="/" className="text-hecta-green font-bold text-2xl">
            Hecta Chia
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-hecta-gray hover:text-hecta-lime transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Button className="bg-hecta-green hover:bg-hecta-lime text-white">
            Login Plataforma
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-hecta-gray hover:text-hecta-green"
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
                  className="text-hecta-gray hover:text-hecta-lime py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-hecta-green hover:bg-hecta-lime text-white w-full">
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
