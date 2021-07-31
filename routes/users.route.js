const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  try {
    const findUsers = await User.find().select('-password');

    if (!findUsers)
      return res.status(404).send({ succes: false, message: 'No users found' });
    res.status(200).send(findUsers);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while getting the users',
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id).select('-password');

    if (!findUser)
      return res.status(404).send({ succes: false, message: 'No users found' });
    res.status(200).send(findUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while getting the user',
      error: error.message,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const findUser = await User.find({ email: req.body.email });

    if (findUser.length > 0)
      return res
        .status(500)
        .send({ success: false, message: 'User already exists' });

    let user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
    });

    user = await user.save();

    if (!user)
      return res.status(500).send({
        success: false,
        message: 'An error occurred while creating the user',
      });

    res.status(200).send(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while register the user',
      error: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const SECRET = process.env.SECRET;
    const findUser = await User.find({ email: req.body.email });

    if (!findUser)
      return res
        .status(500)
        .send({ success: false, message: 'User not found' });

    if (
      findUser &&
      bcrypt.compareSync(req.body.password, findUser[0].password)
    ) {
      const token = jwt.sign(
        {
          userId: findUser[0]._id,
          isLoggedIn: true,
        },
        SECRET,
        { expiresIn: '1y' }
      );
      res.status(200).send({
        id: findUser[0]._id,
        email: findUser[0].email,
        name: findUser[0].name,
        isLoggedIn: true,
        token: token,
      });
    } else {
      res.status(400).send('Incorrect password');
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while login the user',
      error: error.message,
    });
  }
});

module.exports = router;
