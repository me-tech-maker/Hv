const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "wstalk",
    alias: ["channelstalk", "chinfo"],
    desc: "Get WhatsApp Channel details",
    category: "tools",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const url = args.join(" ");
        if (!url) {
            return reply("❌ Please provide a valid WhatsApp Channel URL.\n\nExample:\n.wstalk https://whatsapp.com/channel/0029Vb6T8td5K3zQZbsKEU1R");
        }

        const channelId = url.match(/channel\/([0-9A-Za-z]+)/i)?.[1];
        if (!channelId) {
            return reply("❌ Invalid WhatsApp Channel URL format.");
        }

        const apiUrl = `https://itzpire.com/stalk/whatsapp-channel?url=https://whatsapp.com/channel/${channelId}`;
        const response = await axios.get(apiUrl);
        const data = response.data.data;

        const channelInfo = `
╭───〔 📢 *WHA CHANNEL INFO* 〕─⭓
│ 🎯 *Title:* ${data.title}
│ 👥 *Followers:* ${data.followers}
│ 📝 *Description:*
│ ${data.description.replace(/\n/g, '\n│ ')}
╰──────────────────────────⭓

🔗 *Channel URL:* https://whatsapp.com/channel/${channelId}
✨ *Powered by INCONNU BOY*
        `.trim();

        await conn.sendMessage(from, {
            image: { url: data.img },
            caption: channelInfo,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in wstalk command:", e);
        reply(`❌ Failed to fetch channel info:\n${e.response?.data?.message || e.message}`);
    }
});
