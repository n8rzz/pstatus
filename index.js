const Parser = require('rss-parser');
const ora = require('ora');
const CliParser = require('./src/cli/cli.parser');
const OptionParser = require('./src/option/option.parser');
const FeedCollection = require('./src/feed/feed.collection');
const Renderer = require('./src/renderer');

let spinner;
const FEEDS = [
    {
        name: 'Harvest',
        url: 'https://www.harveststatus.com/history.rss',
        isActive: true,
    },
    {
        name: 'Freshbooks',
        url: 'https://status.freshbooks.com/history.rss',
        isActive: true,
    },
    {
        name: 'NPM',
        url: 'https://status.npmjs.org/history.rss',
        isActive: true,
    },
    {
        name: 'Heroku',
        url: 'https://status.heroku.com/feed', // will require a parser, different format than the rest
        isActive: false,
    },
    {
        name: 'GitHub',
        url: 'https://www.githubstatus.com/history.rss',
        isActive: true,
    },
    {
        name: 'Travis CI',
        url: 'https://www.traviscistatus.com/history.rss',
        isActive: true,
    },
    {
        name: 'Gitlab',
        url: 'https://status.gitlab.com/pages/5b36dc6502d06804c08349f7/rss',
        isActive: false,
    },
    {
        name: 'Digitalocean',
        url: 'https://status.digitalocean.com/history.rss',
        isActive: true,
    },
];

function _render(msg) {
    return Renderer.write(msg);
}

function _layout(feedCollection, options) {
    const msg = feedCollection.toWriteable(options);

    _render(msg);
}

function onResponseSuccessHandler(response, options) {
    spinner.stop();

    const feedCollection = new FeedCollection(FEEDS, response);

    _layout(feedCollection, options);
}

(async () => {
    const args = new CliParser();
    const options = new OptionParser(args);

    console.log(args);
    console.log(options);
    console.log('\n')

    if (options.isHelp) {
        return _render(options.buildHelpMsg());
    }

    const rssParser = new Parser();
    const req = FEEDS.reduce((sum, feed) => {
        if (!feed.isActive) {
            return sum;
        }

        return [
            ...sum,
            rssParser.parseURL(feed.url),
        ];
    }, []);

    spinner = ora({ text: 'Loading provider statuses', spinner: 'bouncingBar', color: 'gray' }).start();

    Promise.all(req)
        .then((res) => onResponseSuccessHandler(res, options))
        .catch((err) => {
            spinner.fail();

            throw err
        });
})();