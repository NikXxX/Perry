module.exports = {
  name: "leaderboard",
  description: "Affiche le classement.",
  usage: "leaderboard",
  category: "<:general:667626887014514698> Général",
  permission: [],
  run: async (client, message, args,lang) => {
    const key = `${message.guild.id}-${message.author.id}`;
    const filtered = client.xp
      .filter(p => p.guild === message.guild.id)
      .array();
    const sorted = filtered.sort(function(a, b) {
      return b.xp - a.xp;
    });
    const classement = sorted.splice(0, 10);
    if (client.xp.get(message.guild.id, "option") !== "off") {
      const { MessageEmbed } = require("discord.js");
      const embed = new MessageEmbed()
        .setColor("2bfafa")
        .setThumbnail(message.guild.iconURL({ format: "png" }))
        .setTitle("•__LeaderBoard__•");
      classement.forEach((data, index) => {
        embed.addField(
          "[#**" + (index + 1) + "**] " + client.users.get(data.user).tag,
          `Level \`${data.level}\` | XP \`${data.xp}\``
        );
      });

      message.channel.send(embed);
    } else {
      return message.reply(
     `${lang.xp.noactive} ` +client.settings.get(message.guild.id,"prefix")+"option xp on"
      );
    }
  }
};
