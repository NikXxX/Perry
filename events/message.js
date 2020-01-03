module.exports = async (client, message) => {
  const prefix = "p!";
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

    if (permission) command.run(client, message, args, lang, embed);

    if (!permission)
      return message.reply(
        `Vous n'avez pas la permission \`${command.permission}\`.` //Attribuez-la vous et recommencez l'opération.`
      );
  }
  if (message.content.includes(`<@${client.user.id}>`))
    return message.reply("Mon préfix est `p!`.");
};
module.exports.config = {
  name: "message",
  type: "event",
  enabled: true
};
