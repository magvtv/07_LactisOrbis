import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { 
  quizQuestions, 
  personalityTypes, 
  flavorMatchingWeights, 
  flavorCategoryMatrix,
  type PersonalityScores, 
  type QuizQuestion, 
  type PersonalityType 
} from '@/data/quiz';

interface FlavorMatch {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
  is_signature: boolean;
  matchPercentage: number;
  reasons: string[];
}

// Quiz questions and personality types are now imported from @/data/quiz

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<PersonalityScores>({
    extroversion: 0,
    sensing: 0,
    thinking: 0,
    judging: 0,
    adventurous: 0
  });
  const [isComplete, setIsComplete] = useState(false);
  const [flavorMatch, setFlavorMatch] = useState<FlavorMatch | null>(null);
  const [personalityType, setPersonalityType] = useState<PersonalityType | null>(null);
  const [flavors, setFlavors] = useState<any[]>([]);

  useEffect(() => {
    fetchFlavors();
  }, []);

  const fetchFlavors = async () => {
    try {
      const { data, error } = await supabase
        .from('flavors')
        .select('*');

      if (error) {
        console.error('Error fetching flavors:', error);
        return;
      }

      setFlavors(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAnswer = (selectedOption: { text: string; scores: Partial<PersonalityScores> }) => {
    // Update scores based on selected option
    const newScores = { ...scores };
    Object.entries(selectedOption.scores).forEach(([key, value]) => {
      if (value !== undefined) {
        newScores[key as keyof PersonalityScores] += value;
      }
    });
    setScores(newScores);

    // Move to next question or complete quiz
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz(newScores);
    }
  };

  const completeQuiz = (finalScores: PersonalityScores) => {
    // Determine personality type based on scores
    const personalityCode = 
      (finalScores.extroversion > 0 ? 'E' : 'I') +
      (finalScores.sensing > 0 ? 'S' : 'N') +
      (finalScores.thinking > 0 ? 'T' : 'F') +
      (finalScores.judging > 0 ? 'J' : 'P');

    const matchedPersonality = personalityTypes.find(p => p.code === personalityCode) || personalityTypes[0];
    setPersonalityType(matchedPersonality);

    // Find best flavor match using enhanced discriminant analysis
    const bestMatch = findBestFlavorMatch(finalScores);
    setFlavorMatch(bestMatch);
    setIsComplete(true);
  };

  const findBestFlavorMatch = (userScores: PersonalityScores): FlavorMatch => {
    // Enhanced discriminant analysis with LLM-powered comprehensive personality-flavor mapping
    const flavorCompatibility = flavors.map(flavor => {
      let compatibilityScore = 0;
      const reasons: string[] = [];

      // Use the enhanced flavor category matrix for more precise scoring
      const categoryMatrix = flavorCategoryMatrix[flavor.category as keyof typeof flavorCategoryMatrix];
      if (categoryMatrix) {
        // Apply discriminant analysis weights from the data file
        Object.entries(userScores).forEach(([trait, score]) => {
          const categoryWeight = categoryMatrix[trait as keyof PersonalityScores] || 0;
          const weightedScore = score * categoryWeight;
          compatibilityScore += weightedScore * 5; // Base multiplier
        });
      }

      // LLM-Enhanced Personality-Based Flavor Matching
      
      // Extroversion Factor (Social Energy) - Enhanced with multiple dimensions
      if (userScores.extroversion >= 2) {
        // High extroversion - bold, social flavors
        if (flavor.category === 'tropical' || flavor.category === 'fruity') {
          compatibilityScore += 25 * (userScores.extroversion / 3); // Scale by intensity
          reasons.push("Your outgoing energy matches perfectly with vibrant, bold flavors that make a statement");
        }
        if (flavor.is_signature) {
          compatibilityScore += 20;
          reasons.push("You love being unique and standing out with signature flavors that spark conversations");
        }
        // Additional extroversion considerations
        if (flavor.name.toLowerCase().includes('tropical') || flavor.name.toLowerCase().includes('passion')) {
          compatibilityScore += 15;
          reasons.push("Tropical flavors match your enthusiastic, social personality");
        }
      } else if (userScores.extroversion <= -2) {
        // High introversion - subtle, refined flavors
        if (flavor.category === 'classic' || flavor.category === 'creamy') {
          compatibilityScore += 25 * Math.abs(userScores.extroversion / 3);
          reasons.push("Your thoughtful, introspective nature appreciates refined, subtle flavor profiles");
        }
        if (flavor.name.toLowerCase().includes('vanilla') || flavor.name.toLowerCase().includes('mint')) {
          compatibilityScore += 20;
          reasons.push("You prefer calming, familiar flavors that don't overwhelm your senses");
        }
        // Enhanced introversion matching
        if (flavor.category === 'creamy' && !flavor.is_signature) {
          compatibilityScore += 15;
          reasons.push("Classic, understated flavors align with your preference for quiet sophistication");
        }
      } else {
        // Moderate extroversion - balanced flavors
        if (flavor.category === 'chocolate' || flavor.category === 'creamy') {
          compatibilityScore += 15;
          reasons.push("Your balanced personality enjoys universally appealing, crowd-pleasing flavors");
        }
      }

      // Adventurous Factor (Food Exploration) - Enhanced with risk tolerance assessment
      if (userScores.adventurous >= 3) {
        // Highly adventurous - unique, exotic flavors
        if (flavor.is_signature) {
          compatibilityScore += 35;
          reasons.push("Your bold, adventurous spirit craves our most innovative signature creations");
        }
        if (flavor.category === 'tropical') {
          compatibilityScore += 25;
          reasons.push("You thrive on exploring exotic, tropical flavor adventures that transport you");
        }
        // Enhanced adventurous matching
        if (flavor.name.toLowerCase().includes('passion') || flavor.name.toLowerCase().includes('exotic')) {
          compatibilityScore += 20;
          reasons.push("Unique, experimental flavors feed your desire for culinary exploration");
        }
      } else if (userScores.adventurous >= 1) {
        // Moderately adventurous - interesting but approachable
        if (flavor.category === 'fruity' || flavor.category === 'chocolate') {
          compatibilityScore += 20;
          reasons.push("You enjoy flavors that are interesting and distinctive without being overwhelming");
        }
        if (flavor.is_signature && flavor.category !== 'tropical') {
          compatibilityScore += 15;
          reasons.push("Signature flavors that aren't too exotic match your moderate sense of adventure");
        }
      } else if (userScores.adventurous <= -2) {
        // Conservative - classic, familiar flavors
        if (flavor.category === 'classic') {
          compatibilityScore += 35;
          reasons.push("You appreciate reliable, time-tested flavor classics that never disappoint");
        }
        if (flavor.name.toLowerCase().includes('vanilla') || flavor.name.toLowerCase().includes('caramel')) {
          compatibilityScore += 25;
          reasons.push("Familiar, comforting flavors align with your preference for proven favorites");
        }
        // Enhanced conservative matching
        if (!flavor.is_signature && (flavor.category === 'classic' || flavor.category === 'creamy')) {
          compatibilityScore += 20;
          reasons.push("Traditional flavors provide the reliability and consistency you value");
        }
      }

      // Thinking vs Feeling Factor - Enhanced with cognitive style analysis
      if (userScores.thinking >= 2) {
        // High thinking - complex, sophisticated flavors
        if (flavor.category === 'chocolate') {
          compatibilityScore += 25;
          reasons.push("Your analytical mind appreciates the complexity and depth of rich chocolate flavors");
        }
        if (flavor.name.toLowerCase().includes('mint') || flavor.category === 'creamy') {
          compatibilityScore += 20;
          reasons.push("You value carefully crafted, sophisticated flavor combinations with perfect balance");
        }
        // Enhanced thinking preference
        if (flavor.ingredients && flavor.ingredients.length >= 4) {
          compatibilityScore += 15;
          reasons.push("Complex flavor profiles with multiple ingredients appeal to your analytical nature");
        }
      } else if (userScores.thinking <= -2) {
        // High feeling - warm, emotionally satisfying flavors
        if (flavor.category === 'fruity' || flavor.category === 'tropical') {
          compatibilityScore += 25;
          reasons.push("Your warm, empathetic heart connects with cheerful, uplifting fruit flavors");
        }
        if (flavor.name.toLowerCase().includes('berry') || flavor.name.toLowerCase().includes('caramel')) {
          compatibilityScore += 20;
          reasons.push("You're drawn to comforting, emotionally satisfying flavors that feel like a warm hug");
        }
        // Enhanced feeling preference
        if (flavor.name.toLowerCase().includes('bliss') || flavor.name.toLowerCase().includes('dream')) {
          compatibilityScore += 15;
          reasons.push("Flavors with emotional, evocative names resonate with your feeling-oriented nature");
        }
      }

      // Sensing vs Intuition Factor - Enhanced with information processing style
      if (userScores.sensing >= 2) {
        // High sensing - familiar, traditional flavors
        if (flavor.category === 'classic' || flavor.category === 'chocolate') {
          compatibilityScore += 22;
          reasons.push("Your practical, detail-oriented nature values tried-and-true flavor favorites");
        }
        if (!flavor.is_signature) {
          compatibilityScore += 15;
          reasons.push("Traditional flavors that have proven their worth appeal to your sensing preference");
        }
        // Enhanced sensing matching
        if (flavor.name.length <= 15) { // Simple, straightforward names
          compatibilityScore += 10;
          reasons.push("Clear, straightforward flavors match your preference for concrete experiences");
        }
      } else if (userScores.sensing <= -2) {
        // High intuition - innovative, creative combinations
        if (flavor.is_signature || flavor.category === 'tropical') {
          compatibilityScore += 22;
          reasons.push("Your imaginative, future-focused spirit loves innovative flavor possibilities");
        }
        if (flavor.name.toLowerCase().includes('paradise') || flavor.name.toLowerCase().includes('magic')) {
          compatibilityScore += 15;
          reasons.push("Creative, evocative flavor names appeal to your intuitive imagination");
        }
      }

      // Judging vs Perceiving Factor - Enhanced with structure preference analysis
      if (userScores.judging >= 2) {
        // High judging - consistent, refined flavors
        if (flavor.category === 'classic' || flavor.category === 'creamy') {
          compatibilityScore += 20;
          reasons.push("Your organized, structured approach values consistent, dependable flavor choices");
        }
        if (!flavor.is_signature && flavor.category !== 'tropical') {
          compatibilityScore += 15;
          reasons.push("Reliable, well-established flavors align with your preference for planned choices");
        }
      } else if (userScores.judging <= -2) {
        // High perceiving - spontaneous, varied flavors
        if (flavor.is_signature || flavor.category === 'tropical') {
          compatibilityScore += 20;
          reasons.push("Your spontaneous, flexible nature loves trying something unexpected and unique");
        }
        if (flavor.category === 'fruity' && flavor.is_signature) {
          compatibilityScore += 15;
          reasons.push("Unique fruit combinations match your adaptable, variety-seeking personality");
        }
      }

      // Special LLM-Enhanced Flavor-Specific Bonuses with deeper psychological insights
      if (flavor.name.toLowerCase().includes('berry') && userScores.thinking <= 0 && userScores.extroversion >= 0) {
        compatibilityScore += 12;
        reasons.push("Berry flavors perfectly complement your social, emotionally-driven personality");
      }

      if (flavor.name.toLowerCase().includes('chocolate') && userScores.thinking >= 1) {
        compatibilityScore += 12;
        reasons.push("The sophisticated complexity of chocolate appeals to your analytical, thoughtful nature");
      }

      if (flavor.name.toLowerCase().includes('vanilla') && userScores.adventurous <= 0 && userScores.sensing >= 0) {
        compatibilityScore += 12;
        reasons.push("Vanilla's timeless elegance matches your appreciation for refined classics");
      }

      if (flavor.name.toLowerCase().includes('tropical') && userScores.adventurous >= 2 && userScores.extroversion >= 1) {
        compatibilityScore += 12;
        reasons.push("Tropical flavors match your outgoing, adventure-seeking personality perfectly");
      }

      // Mood and context bonuses based on personality combinations
      if (userScores.extroversion >= 2 && userScores.adventurous >= 2) {
        if (flavor.is_signature && flavor.category === 'tropical') {
          compatibilityScore += 15;
          reasons.push("As a social adventurer, you're the perfect ambassador for our boldest signature tropical creations");
        }
      }

      if (userScores.thinking >= 2 && userScores.judging >= 2) {
        if (flavor.category === 'chocolate' && !flavor.is_signature) {
          compatibilityScore += 15;
          reasons.push("Classic chocolate flavors appeal to your analytical, structured approach to flavor selection");
        }
      }

      // Ensure reasonable score range with enhanced scaling
      const baselineScore = 60; // Higher baseline for better user experience
      const finalScore = Math.min(100, Math.max(baselineScore, baselineScore + (compatibilityScore * 0.8)));
      
      return {
        ...flavor,
        matchPercentage: Math.round(finalScore),
        reasons: reasons.slice(0, 3) // Top 3 most relevant reasons
      };
    });

    // Sort by compatibility score and return the best match
    const sortedMatches = flavorCompatibility.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    // Enhanced logging for analysis
    console.log('User Personality Scores:', userScores);
    console.log('Top 5 Flavor Matches:', sortedMatches.slice(0, 5).map(f => ({
      name: f.name,
      score: f.matchPercentage,
      category: f.category,
      isSignature: f.is_signature,
      reasons: f.reasons
    })));
    
    return sortedMatches[0];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      extroversion: 0,
      sensing: 0,
      thinking: 0,
      judging: 0,
      adventurous: 0
    });
    setIsComplete(false);
    setFlavorMatch(null);
    setPersonalityType(null);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion) / quizQuestions.length) * 100;

  if (isComplete && flavorMatch && personalityType) {
    return (
      <div className="w-full max-w-6xl mx-auto p-3 sm:p-6">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-py-pink mr-2" />
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient">
                Your Perfect Match!
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
            {/* Enhanced Personality Type Display */}
            <div className="text-center">
              <Badge className="text-base sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 bg-gradient-primary text-white">
                {personalityType.code} - {personalityType.name}
              </Badge>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                {personalityType.description}
              </p>
              
              {/* LLM Enhancement: Show detailed analysis if available */}
              {personalityType.detailedAnalysis && (
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Your Personality Insights:</h4>
                  <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                    {personalityType.detailedAnalysis}
                  </p>
                </div>
              )}
              
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {personalityType.traits.map((trait, index) => (
                  <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Enhanced Flavor Match Display */}
            <div className="bg-gradient-to-r from-py-pink/10 to-py-green/10 rounded-2xl p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🍨</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  {flavorMatch.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {flavorMatch.description}
                </p>
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl font-bold text-py-pink">
                    {flavorMatch.matchPercentage}%
                  </div>
                  <span className="text-gray-600 ml-2 text-sm sm:text-base">Match</span>
                </div>
              </div>

              {/* Enhanced Match Reasons with LLM insights */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-semibold text-gray-800 text-center text-sm sm:text-base">
                  Why this flavor is perfect for you:
                </h4>
                {flavorMatch.reasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-py-pink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>

              {/* LLM Enhancement: Show flavor reasoning if available */}
              {personalityType.flavorReasoning && (
                <div className="mt-4 sm:mt-6 bg-green-50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">The Science Behind Your Match:</h4>
                  <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                    {personalityType.flavorReasoning}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                onClick={resetQuiz}
                variant="outline"
                className="border-py-pink text-py-pink hover:bg-py-pink hover:text-white text-sm sm:text-base py-2 sm:py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Take Quiz Again
              </Button>
              <Button 
                className="bg-gradient-primary text-white hover:opacity-90 text-sm sm:text-base py-2 sm:py-3"
                onClick={() => window.location.href = '/stores'}
              >
                Find This Flavor at Our Stores
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6">
      <Card className="border-0 shadow-xl">
        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Badge variant="outline" className="text-xs sm:text-sm">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            <Badge className="bg-py-green text-white text-xs sm:text-sm">
              {currentQ.category}
            </Badge>
          </div>
          <Progress 
            value={progress} 
            variant="gradient"
            className="mb-3 sm:mb-4"
          />
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-center leading-relaxed px-2">
            {currentQ.text}
          </CardTitle>
          
          {/* LLM Enhancement: Show question insights if available */}
          {currentQ.reasoning && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                💡 This question: {currentQ.reasoning}
              </p>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start p-3 sm:p-4 h-auto border-2 border-gray-200 hover:border-py-pink hover:bg-green-100 hover:text-green-800 transition-all duration-200 focus:border-py-pink focus:bg-green-100 focus:text-green-800"
              onClick={() => handleAnswer(option)}
            >
              <div className="text-sm sm:text-base leading-relaxed text-left">
                {option.text}
              </div>
            </Button>
          ))}
          
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 gap-3 sm:gap-0">
            <Button
              variant="ghost"
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className="text-gray-500 text-sm sm:text-base order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="text-xs sm:text-sm text-gray-500 text-center order-1 sm:order-2">
              ~{(quizQuestions.length - currentQuestion) * 30} seconds remaining
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityQuiz; 