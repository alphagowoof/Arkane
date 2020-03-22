module.exports = {
    name: 'ban',
    description: 'Bans a user.',
    aliases: ['banish'],
	usage: '<user> <reason>',
	cooldown: 0,
	mod:true,
    execute(message, args) {
        try {
        const user = message.mentions.users.first();
		const guild = message.guild
		let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
		const reason = reasonraw.join(' ')
		message.channel.send('<@'+user+'> was banned.\nReason: '+reason);
		user.send('You were banned from the Apple Explained server due to: '+ reason)
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
    },
};