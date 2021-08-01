const User = require('../models/User');
const Tasks = require('../models/Tasks');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const tasks = await Tasks.find({
      user: req.query.user,
    });

    if (!tasks)
      return res.status(404).send({
        message: 'No tasks found',
      });

    res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while getting the user tasks',
      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const findUser = await User.findById(req.body.user);
    if (!findUser)
      return res.status(404).send({
        message: 'No user found',
      });

    let task = new Tasks(req.body);

    task = await task.save();

    if (!task)
      return res.status(500).send({
        success: false,
        message: 'An error occurred while creating the task',
      });
    res.status(200).send(task);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while setting the user task',
      error: error.message,
    });
  }
});

router.patch('/updateTask', async (req, res) => {
  try {
    let findTask = await Tasks.find({
      title: req.body.title,
      user: req.body.user,
    });

    if (!findTask)
      return res.status(404).send({
        success: false,
        message: 'No task found',
      });
    const actualStatus = findTask[0].status;

    findTask[0].status = !actualStatus;

    findTask = findTask[0].save();

    if (!findTask)
      return res.status(500).send({
        success: false,
        message: 'An error occurred while updating the task',
      });

    res.status(200).send({ success: true, message: 'Task updated' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while update the user task',
      error: error.message,
    });
  }
});

module.exports = router;
