module.exports = {
    name: 'purge',
    description: 'Purges messages at once.',
    aliases: ['clear'],
	usage: '<amount>',
	cooldown: 0,
	mod:true,
	nodelay:true,
    execute(message, args) {
		const client = new Discord.Client();
		const { StaffRoleID, ModLog, BotLog , CrashNotify } = require('../info.json');
        try {
			const { prefix } = require('../config.json');
			const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
			const preamount = argarray[1]
			const amount = Number(`${preamount}`)
			const modlogchannel = client.channels.cache.get(`${ModLog}`);
			try{
				message.channel.bulkDelete(amount+1)
				const ModReport = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.setTitle('Mod Action')
				.setDescription(`A moderation action was taken.`)
				.addFields(
					{ name: 'Command', value: `${this.name} ${argarray[1]}`, inline: false },
					{ name: 'Executor', value: `${message.author.tag}`, inline: false },
					{ name: 'Channel', value: `${message.channel.name}`, inline: false },
				)
				.setTimestamp()
				modlogchannel.send(ModReport)
			}catch(error){
				console.log(error)
					const botlogchannel = client.channels.cache.get(`${BotLog}`);
					botlogchannel.send(`The ${name} command was used by ${message.author.tag} (${message.author.id}) in the channel ${message.channel.name}.`)
					botlogchannel.send(`An error has occurred while attempting to use the ${this.name} command. Please try again later.\nError: ${error}`);
					return;
						}
		}catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
    },
};