module.exports = {
  name: "fnstats",
  aliases: ["ft", "fortnite"],
  description: "Affiche les stats fortnite d'un joueur.",
  permission: ["SEND_MESSAGES"],
  category: ":video_game: Jeux",
  usage: "p!fnstats <platform> <pseudo>",
  run: async (client, message, args) => {
    const Discord = require("discord.js");
    const Client = require("fortnite");
    const fortnite = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");

    let username = args.slice(1).join(" ");
    let platform = args[0];
    if (platform == "PC") platform = args[0].replace("PC", "pc");
    if (platform == "PSN") platform = args[0].replace("PSN", "psn");
    if (platform == "XBL") platform = args[0].replace("XBL", "xbl");
    let e = ["psn", "pc", "xbl", "PC", "PSN", "XBL"];

    if (!args[0])
      return message.channel.send(
        "Avez-vous saisit la plateform ? Utilisation: `p!fortnite <platform> <pseudo>`"
      );

    if (
      platform &&
      !["psn", "PSN", "pc", "PC", "xbl", "XBL"].includes(platform)
    )
      return message.reply(":x: | Veuillez saisir une plateform correcte!");
    if (!args.slice(1).join(" "))
      return message.channel.send(
        ":x: | Veuillez préciser le nom d'un joueur de Fortnite"
      );
    fortnite
      .user(username, platform)
      .then(data => {
        let stats = data.stats;
        let lifetime = stats.lifetime;
        let solo = stats.solo;
        let duo = stats.duo;
        let squad = stats.squad;

        let t = (100 * solo.wins || 0) / solo.matches || 0;
        let swinrate = Math.round(t * 10) / 10;
        let u = (100 * duo.wins || 0) / duo.matches || 0;
        let dwinrate = Math.round(u * 10) / 10;
        let r = (100 * squad.wins || 0) / squad.matches || 0;
        let sqwinrate = Math.round(t * 10) / 10;
        let embed = new Discord.MessageEmbed()
          .addField(
            "👤 Solo ❯",
            `\n **${solo.wins || 0}** Victoire(s)\n**${swinrate ||
              0} %** Victoire(s)\n**${solo.kills ||
              0}** Kill(s)\n**${solo.matches || 0}** Partie(s)\n**${solo.kd ||
              0}** K/D`,
            true
          )
          .addField(
            "👥 Duo ❯",
            `\n **${duo.wins || 0}** Victoire(s)\n**${dwinrate ||
              0} %** Victoire(s)\n**${duo.kills ||
              0}** Kill(s)\n**${duo.matches || 0}** Partie(s)\n**${duo.kd ||
              0}** K/D`,
            true
          )
          .addField(
            "👨‍👨‍👧‍👦 Squad ❯",
            `\n **${squad.wins || 0}** Victoire(s)\n**${sqwinrate ||
              0} %** Victoire(s)\n**${squad.kills ||
              0}** Kill(s)\n**${squad.matches || 0}** Partie(s)\n**${squad.kd ||
              0}** K/D`,
            true
          )
          .setTitle("Statistique Fortnite de " + data.username)
          .setColor(0x2BFAFA)
          .setThumbnail(
            "https://cdn.glitch.com/dbf12b4c-377e-44c3-97b7-8c3c83dcd80e%2F8e1abc97-2117-4406-946c-517b52daf2b0.image.jpeg?v=1575899784269"
          )
          .setTimestamp()
          .setFooter(
            client.user.username,
            client.user.avatarURL({ format: "png" })
          );

        message.channel.send(embed);
      })
      .catch(err => {
        message.reply(":x: | Ce joueur est introuvable.");
        console.error(err);
      });
  }
};
