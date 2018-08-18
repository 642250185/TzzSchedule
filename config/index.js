const path = require('path');
const config = {

    /**
     * 生产环镜
     */
    production: {
        mongodb: {
            host: '127.0.0.1',
            port: 8777,
            dbname: 'zhuanzhuan'
        },
        //默认取七天前的数据
        defaultDay: 7
    },


    /**
     * 开发环镜
     */
    development: {
        mongodb: {
            // host: 'localhost',
            // port: 27017,
            host: '139.199.59.214',
            port: 8777,
            dbname: 'zhuanzhuan'
        },
        //默认取七天前的数据
        defaultDay: 7
    },

    /**
     * 返回或设置当前环镜
     */
    env: function () {
      // if (__DEV_MODE__) {
      //   global.$config = this.development;
      // } else {
      //   global.$config = this.production;
      // }
      return global.$config = this.development;
    }
};

module.exports = config.env();
