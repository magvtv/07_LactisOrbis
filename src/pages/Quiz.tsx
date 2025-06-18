import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PersonalityQuiz from '@/components/PersonalityQuiz';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Quiz = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-py-pink/5 to-py-green/5">
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
              
              <div className="flex items-center justify-center mb-6">
                <Brain className="w-12 h-12 text-py-pink mr-4" />
                <h1 className="text-4xl md:text-6xl font-bold text-gradient">
                  Froyo Personality Quiz
                </h1>
                <Sparkles className="w-12 h-12 text-py-green ml-4" />
              </div>
              
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Discover your perfect frozen yogurt match! Our scientifically-inspired quiz analyzes your personality traits 
                to recommend the ideal flavor that matches your unique taste preferences and lifestyle.
              </p>
            </div>

            {/* Quiz Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🧠</div>
                  <h3 className="font-semibold text-gray-800 mb-2">16personalities Inspired</h3>
                  <p className="text-sm text-gray-600">
                    Based on proven personality psychology models
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Discriminant Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Advanced matching algorithm for accurate results
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🍨</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Perfect Match</h3>
                  <p className="text-sm text-gray-600">
                    Get personalized flavor recommendations
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                ⏱️ Takes about 2-3 minutes • 🎯 Personalized results • 🆓 Completely free
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Component */}
        <section className="py-16">
          <div className="container mx-auto">
            <PersonalityQuiz />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gradient mb-12">
                How Our Quiz Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Answer Questions</h3>
                  <p className="text-sm text-gray-600">
                    10 carefully crafted questions about your personality and preferences
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Analyze Traits</h3>
                  <p className="text-sm text-gray-600">
                    Our algorithm analyzes your responses across 5 personality dimensions
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Match Flavors</h3>
                  <p className="text-sm text-gray-600">
                    We match your personality with our extensive flavor database
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Get Results</h3>
                  <p className="text-sm text-gray-600">
                    Receive your personality type and perfect flavor match
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-py-pink/10 to-py-green/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gradient mb-6">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of froyo lovers who've discovered their ideal flavor through our personality quiz!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#quiz" className="inline-block">
                <button className="bg-gradient-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                  Start the Quiz Now
                </button>
              </a>
              <Link to="/flavors">
                <button className="border-2 border-py-pink text-py-pink px-8 py-4 rounded-full text-lg font-semibold hover:bg-py-pink hover:text-white transition-colors">
                  Browse All Flavors
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz; 