module.exports = {
  name: "skip",
  aliases: [],
  permission: ["CONNECT"],
  category: "<:musique:667627814027264000> Musique",
  usage: "skip",
  description: "Skip la musique.",
  run: async (client, message, args) => {
    if (!client.player.isPlaying(message.guild.id))
      return message.reply("Je ne joue pas de musique !");
    let queue = await client.player.getQueue(message.guild.id);
    if (message.member.voice.channel.id !== queue.connection.channel.id) {
      return message.reply("Vous devez être dans le même salon que moi!");
    }
    client.player.skip(message.guild.id).then(() => {
    message.reply(`La musique a été skip!`)
    })
    .catch(err => message.reply("Je ne suis pas dans un salon vocale!"))
  }
};
