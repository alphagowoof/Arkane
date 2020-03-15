module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	aliases: ['rebootbot'],
	usage: '',
	cooldown: 0,
	execute(message, args) {
		if (message.member.roles.cache.some(role => role.name === 'Bot Manager')) {
		message.channel.send('Restarting. See you soon! :wave:')
		var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
		const RestartEmbed = new Discord.MessageEmbed()
	.setColor('#FFA500')
	.setTitle('Bot Restart')
	.setDescription('Bot is currently restarting. Please wait a moment.')
	.addFields(
		{ name: 'Current date/time(PST): ', value: dateTime, inline: true },
	)
	.setTimestamp()
	.setFooter('Bot written by Daniel C');
		const botlog = client.channels.cache.get('688834736554246158');
		botlog.send(RestartEmbed)
		setTimeout(function(){ 
			process.exit()
		}, 5000);

	}else {
		message.reply(`you don't seem to have the correct permissions to use this command. Please try again later or contact the bot owner.`)
	  }
	},
};
