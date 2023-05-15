const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { dateFormat } = require('../utils/dateFormat');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

thoughtSchema.virtual('formattedCreatedAt')
  .get(function () {
    return dateFormat(this.createdAt);
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;