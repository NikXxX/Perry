module.exports = {
  name: "crime",
  description: "Fait un crime.",
  usage: "crime",
  category: "<:coins:667642903254007828> Économie",
  permission: [],
  run: async (client, message, args, lang) => {
    const MILLISECOND_IN_A_DAY = 1000 * 60 * 60 * 24;

    if (
      client.money.get(
        `${message.guild.id}-${message.author.id}`,
        "crimecooldown"
      ) < Date.now()
    ) {
      const choices = ["perd", "gagne"];
      let money = Math.floor(Math.random() * 600);
      const random = Math.floor(Math.random() * choices.length);
      const choice = choices[random];
      console.log(choice);
      const messagesLostMoney = [
        `Vous avez dévalisé une banque mais les flics ont été plus rapide que vous!\nVous perdez ${money} Perryen !`,
        `La police vous prend à transporter une cargaison douteuse pour un trafficant.\nVous payez une amande de ${money} Perryen!`
      ];
      const messagesWinMoney = [
        `Vous avez cambrioler une villa , vous avez gagner ${money} Perryen !`
      ];
      const randomMessageLostMoney = Math.floor(
        Math.random() * messagesLostMoney.length
      );
      const randomMessageWinMoney = Math.floor(
        Math.random() * messagesWinMoney.length
      );
      const messageLostMoney = messagesLostMoney[randomMessageLostMoney];
      const messageWinMoney = messagesWinMoney[randomMessageWinMoney];
      let userMoney = client.money.get(
        `${message.guild.id}-${message.author.id}`,
        "money"
      );
      client.money.set(
        `${message.guild.id}-${message.author.id}`,
        Date.now() + MILLISECOND_IN_A_DAY,
        "crimecooldown"
      );
      if (choice === "perd") {
        userMoney -= money;
        client.money.set(
          `${message.guild.id}-${message.author.id}`,
          userMoney,
          "money"
        );
        return message.channel.send({
          embed: { color: "2bfafa", description: messageLostMoney }
        });
      } else {
        userMoney += money;
        client.money.set(
          `${message.guild.id}-${message.author.id}`,
          userMoney,
          "money"
        );
        return message.channel.send({
          embed: { color: "2bfafa", description: messageWinMoney }
        });
      }
    } else {
      const time =
        client.money.get(
          `${message.guild.id}-${message.author.id}`,
          "crimecooldown"
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
