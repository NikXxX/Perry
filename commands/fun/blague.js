module.exports = {
  name: "blague",
  permission: ["SEND_MESSAGES"],
  category: ":tada: Fun",
  usage: "p!blague",
  description: "Fait un blague aléatoire.",
  run: async (client, message, args) => {
    const Joker = require("blague.xyz");
    const joker = new Joker();

    joker
      .random()
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
