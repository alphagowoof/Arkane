module.exports = {
  name: 'setstatus',
  aliases: ['statusset'],
  description: 'Sets status to `Playing` <text>',
  usage: '<text>',
  cooldown: 0,
  mod:true,
  debug:true,
  disable:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const user = client.user
    const statuscontent = args.join(' ')
    try {
      client.user.setPresence({
        game: {
            name: statuscontent,
            type: "Playing",
            url: "https://discordapp.com/"
        }})
  }catch(error) {
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
		  }
		  
  }}