module.exports = {
    name: 'purge',
    description: 'Purges messages at once.',
    aliases: ['clear'],
	usage: '<amount>',
	cooldown: 0,
	mod:true,
	nodelay:true,
    execute(message, args) {
		const { StaffRoleID, ModLog, BotLog , CrashNotify } = require('../info.json');
        try {
			const { prefix } = require('../config.json');
			const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
			const preamount = argarray[1]
			const amount = Number(`${preamount}`)
			try{
				message.channel.bulkDelete(amount+1)
				const ModReportPurge = new Discord.MessageEmbed()
				ModReportPurge.setColor('#ff0000')
				ModReportPurge.setTitle('Mod Action')
				ModReportPurge.setDescription(`A moderation action was taken.`)
				ModReportPurge.addFields(
					{ name: 'Command', value: `${this.name} ${argarray[1]}`, inline: false },
					{ name: 'Executor', value: `${message.author.tag}`, inline: false },
					{ name: 'Channel', value: `${message.channel.name}`, inline: false },
				)
				ModReportPurge.setTimestamp()
				const modlogchannel = client.channels.cache.get(`${ModLog}`);
				modlogchannel.send(ModReportPurge)
			}catch(error){
				console.log(error)
					const channel = client.channels.cache.get(`${ModLog}`);
					channel.send(`The ${name} command was used by ${message.author.tag} (${message.author.id}) in the channel ${message.channel.name}.`)
					channel.send(`An error has occurred while attempting to use the ${this.name} command. Please try again later.\nError: ${error}`);
					return;
						}
		}catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
    },
};