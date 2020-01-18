module.exports = {
  name: "removerole",
  aliases: ["rr"],
  permission: ["MANAGE_ROLES"],
  usage:
    "removerole <pseudo | id | surnom du membre> <nom | id  | mention du role>",
  description: "Retirer un rôle à la personne mentionné.",
  category: "<:badge:667634037988261888> Modérations",
  run: async (client, message, args) => {
    const { getMemberR } = require("../../functions.js"),
      { getRole } = require("../../functions.js"),
      role = getRole(message, args.slice(1).join(" ")),
      membre = getMemberR(message, args[0]);
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
      return message.reply(
        "Veuillez m'attribuer la permission suivante : `MANAGE_ROLES`."
      );
    if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
      return message.reply("Vous n'avez pas la permission `MANAGE_ROLES`");
  
    if (!args[0])
      return message.reply(
        "Veuillez inclure le nom , l'id , le discriminateur ou mentionner l'utilisateur."
      );
      if (!args.slice(1).join(" "))
      return message.reply(
        "Veuillez inclure le nom , l'id ou mentionner le rôle."
      );
      if(!membre) return message.reply("Je ne trouve pas cet utilisateur.")
      if(!role) return message.reply("Je ne trouve pas ce rôle.")
 
    if (
      message.guild.roles.get(role.id).rawPosition <
      message.guild.member(client.user).roles.highest.rawPosition
    ) { 
    if (membre.roles.has(role.id)) {
      membre.roles
        .remove(role)
        .then(() =>
          message.channel.send(
            `<@${membre.id}> , Vous venez de perdre le rôle <@&${role.id}> !`
          )
        );
    } else {
      return message.reply("Cet utilisateur ne possède pas ce rôle.");
    }
    }else {return message.reply("Veuillez mettre mon rôle au dessus du rôle <@&"+role.id+">.")}
  }
};
