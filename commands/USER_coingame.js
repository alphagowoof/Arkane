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
    const filter = response => {
      console.log(response)
    };
    console.log(arg[1])
    if(arg[1] = 0) {
      var yourside = 'Tails'
      var ysnum = arg[1]
    } else if(arg[1] = 1) {
      var yourside = 'Heads'
      var ysnum = arg[1]
    } else{
    respond('','Where is your guess?', message.channel)
    }
    try {
      showdown()
    function showdown() {
      var coinside = 'no'
      var didyouwin = "idk"
      var number = Math.ceil(Math.random() * 10)
      if (number > 5){
        var coinside = 'Heads'
        var csnum = 0
      }else{
        var coinside = 'Tails'
        var csnum = 1
      }
      console.log(csnum)
      console.log(ysnum)
      console.log(coinside)
      console.log(yourside)
      if (ysnum = 1) {
        if (csnum = 1) {
          respond('','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\n', message.channel)
        } else {
          respond('','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\n', message.channel)
        }
      } else if (ysnum = 0) {
        if (csnum = 1){
          respond('','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\n', message.channel)
        } else {
          respond('','You guessed: ' + yourside + '\nThe coin says: ' + coinside + '\n', message.channel)
        }
      }
    }
}catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}