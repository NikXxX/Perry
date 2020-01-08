const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");
const moment = require("moment");
moment.locale("fr");
module.exports = {
  ownerOnly: false,
  name: "userinfos",
  aliases: ["ui"],
  category: "ℹ️ Informations",
  description: "Donne des informations sur un utilisateurs.",
  permission: ["SEND_MESSAGES"],
  usage: "userinfos <pseudo | id | mention | discriminateur>",
  run: (client, message, args) => {
    const member = getMember(message, args.join(" "));

    const joined = formatDate(member.joinedAt);
    let roles =
      member.roles
        .filter(r => r.id !== message.guild.id)
        .map(r => r)
        .join(", ") || "Aucun";

    const created = formatDate(member.user.createdAt);
    let user = member;
    const embed = new MessageEmbed()
      .setFooter(member.displayName, member.user.displayAvatarURL({format: "png"}))
      .setThumbnail(member.user.displayAvatarURL({format: "png"}))
      .setColor(0x2BFAFA)

      .setTimestamp()

      .addField(":bust_in_silhouette: Pseudo", `${user.user.username}`, true)
      .addField(":id: ID", user.id, true)
      .addField(":hash: Discriminateur", `#${user.user.discriminator}`, true)
      .addField(":robot: Bot ", member.user.bot ? "- ☑" : "- :x:", true)
      .addField(
        ":busts_in_silhouette: Surnom",
        message.guild.member(user).nickname
          ? message.guild.member(user).nickname
          : "Aucun",
        true
      )

      .addField(
        ":calendar: A rejoint Discord le",
        `${moment(member.user.createdAt).format("DD/MM/YYYY")}`,
        true
      )

      .addField("🔐 Rôles:")
      .setThumbnail(member.user.displayAvatarURL({ format: "png" }));
    embed.fields[6].value = message.guild
      .member(user)
      .roles.map(s => s)
      .join(" | ");

    message.channel.send(embed).catch(err => {
      if (err.name == "DiscordAPIError" || err.name == "RangeError") {
        embed.fields[6].value = "Il a trop de rôles 😦";
        message.channel.send(embed);
      } else console.error(err);
    });
  }
};
