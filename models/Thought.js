const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const {formatDate} = require('../utils/helpers');

// Thought Model Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
    },
);
// virtual property here
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);