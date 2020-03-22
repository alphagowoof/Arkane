module.exports = {
  name: 'aboutme',
  aliases: ['myinfo'],
  description: 'Gets info about you',
  usage: '-',
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
          .setTitle('Member Information')
          .setAuthor(taggeduserobject.username)
          .addFields(
            { name: 'Punishment Log', value: 'No punishment information found.', inline: false },
          )
          .setTimestamp()
          message.author.send(memberinfoembed)
  
          return
        }
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Punishment Information')
        .setAuthor(taggeduserobject.username)
        .addFields(
          { name: 'Punishment Log', value: data, inline: false },
        )
        .setTimestamp()
        message.author.send(memberinfoembed)
  });
  message.author.send({
    files: ['./logs/' + message.author.id + '-messages.log']
});
    }
    catch(error) {
			// Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
		  }
  }}