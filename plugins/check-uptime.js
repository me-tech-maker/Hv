const { cmd } = require('../command');
const { runtime } = require('../inconnuboy/functions');
const config = require('../config');

cmd({
    pattern: "uptime",
    alias: ["runtime", "run"],
    desc: "Show bot uptime with stylish formats",
    category: "general",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);
        
        // Style 1: Classic Box
        const style1 = `╭───『 UPTIME 』───⳹
│
│ ✦ ${uptime}
│
│ ✦ Started: ${startTime.toLocaleString()}
╰────────────────⳹
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ inconnu boy*`;

        // Style 2: Minimalist
        const style2 = `•——[ UPTIME ]——•
  │
  ├─ ✦ ${uptime}
  ├─ ✦ Since: ${startTime.toLocaleTimeString()}
  │
  •——[ *QUEEN ASUNA* ]——•`;

        // Style 3: Fancy Borders
        const style3 = `▄▀▄▀▄ QUEEN ASUNA UPTIME ▄▀▄▀▄

  ♢
  ✦ Running: ${uptime}
  ✦ Since: ${startTime.toLocaleDateString()}
  
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ inconnu boy*`;

        // Style 4: Code Style
        const style4 = `┌────────────────────┐
│  👸 UPTIME STATUS 👸  │
├───────────────────
│ • Time: ${uptime}
│ • Started: ${startTime.toLocaleString()}
│ • Version: 1.0.0
└────────────────────┘`;

        // Style 5: Modern Blocks
        const style5 = `▰▰▰▰▰ UPTIME ▰▰▰▰▰

  ⏳ ${uptime}
  🕰️ ${startTime.toLocaleString()}
  
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅʏʙʏ ᴛᴇᴄʜ*`;

        // Style 6: Retro Terminal
        const style6 = `╔══════════════════════╗
║   QUEEN ASUNA UPTIME    
╠══════════════════════
║  RUNTIME: ${uptime}
║  SINCE: ${startTime.toLocaleString()}
╚══════════════════════╝`;

        // Style 7: Elegant
        const style7 = `┌───────────────┐
│  ⏱️  UPTIME  │
└───────────────┘
│ ${uptime}
│
│ Since ${startTime.toLocaleDateString()}
│
┌───────────────┐
│ QUEEN ASUNA 
└───────────────┘`;

        // Style 8: Social Media Style
        const style8 = `⏱️ *Uptime Report* ⏱️

🟢 Online for: ${uptime}
📅 Since: ${startTime.toLocaleString()}


> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ inconnu boy*`;

        // Style 9: Fancy List
        const style9 = `
╔♫═⏱️═♫══════════╗
 QUEEN ASUNA UPTIME
╚♫═⏱️═♫══════════╝

•・゜゜・* ✧  *・゜゜・•
 ✧ ${uptime}
 ✧ Since ${startTime.toLocaleDateString()}
•・゜゜・* ✧  *・゜゜・•`;

        // Style 10: Professional
        const style10 = `
┏━━━━━━━━━━━━━━━━━━┓
┃  👸 QUEEN ASUNA 👸  ┃
┗━━━━━━━━━━━━━━━━━━┛

✦ Duration: ${uptime}
✦ Start Time: ${startTime.toLocaleString()}
✦ Stability: 100%
✦ Version:  1.0.0

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ inconnu boy*`;

        const styles = [style1, style2, style3, style4, style5, style6, style7, style8, style9, style10];
        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

        await conn.sendMessage(from, { 
            text: selectedStyle,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363397722863547@newsletter',
                    newsletterName: config.OWNER_NAME || 'QUEEN ASUNA MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
                        
