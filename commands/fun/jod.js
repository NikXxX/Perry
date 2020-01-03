module.exports = {
  name: "jokeofday",
  permission: ["SEND_MESSAGES"],
  category: ":tada: Fun",
  usage: "p!jokeofday",
  aliases: ["jod", "joke"],
  description: "Fait la blague du jour.",
  run: async (client, message, args) => {
    const Joker = require("blague.xyz");
    const joker = new Joker();

    joker
      .daily()
      .then(joke => {
        message.channel.send({
          embed: {
            color: 0x2BFAFA,
            description: joke.question + "\n||" + joke.answer + "||"
          }
        });
      })
      .catch(err => message.channel.send("Une erreur est survenue : " + err));
  }
};
