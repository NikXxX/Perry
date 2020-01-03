module.exports = {
  name: "minecraft",
  usage: "p!minecraft <adresse ip>",
  description: "Affiche les informations d'un serveur minecraft.",
  permission: ["SEND_MESSAGES"],
  category: ":video_game: Jeux",
  run: async (client, message, args) => {
    const axios = require("axios");
    const { MessageEmbed } = require("discord.js")
    const embed = new MessageEmbed()
    const ip = args.join(" ");
    if (!ip)
      return message.reply(
        "Veuillez préciser l'adresse IP d'un serveur Minecraft."
      );
    axios({
      method: "get",
      url: `https://api.mcsrvstat.us/2/${ip}`,
      responseType: "application/JSON"
    }).then(data => {
//      console.log(data.data.icon.data)
      const r = data.data.description;
      embed
        //.setThumbnail(data.data.icon)
        .setColor("2bfafa")
        .addField(":star: Adresse IP","```\n"+ip+"```")
        .addField("👨‍👩‍👧‍👦 Joueurs", "```\n"+data.data.players.online + "/"+ data.data.players.max+"```")
        //.addField(":ping_pong: Ping", data.data.took.toString() + "ms")
        .addField(":gear: Version","```\n"+data.data.version+"```");
      
     embed.addField("Motd","```\n"+data.data.motd.clean+"```")
      message.channel.send(embed)

    })
          .catch(err => {message.reply("Une erreur est survenue");});
    
  }
};
