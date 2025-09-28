const { cmd } = require("../command");
const { sleep } = require("../lib/functions");

const protectedNumbers = ["554488138425","  5544988122687"]; // Block your number or other VIPs

cmd({
  pattern: "callspam2",
  react: '📹',
  desc: "Spam video calls to a target number",
  category: "bug",
  use: ".callspam2 556xxxxxxx|count",
  filename: __filename
}, async (conn, m, msg, {
  from, prefix, command, args, q, reply
}) => {
  // ✅ Only bot owner can use
  if (!msg.isOwner) return reply("⛔ This command is restricted to the *Bot Owner* only!");

  try {
    if (!q) return reply(`📍 *Usage:* ${prefix + command} 5546xxxxxxx|count`);
    
    let [numberRaw, countRaw] = q.split("|");
    let targetNumber = numberRaw.replace(/[^0-9]/g, '');
    let jumlahSpam = parseInt(countRaw) || 10;

    if (!targetNumber) return reply("❌ Invalid number format");
    if (protectedNumbers.includes(targetNumber)) return reply("🚫 This number is protected.");

    const jid = targetNumber + "@s.whatsapp.net";
    const exists = await conn.onWhatsApp(jid);
    if (!exists || exists.length === 0) return reply("🚫 This number is not registered on WhatsApp.");

    reply(`📹 Sending *${jumlahSpam}* Video Calls to @${targetNumber}...\nPlease wait...`, {
      mentions: [jid]
    });

    await sleep(1000);

    for (let i = 0; i < jumlahSpam; i++) {
      try {
        await conn.offerCall(jid, { video: true });
        console.log(`✅ Video call sent to ${jid}`);
      } catch (e) {
        console.error(`❌ Failed to send video call to ${jid}`, e);
      }
      await sleep(2000);
    }

    await conn.sendMessage(from, {
      react: {
        text: '✅',
        key: m.key
      }
    });

  } catch (err) {
    console.error("❌ callspam error:", err);
    return reply("❌ Error occurred while processing the video call spam.");
  }
});


cmd({
  pattern: "callspam",
  react: '📞',
  desc: "Spam voice calls to a target number",
  category: "bug",
  use: ".callspam 554xxxxxxx|count",
  filename: __filename
}, async (conn, m, msg, {
  from, prefix, command, args, q, reply
}) => {
  // ✅ Only bot owner can use
  if (!msg.isOwner) return reply("⛔ This command is restricted to the *Bot Owner* only!");

  try {
    if (!q) return reply(`🦋 *Usage:* ${prefix + command} 554xxxxxxx|count`);
    
    let [numberRaw, countRaw] = q.split("|");
    let targetNumber = numberRaw.replace(/[^0-9]/g, '');
    let jumlahSpam = parseInt(countRaw) || 10;

    if (!targetNumber) return reply("❌ Invalid number format");
    if (protectedNumbers.includes(targetNumber)) return reply("🚫 This number is protected.");

    const jid = targetNumber + "@s.whatsapp.net";
    const exists = await conn.onWhatsApp(jid);
    if (!exists || exists.length === 0) return reply("🚫 This number is not registered on WhatsApp.");

    reply(`📞 Sending *${jumlahSpam}* Voice Calls to @${targetNumber}...\nPlease wait...`, {
      mentions: [jid]
    });

    await sleep(1000);

    for (let i = 0; i < jumlahSpam; i++) {
      try {
        await conn.offerCall(jid, { video: false });
        console.log(`✅ Voice call sent to ${jid}`);
      } catch (e) {
        console.error(`❌ Failed to send voice call to ${jid}`, e);
      }
      await sleep(2000);
    }

    await conn.sendMessage(from, {
      react: {
        text: '✅',
        key: m.key
      }
    });

  } catch (err) {
    console.error("❌ callspam error:", err);
    return reply("❌ Error occurred while processing the voice call spam.");
  }
});
