module.exports = async (client, message) => {
  if (message.author.bot) return;
  client.settings.ensure(`${message.guild.id}`, {
    prefix: "p!",
    welcome_channel: "",
    welcome_message: "",
    welcome_option: ""
  });
  client.xp.ensure(message.guild.id, { option: "off" });
  client.money.ensure(message.guild.id, { option: "off" });
  client.money.ensure(`${message.guild.id}-${message.author.id}`, {
    crimecooldown: 0,
    guild: message.guild.id,
    cooldown: 0,
    money: 0,
    user: message.author.id
  });

  if (client.xp.get(message.guild.id, "option") === "on") {
    client.xp.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      xp: 0,
      level: 0
    });
    const key = `${message.guild.id}-${message.author.id}`;
    const xp = Math.floor(Math.random() * 10 + 1);
    client.xp.math(key, "+", xp, "xp");

    const curLevel = Math.floor(
      0.1 *
        Math.sqrt(
          client.xp.get(`${message.guild.id}-${message.author.id}`, "xp")
        )
    );
    if (client.xp.get(key, "level") < curLevel) {
      message.reply(
        `Félicitation <@${message.author.id}> , tu es maintenant au niveau ${curLevel}`
      );
      client.xp.set(key, curLevel, "level");
    }
  }

  const prefixes = client.settings.get(`${message.guild.id}`, "prefix");

  let lang = require("../langs/fr.json");
  let Language = require("../langs/fr.js");
  message.language = new Language();
  if (!message.guild) return;
  if (!message.content.startsWith(prefixes)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message.author);
  if (!message.guild.member(client.user).hasPermission("SEND_MESSAGES")) return;
  const args = message.content
    .slice(prefixes.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (command) {
    command.run(client, message, args, lang);
  }
//console.log(message.language.get("PREFIX_INFO",prefixes))
  if(message.content.includes(`<@${client.user.id}>`))
  return message.reply(message.language.get("PREFIX_INFO",prefixes));
};
module.exports.config = {
  name: "message",
  type: "event",
  enabled: true
};
