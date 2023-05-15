const User = require('../models/User.js');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createNewUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData); // Send the created user object instead of the string
    } catch (err) {
      res.status(500).json(err);
    }
  },
// update a user
async updateUser(req, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json('User updated!');
    } catch (err) {
      res.status(500).json(err);
    }
  },

// delete a user
async deleteUser(req, res) {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

    if (!deletedUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.status(200).json('That user has been deleted!');
  } catch (err) {
    res.status(500).json(err);
  }
},

async addFriend(req, res) {
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(addFriend); // Return the updated user object instead of a string
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteFriend(req, res) {
  try {
    const deletedFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.json('That friend has been deleted! Bye Felicia!');
  } catch (err) {
    res.status(500).json(err);
  }
}
};