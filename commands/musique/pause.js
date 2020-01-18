module.exports = {
  name: "pause",
  aliases: [],
  permission: ["CONNECT"],
  category: "<:musique:667627814027264000> Musique",
  usage: "pause ",
  description: "Met en pause de la musique.",
  run: async (client, message, args) => {
    if (!client.player.isPlaying(message.guild.id))
      return message.reply("Je ne joue pas de musique !");
    let queue = await client.player.getQueue(message.guild.id);
    if (message.member.voice.channel.id !== queue.connection.channel.id) {
      return message.reply("Vous devez être dans le même salon que moi!");
    }
    let song = await client.player.pause(message.guild.id);
    message.reply(`La musique \`${song.name}\` a été mis sur pause!`);
  }
};
