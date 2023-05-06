const { User } = require('../models');

const userController = {
  // GET all Users
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-__v');
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // GET User by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: 'Sorry, that user does not exist.' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};

module.exports = userController;