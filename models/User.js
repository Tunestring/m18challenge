const { Schema, model } = require('mongoose');

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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
              },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
              },
        ]
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  //add virtual property here?