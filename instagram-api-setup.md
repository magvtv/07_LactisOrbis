# Instagram API Setup Instructions

To fetch real Instagram Reels data from @planetyogurtafrica, follow these steps:

## Prerequisites

1. **Instagram Business Account**: Convert @planetyogurtafrica to an Instagram Business or Creator account
2. **Facebook Page**: Connect the Instagram account to a Facebook Page
3. **Facebook Developer Account**: Required for API access

## Step-by-Step Setup

### 1. Create Facebook Developer Account
- Go to [Facebook Developers](https://developers.facebook.com/)
- Create a developer account if you don't have one

### 2. Create a New App
- Click "Create App" → "Business" type
- Enter app name (e.g., "Planet Yogurt Website")
- Add your email and select app purpose

### 3. Add Instagram Graph API
- In your app dashboard, go to "Add a Product"
- Select "Instagram Graph API" and click "Set Up"

### 4. Configure Instagram Business Account
- Ensure @planetyogurtafrica is a Business or Creator account
- Connect it to a Facebook Page in Instagram settings

### 5. Get Access Token
- Use the [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- Select your app and generate a token with these permissions:
  - `instagram_graph_user_media`
  - `instagram_graph_user_profile`
- Generate a long-lived access token (60 days)

### 6. Find Instagram User ID
- Use this API call to get your Instagram Business Account ID:
```
GET https://graph.facebook.com/me/accounts?access_token=YOUR_ACCESS_TOKEN
```
- Find your page and use the Instagram Business Account ID

### 7. Environment Configuration
Create a `.env.local` file in your project root:

```bash
# Instagram API Configuration
VITE_INSTAGRAM_USER_ID=your_instagram_business_account_id_here
VITE_INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
VITE_USE_REAL_INSTAGRAM_API=true
```

## Testing the API

Once configured, test with this Graph API call:
```
GET https://graph.instagram.com/{user-id}/media?fields=id,media_type,media_url,thumbnail_url,caption,like_count,comments_count,timestamp,permalink&access_token={access-token}
```

## Important Notes

- **Rate Limits**: Instagram Graph API has rate limits (200 calls per hour for most endpoints)
- **Token Refresh**: Long-lived tokens expire after 60 days and need to be refreshed
- **Permissions**: Only works for Instagram accounts you own or manage
- **Reels Specific**: Use `media_type=REELS` filter for Reels only

## Troubleshooting

### Common Issues:
1. **"Instagram account not linked"**: Ensure Instagram is connected to Facebook Page
2. **"Permission denied"**: Check access token has correct permissions
3. **"User not found"**: Verify Instagram User ID is correct
4. **CORS errors**: Instagram API calls should be made from server-side

### Alternative Solutions:
- Use a backend proxy to make Instagram API calls
- Consider third-party services like Phyllo for easier integration
- For development, the component falls back to mock data automatically 