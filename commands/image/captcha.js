const { get } = require("axios");
const endpoint = "captcha";
const { getMember } = require("../../functions.js");

module.exports = {
  name: endpoint,
  description: `Génère une image ${endpoint} sur une image.`,
  permission: ["SEND_MESSAGES"],
  category: ":camping: Images",
  usage: `p!${endpoint} < username | mention | id >`,
  run: (client, message, args) => {
    const member = getMember(message, args.join(" "));
    if(!member) return message.reply(`**Utilisation**: p!${endpoint} < username | mention | id >`)
    let url = member.user.displayAvatarURL({ format: "jpg" , size: 2048});
    let username = member.user.username
    get(`https://eclyssia-api.tk/api/v1/${endpoint}?url=${url}&username=${username}`,{responseType:"arraybuffer"}).then((data) => {
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
