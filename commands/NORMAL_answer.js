module.exports = {
    name: 'answer',
    aliases: [''],
    description: 'Answer a trivia question.\n(Run .trivia first before using .answer)',
    usage: '(Question ID) (Letter of answer) | .answer 4 D',
    cooldown: 0,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      try {
        const args = message.content.slice('.answer').trim().split(/ +/g); 
        console.log(args[1] + "," + args[2])
        message.channel.send('This command is still under testing!')
  }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }}