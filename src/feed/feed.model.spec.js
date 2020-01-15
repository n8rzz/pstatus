const test = require('ava');
const chalk = require('chalk');
const moment = require('moment');
const sinon = require('sinon');
const { githubParsedRssFeedMock } = require('../__mock__/github-parsed-rss-feed');
const FeedModel = require('./feed.model');

const feedTitleMock = 'GitHub';

test('FeedModel', (t) => {
    t.notThrows(() => new FeedModel(feedTitleMock, githubParsedRssFeedMock));
});

test('.toWriteable() does not throw when limit is greater than #items', (t) => {
    const optionsMock = {
        limit: 5,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    t.notThrows(() => model.toWriteable(optionsMock));
});

test('.buildFeedTitle() includes the correct symbol when pubDate is within the last 5 hours', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: false,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const findMostRecentItemStub = sinon.stub(model._collection, 'findMostRecentItem').returns({ pubDate: moment(new Date()) });
    const result = model.buildFeedTitle(optionsMock);

    t.true(result.includes('✖'));

    findMostRecentItemStub.restore();
});

test('.buildFeedTitle() includes the correct symbol when pubDate is within the last day', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: false,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const findMostRecentItemStub = sinon.stub(model._collection, 'findMostRecentItem').returns({
        pubDate: moment(new Date()).subtract(10, 'h'),
    });
    const result = model.buildFeedTitle(optionsMock);

    t.true(result.includes('●'));

    findMostRecentItemStub.restore();
});

test('.buildFeedTitle() includes the correct symbol when pubDate is older than 1 day', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: false,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const findMostRecentItemStub = sinon.stub(model._collection, 'findMostRecentItem').returns({
        pubDate: moment(new Date()).subtract(10, 'd'),
    });
    const result = model.buildFeedTitle(optionsMock);

    t.true(result.includes('✔'));

    findMostRecentItemStub.restore();
});

test('.buildFeedTitle() builds the correct string when #isList is passed as true', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: true,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const result = model.buildFeedTitle(optionsMock);
    const expectedResult = `${chalk.green('✔')} ${chalk.cyan(feedTitleMock.toLowerCase())}`;

    t.is(result, expectedResult);
});

test('.buildFeedTitle() builds the correct string when #isList is passed as false', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: false,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const result = model.buildFeedTitle(optionsMock);
    const expectedResult = `${chalk.green('✔')} ${chalk.cyan(feedTitleMock.toLowerCase())}\n`;

    t.is(result, expectedResult);
});

test('.toWriteable() builds correct message when limit is same as #items', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: false,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const result = model.toWriteable(optionsMock);
    const expectedTitle = `${chalk.cyan(feedTitleMock.toLowerCase())}`;
    const expectedMsg = ` ${chalk.gray('2019-12-19')} ${chalk.magenta('a month ago')}: Incident on 2019-12-19 22:49 UTC: https://www.githubstatus.com/incidents/krfmmxs3wdry`;
    const expectedResult = `${expectedTitle}\n${expectedMsg}`;

    t.true(result.includes(expectedResult));
});

test('.toWriteable() builds correct message when #isList is passed as false', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: false,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const result = model.toWriteable(optionsMock);
    const expectedTitle = `${chalk.cyan(feedTitleMock.toLowerCase())}`;
    const expectedMsg = ` ${chalk.gray('2019-12-19')} ${chalk.magenta('a month ago')}: Incident on 2019-12-19 22:49 UTC: https://www.githubstatus.com/incidents/krfmmxs3wdry`;
    const expectedResult = `${expectedTitle}\n${expectedMsg}`;

    t.true(result.includes(expectedResult));
});

test('.toWriteable() builds correct message when #isList is passed as true', (t) => {
    const optionsMock = {
        limit: githubParsedRssFeedMock.length,
        isList: true,
    };
    const model = new FeedModel(feedTitleMock, githubParsedRssFeedMock)
    const result = model.toWriteable(optionsMock);
    const expectedTitle = `${chalk.cyan(feedTitleMock.toLowerCase())}`;
    const expectedResult = `${expectedTitle}`;

    t.true(result.includes(expectedResult));
});

