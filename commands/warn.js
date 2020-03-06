module.exports = {
  name: 'warn',
  aliases: ['punish'],
	description: 'Logs a warning.',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const userid = message.mentions.
    const reason = args.join(' ')
    const authorusername = message.a
    fs.appendFileSync('./logs/' + userid + '-warnings.log', '\n
    Warn 16: Issued by'+ message.member +'\nReason: Profanity');
    message.channel.send('<@'+message.mentions.users.first().id + '> had a warn logged.')
  }
    };