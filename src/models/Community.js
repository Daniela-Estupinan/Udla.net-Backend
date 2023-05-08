const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    title: String,
    description: String,
    profileImage: String,
    creator:String,
    obj:String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Community', communitySchema);
