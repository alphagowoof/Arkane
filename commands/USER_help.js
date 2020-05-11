const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: 'commands [command name]',
	cooldown: 2,
	execute(message, args, client) {
		const data = [];
		const { commands } = message.client;
		const { modcommands } = message.client;
		const Discord = require('discord.js');
		const { MessageEmbed } = require('discord.js')
		const {ModeratorRoleID, BotManagerRoleID} = require('../config.json')
		try {
			
			getCommandInfo = function(commandToFind){
				var name = commandToFind

			const command = modcommands.get(name) || modcommands.find(c => c.aliases && c.aliases.includes(name));
	
			if (!command) {
				return respond('',`<@${message.author.id}>, that's not a valid command!`, message.channel);
			}
			if(command.mod)var isModOnly = ", mod only."
	
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
				if(command.mod){
					helpInfoEmbed.addField('This is a mod only command.', `\u200b`, false)
				}
				helpInfoEmbed.setTimestamp()
				helpInfoEmbed.setFooter(footertext);
			message.channel.send(helpInfoEmbed);
			}

			// code that might fail
			if (!args.length) {
				var modPerm = false
				var botManagerPerm = false

				if(message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){
					var modPerm = true
				}
				if(message.member.roles.cache.some(role => role.id === `${BotManagerRoleID}`)){
					var botManagerPerm = true
				}

				const result = getCommandList(modPerm, botManagerPerm, message.author.id, true)
                data.push(result);
				data.push(`\nYou can send \`${prefix}help [category name]\` to see commands in that category.`);
				data.push(`\nYou can also send \`${prefix}help commands [command name]\` to get info\n on that command.`);

                const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Available Commands')
                .setDescription('Here are the available commands.')
                .addFields(
                    { name: 'Commands', value: data, inline: true },
                )
                .setTimestamp()
                .setFooter('Help command');
            
				return message.channel.send(helpEmbed)
				}
				if(args[1] && args[1].toLowerCase() == 'manager' || args[0] ){
					if(args[0].toLowerCase() == 'user'){
						const result = getCommandList(false, false, message.author.id, true)
						const helpInfoEmbed = new Discord.MessageEmbed()
						helpInfoEmbed.setColor('#0099ff')
						helpInfoEmbed.setTitle('Commands in '+args[0])
						helpInfoEmbed.addField('Commands', `${result}`, false)
						helpInfoEmbed.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						return;
					}else if(args[0].toLowerCase() == 'mod'){
						const result = getCommandList(true, false, message.author.id, false)
						const helpInfoEmbed = new Discord.MessageEmbed()
						helpInfoEmbed.setColor('#0099ff')
						helpInfoEmbed.setTitle('Commands in '+args[0])
						helpInfoEmbed.addField('Commands', `${result}`, false)
						helpInfoEmbed.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						return;
					}else if((`${args[0]} ${args[1]}`).toLowerCase() == 'bot manager'){
						const result = getCommandList(false, true, message.author.id, false)
						const helpInfoEmbed = new Discord.MessageEmbed()
						helpInfoEmbed.setColor('#0099ff')
						helpInfoEmbed.setTitle('Commands in '+args[0] +' '+ args[1])
						helpInfoEmbed.addField('Commands', `${result}`, false)
						helpInfoEmbed.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						return;
					}else if(args[0].toLowerCase() == 'command' || args[0].toLowerCase() == 'commands'){
						getCommandInfo(args[1])
						return;
					}else{
						respond('', '❗ Something went wrong.', message.channel)
						return;
					}
				}
			
		}catch(error) {
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}
		
	},
};