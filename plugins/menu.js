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

    // Calcul de l'utilisation mémoire
    const used = process.memoryUsage();
    const memoryUsage = Math.round(used.rss / 1024 / 1024) + ' MB';

    let menuText = `
╭───────────────⭓
│ ʙᴏᴛ : *Qᴜᴇᴇɴ Aꜱᴜɴᴀ Mᴅ*
│ ᴜsᴇʀ: @${m.sender.split("@")[0]}
│ ᴘʀᴇғɪx: ${config.PREFIX}
│ ᴜᴘᴛɪᴍᴇ: ${uptime()}
│ ᴍᴇᴍᴏʀʏ : ${memoryUsage}
│ ᴄᴏᴍᴍᴀɴᴅs: ${totalCommands}
│ ᴅᴇᴠ: ɪɴᴄᴏɴɴᴜ ʙᴏʏ
╰───────────────⭓
`;

    // Catégories dans l'ordre spécifié
    const categoryOrder = ['tools', 'logo', 'ai', 'search', 'owner', 'download', 'fun', 'general', 'group', 'bug'];
    
    // Créer les catégories
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    // Afficher les catégories dans l'ordre spécifié
    for (let cat of categoryOrder) {
      if (category[cat]) {
        const categoryNames = {
          'tools': '🌐 ᴛᴏᴏʟs',
          'logo': '🎨 ʟᴏɢᴏ',
          'ai': '🤖 ᴀɪ',
          'search': '🔍 sᴇᴀʀᴄʜ',
          'owner': '👑 ᴏᴡɴᴇʀ',
          'download': '📥 ᴅᴏᴡɴʟᴏᴀᴅ',
          'fun': '🎭 ғᴜɴ',
          'general': '⚙️ ɢᴇɴᴇʀᴀʟ',
          'group': '👥 ɢʀᴏᴜᴘ',
          'bug': '🐞 ʙᴜɢ'
        };

        menuText += `\n⭓───────────────⭓『 ${categoryNames[cat] || cat.toUpperCase()} 』`;
        
        const cmds = category[cat].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
        cmds.forEach((cmd) => {
          const usage = cmd.pattern.split('|')[0].trim();
          menuText += `\n│ ⬡ ${usage}`;
        });
        menuText += `\n╰──────────────────⭓`;
      }
    }

    menuText += `\n> *ᴍᴀᴅᴇ ɪɴ ʙʏ ɪɴᴄᴏɴɴᴜ ʙᴏʏ*`;

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
