module.exports = {
  name: 'modstats',
  description: 'Shows the stats of mod actions.',
  usage: '<user> || Message Author',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const modStats = require('../logs/modStats.json')
    try {
      const mentionedUser = message.mentions.users.first() || message.author
        if(!modStats[mentionedUser+"_warnCount"]){
          respond('Mod Stats',"Unable to find mod stats for this user.", message.channel)
          return;
        }else{
          const modStatsEmbed = new Discord.MessageEmbed()
          .setTitle('Mod Stats')
          .setAuthor(mentionedUser.tag)
          .setDescription(`📝 Notes: ${modStats[mentionedUser.id+"_noteCount"]}\n⚠️ Warns: ${modStats[mentionedUser.id+"_warnCount"]}\n🔇 Mutes: ${modStats[mentionedUser.id+"_muteCount"]}\n👢 Kicks: ${modStats[mentionedUser.id+"_kickCount"]}\n🔨 Bans: ${modStats[mentionedUser.id+"_banCount"]}`)
          message.channel.send(modStatsEmbed)
        }
  }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }

 
 }}