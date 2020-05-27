module.exports = {
	name:"aiModule1",
	module:1,
	execute(input, author, returnFunction){
		input = input.replace(/\!/g, '').replace(/\?/g, '').replace(/\./g,'')

		if(input == 'why'){
			returnFunction(`Why are we still here? Just to suffer?`)
		} else 
		if(input == 'easter egg'){	
			returnFunction('Oh! You found it! Now, would you like an egg? :egg:')
		} else
		if(input == 'who are you'){
			returnFunction('I am Apple Mod!')
		} else
		//Auto
		if(input != '' && !fs.existsSync(`./aiModule${this.module+1}.js`)){
            returnFunction(`Sorry <@${author.id}>, I don't know how to respond to that...`)
        }
        if(fs.existsSync(`./aiModule${this.module+1}.js`)){
            aiModule = require(`./aiModule${this.module+1}.js`)
            aiModule.execute(input, author, returnFunction)
        }
		}
	}


/*

 if(input == `TEXT`){
			returnFunction(`TEXT`)
		} else

*/