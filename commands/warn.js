module.exports = {
  name: 'warn',
  aliases: ['punish'],
	description: 'Logs a warning.',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const userid = message.mentions.users.first().id
    let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
    const reason = reasonraw.join(' ')
    const authorusername = message.author.username
    fs.appendFileSync('./logs/' + userid + '-warnings.log', '\nWarning\: Issued by '+ authorusername +'\nReason\:' + reason);
    message.channel.send('<@'+message.mentions.users.first().id + '> had a warn logged.')
    }
    };