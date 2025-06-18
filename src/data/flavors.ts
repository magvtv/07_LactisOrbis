
export interface Flavor {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  color: string;
  category: 'fruity' | 'creamy' | 'chocolate' | 'tropical' | 'classic';
  isSignature: boolean;
  image: string;
}

export const flavors: Flavor[] = [
  {
    id: "berry-bliss",
    name: "Berry Bliss",
    description: "A delightful mix of strawberries, blueberries, and raspberries",
    ingredients: ["Strawberry puree", "Blueberry bits", "Raspberry swirl", "Greek yogurt base"],
    color: "#FF6B9D",
    category: "fruity",
    isSignature: true,
    image: "/api/placeholder/300/300"
  },
  {
    id: "tropical-paradise", 
    name: "Tropical Paradise",
    description: "Transport yourself to the tropics with mango, pineapple, and coconut",
    ingredients: ["Mango chunks", "Pineapple pieces", "Coconut flakes", "Passion fruit"],
    color: "#F1C40F",
    category: "tropical", 
    isSignature: true,
    image: "/api/placeholder/300/300"
  },
  {
    id: "choco-dream",
    name: "Choco Dream", 
    description: "Rich chocolate frozen yogurt with chocolate chips",
    ingredients: ["Belgian chocolate", "Cocoa powder", "Chocolate chips", "Vanilla extract"],
    color: "#8B4513",
    category: "chocolate",
    isSignature: true,
    image: "/api/placeholder/300/300"
  },
  {
    id: "vanilla-delight",
    name: "Vanilla Delight",
    description: "Classic vanilla with a modern twist",
    ingredients: ["Madagascar vanilla", "Organic yogurt", "Natural sweeteners"],
    color: "#FFF8DC", 
    category: "classic",
    isSignature: false,
    image: "/api/placeholder/300/300"
  },
  {
    id: "mint-magic",
    name: "Mint Magic",
    description: "Refreshing mint yogurt with chocolate chips",
    ingredients: ["Fresh mint", "Chocolate chips", "Natural yogurt"],
    color: "#6BCF7F",
    category: "creamy",
    isSignature: false,
    image: "/api/placeholder/300/300"
  },
  {
    id: "caramel-swirl",
    name: "Caramel Swirl", 
    description: "Smooth yogurt with ribbons of salted caramel",
    ingredients: ["Salted caramel", "Sea salt", "Vanilla yogurt"],
    color: "#FF8C42",
    category: "creamy",
    isSignature: false,
    image: "/api/placeholder/300/300"
  }
];
