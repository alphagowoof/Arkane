module.exports = {
  name: 'aboutme',
  aliases: ['myinfo'],
  description: 'Gets info about you',
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const userlog = require('../logs/userwarnings.json')
    try {
      const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('User Information')
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(message.author.username)
        .setDescription(`Server join date: ${message.member.joinedAt}`)
        .setTimestamp()
        message.channel.send(memberinfoembed)

        if(!userlog[message.author.id]){
          respond(``, `No userlog data found.`, message.channel)
          return;
        }

        const embed = new Discord.MessageEmbed()
        .setTitle('User Log')
        .setDescription(`Warning count: ${userlog[message.author.id].length}`)
        userlog[message.author.id].forEach(function (warning, index) {
          embed.addField('Warning: ' + (parseInt(index) + 1), warning)
        });
        message.channel.send(embed)
}catch(error) {
  respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
  errorlog(error)
  // Your code broke (Leave untouched in most cases)
  console.error('an error has occured', error);
  }
  }}