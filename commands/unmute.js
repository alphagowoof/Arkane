module.exports = {
  name: 'unmute',
  aliases: ['unquiet'],
  description: 'Unmutes a user.',
  usage: '<user>',
  cooldown: 0,
  mod:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const {MuteRoleID} = require('../info.json');
    try {const reason = args.join(' ')
    const taggeduser = message.mentions.users.first().id
    const guild = message.guild
    const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
    const member = message.mentions.members.first();
   member.roles.remove(role);
    message.channel.send('<@'+ taggeduser +'> was unmuted.');
  }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}