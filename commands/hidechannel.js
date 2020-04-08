module.exports = {
  name: 'hide',
  aliases: ['hidechannel', 'invisible'],
  description: 'Hides the channel the command is ran in.',
  cooldown: 0,
  mod:true,
	execute(message, args) {
	const channel = message.channel
    try {
		channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
		message.channel.send('<#'+message.channel+'> was hidden.')
	}
		catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		  
  }}