
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  features: string[];
}

const StoreLocator = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('city', 'Nairobi')
        .order('name')
        .limit(2);

      if (error) {
        console.error('Error fetching stores:', error);
        return;
      }

      setStores(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDirections = (store: Store) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    window.open(mapsUrl, '_blank');
  };

  if (loading) {
    return (
      <section id="stores" className="py-20 bg-gradient-to-br from-py-green-light to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full animate-bounce-gentle mx-auto mb-4"></div>
          <p className="text-gray-600">Loading store locations...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="stores" className="py-20 bg-gradient-to-br from-py-green-light to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Find Your Store
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Visit us at our prime Nairobi locations! Each store brings the same 
            fresh flavors, friendly service, and fun atmosphere you love.
          </p>
        </div>

        {/* Featured Nairobi Stores */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            📍 Primary Nairobi Locations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {stores.map((store, index) => (
              <Card 
                key={store.id}
                className="group hover-scale border-0 shadow-lg hover:shadow-py transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-800 group-hover:text-py-pink transition-colors">
                        {store.name}
                      </CardTitle>
                      <Badge className="mt-2 bg-py-green/10 text-py-green border-py-green/20">
                        {store.city}
                      </Badge>
                    </div>
                    <MapPin className="w-6 h-6 text-py-pink" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{store.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{store.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{store.hours}</p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {store.features.slice(0, 2).map((feature, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs border-gray-300 text-gray-600"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100">
                    <Button 
                      onClick={() => handleGetDirections(store)}
                      className="w-full bg-gradient-primary text-white border-0 hover:opacity-90"
                      size="sm"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Stores Button */}
          <div className="text-center">
            <Link to="/stores">
              <Button className="bg-gradient-primary text-white border-0 hover:opacity-90 px-8 py-3 text-lg font-semibold hover-scale">
                View All Store Locations
              </Button>
            </Link>
            <p className="text-gray-600 mt-3 text-sm">
              Including locations in Mombasa and other cities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocator;
