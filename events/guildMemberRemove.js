module.exports = async (client, member) => {
  const salon = client.settings.get(member.guild.id, "leave_channel"),
    msg = client.settings.get(member.guild.id, "leave_message"),
    option = client.settings.get(member.guild.id, "leave_option");
  if (!member.guild.channels.get(salon)) return;
  if (!msg) return;
  if (option === "message") {
    member.guild.channels.get(salon).send(
      msg
        .replace("{user}", member)
        .replace("{members}", member.guild.memberCount)
        .replace("{serv}", member.guild.name)
        .replace("{humain}", member.guild.members.filter(m => !m.user.bot).size)
        .replace("{bot}", member.guild.members.filter(b => b.user.bot).size)
    );
  } else {
    member.guild.channels.get(salon).send({
      embed: {
        color: 0x2bfafa,
        description: msg
          .replace("{user}", member)
          .replace("{members}", member.guild.memberCount)
          .replace("{serv}", member.guild.name)
          .replace(
            "{humain}",
            member.guild.members.filter(m => !m.user.bot).size
          )
          .replace("{bot}", member.guild.members.filter(b => b.user.bot).size)
      }
    });
  }
};
module.exports.config = {
  name: "guildMemberRemove",
  type: "event",
  enabled: true
};
