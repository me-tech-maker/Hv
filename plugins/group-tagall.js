

const config = require('../config')
const { cmd } = require('../command')
const { getGroupAdmins } = require('../inconnuboy/functions')

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, body }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        
        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("❌ Only group admins or the bot owner can use this command.");
        }

        // Récupération des infos du groupe
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        let totalAdmins = groupAdmins ? groupAdmins.length : 0;

        if (totalMembers === 0) return reply("❌ No members found in this group.");

        // Extraire le message
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "⚠️ Attention Everyone";

        // Design du message
        let teks = `
╭───────────────⭓
│ *Group* : ${groupName}
│ *Admins* : ${totalAdmins}
│ *Members* : ${totalMembers}
│ *Message* : ${message}
│
├───⊷ *MENTIONS*
`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `│ 🔔 @${mem.id.split('@')[0]}\n`;
        }

        teks += "╰───────────────⭓\n*👑 QUEEN ASUNA MD*";

        conn.sendMessage(from, { 
            text: teks, 
            mentions: participants.map(a => a.id) 
        }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});
