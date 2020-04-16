module.exports = {
  name: 'clearwarnings',
  aliases: ['clearwarn', 'clearlog'],
  description: 'Erases punishment log.',
  usage: '<user> <SANITY CHECK>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const fs = require('fs');
    try {
      if (message.author.id == message.mentions.members.first().id){message.channel.send(`You can't perform this action on yourself.`);return;}
      const {ModeratorRoleID} = require('../info.json');
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){message.channel.send(`You can't perform that action on this user.`);return;}
      var sanitycheck = args.join(' ')
      if(!sanitycheck.includes('YES I AM SURE')){
        respond('','Sanity check failed. Please type `YES I AM SURE` at the end of the message to allow. Please note this action is **permanent** and can\'t be undone.',message.channel)}else{
          fs.unlink('./logs/' + message.mentions.members.first().id + '-warnings.log',function(error){
            console.log(error);
        });
          fs.unlink('./logs/' + message.mentions.members.first().id + '-modwarnings.log',function(error){
           console.log(error);
        });
        respond('✏️','<@'+message.mentions.members.first().id + '> had their punishment log cleared.', message.channel)
        modaction(this.name, message.author.tag, message.channel.name, message.content)
        }
      }catch(error) {
        respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
        errorlog(error)
        // Your code broke (Leave untouched in most cases)
        console.error('an error has occured', error);
        }
    
  }}