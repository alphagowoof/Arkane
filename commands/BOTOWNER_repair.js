module.exports = {
  name: 'repair',
  aliases: ['diagnostics', 'rep', 'diagnose', 'check'],
  description: '**OWNER ONLY**\nRepairs bot.',
	execute(message, args, client) {	
    const Discord = require('discord.js');
    const info = require('../config.json');
    const fs = require("fs")
    var commandsFolderPath = "./commands"   // Daniel, enter your directory here, I'm using my MacBook directory
    var filesFolderPath = "./files"
    var logsFolderPath = "./logs"
    var nodemodulesFolderPath = "./node_modules"
    var configFilePath = "./config.json"
    var infoFilePath = "./info.json"
    var stringsFilePath = "./strings.json"
    var runstateFilePath = "./runstate.txt"
    try{
      if(message.author.id != info.OwnerID){
        throw 'Incorrect permissions. Bot owner only.'
      }else{
        botCheck()
        function botCheck() {
        fs.readdir(commandsFolderPath, error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `commands` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', 'The `commands` folder is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir(filesFolderPath, error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `files` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The folder `files` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir(logsFolderPath, error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `logs` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️⚠️ Possible issue found.', 'The folder `logs` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readdir(nodemodulesFolderPath, error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The `node_modules` folder exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Issue found.', ' The `node_modules` folder is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile(configFilePath, error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `config.json` exists.', message.guild.channels.cache.get(info.BotLog))
          } else {
            respond('♻️❗ Fatal issue found.', 'The file `config.json` is missing.', message.guild.channels.cache.get(info.BotLog))
          }
        });
        fs.readFile(infoFilePath, error => {
          console.log(error)
          if (!error) {
            respond('', '♻️ℹ️ Information. `info.json` exists and is unused.\nIt will be deleted soon.', message.guild.channels.cache.get(info.BotLog))
          } else {
            console.log('test')
          }
        });
        fs.readFile(stringsFilePath, error => {
          console.log(error)
          if (!error) {
            respond('', '♻️ℹ️ Information. `strings.json` exists and is unused.\nIt will be deleted soon.', message.guild.channels.cache.get(info.BotLog))
          } else {
            console.log('test')
          }
        });
        fs.readFile(runstateFilePath, error => {
          console.log(error)
          if (!error) {
            respond('♻️✅ Check passed.', 'The file `runstate.txt` exists.', message.guild.channels.cache.get(info.BotLog))
            done()
          } else {
            respond('♻️❗ Issue found.', 'The file `runstate.txt` is missing.', message.guild.channels.cache.get(info.BotLog))
            done()
          }
        });
      }
      function done(){
      respond('♻️ Repair', "✅ Checks complete.", message.guild.channels.cache.get(info.BotLog))
      }
  }
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}