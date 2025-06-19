// LLM-Enhanced Personality Quiz Data
// Inspired by 16personalities model with discriminant analysis for flavor matching

// Personality dimensions based on 16personalities model
export interface PersonalityScores {
  extroversion: number; // E vs I
  sensing: number; // S vs N (intuition)
  thinking: number; // T vs F (feeling)
  judging: number; // J vs P (perceiving)
  adventurous: number; // Custom dimension for food preferences
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    scores: Partial<PersonalityScores>;
  }[];
  category: string;
  reasoning?: string; // LLM enhancement: explanation of psychological reasoning
  flavorRelevance?: string; // LLM enhancement: how this relates to flavor preferences
}

export interface PersonalityType {
  code: string;
  name: string;
  description: string;
  traits: string[];
  flavorAffinities: string[];
  detailedAnalysis: string; // LLM enhancement: deeper personality analysis
  flavorReasoning: string; // LLM enhancement: why these flavors match
}

// LLM-Enhanced Quiz Questions with psychological depth
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "At a social gathering, your energy typically...",
    category: "Social Energy",
    reasoning: "Measures extroversion vs introversion through energy dynamics in social situations",
    flavorRelevance: "Social energy correlates with flavor boldness and sharing preferences",
    options: [
      { 
        text: "Increases as you interact with more people - you feed off the social vibe", 
        scores: { extroversion: 3 } 
      },
      { 
        text: "Stays steady, but you prefer meaningful one-on-one conversations", 
        scores: { extroversion: -1, thinking: 1 } 
      },
      { 
        text: "Gradually decreases - you need quiet breaks to recharge", 
        scores: { extroversion: -3 } 
      },
      { 
        text: "Fluctuates based on who you're with and the conversation topics", 
        scores: { extroversion: 0, sensing: -1 } 
      }
    ]
  },
  {
    id: 2,
    text: "When trying a new restaurant, you typically...",
    category: "Food Adventure",
    reasoning: "Assesses openness to experience and risk tolerance in culinary choices",
    flavorRelevance: "Directly predicts willingness to try unique frozen yogurt combinations",
    options: [
      { 
        text: "Order the most unusual item on the menu - you're here for an adventure!", 
        scores: { adventurous: 4, sensing: -2 } 
      },
      { 
        text: "Choose something you've never tried but from a familiar cuisine", 
        scores: { adventurous: 2, sensing: 0 } 
      },
      { 
        text: "Stick to dishes similar to what you know you enjoy", 
        scores: { adventurous: -2, sensing: 2 } 
      },
      { 
        text: "Research the menu beforehand and read reviews before deciding", 
        scores: { thinking: 3, judging: 2, adventurous: 0 } 
      }
    ]
  },
  {
    id: 3,
    text: "Your ideal frozen yogurt creation process would be...",
    category: "Decision Making",
    reasoning: "Reveals planning vs spontaneity tendencies and decision-making style",
    flavorRelevance: "Predicts preference for curated vs customizable flavor experiences",
    options: [
      { 
        text: "Carefully balance flavors and toppings for the perfect combination", 
        scores: { judging: 3, thinking: 2 } 
      },
      { 
        text: "Follow your instincts and add whatever looks appealing in the moment", 
        scores: { judging: -3, thinking: -2, adventurous: 2 } 
      },
      { 
        text: "Try a recommended signature combination first, then customize", 
        scores: { sensing: 1, judging: 1 } 
      },
      { 
        text: "Create something completely unique that reflects your personality", 
        scores: { sensing: -2, adventurous: 3, extroversion: 1 } 
      }
    ]
  },
  {
    id: 4,
    text: "When making important decisions, you rely most on...",
    category: "Cognitive Processing",
    reasoning: "Distinguishes between thinking (logic) and feeling (values) decision-making styles",
    flavorRelevance: "Influences preference for rational vs emotional flavor choices",
    options: [
      { 
        text: "Logical analysis of pros, cons, and objective facts", 
        scores: { thinking: 4 } 
      },
      { 
        text: "How the decision aligns with your values and affects others", 
        scores: { thinking: -4 } 
      },
      { 
        text: "A combination of data analysis and gut feelings", 
        scores: { thinking: 1, sensing: -1 } 
      },
      { 
        text: "What has worked well for you in similar situations before", 
        scores: { sensing: 3, judging: 1 } 
      }
    ]
  },
  {
    id: 5,
    text: "Your approach to planning a weekend getaway is...",
    category: "Planning Style",
    reasoning: "Measures judging vs perceiving through planning and structure preferences",
    flavorRelevance: "Predicts preference for consistent vs varied flavor experiences",
    options: [
      { 
        text: "Create a detailed itinerary with reservations and backup plans", 
        scores: { judging: 4, thinking: 1 } 
      },
      { 
        text: "Book accommodation, then see what spontaneous opportunities arise", 
        scores: { judging: -2, adventurous: 1 } 
      },
      { 
        text: "Have a few must-see places in mind but stay flexible", 
        scores: { judging: 0, sensing: 1 } 
      },
      { 
        text: "Pack a bag and decide where to go based on your mood", 
        scores: { judging: -4, adventurous: 3 } 
      }
    ]
  },
  {
    id: 6,
    text: "When you're feeling stressed or overwhelmed, you prefer to...",
    category: "Stress Response",
    reasoning: "Reveals coping mechanisms and introversion vs extroversion under pressure",
    flavorRelevance: "Indicates comfort food preferences and flavor complexity tolerance",
    options: [
      { 
        text: "Talk through your feelings with close friends or family", 
        scores: { extroversion: 2, thinking: -2 } 
      },
      { 
        text: "Spend time alone in quiet reflection or meditation", 
        scores: { extroversion: -3, thinking: 1 } 
      },
      { 
        text: "Take action to solve the problem immediately", 
        scores: { thinking: 3, judging: 2 } 
      },
      { 
        text: "Engage in a creative or physical activity to clear your mind", 
        scores: { sensing: -1, judging: -1, adventurous: 1 } 
      }
    ]
  },
  {
    id: 7,
    text: "Your favorite type of flavors in general tend to be...",
    category: "Flavor Psychology",
    reasoning: "Direct assessment of flavor preferences linked to personality traits",
    flavorRelevance: "Primary indicator for flavor category matching",
    options: [
      { 
        text: "Bold, intense, and memorable - you want to taste every note", 
        scores: { adventurous: 3, extroversion: 2, sensing: -1 } 
      },
      { 
        text: "Subtle, sophisticated, and well-balanced", 
        scores: { thinking: 2, judging: 2, sensing: 1 } 
      },
      { 
        text: "Comforting, familiar, and reliably delicious", 
        scores: { sensing: 3, thinking: -1, judging: 1 } 
      },
      { 
        text: "Sweet, indulgent, and emotionally satisfying", 
        scores: { thinking: -3, extroversion: 1, adventurous: 1 } 
      }
    ]
  },
  {
    id: 8,
    text: "When sharing food experiences with others, you...",
    category: "Social Eating",
    reasoning: "Measures social interaction style and sharing vs individual preferences",
    flavorRelevance: "Predicts group vs individual flavor choices and sharing behavior",
    options: [
      { 
        text: "Enthusiastically recommend your discoveries and want others to try them", 
        scores: { extroversion: 3, thinking: -1, adventurous: 1 } 
      },
      { 
        text: "Enjoy sharing but prefer having your own portion to savor", 
        scores: { judging: 2, extroversion: -1, sensing: 1 } 
      },
      { 
        text: "Always order something different to maximize variety for the group", 
        scores: { adventurous: 3, extroversion: 2, thinking: 1 } 
      },
      { 
        text: "Research and recommend the highest-quality option for everyone", 
        scores: { thinking: 3, judging: 3, extroversion: 1 } 
      }
    ]
  },
  {
    id: 9,
    text: "Your ideal environment for enjoying frozen yogurt would be...",
    category: "Environmental Preference",
    reasoning: "Assesses environmental sensitivity and social vs solitary preferences",
    flavorRelevance: "Influences preference for complex vs simple flavor profiles",
    options: [
      { 
        text: "A bustling, energetic place with friends and lively conversation", 
        scores: { extroversion: 4, adventurous: 1 } 
      },
      { 
        text: "A quiet, peaceful setting where you can truly appreciate the flavors", 
        scores: { extroversion: -3, thinking: 2, sensing: 1 } 
      },
      { 
        text: "Somewhere Instagram-worthy with beautiful presentation", 
        scores: { sensing: -2, extroversion: 1, judging: -1 } 
      },
      { 
        text: "A cozy, familiar place that feels like home", 
        scores: { sensing: 3, thinking: -1, judging: 1 } 
      }
    ]
  },
  {
    id: 10,
    text: "When it comes to customizing your frozen yogurt, you...",
    category: "Customization Style",
    reasoning: "Final assessment of decision-making complexity and personal expression",
    flavorRelevance: "Determines preference for signature vs custom flavor combinations",
    options: [
      { 
        text: "Go all out - maximum variety and unique combinations", 
        scores: { adventurous: 4, judging: -2, extroversion: 1 } 
      },
      { 
        text: "Choose 2-3 toppings that perfectly complement the base flavor", 
        scores: { judging: 3, thinking: 2, sensing: 1 } 
      },
      { 
        text: "Focus on visual appeal and how it photographs", 
        scores: { thinking: -1, sensing: -1, extroversion: 1 } 
      },
      { 
        text: "Keep it simple - the base flavor should be the star", 
        scores: { judging: 2, sensing: 2, thinking: 1 } 
      }
    ]
  },
  {
    id: 11,
    text: "When learning about new foods or flavors, you prefer...",
    category: "Learning Style",
    reasoning: "Distinguishes sensing (concrete) vs intuitive (abstract) information processing",
    flavorRelevance: "Affects appreciation for traditional vs innovative flavor combinations",
    options: [
      { 
        text: "Detailed information about ingredients, origins, and preparation methods", 
        scores: { sensing: 3, thinking: 2 } 
      },
      { 
        text: "Stories about the inspiration and creative process behind the flavors", 
        scores: { sensing: -2, thinking: -1, adventurous: 1 } 
      },
      { 
        text: "Just diving in and experiencing it firsthand", 
        scores: { sensing: 1, adventurous: 2, judging: -1 } 
      },
      { 
        text: "Understanding how it fits into broader culinary trends and culture", 
        scores: { sensing: -1, thinking: 1, extroversion: 1 } 
      }
    ]
  },
  {
    id: 12,
    text: "Your relationship with routine and consistency is...",
    category: "Routine Preference",
    reasoning: "Further measures judging vs perceiving through routine and change tolerance",
    flavorRelevance: "Predicts loyalty to favorite flavors vs desire for variety",
    options: [
      { 
        text: "You love routines - they provide comfort and efficiency", 
        scores: { judging: 3, sensing: 2 } 
      },
      { 
        text: "You appreciate some structure but need flexibility for spontaneity", 
        scores: { judging: 0, adventurous: 1 } 
      },
      { 
        text: "You actively avoid routines - they feel restrictive and boring", 
        scores: { judging: -3, adventurous: 2 } 
      },
      { 
        text: "You create loose patterns but leave room for inspiration", 
        scores: { judging: -1, sensing: -1, adventurous: 1 } 
      }
    ]
  }
];

