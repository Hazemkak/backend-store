import { UserModel } from "../users.model";

const user = new UserModel();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(user.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(user.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(user.create).toBeDefined();
  });

  it("should have a findByUsername method", () => {
    expect(user.findByUsername).toBeDefined();
  });

  it("create method should throw error if username is duplicated", async () => {
    await user.create({
      firstName: "name0",
      lastName: "name1",
      username: "user0",
      password: "password123",
    });

    try {
      await user.create({
        firstName: "name0",
        lastName: "name1",
        username: "user0",
        password: "password123",
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("should return an array of 1 length ", async () => {
    const result = await user.index();
    expect(result.length).toEqual(1);
  });

  it("should return error if user is not found ", async () => {
    try {
      await user.show(5);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("should return the user if user is found ", async () => {
    try {
      const result = await user.show(1);
      expect(result).toBeTruthy();
    } catch (error) {
      expect(true).toEqual(false);
    }
  });
});
