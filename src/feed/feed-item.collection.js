const orderBy = require('lodash/orderBy');
const FeedItemModel = require('./feed-item.model');

class FeedItemCollection {
    get length() {
        return this._items.length;
    }

    constructor(items = []) {
        this._items = [];

        if (items.length === 0) {
            return this;
        }

        this._addItems(items);
    }

    findMostRecentItem() {
        const recentItem = orderBy(this._items, ['pubDate'], ['desc']);

        return recentItem[0];
    }

    toWriteable(options) {
        const messages = this._items.map((item) => item.buildItemMessage());
        const messagesWithLimit = messages.slice(0, options.limit);

        return messagesWithLimit.join('\n');
    }

    _addItems(items) {
        items.forEach((item) => this._add(item));
    }

    _add(item) {
        const feedItemModel = new FeedItemModel(item);

        this._items.push(feedItemModel);
    }
}

module.exports = FeedItemCollection;