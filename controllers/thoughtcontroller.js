const { Thought, User } = require('../models');

const thoughtController = {
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

  // GET thought by ID
  async getThoughtById(req, res) {
    try {
      const { thoughtId } = req.params;

      const thought = await Thought.findById(thoughtId).populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error! Please try again.' });
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;

      // Check if the user exists
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Creates the actual Thought
      const thought = await Thought.create({
        thoughtText,
        username,
      });

      // Add the Thought to the User's Thoughts array
      await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } });

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error! Please try again.' });
    }
  },
 async createReaction(req, res) {
    try {
      const { reactionBody } = req.body;
      const { thoughtId } = req.params;
  
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: { reactionBody } } },
        { new: true }
      );
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.status(200).json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create reaction' });
    }
  },
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
      const userId = req.user._id;
  
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId, reactionAuthor: userId } } },
        { new: true, runValidators: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
  
      res.json({ message: 'Reaction deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete reaction!' });
    }
  },
  // Find and update a thought by ID
  async findAndUpdateThought(req, res) {
    try {
      const { id } = req.params;
      const { thoughtText } = req.body;

      // Updates Thought
      const thought = await Thought.findByIdAndUpdate(
        id,
        { thoughtText },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error! Please try again.' });
    }
  },

  // Delete a thought by ID
  async deleteThought(req, res) {
    try {
      const { thoughtId } = req.params;

      // Finds Thought to be deleted
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found!' });
      }

      // Remove the thought from the user's thoughts array
      await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: thought._id } });

      // Delete the thought
      await thought.remove();

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error! Please try again.' });
    }
  },
};

module.exports = thoughtController;