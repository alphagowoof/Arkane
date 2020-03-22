module.exports = {
  name: 'unlock',
  aliases: ['unlockout'],
  description: 'Unlocks the channel the command is ran in.',
  usage: '',
  cooldown: 0,
  mod:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
	const fs = require('fs');
	const channel = message.channel
    try {
		channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });
		message.channel.send(+message.channel+' was unlocked.')
	}
		catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		  
  }}