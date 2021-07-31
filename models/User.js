const { Schema, model } = require('mongoose');

const user = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isLoggedIn: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Here we allow the virtual property to be more frontend friendly.
user.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

user.virtual('id').get(function () {
  return this._id.toHexString();
});

user.set('toJSON', {
  virtuals: true,
});

module.exports = model('User', user);
