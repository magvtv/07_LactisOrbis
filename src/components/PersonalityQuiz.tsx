import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Personality dimensions based on 16personalities model
interface PersonalityScores {
  extroversion: number; // E vs I
  sensing: number; // S vs N (intuition)
  thinking: number; // T vs F (feeling)
  judging: number; // J vs P (perceiving)
  adventurous: number; // Custom dimension for food preferences
}

interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    scores: Partial<PersonalityScores>;
  }[];
  category: string;
}

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

interface PersonalityType {
  code: string;
  name: string;
  description: string;
  traits: string[];
  flavorAffinities: string[];
}

// Quiz questions covering all personality dimensions
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "At a party, you would rather...",
    category: "Social Energy",
    options: [
      { text: "Mingle with lots of different people", scores: { extroversion: 2 } },
      { text: "Have deep conversations with a few close friends", scores: { extroversion: -2 } },
      { text: "Find a quiet corner and observe", scores: { extroversion: -1 } },
      { text: "Be the center of attention telling stories", scores: { extroversion: 3 } }
    ]
  },
  {
    id: 2,
    text: "When trying new foods, you...",
    category: "Food Adventure",
    options: [
      { text: "Always go for the most exotic option", scores: { adventurous: 3, sensing: -1 } },
      { text: "Stick to familiar flavors you know you'll enjoy", scores: { adventurous: -2, sensing: 2 } },
      { text: "Ask for recommendations from others", scores: { extroversion: 1, thinking: -1 } },
      { text: "Research the ingredients and preparation first", scores: { thinking: 2, judging: 1 } }
    ]
  },
  {
    id: 3,
    text: "Your ideal frozen yogurt experience would be...",
    category: "Experience Preference",
    options: [
      { text: "A carefully curated combination with perfect balance", scores: { judging: 2, thinking: 1 } },
      { text: "Spontaneously mixing whatever looks interesting", scores: { judging: -2, adventurous: 2 } },
      { text: "A classic flavor that never disappoints", scores: { sensing: 2, judging: 1 } },
      { text: "Something completely unique that no one else would try", scores: { sensing: -2, adventurous: 3 } }
    ]
  },
  {
    id: 4,
    text: "When making decisions, you rely more on...",
    category: "Decision Making",
    options: [
      { text: "Logic and objective analysis", scores: { thinking: 3 } },
      { text: "How it feels and your gut instinct", scores: { thinking: -3 } },
      { text: "Past experiences and proven methods", scores: { sensing: 2, judging: 1 } },
      { text: "Future possibilities and potential outcomes", scores: { sensing: -2, judging: -1 } }
    ]
  },
  {
    id: 5,
    text: "Your approach to planning a day out is...",
    category: "Planning Style",
    options: [
      { text: "Create a detailed itinerary with backup plans", scores: { judging: 3, thinking: 1 } },
      { text: "Have a rough idea and see what happens", scores: { judging: -2 } },
      { text: "Follow someone else's plan", scores: { extroversion: -1, thinking: -1 } },
      { text: "Be completely spontaneous", scores: { judging: -3, adventurous: 2 } }
    ]
  },
  {
    id: 6,
    text: "When you're stressed, you prefer to...",
    category: "Stress Response",
    options: [
      { text: "Talk it out with friends or family", scores: { extroversion: 2, thinking: -1 } },
      { text: "Spend time alone to process", scores: { extroversion: -2 } },
      { text: "Find a practical solution immediately", scores: { thinking: 2, judging: 1 } },
      { text: "Do something creative or spontaneous", scores: { judging: -1, adventurous: 1 } }
    ]
  },
  {
    id: 7,
    text: "Your favorite type of flavors tend to be...",
    category: "Flavor Preference",
    options: [
      { text: "Bold and intense", scores: { adventurous: 2, extroversion: 1 } },
      { text: "Subtle and sophisticated", scores: { thinking: 1, judging: 1 } },
      { text: "Comforting and familiar", scores: { sensing: 2, thinking: -1 } },
      { text: "Sweet and indulgent", scores: { thinking: -2, adventurous: 1 } }
    ]
  },
  {
    id: 8,
    text: "When sharing food with others, you...",
    category: "Sharing Style",
    options: [
      { text: "Enthusiastically recommend your favorites", scores: { extroversion: 2, thinking: -1 } },
      { text: "Let others try yours but prefer your own portion", scores: { judging: 1, extroversion: -1 } },
      { text: "Always order something different to share variety", scores: { adventurous: 2, extroversion: 1 } },
      { text: "Research and order the 'best' option for the group", scores: { thinking: 2, judging: 2 } }
    ]
  },
  {
    id: 9,
    text: "Your ideal frozen yogurt atmosphere would be...",
    category: "Environment",
    options: [
      { text: "Lively and social with friends around", scores: { extroversion: 3 } },
      { text: "Quiet and peaceful for contemplation", scores: { extroversion: -2, thinking: 1 } },
      { text: "Trendy and Instagram-worthy", scores: { sensing: -1, extroversion: 1 } },
      { text: "Cozy and familiar like home", scores: { sensing: 2, thinking: -1 } }
    ]
  },
  {
    id: 10,
    text: "When it comes to toppings, you...",
    category: "Customization",
    options: [
      { text: "Go all out with maximum variety", scores: { adventurous: 3, judging: -1 } },
      { text: "Stick to 2-3 favorites that complement each other", scores: { judging: 2, thinking: 1 } },
      { text: "Choose based on what looks prettiest", scores: { thinking: -1, sensing: 1 } },
      { text: "Skip toppings - prefer the pure flavor", scores: { judging: 1, sensing: 1 } }
    ]
  }
];

