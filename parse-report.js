const isEmpty = require('lodash/isEmpty');
const groupBy = require('lodash/groupBy');
const isUndefined = require('lodash/isUndefined');

function formatTest({ duration, err, ...test }) {
    return {
        ...test,
        isPending: isUndefined(duration),
        err: isEmpty(err) ? null : formatError(err)
    }
}

function formatError({ message, stack }) {
    return {
        message,
        stack: stack.replace(/\s{2,}.+/g, '')
    }
}

module.exports = function parseReport(report) {
    if (!report) return null
    const parsed = JSON.parse(report)
    return {
        stats: parsed.stats,
        failures: parsed.failures.map(formatTest),
        tests: groupBy(parsed.tests.map(formatTest), ({ title, fullTitle }) =>
            fullTitle.replace(title, '').trim()
        )
    }
}
