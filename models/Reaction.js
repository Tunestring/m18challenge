const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction Model Schema
const Reaction = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        // getter method to format the timestamp
        createdAt: {
            type: Date,
            default: Date.now,
            // format the date
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = Reaction;

 