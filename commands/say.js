module.exports = {
  name: 'say',
  aliases: ['speak'],
  description: 'Logs a warning.',
  usage: '<text>',
  cooldown: 0,
  mod:true,
	execute(message, args) {
		if (message.member.roles.cache.some(role => role.name === 'Moderator')) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try {const reason = args.join(' ')
    message.channel.send(reason);
    message.delete()}catch(error) {
			// Your code broke (Leave untouched in most cases)
			const fs = require('fs');
			const Discord = require('discord.js');
			const { MessageEmbed } = require('discord.js')
			var today = new Date();
			var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			global.dateTime = date+' '+time;
			fs.appendFileSync('./debuglogs/'+sessionid+'-error.log','('+dateTime+')'+error+'\n\n');
			console.error('an error has occured', error);
		  }
		}else {
			message.reply(`you don't seem to have the correct permissions to use this command. Please try again later or contact the bot owner.`)
		  }
		  
  }}