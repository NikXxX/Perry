module.exports = {
  name: "bank",
  description: "Affiche votre balance.",
  usage: "bank [user]",
  category: "<:coins:667642903254007828> Économie",
  permission: [],
  run: async (client, message, args, lang) => {
    const { getMember } = require("../../functions.js");
    const member = getMember(message, args.join(" "));

    const key = `${message.guild.id}-${member.id}`;
    const userMoney = client.money.get(key, "money");
    const bankMessages = [`Votre compte s'élève à : \`${userMoney} Perryen\``,`Vous arrivez à la banque, par chance, elle n'est pas encore en faillite, votre compte s'élève à: \`${userMoney} Perryen\``];
    const randomBankMessages = Math.floor(Math.random()*bankMessages.length)
  message.channel.send({
      embed: {
        color: 0x2bfafa,
        title: `•__${member.user.username}__•`,
        description: bankMessages[randomBankMessages],
        thumbnail: { url: member.user.displayAvatarURL({ format: "png" }) }
      }
    });
  }
};
