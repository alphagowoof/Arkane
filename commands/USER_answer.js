module.exports = {
    name: "answer",
    description: "Answer a trivia question.\n(Run .trivia first before using .answer)",
    usage: "(Question ID) (Letter of answer) | .answer 4 D",
    cooldown: 10,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      const quiz = require('./quiz.json');
      const arg = message.content.slice('').trim().split(/ +/g); 
      console.log(arg[1] + ", " + arg[2])
      var modified = arg[1] - 1
      const item = quiz[modified]
      console.log(item)
      const ans = item.answer
      console.log(ans)
      console.log(arg[2])
      const filter = response => {
        console.log(response)
        return item.answer
      };
      try {
        if(arg[2]== item.answer) {
            console.log('answer correct')
            respond('', "That was the correct answer!", message.channel)
        }else if(arg[2] == item.answer_case) {
            console.log('answer correct, capital letter')
            respond('', "That was the correct answer! Next time, try using lowercase for the answer.", message.channel)
        }else{
            console.log('answer wrong')
            respond('', "That was the wrong answer.", message.channel)
        }
  }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }}