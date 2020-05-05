module.exports = {
  name: 'trivia10',
    aliases: [''],
    description: '',
    usage: '',
    cooldown: 0,
      execute(message, args, client) {
      const Discord = require('discord.js');
    const fs = require('fs');
      try {
        const answer = args.join(' ')
        const finalanswer = answer.toLowercase
        const filter = response => {
          console.log(response)
          return item.answer
        };
        if (finalanswer = d) {
        respond('','Correct, <@'+ message.author.id+'>',message.channel);
      } else !(finalanswer = d); {
        respond('','Wrong, <@'+ message.author.id+'>',message.channel);   
        }
    }catch(error) {
        respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
        errorlog(error)
        // Your code broke (Leave untouched in most cases)
        console.error('an error has occured', error);
        }
    }
}