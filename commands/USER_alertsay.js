module.exports = {
  name: 'alertsay',
  aliases: ['alertspeak'],
  description: 'Has the bot speak.',
  usage: '<text>',
  cooldown: 60,
  mod:false,
  nodelay:true,
	execute(message, args, client) {	
		const { prefix } = require('../config.json');
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		const text = args.join(' ');
    message.channel.send(`<@${message.author.id}>` + " says... " + text)
    message.delete()
  }}