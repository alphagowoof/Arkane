module.exports = {
  name: 'unmute',
  aliases: ['unquiet'],
  description: 'Unmutes a user.',
  usage: '<user>',
  cooldown: 0,
	execute(message, args) {
    if (message.member.roles.cache.some(role => role.name === 'Moderator')) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try {const reason = args.join(' ')
    const taggeduser = message.mentions.users.first().id
    const guild = message.guild
    const role = guild.roles.cache.find(role => role.name === 'Muted');
    const member = message.mentions.members.first();
   member.roles.remove(role);
    message.channel.send('<@'+ taggeduser +'> was unmuted.');
  }catch(error) {
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
  }else {
    message.reply(`you don't seem to have the correct permissions to use this command. Please try again later or contact the bot owner.`)
  }
  }}