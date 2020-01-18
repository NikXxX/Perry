module.exports = async (client, member) => {
  const salon = client.settings.get(member.guild.id, "welcome_channel"),
    msg = client.settings.get(member.guild.id, "welcome_message"),
    option = client.settings.get(member.guild.id, "welcome_option");
  let autorole = client.settings.get(member.guild.id, "autorole")
  if (!member.guild.channels.get(salon)) return;
  if (!msg) return;
  if(!salon) return;
  //member.roles.add(autorole)
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
  if(!autorole) return;
  autorole = member.guild.roles.find(r => r.id === autorole)
  member.roles.add(autorole)
};
module.exports.config = {
  name: "guildMemberAdd",
  type: "event",
  enabled: true
};
