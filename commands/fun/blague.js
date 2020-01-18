module.exports = {
  name: "blague",
  permission: [],
  category: "<:fun:667627121107271681> Fun",
  usage: "blague",
  description: "Fait un blague aléatoire.",
  run: async (client, message, args) => {
    const axios = require("axios");
    const token =
      "hXQhg8DAkcqnmTSQYDZSXzHcJ2PooNmFIMSMb6jaya_eTjfCHu2SB4UiW0Lcu-S-";
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed().setColor("2BFAFA");

    axios({
      method: "get",
      url: "https://blague.xyz/api/joke/random",
      responseType: "application/JSON",
      headers: {
        Authorization: token
      }
    }).then(joke => {
      if (joke.data.status === 200) {
        embed
          .setTitle("•__Blague__•")
          .setDescription(
            joke.data.joke.question + "\n||" + joke.data.joke.answer + "||"
          )
          .setTimestamp()
          .setFooter(
            client.user.username,
            client.user.avatarURL({ format: "png" })
          );
        message.channel.send(embed);
      } else {
        message.reply("Une erreur est survenue!");
      }
    });
  }
};
