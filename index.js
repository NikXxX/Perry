const { Client, Collection, version } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  //console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://perry-website.glitch.me/`);
}, 280000);
const client = new Client({
  disableEveryone: true,
  fetchMemberAll: true
});
client.config = require("./config.json");
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

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
    

client.login("NjU4NTc5NTAzMTM1NTg4Mzky.XgB0AA.krJhk8DfXi8LkujwsYRltw1xnpE");
