const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.Auction = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    zzItemId: String,
    activityId: String,
    createTime: {
        type: Date,
        default: Date.now,
        index: true
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});
