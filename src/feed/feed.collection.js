const FeedModel = require('./feed.model');

class FeedCollection {
    get length() {
        return this._items.length;
    }

    constructor(feedEnum, items = []) {
        this._items = [];

        if (items.length === 0) {
            return this;
        }

        this._addItems(feedEnum, items);
    }

    toWriteable(options) {
        let separator = '\n';
        const itemList = this._items.map((feed) => feed.toWriteable(options));

        if (!options.isList) {
            separator += '\n';
        }

        return itemList.join(separator);
    }

    _addItems(feedEnum, items) {
        items.forEach((item) => this._add(feedEnum, item));
    }

    _add(feedEnum, item) {
        const itemFeed = feedEnum.filter((feed) => {
            const lowerCaseTitle = item.title.toLowerCase();

            return lowerCaseTitle.indexOf(feed.name.toLowerCase()) !== -1;
        })[0];
        const feedModel = new FeedModel(itemFeed.name, item);

        this._items.push(feedModel);
    }
}

module.exports = FeedCollection;