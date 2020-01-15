const moment = require('moment');

const TODAY = moment(new Date()).startOf('day');

function isWithinHours(hours, dateToCompare) {
    const now = moment(new Date());
    const difference = moment.duration(now.diff(dateToCompare));
    const differenceInHours = Math.round(difference.asHours());

    return differenceInHours < hours;
}

function isToday(dateToCompare) {
    return dateToCompare.clone().startOf('day').isSame(TODAY, 'd');
}

function isYesterday(dateToCompare) {
    const yesterday = TODAY.clone().subtract(1, 'days').startOf('day');

    return dateToCompare.isSame(yesterday, 'd');
}

function isWithinWeek(dateToCompare) {
    const oneWeekAgo = TODAY.clone().subtract(7, 'days').startOf('day');

    return dateToCompare.isAfter(oneWeekAgo);
}

module.exports = {
    isWithinHours,
    isToday,
    isYesterday,
    isWithinWeek,
};