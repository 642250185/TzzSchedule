const schedule = require('node-schedule');
const {importHourList} = require('./auctionService');
const moment = require('moment');
const rule = new schedule.RecurrenceRule();
// rule.hour = [0, new schedule.Range(1, 23)];
rule.minute = [0, 30];


schedule.scheduleJob(rule, async function(){
    console.log(moment().local().format('YYYY-MM-DD HH:mm:ss'));
    await importHourList();
});
