#!/usr/bin/env node

/**
 * Instagram API Test Script
 * Run this to test your Instagram API setup before integrating with the website
 * 
 * Usage: node test-instagram-api.js
 */

// Configuration - replace with your actual values
const CONFIG = {
  accessToken: 'your_access_token_here',
  userId: 'your_user_id_here',
  baseUrl: 'https://graph.instagram.com'
};

async function testInstagramAPI() {
  console.log('🔍 Testing Instagram Graph API Connection...\n');
  
  if (CONFIG.accessToken === 'your_access_token_here' || CONFIG.userId === 'your_user_id_here') {
    console.log('❌ Please update the CONFIG object with your real Instagram API credentials');
    process.exit(1);
  }

  try {
    // Test 1: Basic user info
    console.log('1. Testing basic user info...');
    const userResponse = await fetch(`${CONFIG.baseUrl}/${CONFIG.userId}?fields=id,username,account_type,media_count&access_token=${CONFIG.accessToken}`);
    const userData = await userResponse.json();
    
    if (userData.error) {
      console.log('❌ User info failed:', userData.error.message);
      return;
    }
    
    console.log('✅ User info retrieved:');
    console.log(`   - Username: ${userData.username}`);
    console.log(`   - Account Type: ${userData.account_type}`);
    console.log(`   - Media Count: ${userData.media_count}\n`);

    // Test 2: Fetch recent media
    console.log('2. Testing media fetch...');
    const mediaResponse = await fetch(`${CONFIG.baseUrl}/${CONFIG.userId}/media?fields=id,media_type,media_url,thumbnail_url,caption,like_count,comments_count,timestamp,permalink&limit=5&access_token=${CONFIG.accessToken}`);
    const mediaData = await mediaResponse.json();
    
    if (mediaData.error) {
      console.log('❌ Media fetch failed:', mediaData.error.message);
      return;
    }
    
    console.log('✅ Media retrieved:');
    console.log(`   - Total items fetched: ${mediaData.data.length}`);
    
    mediaData.data.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.media_type} - ${post.like_count || 0} likes`);
      if (post.caption) {
        console.log(`      Caption: ${post.caption.substring(0, 50)}...`);
      }
    });
    
    // Test 3: Filter for Reels specifically
    const reels = mediaData.data.filter(post => post.media_type === 'REELS');
    console.log(`\n   - Reels found: ${reels.length}`);
    
    if (reels.length > 0) {
      console.log('✅ Instagram Reels are available for fetching!');
    } else {
      console.log('⚠️  No Reels found in recent posts');
    }

    console.log('\n🎉 Instagram API test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Add these credentials to your .env.local file:');
    console.log(`   VITE_INSTAGRAM_USER_ID=${CONFIG.userId}`);
    console.log(`   VITE_INSTAGRAM_ACCESS_TOKEN=${CONFIG.accessToken}`);
    console.log('   VITE_USE_REAL_INSTAGRAM_API=true');
    console.log('2. Restart your development server');
    console.log('3. Visit your website to see real Instagram data!');

  } catch (error) {
    console.log('❌ API test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('- Verify your access token is valid and not expired');
    console.log('- Ensure your Instagram account is connected to a Facebook Page');
    console.log('- Check that your app has the required permissions');
    console.log('- Make sure the User ID is for your Instagram Business account');
  }
}

// Run the test
testInstagramAPI(); 