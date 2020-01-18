const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "ban",
  permission: ["BAN_MEMBERS"],
  category: "<:badge:667634037988261888> Modérations",
  description: "Bannir un membre",
  usage: "ban <mention> <raison>",
  run: async (client, message, args, lang) => {
    if (message.deletable) message.delete();
      if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply(lang.ban.nopermuser);
   
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.reply(lang.ban.nopermbot);
    }

    const toBan = message.mentions.members.first();

    if (!toBan) {
      return message.reply(lang.ban.nomention);
    }

    if (!args[1]) {
      return message.reply(lang.ban.noreason);
    }
    if (toBan.id === message.author.id) {
      return message.reply(lang.ban.autobanuser);
    }
    if (toBan.id === client.user.id) {
      return message.reply(lang.ban.autobanbot);
    }
    if (!toBan.bannable) {
      return message.reply(lang.ban.errban);
    }

    toBan.ban(args[1]);
    message.reply(toBan + ` ${lang.ban.succesban}`);
  }
};
