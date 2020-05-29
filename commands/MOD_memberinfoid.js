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
    const userlog = require('../logs/userwarnings.json')
    try {
      if(!args[0]){
        return respond('', 'Please provide a member ID.', message.channel)
      }
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('User Information')
        .setAuthor(args[0])
        .setDescription(`Member ID: ${args[0]}\n\nAccount creation date: _This information is currently unavailable._\n\nServer join date: _This information is currently unavailable._`)
        .setTimestamp()
        message.channel.send(memberinfoembed)

        if(!userlog[args[0]]){
          respond(``, `No entries found for this user in the user log.`, message.channel)
          return;
        }

        const embed = new Discord.MessageEmbed()
        .setTitle('User Log')
        userlog[args[0]].forEach(function (warning, index) {
          embed.addField('Warning: ' + (parseInt(index) + 1), warning)
        });
        message.channel.send(embed)
  }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }

  }
}