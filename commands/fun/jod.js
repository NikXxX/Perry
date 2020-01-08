module.exports = {
  name: "jokeofday",
  permission: ["SEND_MESSAGES"],
  category: ":tada: Fun",
  usage: "jokeofday",
  aliases: ["jod", "joke"],
  description: "Fait la blague du jour.",
  run: async (client, message, args) => {
    const axios = require("axios");
    const token =
      "hXQhg8DAkcqnmTSQYDZSXzHcJ2PooNmFIMSMb6jaya_eTjfCHu2SB4UiW0Lcu-S-";
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed().setColor("2BFAFA");

    axios({
      method: "get",
      url: "https://blague.xyz/api/joke/day",
      responseType: "application/JSON",
      headers: {
        Authorization: token
      }
    }).then(joke => {
      if (joke.data.status === 200) {
        embed
          .setTitle("•__Blague du jours__•")
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
