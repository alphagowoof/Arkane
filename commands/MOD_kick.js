const { prefix } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks a user from the server.',
	aliases: ['boot'],
	usage: '<user>',
	cooldown: 0,
	mod:true,
	execute(message, args, client) {
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		try {
			mentionedUser = message.mentions.members.first()
			if(!mentionedUser){
				respond('', 'User mention was not found.', message.channel)
				return;
			}
			if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
			const {ModeratorRoleID} = require('../config.json');
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
			// Code hopefully works
			const user = message.mentions.members.first()
			const reason = args.join(' ')
			const auditreason = reason.replace(argarray[1], '')
			fs.appendFileSync('./logs/' + user.id + '-warnings.log', 'Kick\nReason: ' + auditreason +'\n\n');
			fs.appendFileSync('./logs/' + user.id + '-modwarnings.log', 'Kick issued by '+ message.author.tag +'\nReason: ' + auditreason +'\n\n');

			           //Writes reason to JSON
					   userLog = require('../logs/userKicks.json')

					   if (!userLog[mentionedUser.id]){
						userLog[mentionedUser.id] = [];
				   }
			   
					   userLog[mentionedUser.id].push(reason);
			   
				   fs.writeFile('./logs/userKicks.json', JSON.stringify(userLog), (err) => {
					 if (err) {
					   console.log(err);
					   respond('',`An error occured during saving.`, message.channel);
					   return;
					 }
				   })

			modaction(this.name, message.author.tag, message.channel.name, message.content, message)
			message.mentions.members.first().kick({reason: `${message.author.tag} | ${auditreason}`})
		}catch(error) {
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel, message)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}
		
}
};