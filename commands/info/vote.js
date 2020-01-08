module.exports = {
  name: "vote",
  aliases: ["votes"],
  permission: ["SEND_MESSAGES"],
  category: "ℹ️ Informations",
  usage: "vote",
  run: (client, message, args) => {
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed()
      .setColor("2BFAFA")
      .setTitle("•__Vote__•")
      .setDescription(
        "<:arcane:568162416274440202> [Arcane Bot Center](https://arcane-botcenter.xyz/bot/658579503135588392)" +
          "\n" +
          "<:logo:459634405183586304> [Divine Discord Bot List](https://divinediscordbots.com/bot/658579503135588392/vote)"
      )
      .setTimestamp()
      .setFooter(
        client.user.username,
        client.user.avatarURL({ format: "png" })
      );
    message.channel.send(embed);
  }
};
