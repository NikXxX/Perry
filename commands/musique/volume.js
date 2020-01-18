module.exports = {
  name: "volume",
  aliases: ["v"],
  permission: ["CONNECT"],
  category: "<:musique:667627814027264000> Musique",
  usage: "stop",
  description: "Modifie le volume la musique.",
  run: async (client, message, args) => {
    if (!client.player.isPlaying(message.guild.id))
      return message.reply("Je ne joue pas de musique !");
    let queue = await client.player.getQueue(message.guild.id);
    if (message.member.voice.channel.id !== queue.connection.channel.id) {
      return message.reply("Vous devez être dans le même salon que moi!");
    }
    if (!args[0]) return message.reply("Le volume doit être entre 0 et 100!");

    if (args[0] < 0)
      return message.reply("Le volume doit être entre 0 et 100!");

    if (args[0] > 100)
      return message.reply("Le volume doit être entre 0 et 100!");

    await client.player.setVolume(message.guild.id, parseInt(args[0]));
    message.reply(`Le volume est maintenant sur \`${parseInt(args[0])}\`!`);
  }
};
