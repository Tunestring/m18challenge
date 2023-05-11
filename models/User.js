const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

// User Model Schema
const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true, 
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Enter a valid email address!']
        },
        thoughts: [thoughtSchema],
        friends: [{
          type: Schema.Types.ObjectId,
          ref: 'User'
        }]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

  //added virtual property here
  userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  const User = model('User', userSchema);

  module.exports = User;