const Mocha = require('mocha')
const { VM } = require('vm2')
const { expect } = require('chai')

const mocha = new Mocha({ reporter: 'json' })
const sandbox = { expect }

mocha.suite.emit('pre-require', sandbox, ':challenge:', mocha)

try {
    const vm = new VM({ sandbox })
    const [, , challenge] = process.argv
    const script = vm.run(challenge, 'challenge.js')
    mocha.suite.emit('require', script, ':challenge:', mocha)
    mocha.suite.emit('post-require', sandbox, ':challenge:', mocha)
    mocha.run(failures => failures && process.exit(1))
}
catch (err) {
    process.stderr.write(formatError(err))
    process.exit(1)
}

function formatError({ name, stack, message }) {
    return [
        `${name}: ${message}\n `,
        ...stack.split(/\s{2,}/)[0].split('\n').slice(1)
    ].join('\n').trim()
}
