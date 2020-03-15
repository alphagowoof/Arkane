module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	aliases: ['rebootbot'],
	usage: '',
	cooldown: 0,
	args: true,
	execute(message, args) {
		if (message.member.roles.cache.some(role => role.name === 'Bot Manager')) {
		message.channel.send('Restarting. See you soon! :wave:')
		const readyforrestartcheck = [ ]
		readyforrestartcheck.push('yes')
		if (readyforrestartcheck === 'yes'){
			process.exit()
		}

	}else {
		message.reply(`you don't seem to have the correct permissions to use this command. Please try again later or contact the bot owner.`)
	  }
	},
};
