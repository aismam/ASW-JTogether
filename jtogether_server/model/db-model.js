const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email : {type : String, unique : true, required : true},
    hash: { type: String, required: true },
});

userSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

const activitySchema = new Schema({
    creator_username : { type: String, required : true},
    name : { type: String, required: true },
    description: { type: String, required: true },
    date_time: { type: Date, required: true }
})

activitySchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

module.exports = {
    User: mongoose.model("User",userSchema),
    Activity : mongoose.model("Activity",activitySchema)
}


