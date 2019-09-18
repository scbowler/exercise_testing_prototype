const { promisify } = require('util');
const parseReport = require('./parse-report');
const execFile = promisify(require('child_process').execFile);
const TIMEOUT_EXCEEDED = 'Timeout Exceeded';
const CHALLENGE_FAILED = 'Challenge Failed!';
const runner = 'runner.js';

module.exports = async function verify({ solution, testSuite }) {
    try {
        const execArgs = [runner, solution + '\n\n' + testSuite]
        const { stdout } = await execFile('node', execArgs, { timeout: 3000 })
        return { error: null, report: parseReport(stdout) }
    }
    catch (err) {
        if (err.killed) {
            return { error: TIMEOUT_EXCEEDED, report: null }
        }
        return {
            error: err.stderr || CHALLENGE_FAILED,
            report: err.stderr ? null : parseReport(err.stdout)
        }
    }
}

// const test = {
//     solution: 'var names = "Tim"',
//     testSuite: `describe('The "name" variable', function(){
//         it('should be set to a string', function(){
//             expect(name).to.be.a('string');
//         });
//     });`
// }

// async function run(){
//     const result = await verify(test);

//     console.log('RESULT:', result.report.failures);
// }

// run();
