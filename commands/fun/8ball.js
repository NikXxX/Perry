module.exports = {
  name: "8ball",
  description: "Répond aléatoirement à votre question.",
  category: ":tada: Fun",
  permission: ["SEND_MESSAGES"],
  usage: "8ball <question>",
  run: async (client, message, args) => {
   let i = args.join(" ")
    if (!args.slice(1).join(" "))
    return message.reply("votre question doit être composée d'au moins 2 mots.");
    
    if(!message.content.includes('?')) return message.reply('Vous devez poser une **question**.')
  const réponse = ["Bien sûr.","Je ne sais pas.","Oui.","Non.","Impossible !"];
  const a = réponse[Math.floor(Math.random() * réponse.lenght)];
  message.reply(
    `:8ball: | ${réponse[Math.floor(Math.random() * réponse.length)]}`
  );
  }
};
