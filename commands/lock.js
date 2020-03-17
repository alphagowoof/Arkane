module.exports = {
  name: 'lock',
  aliases: ['lockout'],
  description: 'Locks the channel the command is ran in.',
  usage: '',
  cooldown: 0,
  mod:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
	const fs = require('fs');
	const channel = message.channel
    try {
		channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
		message.channel.send(message.channel+' was locked.')
	}
		catch(error) {
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
		  
  }}