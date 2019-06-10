const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey


async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    // breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAutheticated = algorithmia(algorithmiaApiKey)
        const wikipediaAkgorithm = algorithmiaAutheticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAkgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()
        
        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content) {
        const withoutBlankLines = removeBlankLines(content.sourceContentOriginal)
        const withoutMarkdown = removeMarkdown(withoutBlankLines)
        console.log(withoutMarkdown)

        function removeBlankLines(text) {
            const allLines = text.split('\n')
            
            const withoutBlankLines = allLines.filter((line) => {
                if (line.trim().length === 0) {
                    return false
                }

                return true
            })

            return withoutBlankLines
        }
    }

    function removeMarkdown(lines) {
        const withoutMarkdown = lines.filter((lines) => {
            if (lines.trim().startsWith('=')) {
                return false
            }

            return true
        })

        return withoutMarkdown
    }
}

module.exports = robot