module.exports = async (client, member) => {
  const a = __dirname + "./assets"
  const Canvas = require("canvas"),
    snekfetch = require("snekfetch"),
    Discord = require("discord.js");
  const channel = member.guild.channels.find(
    ch => ch.name === "【📈】arrivants"
  );
  const canvas = Canvas.createCanvas(1024, 450);
  const ctx = canvas.getContext("2d");
  const background = await Canvas.loadImage(
    "https://media.discordapp.net/attachments/660851081991159829/662602595109437461/image0.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const { body: buffer } = await snekfetch.get(
    member.user.displayAvatarURL({ format: "png" })
  );
  ctx.beginPath();
  //Define Stroke Line
  ctx.lineWidth = 20;
  //Define Stroke Style
  ctx.strokeStyle = "#FFFF";
  // Start the arc to form a circle
  ctx.arc(500, 150, 100 ,0, Math.PI * 2, true);
  // Draw Stroke
  ctx.stroke();
  // Put the pen down
  ctx.closePath();
  // Clip off the region you drew on
  ctx.clip();
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 400, 50, 200, 200);
  const image = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  channel.send(image);
};
module.exports.config = {
  name: "guildMemberAdd",
  type: "event",
  enabled: true
};
