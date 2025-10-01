const { cmd } = require('../command');

cmd({
  pattern: "ping",
  desc: "Check bot's response time.",
  category: "general",
  react: "🍂",
  filename: __filename
},
async (conn, mek, m, { from }) => {
  try {
    const start = Date.now();
    let msgPing = await conn.sendMessage(from, { text: "🏓 Pinging..." }, { quoted: mek });
    const end = Date.now();
    const ping = end - start;

    await conn.sendMessage(from, { 
      text: `⚡ Pong!\n⏱️ ${ping}ms` 
    }, { quoted: msgPing });

  } catch (e) {
    console.error("Erreur Ping:", e);
    await conn.sendMessage(from, { text: "❌ Une erreur est survenue lors du test." }, { quoted: mek });
  }
});
