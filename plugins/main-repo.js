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
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/INCONNU-BOY/QUEEN-ASUNA-MD';

    try {
        // Loading animation
        const loadingStages = [
            "🔍 *Fetching Repository Data...*",
            "📡 *Connecting to GitHub API...*", 
            "📂 *Analyzing Repository...*",
            "✨ *Finalizing Details...*",
            "✅ *Repository Info Ready!*"
        ];

        let loadingMsg = await conn.sendMessage(from, { text: loadingStages[0] }, { quoted: mek });
        
        for (let i = 1; i < loadingStages.length; i++) {
            await new Promise(res => setTimeout(res, 500));
            await conn.sendMessage(from, {
                text: loadingStages[i],
                edit: loadingMsg.key
            }, { quoted: mek });
        }

        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const repoData = await response.json();

        // Enhanced Design Styles
        const styles = [
            // Style 1: Modern Gradient
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

            // Style 2: Neon Terminal
            `┌─✦ 𝗤𝗨𝗘𝗘𝗡 𝗔𝗦𝗨𝗡𝗔 𝗚𝗜𝗧𝗛𝗨𝗕 ✦─┐
            
  🗂️  𝗥𝗘𝗣𝗢: ${repoData.name}
  👑  𝗢𝗪𝗡𝗘𝗥: ${repoData.owner.login}
  ✨  𝗦𝗧𝗔𝗧𝗦: ★ ${repoData.stargazers_count} | 🍴 ${repoData.forks_count}
  📊  𝗦𝗜𝗭𝗘: ${(repoData.size / 1024).toFixed(1)} MB
  🔄  𝗨𝗣𝗗𝗔𝗧𝗘𝗗: ${new Date(repoData.updated_at).toLocaleDateString()}
  
  📄 ${repoData.description || 'No description'}
  
  🌐 ${repoData.html_url}
  
└─✦ 𝗕𝘆 𝗜𝗻𝗰𝗼𝗻𝗻𝘂 𝗕𝗼𝘆 ✦─┘`,

            // Style 3: Minimalist Cards
            `▁▂▃▄▅▆▇ 𝗤𝗨𝗘𝗘𝗡 𝗔𝗦𝗨𝗡𝗔 ▇▆▅▄▃▂▁

  🏷️  ${repoData.name}
  👨‍💻  ${repoData.owner.login}
  
  📈 𝗠𝗲𝘁𝗿𝗶𝗰𝘀:
  ╰─⭐ ${repoData.stargazers_count} Stars
  ╰─🍴 ${repoData.forks_count} Forks  
  ╰─👁️ ${repoData.watchers_count} Watchers
  
  📖 ${repoData.description || 'No description available'}
  
  🔗 ${repoData.html_url}
  
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔`,

            // Style 4: Professional Report
            `╔═══════════════════════════╗
   👸 𝗤𝗨𝗘𝗘𝗡 𝗔𝗦𝗨𝗡𝗔 𝗠𝗗 - 𝗥𝗘𝗣𝗢
╚═══════════════════════════╝

  📊 𝗣𝗿𝗼𝗷𝗲𝗰𝘁 𝗢𝘃𝗲𝗿𝘃𝗶𝗲𝘄:
  • 𝗡𝗮𝗺𝗲: ${repoData.name}
  • 𝗠𝗮𝗶𝗻𝘁𝗮𝗶𝗻𝗲𝗿: ${repoData.owner.login}
  • 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲: ${repoData.language || 'Not specified'}
  • 𝗟𝗶𝗰𝗲𝗻𝘀𝗲: ${repoData.license?.name || 'None'}
  
  📈 𝗘𝗻𝗴𝗮𝗴𝗲𝗺𝗲𝗻𝘁:
  ★ ${repoData.stargazers_count} Stars
  🍴 ${repoData.forks_count} Forks
  👁️ ${repoData.watchers_count} Watching
  
  📝 ${repoData.description || 'No description'}
  
  🔗 ${repoData.html_url}
  
════════════════════════════
  𝗗𝗲𝘃: Inconnu Boy | 𝗩𝗲𝗿: 1.0.0`,

            // Style 5: Social Media Style
            `✦ ─── 𝗤𝗨𝗘𝗘𝗡 𝗔𝗦𝗨𝗡𝗔 𝗠𝗗 ─── ✦

💫 𝗚𝗶𝘁𝗛𝘂𝗯 𝗥𝗲𝗽𝗼𝘀𝗶𝘁𝗼𝗿𝘆

🏷️ 𝗧𝗶𝘁𝗹𝗲: ${repoData.name}
👤 𝗔𝘂𝘁𝗵𝗼𝗿: ${repoData.owner.login}

📊 𝗦𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗰𝘀:
┌─ 🌟 ${repoData.stargazers_count} Stars
├─ 🍴 ${repoData.forks_count} Forks
└─ 👀 ${repoData.watchers_count} Watchers

📖 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:
"${repoData.description || 'No description available'}"

🔗 𝗔𝗰𝗰𝗲𝘀𝘀: ${repoData.html_url}

🎀 ─── 𝗘𝗻𝗷𝗼𝘆 𝗖𝗼𝗱𝗶𝗻𝗴! ─── 🎀`,

            // Style 6: Elegant Frame
            `┌──────────────────────────┐
         👑 𝗤𝗨𝗘𝗘𝗡 𝗔𝗦𝗨𝗡𝗔
└──────────────────────────┘

  📂 𝗥𝗲𝗽𝗼: ${repoData.name}
  👨‍💻 𝗗𝗲𝘃: ${repoData.owner.login}
  
  🎯 𝗦𝘁𝗮𝘁𝘀:
  ├─ ✨ ${repoData.stargazers_count}
  ├─ 🍴 ${repoData.forks_count} 
  └─ 📁 ${repoData.open_issues_count} Issues
  
  📄 ${repoData.description || 'Description not available'}
  
  🌍 ${repoData.html_url}
  
┌──────────────────────────┐
   💝 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗜𝗻𝗰𝗼𝗻𝗻𝘂 𝗕𝗼𝘆
└──────────────────────────┘`
        ];

        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

        // Send with enhanced image and styling
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
