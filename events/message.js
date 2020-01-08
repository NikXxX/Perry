module.exports = async (client, message) => {
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
  const prefixe = db.get("prefixe").find({id: message.guild.id}).value()
  //console.log(prefix)
  const moment = require("moment");
  const { MessageEmbed } = require("discord.js");
  const embed = new MessageEmbed();
  let lang = require("../langs/fr");
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message.author);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) {
    command = client.commands.get(client.aliases.get(cmd));
  }
  if (command) {
    let permission = true;

    command.permission.forEach(p => {
      if (!message.member.hasPermission(p)) permission = false;
    });

    if (permission) command.run(client, message, args, lang, embed,prefix);

    if (!permission)
      return message.reply(
        `Vous n'avez pas la permission \`${command.permission}\`.` //Attribuez-la vous et recommencez l'opération.`
      );
  }
  if (message.content.includes(`<@${client.user.id}>`))
    return message.reply(`Mon préfix est \`${prefix}\`.`);
};
module.exports.config = {
  name: "message",
  type: "event",
  enabled: true
};
