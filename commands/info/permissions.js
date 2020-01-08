module.exports = {
  name: "permissions",
  aliases: ["perm", "perms", "permission"],
  category: "ℹ️ Informations",
  permission: ["SEND_MESSAGES"],
  run: (client, message, args) => {
    const { getMember } = require("../../functions.js")
    const membre = getMember(message,args.join(" "))
    const object = message.channel.permissionsFor(membre).serialize();
    const array = Object.entries(object);
    const permission = array
      .map(e => e[0] + " :" + (e[1] ? " ☑️ " : " ❌ "))
      .join("\n");

    message.channel.send({
      embed: {
        color: 0x2bfafa,
        description: permission,
        title: "•__Voici les permissions de " + membre.user.username + "__•"
      }
    });
  }
};
