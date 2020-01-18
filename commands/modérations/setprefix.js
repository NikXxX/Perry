module.exports = {
  name: "setprefix",
  aliases: ["setp","sp"],
  category: "<:badge:667634037988261888> Modérations",
  description: "Permet de modifier le préfix de Perry.",
  usage: "setprefix <prefix>",
  permission: ["MANAGE_GUILD"],
  run: (client, message, args) => {
  if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.reply("Vous n'avez pas la permission `MANAGE_GUILD`");
  
    const prefix = client.settings.get(`${message.guild.id}`,"prefix")
    if (!args[0]) return message.reply("Veuillez inclure le préfix désirer!");
    if (args[0].length > 5)
      return message.reply("Le préfix doit avoir moin de 5 caractères!");
    if (args[0] === prefix)
      return message.reply(
        `Le préfix : ${prefix} est déjà le préfix du serveur.`
      );
    client.settings.set(`${message.guild.id}`, args[0], "prefix")

    message.channel.send(
      "Nouveau prefix défini en : `" + args[0]+"`"
    );
  }
};
