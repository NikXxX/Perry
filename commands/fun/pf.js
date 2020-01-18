module.exports = {
  name: "pf",
  permission: [],
  category: "<:fun:667627121107271681> Fun",
  usage: "pf <pile | face>",
  run: async (client, message, args) => {
    let choice = ["pile", "face"];
    if (!args[0] || !choice.includes(args[0]))
      return message.reply("Vous devez choisir pile ou face.");
    const random = Math.floor(Math.random() * choice.length);
    console.log(choice[random]);

    if (args.join(" ") !== choice[random]) {
      return message.channel.send({
        embed: {
          color: 0x2bfafa,
          description: `${choice[random]} ! Tu as perdu !`
        }
      });
    } else {
      return message.channel.send({
        embed: { description: `${choice[random]} ! Tu as gagné !`, color: 0x2bfafa }
      });
    }
  }
};
