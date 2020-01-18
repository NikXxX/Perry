module.exports = {
  name: "skin",
  usage: "skin <username>",
  permission: [],
  category: "<:general:667626887014514698> Général",
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");
    const text = args
      .join(" ")
      .split("")
      .filter(r =>
        "abcdefghijklmnopqrstuvwxyz1234567890_-".includes(
          r.toLowerCase()
        )
      )
      .join("")
    if(!text) return message.reply("Veuillez saisir le pseudo d'un joueur Minecraft")
    if(text.length > 20) return message.reply("Le pseudo du joueur doit être inférieur à 20 caractères!")
    const embed = new MessageEmbed()
    .setColor(0x2BFAFA)
    .setImage(`https://minotar.net/armor/body/${text}/100.png`)
    .setTitle("•__"+text+"__•")
    message.channel.send(embed)
  }
};
