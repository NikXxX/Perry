module.exports = {
  name: "queue",
  aliases: [],
  permission: ["CONNECT"],
  category: "<:musique:667627814027264000> Musique",
  usage: "queue",
  description: "Affiche la queue.",
  run: async (client, message, args) => {
    if (!client.player.isPlaying(message.guild.id))
      return message.reply("Je ne joue pas de musique !");
    let queue = await client.player.getQueue(message.guild.id);
    if (message.member.voice.channel.id !== queue.connection.channel.id) {
      return message.reply("Vous devez être dans le même salon que moi!");
    }
    let queu = await client.player.getQueue(message.guild.id);
    queu = queu.songs
      .map((song, i) => {
        //console.log(song)
        return `${i === 0 ? "Actuel" : `#${i + 1}`} - \`${song.name} | ${
          song.author
        }\``;
      })
      .join("\n");
    message.channel.send({
      embed: {
        color: "2bfafa",
        description: queu
      }
    });
  }
};
