module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	aliases: ['rebootbot', 'kill', 'reboot', 'power', 'res', 'acpi', 'rerun', 'reset'],
	usage: '',
	cooldown: 0,
	botmanager:true,
	mod:true,
	essential:true,
	execute(message, args, client) {
		try{
		const fs = require('fs');
		fs.unlinkSync('./runstate.txt')
		console.log("A restart has been triggered. Wait 5 seconds before turning it on again.")
		const { MessageEmbed } = require('discord.js')
		const RestartedEmbed = new Discord.MessageEmbed()
		RestartedEmbed.setTitle('🔄 Restarting')
		RestartedEmbed.setDescription('Restarting bot and reloading commands, please wait a moment.')
		message.channel.send(RestartedEmbed)
		setTimeout(function(){ 
			console.log("Apple Moderator has been shut down.")
			console.log("You can now restart it manually, or install PM2 using `npm install pm2 -g`.")
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
