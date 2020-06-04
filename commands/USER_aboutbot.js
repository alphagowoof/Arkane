module.exports = {
  name: 'aboutbot',
  aliases: ['botinfo', 'infobot', 'botabout',],
  description: 'Gets information about bot.',
  usage: '',
  cooldown: 0,
	execute(message, args, client) {
    const fs = require('fs');
    try {
      const member = client.user
      const icon = member.displayAvatarURL({ dynamic: true })
      const name = client.user.username
      const AvatarEmbed = new Discord.MessageEmbed()
      .setTitle('About '+name )
      .addFields(
        { name: 'Version', value: version, inline: false },
        { name: 'Codename', value: codename, inline: false },
        { name: 'Creator', value: `[Freshman Devs](https://github.com/Freshman-Devs/)`, inline:false},
        { name: 'Source', value: `[GitHub](https://github.com/Freshman-Devs/Apple-Explained-Moderation-Bot)`, inline: false },
        { name: 'Written in', value: '[Discord.JS](https://discord.js.org/)', inline: false },
        
			)
      .setThumbnail(`${icon}`)
      message.channel.send(AvatarEmbed)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
  }}