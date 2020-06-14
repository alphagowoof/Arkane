module.exports = {
	name: 'restrict',
	description: 'Restricts a user.',
	aliases: ['restraint'],
	usage: '<1/2/3/4>',
	cooldown: 0,
	mod:true,
	essential:true,
	execute(message, args, client) {
		try{
        var userToBeRestricted = message.mentions.members.first();
		function restrictLevel1(){
            respond('🚫 Restrict','⬛▪️▪️▪️\nRestricted Level 1 has been imposed on <@'+userToBeRestricted+'>.\nReason: Not programmed yet, Daniel please help',message.channel)
            respond('🚫 Restricted','Level 1 Restriction was imposed on you.\nReason: Not programmed yet, Daniel please help',userToBeRestricted)
            return
		}

		function restrictLevel2(){
            respond('🚫 Restrict','▪️⬛▪️▪️\nRestricted Level 2 has been imposed on <@'+userToBeRestricted+'>.\nReason: Not programmed yet, Daniel please help',message.channel)
            respond('🚫 Restricted','Level 2 Restriction was imposed on you.\nReason: Not programmed yet, Daniel please help',userToBeRestricted)
            return
		}

		function restrictLevel3(){
            respond('🚫 Restrict','▪️▪️⬛▪️\nRestricted Level 3 has been imposed on <@'+userToBeRestricted+'>.\nReason: Not programmed yet, Daniel please help',message.channel)
            respond('🚫 Restricted','Level 3 Restriction was imposed on you.\nReason: Not programmed yet, Daniel please help',userToBeRestricted)
            return
        }
        
        function restrictLevel4(){
            respond('🚫 Restrict','▪️▪️▪️⬛\nRestricted Level 4 has been imposed on <@'+userToBeRestricted+'>.\nReason: Not programmed yet, Daniel please help',message.channel)
            respond('🚫 Restricted','Level 4 Restriction was imposed on you.\nReason: Not programmed yet, Daniel please help',userToBeRestricted)
            return
		}
		console.log(args[1])
		if(args[1] && args[1] == '1'){
			restrictLevel1()
		}else if(args[1] && args[1] == '2'){
			restrictLevel2()
		}else if(args[1] && args[1] == '3'){
			restrictLevel3()
		}else if(args[1] && args[1] == '4'){
			restrictLevel4()
		}else{
            respond('🚫 Restrict','Please choose a level from 1-4.',message.channel)
            return
        }

	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
	}
	
};
