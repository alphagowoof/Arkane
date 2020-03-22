const { prefix } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks a user from the server.',
	aliases: ['boot'],
	usage: '<user>',
	cooldown: 0,
	mod:true,
	execute(message, args) {
		try {
			// Code hopefully works
			const user = message.mentions.members.first()
			user.kick()
			message.channel.send('<@'+user.id+'> was kicked from the server.')
		  } catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		
}
};