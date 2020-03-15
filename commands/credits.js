module.exports = {
  name: 'credits',
  aliases: ['acknowledgements'],
  description: 'Shows the people who helped on this project.',
  usage: '',
  cooldown: 10,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try {
    fs.readFile('./credits.txt', (err, data) => {
      if (err) {
        console.error(err)
        const creditsembed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Acknowledgements')
        .addFields(
          { name: '-', value: 'No acknowledgement information was found.', inline: false },
        )
        .setTimestamp()
        message.channel.send(creditsembed)

        return
      }
      const memberinfoembed = new Discord.MessageEmbed()
      .setColor('#0000ff')
      .setTitle('Acknowledgements')
      .addFields(
        { name: '-', value: data, inline: false },
      )
      .setTimestamp()
      message.channel.send(memberinfoembed)
    }) }catch(error) {
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