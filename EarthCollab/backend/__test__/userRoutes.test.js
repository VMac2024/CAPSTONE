jest.mock("../dbConnect"); //link to mock dbConnect.
process.env.JWT_KEY = "mock-jwt-secret"; // Define a consistent JWT secret key

const request = require("supertest"); // npm install jest supertest sqlite3
const app = require("../app");
const { Sequelize } = require("../dbConnect");
const models = require("../models");
const { user, loginUser, updateUser, userImage } = require("./db.data");
const { createToken } = require("../middleware/auth");

let testUserId = 1;
const registerEmail = "test2@user.com";

beforeAll(async () => {
  await Sequelize.sync({ force: true });

  // insert test data
  const testUser = await models.User.create({ ...user, email: "initial@user.com" });
  testUserId = testUser.id;
});

afterAll(async () => {
  // clean up database
  await models.User.truncate();
  await Sequelize.close();
});

// list of routes - will create and run a test for each one based on the below config
const userRoutes = [
  {
    method: "GET",
    path: `/api/users`,
    description: "get all users",
    resultMsg: "User data fetched successfully",
    dataType: "array",
    auth: true,
  },
  {
    method: "POST",
    path: `/api/users`,
    description: "create new user",
    resultMsg: "User created successfully",
    body: user,
    dataType: "object",
    successCode: 201,
    auth: true,
  },
  {
    method: "POST",
    path: `/api/users/login`,
    description: "login existing user",
    resultMsg: "User successfully logged in",
    body: loginUser,
    dataType: "object",
  },
  {
    method: "POST",
    path: `/api/users/register`,
    description: "register new user",
    resultMsg: "User successfully registered",
    body: { ...user, email: registerEmail },
    dataType: "object",
    successCode: 201,
  },
  {
    method: "PUT",
    path: `/api/users/${testUserId}`,
    description: "update user data",
    resultMsg: "User updated successfully",
    body: updateUser,
    dataType: "object",
    auth: true,
  },
  //    { method: 'POST', path: `/api/users/sendpw`, description: 'reset password for user', resultMsg: 'Reset email sent successfully, check your email', body: loginUser, dataType: 'object' },
  {
    method: "POST",
    path: `/api/users/${testUserId}/image`,
    description: "update image for user",
    resultMsg: "Image uploaded to profile successfully",
    body: userImage,
    dataType: "object",
  },
  { method: "DELETE", path: `/api/users/${testUserId}`, description: "delete user", resultMsg: "User deleted successfully", auth: true },
];

describe("User Routes", () => {
  // test each route, checking content type, response code, and body
  for (let route of userRoutes) {
    test(`${route.method} ${route.path} => ${route.description}`, async () => {
      const req = request(app)[route.method.toLowerCase()](route.path); // dynamically call the right HTTP method

      // if this request requires authentication, send a token
      if (route.auth) {
        const token = createToken(1, "test@user.com");
        req.set("x-access-token", token);
      }

      // If method is POST or PUT, include the body
      if (route.method === "POST" || route.method === "PUT") {
        if (route.body?.type === "form") {
          // form submits include file data
          req.attach("file", route.body?.profilePhoto);
          Object.keys(route.body).forEach((key) => req.field(key, route.body[key]));
        } else {
          // standard request
          req.send(route.body);
        }
      }

      await req
        .expect("Content-Type", /json/)
        .expect(route.successCode || 200)
        .then((response) => {
          // check the `result` property matches the expected message defined above
          expect(response.body).toMatchObject({
            result: route.resultMsg,
          });

          // check that `data` is of the right type and has data
          if (route.dataType === "array") {
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
          } else if (route.dataType === "object") {
            expect(typeof response.body.data).toBe("object");
            expect(Object.keys(response.body.data).length).toBeGreaterThan(0);
          }
        });
    });
  }
});
