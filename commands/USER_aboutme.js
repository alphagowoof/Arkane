module.exports = {
  name: 'aboutme',
  aliases: ['myinfo'],
  description: 'Gets info about you',
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const noteLog = require('../logs/userNotes.json')
    const warnLog = require('../logs/userwarnings.json')
    const muteLog = require('../logs/userMutes.json')
    const kickLog = require(`../logs/userKicks.json`)
    const banLog = require('../logs/userBans.json')
    const user = message.author
    try {
      const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('User Information')
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(message.author.tag)
        .setDescription(`Server join date: ${message.member.joinedAt}`)
        .setTimestamp()
        message.channel.send(memberinfoembed)
        
        const embed = new Discord.MessageEmbed()
        list = []
        if(!warnLog[user] && !noteLog[user] && !muteLog[user] && !banLog[user] && !kickLog[user]){
          embed.setDescription('No User Log entries found.')
          return message.channel.send(embed)
          }
        if(noteLog[user]){
           noteLog[user].forEach(function (note, index) {
              embed.addField('Note: ' + (parseInt(index) + 1), note)
            list.push(`Note ${parseInt(index) + 1}: ${note}`)
          });
        }
        if(warnLog[user]){
          warnLog[user].forEach(function (warning, index) {
              embed.addField('Warning: ' + (parseInt(index) + 1), warning)
            list.push(`Warning ${parseInt(index) + 1}: ${warning}`)
          });
        }
        if(muteLog[user]){
          muteLog[user].forEach(function (Mute, index) {
              embed.addField('Mute: ' + (parseInt(index) + 1), Mute)
            list.push(`Mute ${parseInt(index) + 1}: ${Mute}`)
          });
        }
        if(kickLog[user]){
          kickLog[user].forEach(function (Kick, index) {
              embed.addField('Kick: ' + (parseInt(index) + 1), Kick)
            list.push(`Kick ${parseInt(index) + 1}: ${Kick}`)
          });
        }
        if(banLog[user]){
          banLog[user].forEach(function (Ban, index) {
              embed.addField('Ban: ' + (parseInt(index) + 1), Ban)
            list.push(`Ban ${parseInt(index) + 1}: ${Ban}`)
          });
        }
        message.author.send(embed)
        const embedPublic = new Discord.MessageEmbed()
        .setTitle('User Log')
        .setDescription(`User Log information was sent to your Direct Message!`)
        message.channel.send(embedPublic)

}catch(error) {
  respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
  errorlog(error)
  // Your code broke (Leave untouched in most cases)
  console.error('an error has occured', error);
}}}