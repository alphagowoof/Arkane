module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	aliases: ['rebootbot'],
	usage: '',
	cooldown: 0,
	mod:true,
	execute(message, args) {
		try{
		const fs = require('fs');
		fs.unlinkSync('./runstate.txt')
		const client = new Discord.Client();
		const { MessageEmbed } = require('discord.js')
		message.channel.send('Restarting. See you soon! :wave:')
		setTimeout(function(){ 
			process.exit()
		}, 5000);
	}catch(error){      
		console.error('an error has occured', error);}
	},
	
};
