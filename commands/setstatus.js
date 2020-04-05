module.exports = {
  name: 'setstatus',
  aliases: ['statusset'],
  description: 'Sets status to `Playing` <text>',
  usage: '<text>',
  cooldown: 0,
  mod:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const user = client.user
    const statuscontent = args.join(' ')
    try {
      const activity = args.join(' ')
      user.setActivity(activity, { type: 'WATCHING' });
      fs.writeFileSync('./statusmessage.config', activity, 'utf-8');
      message.channel.send('Bot activity set to `WATCHING '+activity+'`.')
  }catch(error) {
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
		  }
		  
  }}