module.exports = {
  name: "ascii",
  usage: "ascii <texte>",
  permission: ["SEND_MESSAGES"],
  description: "Met votre texte en ascii.",
  category: ":tools: Utilitaires",
  run: async (client, message, args) => {
    const ascii = require("ascii-art");

    let text = args
      .join(" ")
      .split("")
      .filter(r =>
        "abcdefghijklmnopqrstuvwxyz1234567890-/:;()&@\".,?!'[]#%^*+=_\\<>$".includes(
          r.toLowerCase()
        )
      )
      .join("");

    if (!text) {
      return message.reply("Veuillez saisir un texte.");
    }

    if (text.length > 14) {
      return message.reply("Votre texte est trop grand!");
    }
    ascii.font(text, "Doom", function(err, ascii) {
      if (err) {
        return message.reply(
          "Votre texte doit contenir que des caractères des l'alphabet ou/et des chiffres."
        ); //lettres ou/et des chiffres."));
      }
      message.channel.send("```" + ascii + "```");
    });
  }
};
