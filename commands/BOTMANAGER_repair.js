module.exports = {
  name: 'repair',
  aliases: ['diagnostics', 'rep', 'diagnose', 'check', 'scan', 'heal', 'revive', 'botdiagnose', 'botdiag'],
  description: 'Repairs bot.',
  usage: '<normal/deep>',
  cooldown: 20,
  mod:true,
  botmanager:true,
	execute(message, args, client) {	
    const Discord = require('discord.js');
    const info = require('../config.json');
    const fs = require("fs")
    const arg = message.content.slice().trim().split(/ +/g);
    try{
        fs.readFile("./botscan.flag", error => {
          if(!error){
            respond('♻️ Repair', 'A repair has already taken place. Wait for it to finish first.', message.channel)
          } else {
            if(arg[1] === "normal"){
              respond('♻️ Repair', '`Normal` repair starting...', message.guild.channels.cache.get(info.BotLog))
              fs.writeFile("./botscan.flag", "lol", error => {
                if(!error){
                  console.log("Sucessfully made file botscan.flag.")
                  console.log("After 10 seconds of normal scan, you should see botscan.flag deleted.")
                } else {
                  console.log("Failed to make file botscan.flag.")
                }
              });
              botCheckNormal()
              } else if(arg[1] === "Normal"){
              respond('♻️ Repair', '`Normal` repair starting...', message.guild.channels.cache.get(info.BotLog))
              fs.writeFile("./botscan.flag", "lol", error => {
                if(!error){
                  console.log("Sucessfully made file botscan.flag.")
                  console.log("After 10 seconds of normal scan, you should see botscan.flag deleted.")
                } else {
                  console.log("Failed to make file botscan.flag.")
                }
              });
              botCheckNormal()
              } else if(arg[1] === "deep"){
              respond('♻️ Repair', '`Deep` repair starting...\n(Deep Repair will take a longer time.)\n[You will know if all files are present or not.]', message.guild.channels.cache.get(info.BotLog))
              fs.writeFile("./botscan.flag", "lol", error => {
                if(!error){
                  console.log("Sucessfully made file botscan.flag.")
                  console.log("After 45 seconds of deep scan, you should see botscan.flag deleted.")
                } else {
                  console.log("Failed to make file botscan.flag.")
                }
              });
              botCheckDeep()
              } else if(arg[1] === "Deep"){
              respond('♻️ Repair', '`Deep` repair starting...\n(Deep Repair will take a longer time.)\n[You will know if all files are present or not.]', message.guild.channels.cache.get(info.BotLog))
              fs.writeFile("./botscan.flag", "lol", error => {
                if(!error){
                  console.log("Sucessfully made file botscan.flag.")
                  console.log("After 45 seconds of deep scan, you should see botscan.flag deleted.")
                } else {
                  console.log("Failed to make file botscan.flag.")
                }
              });
              botCheckDeep()
              } else if(!arg[1]) {
              respond("♻️ Repair","The check type you typed is undefined.\nEnter 'Normal' for a core file check.\nEnter 'Deep' for an all file check.", message.channel)
              } else {
                respond("♻️ Repair","The check type you typed is undefined.\nEnter 'Normal' for a core file check.\nEnter 'Deep' for an all file check.", message.channel)
              }
          }
        });
        // Normal scan
        function botCheckNormal() {
        fs.readdir("./commands", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `commands` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The `commands` folder is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir("./files", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `files` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The folder `files` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir("./logs", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `logs` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The folder `logs` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir("./node_modules", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `node_modules` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', ' The `node_modules` folder is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./config.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `config.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Fatal issue found.', 'The file `config.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./info.json", error => {
          console.log(error)
          if (!error) {
            respond('', '♻️ℹ️ Information. `info.json` exists and is unused.\nIt will be deleted soon.', message.guild.channels.cache.get(info.BotLog))
          } else {
            console.log('test')
          }
        });
        fs.readFile("./strings.json", error => {
          console.log(error)
          if (!error) {
            respond('', '♻️ℹ️ Information. `strings.json` exists and is unused.\nIt will be deleted soon.', message.guild.channels.cache.get(info.BotLog))
          } else {
            console.log('test')
          }
        });
        fs.readFile("./runstate.txt", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `runstate.txt` exists.', message.guild.channels.cache.get(info.BotLog))
            setTimeout(doneNormal, 10000);
          } else {
            respond('♻️❗ Issue found.', 'The file `runstate.txt` is missing.', message.guild.channels.cache.get(info.BotLog))
            setTimeout(doneNormal, 10000);
          }
        });
      }
      function doneNormal(){
        respond('♻️ Normal Repair', "✅ Checks complete.\nRun `repair` if you see any file missing.", message.guild.channels.cache.get(info.BotLog))
        fs.unlink("./botscan.flag", err => {
          if(!err){
            console.log("Successfully removed botscan.flag")
          } else {
            console.log("Failed to remove botscan.flag. Please remove manually.")
          }
          return
        });
      }
      // Deeeeeeeeeeeep scan
      function botCheckDeep() {
        fs.readdir("./commands", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `commands` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The `commands` folder is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir("./files", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `files` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The folder `files` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir("./logs", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `logs` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The folder `logs` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir("./node_modules", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `node_modules` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', ' The `node_modules` folder is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./config.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `config.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Fatal issue found.', 'The file `config.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./info.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️ℹ️ Information', '`info.json` exists and is unused.\nIt will be deleted soon.', message.guild.channels.cache.get(info.BotLog))
          } else {
            console.log('test')
          }
        });
        fs.readFile("./strings.json", error => {
          console.log(error)
          if (!error) {
            respond('', '♻️ℹ️ Information. `strings.json` exists and is unused.\nIt will be deleted soon.', message.guild.channels.cache.get(info.BotLog))
          } else {
            console.log('test')
          }
        });
        fs.readFile("./runstate.txt", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `runstate.txt` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The file `runstate.txt` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./profanity.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `profanity.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The file `profanity.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./sensitive.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `sensitive.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The file `sensitive.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./rec.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `rec.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The file `rec.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./rules.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `rules.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The file `rules.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./package.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `package.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The file `package.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./package-lock.json", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `package-lock.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The file `package-lock.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile("./events.js", error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `events.js` exists.', message.guild.channels.cache.get(info.BotLog))
            botManagerCheck()
          } else {
            respond('♻️❗ Issue found.', 'The file `events.js` is missing.', message.guild.channels.cache.get(info.BotLog))
            botManagerCheck()
          }
        });
      function botManagerCheck(){
        respond('♻️ Deep Repair','Now scanning bot manager commands...', message.guild.channels.cache.get(info.BotLog))
      fs.readFile("./commands/BOTMANAGER_forceshutdown.js", error => {
         console.log(error)
         if (!error) {
           fs.readFile("./commands/BOTMANAGER_reload.js", error => {
            console.log(error)
             if (!error) {
              fs.readFile("./commands/BOTMANAGER_restart.js", error => {
                 console.log(error)
                if (!error) {
                  fs.readFile("./commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','✅ All bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    } else {
                       respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                       gamesCheckCryptogram()
                    }
                  });
                } else {
                  respond('♻️❗ Issue found.', 'Bot manager command `restart` is missing.', message.guild.channels.cache.get(info.BotLog))
                  fs.readFile("./commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    } else {
                      respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                }
              });
            }
          });
            } else {
              respond('♻️❗ Issue found.', 'Bot manager command `reload` is missing.', message.guild.channels.cache.get(info.BotLog))
              fs.readFile("./commands/BOTMANAGER_restart.js", error => {
                console.log(error)
                if (!error) {
                  fs.readFile("./commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                     if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    } else {
                      respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    }
                  });
                } else {
                  respond('♻️❗ Issue found.', 'Bot manager command `restart` is missing.', message.guild.channels.cache.get(info.BotLog))
                  fs.readFile("./commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                     if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    } else {
                      respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    }
                  });
                }
               });
              }
            });
        } else {
          respond('♻️❗ Issue found.', 'Bot manager command `forceshutdown` is missing.', message.guild.channels.cache.get(info.BotLog))
          fs.readFile("./commands/BOTMANAGER_reload.js", error => {
            console.log(error)
             if (!error) {
              fs.readFile("./commands/BOTMANAGER_restart.js", error => {
                console.log(error)
                if (!error) {
                  fs.readFile("./commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                     } else {
                      respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    }
                  });
                } else {
                  respond('♻️❗ Issue found.', 'Bot manager command `restart` is missing.', message.guild.channels.cache.get(info.BotLog))
                  fs.readFile("./commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                     } else {
                      respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    }
                  });
                }
              });
            } else {
              respond('♻️❗ Issue found.', 'Bot manager command `reload` is missing.', message.guild.channels.cache.get(info.BotLog))
              fs.readFile("./commands/BOTMANAGER_restart.js", error => {
                console.log(error)
                if (!error) {
                  fs.readFile("commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                     } else {
                      respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    }
                  });
                } else {
                  respond('♻️❗ Issue found.', 'Bot manager command `restart` is missing.', message.guild.channels.cache.get(info.BotLog))
                  fs.readFile("./commands/BOTMANAGER_status.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some bot manager commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                     } else {
                      respond('♻️❗ Issue found.', 'Bot manager command `status` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','❗ All bot manager commands are missing/broken.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckCryptogram()
                    }
                  });
                }
              });
            }
          });
         }
        }
        );
      }}
    function gamesCheckCryptogram(){
      respond('♻️ Deep Repair','Now scanning game commands...', message.guild.channels.cache.get(info.BotLog))
      fs.readFile("./commands/USER_cryptogram.js", error => {
        console.log(error)
        if (!error) {
          fs.readFile("./commands/crypt.json", error => {
            console.log(error)
            if (!error) {
              fs.readFile("./commands/USER_decrypt.js", error => {
                console.log(error)
                if (!error) {
                  fs.readFile("./commands/USER_decrypthint.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','✅ Game command `cryptogram` and all other related commands/files are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    } else {
                      respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    }
                  });
                } else {
                  respond('♻️❗ Issue found.', 'The `decrypt` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                  fs.readFile("./commands/USER_decrypthint.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    } else {
                      respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    }
                  });
                }
              });
            } else {
              respond('♻️❗ Issue found.', 'The `crypt.json` file for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
              fs.readFile("./commands/USER_decrypt.js", error => {
                console.log(error)
                if (!error) {
                  fs.readFile("./commands/USER_decrypthint.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    } else {
                      respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    }
                  });
                  
                } else {
                  respond('♻️❗ Issue found.', 'The `decrypt` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                  fs.readFile("./commands/USER_decrypthint.js", error => {
                    console.log(error)
                    if (!error) {
                      respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    } else {
                      respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                      respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                      gamesCheckRollDiceGame()
                    }
                  });
                }
              });
            }
          });
        } else {
          respond('♻️❗ Issue found.', 'The `cryptogram` core game command is missing.', message.guild.channels.cache.get(info.BotLog))
          fs.readFile("./commands/crypt.json", error => {
            console.log(error)
            if (!error) {
              if (!error) {
                fs.readFile("./commands/USER_decrypt.js", error => {
                  console.log(error)
                  if (!error) {
                    fs.readFile("./commands/USER_decrypthint.js", error => {
                      console.log(error)
                      if (!error) {
                        respond('♻️ Deep Repair','Game command `cryptogram` and all other related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      } else {
                        respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                        respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      }
                    });
                  } else {
                    respond('♻️❗ Issue found.', 'The `decrypt` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                    fs.readFile("./commands/USER_decrypthint.js", error => {
                      console.log(error)
                      if (!error) {
                        respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      } else {
                        respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                        respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      }
                    });
                  }
                });
              } else {
                respond('♻️❗ Issue found.', 'The `crypt.json` file for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                fs.readFile("./commands/USER_decrypt.js", error => {
                  console.log(error)
                  if (!error) {
                    fs.readFile("./commands/USER_decrypthint.js", error => {
                      console.log(error)
                      if (!error) {
                        respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      } else {
                        respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                        respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      }
                    });
                  } else {
                    respond('♻️❗ Issue found.', 'The `decrypt` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                    fs.readFile("./commands/USER_decrypthint.js", error => {
                      console.log(error)
                      if (!error) {
                        respond('♻️ Deep Repair','⚠️ Some `cryptogram` related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      } else {
                        respond('♻️❗ Issue found.', 'The `decrypthint` game command for `cryptogram` is missing.', message.guild.channels.cache.get(info.BotLog))
                        respond('♻️ Deep Repair','❗ All `cryptogram` related commands/files are missing/broken.', message.guild.channels.cache.get(info.BotLog))
                        gamesCheckRollDiceGame()
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
    function gamesCheckRollDiceGame(){
      fs.readFile("./commands/USER_rolldicegame.js", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The game `rolldicegame` is nominal.', message.guild.channels.cache.get(info.BotLog))
          gamesCheckTrivia()
        } else {
          respond('♻️❗ Issue found.', 'The game `rolldicegame` is missing.', message.guild.channels.cache.get(info.BotLog))
          gamesCheckTrivia()
        }
      });
    }
    function gamesCheckTrivia(){
      fs.readFile("./commands/USER_trivia.js", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The core game command `trivia` is nominal.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The core game command `trivia` is missing.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readFile("./commands/USER_answer.js", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The `answer` game command for `trivia` is nominal.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The `answer` game command for `trivia` is missing.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readFile("./commands/quiz.json", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The `quiz.json` file for `trivia` is nominal.', message.guild.channels.cache.get(info.BotLog))
          deepScanNHIE()
        } else {
          respond('♻️❗ Issue found.', 'The `quiz.json` file for `trivia` is missing.', message.guild.channels.cache.get(info.BotLog))
          deepScanNHIE()
        }
      });
    }
    function deepScanNHIE(){
      fs.readFile("./commands/USER_neverhaveiever.js", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The core game command `neverhaveiever` is nominal.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The core game command `neverhaveiever` is missing.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readFile("./commands/USER_neverdonethat.js", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The `neverdonethat` game command for `neverhaveiever` is nominal.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The `neverdonethat` game command for `neverhaveiever` is missing.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readFile("./commands/USER_donethat.js", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The `donethat` game command for `neverhaveiever` is nominal.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The `donethat` game command for `neverhaveiever` is missing.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readFile("./commands/never.json", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The `never.json` file for `neverhaveiever` is nominal.', message.guild.channels.cache.get(info.BotLog))
          deepScanNodeMods()
        } else {
          respond('♻️❗ Issue found.', 'The `never.json` file for `neverhaveiever` is missing.', message.guild.channels.cache.get(info.BotLog))
          deepScanNodeMods()
        }
      });
    }
    function deepScanNodeMods() {
      respond('♻️ Deep Repair', 'Now scanning all folders in `node_modules`...', message.guild.channels.cache.get(info.BotLog))
      fs.readdir("./node_modules/@discordjs", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `@discordjs` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `@discordjs` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/@opencensus", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `@opencensus` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `@opencensus` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/@pm2", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `@pm2` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `@pm2` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/@types", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `@types` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `@types` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/abbrev", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `abbrev` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `abbrev` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/abort-controller", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `abort-controller` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `abort-controller` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/agent-base", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `agent-base` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `agent-base` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/amp", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `amp` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `amp` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/amp-message", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `amp-message` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `amp-message` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/ansi-colors", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `ansi-colors` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `ansi-colors` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/ansi-regex", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `ansi-regex` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `ansi-regex` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/ansi-styles", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `ansi-styles` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `ansi-styles` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/anymatch", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `anymatch` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
        } else {
          respond('♻️❗ Issue found.', 'The folder `anymatch` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
        }
      });
      fs.readdir("./node_modules/aproba", error => {
        console.log(error)
        if (!error) {
          respond('♻️ Deep Repair', '✅ The folder `aproba` inside `node_modules` exists.', message.guild.channels.cache.get(info.BotLog))
          setTimeout(doneDeep, 45000);
        } else {
          respond('♻️❗ Issue found.', 'The folder `aproba` inside `node_modules` does not exist.', message.guild.channels.cache.get(info.BotLog))
          setTimeout(doneDeep, 45000);
        }
      });
    }
    function doneDeep(){
      respond('♻️ Deep Repair', "✅ Checks complete.\nRun `repair` if you see any file missing.", message.guild.channels.cache.get(info.BotLog))
      fs.unlink("./botscan.flag", err => {
        if(!err){
          console.log("Successfully removed botscan.flag")
        } else {
          console.log("Failed to remove botscan.flag. Please remove manually.")
        }
        return
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