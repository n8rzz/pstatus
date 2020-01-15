const chalk = require('chalk');
const moment = require('moment');
const FeedItemCollection = require('./feed-item.collection');
const {
    isWithinHours,
    isToday,
} = require('../date.utilities');

// const STATUS = {
//     ERROR: 'ERROR',
//     WARN: 'WARN',
//     OK: 'OK',
// };

const SYMBOLS = {
    ERROR: '✖',
    WARN: '●',
    OK: '✔',
}

class Feed {
    constructor(title, feed) {
        this.title = title || '';;
        this._feed = feed;
        this._collection = new FeedItemCollection(this._feed.items);
    }

    toWriteable(options) {
        if (options.isList) {
            return `${this.buildFeedTitle(options)}`;
        }

        return `${this.buildFeedTitle(options)}${this._collection.toWriteable(options)}`;
    }

    buildFeedTitle(options) {
        const titleStatusSymbol = this._buildStatusFromRecentPubDate();
        const titleText = `${chalk.cyan(this.title.toLowerCase())}`;

        if (options.isList) {
            return `${titleStatusSymbol} ${titleText}`;
        }

        return `${titleStatusSymbol} ${titleText}\n`;
    }

    _buildStatusFromRecentPubDate() {
        const recentItem = this._collection.findMostRecentItem();
        const recentItemDate = moment(recentItem.pubDate);

        if (isWithinHours(5, recentItemDate)) {
            return `${chalk.red(SYMBOLS.ERROR)}`;
        } if (isToday(recentItemDate)) {
            return `${chalk.yellow(SYMBOLS.WARN)}`;
        }

        return `${chalk.green(SYMBOLS.OK)}`;
    }
}

module.exports = Feed;