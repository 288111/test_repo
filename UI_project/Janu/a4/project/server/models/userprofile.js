const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userprofileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Userprofile = mongoose.model('Userprofile', userprofileSchema);

module.exports = Userprofile;
