module.exports = {
  name: 'warn',
  aliases: ['punish'],
  description: 'Logs a warning.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    try {
      if (message.author.id == message.mentions.members.first().id){message.channel.send(`You can't perform this action on yourself.`);return;}
      const {ModeratorRoleID} = require('../info.json');
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){message.channel.send(`You can't perform that action on this user.`);return;}
    const userid = message.mentions.users.first().id
    const mentionedmember = '<@'+message.mentions.users.first().id+'>'
    const reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
    const reason = reasonraw.join(' ')
    const authorusername = message.author.username +'#' +message.author.discriminator
    fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Warning\nReason: ' + reason +'\n\n');
    fs.appendFileSync('./logs/' + userid + '-modwarnings.log', 'Warning issued by '+ authorusername +'\nReason: ' + reason +'\n\n');
    if (reason == ''){respond('⚠️',mentionedmember + ' had a warning logged.', message.channel)}else{respond('⚠️',mentionedmember + ' had a warning logged.\nReason: '+reason, message.channel)}
    const warnedperson = message.mentions.users.first()
    const user = client.users.cache.get(warnedperson);
    if (reason == ''){respond('⚠️','You have been warned.', warnedperson);}else{respond('⚠️','You have been warned due to: '+ reason, warnedperson)}
    modaction(this.name, message.author.tag, message.channel.name, message.content)
}catch(error) {
  // Your code broke (Leave untouched in most cases)
  console.error('an error has occured', error);
  }
    
  }}