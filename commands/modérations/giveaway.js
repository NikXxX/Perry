module.exports = {
  name: "giveaway",
  permission: ["MANAGE_SERVER"],
  category: ":rotating_light: Modérations",
  usage: "giveaway <start/delete>",
  run: async (client, message, args) => {
    const ms = require("ms");
    const giveaways = require("discord-giveaways");
    let option = args[0];
    if (!args[0])
      return message.reply(
        'Veuillez choisir une option entre celles qui suivent : "start" , "delete".'
      );
    if (args[0] && !["start","delete"].includes(args[0]))
      return message.reply("Cette option n'est pas valide.");
    if (option === "start") {
      if (!args[1])
        return message.reply("Veuillez définir le temps du giveaway.");
     if(ms(args[1]) < ms("10s")) return message.reply("Le giveaway doit durer plus de 10 secondes!")     
      if (ms(args[1]) > ms("15d"))
        return message.reply(
          "Le temps du giveaway doit être inférieur à 15 jours."
        );
      if (!args[2] || args[2] > 10 || args[2] < 1)
        return message.reply(
          "Veuillez définir le nombre de gagnant(s).Compris entre 1 et 10."
        );
      if (isNaN(args[2]))
        return message.reply("Veuillez écrire le nombre en chiffre.");
    if (!args.slice(3).join(" "))
        return message.reply("Veuillez définir la récompense du giveaway.");
      
      giveaways
        .start(message.channel, {
          time: ms(args[1]),
          prize: "🎁 " + args.slice(3).join(" ") + " 🎁",
          winnersCount: parseInt(args[2]),
          messages: {
            giveaway: "_ _",
            giveawayEnded: "_ _",
            timeRemaining: "Temps restant : **{duration}**!",
            inviteToParticipate: "Cliquez sur la réaction 🎉 pour participer!",
            winMessage: "Félicitation, {winners}! Tu gagnes **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway annulé.Aucun utilisateur a participer au giveaway!",
            winners: "gagnant(s)",
            endedAt: "Terminé",
            units: {
              seconds: "secondes",
              minutes: "minutes",
              hours: "heures",
              days: "jours"
            }
          }
        })
        .catch(err =>
          message.reply(
            "Veuillez saisir un temps valide!\n(s = secondes , m = minutes, h = heures , d = jours)"
          )
        );
    } else if (option === "reroll") {
      const messageID = args[1];
      if (!messageID) return message.reply("Veuillez saisir l'id du giveaway.");
      if (isNaN(messageID))
        return message.reply("Un id discord est composé que de chiffre.");
      giveaways
        .reroll(messageID, {
          congrat: ":tada: Nouveau gagnant(s) : {winners}! Félicitation!",
          error: "Je ne peux pas choisir de nouveau(x) gagnant(s)!"
        })
        .catch(err => {
          message.channel.send(
            "Je ne trouve pas de giveaway " +
              messageID +
              ", veuillez réessayer."
          );
        });
    } else if (option === "delete") {
      const messageID = args[1];
      if (!messageID) return message.reply("Veuillez saisir l'id du giveaway.");
      if (isNaN(messageID))
        return message.reply("Un id discord est composé que de chiffre.");
      giveaways.delete(messageID).then(() => {
            message.channel.send("Réussi! Giveaway supprimé!");
        }).catch((err) => {
            message.channel.send("Je ne trouve pas de giveway "+messageID+", veuillez réessayer!");
        });
    }
  }
};
