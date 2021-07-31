const { Schema, model } = require('mongoose');

const task = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duedate: { type: Date, required: true },
    status: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

// Here we allow the virtual property to be more frontend friendly.
task.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

task.virtual('id').get(function () {
  return this._id.toHexString();
});

task.set('toJSON', {
  virtuals: true,
});

module.exports = model('Task', task);
