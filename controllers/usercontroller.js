const { User } = require('../models');

module.exports = {
  
  async getUsers(req, res) {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUserById(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}