module.exports = {
  name: 'coingame',
  aliases: ['flipcoingame', 'flipgame', 'coinflipgame'],
  description: '**This is a game command.**\nGuess the side of the coin with Apple Mod.\nMake sure you type your guess as a number.\n**THIS COMMAND IS SENSITIVE.\nONLY TYPE 0 OR 1 AS YOUR GUESS OR YOU RISK THE BOT CRASHING.**',
  usage: '(0/1) [0 for tails, 1 for heads]',
  cooldown: 0,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    var arg = message.content.slice('').trim().split(/ +/g); 
      console.log(arg[1])
      var yourside = 'no'
      var number = Math.ceil(Math.random() * 10)
      if(arg[1] === 0) {
        var yourside = 'Tails'
        console.log(arg[1])
        console.log(yourside)
        coingen()
      } else if(arg[1] === 1) {
        var yourside = 'Heads'
        console.log(arg[1])
        console.log(yourside)
      }
        var arg = message.content.slice('').trim().split(/ +/g); 
        if(arg[1] >> 1) {
          respond('?','Invalid coin side.\nMake sure you entered 0 for tails or 1 for heads.', message.channel)
          return
          } 
        if(arg[1] << 0) {
          respond('?','Invalid coin side.\nMake sure you entered 0 for tails or 1 for heads.', message.channel)
          return
          } 
        var coinside = 'no'
      if (number > 5){
        var coinside = 'Heads'
        var csnum = 0
        var ysnum = arg[1]
        console.log(ysnum)
      }else{
        var coinside = 'Tails'
        var csnum = 1
        var ysnum = arg[1]
        console.log(ysnum)
      }
      console.log(coinside)
      console.log(csnum)
      try {
        var ysnum = ysnum
        var csnum = csnum
        var coinside = coinside
        var yourside = yourside
      if (ysnum === 1) {
        if (csnum === 1) {
          console.log("Win")
          respond('Win','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\nYou win this one!', message.channel)
          return
        } else {
          console.log("Lose")
          respond('Lose','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\nYou lose this one.', message.channel)
          return
        }
      } else if (ysnum === 0) {
        if (csnum === 1){
          console.log("Lose")
          respond('Lose','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\nYou lose this one.', message.channel)
          return
        } else {
          console.log("Win")
          respond('Win','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\nYou win this one!', message.channel)
          return
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