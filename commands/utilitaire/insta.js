const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
  ownerOnly: false,
  name: "instagram",
  aliases: ["insta"],
  category: ":tools: Utilitaires",
  description: "Affiche le profil instagram d'une personne.",
  usage: "instagram <nom>",
  permission: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const name = args.join(" ");

    if (!name) {
      return message.reply("veuillez préciser le nom du compte instagram.");
    }
    if (
      args
        .join(" ")
        .split("")
        .join(" ").length <= 2
    ) {
      return message.reply("Mettez un nom plus grand.");
    }
    const url = `https://instagram.com/${name}/?__a=1`;

    let res;

    try {
      res = await fetch(url).then(url => url.json());
    } catch (e) {
      return message.reply("je n'ai pas trouvé ce compte.");
    }

    const account = res.graphql.user;
    const embed = new MessageEmbed()
      .setColor("2BFAFA")
      .setTitle(account.full_name)
      .setURL(`https://instagram.com/${name}`)
      .setThumbnail(account.profile_pic_url_hd)
      .addField(
        "Informations",
        stripIndents`- \`Pseudo\` : ${account.username}
            - \`Nom\` : ${
              account.full_name.length == 0 ? "Non fournis" : account.full_name
            }
            - \`Bio\` : ${
              account.biography.length == 0 ? "Non fournis" : account.biography
            }
            - \`Publications\` : ${account.edge_owner_to_timeline_media.count}
            - \`Abonnés\` : ${account.edge_followed_by.count}
            - \`Abonnement\` :  ${account.edge_follow.count}
            - \`Compte privé\` : ${account.is_private ? "Oui 🔐" : "Non 🔓"}`
      );

    message.channel.send(embed);
  }
};
