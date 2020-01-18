module.exports  = (client) => {
  console.log(`Hi, ${client.user.username} is now online !`);
  const abcAPI = require("abcapi");
  abcAPI.login(
    "ff40a1def470c095420467d167d4fd77649c17d911e12d1f20cda0dde37863867dc02e3e25d6896b4963c032709767ffeb17c60c8fe0c859864b985b06bb424d",
    client.user.id
  );
  abcAPI.post(client.guilds.size, client.users.size);
  client.user.setActivity("AGENT B", { type: "PLAYING" });
};
module.exports.config = {
  name: "ready",
  type: "event",
  enabled: true
};
