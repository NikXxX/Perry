module.exports = {
  name: "backup",
  usage: "backup create\nbackup load <backupID>",
  permission: ["MANAGE_GUILD"],
  description: "Crée/Charge une backup.",
  run: async (client, message, args) => {
    const backup = require("discord-backup");
    const option = args[0];
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.reply("Il me faut la permission `MANAGE_GUILD`.");
    if (!message.guild.member(client.user).hasPermission("MANAGE_GUILD"))
      return message.reply("Il me faut la permission `MANAGE_GUILD`.");
    if (option && !["create", "load"].includes(option))
      return message.reply("Cet option n'est pas valide!");
    if (option === "create") {
      backup
        .create(message.guild, { jsonSave: false, saveImage: "url" })
        .then(data => {
          message.author.send(
            `Pour charger la backup veuillez faire : ${client.settings.get(
              message.guild.id,
              "prefix"
            )}backup load ${data.id}`
          );
          message.reply("La backup à été crée!");
          client.backup.set(data.id, data, "backup");
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          message.reply(
            "Une erreur est survenue , veuillez vérifier que vos message privé ne sont pas bloquer!"
          );
        });
    } else if (option === "load") {
      const data = client.backup.get(args[1], "backup");
      backup
        .load(data, message.guild, { clearGuildBeforeRestore: true })
        .then(() => {
        client.backup.remove(data,args[1])
        client.backup.remove(data,"backup")
                essage.reply("La backup a bien été charger!")
      })
        .catch(err => message.reply("Cet id n'existe pas!"));
    }
  }
};

