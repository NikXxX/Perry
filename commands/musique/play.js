module.exports = {
  name: "play",
  aliases: ["p"],
  permission: ["CONNECT"],
  category: "<:musique:667627814027264000> Musique",
  usage: "play <nom de la musique",
  description: "Joue de la musique.",
  run: async (client, message, args) => {
    process.on("unhandledRejection", e => {
      console.error(e);
    });
    if (!message.member.voice.channel)
      return message.reply("Veuillez rejoindre un salon vocal!");
    if (!message.guild.member(client.user).hasPermission("CONNECT"))
      return message.reply("Je ne peux pas rejoindre ce salon!");
    if (!message.guild.member(client.user).hasPermission("SPEAK"))
      return message.reply("Je ne peux pas parler dans ce salon!");
    if(!args.join(" ")) return message.reply("Veuillez inclure le nom de la musique!")
    if (!client.player.isPlaying(message.guild.id)) {
      client.player
        .play(message.member.voice.channel, args.join(" "))
        .then(song => {
          message.channel.send({embed: {color: "2bfafa",thumbnail:{url: song.thumbnail},description:`Je joue actuelement [\`${song.name}\`](${song.url}).`}});
          song.queue

            .on("end", () => {
              message.channel.send("Il n'y a plus de musique dans la queue!");
            })
            .on("songChanged", (oldSong, newSong) => {
            
              message.channel.send({embed: {color: "2bfafa",thumbnail:{url: newSong.thumbnail},description:`Je joue actuelement [\`${newSong.name}\`](${newSong.url}).`}});
         
            });
        })
        .catch(e => {
          console.log(e);
          message.reply("Je ne trouve pas la musique " + args.join(" ") + ".");
        });
    } else {
      client.player
        .addToQueue(message.guild.id, args.join(" "))
        .then(song => {
          message.channel.send({embed: {color: "2bfafa",thumbnail:{url: song.thumbnail},description:`[\`${song.name}\`](${song.url}) a été ajouté à la queue!`}});
         
        })
        .catch(err =>
          message.reply("Je ne trouve pas la musique `" + args.join(" ") + "`.")
        );
    }
  }
};
