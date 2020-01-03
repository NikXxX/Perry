module.exports = {
  name: "viedemerde",
  category: ":tada: Fun",
  aliases: ["vdm"],
  usage: "p!viedemerde",
  permission: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const { Client } = require("arisia-api");
    const ari = new Client();
    ari.divers
      .vdm()
      .then(e =>
        message.channel
          .send({
            embed: {
              title: "Vie de merde",
              color: 0x2BFAFA, //client.config.EMBED.COLOR,
              description: e.url
            }
          })
          .then(
            msg =>
              msg.react("🙁") &&
              msg.react("😃") &&
              msg.react("😱") &&
              msg.react("😂")
          )
      )
      .catch(err => message.channel.send("Une erreur est survenue : " + err));
  }
};
