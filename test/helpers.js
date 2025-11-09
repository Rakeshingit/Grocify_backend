// test/helpers.js
const { connect, clearDatabase, closeDatabase } = require("./setupMongo.js");

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
  jest.clearAllMocks();
});

afterAll(async () => {
  await closeDatabase();
});
