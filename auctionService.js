const {getHourList} = require('./crawler');
const mongoose = require('mongoose');
const {defaultDay} = require('./config');
const moment = require('moment');

const getHistory = async (day, endDate) => {
    if(!day) {
        day = defaultDay;
    }
    const endMoment = endDate ? moment(endDate, 'YYYY-MM-DD') : moment();
    const end = endMoment.subtract(1, 'days').seconds(59).minutes(59).hours(23).toDate();
    const start = endMoment.subtract(day, 'days').seconds(0).minutes(0).hours(0).toDate();
    console.log(moment(start).local().format('YYYY-MM-DD HH:mm:ss'), moment(end).local().format('YYYY-MM-DD HH:mm:ss'));
    return $auction.find({
        $and: [
            {
                createTime: {
                    $gte: start
                }
            },
            {
                createTime: {
                    $lte: end
                }
            }
        ]
    }, {_id: 0}).sort({createTime: -1}).select('zzItemId activityId');
};

const importHourList = async () => {
    try {
        const list = await getHourList();
        console.log('start to import auction list');
        for(let auction of list) {
            const entity = await $auction.findOne({zzItemId: auction.zzItemId});
            if(entity) {
                console.log(`itemId: ${auction.zzItemId} existed.`);
                continue;
            }
            console.log(`import itemId ${auction.zzItemId}`);
            await new $auction({
                _id: new mongoose.Types.ObjectId,
                zzItemId: auction.zzItemId,
                activityId: auction.activityId.toString()
            }).save();
        }
        console.log('import auction list completed');
        return {err: null};
    }catch (e) {
        console.log('err:', e);
        return {err: '导入失败'};
    }
};

exports.importHourList = importHourList;
exports.getHistory = getHistory;