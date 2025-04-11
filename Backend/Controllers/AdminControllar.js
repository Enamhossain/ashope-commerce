const usersCollection = require ("../models/user");


exports.getAllUsers = async (req, res) => {
  const users = await usersCollection.find({}).exec();
  if (!users || users.length === 0)
    return res.status(200).send({
      message: "No users in database",
      users: null,
      count: 0,
    });

  return res.status(200).send({
    message: "Users fetched successfully",
    users: users,
  });
};