
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const Flavors = () => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [filteredFlavors, setFilteredFlavors] = useState<Flavor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlavors();
  }, []);

  useEffect(() => {
    filterFlavors();
  }, [flavors, searchTerm, selectedCategory]);

  const fetchFlavors = async () => {
    try {
      const { data, error } = await supabase
        .from('flavors')
        .select('*')
        .order('is_signature', { ascending: false })
        .order('name');

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

  const filterFlavors = () => {
    let filtered = flavors;

    if (searchTerm) {
      filtered = filtered.filter(flavor =>
        flavor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flavor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flavor.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(flavor => flavor.category === selectedCategory);
    }

    setFilteredFlavors(filtered);
  };

  const categories = ['all', ...Array.from(new Set(flavors.map(f => f.category)))];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full animate-bounce-gentle mx-auto mb-4"></div>
            <p className="text-gray-600">Loading delicious flavors...</p>
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
        <section className="py-16 bg-gradient-to-br from-py-pink-light to-py-green-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center text-py-pink hover:text-py-green transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
                Our Flavors
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Discover our signature creations and classic favorites! 
                Each flavor is crafted with love and the finest ingredients.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search flavors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 rounded-full border-2 border-gray-200 focus:border-py-pink"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category 
                        ? "bg-py-pink text-white" 
                        : "border-py-pink text-py-pink hover:bg-py-pink hover:text-white"
                      }
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flavors Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredFlavors.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No flavors found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredFlavors.map((flavor, index) => (
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
                      {flavor.is_signature && (
                        <Badge 
                          className="absolute top-4 right-4 bg-gradient-primary text-white border-0"
                        >
                          Signature
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-py-pink transition-colors">
                        {flavor.name}
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {flavor.description}
                      </p>
                      <div className="space-y-3">
                        <Badge 
                          variant="outline" 
                          className="border-py-green text-py-green"
                        >
                          {flavor.category}
                        </Badge>
                        <div>
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Flavors;
