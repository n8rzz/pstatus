const test = require('ava');
const chalk = require('chalk');
const { feedItemMock } = require('../__mock__/github-parsed-rss-feed');
const FeedItemModel = require('./feed-item.model');

test('FeedItemModel', (t) => {
    t.notThrows(() => new FeedItemModel(feedItemMock));
});

test('.buildItemMessage() returns the correct string', (t) => {
    const model = new FeedItemModel(feedItemMock);
    const result = model.buildItemMessage();
    const expectedResult = ` ${chalk.gray('2019-12-19')} ${chalk.magenta('a month ago')}: Incident on 2019-12-19 22:49 UTC: https://www.githubstatus.com/incidents/krfmmxs3wdry`;

    t.is(result, expectedResult);
});