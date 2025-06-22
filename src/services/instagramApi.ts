export interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REELS';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;
  timestamp: string;
  permalink: string;
  is_popular?: boolean;
}

export interface InstagramApiConfig {
  accessToken: string;
  userId: string;
}

export class InstagramApiService {
  private config: InstagramApiConfig | null = null;
  private baseUrl = 'https://graph.instagram.com';

  /**
   * Initialize the Instagram API service with access token and user ID
   */
  initialize(config: InstagramApiConfig) {
    this.config = config;
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return this.config !== null && this.config.accessToken !== '' && this.config.userId !== '';
  }

  /**
   * Fetch Instagram media with optional filtering for Reels
   */
  async fetchMedia(mediaType?: 'REELS' | 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM', limit: number = 25): Promise<InstagramPost[]> {
    if (!this.isConfigured()) {
      throw new Error('Instagram API service not configured. Please call initialize() first.');
    }

    try {
      const fields = [
        'id',
        'media_type',
        'media_url',
        'thumbnail_url',
        'caption',
        'like_count',
        'comments_count',
        'timestamp',
        'permalink'
      ].join(',');

      const url = `${this.baseUrl}/${this.config!.userId}/media`;
      const params = new URLSearchParams({
        fields,
        limit: limit.toString(),
        access_token: this.config!.accessToken
      });

      const response = await fetch(`${url}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Instagram API error: ${data.error.message}`);
      }

      let posts: InstagramPost[] = data.data || [];

      // Filter by media type if specified
      if (mediaType) {
        posts = posts.filter(post => post.media_type === mediaType);
      }

      // Add popularity flag based on engagement
      posts = posts.map(post => ({
        ...post,
        is_popular: this.calculatePopularity(post)
      }));

      return posts;
    } catch (error) {
      console.error('Error fetching Instagram media:', error);
      throw error;
    }
  }

  /**
   * Fetch specifically Reels content
   */
  async fetchReels(limit: number = 12): Promise<InstagramPost[]> {
    return this.fetchMedia('REELS', limit);
  }

  /**
   * Fetch recent posts (all media types)
   */
  async fetchRecentPosts(limit: number = 8): Promise<InstagramPost[]> {
    const posts = await this.fetchMedia(undefined, limit);
    return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  /**
   * Fetch popular posts based on engagement
   */
  async fetchPopularPosts(limit: number = 8): Promise<InstagramPost[]> {
    const posts = await this.fetchMedia(undefined, 50); // Fetch more to find popular ones
    return posts
      .filter(post => post.is_popular)
      .sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
      .slice(0, limit);
  }

  /**
   * Get insights for a specific media post
   */
  async getMediaInsights(mediaId: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Instagram API service not configured.');
    }

    try {
      const url = `${this.baseUrl}/${mediaId}/insights`;
      const params = new URLSearchParams({
        metric: 'impressions,reach,likes,comments,saves,shares',
        access_token: this.config!.accessToken
      });

      const response = await fetch(`${url}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Instagram Insights API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching media insights:', error);
      return [];
    }
  }

  /**
   * Calculate if a post should be considered "popular"
   * This is a simple heuristic - you can adjust based on your criteria
   */
  private calculatePopularity(post: InstagramPost): boolean {
    const likes = post.like_count || 0;
    const comments = post.comments_count || 0;
    const engagement = likes + (comments * 5); // Weight comments higher
    
    // Consider popular if engagement is above a threshold
    // You can adjust this threshold based on your account's typical performance
    return engagement > 200;
  }

  /**
   * Format timestamp to relative time
   */
  static formatTimestamp(timestamp: string): string {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - postTime.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
  }
}

// Export a singleton instance
export const instagramApi = new InstagramApiService();

// Mock data for development/fallback
export const mockInstagramPosts: InstagramPost[] = [
  {
    id: '1',
    media_type: 'REELS',
    media_url: '/api/placeholder/300/300',
    caption: 'Berry Bliss is hitting different today! 🍓✨ Who else is feeling the pink vibes? #PYVibes #BerryBliss',
    like_count: 245,
    comments_count: 18,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    permalink: 'https://instagram.com/p/mock1',
    is_popular: true
  },
  {
    id: '2',
    media_type: 'REELS',
    media_url: '/api/placeholder/300/300',
    caption: 'Tropical Paradise meets Monday mood 🥭🍍 Starting the week right at Garden City! #TropicalVibes',
    like_count: 189,
    comments_count: 12,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    permalink: 'https://instagram.com/p/mock2',
    is_popular: false
  },
  {
    id: '3',
    media_type: 'REELS',
    media_url: '/api/placeholder/300/300',
    caption: 'Custom creation alert! 🎨 When you can\'t choose just one flavor... why not three? #MixAndMatch',
    like_count: 312,
    comments_count: 24,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    permalink: 'https://instagram.com/p/mock3',
    is_popular: true
  },
  {
    id: '4',
    media_type: 'IMAGE',
    media_url: '/api/placeholder/300/300',
    caption: 'Family fun day at Sarit Centre! Nothing beats sharing smiles and swirls 👨‍👩‍👧‍👦 #FamilyTime',
    like_count: 156,
    comments_count: 8,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    permalink: 'https://instagram.com/p/mock4',
    is_popular: false
  },
  {
    id: '5',
    media_type: 'REELS',
    media_url: '/api/placeholder/300/300',
    caption: 'Choco Dream with extra chocolate chips because... why not? 🍫😍 #ChocoDream #ChocolateLovers',
    like_count: 278,
    comments_count: 15,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    permalink: 'https://instagram.com/p/mock5',
    is_popular: true
  },
  {
    id: '6',
    media_type: 'REELS',
    media_url: '/api/placeholder/300/300',
    caption: 'New flavor alert! 🚨 Mint Magic is here and it\'s absolutely refreshing! #MintMagic #NewFlavor',
    like_count: 423,
    comments_count: 31,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    permalink: 'https://instagram.com/p/mock6',
    is_popular: true
  }
]; 