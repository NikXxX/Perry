module.exports = {
  name: "test",
  permission: ["ADMINISTRATOR"],
  category: "<:admin:653177096465809413> Owner",

  run: async (client, message) => {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
};
