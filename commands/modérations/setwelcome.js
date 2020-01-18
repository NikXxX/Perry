module.exports = {
  name: "setwelcome",
  aliases: ["setw", "sw"],
  category: "<:badge:667634037988261888> Modérations",
  description: "Permet de set un message de bienvenue.",
  usage: "setwelcome <option> <#salon> <message>",
  permission: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.reply("Vous n'avez pas la permission `MANAGE_GUILD`");

    const salon = message.mentions.channels.first(),
      msg = args.slice(2).join(" "),
      option = args[0];
    if (!option)
      return message.reply("Veuillez choisir une option : embed ou message.");
    if (option && !["embed", "message"].includes(option))
      return message.reply("Cette option n'existe pas.");
    if (!salon) return message.reply("Veuillez mentionné le salon!");
    if (!msg)
      return message.reply("Veuillez inclure les message de bienvenue!");

    if (
      option === client.settings.get(message.guild.id, "welcome_option") &&
      salon.id === client.settings.get(message.guild.id, "welcome_channel") &&
      msg === client.settings.get(message.guild.id, "welcome_message")
    ) {
      return message.reply(
        "Ce salon , ce message et cette option est déjà set!"
      );
    } else {
      client.settings.set(`${message.guild.id}`, salon.id, "welcome_channel");
      client.settings.set(`${message.guild.id}`, msg, "welcome_message");
      client.settings.set(`${message.guild.id}`, option, "welcome_option");
      return message.channel.send({
        embed: {
          description:
            "•__Nouveau salon défini__•\n- `" +
            salon.name +
            "`\n•__Nouveau message défini__•\n- `" +
            msg +
            "`\n•__Nouvelle option définie__•\n- `" +
            option +
            "`",
          color: 0x2bfafa
        }
      });
    }
  }
};
