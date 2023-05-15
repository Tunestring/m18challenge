const { Thought, User } = require('../models');
const { Types } = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      
      if (!thoughts) {
        return res.status(404).json({ error: 'No thoughts found' });
      }
      
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(new ObjectId(req.params.thoughtId));

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body); 
      await User.findOneAndUpdate(
        { username: req.body.username }, 
        { $push: { thoughts: thought } }
      );
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async findAndUpdateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: new Types.ObjectId(req.params.thoughtId) },
        req.body,
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
  
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
  
      const thought = await Thought.findOneAndDelete({ _id: thoughtId });
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      
      await User.updateMany(
        { thoughts: thoughtId },
        { $pull: { thoughts: thoughtId } }
      );
  
      res.status(200).json({ message: 'Successfully deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: new Types.ObjectId(req.params.thoughtId) },
        { $push: { reactions: req.body } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
  
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: new ObjectId(req.params.reactionId) } } }
      );

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.status(200).json({ message: "Successfully Deleted!" })
    } catch (err) {
      res.status(500).json(err);
    }
  }
};