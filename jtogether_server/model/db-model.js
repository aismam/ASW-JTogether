const mongoose = require('mongoose');

/*       Activity        */
const messageSchema = mongoose.Schema({
    message: {type: String, required : true},
    user_id: {type: String, required: true},
    time_stamp: {type: Date, required: true}
})

const activitySchema = mongoose.Schema({
    creator_username : { type: String, required : true, index: 'text'},
    name: { type: String, required: true, index: 'text'},
    description: { type: String, required: true, index: 'text'},
    date_time: { type: Date, required: true},
    participants : {type : [String], default: [], required:true },
    location: {type: String, required: true, index: 'text'},
    //chat: {type: [messageSchema],default: [], required: true},
    geolocation: {type: [Number], index: '2dsphere', required: true}
})
activitySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})

/*       User        */
const userActivitySchema = mongoose.Schema({
    _id: false,
    activity_id: {type: String, required: true},
    is_muted: {type: Boolean, default: false, required: true}
})

const userSchema = mongoose.Schema({
    username : {type: String, unique: true, required: true},
    email : {type: String, unique : true, required : true},
    created_activities : {type: [userActivitySchema], default: [], required : true},
    participated_activities : {type: [userActivitySchema], default: [], required : true},
    hash : {type: String, required: true},
    notifications: {type: [String], default: ["sassss",'soooooooooooso','mannaggia a chiara'], required: true}
})

userSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
})

module.exports = {
    User: mongoose.model('User',userSchema),
    Activity : mongoose.model('Activity',activitySchema),
}


