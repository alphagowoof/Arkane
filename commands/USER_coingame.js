module.exports = {
  name: 'coingame',
  aliases: ['flipcoingame', 'flipgame', 'coinflipgame'],
  description: 'Guess the side of the coin with Apple Mod.',
  usage: '(heads/tails)',
  cooldown: 0,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const arg = message.content.slice('').trim().split(/ +/g); 
    const filter = response => {
      console.log(response)
    };
    console.log(arg[1])
    try {
    if(arg[1] = 'tails') {
      var yourside = 'Tails'
      var ysnum = 0
      coingenerate()
    } else if(arg[1] = 'heads') {
      var yourside = 'Heads'
      var ysnum = 1
      coingenerate()
    } else if(arg[1] = 'Tails') {
      var yourside = 'Tails'
      var ysnum = 0
      coingenerate()
    } else if(arg[1] = 'Heads') {
      var yourside = 'Heads'
      var ysnum = 1
      coingenerate()
    } else {
    respond('','Where is your guess?', message.channel)
    }
    function coingenerate() {
    var number = Math.ceil(Math.random() * 10)
    var coinside = 0
    if (number > 5){
      var coinside = 'Heads'
      var csnum = 0
      showdown()
    }else{
      var coinside = 'Tails'
      var csnum = 1
      showdown()
    }
  }
    function showdown() {
      if (yourside = coinside) {
        respond('','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\n Congratulations, you got it right!', message.channel)
      } else if (yourside != coinside) {
        respond('','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\n Sorry, you got it wrong, better luck next time!', message.channel)
      }
    }
}catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}