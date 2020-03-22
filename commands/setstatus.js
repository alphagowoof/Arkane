module.exports = {
  name: 'setstatus',
  aliases: ['statusset'],
  description: 'Sets status to `Playing` <text>',
  usage: '<text>',
  cooldown: 0,
  mod:true,
  debug:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const user = client.user
    const statuscontent = args.join(' ')
    try {
      user.setActivity(`${statuscontent}`, { type: 'WATCHING' });
  }catch(error) {
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
		  }
		  
  }}