const express = require("express");
const router = new express.Router();
const User = require("../models/users");
const auth = require("../middleware/auth");
const  {mailsender,cancellationmailsender}  = require('../emails/accounts')
// const  cancellationmailsender  = require('../emails/accounts')

// CRUD

router.post('/users/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({ user, token })
  } catch (e) {
      res.status(400).send()
  }
})

router.get('/users/profile', auth, async (req, res) => {
  console.log("user profile");
  res.send(req.user)
})

router.post('/users/logout', auth, async (req, res) => {
  console.log(req.user.tokens);
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save()

      res.send()
  } catch (e) {
      res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
      req.user.tokens = []
      await req.user.save()
      res.send()
  } catch (e) {
      res.status(500).send()
  }
})

//Route to create User
router.post("/users", async (req, res) => {
  const user = new User(req.body);
 
  try {
    await user.save();
    mailsender(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
    console.log(req.body.name + " New User Registered"); //Printing to console
  } catch (e) {
    res.status(400).send(e);
  }
});

//Route to Read User
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
    console.log("All users Retreived");
  } catch (e) {
    res.status(500).send(e);
  }
});

//Route to Read User by specific id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Route to Update User
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
 
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.send(user);
    console.log("User Updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/users/:id', auth, async (req, res) => {
  try {
      await req.user.remove()
      cancellationmailsender(req.user.email, req.user.name);
      res.send(req.user)
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router;
