module.exports = {
  name: 'setstatus',
  aliases: ['statusset'],
  description: 'Sets status to `Playing` <text>',
  usage: '<text>',
  cooldown: 0,
  mod:true,
  debug:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const user = client.user
    const statuscontent = args.join(' ')
    try {
      user.setActivity(`${statuscontent}`, { type: 'WATCHING' });
  }catch(error) {
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
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