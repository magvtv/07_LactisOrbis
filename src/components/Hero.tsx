
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Instagram, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Instagram photos of people enjoying Planet Yogurt
  const backgroundImages = [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1576669801820-0b8817b09f7b?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&h=1080&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % backgroundImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + backgroundImages.length) % backgroundImages.length
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-70' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Carousel Navigation */}
      <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-20">
        <button
          onClick={prevImage}
          className="bg-white/20 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-20">
        <button
          onClick={nextImage}
          className="bg-white/20 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-py-pink/20 rounded-full animate-float"></div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-py-green/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-20 w-8 h-8 sm:w-12 sm:h-12 bg-py-orange/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-py-pink/15 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Hero Content - Adjusted spacing for mobile */}
          <div className="mb-12 sm:mb-16 mt-16 sm:mt-20 animate-fade-in">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight">
              <span className="bg-gradient-to-r from-py-pink to-py-green bg-clip-text text-transparent">Healthy</span>{' '}
              <span className="text-white">•</span>{' '}
              <span className="bg-gradient-to-r from-py-green to-py-orange bg-clip-text text-transparent">Tasty</span>{' '}
              <span className="text-white">•</span>{' '}
              <span className="bg-gradient-to-r from-py-orange to-py-pink bg-clip-text text-transparent">Fun</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 leading-relaxed drop-shadow-md px-2">
              Where smiles swirl and flavors bring us together! 
              <br className="hidden sm:block" />
              <span className="text-py-pink font-semibold">#PYVibes</span> at every scoop 🍨
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="mb-6 sm:mb-8 animate-fade-in bg-gradient-to-r from-py-pink to-py-orange p-3 sm:p-4 rounded-full inline-block mx-2" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center space-x-2 text-white text-sm sm:text-base">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold">🚀 Online Ordering Coming Soon!</span>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 animate-fade-in px-2" style={{animationDelay: '0.2s'}}>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium">
              20+ Flavors
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium">
              Fresh Daily
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium">
              Family Friendly
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium">
              Premium Toppings
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in px-4" style={{animationDelay: '0.4s'}}>
            <Link to="/stores" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="bg-py-pink text-white border-0 hover:bg-py-pink/90 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-py hover-scale w-full sm:w-auto"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Find Your Store
              </Button>
            </Link>
            <Link to="/flavors" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-py-pink px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover-scale backdrop-blur-sm w-full sm:w-auto"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                See Our Flavors
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 animate-fade-in px-2" style={{animationDelay: '0.6s'}}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-py-pink to-py-green bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-lg">6</div>
              <div className="text-white/90 text-xs sm:text-sm md:text-base drop-shadow-md">Store Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-py-green to-py-orange bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-lg">20+</div>
              <div className="text-white/90 text-xs sm:text-sm md:text-base drop-shadow-md">Flavor Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-py-orange to-py-pink bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-lg">100%</div>
              <div className="text-white/90 text-xs sm:text-sm md:text-base drop-shadow-md">Natural Ingredients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-py-pink to-py-green bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-lg">∞</div>
              <div className="text-white/90 text-xs sm:text-sm md:text-base drop-shadow-md">Smiles Created</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
