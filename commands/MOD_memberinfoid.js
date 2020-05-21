module.exports = {
  name: 'idmemberinfo',
  aliases: ['memberinfoid'],
  description: 'Gets info about ID number mentioned',
  usage: '<id>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Member Information')
        .setDescription('This feature is no longer available.')
        .setTimestamp()
        message.channel.send(memberinfoembed)
  }
}
