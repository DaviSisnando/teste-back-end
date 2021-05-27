const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!email || !password || !user) return res.status(401).json({
      error: 'Invalid email or password.'
     });

     bcrypt.compare(password, user.password, (e, match) => {
       if(e) return next(e);
       if (match) {
         return res.json({
           user: { id: user._id, email },
           token: jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
             expiresIn: "7d",
           }),
         });
       } else return res.json({ error: 'Invalid email or password.' });
     });
  }
}