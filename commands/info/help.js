const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  ownerOnly: false,
  name: "help",
  aliases: ["h", "aide"],
  category: "<:general:667626887014514698> Général",
  description: "Affiche ce menu d'aide.",
  usage: "help [commande | alias]",
  permission: [],
  run: async (client, message, args) => {
  
 const prefix = client.settings.get(message.guild.id,"prefix")
    //const prefix = db.get("prefixe").find({id: message.guild.id}).value().prefix
    if (args[0]) {
      return getCMD(client, message, args[0]);
    } else {
      return getAll(client, message);
    }

    function getAll(client, message) {
      const embed = new MessageEmbed().setColor("048b9a");

      const commands = category => {
        return client.commands
          .filter(cmd => cmd.category === category)
          .map(cmd => `\`${cmd.name}\``)
          .join(" , ");
      };
      const categories = ["<:coins:667642903254007828> Économie","<:fun:667627121107271681> Fun","<:general:667626887014514698> Général","<:picture:667629000708980785> Images","<:badge:667634037988261888> Modérations","<:musique:667627814027264000> Musique"];

      
      embed
        .setColor(0x2BFAFA)
        .setTitle("•__Menu d'aide__•")
        .setAuthor(
          `${client.user.username}`,
          `${client.user.displayAvatarURL({ format: "png" })}`
        )
        .setFooter(`${client.settings.get(message.guild.id,"prefix")}help <commande> pour afficher l'aide de la commandes.`);
      categories.sort().map(async c => {
        embed.addField(
          c + " - (" + client.commands.map(r => r.category).filter(q => q === c).length+")",
          client.commands
            
            .filter(command => command.category === c)
            .map(command => `\`${command.name}\` `)
            .join(" , "),
          false
        )
      
      });
      embed.addField(":link: Liens","[Support |](https://discord.gg/hWe3hrj)[ Invite moi |](https://discordapp.com/api/oauth2/authorize?client_id=658579503135588392&permissions=1342564470&scope=bot)[ Paypal |](https://paypal.me/thebset)[ Site](https://perry-website.glitch.me)")
      message.channel.send(embed);
    }
    function getCMD(client, message, input) {
      const embed = new MessageEmbed();

      const cmd =
        client.commands.get(input.toLowerCase()) ||
        client.commands.get(client.aliases.get(input.toLowerCase()));

      let info = `Pas d'informations à propos de **${input.toLowerCase()}**`;

      if (!cmd) {
        return message.channel.send(
          embed.setColor(0x2BFAFA).setDescription(info)
        );
      }

      if (cmd.name) info = ` - \`Nom\`: ${cmd.name}`;
      if (cmd.aliases)
        info += `\n- \`Aliases\` : ${cmd.aliases.map(a => `${a}`).join(" , ")}`;
      if (cmd.description) info += `\n- \`Description\` : ${cmd.description}`;
      if (cmd.usage) info += `\n- \`Utilisation\`: ${prefix + cmd.usage}`;
      if (cmd.category) info += `\n- \`Catégorie\` : ${cmd.category}`;
      embed.setFooter(`Syntaxes: <> = obligatoire, [] = optionel`);

      return message.channel.send(
        embed
          .setColor("2BFAFA")
          .setDescription(info)
          .setTitle("Informations sur " + cmd.name)
      );
    }
  }
};
