const router = require('express').Router();
let User = require('../models/user.model');


router.route('/all').get(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}); 

router.route('/profile/:id').get((req, res) => {
  const id = req.params.id;
  User.findOne({ clerkId: id })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json('User not found');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post(async (req, res) => {
  const { clerkId, email, fullName } = req.body;

  try {
    const newUser = new User({
      clerkId,
      email,
      fullName,
    });

    const savedUser = await newUser.save();
    res.json(`User with id: ${savedUser.clerkId} added`);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/update/:id').put(async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.id });
    if (!user) {
      return res.status(404).json('User not found');
    }

    Object.keys(req.body).forEach(key => {
      if (key in user && key !== 'id') {
        user[key] = req.body[key];
      }
    });

    user.updatedAt = new Date();

    const updatedUser = await user.save();
    res.json(`User with id: ${updatedUser.clerkId} updated`);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/delete/:id').delete(async (req, res) => {
  try {
    const result = await User.deleteOne({ clerkId: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json('User not found');
    }
    res.json(`User with id: ${req.params.clerkId} deleted`);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;