module.exports = {
  name: 'say',
  aliases: ['speak'],
  description: 'Has the bot speak.',
  usage: '<text>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args) {
		if (message.member.roles.cache.some(role => role.name === 'Moderator')) {
			
    const Discord = require('discord.js');
    const client = new Discord.Client();
	const fs = require('fs');
	const channel = message.channel
	try {
		message.delete()
		const reason = args.join(' ');
	channel.send(reason); 
	return;
	setTimeout(function(){ 
		channel.send(reason) 
		channel.stopTyping()
	}, 2000);}catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		}else {
			message.reply(`you don't seem to have the correct permissions to use this command. Please try again later or contact the bot owner.`)
		  }
		  
  }}