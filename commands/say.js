module.exports = {
  name: 'say',
  aliases: ['speak'],
  description: 'Has the bot speak.',
  usage: '<channel> <text>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args) {	
		const { prefix } = require('../config.json');
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		const text = args.join(' ');
		message.delete()
		message.channel.send(text)
		return;
		try {
			if (argarray[1].includes == message.mentions.channels.first().id){
				message.channel.stopTyping()
				const channel = message.channel
				channel.startTyping()
				message.delete()
				const text = args.join(' ');
				channel.send(text); 
				channel.stopTyping()
				return;
			}
			message.channel.stopTyping()
			const channel = message.mentions.channels.first()
			channel.startTyping()
			message.delete()
			const rawsay = args.filter(arg => !Discord.MessageMentions.CHANNELS_PATTERN.test(arg));
			const text = rawsay.join(' ');
			channel.send(text); 
			channel.stopTyping()
			}catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		  
  }}