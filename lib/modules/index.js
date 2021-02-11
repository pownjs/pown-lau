const { generateOfParalel } = require('@pown/async/lib/generateOfParalel')

const { listCommonCrawURIs } = require('./commoncraw')
const { listWebArchiveURIs } = require('./webarchive')
const { listAlienvaultURIs } = require('./alianvault')

const sg = async function*(generator) {
    try {
        yield* generator
    }
    catch (e) {}
}

const listURIs = async function*(domain, { safeGenerator = sg, ...options } = {}) {
    for await (let uri of generateOfParalel([listCommonCrawURIs, listWebArchiveURIs, listAlienvaultURIs].map(f => safeGenerator(f(domain, options))))) {
        yield uri
    }
}

module.exports = { listURIs }