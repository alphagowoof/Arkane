module.exports = {
  name: 'hi',
  aliases: ['hello'],
  description: 'Says hello. What else would it do? :joy:',
  usage: 'N/A',
  cooldown: 0,
	execute(message, args) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    try {
      const reason = args.join(' ')
    if (message.member.roles.cache.some(role => role.name === 'Bot Manager')) {
    respond('👋','Hello, <@'+ message.author.id+'>! :wave: Nice to see one of my managers! 🙂',message.channel);
    }else{respond('👋','Hello, <@'+ message.author.id+'>! :wave:', message.channel);}
  }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}