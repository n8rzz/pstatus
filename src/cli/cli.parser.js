const minimist = require('minimist');

class CliParser {
    constructor() {
        this._args = minimist(process.argv.slice(2));
    }

    getFlag(flag) {
        if (typeof this._args[flag] === 'undefined') {
            return false;
        }

        return this._args[flag];
    }

    hasCommand(cmd) {
        return this._args._.indexOf(cmd) !== -1;
    }
}

module.exports = CliParser;