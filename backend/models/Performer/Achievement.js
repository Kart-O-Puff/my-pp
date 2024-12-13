const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PerformerAchievementSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

const PerformerAchievement = mongoose.model('PerformerAchievement', PerformerAchievementSchema);

module.exports = PerformerAchievement;