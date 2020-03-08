module.exports = {
  name: 'memberinfo',
  aliases: [''],
	description: 'Gets info about mentioned user',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const taggeduser = message.mentions.users.first().id
    fs.readFile('./logs/'+taggeduser+'-warnings.log', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const memberinfoembed = new Discord.MessageEmbed()
      .setColor('#0000ff')
      .setTitle('Member Information')
      .addFields(
        { name: 'Warning Log', value: data, inline: true },
      )
      .setTimestamp()
      .setFooter('Bot written by Daniel C');
      message.channel.send(memberinfoembed)
    })
  }}