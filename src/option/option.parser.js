const chalk = require('chalk');

const OPTIONS = {
    HELP: 'h',
    LIST: 'l',
    LIMIT: 'limit',
    INTERACTIVE: 'i',
};

const HELP_MSG = `
${chalk.grey('USAGE:')}
${chalk.white('$ pstatus\n$ pstatus <OPTION>\n$ pstatus -h\n')}
${chalk.grey('EXAMPLES:')}
${chalk.white('pstatus\npstatus list\npstatus --limit 3\n')}
${chalk.grey('OPTION:')}
${chalk.white('--limit {NUMBER}    Will limit the number of results displayed for each provider expects a number to be passed')}
${chalk.white('                    Default: 5')}
${chalk.white('-l                  Displays only provider titles and status indicators')}
${chalk.white('-h                  Display usage and command documentation')}
`;

class OptionParser {
    /**
     * @constructor
     * @param {CliParser} args
     */
    constructor(args) {
        this.isHelp = args.getFlag(OPTIONS.HELP);
        this.isList = args.getFlag(OPTIONS.LIST);
        this.limit = args.getFlag(OPTIONS.LIMIT) || 5;
        this.isInteractive = args.getFlag(OPTIONS.INTERACTIVE);
    }

    buildHelpMsg() {
        return HELP_MSG;
    }
}

module.exports = OptionParser;