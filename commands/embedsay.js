module.exports = {
  name: 'embedsay',
  aliases: ['speakembed', 'sayembed'],
  description: 'Has the bot speak though embed.',
  usage: '<text>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args) {	
		const { prefix } = require('../config.json');
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		const text = args.join(' ');
		message.delete()
		try {
			respond('', text, message.channel)
			}catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		  
  }}