module.exports = {
  ownerOnly: true,
  name: "eval",
  aliases: ["e"],
  category: "<:owner:667627445830156298> Owner",
  description: "Evalue un code.",
  usage: "eval <code>",
  permission: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
   const key = `${message.guild.id}-${message.author.id}`
    const ms = require("ms")
    const backup = require("discord-backup")
    const tims = require("tims")
    const clean = text => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    const Client = require("fortnite");
    const fortnite = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");
    const ID = ["652145085999349791"]
    const { inspect } = require("util");
    if(!ID.includes(message.author.id)) return;
     try {
       
      const code = args.join(" ");
        let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {
        code: "xl"
      })
       console.log(clean(evaled))
    } catch (err) {
      message.channel.send(`\`ERREUR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
};
