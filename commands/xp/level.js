module.exports = {
  name: "rank",
  description: "Affiche votre niveau.",
  usage: "rank [user]",
  category: "<:general:667626887014514698> Général",
  permission: [],
  run: async (client, message, args,lang) => {
    const { getMember } = require("../../functions.js");
    const member = getMember(message, args.join(" "));
    
    if (client.xp.get(message.guild.id, "option") !== "off") {
      const key = `${message.guild.id}-${member.id}`;
    const xphave = client.xp.get(key, "xp");
    const lvl = client.xp.get(key, "level") + 1;
    const xpmanquant = lvl * 10 * (lvl * 10);

      return message.channel.send({
        embed: {
          color: 0x2bfafa,
          title: `•__${member.user.username}__•`,
          description: `
  Level : ${client.xp.get(
    key,
    "level"
  )}\nXp : ${client.xp.get(key, "xp")}/${xpmanquant}`,
          thumbnail: { url: member.user.displayAvatarURL({format: "png"}) }
        }
      });
    } else {
      return message.reply(
     `${lang.xp.noactive} ` +client.settings.get(message.guild.id,"prefix")+"option xp on"
      );
    }
  }
};
