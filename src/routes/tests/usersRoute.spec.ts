import supertest from "supertest";
import app from "../../server";
const request = supertest(app);

let token = "";
describe("Users Routes", () => {
  describe("Create", () => {
    it("should return the created user & token /users/create", async () => {
      const res = await request.post("/users/create").send({
        firstName: "first",
        lastName: "last",
        password: "password0",
        username: "user1",
      });
      const resBody = JSON.parse(res.text);
      token = resBody.token;
      expect(resBody.token).toBeDefined();
      expect(resBody.message).toEqual("User is created successfully");
    });
    it("should return error if password is less than 8 char", async () => {
      const res = await request.post("/users/create").send({
        firstName: "first",
        lastName: "last",
        password: "pass",
        username: "user1",
      });
      const resBody = JSON.parse(res.text);

      expect(resBody.message).toEqual(
        "password should be at least 8 characters"
      );
    });
  });

  describe("Show", () => {
    it("should throw unauthorized error /users/:id", async () => {
      try {
        await request.get("/users/1");
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
    it("should return the user", async () => {
      const res = await request
        .get("/users/1")
        .set("Authorization", `Bearer ${token}`);
      const resBody = JSON.parse(res.text);
      expect(resBody.id).toEqual(1);
    });
  });

  describe("Index", () => {
    it("should throw unauthorized error /users", async () => {
      try {
        await request.get("/users");
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
    it("should return array of users", async () => {
      const res = await request
        .get("/users")
        .set("Authorization", `Bearer ${token}`);
      const resBody = JSON.parse(res.text);
      expect(resBody.length).toEqual(2);
    });
  });

  describe("Login", () => {
    it("should return token if password is correct", async () => {
      const res = await request
        .post("/users/login")
        .send({ username: "user1", password: "password0" });

      const resBody = JSON.parse(res.text);

      expect(resBody.token).toBeDefined();
    });
  });
});
