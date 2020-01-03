module.exports = {
  name: "pf",
  permission: ["SEND_MESSAGES"],
  category: ":tada: Fun",
  usage: "p!pf <pile | face>",
  run: async (client, message, args) => {
    let choice = ["pile", "face"];
    if (!args[0] || !choice.includes(args[0]))
      return message.reply("Vous devez choisir pile ou face.");
    const a = Math.floor(Math.random() * choice.length);
    console.log(choice[a]);

    if (choice[a] !== args[0])
      return message.channel.send({
        embed: {
          color: 0x2BFAFA,
          description: `${choice[a]} ! Tu as perdu !`
        }
      });
    else return message.channel.send(`${choice[a]} ! Tu as gagné !`);
  }
};
