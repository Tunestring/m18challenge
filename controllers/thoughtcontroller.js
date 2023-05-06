const { Thought, User } = require('../models');

const thoughtController = {
  // Create a new thought
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;

      // Check if the user exists
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Create the thought
      const thought = await Thought.create({
        thoughtText,
        username,
      });

      // Add the thought to the user's thoughts array
      await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } });

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // GET all Thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find().populate('reactions');
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  

};

module.exports = thoughtController;