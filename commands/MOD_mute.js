module.exports = {
  name: 'mute',
  aliases: ['quiet'],
  description: 'Mutes a user.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    const {MuteRoleID} = require('../config.json');
    try {
      if (!args[1]){
        respond('',`Please provide a reason.`, message.channel);
        return;
      }
      if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
      const {ModeratorRoleID} = require('../config.json');
      const checkmemberforroles = message.mentions.members.first()
      if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      const reason = reasonraw.join(' ')
     const taggeduser = message.mentions.members.first().id
     const guild = message.guild
     const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
     const mentionedmember = '<@'+message.mentions.users.first().id+'>'
      const member = message.mentions.members.first();
     member.roles.add([role]);
     respond('🔇 Muted',`You were muted due to:\n ${reason}`, member)
     respond('🔇 Muted',mentionedmember+' was muted.'+`\nReason: ${reason}`, message.channel);
      fs.appendFileSync('./logs/' + taggeduser + '-warnings.log', 'Mute\nReason: ' + reason +'\n\n');
      fs.appendFileSync('./logs/' + taggeduser + '-modwarnings.log', 'Mute issued by '+ message.author.tag +'\nReason: ' + reason +'\n\n');
      modaction(this.name, message.author.tag, message.channel.name, message.content, message)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
  },
  executeNoCheck(message, whoToMute){
    const config = require('../config.json');
    const reason = `Spam detection. Auto mute. `
    const guild = message.guild
    const role = guild.roles.cache.find(role => role.id === `${config.MuteRoleID}`);
    const mentionedmember = '<@'+whoToMute.id+'>'
    const member = whoToMute
    message.member.roles.add([role]);
    if (!message.member.roles.cache.some(role => role.id === `${config.MuteRoleID}`)){
    respond('🔇 Muted',`You were muted due to:\n ${reason}`, member)
    respond('🔇 Muted',mentionedmember+' was muted.'+`\nReason: ${reason}`, message.channel);
    modaction(this.name, `AutomaticModeration`, message.channel.name, reason, message)
    }
    if (message.member.roles.cache.some(role => role.id === `${config.MuteRoleID}`) && config.FullMuteRoleID && config.FullMuteRoleID != ''){
      fullMuteRole = guild.roles.cache.find(role => role.id === `${config.FullMuteRoleID}`);
      message.member.roles.add([fullMuteRole]);
      const reason = `Spam detection. Repeated spam. Auto mute. `
      respond('🔇 Muted',`You were muted due to:\n ${reason}`, member)
      respond('🔇 Muted',mentionedmember+' was muted.'+`\nReason: ${reason}`, message.channel);
      modaction(this.name, `AutomaticModeration`, message.channel.name, reason, message)
    }
  }
}