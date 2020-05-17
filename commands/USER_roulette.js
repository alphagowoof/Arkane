module.exports = {
    name: 'roulette',
    aliases: ['casinowheel', 'casinoroulette', 'rollroulette'],
    description: '**This is a game command.**\nPlay on a roulette table like in Vegas.\n(No gambling included)\n[DEFINTELY NO REVOLVER INVOLVED, THIS ISN\'T RUSSIAN ROULETTE',
    usage: '<0-36> | <red/black> | <even/odd>',
    cooldown: 0,
    hidden: true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      const arg = message.content.slice('').trim().split(/ +/g);
      var rouletteroll = Math.ceil(Math.random() * 36)
      if(rouletteroll = 0){
        var rouletteColor = "green"
      } else if(rouletteroll === 1 || rouletteroll === 3 || rouletteroll === 5 || rouletteroll === 7 || rouletteroll === 9 || rouletteroll === 12 || rouletteroll === 14 || rouletteroll === 16 || rouletteroll === 18 || rouletteroll === 19 || rouletteroll === 21 || rouletteroll === 23 || rouletteroll === 25 || rouletteroll === 27 || rouletteroll === 30 || rouletteroll === 32 || rouletteroll === 34 || rouletteroll === 36){
        var rouletteColor = "red"
      } else {
        var rouletteColor = "black"
      }
      if(rouletteroll === 1 || rouletteroll === 3 || rouletteroll === 5 || rouletteroll === 7 || rouletteroll === 9 || rouletteroll === 11 || rouletteroll === 13 || rouletteroll === 15 || rouletteroll === 17 || rouletteroll === 19 || rouletteroll === 21 || rouletteroll === 23 || rouletteroll === 25 || rouletteroll === 27 || rouletteroll === 29 || rouletteroll === 31 || rouletteroll === 33 || rouletteroll === 35) {
        var rouletteNumberType = "odd"
      } else {
        var rouletteNumberType = "even"
      }
      if(arg[1] > -1 && arg[1] < 37) {
        var rouletteGuess = "number"
      } else if(arg[1] === "red"){         //red
        var rouletteGuess = "red"
      } else if(arg[1] === "Red"){
        var rouletteGuess = "red"
      } else if(arg[1] === "RED"){
        var rouletteGuess = "red"
      } else if(arg[1] === "black"){      //black
        var rouletteGuess = "black"
      } else if(arg[1] === "Black"){
        var rouletteGuess = "black"
      } else if(arg[1] === "BLACK"){
        var rouletteGuess = "black"
      } else if(arg[1] === "odd") {        //odd
        var rouletteGuess = "odd"
      } else if(arg[1] === "Odd") {
        var rouletteGuess = "odd"
      } else if(arg[1] === "ODD") {
        var rouletteGuess = "odd"
      } else if(arg[1] === "even") {       //even
        var rouletteGuess = "even"
      } else if(arg[1] === "Even") {
        var rouletteGuess = "even"
      } else if(arg[1] === "EVEN") {
        var rouletteGuess = "even"
      } else if(!arg[1]) {
        respond('Roulette', "Invalid Roulette identifier. Please type a valid Roulette identifier.", message.channel)
        return
      } else if(arg[1] < 0) {
        respond('Roulette', "Invalid Roulette identifier. Please type a valid Roulette identifier.", message.channel)
        return
      } else if(arg[1] > 36) {
        respond('Roulette', "Invalid Roulette identifier. Please type a valid Roulette identifier.", message.channel)
        return
      }
      try {
        if(rouletteGuess === "number"){
          numberComparison()
        } else if(rouletteGuess === "red" || rouletteGuess === "black"){
          colorComparison()
        } else if(rouletteGuess === "odd" || rouletteGuess === "even"){
          evenoddComparison()
        }
        function numberComparison(){
          if(arg[1] === rouletteroll){
            respond('Roulette', "You guessed: " + arg[1] + "\nThe roulette table says: " + rouletteroll + ", " + rouletteColor + ", " + rouletteNumberType +  "\nYou win this one!\nThink carefully before you gamble in real life Vegas.\nThe .roulette command is only a simulation.", message.channel)
            return
          } else {
            respond('Roulette', "You guessed: " + arg[1] + "\nThe roulette table says: " + rouletteroll + ", " + rouletteColor + ", " + rouletteNumberType + "\nYou lose this one.\nIf you want to gamble in Vegas, it's a bad idea for you.", message.channel)
            return
          }
        }
        function colorComparison(){
          if(rouletteGuess === rouletteColor){
            respond('Roulette', "You guessed: " + rouletteGuess + "\nThe roulette table says: " + rouletteroll + ", " + rouletteColor + ", " + rouletteNumberType + "\nYou win this one!\nThink carefully before you gamble in real life Vegas.\nThe .roulette command is only a simulation.", message.channel)
            return
          } else {
            respond('Roulette', "You guessed: " + rouletteGuess + "\nThe roulette table says: " + rouletteroll + ", " + rouletteColor + ", " + rouletteNumberType +  "\nYou lose this one.\nIf you want to gamble in Vegas, it's a bad idea for you.", message.channel)
            return
          }
        }
        function evenoddComparison(){
          if(rouletteGuess === rouletteNumberType){
            respond('Roulette', "You guessed: " + rouletteGuess + "\nThe roulette table says: " + rouletteroll + ", " + rouletteColor + ", " + rouletteNumberType +  "\nYou win this one!\nThink carefully before you gamble in real life Vegas.\nThe .roulette command is only a simulation.", message.channel)
            return
          } else {
            respond('Roulette', "You guessed: " + rouletteGuess + "\nThe roulette table says: " + rouletteroll + ", " + rouletteColor + ", " + rouletteNumberType +  "\nYou lose this one.\nIf you want to gamble in Vegas, it's a bad idea for you.", message.channel)
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