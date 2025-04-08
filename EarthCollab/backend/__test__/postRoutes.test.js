jest.mock("../dbConnect"); //link to mock dbConnect.
process.env.JWT_KEY = "mock-jwt-secret"; // Define a consistent JWT secret key

const request = require("supertest"); // npm install jest supertest sqlite3
const app = require("../app");
const { Sequelize } = require("../dbConnect");
const models = require("../models");
const { post, loginpost, updatepost, postImage } = require("./db.data");
const { createToken } = require("../middleware/auth");

let testpostId = 1;
const registerEmail = "test2@post.com";

beforeAll(async () => {
  await Sequelize.sync({ force: true });

  // insert test data
  const testpost = await models.post.create({ ...post, email: "initial@post.com" });
  testpostId = testpost.id;
});

afterAll(async () => {
  // clean up database
  await models.post.truncate();
  await Sequelize.close();
});

// list of routes - will create and run a test for each one based on the below config
const postRoutes = [
  {
    method: "GET",
    path: `/api/posts`,
    description: "get all posts",
    resultMsg: "post data fetched successfully",
    dataType: "array",
    auth: true,
  },
  {
    method: "POST",
    path: `/api/posts`,
    description: "create new post",
    resultMsg: "post created successfully",
    body: post,
    dataType: "object",
    successCode: 201,
    auth: true,
  },
  {
    method: "POST",
    path: `/api/posts/login`,
    description: "login existing post",
    resultMsg: "post successfully logged in",
    body: loginpost,
    dataType: "object",
  },
  {
    method: "POST",
    path: `/api/posts/register`,
    description: "register new post",
    resultMsg: "post successfully registered",
    body: { ...post, email: registerEmail },
    dataType: "object",
    successCode: 201,
  },
  {
    method: "PUT",
    path: `/api/posts/${testpostId}`,
    description: "update post data",
    resultMsg: "post updated successfully",
    body: updatepost,
    dataType: "object",
    auth: true,
  },
  //    { method: 'POST', path: `/api/posts/sendpw`, description: 'reset password for post', resultMsg: 'Reset email sent successfully, check your email', body: loginpost, dataType: 'object' },
  {
    method: "POST",
    path: `/api/posts/${testpostId}/image`,
    description: "update image for post",
    resultMsg: "Image uploaded to profile successfully",
    body: postImage,
    dataType: "object",
  },
  { method: "DELETE", path: `/api/Post/${testpostId}`, description: "delete post", resultMsg: "post deleted successfully", auth: true },
];

describe("Post Routes", () => {
  // test each route, checking content type, response code, and body
  for (let route of postRoutes) {
    test(`${route.method} ${route.path} => ${route.description}`, async () => {
      const req = request(app)[route.method.toLowerCase()](route.path); // dynamically call the right HTTP method

      // if this request requires authentication, send a token
      if (route.auth) {
        const token = createToken(1, "test@post.com");
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
