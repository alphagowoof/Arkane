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
		} else if(input == 'how\'s stephanie doing'){
			returnFunction(`UHH :cold_sweat: SHE'S-- SHE'S DOING OK (please don\'t yeet me)`)
		} else if(input == 'yeet'){
			returnFunction(`YEEEEEET`)
		} else 
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