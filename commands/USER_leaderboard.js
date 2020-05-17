module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'gamelb', 'rank', 'gamerank'],
    description: '**This is a game command.**\nFeeling competitive? Check who\'s on top with this command!\n**MAKE SURE TO RUN THIS COMMAND WITH ARGUMENT "INIT" BEFORE RUNNING ANY GAME COMMAND.**',
    usage: 'init (if using it for the first time)',
    cooldown: 0,
    hidden: true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      const arg = message.content.slice('').trim().split(/ +/g); 
      try {
         if(arg[1] === 'init'){
            fs.readFile('./leaderboards/' + message.author.tag + '_gamestats.json', err => {
                if(err) {
                    fs.writeFile('./leaderboards/' + message.author.tag + '_gamestats.json', JSON.stringify({
                        "triviawins" : "0", 
                        "trivialosses" : "0"
                    }), (err) => {if(err)console.log(err)});
                    console.log(message.author.tag + " is ready to compete.");
                    respond('🎮 Game Leaderboard', 'Your Leaderboard data has been initialized.\nGo compete with other members in the server!' , message.channel);
                    return;
                }else {
                    console.log(message.author.tag + " is already competing!");
                    respond('🎮 Game Leaderboard', 'You already have Leaderboard data!' , message.channel)
                    return
                }
            })
          } else if(!arg[1]){
        fs.readFile('./leaderboards/' + message.author.tag + '_gamestats.json', error => {
            if (!error) {
                const reader = new FileReader();
                reader.readAsText('./leaderboards/' + message.author.tag + '_gamestats.json');
                reader.onload = () => {
                  callback(reader.result);
                };
                console.log(gamestats.triviawins)
                console.log(gamestats.trivialosses)
              respond('🎮 Game Leaderboard', 'Trivia correct answers: ' + tWins + "\nTrivia wrong answers:" + tLosses , message.channel);
              return;
            } else if(error) {
              respond('🎮 Game Leaderboard', 'Your Leaderboard stats do not exist.\nType `leaderboard init` to start competing with other members in the server!', message.channel);
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