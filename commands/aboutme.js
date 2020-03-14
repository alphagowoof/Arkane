module.exports = {
  name: 'aboutme',
  aliases: [''],
  description: 'Gets info about you',
  usage: '',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    message.author.send('Here is what I have on you.')
    message.channel.send('I\'ve sent the information to your direct messages!')
    const fs = require('fs');
    try {
      const taggeduser = message.author.id
      const taggeduserobject = message.author
      fs.readFile('./logs/'+taggeduser+'-warnings.log', (err, data) => {
        if (err) {
          console.error(err)
          const memberinfoembed = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle('Warning Information')
          .setAuthor(taggeduserobject.username)
          .addFields(
            { name: 'Warning log', value: 'No warning information found', inline: false },
          )
          .setTimestamp()
          .setFooter('Bot written by Daniel C');
          message.author.send(memberinfoembed)
  
          return
        }
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Warning Information')
        .setAuthor(taggeduserobject.username)
        .addFields(
          { name: 'Warning Log', value: data, inline: false },
        )
        .setTimestamp()
        .setFooter('Bot written by Daniel C');
        message.author.send(memberinfoembed)
  });
  message.author.send({
    files: ['./logs/' + message.author.id + '-messages.log']
});
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