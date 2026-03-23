# Discord Chat Integration Setup Guide

## 🚀 Three Ways to Connect Discord Chat to Your Website

### Method 1: Discord Widget (Easiest)
**What it shows:** Online members, voice channels, recent chat messages
**Setup time:** 5 minutes
**Features:**
- Shows who's online
- Displays recent chat messages
- Voice channel activity
- Join server button

**Setup Steps:**
1. Go to your Discord server
2. Server Settings → Widget
3. Enable "Enable Server Widget"
4. Copy the Server ID
5. Replace `YOUR_SERVER_ID` in discord-integration.html

**Get Server ID:**
- Right-click your server icon → "Copy Server ID"
- Enable Developer Mode in Discord Settings → Advanced

---

### Method 2: Discord Bot Integration (Most Powerful)
**What it does:** Real-time two-way chat between website and Discord
**Setup time:** 30 minutes
**Features:**
- Live chat synchronization
- Send messages from website to Discord
- Receive Discord messages on website
- Custom commands and moderation

**Setup Steps:**
1. **Create Discord Bot:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application"
   - Go to "Bot" tab → "Add Bot"
   - Copy Bot Token

2. **Enable Bot Permissions:**
   - Bot → Privileged Gateway Intents
   - Enable "Message Content Intent"
   - Enable "Server Members Intent"

3. **Invite Bot to Server:**
   - OAuth2 → URL Generator
   - Select scopes: bot, applications.commands
   - Select permissions: Read Messages, Send Messages, Read Message History
   - Copy URL and paste in browser
   - Invite to your Midnight Stars server

4. **Connect to Website:**
   - Install Discord.js library
   - Use the bot token in your website backend
   - Set up WebSocket connection

---

### Method 3: Discord Webhook (Simple & Free)
**What it does:** Send website messages to Discord channel
**Setup time:** 10 minutes
**Features:**
- Send messages from website to Discord
- No bot required
- Free and easy to set up
- One-way communication (website → Discord)

**Setup Steps:**
1. **Create Discord Webhook:**
   - Discord server → Channel Settings → Integrations
   - Click "Webhooks" → "New Webhook"
   - Name: "Midnight Stars Website"
   - Copy Webhook URL

2. **Update Website Code:**
   - Replace `YOUR_DISCORD_WEBHOOK_URL` in the JavaScript
   - Test the connection

---

## 🔧 Implementation Code Examples

### Discord Widget Implementation
```html
<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark" 
        width="350" height="500" 
        allowtransparency="true" 
        frameborder="0" 
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
</iframe>
```

### Webhook Implementation
```javascript
async function sendToDiscord(message) {
    const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';
    
    const payload = {
        content: message,
        username: 'Website User',
        avatar_url: 'https://your-website.com/avatar.png'
    };
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            console.log('Message sent to Discord successfully');
        }
    } catch (error) {
        console.error('Error sending to Discord:', error);
    }
}
```

### Bot Integration (Node.js Example)
```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    
    // Send Discord message to website via WebSocket
    sendToWebsite({
        username: message.author.username,
        content: message.content,
        timestamp: message.createdAt
    });
});

client.login('YOUR_BOT_TOKEN');
```

---

## 📱 Mobile App Integration

### React Native Discord Widget
```javascript
import { WebView } from 'react-native-webview';

const DiscordWidget = () => {
    return (
        <WebView
            source={{ uri: 'https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark' }}
            style={{ width: '100%', height: 500 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
    );
};
```

---

## 🛡️ Security Considerations

### Bot Token Security
- Never expose bot token in frontend code
- Use environment variables
- Rotate tokens regularly
- Limit bot permissions

### Webhook Security
- Use unique webhook URLs
- Rate limit message sending
- Validate message content
- Monitor webhook usage

---

## 🚀 Advanced Features

### Custom Commands
```javascript
client.on('messageCreate', (message) => {
    if (message.content.startsWith('/website')) {
        message.reply('Visit our website: https://your-site.com');
    }
});
```

### Message Embeds
```javascript
const embed = {
    title: 'New Website Visitor',
    description: 'Someone is viewing the website',
    color: 0x6b46c1,
    fields: [
        { name: 'Page', value: window.location.href },
        { name: 'Time', value: new Date().toLocaleString() }
    ]
};

channel.send({ embeds: [embed] });
```

### Real-time Statistics
- Display online member count
- Show message activity
- Server statistics dashboard
- User engagement metrics

---

## 💡 Pro Tips

1. **Start with Webhook** - Easiest to implement
2. **Upgrade to Bot** - For full functionality
3. **Use Widget** - For quick preview
4. **Monitor API limits** - Discord has rate limits
5. **Test thoroughly** - Ensure all features work
6. **Keep it responsive** - Mobile-friendly design

---

## 🆘 Troubleshooting

### Common Issues:
- **CORS errors**: Use backend proxy for webhooks
- **Bot not responding**: Check token and permissions
- **Widget not loading**: Verify server ID and widget settings
- **Rate limits**: Implement cooldown periods

### Solutions:
- Use Discord.js for bot development
- Implement proper error handling
- Add loading states and retry logic
- Monitor Discord API status

Choose the method that best fits your needs and technical comfort level!
