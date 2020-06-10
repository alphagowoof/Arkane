module.exports = {
  name: 'memberinfo',
  aliases: ['infomember'],
  description: 'Gets info about mentioned user',
  usage: '<user>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const userlog = require('../logs/userwarnings.json')
    const noteLog = require('../logs/userNotes.json')
    try {
      const mentionedUser = message.mentions.users.first()
      if(!mentionedUser){
        respond(``, `No member was mentioned.`, message.channel)
        return;
      }
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('User Information')
        .setAuthor(mentionedUser.tag)
        .setDescription(`Member ID: ${mentionedUser.id}\n\nAccount creation date: ${mentionedUser.createdAt}\n\nServer join date: ${message.mentions.members.first().joinedAt}`)
        .setThumbnail(mentionedUser.displayAvatarURL())
        .setTimestamp()
        message.channel.send(memberinfoembed)

        if(!userlog[mentionedUser.id] && !noteLog[mentionedUser.id]){
          respond(``, `No entries found for this user in the user log.`, message.channel)
          return;
        }
        var currentFields = 0
        var list = []
        const embed = new Discord.MessageEmbed()
        .setTitle('User Log')
      if(userlog[mentionedUser.id]){
        userlog[mentionedUser.id].forEach(function (warning, index) {
          embed.addField('Warning: ' + (parseInt(index) + 1), warning)
          list.push(`Warning ${parseInt(index) + 1}: ${warning}`)
          var currentFields = currentFields + 1
        });
      }
      if(noteLog[mentionedUser.id]){
        noteLog[mentionedUser.id].forEach(function (note, index) {
          embed.addField('Note: ' + (parseInt(index) + 1), note)
          list.push(`Note ${parseInt(index) + 1}: ${note}`)
          var currentFields = currentFields + 1
        });
        console.log(currentFields)
        if(currentFields > 25 && args[1] != '--send'){
          respond('User Log', 'Error: Too many entries. Add `--send` to send a text file', message.channel)
          return
        }else if(args[1] == '--send'){
          fs.writeFile('./tempUserLog.txt', list.join('\n'), (err) => {
            if(!err){
            message.channel.send({
              files: [{
                attachment: './tempUserLog.txt',
                name: 'userLog.txt'
              }]
            })
              .then(fs.unlinkSync('./tempUserLog.txt'))
              .catch(console.error);
          }else if(err){
            errorlog(err)
          }
          })
        }
      }
        message.channel.send(embed).catch(err => {
          errorlog(err)
        })
  }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }

 
 }}