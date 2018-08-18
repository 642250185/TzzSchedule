const request = require('superagent');

const getHourList = async (pageNum, list) => {
    if(!pageNum) {
        pageNum = 1;
        list = [];
    }
    const result = await request.get(`https://zhuan.58.com/zzopen/ypdeal/buyerActivityList?cateId=101&pageNum=${pageNum}&pageSize=100`);
    const {respData} = JSON.parse(result.text);
    if(!respData || respData.length === 0) {
        return list;
    }
    list = list.concat(respData);
    pageNum ++;
    return await getHourList(pageNum, list);
};

exports.getHourList = getHourList;

