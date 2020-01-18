module.exports = (client, guild) => {
  const channel = client.channels.get("665215976073068544");
   channel.send({
    embed: {
      color: "ff0000",
      title: "Perry vient de quitté un serveur ;(",
      description: `Ce serveur ce nomme ${guild.name} , il possède ${guild.memberCount} membres.\nLe créateur est ${guild.owner}.`,
      thumbnail: {
        url: guild.iconURL({ format: "png" })
      }
    }
  });
};
