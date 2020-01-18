module.exports = {
  name: "test",
  permission: ["ADMINISTRATOR"],
  category: "<:owner:667627445830156298> Owner",

  run: async (client, message) => {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
}
