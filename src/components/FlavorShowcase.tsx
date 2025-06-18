
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Flavor {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  color: string;
  category: string;
  is_signature: boolean;
  image_url: string;
}

const FlavorShowcase = () => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlavors();
  }, []);

  const fetchFlavors = async () => {
    try {
      const { data, error } = await supabase
        .from('flavors')
        .select('*')
        .order('is_signature', { ascending: false })
        .order('name')
        .limit(6);

      if (error) {
        console.error('Error fetching flavors:', error);
        return;
      }

      setFlavors(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signatureFlavors = flavors.filter(flavor => flavor.is_signature).slice(0, 3);

  if (loading) {
    return (
      <section id="flavors" className="py-20 bg-gradient-to-br from-white to-py-pink-light">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full animate-bounce-gentle mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious flavors...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="flavors" className="py-20 bg-gradient-to-br from-white to-py-pink-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Flavor Paradise
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our signature creations! From tropical escapes to chocolate dreams, 
            every flavor tells a story of joy, health, and pure deliciousness.
          </p>
        </div>

        {/* Signature Flavors */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            🌟 Signature Collection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {signatureFlavors.map((flavor, index) => (
              <Card 
                key={flavor.id} 
                className="group overflow-hidden hover-scale border-0 shadow-lg hover:shadow-py transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative">
                  <div 
                    className="h-48 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center"
                    style={{background: `linear-gradient(135deg, ${flavor.color}20, ${flavor.color}40)`}}
                  >
                    <div className="text-6xl opacity-80">🍨</div>
                  </div>
                  <Badge 
                    className="absolute top-4 right-4 bg-gradient-primary text-white border-0"
                  >
                    Signature
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-py-pink transition-colors">
                    {flavor.name}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {flavor.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Key Ingredients:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {flavor.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link to="/flavors">
              <Button className="bg-gradient-primary text-white border-0 hover:opacity-90 px-8 py-3 text-lg font-semibold hover-scale">
                View All Flavors ({flavors.length} Available)
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Can't decide? Visit us and create your own perfect combination!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="px-4 py-2 bg-py-pink text-white text-sm">
              Mix & Match Available
            </Badge>
            <Badge className="px-4 py-2 bg-py-green text-white text-sm">
              Custom Toppings
            </Badge>
            <Badge className="px-4 py-2 bg-py-orange text-white text-sm">
              Seasonal Specials
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlavorShowcase;
