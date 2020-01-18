const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const ft = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");

module.exports = {
  ownerOnly: false,
  name: "fnshop",
  aliases: ["ft"],
  category: "<:general:667626887014514698> Général",
  description: "Affiche le shop de fortnite.",
  usage: "fnshop",
  permission: [],
  run: async (client, message, args) => {
    const store = await ft.store();

    const embed = new MessageEmbed()
      .setColor("#2BFAFA")
      .setTitle("Boutique de Fortnite")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();

    store.sort((a, b) => {
      return b.vbucks - a.vbucks;
    });

    store.forEach(el => {
      embed.addField(
        el.name,
        stripIndents`- \`Rareté\` : ${el.rarity}
                - \`Prix\` :  ${el.vbucks} v-bucks
                - \`Image:\` [Cliquez ici](${el.image})`,
        true 
      );
    });

    message.channel.send(embed);
  }
};
