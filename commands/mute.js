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
    
    const fs = require('fs');
    const {MuteRoleID} = require('../info.json');
    console.log("some string")
    const {MutedString, MutedStringDM} = require('../strings.json');
    try {
      if (message.author.id == message.mentions.members.first().id){message.channel.send(`You can't perform this action on yourself.`);return;}
      const {ModeratorRoleID} = require('../info.json');
      const checkmemberforroles = message.mentions.members.first()
      if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){message.channel.send(`You can't perform that action on this user.`);return;}
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      const reason = reasonraw.join(' ')
     const taggeduser = message.mentions.members.first().id
     const guild = message.guild
     const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
     const mentionedmember = '<@'+message.mentions.users.first().id+'>'
      const member = message.mentions.members.first();
     member.roles.add([role]);
     respond('🔇 Muted',`You were muted due to:\n ${reason}`, member)
     respond('🔇 Muted',mentionedmember+' was muted.', message.channel);
      fs.appendFileSync('./logs/' + taggeduser + '-warnings.log', 'Mute\nReason: ' + reason +'\n\n');
      fs.appendFileSync('./logs/' + taggeduser + '-modwarnings.log', 'Mute issued by '+ message.author.tag +'\nReason: ' + reason +'\n\n');
      modaction(this.name, message.author.tag, message.channel.name, message.content)
    }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}