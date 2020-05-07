module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	aliases: ['rebootbot', 'kill', 'reboot', 'power', 'res', 'acpi'],
	usage: '',
	cooldown: 0,
	botmanager:true,
	mod:true,
	execute(message, args, client) {
		try{
		const fs = require('fs');
		fs.unlinkSync('./runstate.txt')
		
		const { MessageEmbed } = require('discord.js')
		const RestartedEmbed = new Discord.MessageEmbed()
		RestartedEmbed.setTitle('🔄 Restarting')
		RestartedEmbed.setDescription('Restarting bot and reloading commands, please wait a moment.')
		message.channel.send(RestartedEmbed)
		setTimeout(function(){ 
			process.exit()
		}, 5000);
	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
	}
	
};
