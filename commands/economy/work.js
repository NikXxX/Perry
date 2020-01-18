module.exports = {
  name: "work",
  permission: [],
  category: "<:coins:667642903254007828> Économie",
  aliases: ["w"],
  usage: "work",
  description: "Travail.",
  run: async (client, message, args) => {
    let random = Math.floor(Math.random() * 300);
    if (message.author.id === "652145085999349791") {
      random = Math.floor(Math.random() * 600) + 500;
    }

    const workMessages = [
      `Vous avez arrêté 2 dealers, vous avez obtenu ${random} Perryen!`,
      `Les gangster vous ont donné ${random} Perryen!`,
      `Vous avez vendu 3 sachets de drogues pour une somme de ${random} Perryen !`,
      `Vous venez de gagner ${random} Perryen au poker !`,
      `Un avocat vous a donné ${random} Perryen pour que vous n'inculpiez pas son client !`,
      `Vous aidez la police à arrêter un avocat corrompu.En faisant cela vous avez obtenu ${random} Perryen !`,
      `Vous traffiquez une preuve pour un chef de la mafia accusé de gangstérisme.Ils vous ont donné ${random} Perryen!`
    ];
    const randomWorkMessages = Math.floor(Math.random() * workMessages.length);
    if (
      client.money.get(`${message.guild.id}-${message.author.id}`, "cooldown") <
      Date.now()
    ) {
      let money = client.money.get(
        `${message.guild.id}-${message.author.id}`,
        "money"
      );
      money = money + random;
      client.money.set(
        `${message.guild.id}-${message.author.id}`,
        money,
        "money"
      );
      message.channel.send({
        embed: {
          title: "•__Work__•",
          color: "2bfafa",
          description: workMessages[randomWorkMessages]
        }
      });
      if (message.author.id !== "652145085999349791") {
        client.money.set(
          `${message.guild.id}-${message.author.id}`,
          Date.now() + 1000 * 60 * 60 * 6,
          "cooldown"
        );
      }
    } else {
      const time =
        client.money.get(
          `${message.guild.id}-${message.author.id}`,
          "cooldown"
        ) - Date.now();
      const tims = require("tims");
      const timeout = tims.text(time, { lang: "fr" });
      return message.channel.send({
        embed: {
          color: "2bfafa",
          description: `Veuillez attendre ${timeout} avant de réessayer!`
        }
      });
    }
  }
};
