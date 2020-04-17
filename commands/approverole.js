module.exports = {
  name: 'approverole',
  aliases: ['approve', 'assignrole'],
  description: 'Approves a role to a user.',
  usage: '',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
   try{
    const Discord = require('discord.js');
    const rolename = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg)).join(' ')
    const role = message.guild.roles.cache.find(role => role.name === rolename);
    const member = message.mentions.members.first();
    member.roles.add([role]).catch(error => {
    respond('Error', 'Something went wrong.\n'+error, message.channel)
    return;
    })
    respond('✅ Role Approved', `<@${message.mentions.members.first().id}> had the \`${rolename}\` role approved.`, message.channel)
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}