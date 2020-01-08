module.exports = {
    ownerOnly:false,
    name: "ping",
    aliases: ["p"],
    usage: "ping",
    category: "ℹ️ Informations",
    description: "Donne la latence du bot.",
    permission: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Calcul du ping en cours`);

        msg.edit(`🏓 Pong! ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
    }
}
