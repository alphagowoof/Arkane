module.exports = {
	name: 'restrict',
	description: 'Restricts a user.',
	aliases: ['restraint'],
	usage: '<user> <1/2/3/4> <reason>',
	cooldown: 0,
	mod:true,
	essential:true,
	execute(message, args, client) {
		try{
        var userToBeRestricted = message.mentions.members.first();
        mentionedUser = message.mentions.members.first()
        if(!mentionedUser){
            respond('', 'User mention was not found.', message.channel)
            return;
        }
        const {ModeratorRoleID} = require('../config.json');
		function restrictLevel1(){
            const rolename = 'Restricted (Level 1)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
            let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
            var reason = reasonraw.join(' ')
            var splicedreason = reason.substr(2)
            if(!splicedreason){
                respond('🚫 Restrict','Please give reasons when restricting.',message.channel)
                return
            }
            member.roles.add([role]).then(
            respond('🚫 Restrict','⬛▪️▪️▪️\nRestricted Level 1 has been imposed on <@'+userToBeRestricted+'>.\nReason: '+splicedreason,message.channel),
            respond('🚫 Restricted','Level 1 Restriction was imposed on you.\nReason: '+splicedreason,userToBeRestricted)
            )
            modaction(this.name, message.author.tag, message.channel.name, message.content, message)
            return
		}
		function restrictLevel2(){
            const rolename = 'Restricted (Level 2)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
            let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
            var reason = reasonraw.join(' ')
            var splicedreason = reason.substr(2)
            if(!splicedreason){
                respond('🚫 Restrict','Please give reasons when restricting.',message.channel)
                return
            }
            member.roles.add([role]).then(
            respond('🚫 Restrict','▪️⬛▪️▪️\nRestricted Level 2 has been imposed on <@'+userToBeRestricted+'>.\nReason: '+splicedreason,message.channel),
            respond('🚫 Restricted','Level 2 Restriction was imposed on you.\nReason: '+splicedreason,userToBeRestricted)
            )
            modaction(this.name, message.author.tag, message.channel.name, message.content, message)
            return
		}
		function restrictLevel3(){
            const rolename = 'Restricted (Level 3)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
            let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
            var reason = reasonraw.join(' ')
            var splicedreason = reason.substr(2)
            if(!splicedreason){
                respond('🚫 Restrict','Please give reasons when restricting.',message.channel)
                return
            }
            member.roles.add([role]).then(
            respond('🚫 Restrict','▪️▪️⬛▪️\nRestricted Level 3 has been imposed on <@'+userToBeRestricted+'>.\nReason: '+splicedreason,message.channel),
            respond('🚫 Restricted','Level 3 Restriction was imposed on you.\nReason: '+splicedreason,userToBeRestricted)
            )
            modaction(this.name, message.author.tag, message.channel.name, message.content, message)
            return
        }
        function restrictLevel4(){
            const rolename = 'Restricted (Level 4)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
            let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
            var reason = reasonraw.join(' ')
            var splicedreason = reason.substr(2)
            if(!splicedreason){
                respond('🚫 Restrict','Please give reasons when restricting.',message.channel)
                return
            }
            member.roles.add([role]).then(
            respond('🚫 Restrict','▪️▪️▪️⬛\nRestricted Level 4 has been imposed on <@'+userToBeRestricted+'>.\nReason: '+splicedreason,message.channel),
            respond('🚫 Restricted','Level 4 Restriction was imposed on you.\nReason: '+splicedreason,userToBeRestricted)
            )
            modaction(this.name, message.author.tag, message.channel.name, message.content, message)
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