// Comprehensive Personality Type Definitions with LLM-Enhanced Analysis
export const personalityTypes: PersonalityType[] = [
  {
    code: "ENFP",
    name: "The Enthusiastic Explorer",
    description: "Adventurous, creative, and always ready to try something new",
    traits: ["Outgoing", "Imaginative", "Spontaneous", "People-focused"],
    flavorAffinities: ["tropical", "fruity", "unique combinations", "seasonal specials"],
    detailedAnalysis: "ENFPs approach food as an adventure and a way to connect with others. They're drawn to flavors that tell a story or represent something unique. They love sharing new discoveries and often become ambassadors for unusual or innovative combinations. Their enthusiasm is infectious, making them perfect customers for signature creations and limited-time offerings.",
    flavorReasoning: "Tropical and fruity flavors match their vibrant, optimistic nature. They appreciate creativity in flavor combinations and are often the first to try seasonal specials. Their social nature means they prefer shareable experiences and flavors that spark conversation."
  },
  {
    code: "INTJ", 
    name: "The Strategic Perfectionist",
    description: "Thoughtful, independent, and appreciates carefully crafted flavors",
    traits: ["Analytical", "Independent", "Strategic", "Quality-focused"],
    flavorAffinities: ["complex", "sophisticated", "premium", "artisanal"],
    detailedAnalysis: "INTJs approach frozen yogurt with the same analytical mindset they bring to everything else. They appreciate the craftsmanship behind flavor development and prefer quality over quantity. They're likely to become loyal customers once they find their perfect match, and they value consistency in preparation and presentation.",
    flavorReasoning: "Complex chocolate flavors and sophisticated combinations appeal to their refined palate. They appreciate artisanal ingredients and the science behind flavor balancing. Their perfectionist nature means they prefer flavors that are precisely crafted and consistently excellent."
  },
  {
    code: "ESFP",
    name: "The Social Butterfly",
    description: "Fun-loving, spontaneous, and enjoys sharing experiences",
    traits: ["Energetic", "Friendly", "Adaptable", "Experience-seeking"],
    flavorAffinities: ["popular", "sweet", "shareable", "Instagram-worthy"],
    detailedAnalysis: "ESFPs see frozen yogurt as a social experience and a treat to be enjoyed with others. They're drawn to flavors that are fun, visually appealing, and perfect for sharing. They often choose based on mood and social context, making them ideal customers for customizable options and group-friendly portions.",
    flavorReasoning: "Sweet, popular flavors match their desire to connect with others and enjoy life's pleasures. They appreciate visually stunning combinations and flavors that photograph well for social sharing. Their adaptable nature means they enjoy variety and seasonal rotations."
  },
  {
    code: "ISTJ",
    name: "The Reliable Classic",
    description: "Practical, loyal, and appreciates time-tested favorites",
    traits: ["Reliable", "Practical", "Traditional", "Detail-oriented"],
    flavorAffinities: ["classic", "consistent", "traditional", "reliable"],
    detailedAnalysis: "ISTJs value reliability and consistency in their frozen yogurt experience. They prefer flavors that deliver exactly what they expect and appreciate traditional combinations that have stood the test of time. Once they find their favorite, they tend to stick with it, making them incredibly loyal customers.",
    flavorReasoning: "Classic flavors like vanilla, chocolate, and traditional fruit combinations appeal to their preference for tried-and-true options. They value consistency in taste and preparation, preferring flavors that are available year-round rather than seasonal specialties."
  },
  {
    code: "ENFJ",
    name: "The Harmonious Host",
    description: "Warm, empathetic, and focused on bringing people together",
    traits: ["Empathetic", "Charismatic", "Organized", "People-centered"],
    flavorAffinities: ["comforting", "universally appealing", "shareable", "crowd-pleasers"],
    detailedAnalysis: "ENFJs often think about others when making food choices, preferring flavors that will please a group or create positive shared experiences. They're natural hosts who want everyone to enjoy themselves, so they gravitate toward universally appealing options that bring people together.",
    flavorReasoning: "Comforting, crowd-pleasing flavors that appeal to diverse tastes match their desire to create harmony and positive experiences for others. They prefer flavors that are accessible and enjoyable for people of all ages and preferences."
  },
  {
    code: "INFP",
    name: "The Authentic Dreamer",
    description: "Creative, values-driven, and seeks authentic experiences",
    traits: ["Creative", "Authentic", "Values-driven", "Individualistic"],
    flavorAffinities: ["unique", "artisanal", "ethically-sourced", "creative combinations"],
    detailedAnalysis: "INFPs seek authenticity and meaning in their food choices. They're drawn to flavors that reflect their values, such as organic or ethically-sourced ingredients. They appreciate creativity and uniqueness, often preferring flavors that feel personal and meaningful rather than mass-market.",
    flavorReasoning: "Unique, artisanal flavors that tell a story or reflect personal values resonate with their desire for authentic experiences. They appreciate creative combinations that feel personally meaningful and align with their ethical considerations."
  },
  {
    code: "ESTP",
    name: "The Spontaneous Adventurer",
    description: "Bold, action-oriented, and loves immediate experiences",
    traits: ["Bold", "Spontaneous", "Action-oriented", "Present-focused"],
    flavorAffinities: ["bold", "intense", "trendy", "experimental"],
    detailedAnalysis: "ESTPs live in the moment and approach frozen yogurt with a 'try everything' attitude. They're drawn to bold, intense flavors that provide immediate sensory satisfaction. They love experimenting with new combinations and are often early adopters of trendy or limited-edition flavors.",
    flavorReasoning: "Bold, intense flavors that provide immediate sensory impact match their desire for exciting, in-the-moment experiences. They enjoy experimental combinations and are attracted to whatever's new or trending in the flavor world."
  },
  {
    code: "ISTP",
    name: "The Pragmatic Minimalist",
    description: "Practical, independent, and appreciates simplicity",
    traits: ["Practical", "Independent", "Minimalist", "Quality-focused"],
    flavorAffinities: ["simple", "pure", "high-quality", "no-nonsense"],
    detailedAnalysis: "ISTPs prefer straightforward, high-quality flavors without unnecessary complexity. They appreciate the purity of well-made basic flavors and often prefer to focus on the quality of ingredients rather than elaborate combinations. They value efficiency and functionality in their food choices.",
    flavorReasoning: "Simple, high-quality flavors that showcase excellent ingredients appeal to their minimalist, quality-focused approach. They prefer pure flavors that don't mask the natural taste of premium ingredients with excessive additions."
  }
];

