const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      User.syncIndexes(() => {
        done();
      })
    });
  });

  it("has a first name", () => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.firstName).toEqual("Steve");
  });

  it("has first name as a required field", async () => {
    const user = new User({
      lastName: "Angelo",
      email: "someone@example.com",
      password: "password",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("has a last name", () => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.lastName).toEqual("Angelo");
  });

  it("has last name as a required field", async () => {
    const user = new User({
      firstName: "Steve",
      email: "someone@example.com",
      password: "password",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("has an email address", () => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has email as a required field", async () => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      password: "password",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("has a password", () => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      email: "someone@example.com",
      password: "password",
    });
    
    expect(user.password).toEqual("password");
  });

  it("has password as a required field", async () => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      email: "someone@example.com",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("has a default profile picture", () => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.profilePicture).toBe(
      "/images/blank-avatar.jpg"
    );
  });

  it("can save a user", (done) => {
    const user = new User({
      firstName: "Steve",
      lastName: "Angelo",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Steve",
          lastName: "Angelo",
          email: "someone@example.com",
        });
        done();
      });
    });
  });

  //READY FOR ADDING VALIDATION
  // it("only accepts valid emails", async () => {
  //   const user = new User({
  //     firstName: "Barry",
  //     lastName: "Barry",
  //     email: "someoneexample.com",
  //     password: "password",
  //   });

  //   await expect(user.save()).rejects.toThrow();
  // });

  // it("email field has to be a unique entry", async() => {
  //   const user = new User({
  //     firstName: "Steve",
  //     lastName: "Angelo",
  //     email: "someone@example.com",
  //     password: "password",
  //   });
  //   await user.save();

  //   const user2 = new User({
  //     firstName: "Steve",
  //     lastName: "Angelo",
  //     email: "someone@example.com",
  //     password: "password",
  //   });
  //   await expect(user2.save()).rejects.toThrow();

  // });

  // it("the email is not case-sensitive", async () => {
  //   const user = new User({
  //     firstName: "Steve",
  //     lastName: "Angelo",
  //     email: "SteveANGELO@example.com",
  //     password: "password",
  //   });
  //   await expect(user.email).toBe("steveangelo@example.com")
  // });

});
