const request = require("supertest");
const app = require("../../app");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

describe("Register route controller", () => {
  let server = null;
  beforeAll(async () => {
    server = await app.listen(3002);
    await mongoose.connect(DB_HOST);
  });
  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  test("should create a new user when all required fields are valid", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
      password: "testpassword123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});
