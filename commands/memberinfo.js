module.exports = {
  name: 'memberinfo',
  aliases: ['infomember'],
  description: 'Gets info about mentioned user',
  usage: '<user>',
  cooldown: 0,
  mod:true,
	execute(message, args) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    try {const taggeduser = message.mentions.users.first().id
    const taggeduserobject = message.mentions.users.first()
    fs.readFile('./logs/'+taggeduser+'-modwarnings.log', (err, data) => {
      if (err) {
        console.error(err)
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Member Information')
        .setAuthor(taggeduserobject.username)
        .addFields(
          { name: 'Punishment Log', value: 'No punishment information found.', inline: false },
          { name: 'Other information', value: 'Member ID: '+ taggeduserobject.id +'\nJoin date: '+ taggeduserobject.createdAt , inline: false },
        )
        .setTimestamp()
        message.channel.send(memberinfoembed)

        return
      }
      const memberinfoembed = new Discord.MessageEmbed()
      .setColor('#0000ff')
      .setTitle('Member Information')
      .setAuthor(taggeduserobject.username)
      .addFields(
        { name: 'Punishment Log', value: data, inline: false },
        { name: 'Other information', value: 'Member ID: '+ taggeduserobject.id+'\nJoin date: '+ taggeduserobject.createdAt , inline: false },
      )
      .setTimestamp()
      message.channel.send(memberinfoembed)
    }) }catch(error) {
			// Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
		  }

 
 }}