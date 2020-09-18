const request = require("supertest");
const app = require("../index");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/users");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Rituraj",
  email: "officialriturajanand@gmail.com",
  password: "password",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should Signup new User", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Rituraj",
      email: "riturajanand91@gmail.com",
      password: "password",
    })
    .expect(201);
});

test("Should Login existing User", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should get user profile", async () => {
  await request(app)
    .get("/users/profile")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get user profile for unauthenticated users", async () => {
  await request(app)
    .get("/users/profile")
    .send()
    .expect(401);
});

test("Should delete user account", async () => {
    await request(app)
      .delete("/users/:id")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });
  

test("Should not delete user account", async () => {
    await request(app)
      .delete("/users/:id")
      .send()
      .expect(200);
  });
  