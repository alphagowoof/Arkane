module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	aliases: ['rebootbot'],
	usage: '',
	cooldown: 0,
	botmanager:true,
	execute(message, args) {
		if (message.member.roles.cache.some(role => role.id === BotManagerRoleID)) {
		const client = new Discord.Client();
		const { MessageEmbed } = require('discord.js')
		message.channel.send('Restarting. See you soon! :wave:')
		setTimeout(function(){ 
			process.exit()
		}, 5000);
	}else {
		message.reply(nopermreply)
	  }
	},
	
};
