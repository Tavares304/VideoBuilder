	const readline = require('readline-sync')
	const robots = {
		text: require('./robots/text.js')
	}

	function start() {
	const content = {}
	
	content.searchTerm = askAndReturnSearchTerm()
	content.prefix = askAndReturnPrefix()

	robots.text(content)

	function askAndReturnSearchTerm() {
	 return readline.question('Type a Wikipedia search term: ')
	}

	function askAndReturnPrefix() {
		const prefix = ['Who is','What is', 'The hystory of']
		const selectedPrefixIndex = readline.keyInSelect(prefix, 'Choose one option: ')
		const selectedPrefixText = prefix[selectedPrefixIndex]
		
		return selectedPrefixText
	}
	console.log(content)
}


start()
