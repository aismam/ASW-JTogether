const mongoose = require('mongoose');

/*       Activity        */
const activitySchema = mongoose.Schema({
    creator_username : { type: String, required : true},
    name : { type: String, required: true},
    description: { type: String, required: true},
    date_time: { type: Date, required: true},
    participants : {type : [String], default: [], required:true }
})

activitySchema.set('toJSON', {
    virtuals: false,
    versionKey: false
})

/*       Message        */
const messageSchema = mongoose.Schema({
    message : { type: String, required : true},
})

messageSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
})

/*       Chat        */
const chatSchema = mongoose.Schema({
    activity_id : {type : Number , required : true},
    messages : {type : [messageSchema], required : true}
})

chatSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
})

/*       Notification        */
const notificationSchema = mongoose.Schema({
    message : { type: String, required : true}
})

notificationSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
})

/*       User        */
const userSchema = mongoose.Schema({
    username : {type: String, unique: true, required: true},
    email : {type : String, unique : true, required : true},
    chats : {type : [String], default: [], required : true},
    activities_created : {type : [String], default: [], required : true},
    activities_participated : {type : [String], default: [], required : true},
    hash : {type: String, required: true}
})

userSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
})

module.exports = {
    User: mongoose.model('User',userSchema),
    Activity : mongoose.model('Activity',activitySchema),
    Notification : mongoose.model('Notification',notificationSchema),
    Chat : mongoose.model('Chat',chatSchema),
    Message: mongoose.model('Message',messageSchema)
}


