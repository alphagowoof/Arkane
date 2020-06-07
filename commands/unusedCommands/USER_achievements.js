module.exports = {
    name: 'achievements',
    aliases: ['trophy','medal','awards'],
    description: '**This is a game command.**\nStill competitive? Flex your award room with this command!\n**Start by typing `.achievements init`!**\n**Want to start over? Type `.leaderboard wipe`.**',
    usage: '',
    cooldown: 0,
    hidden: true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      const arg = msg.content.slice('').trim().split(/ +/g);
      const lbStats = require('../leaderboards/' + message.author.id + "_gamestats.json")
      try {
         if(arg[1] === 'init'){
            fs.readFile('./leaderboards/' + message.author.id + '_achievements.json', err => {
                if(err) {
                    fs.writeFile('./leaderboards/' + message.author.id + '_achievements.json', JSON.stringify({
                        "trivia1" : false, 
                        "trivia2" : false,
                        "trivia3" : false,
                        "trivia_all" : false,
                        "crypt1" : false, 
                        "crypt2" : false,
                        "crypt3" : false,
                        "crypt_all" : false,
                        "casino1minor" : false, 
                        "casino1major" : false,
                        "casino2minor" : false,
                        "casino2major" : false,
                        "casino3minor" : false, 
                        "casino3major" : false,
                        "casinototal1" : false,
                        "casinototal2" : false,
                        "casinototal3" : false,
                        "casinoall" : false,
                        "awardall" : false,
                        "hasAchievements" : false
                    }), (err) => {if(err)console.log(err)});
                    console.log(message.author.tag + " has an award room ready.");
                    respond('🏆 Game Achievements', 'Your Achievements data has been initialized.\nGo flex your achievements with other members in the server!' , message.channel);
                    return;
                }else {
                    console.log(message.author.tag + " already has an award room!");
                    respond('🏆 Game Achievements', 'You already have Achievements data!' , message.channel)
                    return
                }
            })
          }
          if(arg[1] === 'wipe'){
            console.log("If you see this message and nothing is under it, check code!")
            fs.readFile('./leaderboards/' + message.author.id + '_achievements.json', err => {
                console.log(err)
                if(!err) {
                    fs.unlinkSync('./leaderboards/' + message.author.id + '_achievements.json', err)
                    console.log(message.author.tag + " burned down their award room.")
                            respond('🏆 Game Achievements', 'Your Achievements stats have been successfully wiped.', message.channel);
                            return
                } else {
                    respond('🏆 Game Achievements', 'Your Achievements stats do not exist.\nType `achievements init` to start flexing your achievements with other members in the server!', message.channel);
                    return
                }
             })
          } else if(arg[1] === 'info'){
            respond('🏆 About Game Achievements', 'Version: 1.0.1 build 011\nAuthors: Nolan Trevor/Thomas Stefanos' , message.channel)
            return
          } else if(!arg[1]){
        fs.readFile('./leaderboards/' + message.author.id + '_achievements.json', error => {
            if (!error) {

            console.log("Successfully loaded achievement stats of " + message.author.tag + ".")
              respond('🏆 Game Achievements',message.author.tag+', here are your achievement stats:', message.channel)
              const achievements = require('../leaderboards/' + message.author.id + '_achievements.json')
              if(achievements.hasAchievements === false){
                respond('','That\'s weird... You don\'t have any!\nGo play some games to get achievements!', message.channel)
                return
              } else {
                //respond('','This part will be coded soon!', message.channel)
                respond('','__***Trivia achievements:***__\n', message.channel)
              }
            } else if(error) {
              respond('🏆 Game Achievements', 'Your Achievements stats do not exist.\nType `achievements init` to start flexing your achievements with other members in the server!', message.channel);
              return;
            }
          });
        }
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }

