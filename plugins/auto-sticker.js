const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');

cmd({
  on: 'body'
}, async (conn, mek, m, { from, body }) => {
  try {
    const jsonUrl = 'https://raw.githubusercontent.com/tech927/database/refs/heads/main/auto.json';
    const res = await axios.get(jsonUrl);
    const data = res.data;

    for (const keyword in data) {
      if (body.toLowerCase() === keyword.toLowerCase()) {
        if (config.AUTO_STICKER === 'true') {
          await conn.sendMessage(
            from,
            {
              sticker: { url: data[keyword] },
              package: 'QUEEN-ASUNA-MD'
            },
            { quoted: mek }
          );
        }
      }
    }
  } catch (e) {
    console.error('AutoSticker error:', e);
  }
});
