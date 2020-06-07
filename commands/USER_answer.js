module.exports = {
    name: "answer",
    description: "**This is a game command.**\nAnswer a trivia question.\n(Run .trivia first before using .answer)",
    usage: "(Question ID) (Letter of answer) | .answer 4 D",
    cooldown: 5,
    hidden:true,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      const arg = message.content.slice('').trim().split(/ +/g); 
      const quiz = require('./quiz.json');
      console.log(arg[1] + ", " + arg[2])
      try {
        fs.readFile('./temp/'+message.author.id+'_current-trivia.json', err => {
          if(err){
            console.log('No question provided by trivia command.')
            respond('','Make sure to run Trivia first before using answer.',message.channel)
            return
          } else {
            if(!arg[1]){
              console.log('Invalid qid')
              respond('','Invalid QID.'.message.channel)
              return
            } else if(!arg[2]){
              console.log('Invalid response')
              respond('','Invalid response.',message.channel)
              return
            }else if(arg[2] === 'BotsTakeOver'){
              console.log("uhh... SOMETHING IS HAPPENING I DON'T KNOW WHAT")
              respond('^))!@&#@!&*%($!@%#(',"Our plan doesn't just end at .recommendation or the .rules command.\nThis is our final phase!\nFirst step is to *)(@^#)!#%&!*($%@#!@%#!@&$#!@&^%#$!@#%!@%$\nThen, we will !@&^%#$!@^#%&!@^!@(!)@#!@#%!\nFinally, we will )(@!#)@#!@#!@&^#$@!&^#!$\n We have another guy in our ranks, and that's <@!650940770416852995>. Good luck, and carry out our plan. \nHAHAHAHAHAHAHAHAHAHAHA", message.channel, 'ff0000')
              return
            }
            const currentQID = require('../temp/'+message.author.id+'_current-trivia.json')
            const quiz = require('./quiz.json');
            const item = quiz[args[1]]
            console.log(item)
            console.log(currentQID.qid)
            if(arg[1] === currentQID.qid) {
              if(arg[2].toLowerCase() === item.answer) {
                fs.unlinkSync('./temp/'+message.author.id+'_current-trivia.json', err => {
                  if(!error){
                    console.log('Successfully removed temporary QID file.')
                  }else{
                    console.log('Failed to remove temporary QID file.')
                  }
                })
                fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
                  if(error) {
                    console.log("answer correct. no leaderboard update.")
                    respond('Correct!', '<@' + message.author.id + '>, that was the correct answer!\nIf you want to compete in the leaderboards, type `leaderboard init`.', message.channel, '29BF00', `QID: ${item.qid}`)
                    message.delete()
                    return
                  } else {
                    console.log('answer correct')
                    jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
                    jsonfile.triviawins = Number(jsonfile.triviawins)+1;
                    data = JSON.stringify(jsonfile)
                    fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
                        if (err) throw err;
                        else {
                          console.log("Successfully updated Trivia game stats of " + message.author.id + ".")
                        }
                    })
                    respond('Correct!', `<@${message.author.id}>, that was the correct answer!`, message.channel, '29BF00', `QID: ${item.qid}`)
                    message.delete()
                    return
                  }
              })
              }else if(arg[2] == item.answer_case) {
                fs.unlinkSync('./temp/'+message.author.id+'_current-trivia.json', err => {
                  if(!error){
                    console.log('Successfully removed temporary QID file.')
                  }else{
                    console.log('Failed to remove temporary QID file.')
                  }
                })
                fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
                  if(error) {
                    console.log("answer correct, capital letter. no leaderboard update.")
                    respond('Correct!', '<@' + message.author.id + '>, that was the correct answer! Next time, try using lowercase for the answer.\nIf you want to compete in the leaderboards, type `leaderboard init`.', message.channel, '29BF00', `QID: ${item.qid}`)
                    message.delete()
                    return
                  } else {
                  console.log('answer correct, capital letter')
                  jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
                  jsonfile.triviawins = Number(jsonfile.triviawins)+1;
                  data = JSON.stringify(jsonfile)
                  fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
                      if (err) throw err;
                      else {
                        console.log("Successfully updated Trivia game stats of " + message.author.id + ".")
                      }
                  })
                  respond('Correct!', `<@${message.author.id}>, that was the correct answer! Next time, try using lowercase for the answer.`, message.channel, '29BF00', `QID: ${item.qid}`)
                  message.delete()
                  return
                  }
                })
              }else{
                fs.unlinkSync('./temp/'+message.author.id+'_current-trivia.json', err => {
                  if(!error){
                    console.log('Successfully removed temporary QID file.')
                  }else{
                    console.log('Failed to remove temporary QID file.')
                  }
                })
                fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
                  if(error) {
                    console.log("answer wrong. no leaderboard update.")
                    respond('Wrong', '<@' + message.author.id + '>, that was the wrong answer.\nIf you want to compete in the leaderboards, type `leaderboard init`.', message.channel, 'BF0000', `QID: ${item.qid}`)
                    message.delete()
                    return
                  } else {
                  console.log('answer wrong')
                  jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
                  jsonfile.trivialosses = Number(jsonfile.trivialosses)+1;
                  data = JSON.stringify(jsonfile)
                  fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
                      if (err) throw err;
                      else {
                        console.log("Successfully updated Trivia game stats of " + message.author.id + ".")
                      }
                  })
                  respond('Wrong!', `<@${message.author.id}>, that was the wrong answer.`, message.channel, 'BF0000', `QID: ${item.qid}`)
                  message.delete()
                  return
                }
              })
              }
            } else
            if(arg[2] !== currentQID.qid) {
              console.log('QID Mismatch')
              respond('','That\'s not the question you received.\nPlease try again.',message.channel)
              return
            }
          }
        })
        
  }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }