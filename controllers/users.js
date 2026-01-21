const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['users']
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['users']
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: userId });
  const contacts = await result.toArray();
  if (contacts.length > 0) {
    res.setHeader("content-Type", "application/json");
    res.status(200).json(contacts[0]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['users']
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(200).json({ message: "User updated successfully" });
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['users']
  const userId = new ObjectId(req.params.id);
  
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user");
  }
};
module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
