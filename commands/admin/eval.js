module.exports = {
  ownerOnly: true,
  name: "eval",
  aliases: ["e"],
  category: "<:admin:653177096465809413> Owner",
  description: "Evalue un code.",
  usage: "p!eval <code>",
  permission: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const Client = require("fortnite");
    const fortnite = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");

    const { inspect } = require("util");
    if (message.author.id !== "652145085999349791")
      // && message.author.id !== "470239539068403733")
      return;

    let evaled;
    try {
      evaled = await eval(args.join(" "));
      message.channel.send(`\`\`\`js\n${inspect(evaled)}\`\`\``);
      console.log(inspect(evaled));
    } catch (error) {
      console.error(error);
      message.reply("Une erreur est survenue : " + error);
    }
  }
};
