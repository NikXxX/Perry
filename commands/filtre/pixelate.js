const { get } = require("axios");
const endpoint = "pixelate";
const { getMember } = require("../../functions.js");

module.exports = {
  name: endpoint,
  description: `Met le filtre ${endpoint} sur une image.`,
  permission: ["SEND_MESSAGES"],
  category: "🎞️ Filtres",
  usage: `${endpoint} < username | mention | id >`,
  run: (client, message, args) => {
    const member = getMember(message, args.join(" "));
    if(!member) return message.reply(`**Utilisation**: p!${endpoint} < username | mention | id >`)
    let url = member.user.displayAvatarURL({ format: "png" , size: 2048});
    
    get(`https://eclyssia-api.tk/api/v1/${endpoint}?url=${url}`,{responseType:"arraybuffer"}).then((data) => {
     // console.log(data)
      message.channel.send({
        files: [
          {
            attachment: data.data,
            name: endpoint + ".png"
          }
        ]
      });
    });
  }
};
