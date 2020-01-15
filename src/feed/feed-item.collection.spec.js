const test = require('ava');
const chalk = require('chalk');
const { githubParsedRssFeedMock } = require('../__mock__/github-parsed-rss-feed');
const FeedItemCollectionModel = require('./feed-item.collection');

test('FeedItemCollectionModel', (t) => {
    t.notThrows(() => new FeedItemCollectionModel(githubParsedRssFeedMock.items));
});

test('.findMostRecentItem()', (t) => {
    const collection = new FeedItemCollectionModel(githubParsedRssFeedMock.items);
    const result = collection.findMostRecentItem();
    const expectedResult = '2019-12-25';

    t.is(result.pubDate, expectedResult);
});
