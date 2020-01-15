const chalk = require('chalk');
const moment = require('moment');

class FeedItemModel {
    constructor(feedItem) {
        this._feedItem = feedItem;

        this.pubDate = moment(this._feedItem.pubDate).format('YYYY-MM-DD');
        this.pubDateFromNow = moment(this._feedItem.pubDate).fromNow();
    }

    buildItemMessage() {
        const pubDate = chalk.gray(this.pubDate);
        const pubDateFromNow = chalk.magenta(this.pubDateFromNow);

        return ` ${pubDate} ${pubDateFromNow}: ${this._feedItem.title}: ${this._feedItem.link}`;
    }
}

module.exports = FeedItemModel;