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

		function fullRestart(){
			const fs = require('fs');
			if (fs.existsSync(`./runstate.txt`)){
			fs.unlinkSync('./runstate.txt')
			}
			if (fs.existsSync(`./safe_mode.flag`)){
				fs.unlinkSync('./safe_mode.flag')
			}
			if (fs.existsSync(`./errorcount.txt`)){
			fs.unlinkSync('./errorcount.txt')
			}
			console.log("A restart has been triggered. Wait 5 seconds before turning it on again.")
			const { MessageEmbed } = require('discord.js')
			const RestartedEmbed = new Discord.MessageEmbed()
			RestartedEmbed.setTitle('♻️ Restart')
			RestartedEmbed.setDescription('Please wait a moment.')
			message.channel.send(RestartedEmbed)
			setTimeout(function(){ 
				console.log("Focus has been shut down.")
				console.log("You can now restart it manually, or install PM2 using `npm install pm2 -g`.")
				process.exit()
			}, 5000);
		}

		function partialRestart(){
			respond('',`🧹 Partial restart in progress.`, message.channel)
			fs.unlinkSync('./runstate.txt')
			if (fs.existsSync(`./safe_mode.flag`)){
				fs.unlinkSync('./safe_mode.flag')
			}
			if (fs.existsSync(`./errorcount.txt`)){
			fs.unlinkSync('./errorcount.txt')
			}
			var config = require('../config.json')
			restartedchannel = message.guild.channels.cache.get(config.BotLog)
			respond('', '✅ Restart completed.', restartedchannel)
			respond('', '✅ Restart completed.', message.channel)

		}

		function forceRestart(){
			respond('',`ℹ️ Force restart in progress.`, message.channel)
			setTimeout(function(){ 
				process.exit()
			}, 1000);
		}
		
		if(args[0] && args[0].toLowerCase() == 'part' || args[0] && args[0].toLowerCase() == 'partial'){
			partialRestart()
		}else if(args[0] && args[0].toLowerCase() == 'f' || args[0] && args[0].toLowerCase() == 'force'){
			forceRestart()
		}else{
			fullRestart()
		}

	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
	}
	
};
