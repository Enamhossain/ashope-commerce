const { ObjectId } = require("mongodb");
const usersCollection = require("../models/user");
const bcrypt = require("bcrypt");

class UserService {
  async findByEmail(email) {
    return await usersCollection.findOne({ email });
  }

  async findById(id) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid user ID");
    return await usersCollection.findOne({ _id: new ObjectId(id) });
  }

  async createUser(userData) {
    return await usersCollection.insertOne(userData);
  }

  async updateUser(id, updates) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid user ID");
    return await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
  }

  async deleteUser(id) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid user ID");
    return await usersCollection.deleteOne({ _id: new ObjectId(id) });
  }

  async getAllUsers(excludeSensitive = true) {
    const projection = excludeSensitive ? { password: 0, verificationPin: 0 } : {};
    return await usersCollection.find({}, { projection }).toArray();
  }

  // Verification PINs should ideally be in a separate collection with a TTL index
  // For now, let's keep it simple but move towards a more robust solution
}

module.exports = new UserService();
