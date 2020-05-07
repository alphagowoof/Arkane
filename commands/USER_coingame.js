module.exports = {
  name: 'coingame',
  aliases: ['flipcoingame', 'flipgame', 'coinflipgame'],
  description: 'Guess the side of the coin with Apple Mod.\nMake sure you write them in lowercase.',
  usage: '(0/1) [0 for tails, 1 for heads]',
  cooldown: 0,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const arg = message.content.slice('').trim().split(/ +/g); 
    try {
      console.log(arg[1])
      var coinside = 'no'
      var yourside = 'no'
      var number = Math.ceil(Math.random() * 10)
      if(arg[1] === 0) {
        var yourside = 'Tails'
        } else if(arg[1] === 1) {
        var yourside = 'Heads'
      } else {
        console.log("If you are seeing this message and the argument is not undefined, check code!")
        respond('Missing parameter',"Where is your guess?\nType .coingame 0 for tails.\nType .coingame 1 for heads.", message.channel)
        return
      }
      if (number > 5){
        var coinside = 'Heads'
        var csnum = 0
        var ysnum = arg[1]
      }else{
        var coinside = 'Tails'
        var csnum = 1
        var ysnum = arg[1]
      }
      console.log(response)
      console.log(arg[1])
      console.log(csnum)
      console.log(ysnum)
      console.log(coinside)
      console.log(yourside)
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