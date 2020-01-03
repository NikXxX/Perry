module.exports = {
  ownerOnly: false,
  name: "clear",
  aliases: ["purge", "nuke"],
  category: ":rotating_light: Modérations",
  description: "Effacer des messages.",
  permission: ["MANAGE_MESSAGES"],
  usage: "p!clear < de 1 à 100>",
  run: async (client, message, args) => {
    if (message.deletable) {
      message.delete();
    }
    if(!args[0]) return message.reply("Veuillez saisir le nombre de message à supprimer.")
    if (Number.isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.reply(
        "Vous devez préciser un **nombre** de messages à supprimer."
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message
        .reply(
          "Je n'ai pas la permission `MANAGE_MESSAGES`. Attribuez-la moi et recommencez l'opération."
        )
        .then(m => m.delete(5000));
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]);
    }

    message.channel
      .bulkDelete(deleteAmount, true)
      .then(deleted =>
        message.channel.send(
          `\`${deleted.size}\` messages ont bien été supprimés.`
        ).then(msg => msg.delete(100000))
      )
      .catch(err => message.reply(`Une erreur est survenue : veuillez vérifier que il y a bien des messages dans ce salon datant de moin de 14 jours.`));
  }
};
