
import { useState, useEffect } from 'react';
import { MapPin, Instagram, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
              <img 
                src="/pylogo.png" 
                alt="Planet Yogurt Africa Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient truncate">Planet Yogurt</h1>
              <p className="text-xs md:text-sm text-gray-600 -mt-1 hidden sm:block">Africa</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/flavors" className={`transition-colors font-medium text-sm xl:text-base ${
              isScrolled ? 'text-gray-700 hover:text-py-pink' : 'text-white hover:text-py-pink'
            }`}>
              Flavors
            </Link>
            <Link to="/stores" className={`transition-colors font-medium text-sm xl:text-base ${
              isScrolled ? 'text-gray-700 hover:text-py-pink' : 'text-white hover:text-py-pink'
            }`}>
              Stores  
            </Link>
            <Link to="/quiz" className={`transition-colors font-medium text-sm xl:text-base ${
              isScrolled ? 'text-gray-700 hover:text-py-pink' : 'text-white hover:text-py-pink'
            }`}>
              Quiz
            </Link>
            <a href="#instagram" className={`transition-colors font-medium text-sm xl:text-base ${
              isScrolled ? 'text-gray-700 hover:text-py-pink' : 'text-white hover:text-py-pink'
            }`}>
              Instagram
            </a>
            <a href="#about" className={`transition-colors font-medium text-sm xl:text-base ${
              isScrolled ? 'text-gray-700 hover:text-py-pink' : 'text-white hover:text-py-pink'
            }`}>
              About
            </a>
          </nav>

          {/* Action Buttons - Hidden on small screens, shown on medium+ */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-py-green text-py-green hover:bg-py-green hover:text-white text-xs lg:text-sm px-2 lg:px-3"
            >
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Find Store</span>
              <span className="lg:hidden">Store</span>
            </Button>
            <Button
              size="sm" 
              className="bg-gradient-primary text-white border-0 hover:opacity-90 text-xs lg:text-sm px-2 lg:px-3"
            >
              <Instagram className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Follow Us</span>
              <span className="lg:hidden">Follow</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className={`lg:hidden p-2 ${isScrolled ? 'text-gray-700' : 'text-white'} flex-shrink-0`}
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 animate-fade-in bg-white/95 backdrop-blur-sm rounded-b-lg mx-2 sm:mx-0">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/flavors" 
                className="text-gray-700 hover:text-py-pink transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Flavors
              </Link>
              <Link 
                to="/stores" 
                className="text-gray-700 hover:text-py-pink transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Stores
              </Link>
              <Link 
                to="/quiz" 
                className="text-gray-700 hover:text-py-pink transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Link>
              <a 
                href="#instagram" 
                className="text-gray-700 hover:text-py-pink transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Instagram
              </a>
              <a 
                href="#about" 
                className="text-gray-700 hover:text-py-pink transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 px-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-py-green text-py-green hover:bg-py-green hover:text-white w-full justify-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Store
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-primary text-white border-0 hover:opacity-90 w-full justify-center"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Follow Us
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
