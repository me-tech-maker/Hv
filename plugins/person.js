const { cmd } = require("../command");

cmd({
  pattern: "profil",
  alias: ["userinfo", "person", "whois", "checkuser"],
  desc: "Get full WhatsApp user profile information",
  category: "utility",
  filename: __filename
}, async (client, message, match, { from, sender, quoted, isGroup, participants }) => {
  try {
    const userJid =
      quoted?.sender ||
      message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      sender;

    const [user] = await client.onWhatsApp(userJid).catch(() => []);
    if (!user?.exists) {
      return client.sendMessage(from, {
        text: "❌ User not found on WhatsApp."
      }, { quoted: message });
    }

    let ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
    try {
      ppUrl = await client.profilePictureUrl(userJid, 'image');
    } catch {}

    let userName = userJid.split('@')[0];
    try {
      if (isGroup) {
        const member = participants.find(p => p.id === userJid);
        if (member?.notify) userName = member.notify;
      }

      const name = await client.getName(userJid).catch(() => null);
      if (name) userName = name;
    } catch {}

    let bio = {};
    try {
      const statusData = await client.fetchStatus(userJid).catch(() => null);
      if (statusData?.status) {
        bio = {
          text: statusData.status,
          type: "👤 Personal",
          updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
        };
      } else {
        const business = await client.getBusinessProfile(userJid).catch(() => null);
        if (business?.description) {
          bio = {
            text: business.description,
            type: "🏢 Business",
            updated: null
          };
        }
      }
    } catch {}

    const groupRole = isGroup
      ? (participants.find(p => p.id === userJid)?.admin ? "👑 Admin" : "👥 Member")
      : "";

    const formattedBio = bio.text
      ? `${bio.text}\n└─ 📌 Type: ${bio.type}${bio.updated ? ` | 🕒 Updated: ${bio.updated.toLocaleString()}` : ''}`
      : "— No bio or description available —";

    let lastSeen = "";
    try {
      const presence = await client.presenceSubscribe(userJid).catch(() => null);
      if (presence?.lastSeen) {
        lastSeen = `⏱️ *Last Seen:* ${new Date(presence.lastSeen).toLocaleString()}`;
      }
    } catch {}

    const text = `
╭───〔 🧊 *USER PROFILE INFO* 〕───⭓
│ 📛 *Name:* ${userName}
│ 🔢 *Number:* ${userJid.replace(/@.+/, '')}
│ 📌 *Account Type:* ${user.isBusiness ? "💼 Business" : user.isEnterprise ? "🏢 Enterprise" : "👤 Personal"}
│ 🛡️ *Verified:* ${user.verifiedName ? `✅ ${user.verifiedName}` : "❌ Not verified"}
│ ✅ *Registered:* ${user.isUser ? "Yes" : "No"}
${groupRole ? `│ 👥 *Group Role:* ${groupRole}` : ""}
${lastSeen ? `│ ${lastSeen}` : ""}
╰─────────────────────────────⭓

📝 *About:*
${formattedBio}
    `.trim();

    await client.sendMessage(from, {
      image: { url: ppUrl },
      caption: text,
      mentions: [userJid]
    }, { quoted: message });

  } catch (e) {
    console.error("person error:", e);
    await client.sendMessage(from, {
      text: "❌ Failed to fetch profile:\n" + (e.message || e)
    }, { quoted: message });
  }
});
