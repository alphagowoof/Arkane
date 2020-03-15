module.exports = {
    name: 'ban',
    description: 'Bans a user.',
    aliases: ['banish'],
	usage: '<user> <reason>',
	cooldown: 0,
    execute(message, args) {
		if (message.member.roles.cache.some(role => role.name === 'Moderator')) {
        try {
        const user = message.mentions.users.first();
        const guild = message.guild
        message.channel.send(user+' was banned.');
        guild.members.ban(user);
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
		}else {
			message.reply(`you don't seem to have the correct permissions to use this command. Please try again later or contact the bot owner.`)
		  }
    },
};