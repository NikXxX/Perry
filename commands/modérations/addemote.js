module.exports = {
  ownerOnly: false,
  name: "addemote",
  aliases: ["ae"],
  category: ":rotating_light: Modérations",
  description: "Ajoute un emojis.",
  usage: "p!addemote <url> <nom>",
  permission: ["MANAGE_EMOJIS"],
  run: async (client, message, args, lang) => {
    if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS"))
      return message.reply(lang.addemote.nopermbot);
    let url = args[0];
    if (!url) {
      return message.reply("Veuillez préciser l'URL de l'emoji que vous souhaitez ajouter.");
    }

    let name = args[1];
    if (!name) {
      return message.reply("Veuillez préciser le nom de l'emoji que vous souhaitez ajouter."); //message.language.get("ADDEMOTE_ERR_NAME"));
    }
  if(name.length > 32) return message.reply("Le nom de l'émojis doit être inférieur à 32 caractères.")
    message.guild.emojis
      .create(url, name)
      .then(emote => {
        message.channel.send(
          `>>> ${lang.addemote.addemote}\n - \`${lang.addemote.name}\` : ${name}\n - \`${lang.addemote.emote}\` : <:${emote.name}:${emote.id}>`
        );
      })
      .catch(err => {
        console.log(err)
        message.reply("Une erreur est survenue.")//veuillez vérifier que l'url est bien une image.")
      });
  }
};
