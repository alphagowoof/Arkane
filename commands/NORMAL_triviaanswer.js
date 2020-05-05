module.exports = {
  name: 'triviaanswer',
  aliases: ['answer'],
  description: 'Answer a trivia question. (You must run .trivia to get a question before answering.)',
  usage: '(Question ID) (Answer in lowercase)',
  cooldown: 0,
    execute(message, args, client) {
      try{
    const fs = require('fs');
    const Discord = require('discord.js')
    const msg = message
    const quiz = require('./quiz.json');
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const filter = response => {
      console.log(response)
    }
      argseparator()
      function argseparator() {
        // Argument 0, aka Question ID
        if(a0 = 4) {             // Quiz questions with the answer "A"
          const cAnswer = a
        } else if(a0 = 5) {
          const cAnswer = a
        } else if(a0 = 11) {
          const cAnswer = a
        } else if(a0 = 13) {          // Quiz questions with the answer "B"
          const cAnswer = b
        } else if(a0 = 1) {
          const cAnswer = b
        } else if(a0 = 7) {
          const cAnswer = b
        } else if(a0 = 2) {           // Quiz questions with the answer "C"
          const cAnswer = c
        } else if(a0 = 6) {
          const cAnswer = c
        } else if(a0 = 9) {
          const cAnswer = c
        } else if(a0 = 12) {
          const cAnswer = c
        } else if(a0 = 3) {        // Quiz questions with the answer "D"
          const cAnswer = d
        } else if(a0 = 8) {
          const cAnswer = d
        } else if(a0 = 10) {
          const cAnswer = d
        }
        // Argument 1, aka author's answer
        // This will also check the author's answer against the actual answer
        if(a1 = a) {
          if (cAnswer = a) {
            message.channel.send(`Correct answer, <@${message.author.id}>.`)
          }else{
            message.channel.send(`Wrong answer, <@${message.author.id}>.`)
          }
        }else if(a1 = b) {
          if (cAnswer = b) {
            message.channel.send(`Correct answer, <@${message.author.id}>.`)
          }else{
            message.channel.send(`Wrong answer, <@${message.author.id}>.`)
          }
        }else if(a1 = c) {
          if (cAnswer = c) {
            message.channel.send(`Correct answer, <@${message.author.id}>.`)
          }else{
            message.channel.send(`Wrong answer, <@${message.author.id}>.`)
          }
        } else if(a1 = d) {
          if (cAnswer = d) {
            message.channel.send(`Correct answer, <@${message.author.id}>.`)
          }else{
            message.channel.send(`Wrong answer, <@${message.author.id}>.`)
          }
        }
      }
}catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
}
}
}