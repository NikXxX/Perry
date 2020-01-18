module.exports = {
  name: "option",
  description: "Active ou désactive le système de niveau.",
  usage: "option xp <on/off>",
  permission: ["MANAGE_GUILD"],
  category: "<:badge:667634037988261888> Modérations",
  run: async (client, message, args) => {
    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas la permission `MANAGE_GUILD`.")
    if (!args[0]) return message.reply("Veuillez choisir une option!");
    if (args[0] && !["xp"].includes(args[0]))
      return message.reply("Cette option n'est pas valide!");
    if (args[1] && !["on", "off"].includes(args[1]))
      return message.reply("Cette option n'est pas valide!");
    if (args[1] === client.xp.get(message.guild.id, "option"))
      return message.reply(`Le système d'xp est déjà sur ${args[0]}!`);
    if (args[0] === "xp") {
      client.xp.set(message.guild.id, args[1], "option");
      message.reply(`Le système d'xp est maintenant sur ${args[1]}!`);
    } 
  }
};
