const githubParsedRssFeedMock = {
  title: 'GitHub Status - Incident History',
  description: 'Statuspage',
  pubDate: 'Fri, 17 Jan 2020 08:21:14 +0000',
  link: 'https://www.githubstatus.com',
  items: [
    {
      title: 'Incident on 2019-12-19 22:49 UTC',
      link: 'https://www.githubstatus.com/incidents/krfmmxs3wdry',
      pubDate: 'Thu, 19 Dec 2019 23:12:49 +0000',
      content: "\n<p><small>Dec <var data-var='date'>19</var>, <var " +
        "data-var='time'>23:12</var> " +
        'UTC</small><br><strong>Resolved</strong> - This incident has ' +
        'been resolved.</p><p><small>Dec <var ' +
        "data-var='date'>19</var>, <var data-var='time'>22:49</var> " +
        'UTC</small><br><strong>Investigating</strong> - Delays in ' +
        'Webhooks and Notifications are currently being ' +
        'investigated.</p>      ',
      contentSnippet: 'Dec 19, 23:12 UTCResolved - This incident has been ' +
        'resolved.Dec 19, 22:49 UTCInvestigating - Delays in ' +
        'Webhooks and Notifications are currently being ' +
        'investigated.',
      guid: 'https://www.githubstatus.com/incidents/krfmmxs3wdry',
      isoDate: '2019-12-19T23:12:49.000Z'
    },
    {
      title: 'Incident on 2019-12-15 22:49 UTC',
      link: 'https://www.githubstatus.com/incidents/krfmmxs3wdry',
      pubDate: 'Wed, 25 Dec 2019 23:12:49 +0000',
      content: '',
      contentSnippet: '',
      guid: 'https://www.githubstatus.com/incidents/krfmmxs3wwet',
      isoDate: '2019-12-25T23:12:49.000Z'
    }
  ]
};

const feedItemMock = githubParsedRssFeedMock.items[0];

module.exports = {
  feedItemMock,
  githubParsedRssFeedMock,
};