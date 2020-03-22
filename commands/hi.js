module.exports = {
  name: 'hi',
  aliases: ['hello'],
  description: 'Logs a warning.',
  usage: 'N/A',
  cooldown: 0,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try {
      const reason = args.join(' ')
    if (message.member.roles.cache.some(role => role.name === 'Bot Manager')) {
    message.channel.send('Hello, <@'+ message.author.id+'>! :wave: Nice to see one of my devs here! :)');
    }else{message.channel.send('Hello, <@'+ message.author.id+'>! :wave:');}
  }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}