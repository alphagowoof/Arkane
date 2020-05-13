module.exports = {
  name: 'entersafemode',
  aliases: ['safemode'],
  description: 'Enters safe mode.',
  mod:true,
  botmanager:true,
  essential:true,
	execute(message, args, client) {
      try {
      safemode = true
      });      }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}