module.exports = {
  name: "botinfos",
  aliases: ["bi"],
  category: "<:general:667626887014514698> Général",
  permission: [],
  description: "Donne les informations de Perry",
  usage: "botinfos",
  run: (client, message) => {
    // const vr = require("./package.json")
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed()
      .setColor("2BFAFA")
      .setTitle("•__Voici des informations sur Perry__•")
      .addField(
        ":computer: Développeur :",
        "<@652145085999349791>(`ShadowV_DSF#9339`)"
      )
      .addField(
        "📊 Statistiques : ",
        `- \`Serveurs\` : ${client.guilds.size}\n- \`Utilisateurs\` : ${client.users.size}`
      )
      .addField(
        "⚙️ Version",
        `- \`Perry\` : 0.0.1-beta\n- \`NodeJS\` : 12.5.0\n- \`discord.js\` : 12.0.0-dev`
      )
    .setThumbnail(client.user.displayAvatarURL({format: "png"}))
    .setTimestamp()
    .setFooter(client.user.username,client.user.displayAvatarURL({format: "png"}))
    message.channel.send(embed);
  }
};