// Personality type definitions
const personalityTypes: PersonalityType[] = [
  {
    code: "ENFP",
    name: "The Enthusiastic Explorer",
    description: "Adventurous, creative, and always ready to try something new",
    traits: ["Outgoing", "Imaginative", "Spontaneous", "People-focused"],
    flavorAffinities: ["tropical", "fruity", "unique combinations"]
  },
  {
    code: "INTJ", 
    name: "The Strategic Perfectionist",
    description: "Thoughtful, independent, and appreciates carefully crafted flavors",
    traits: ["Analytical", "Independent", "Strategic", "Quality-focused"],
    flavorAffinities: ["complex", "sophisticated", "premium"]
  },
  {
    code: "ESFP",
    name: "The Social Butterfly",
    description: "Fun-loving, spontaneous, and enjoys sharing experiences",
    traits: ["Energetic", "Friendly", "Adaptable", "Experience-seeking"],
    flavorAffinities: ["popular", "sweet", "shareable"]
  },
  {
    code: "ISTJ",
    name: "The Reliable Classic",
    description: "Practical, loyal, and appreciates time-tested favorites",
    traits: ["Reliable", "Practical", "Traditional", "Detail-oriented"],
    flavorAffinities: ["classic", "consistent", "traditional"]
  }
  // Additional types would be defined here...
];

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

    // Find best flavor match using discriminant analysis approach
    const bestMatch = findBestFlavorMatch(finalScores);
    setFlavorMatch(bestMatch);
    setIsComplete(true);
  };

  const findBestFlavorMatch = (userScores: PersonalityScores): FlavorMatch => {
    // Discriminant analysis for flavor matching
    const flavorCompatibility = flavors.map(flavor => {
      let compatibilityScore = 0;
      const reasons: string[] = [];

      // Extroversion factor
      if (userScores.extroversion > 1 && (flavor.category === 'tropical' || flavor.category === 'fruity')) {
        compatibilityScore += 20;
        reasons.push("Your outgoing nature pairs well with bold, vibrant flavors");
      } else if (userScores.extroversion < -1 && (flavor.category === 'creamy' || flavor.category === 'classic')) {
        compatibilityScore += 20;
        reasons.push("Your thoughtful nature appreciates refined, subtle flavors");
      }

      // Adventurous factor
      if (userScores.adventurous > 1 && flavor.is_signature) {
        compatibilityScore += 25;
        reasons.push("Your adventurous spirit craves our unique signature creations");
      } else if (userScores.adventurous < -1 && flavor.category === 'classic') {
        compatibilityScore += 25;
        reasons.push("You appreciate reliable, time-tested favorites");
      }

      // Thinking vs Feeling
      if (userScores.thinking > 1 && (flavor.category === 'chocolate' || flavor.category === 'creamy')) {
        compatibilityScore += 15;
        reasons.push("Your analytical mind appreciates the complexity of rich flavors");
      } else if (userScores.thinking < -1 && (flavor.category === 'fruity' || flavor.category === 'tropical')) {
        compatibilityScore += 15;
        reasons.push("Your warm heart connects with cheerful, uplifting flavors");
      }

      // Judging vs Perceiving
      if (userScores.judging > 1 && flavor.category === 'classic') {
        compatibilityScore += 10;
        reasons.push("Your organized nature values consistent, dependable choices");
      } else if (userScores.judging < -1 && flavor.is_signature) {
        compatibilityScore += 10;
        reasons.push("Your spontaneous side loves trying something unexpected");
      }

      return {
        ...flavor,
        matchPercentage: Math.min(100, Math.max(60, compatibilityScore)),
        reasons: reasons.slice(0, 3) // Top 3 reasons
      };
    });

    // Return the highest scoring flavor
    return flavorCompatibility.reduce((best, current) => 
      current.matchPercentage > best.matchPercentage ? current : best
    );
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
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-py-pink mr-2" />
              <CardTitle className="text-3xl font-bold text-gradient">
                Your Perfect Match!
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Personality Type */}
            <div className="text-center">
              <Badge className="text-lg px-4 py-2 mb-4 bg-gradient-primary text-white">
                {personalityType.code} - {personalityType.name}
              </Badge>
              <p className="text-gray-700 text-lg leading-relaxed">
                {personalityType.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {personalityType.traits.map((trait, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Flavor Match */}
            <div className="bg-gradient-to-r from-py-pink/10 to-py-green/10 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🍨</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {flavorMatch.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {flavorMatch.description}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-3xl font-bold text-py-pink">
                    {flavorMatch.matchPercentage}%
                  </div>
                  <span className="text-gray-600 ml-2">Match</span>
                </div>
              </div>

              {/* Match Reasons */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-center">
                  Why this flavor is perfect for you:
                </h4>
                {flavorMatch.reasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-py-pink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={resetQuiz}
                variant="outline"
                className="border-py-pink text-py-pink hover:bg-py-pink hover:text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Take Quiz Again
              </Button>
              <Button 
                className="bg-gradient-primary text-white hover:opacity-90"
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
    <div className="max-w-3xl mx-auto p-6">
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-sm">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            <Badge className="bg-py-green text-white">
              {currentQ.category}
            </Badge>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-xl md:text-2xl text-center leading-relaxed">
            {currentQ.text}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start p-4 h-auto border-2 border-gray-200 hover:border-py-pink hover:bg-py-pink/10 hover:text-py-green transition-all duration-200 focus:border-py-pink focus:bg-py-pink/10 focus:text-py-green"
              onClick={() => handleAnswer(option)}
            >
              <div className="text-sm md:text-base leading-relaxed">
                {option.text}
              </div>
            </Button>
          ))}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className="text-gray-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="text-sm text-gray-500 self-center">
              ~{(quizQuestions.length - currentQuestion) * 30} seconds remaining
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityQuiz; 