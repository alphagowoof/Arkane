module.exports = {
  name: 'news',
  aliases: ['newsletter','changelog'],
  description: 'Shows new features and more about Apple Mod',
  usage: '',
  cooldown: 0,
  execute(message, args, client) {
    const fs = require('fs');
    try {
    if(fs.existsSync('./files/news.json')){
        data = []

        const newsData = require('../files/news.json')
        const config = require('../config.json')
        if(args[0] == '--raw' && message.member.roles.cache.some(role => role.id === `${config.BotManagerRoleID}`)){
          const newsEmbed = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle('News')
          .setDescription(fs.readFileSync('./files/news.json'))
          if(newsEmbed.description.length > 6000){
            newsEmbed.setDescription('Data too long!')
          }
          newsEmbed.setTimestamp()
          return message.channel.send(newsEmbed)
        }
        if(!newsData.visible && newsData.visible != false || !newsData.title || !newsData.date || !newsData.content){
          const newsEmbed = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle('News')
          .setDescription("⚠️ Warning: Invalid news data!")
          .setTimestamp()
          return message.channel.send(newsEmbed)
        }
        if(newsData.visible == true){

        data.push(newsData.title)
        data.push(newsData.date)
        data.push(newsData.author)
        data.push("---------------------------------------------------------------------")
        data.push(newsData.content)
        data.join('\n')
        const newsEmbed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('News')
        .setDescription(data)
        .setTimestamp()
        message.channel.send(newsEmbed)
        }else{
          const newsEmbed = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle('News')
          .setDescription("No news available.")
          .setTimestamp()
          message.channel.send(newsEmbed)
        }
      }else{
        const newsEmbed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('News')
        .setDescription("No news available.")
        .setTimestamp()
        message.channel.send(newsEmbed)
      }
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }

  }}