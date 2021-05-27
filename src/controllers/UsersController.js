const { update } = require('../models/User');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json({ data: user });
    } catch(e) {
      return res.status(400).json({ error: e });
    }
  },

  async index(req, res) {
    const users = await User.find({}, { _id: 0, name: 1, email: 1});

    return res.json({ data: users });
  },

  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if(!user) return res.status(404).json({ error: 'User not found' });
      
      return res.json({ data: user });
    } catch (e) {
      return res.status(40).json({ error: e });
    }    
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if(!user) return res.status(404).json({ error: 'User not found' });
      
      return res.json({ data: user });
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);
      if(!user) return res.status(404).json({ error: 'User not found' });
  
      return res.json({ data: user });
    } catch(e) {
      return res.status(400).json({ error: e });  
    }
  }
}