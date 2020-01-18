module.exports = {
  name: "top",
  description: "Affiche le classement.",
  usage: "top",
  category: "<:coins:667642903254007828> Économie",
  permission: [],
  run: async (client, message, args,lang) => {
    const key = `${message.guild.id}-${message.author.id}`;
    const filtered = client.money
      .filter(p => p.guild === message.guild.id)
      .array();
    const sorted = filtered.sort(function(a, b) {
      return b.money - a.money;
    });
    const classement = sorted.splice(0, 10);
       const { MessageEmbed } = require("discord.js");
      const embed = new MessageEmbed()
        .setColor("2bfafa")
        .setThumbnail(message.guild.iconURL({ format: "png" }))
        .setTitle("•__LeaderBoard__•");
      classement.forEach((data, index) => {
        embed.addField(
          "[#**" + (index + 1) + "**] " + message.guild.members.get(data.user).user.username+"#"+message.guild.members.get(data.user).user.discriminator,
          `\`${data.money} Perryen\``
        );
      });

      message.channel.send(embed);

  }
};
