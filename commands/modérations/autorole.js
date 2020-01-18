module.exports = {
  name: "autorole",
  permission: ["MANAGE_ROLES"],
  description:
    "Met un rôle automatiquement lorsqu'un membre arrive sur le serveur.",
  usage: "autorole <nom | id | mention> du rôle",
  category: "<:badge:667634037988261888> Modérations",
  run: async (client, message, args) => {
     if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
      return message.reply("Vous n'avez pas la permission `MANAGE_ROLES`");
   
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
      return message.reply("Il me faut la permission `MANAGE_ROLES`.");
    const autorole = client.settings.get(message.guild.id, "autorole");
    const { getRole } = require("../../functions.js");
    const role = getRole(message, args.join(" "));
    if (!args.join(" "))
      return message.reply(
        "Veuillez inclure l'id , le nom ou mentionnez le rôle."
      );
    if (!role) return message.reply("Je ne trouve pas ce rôle.");
    if(role.id === autorole) return message.reply("Ce rôle est déjà mis en autorôle.")
    client.settings.set(`${message.guild.id}`, role.id, "autorole");
    message.channel.send({
      embed: {
        color: 0x2bfafa,
        title: "•__Autorole__•",
        description: `L'autorôle a été activé pour le rôle : <@&${role.id}>.`
      }
    });
  }
};
