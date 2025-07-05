// controllers/userController.js

const { Client, Users } = require("node-appwrite");

// Initialize Appwrite client and Users instance
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const users = new Users(client);

// Controller method to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Optionally: Add admin authentication/authorization check here
    const userList = await users.list();
    res.json(userList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// You can add more user-related controller methods here, e.g.:
// exports.getUserById = async (req, res) => { ... };
// exports.deleteUser = async (req, res) => { ... };
