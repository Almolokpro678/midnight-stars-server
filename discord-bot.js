const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Discord Bot Configuration
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Replace with your bot token
const CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE'; // Replace with your general channel ID

// Initialize Discord bot
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Initialize Express server for website
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store connected website users
const websiteUsers = new Set();

// Discord bot events
discordClient.once('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
    console.log('Bot is ready to bridge Discord and website!');
});

discordClient.on('messageCreate', (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
    
    // Only relay messages from specific channel
    if (message.channelId === CHANNEL_ID) {
        // Send to all connected website users
        const messageData = {
            username: message.author.username,
            avatar: message.author.displayAvatarURL() || 'https://cdn.discordapp.com/embed/avatars/1.png',
            content: message.content,
            timestamp: message.createdAt.toLocaleTimeString(),
            channelId: message.channelId
        };
        
        io.emit('discord-message', messageData);
        console.log(`Relayed to website: ${message.author.username}: ${message.content}`);
    }
});

// Website connection handling
io.on('connection', (socket) => {
    console.log('Website user connected');
    websiteUsers.add(socket);
    
    // Send welcome message
    socket.emit('bot-message', {
        username: 'Midnight Stars Bot',
        avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
        content: 'Connected to Discord chat! Messages from #general will appear here.',
        timestamp: new Date().toLocaleTimeString(),
        channelId: CHANNEL_ID
    });
    
    socket.on('disconnect', () => {
        console.log('Website user disconnected');
        websiteUsers.delete(socket);
    });
    
    socket.on('website-message', (data) => {
        // Send message from website to Discord
        const channel = discordClient.channels.cache.get(CHANNEL_ID);
        if (channel) {
            const messageContent = `**${data.username} (Website):** ${data.content}`;
            channel.send(messageContent);
            console.log(`Sent to Discord: ${data.username}: ${data.content}`);
        }
    });
    
    socket.on('username-change', (username) => {
        console.log(`User changed username to: ${username}`);
    });
});

// Express routes
app.use(express.static('public'));

app.get('/api/status', (req, res) => {
    res.json({
        connected: discordClient.readyAt ? true : false,
        websiteUsers: websiteUsers.size,
        discordUsers: discordClient.guilds.cache.get('YOUR_SERVER_ID')?.memberCount || 0
    });
});

// Start servers
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Bridge server running on port ${PORT}`);
});

// Login to Discord
discordClient.login(BOT_TOKEN);

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    discordClient.destroy();
    process.exit(0);
});
