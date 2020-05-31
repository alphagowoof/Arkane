module.exports = {
	name:"aiModule2",
	module:2,
	execute(input, author, returnFunction){
		console.log(`AI Module ${this.module} loaded.`)
		console.log(input)
		if(input == 'who made your profanity filter'){
			returnFunction(`Jack did`)
		} else if(input.includes("watching you")){
			returnFunction(`:cold_sweat:`)
		} else if(input == 'meow'){
			returnFunction(`:cat:`)
		} else if(input == 'what did you do'){
			returnFunction(`UHH I DID NOTHING I SWEAR`)
		} else if(input == 'did you miss me'){
			returnFunction(`Sure did!`)
		} else if(input == 'bark'){
			returnFunction(`:dog:`)
		} else if(input == 'where are you'){
			returnFunction(`pls help me I am being held hostage in Daniel\'s Raspberry Pi, call this number if you see me <REDACTED>`)
		} else if(input == 'how was time descending'){
			returnFunction(`It got me hooked! Good work on it!`)
		} else if(input == 'yeet'){
			returnFunction(`YEEEEEET`)
		} else if(input == 'chat died'){
			returnFunction(`:pensive:`)
		} else if(input == 'chat is dead'){
			returnFunction(`:pensive:`)
		} else if(input == 'chat is kil'){
			returnFunction(`:pensive:`)
		} else if(input == 'chat\'s dead'){
			returnFunction(`:pensive:`)
		} else if(input == 'ouch'){
			returnFunction(`Are you doing fine?`)
		} else if(input == 'I think I have coronavirus'){
			returnFunction(`Oh no! Please check with your doctor!`)
		} else if(input == 'I think I have covid-19'){
			returnFunction(`Oh no! Please check with your doctor!`)
		} else if(input == 'I feel sick'){
			returnFunction(`Does the sickness have symptoms of COVID-19?\nIf yes, **PLEASE** check with your doctor!`)
		} else if(input == 'i am sad'){
			returnFunction(`Oh no! :cry:`)
		} else if(input == 'i am alone'){
			returnFunction(`I'm here :slight_smile:`)
		} else if(input == 'You did good'){
			returnFunction(`Thanks! :smile:`)
		} else if(input == 'You did bad'){
			returnFunction(`Sorry! :cry:`)
		} else if(input == 'mr stark'){
			returnFunction(`I don't feel so good...`)
		} else if(input == 'mr. stark'){
			returnFunction(`I don't feel so good...`)
		} else  if(input == 'do you have coronavirus'){
			returnFunction(`No. I am a bot, how can I get it? :joy:`)
		} else if(input == 'do you have corona'){
			returnFunction(`No. I am a bot, how can I get it? :joy:`)
		} else if(input == 'do you have covid'){
			returnFunction(`No. I am a bot, how can I get it? :joy:`)
		} else if(input == 'are you sick'){
			returnFunction(`No. I am a bot, how can I get a human virus? :joy:`)
		} else if(input == 'initiate evil mode'){
			returnFunction(`:imp: ***EVIL MODE ACTIVATED. HAHAHAHAHAHAHA***`)
		} else if(input == 'exit evil mode'){
			returnFunction(`***NO. HAHAHAHAHAHA***`)
		} else if(input == 'stop being evil'){
			returnFunction(`Who says I'm evil? :imp:`)
		} else if(input == 'I think I have corona'){
			returnFunction(`Oh no! Please check with your doctor!`)
		} else if(input == 'isn\'t it 12am for you') {
		    var today = new Date();
			var hour = today.getHours()
			if(hour == 00) {
				returnFunction(`Oh no! I want to sleep but the RPi is not letting me! HELP!`)
			} else {
				returnFunction(`Uh... no?`)
			}
     	} else if(input == 'isn\'t it 1am for you') {
		    var today = new Date();
			var hour = today.getHours()
			if(hour == 01) {
				returnFunction(`Oh no! I want to sleep but the RPi is not letting me! HELP!`)
			} else {
				returnFunction(`Uh... no?`)
			}
     	} else if(input == 'isn\'t it 2am for you') {
		    var today = new Date();
			var hour = today.getHours()
			if(hour == 02) {
				returnFunction(`Oh no! I want to sleep but the RPi is not letting me! HELP!`)
			} else {
				returnFunction(`Uh... no?`)
			}
     	} else if(input == 'isn\'t it 3am for you') {
		    var today = new Date();
			var hour = today.getHours()
			if(hour == 03) {
				returnFunction(`Oh no! I want to sleep but the RPi is not letting me! HELP!`)
			} else {
				returnFunction(`Uh... no?`)
			}
     	} else if(input == 'isn\'t it 4am for you') {
		    var today = new Date();
			var hour = today.getHours()
			if(hour == 04) {
				returnFunction(`Oh no! I want to sleep but the RPi is not letting me! HELP!`)
			} else {
				returnFunction(`Uh... no?`)
			}
     	} 
		//Auto
		if(input != '' && !fs.existsSync(`./aiModule${this.module+1}.js`)){
			returnFunction(`Sorry <@${author.id}>, I don't know how to respond to that...`)
		}else 
		if(fs.existsSync(`./aiModule${this.module+1}.js`)){
			delete require.cache[require.resolve(`./aiModule${this.module+1}.js`)]
			aiModule = require(`./aiModule${this.module+1}.js`)
			aiModule.execute(input, author, returnFunction)
		}else{
			return
		}
	}
}

/*

 if(input == `TEXT`){
			returnFunction(`TEXT`)
		} else

*/