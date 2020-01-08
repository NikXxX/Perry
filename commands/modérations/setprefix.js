module.exports = {
  name: "setprefix",
  aliases: ["setp"],
  category: ":rotating_light: Modérations",
  description: "Permet de modifier le préfix de Perry.",
  usage: "setprefix <prefix>",
  permission: ["MANAGE_SERVER"],
  run: (client, message, args) => {
    //if (message.author.id !== "652145085999349791") return message.reply("Commande en developpement!");
    const lowdb = require("lowdb");
    const fileSync = require("lowdb/adapters/FileSync.js");
    const adapter = new fileSync("prefix.json");
    const db = lowdb(adapter);

    if (
      !db
        .get("prefixe")
        .find({ id: message.guild.id })
        .value()
    ) {
      db.get("prefixe")
        .push({
          id: message.guild.id, //[0]
          prefix: "p!" //[1]
        })
        .write();
    }
    const prefix = db.get('prefixe').find({ id: message.guild.id} ).value().prefix

    if (!args[0]) return message.reply("Veuillez inclure le préfix désirer!");
    if (args[0].length > 5)
      return message.reply("Le préfix doit avoir moin de 5 caractères!");
    if (args[0] === prefix[1])
      return message.reply(
        `Le préfix : ${prefix[1]} est déjà le préfix du serveur.`
      );
    db.get("prefixe")
      .find({ id: message.guild.id })
      .assign({ prefix: args[0] })
      .write();

    message.channel.send(
      "Nouveau prefix défini en : `" + args[0]+"`"
    );
  }
};
