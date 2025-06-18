

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Heart, MessageCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

// Mock Instagram posts data - in real implementation this would come from Instagram API
const mockPosts = [
  {
    id: '1',
    image: '/api/placeholder/300/300',
    caption: 'Berry Bliss is hitting different today! 🍓✨ Who else is feeling the pink vibes? #PYVibes #BerryBliss',
    likes: 245,
    comments: 18,
    timestamp: '2 hours ago',
    isPopular: true
  },
  {
    id: '2', 
    image: '/api/placeholder/300/300',
    caption: 'Tropical Paradise meets Monday mood 🥭🍍 Starting the week right at Garden City! #TropicalVibes',
    likes: 189,
    comments: 12,
    timestamp: '5 hours ago',
    isPopular: false
  },
  {
    id: '3',
    image: '/api/placeholder/300/300', 
    caption: 'Custom creation alert! 🎨 When you can\'t choose just one flavor... why not three? #MixAndMatch',
    likes: 312,
    comments: 24,
    timestamp: '1 day ago',
    isPopular: true
  },
  {
    id: '4',
    image: '/api/placeholder/300/300',
    caption: 'Family fun day at Sarit Centre! Nothing beats sharing smiles and swirls 👨‍👩‍👧‍👦 #FamilyTime',
    likes: 156,
    comments: 8,
    timestamp: '2 days ago',
    isPopular: false
  },
  {
    id: '5',
    image: '/api/placeholder/300/300',
    caption: 'Choco Dream with extra chocolate chips because... why not? 🍫😍 #ChocoDream #ChocolateLovers',
    likes: 278,
    comments: 15,
    timestamp: '3 days ago',
    isPopular: true
  },
  {
    id: '6',
    image: '/api/placeholder/300/300',
    caption: 'New flavor alert! 🚨 Mint Magic is here and it\'s absolutely refreshing! #MintMagic #NewFlavor',
    likes: 423,
    comments: 31,
    timestamp: '4 days ago',
    isPopular: true
  }
];

const InstagramCarousel = ({ posts, title, badgeText, badgeColor }: {
  posts: typeof mockPosts;
  title: string;
  badgeText: string;
  badgeColor: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const openInstagram = (postId?: string) => {
    const url = postId 
      ? `https://instagram.com/p/${postId}` 
      : 'https://instagram.com/planetyogurtafrica';
    window.open(url, '_blank');
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-4">
          <Badge className={`${badgeColor} text-white`}>
            {badgeText}
          </Badge>
          <div className="hidden md:flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        {posts.map((post, index) => (
          <Card 
            key={post.id}
            className="group flex-shrink-0 w-72 overflow-hidden border-0 shadow-lg hover:shadow-py hover-scale transition-all duration-300 cursor-pointer animate-fade-in"
            style={{animationDelay: `${index * 0.1}s`}}
            onClick={() => openInstagram(post.id)}
          >
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-4xl">📸</div>
              </div>
              {post.isPopular && (
                <Badge className="absolute top-2 right-2 bg-py-pink text-white text-xs">
                  Popular
                </Badge>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                {post.caption}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className={`flex items-center ${post.isPopular ? 'text-py-pink font-medium' : ''}`}>
                    <Heart className={`w-3 h-3 mr-1 ${post.isPopular ? 'fill-current' : ''}`} />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {post.comments}
                  </span>
                </div>
                <span>{post.timestamp}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

const InstagramFeed = () => {
  const recentPosts = mockPosts.slice(0, 4);
  const popularPosts = mockPosts.filter(post => post.isPopular);

  const openInstagram = () => {
    window.open('https://instagram.com/planetyogurtafrica', '_blank');
  };

  return (
    <section id="instagram" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-py-pink to-py-green bg-clip-text text-transparent mb-6">
            Latest from Instagram
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Follow our daily adventures! From flavor reveals to customer smiles, 
            catch all the <span className="text-py-pink font-semibold">#PYVibes</span> on our Instagram.
          </p>
          <Button 
            onClick={openInstagram}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:opacity-90 hover-scale"
            size="lg"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow @planetyogurtafrica
          </Button>
        </div>

        {/* Most Recent Posts Carousel */}
        <InstagramCarousel 
          posts={recentPosts}
          title="🕒 Most Recent"
          badgeText="Live Updates"
          badgeColor="bg-py-pink"
        />

        {/* Most Popular Posts Carousel */}
        <InstagramCarousel 
          posts={popularPosts}
          title="🔥 Most Popular"
          badgeText="Trending"
          badgeColor="bg-py-green"
        />

        {/* Instagram CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
            <CardContent className="p-8">
              <Instagram className="w-12 h-12 mx-auto mb-4 text-py-pink" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Join the #PYVibes Community! 🎉
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Share your Planet Yogurt moments using <span className="font-semibold text-py-pink">#PYVibes</span> 
                and get featured on our page! Tag us for a chance to win free frozen yogurt for a month.
              </p>
              <Button 
                onClick={openInstagram}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:opacity-90"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Follow Us Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
