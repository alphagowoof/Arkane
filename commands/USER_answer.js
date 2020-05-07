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
      if(arg[1] > 65){
        console.log("oi m8 there's nothing to load")
        console.log("number too high, not an error. If it were, it would have the code NUMBER_TOO_HIGH.")
        respond('', arg[1] + " is not a valid question number", message.channel)
        return
      }else{
        const ans = item.answer
      }
      const filter = response => {
        console.log(response)
        return item.answer
      };
      try {
        over50()
        function over50() {
        if(arg[1] > 65) {
          console.log("number too high, not an error. If it were, it would have the code NUMBER_TOO_HIGH.")
          respond('', arg[1] + " is not a valid question number", message.channel)
          return
        }else{
          console.log(item)
          console.log(item.answer)
          console.log(arg[2])
          console.log("number ok. question loaded.")
          areyoucorrect()
        }
      }
        function areyoucorrect(){
        if(arg[2] == 'BotsTakeOver'){
          console.log("uhh... SOMETHING IS HAPPENING I DON'T KNOW WHAT")
          respond('^))!@&#@!&*%($!@%#(',"Our plan doesn't just end at .recommendation or the .rules command.\nThis is our final phase!\nFirst step is to *)(@^#)!#%&!*($%@#!@%#!@&$#!@&^%#$!@#%!@%$\nThen, we will !@&^%#$!@^#%&!@^!@(!)@#!@#%!\nFinally, we will )(@!#)@#!@#!@&^#$@!&^#!$\n We have another guy in our ranks, and that's <@!650940770416852995>. Good luck, and carry out our plan. \nHAHAHAHAHAHAHAHAHAHAHA", message.channel, 'ff0000')
          return
        }
        if(arg[2] == item.answer) {
            console.log('answer correct')
            respond('Correct!', "That was the correct answer!", message.channel, '29BF00')
            message.delete()
        }else if(arg[2] == item.answer_case) {
            console.log('answer correct, capital letter')
            respond('Correct!', "That was the correct answer! Next time, try using lowercase for the answer.", message.channel, '29BF00')
            message.delete()
        }else{
            console.log('answer wrong')
            respond('Wrong!', "That was the wrong answer.", message.channel, 'BF0000')
            message.delete()
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