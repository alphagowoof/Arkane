const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		const { modcommands } = message.client;
		const Discord = require('discord.js');
		const { MessageEmbed } = require('discord.js')
		const {ModeratorRoleID} = require('../info.json')
		try {
			// code that might fail
			if (!args.length) {
				if(message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){
					console.log('Mod role detected.')
					data.push(modcommands.map(modcommand => modcommand.name).join('\n'));
					console.log('Loaded mod help')
				}else {data.push(commands.map(command => command.name).join('\n'));
			console.log('Loaded member help')}

				data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

				const helpEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Available Commands')
				.setDescription('Here are the available commands.')
				.addFields(
					{ name: 'Commands', value: data, inline: false },
				)
				.setTimestamp()
				.setFooter('Help command');
			
				return message.channel.send(helpEmbed)
			}
	
			const name = args[0].toLowerCase();
			const command = modcommands.get(name) || modcommands.find(c => c.aliases && c.aliases.includes(name));
	
			if (!command) {
				return message.reply('that\'s not a valid command!');
			}
	
			const helpInfoEmbed = new Discord.MessageEmbed()
				helpInfoEmbed.setColor('#0099ff')
				helpInfoEmbed.setTitle('Command Info')
				helpInfoEmbed.setDescription(`Here is some information about the ${command.name} command.`)
				helpInfoEmbed.addField('Command name', `${command.name}`, false)
				if(command.aliases){
					helpInfoEmbed.addField('Aliases', `${command.aliases.join(', ')}`, false)
				}
				if(command.description){
					helpInfoEmbed.addField('Description', command.description, false)
				}
				if(command.usage){
					helpInfoEmbed.addField('Usage', `${prefix}${command.name} ${command.usage}`, false)
				}
				helpInfoEmbed.setTimestamp()
				helpInfoEmbed.setFooter(footertext);
			message.channel.send(helpInfoEmbed);
		  } catch(error) {
			// if the code fails
			console.error('an error has occured', error);
		  }
		
	},
};