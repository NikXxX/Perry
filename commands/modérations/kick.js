const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "kick",
  permission: ["KICK_MEMBERS"],
  category: ":rotating_light: Modérations",
  description: "Expulser un membre",
  usage: "p!kick <mention> <raison>",
  run: async (client, message, args, lang) => {
    if (message.deletable) message.delete();

    const toBan = message.mentions.members.first();

    if (!toBan) {
      return message.reply(lang.kick.nomention);
    }

    if (!args[1]) {
      return message.reply(lang.kick.noreason);
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.reply(lang.kick.nopermbot);
    }
    if (toBan.id === message.author.id) {
      return message.reply(lang.kick.autokickuser);
    }
    if (toBan.id === client.user.id) {
      return message.reply(lang.kick.autokickbot);
    }

    if (!toBan.bannable) {
      return message.reply(lang.kick.errban);
    }
    toBan.kick(args[1]);
    message.reply(toBan + ` ${lang.kick.succesban}`);
  }
};
