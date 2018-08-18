const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`);
mongoose.Promise = global.Promise;
global.$mongoose = mongoose;
/**
 * 设置数据源
 */

const syncDB = () => {
    const {Auction} = require('../model/auction');
    global['$auction'] = mongoose.model('auction', Auction, 'auction');
};

syncDB();

