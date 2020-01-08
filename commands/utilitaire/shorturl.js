module.exports = {
  name: "shorturl",
  category: ":tools: Utilitaires",
  usage: "shorturl <lien>",
  permission: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const Discord = require("discord.js");
    const fetch = require("node-fetch");
    let url = args[0];

    if (!url) {
      return message.reply("Veuillez saisir un lien");
    }
    if (url) url = args[0].replace("https://is.gd/", "");
    let res = await fetch(
      `https://is.gd/create.php?format=simple&url=${encodeURI(url)}`
    );
    if (args[0].startsWith("https://is.gd/")) {
      res = await fetch(
        `https://is.gd/forward.php?format=json&callback=myfunction&shorturl=${url}`
      );
    }
    let body = await res.text();
    console.log(body);
    if (body === "Error: Please enter a valid URL to shorten") {
      return message.reply("Ce lien est invalide.");
    }
    if (
      body ===
      "Error: Sorry, the URL you entered is on our internal blacklist. It may have been used abusively in the past, or it may link to another URL redirection service."
    ) {
      return message.reply("Cette URL est sur la liste noire du site `is.gd`.");
    }
    if (
      body ===
      `myfunction({ "errorcode": 1, "errormessage": "Sorry, the link you accessed doesn't exist on our service. Please keep in mind that our shortened links are case sensitive and may contain letters and numbers." });`
    ) {
      return message.reply("Ce lien est invalide!");
    }
    const e = body.replace('myfunction({ "url": "', "");
    const a = e.replace('" });', "");
    let embed = new Discord.MessageEmbed()
      .setColor(0x2BFAFA)
      .setDescription(body);
    if (args[0].startsWith("https://is.gd/")) {
      embed.setDescription(a);
    }
    message.channel
      .send(embed)
      .catch(err => message.reply("Une erreur est survenue : " + err));
  }
};
