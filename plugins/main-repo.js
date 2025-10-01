const fetch = require('node-fetch');
const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info", "github"],
    desc: "Fetch GitHub repository information",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from }) => {
    const githubRepoURL = 'https://github.com/INCONNU-BOY/QUEEN-ASUNA-MD';

    try {
        // Extraire username et repo
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const repoData = await response.json();

        // Styles dispo (random)
        const styles = [
            `╭─── 𝗤𝗨𝗘𝗘𝗡 𝗔𝗦𝗨𝗡𝗔 𝗠𝗗 ───╮
            
  📁 𝗥𝗘𝗣𝗢𝗦𝗜𝗧𝗢𝗥𝗬 𝗜𝗡𝗙𝗢
  
  𝗡𝗮𝗺𝗲: ${repoData.name}
  𝗢𝘄𝗻𝗲𝗿: ${repoData.owner.login}
  𝗦𝘁𝗮𝗿𝘀: ⭐ ${repoData.stargazers_count}
  𝗙𝗼𝗿𝗸𝘀: 🍴 ${repoData.forks_count}
  𝗪𝗮𝘁𝗰𝗵𝗲𝗿𝘀: 👁️ ${repoData.watchers_count}
  
  📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:
  ${repoData.description || 'No description provided'}
  
  🔗 ${repoData.html_url}
  
╰─ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗜𝗻𝗰𝗼𝗻𝗻𝘂 𝗕𝗼𝘆 ─╯`,

            `┌─✦ 𝗤𝗨𝗘𝗘𝗡 𝗔𝗦𝗨𝗡𝗔 𝗚𝗜𝗧𝗛𝗨𝗕 ✦─┐
            
  🗂️  𝗥𝗘𝗣𝗢: ${repoData.name}
  👑  𝗢𝗪𝗡𝗘𝗥: ${repoData.owner.login}
  ✨  𝗦𝗧𝗔𝗧𝗦: ★ ${repoData.stargazers_count} | 🍴 ${repoData.forks_count}
  📊  𝗦𝗜𝗭𝗘: ${(repoData.size / 1024).toFixed(1)} MB
  🔄  𝗨𝗣𝗗𝗔𝗧𝗘𝗗: ${new Date(repoData.updated_at).toLocaleDateString()}
  
  📄 ${repoData.description || 'No description'}
  
  🌐 ${repoData.html_url}
  
└─✦ 𝗕𝘆 𝗜𝗻𝗰𝗼𝗻𝗻𝘂 𝗕𝗼𝘆 ✦─┘`
        ];

        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

        // Envoi direct sans loading
        await conn.sendMessage(from, {
            image: { 
                url: `https://files.catbox.moe/kmrq7z.jpg`,
                mimetype: 'image/jpeg'
            },
            caption: selectedStyle,
            contextInfo: { 
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: "👑 Queen Asuna MD - GitHub",
                    body: "Advanced WhatsApp Bot Repository",
                    thumbnail: await conn.getFile('https://files.catbox.moe/kmrq7z.jpg'),
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    sourceUrl: githubRepoURL
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Repo command error:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝗘𝗿𝗿𝗼𝗿\n\nFailed to fetch repository information:\n${error.message}\n\nPlease try again later.`
        }, { quoted: mek });
    }
});
