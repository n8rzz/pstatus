const test = require('ava');
const moment = require('moment');
const {
    isWithinHours,
    isToday,
    isYesterday,
    isWithinWeek,
} = require('./date.utilities');

const todayMock = moment(new Date());

test('.isWithinHours()', (t) => {
    const fiveHoursAgo = moment(new Date()).subtract(5, 'h');

    t.true(isWithinHours(7, fiveHoursAgo));
    t.false(isWithinHours(3, fiveHoursAgo));
});

test('.isToday()', (t) => {
    t.is(isToday(todayMock), true);
});

test('.isYesterday()', (t) => {
    const yesterdayMock = moment(new Date()).subtract(1, 'days').startOf('day');

    t.is(isYesterday(todayMock), false);
    t.is(isYesterday(yesterdayMock), true);
});

test('.isWithinWeek()', (t) => {
    const yesterdayMock = moment(new Date()).subtract(1, 'days').startOf('day');
    const twoWeeksAgoMock = moment(new Date()).subtract(10, 'days').startOf('day');

    t.is(isWithinWeek(yesterdayMock), true);
    t.is(isWithinWeek(twoWeeksAgoMock), false);
});
