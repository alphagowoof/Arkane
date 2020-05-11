module.exports = {
  name: 'repair',
  aliases: ['diagnostics', 'rep', 'diagnose', 'check', 'scan', 'heal', 'revive', 'botdiagnose', 'botdiag'],
  description: '**OWNER ONLY**\nRepairs bot.',
  usage: '<normal/deep>',
	execute(message, args, client) {	
    const Discord = require('discord.js');
    const info = require('../config.json');
    const fs = require("fs")
    const arg = message.content.slice().trim().split(/ +/g);
    try{
      if(message.author.id != info.OwnerID && message.author.id != info.ModeratorRoleID && message.author.id != info.BotManagerRoleID){
        throw 'Incorrect permissions. Bot owner/manager and moderator only.'
      }else{
        if(arg[1] === "normal"){
        respond('♻️ Repair', '`Normal` repair starting...', message.guild.channels.cache.get(info.BotLog))
        botCheckNormal()
        } else if(arg[1] === "Normal"){
        respond('♻️ Repair', '`Normal` repair starting...', message.guild.channels.cache.get(info.BotLog))
        botCheckNormal()
        } else if(arg[1] === "deep"){
        respond('♻️ Repair', '`Deep` repair starting...\n(Deep Repair will take a longer time.)\n[You will know if all files are present or not.]', message.guild.channels.cache.get(info.BotLog))
        botCheckDeep()
        } else if(arg[1] === "Deep"){
        respond('♻️ Repair', '`Deep` repair starting...\n(Deep Repair will take a longer time.)\n[You will know if all files are present or not.]', message.guild.channels.cache.get(info.BotLog))
        botCheckDeep()
        } else if(!arg[1]) {
          respond("♻️ Repair","The check type you typed is undefined.\nEnter 'Normal' for a core file check.\nEnter 'Deep' for an all file check.", message.channel)
        }
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
            doneNormal()
          } else {
            respond('♻️❗ Issue found.', 'The file `runstate.txt` is missing.', message.guild.channels.cache.get(info.BotLog))
            doneNormal()
          }
        });
      }
      function doneNormal(){
      respond('♻️ Normal Repair', "✅ Checks complete.", message.guild.channels.cache.get(info.BotLog))
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
            respond('♻️ Deep Repair','Now scanning bot manager commands...', message.guild.channels.cache.get(info.BotLog))
            botManagerCheck()
          } else {
            respond('♻️❗ Issue found.', 'The file `runstate.txt` is missing.', message.guild.channels.cache.get(info.BotLog))
            respond('♻️ Deep Repair','Now scanning bot manager commands...', message.guild.channels.cache.get(info.BotLog))
            botManagerCheck()
          }
        });
      function botManagerCheck(){
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
    }
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
                      respond('♻️ Deep Repair','✅ Game command `cryptogram` and all other related commands are nominal.', message.guild.channels.cache.get(info.BotLog))
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
                        respond('♻️ Deep Repair','⚠️ All `cryptogram` related commands are missing/broken.', message.guild.channels.cache.get(info.BotLog))
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
          doneDeep()
        } else {
          respond('♻️ Deep Repair', '❗ The game `rolldicegame` is missing.', message.guild.channels.cache.get(info.BotLog))
          doneDeep()
        }
      });
    }
      function doneNormal(){
      respond('♻️ Normal Repair', "✅ Checks complete.", message.guild.channels.cache.get(info.BotLog))
      }
      function doneDeep(){
      respond('♻️ Deep Repair', "✅ Checks complete.", message.guild.channels.cache.get(info.BotLog))
      }

  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}