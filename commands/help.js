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
		const client = new Discord.Client();
		const {ModeratorRoleID} = require('../info.json')
		message.channel.send('Nobody can help you now..')
		SetTimeout(function(){ 
			message.channel.send('Just kidding! Here is the help menu..')
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
				data.push(`Please note that some of these commands may require special permissions to be used.`);
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
					.then(() => {return;
						if (message.channel.type === 'dm') return;
						message.reply('I\'ve sent you a DM with all my commands!');
					})
					.catch(error => {return;
						console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
						message.reply('it seems like I can\'t DM you!');
					});
			}
	
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
	
			if (!command) {
				return message.reply('that\'s not a valid command!');
			}
	
			const helpInfoEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('About Command')
			.setDescription('Here is some information about the command.')
			.addFields(
				{ name: 'Command name', value: `${command.name}`, inline: false },
				{ name: 'Aliases', value: `${command.aliases.join(', ')}`, inline: false },
				{ name: 'Description', value: `${command.description}`, inline: false },
				{ name: 'Usage', value: `${prefix}${command.name} ${command.usage}`, inline: false },
			)
			.setTimestamp()
			.setFooter('Help command');
			data.push(`**Name:** ${command.name}`);
	
			message.channel.send(helpInfoEmbed);
		  } catch(error) {
			// if the code fails
			console.error('an error has occured', error);
		  }
		}, 4000)
		
	},
};