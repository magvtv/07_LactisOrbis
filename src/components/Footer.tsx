
import { MapPin, Phone, Mail, Instagram, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-yogurt rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">PY</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">Planet Yogurt</h3>
                <p className="text-sm text-gray-400 -mt-1">Africa</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Where smiles swirl and flavors bring us together. 
              Healthy • Tasty • Fun - that's the Planet Yogurt promise.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-yogurt-pink text-yogurt-pink hover:bg-yogurt-pink hover:text-white"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Follow Us
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yogurt-green">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#flavors" className="text-gray-300 hover:text-yogurt-pink transition-colors">
                  Our Flavors
                </a>
              </li>
              <li>
                <a href="#stores" className="text-gray-300 hover:text-yogurt-pink transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#instagram" className="text-gray-300 hover:text-yogurt-pink transition-colors">
                  Instagram Feed
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-yogurt-pink transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yogurt-green">Store Hours</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-yogurt-pink" />
                <span className="text-sm">Monday - Sunday</span>
              </div>
              <p className="text-sm ml-6">9:00 AM - 9:00 PM</p>
              <p className="text-xs text-gray-400 mt-2">
                *Hours may vary by location
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yogurt-green">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 text-yogurt-pink flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">+254 700 123 456</p>
                  <p className="text-xs text-gray-400">Customer Service</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 text-yogurt-pink flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">hello@planetyogurt.co.ke</p>
                  <p className="text-xs text-gray-400">General Inquiries</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-yogurt-pink flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">6 Locations across Kenya</p>
                  <p className="text-xs text-gray-400">Find your nearest store</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-yogurt-green">Our Values</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">🌱</div>
                <h5 className="font-semibold text-yogurt-pink mb-1">Healthy</h5>
                <p className="text-sm text-gray-400">Natural ingredients, probiotics, and nutrition you can trust</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">😋</div>
                <h5 className="font-semibold text-yogurt-pink mb-1">Tasty</h5>
                <p className="text-sm text-gray-400">Flavors that make every moment delicious and memorable</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎉</div>
                <h5 className="font-semibold text-yogurt-pink mb-1">Fun</h5>
                <p className="text-sm text-gray-400">Creating joy, laughter, and connections in every visit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 Planet Yogurt Africa. All rights reserved. Made with 💕 for frozen yogurt lovers.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yogurt-pink transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yogurt-pink transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yogurt-pink transition-colors">
                Nutritional Info
              </a>
            </div>
          </div>
          
          {/* Fun tagline */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-yogurt-pink font-medium text-sm">
              #PYVibes • Where every swirl tells a story 🍨✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
