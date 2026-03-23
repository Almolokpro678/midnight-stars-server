# 🌟 Real-time Discord Chat Setup Guide

## 🎯 What This Achieves:
- **See Discord messages in real-time** on your website
- **Change your username** when chatting from website
- **Two-way communication** between website and Discord
- **Live connection status** showing online/offline

## 📋 Requirements:
- Node.js installed on your computer
- Discord Bot Token
- Discord Channel ID
- Your computer running (for the bridge)

---

## 🚀 Step-by-Step Setup:

### 1. Create Discord Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** → Name: "Midnight Stars Bridge"
3. Go to **"Bot"** tab → **"Add Bot"**
4. Enable **Privileged Gateway Intents**:
   - ✅ **Message Content Intent**
   - ✅ **Server Members Intent**
5. Copy the **Bot Token** (keep this secret!)

### 2. Get Channel ID
1. Go to your Discord server
2. Right-click the **#general** channel
3. Select **"Copy Channel ID"** (enable Developer Mode in Discord settings first)

### 3. Install Dependencies
```bash
# Navigate to your Server folder
cd "c:\Users\Bios\OneDrive\Desktop\Server"

# Install required packages
npm install
```

### 4. Configure the Bot
Open `discord-bot.js` and replace:
- `YOUR_BOT_TOKEN_HERE` → Your actual bot token
- `YOUR_CHANNEL_ID_HERE` → Your general channel ID

### 5. Start the Bridge
```bash
# Start the bridge server
npm start
```

### 6. Update Website Files
1. Upload all files to GitHub
2. Your website will now have real-time Discord chat!

---

## 🎮 How to Use:

### On Your Website:
1. Go to your website → **"Live Discord Chat"**
2. Click **"Connect to Discord"** button
3. Enter your **Bot Token** and **Channel ID**
4. Type a **username** for yourself
5. Start chatting with Discord members!

### Features:
- ✅ **Real-time messages** from Discord #general
- ✅ **Custom username** for website users
- ✅ **Live connection status**
- ✅ **Message timestamps**
- ✅ **User avatars**
- ✅ **Two-way sync**

---

## 🔧 Advanced Options:

### Keep Running 24/7:
- Use **PM2** process manager:
  ```bash
  npm install -g pm2
  pm2 start discord-bot.js --name "discord-bridge"
  pm2 save
  ```

### Custom Username:
- Change username anytime in the chat
- Your chosen name appears in Discord
- Website messages show with your custom username

### Multiple Channels:
- Modify `CHANNEL_ID` to connect different channels
- Create separate chat rooms for each Discord channel

---

## 🛡️ Security Notes:
- **Never share your Bot Token** publicly
- The bridge runs on your computer
- Only people with your website URL can access the chat
- Bot permissions are limited to reading/sending messages

---

## 📁 Files Created:
- `bot-integration.html` - Interactive real-time chat interface
- `discord-bot.js` - Node.js bridge server
- `package.json` - Dependencies and scripts
- `REALTIME_SETUP.md` - This setup guide

---

## 🎉 You're Ready!
Once setup, your Midnight Stars website will have:
- Live Discord chat integration
- Custom usernames
- Real-time message sync
- Professional chat interface

Enjoy your enhanced Discord community! 🌟
