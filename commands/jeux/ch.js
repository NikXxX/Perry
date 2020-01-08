const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const ft = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");

module.exports = {
  ownerOnly: false,
  name: "fnchallenge",
  aliases: ["fnc"],
  category: ":video_game: Jeux",
  description: "Affiche les défis de fortnite.",
  usage: "fnchallenge",
  permission: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const c = await ft.challenges();
    console.log(c)
    const embed = new MessageEmbed()
      .setColor("#2BFAFA")
      .setTitle("Défis de Fortnite")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      
    c.forEach(el => {
      embed.setThumbnail(el.reward_picture_url)
      embed.addField("- `"+ el.name+ "`","━━━━━━━━━━━━━━━━━━━━",true);
      
    });

    message.channel.send(embed);
  }
};
