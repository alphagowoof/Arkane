module.exports = {
  name: 'hi',
  aliases: ['hello'],
	description: 'Logs a warning.',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const reason = args.join(' ')
    message.channel.send('Hello, <@'+ message.author.id+'>! :wave:');
  }}