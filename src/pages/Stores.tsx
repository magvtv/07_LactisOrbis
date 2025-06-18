
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Clock, Navigation, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    filterStores();
  }, [stores, searchTerm]);

  const fetchStores = async () => {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('city')
        .order('name');

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

  const filterStores = () => {
    if (!searchTerm) {
      setFilteredStores(stores);
      return;
    }

    const filtered = stores.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredStores(filtered);
  };

  const handleGetDirections = (store: Store) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    window.open(mapsUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full animate-bounce-gentle mx-auto mb-4"></div>
            <p className="text-gray-600">Loading store locations...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-py-green-light to-py-orange-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center text-py-green hover:text-py-pink transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
                Find Your Store
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Visit us at any of our locations across Kenya! Each store brings the same 
                fresh flavors, friendly service, and fun atmosphere you love.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by city or store name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 rounded-full border-2 border-gray-200 focus:border-py-green"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Kenya Map Placeholder */}
        <section className="py-16">
          <div className="container mx-auto px-4 mb-16">
            <Card className="border-0 shadow-py overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Kenya Map</h3>
                  <p className="text-gray-600 mb-4">Coming soon - Click and explore our locations!</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from(new Set(stores.map(store => store.city))).map((city) => (
                      <Badge key={city} className="bg-py-green text-white">
                        📍 {city}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Store Markers Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {stores.map((store, index) => (
                    <div 
                      key={store.id}
                      className="absolute animate-bounce-gentle"
                      style={{
                        left: `${20 + index * 12}%`,
                        top: `${30 + (index % 3) * 20}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      <div className="w-4 h-4 bg-py-pink rounded-full border-2 border-white shadow-md"></div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Store Cards Grid */}
          <div className="container mx-auto px-4">
            {filteredStores.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No stores found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStores.map((store, index) => (
                  <Card 
                    key={store.id}
                    className={`group hover-scale border-0 shadow-lg hover:shadow-py transition-all duration-300 animate-fade-in cursor-pointer ${
                      selectedStore === store.id ? 'ring-2 ring-py-pink' : ''
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                    onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
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
                        {store.features.map((feature, idx) => (
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGetDirections(store);
                          }}
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
            )}
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-gradient-soft">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-r from-py-pink/5 to-py-green/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Coming to Your Area Soon! 🚀
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We're expanding across Kenya! Follow us on Instagram for updates on new store openings, 
                  special promotions, and exclusive flavor launches in your city.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Stores;
