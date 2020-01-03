module.exports = {
  name: "ascii",
  usage: "p!ascii <texte>",
  permission: ["SEND_MESSAGES"],
  description: "Met votre texte en ascii.",
  category: ":tools: Utilitaires",
  run: async (client, message, args) => {
    const ascii = require("ascii-art");

    let text = args.join(" ");
    var args = message.content
    .split(" ")
    .slice(1)
    .toString()
    .split("");
  if (!args) return message.reply("Veuillez saisir un texte!");
  var test = "";
  var test2 =
    "abcdefghijklmnopqrstuvwxyz1234567890";

  //if(!["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","x","z"," ","1","2","3","4","5","6","7","8","9","0"].includes(args.join(" "))) return message.reply("Votre message doit contenir des caractères normaux!")
  
  for (var i = 0; i < args.length; i++) {
    if (test2.includes(args[i].toLowerCase())) {
      test = test + args[i];
    }
  }
    
    if (!text) {
      return message.channel.send(
        "Veuillez saisir un texte inférieur à 14 caractères."
      );
    }
    if (test.length > 14) {
    return message.reply("Votre texte est trop grand!");
  }
    ascii.font(test, "Doom", function(err, ascii) {
      if (err) {
        return message.reply(
          "Votre texte doit contenir que des caractères UTF-8."
        ); //lettres ou/et des chiffres."));
      }
      message.channel.send("```" + ascii + "```");
    });

  }
};
