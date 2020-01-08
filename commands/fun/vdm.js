module.exports = {
  name: "viedemerde",
  category: ":tada: Fun",
  aliases: ["vdm"],
  usage: "viedemerde",
  permission: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const axios = require("axios");
    const token =
      "hXQhg8DAkcqnmTSQYDZSXzHcJ2PooNmFIMSMb6jaya_eTjfCHu2SB4UiW0Lcu-S-";
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed().setColor("2BFAFA");

    axios({
      method: "get",
      url: "https://blague.xyz/api/vdm/random",
      responseType: "application/JSON",
      headers: {
        Authorization: token
      }
    }).then(joke => {
      
      if (joke.data.status === 200) {
        embed
          .setTitle("•__Vie de merde__•")
          .setDescription(
            joke.data.vdm.content
          )
          .setTimestamp()
          .setFooter(
            client.user.username,
            client.user.avatarURL({ format: "png" })
          );
        message.channel.send(embed).then(
            msg =>
              msg.react("🙁") &&
              msg.react("😃") &&
              msg.react("😱") &&
              msg.react("😂")
          )
        } else { message.reply("Une erreur est survenue.")}
    })
  }
};
