const { Client, Collection, version } = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");
const http = require("http");
const express = require("express");
const app = express();
const { GiveawaysManager } = require("discord-giveaways");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://perry-web.glitch.me/`);
}, 280000);
const client = new Client({
  disableEveryone: true,
  fetchMemberAll: true
});
//client.config = require("./config.json");
client.commands = new Collection();
client.aliases = new Collection();
client.settings = new Enmap({ name: "settings" });
client.xp = new Enmap({
  name: "xp",
  cloneLevel: "deep",
  fetchAll: true,
  autoFetch: true
});
client.money = new Enmap({
  name: "money",
  cloneLevel: "deep",
  fetchAll: true,
  autoFetch: true
});
//client.token = "Ftg pd"
client.backup = new Enmap({ name: "backup" });
client.categories = fs.readdirSync("./commands/");
//client.money.option = client.money.get(,"money")
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    const evtName = file.split(".")[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#2bfafa",
    exemptPermissions: [],
    reaction: "🎉",
    embedColorEnd: "#2bfafa"
  }
});

const { Player } = require("discord-player");
const player = new Player(client, "AIzaSyCSeZlhNMUi7X1EqAM6dTHHG6Rh-daWaL8", {
  leaveOnStop: true,
  leaveOnEnd: true,
  leaveOnEmpty: true
});
const { ddblAPI } = require("ddblapi.js");
const ddbl = new ddblAPI(
  "658579503135588392",
  ""
);

ddbl.postStats(`${client.guilds.size}`).then(console.log);
client.player = player;
client.login("");
