module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	aliases: ['fetch'],
	usage: '[command]',
	cooldown: 0,
	botmanager:true,
	mod:true,
	execute(message, args) {
		const modcommandName = args[0].toLowerCase();
		const command = message.client.modcommands.get(modcommandName)
			|| message.client.modcommands.find(cmd => cmd.aliases && cmd.aliases.includes(modcommandName));
		
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${modcommandName}\`, ${message.author}!`);
		}
	
		delete require.cache[require.resolve(`./${modcommandName}.js`)];

		try {
			const newCommand = require(`./${modcommandName}.js`);
			message.client.modcommands.set(newCommand.name, newCommand);
		} catch (error) {
			console.log(error);
			return message.channel.send(`There was an error while reloading a command \`${modcommandName}\`:\n\`${error.message}\``);
		}
		respond('',`Command \`${modcommandName}\` was reloaded!`,message.channel);
	},
};
