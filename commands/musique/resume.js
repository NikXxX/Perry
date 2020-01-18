
module.exports = {
  name: "resume",
  aliases: [],
  permission: ["CONNECT"],
  category: "<:musique:667627814027264000> Musique",
  usage: "resume",
  description: "Reprends la musique.",
  run: async (client, message, args) => {
    if (!client.player.isPlaying(message.guild.id))
      return message.reply("Je ne joue pas de musique !");
    let queue = await client.player.getQueue(message.guild.id);
    if (message.member.voice.channel.id !== queue.connection.channel.id) {
      return message.reply("Vous devez être dans le même salon que moi!");
    }
    client.player.resume(message.guild.id);
    message.reply(`La musique a été repris!`);
  }
};