const { prefix } = require('../config.json');

module.exports = {
	name: 'membercount',
	description: 'Gets the current server member count',
	aliases: ['members', 'totalmembers', 'membertotal', 'memberamount'],
	usage: '',
	cooldown: 0,
	execute(message, args) {
		try {
			// Code hopefully works
			const { MessageEmbed } = require('discord.js')
			const MemberCountEmbed = new Discord.MessageEmbed()
	.setTitle('Server Member Count')
	.setAuthor('Requested by '+message.member.user.tag)
	.addFields(
		{ name: message.guild.name + '\'s member count', value: `${message.guild.memberCount}`, inline: false },
	)
	.setTimestamp()
	message.channel.send(MemberCountEmbed)
		  } catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		
	},
};