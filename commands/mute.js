module.exports = {
  name: 'mute',
  aliases: ['quiet'],
  description: 'Mutes a user.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const {MuteRoleID} = require('../info.json');
    console.log("some string")
    const {MutedString, MutedStringDM} = require('../strings.json');
    try {
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      const reason = reasonraw.join(' ')
     const taggeduser = message.mentions.members.first().id
     const guild = message.guild
     const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
     const mentionedmember = '<@'+message.mentions.users.first().id+'>'
      const member = message.mentions.members.first();
     member.roles.add([role]);
     member.send(`You were muted due to:\n ${reason}`)
     message.channel.send(mentionedmember+' was muted.');
      fs.appendFileSync('./logs/' + taggeduser + '-warnings.log', 'Mute\nReason: ' + reason +'\n\n');
      fs.appendFileSync('./logs/' + taggeduser + '-modwarnings.log', 'Mute issued by '+ message.author.tag +'\nReason: ' + reason +'\n\n');
    }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}