// LLM-Enhanced Discriminant Analysis Weights
export const flavorMatchingWeights = {
  extroversion: {
    bold_flavors: 0.25,
    social_sharing: 0.20,
    signature_preference: 0.15,
    visual_appeal: 0.10
  },
  sensing: {
    traditional_flavors: 0.30,
    familiar_ingredients: 0.20,
    consistency_preference: 0.15,
    proven_combinations: 0.10
  },
  thinking: {
    complex_flavors: 0.25,
    sophisticated_combinations: 0.20,
    premium_ingredients: 0.15,
    analytical_choice: 0.10
  },
  judging: {
    consistent_favorites: 0.25,
    planned_choices: 0.20,
    refined_options: 0.15,
    structured_experience: 0.10
  },
  adventurous: {
    unique_flavors: 0.35,
    experimental_combinations: 0.25,
    seasonal_specials: 0.15,
    innovation_appeal: 0.10
  }
};

// Flavor category scoring matrix for discriminant analysis
export const flavorCategoryMatrix = {
  tropical: {
    extroversion: 2.5,
    adventurous: 3.0,
    sensing: -1.0,
    thinking: 0.5,
    judging: -0.5
  },
  fruity: {
    extroversion: 1.5,
    adventurous: 1.0,
    sensing: 1.0,
    thinking: -1.0,
    judging: 0.0
  },
  chocolate: {
    extroversion: 0.0,
    adventurous: 0.5,
    sensing: 1.5,
    thinking: 2.0,
    judging: 1.5
  },
  classic: {
    extroversion: -1.0,
    adventurous: -2.0,
    sensing: 3.0,
    thinking: 1.0,
    judging: 2.5
  },
  creamy: {
    extroversion: 0.0,
    adventurous: 0.0,
    sensing: 2.0,
    thinking: 1.5,
    judging: 2.0
  }
}; 