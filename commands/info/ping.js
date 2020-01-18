module.exports = {
    ownerOnly:false,
    name: "ping",
    aliases: ["p"],
    usage: "ping",
    category: "<:general:667626887014514698> Général",
    description: "Donne la latence du bot.",
    permission: [],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Calcul du ping en cours`);

        msg.edit(`🏓 Pong! ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
    }
}
