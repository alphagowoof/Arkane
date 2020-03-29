module.exports = {
  name: 'avatar',
  aliases: ['getavatar'],
  description: 'Gets someones avatar.',
  usage: '',
  cooldown: 0,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try {
      const member = message.mentions.users.first()
      const icon = member.displayAvatarURL({ dynamic: true })
      const name = message.mentions.users.first().tag
      const AvatarEmbed = new Discord.MessageEmbed()
      .setTitle(name+'\'s Avatar')
      .setThumbnail(`${icon}`)
      message.channel.send(AvatarEmbed)
  }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}