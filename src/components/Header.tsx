
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import PriceTicker from './PriceTicker';
import HectaLogo from './HectaLogo';
import { Link } from 'react-router-dom';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    href: '/'
  }, 
  {
    name: 'Certificações',
    href: '/certificacoes'
  },
  {
    name: 'Contato',
    href: '/contato'
  }
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

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-[#F5F0E9]/90 backdrop-blur-sm' : 'bg-[#F5F0E9]'}`}>
      <div className="w-full bg-hecta-green text-white">
        <div className="container mx-auto">
          <PriceTicker />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="block" aria-label="Hecta Chia">
            <HectaLogo className="h-12" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => <Link key={item.name} to={item.href} className="text-hecta-gray hover:text-hecta-gold transition-colors duration-200 font-medium">
              {item.name}
            </Link>)}
        </nav>
        
        <div className="hidden md:block">
          
        </div>
        
        {/* Mobile menu button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-hecta-gray hover:text-hecta-gold" aria-label="Toggle menu">
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-[#F5F0E9] shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              {navItems.map(item => <Link key={item.name} to={item.href} className="text-hecta-gray hover:text-hecta-gold py-2 transition-colors duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
              <Button className="bg-hecta-gold hover:bg-hecta-gold/80 text-white w-full">
                Login Plataforma
              </Button>
            </nav>
          </div>
        </div>}
    </header>;
};

export default Header;
