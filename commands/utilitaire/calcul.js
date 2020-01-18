module.exports = {
  name: "calcul",
  aliases: ["calc"],
  usage: "calcul <expression>",
  category: "<:general:667626887014514698> Général",
  description: "Résoudre une expression.",
  permission: [],
  run: async (client, message, args) => {
    const Discord = require("discord.js");
    const math = require("math-expression-evaluator");
    try {
      if (!args.join(" "))
        return message.reply("veuillez préciser un calcul à résoudre.");
      let result = math.eval(args.join(" "));
      result = Math.round(result * 1000);
      result = result / 1000;
      if (Number.isNaN(result))
        return message.reply("il est impossible de diviser un nombre par 0.");
      let embed = new Discord.MessageEmbed()
        .setColor(0x2BFAFA)
        .setAuthor(
          "Calculatrice",
          client.user.displayAvatarURL({ format: "png" })
        )
        .addField(
          "•__Calcul__•",
          `\`\`\`Js\n${args
            .join("")
            .replace(/[x]/gi, "*")
            .replace(/[,]/g, ".")
            .replace(/[÷]/gi, "/")}\`\`\``
        )
        .addField("•__Résultat__•", `\`\`\`Js\n${result}\`\`\``);
      message.reply(embed);
    } catch (e) {
      message.reply(":x: Je n'arrive pas à résoudre cette expréssion! ");
    }
  }
};
