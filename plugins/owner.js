const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "general",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Envoi du contact vCard
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Message stylisé avec image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/p1xybt.jpg' },
            caption: `
╭━━〔 *OWNER INFO* 〕━━╮
┃ ✦ *Nom* : ${ownerName}
┃ ✦ *Numéro* : ${ownerNumber}
┃ ✦ *Bot* : QUEEN ASUNA MD
┃ ✦ *Version* : 1.0.0 Beta
╰━━━━━━━━━━━━━━━━━━╯
*⚡POWERED BY INCONNU BOY ⚡*
            `.trim(),
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363397722863547@newsletter',
                    newsletterName: 'QUEEN ASUNA MD',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`❌ Une erreur est survenue : ${error.message}`);
    }
});
