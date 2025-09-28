const config = require('../config');
const { cmd, commands } = require('../command');

const delay = ms => new Promise(res => setTimeout(res, ms));

cmd({
  pattern: "menu",
  alias: ["allmenu", "Queen", "Asuna", "👸"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "general",
  react: "👸",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const loadingSteps = [
      "👸10%",
      "👸30%",
      "👸50%",
      "👸80%",
      "👸100%",
      "👸 Queen Asuna Loading ..."
    ];

    // Envoie initial
    let sentMessage = await conn.sendMessage(from, { text: loadingSteps[0] }, { quoted: mek });

    // Modifier progressivement le message existant
    for (let i = 1; i < loadingSteps.length; i++) {
      await delay(800); // pause entre chaque étape
      await conn.sendMessage(from, {
        text: loadingSteps[i],
        edit: sentMessage.key // clé du message à modifier
      }, { quoted: mek });
    }

    // Préparer le menu
    const totalCommands = commands.length;
    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    let menuText = `
╭━━━〔 *𝐐𝐔𝐄𝐄𝐍-𝐀𝐒𝐔𝐍𝐀* 〕━━╮
┃ ✦ ᴀᴜᴛʜᴏʀ : @${m.sender.split("@")[0]}
┃ ✦ ʀᴜɴᴛɪᴍᴇ : ${uptime()}
┃ ✦ ᴍᴏᴅᴇ : *${config.MODE}*
┃ ✦ ᴘʀᴇғɪx : [${config.PREFIX}]
┃ ✦ ᴄᴍᴅs : ${totalCommands}
┃ ✦ ᴅᴇᴠ : *ɪɴᴄᴏɴɴᴜ ʙᴏʏ*
┃ ✦ ᴠᴇʀ : *1.0.0*
╰━━━━━━━━━━━━━━━━━╯

╭──〔 *WELCOME TO* 〕──╮
│ *♛ QUEEN ASUNA MD ♛*
╰─────────────────╯
`;

    // Créer les catégories
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      menuText += `\n╭───〔 *${k.toUpperCase()} MENU* 〕───╮`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        menuText += `\n│ ✧ 👸${usage}`;
      });
      menuText += `\n╰──────────────────╯`;
    }

    // Envoie final avec image
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/p1xybt.jpg' },
      caption: menuText,
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
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
      
