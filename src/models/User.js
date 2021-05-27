const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  img: {
    type: String,
  },
  text: {
    type: String,
  },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  let { password } = this;
  this.password = await bcrypt.hash(password, 8);

  next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  let { password } = this._update;
  
  if(password) this._update.password = await bcrypt.hash(password, 8);

  next();
})

module.exports = mongoose.model('User', UserSchema);