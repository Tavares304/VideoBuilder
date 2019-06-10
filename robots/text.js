const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey


function robot(content) {
    fetchContentFromWikipedia(content)
    // sanitizeContent(content)
    // breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAutheticated = algorithmia(algorithmiaApiKey)
        const wikipediaAkgorithm = algorithmiaAutheticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAkgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()
        console.log(wikipediaContent)
    }
}

module.exports = robot