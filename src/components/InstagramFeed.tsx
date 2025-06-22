'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Heart, MessageCircle, ExternalLink, ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { instagramApi, mockInstagramPosts, InstagramPost, InstagramApiService } from '@/services/instagramApi';

const InstagramCarousel = ({ posts, title, badgeText, badgeColor, onRefresh, isLoading }: {
  posts: InstagramPost[];
  title: string;
  badgeText: string;
  badgeColor: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const openInstagram = (post: InstagramPost) => {
    if (post.permalink && post.permalink !== '#') {
      window.open(post.permalink, '_blank');
    } else {
      window.open('https://instagram.com/planetyogurtafrica', '_blank');
    }
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
          {onRefresh && (
            <Button
              onClick={onRefresh}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="hidden md:flex"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
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
            onClick={() => openInstagram(post)}
          >
            <div className="relative">
              {post.media_type === 'REELS' ? (
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                  {post.thumbnail_url || post.media_url ? (
                    <img 
                      src={post.thumbnail_url || post.media_url} 
                      alt="Instagram Reel"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className="hidden text-4xl">🎬</div>
                  <Badge className="absolute top-2 left-2 bg-purple-500 text-white text-xs">
                    REEL
                  </Badge>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {post.media_url ? (
                    <img 
                      src={post.media_url} 
                      alt="Instagram post"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className="hidden text-4xl">📸</div>
                </div>
              )}
              {post.is_popular && (
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
                  <span className={`flex items-center ${post.is_popular ? 'text-py-pink font-medium' : ''}`}>
                    <Heart className={`w-3 h-3 mr-1 ${post.is_popular ? 'fill-current' : ''}`} />
                    {post.like_count || 0}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {post.comments_count || 0}
                  </span>
                </div>
                <span>{InstagramApiService.formatTimestamp(post.timestamp)}</span>
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
  const [recentPosts, setRecentPosts] = useState<InstagramPost[]>([]);
  const [popularPosts, setPopularPosts] = useState<InstagramPost[]>([]);
  const [reelsOnly, setReelsOnly] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useRealAPI, setUseRealAPI] = useState(false);

  // Initialize Instagram API if credentials are available
  useEffect(() => {
    const initializeAPI = () => {
      const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
      const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;
      const useReal = import.meta.env.VITE_USE_REAL_INSTAGRAM_API === 'true';

      if (useReal && accessToken && userId && accessToken !== 'your_long_lived_access_token_here') {
        instagramApi.initialize({ accessToken, userId });
        setUseRealAPI(true);
        console.log('Instagram API initialized for real data fetching');
      } else {
        console.log('Using mock Instagram data - configure API credentials to use real data');
        setUseRealAPI(false);
      }
    };

    initializeAPI();
    fetchInstagramData();
  }, []);

  const fetchInstagramData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (useRealAPI && instagramApi.isConfigured()) {
        console.log('Fetching real Instagram data...');
        
        // Fetch real data from Instagram API
        const [recent, popular, reels] = await Promise.all([
          instagramApi.fetchRecentPosts(8),
          instagramApi.fetchPopularPosts(8),
          instagramApi.fetchReels(12)
        ]);

        setRecentPosts(recent);
        setPopularPosts(popular);
        setReelsOnly(reels);
        
        console.log('Successfully fetched Instagram data:', { recent: recent.length, popular: popular.length, reels: reels.length });
      } else {
        // Use mock data
        console.log('Using mock Instagram data');
        const mockRecentPosts = mockInstagramPosts.slice(0, 4);
        const mockPopularPosts = mockInstagramPosts.filter(post => post.is_popular);
        const mockReels = mockInstagramPosts.filter(post => post.media_type === 'REELS');

        setRecentPosts(mockRecentPosts);
        setPopularPosts(mockPopularPosts);
        setReelsOnly(mockReels);
      }
    } catch (err) {
      console.error('Error fetching Instagram data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch Instagram data');
      
      // Fallback to mock data on error
      const mockRecentPosts = mockInstagramPosts.slice(0, 4);
      const mockPopularPosts = mockInstagramPosts.filter(post => post.is_popular);
      const mockReels = mockInstagramPosts.filter(post => post.media_type === 'REELS');

      setRecentPosts(mockRecentPosts);
      setPopularPosts(mockPopularPosts);
      setReelsOnly(mockReels);
    } finally {
      setIsLoading(false);
    }
  };

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

          {/* API Status Indicator */}
          {error && (
            <div className="max-w-md mx-auto mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">Using demo data - {error}</span>
            </div>
          )}

          {!useRealAPI && !error && (
            <div className="max-w-md mx-auto mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm text-blue-800">Demo mode - Configure API credentials for live data</span>
            </div>
          )}

          <Button 
            onClick={openInstagram}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:opacity-90 hover-scale"
            size="lg"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow @planetyogurtafrica
          </Button>
        </div>

        {/* Latest Reels Carousel */}
        {reelsOnly.length > 0 && (
          <InstagramCarousel 
            posts={reelsOnly}
            title="🎬 Latest Reels"
            badgeText="Fresh Content"
            badgeColor="bg-purple-500"
            onRefresh={fetchInstagramData}
            isLoading={isLoading}
          />
        )}

        {/* Most Recent Posts Carousel */}
        <InstagramCarousel 
          posts={recentPosts}
          title="🕒 Most Recent"
          badgeText="Live Updates"
          badgeColor="bg-py-pink"
          onRefresh={fetchInstagramData}
          isLoading={isLoading}
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
