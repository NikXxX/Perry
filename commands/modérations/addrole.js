module.exports = {
  name: "addrole",
  aliases: ["ar"],
  permission: ["MANAGE_ROLES"],
  usage:
    "addrole <pseudo | id | surnom du membre> <nom | id  | mention du role>",
  description: "Ajoute un rôle à la personne mentionné.",
  category: ":rotating_light: Modérations",
  run: async (client, message, args) => {
    const { getMember } = require("../../functions.js"),
      { getRole } = require("../../functions.js"),
      role = getRole(message, args.slice(1).join(" ")),
      membre = getMember(message, args[0]);
    
    if(!membre) return message.reply("Veuillez inclure le nom , l'id , le discriminateur ou mentionner l'utilisateur.");
    if(!role) return message.reply("Veuillez inclure le nom , l'id ou mentionner le rôle.");
    if(membre.roles.has(role)) return message.reply("Cet utilisateur possède déjà ce rôle.")
    membre.roles.add(role).then(() => message.channel.send(`<@${membre.id}> , Vous venez de reçevoir le rôle <@&${role.id}> !`))
  }
};
