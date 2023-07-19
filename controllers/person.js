const { validationResult } = require("express-validator");
const personModel = require("../models/person");

exports.insert = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation errors");
    error.statusCode = 400;
    error.errorArr = errors.array();
    res.status(400).json({ error: error });
  }

  try {
    const newPerson = new personModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      createdDate: new Date(),
    });

    const result = await newPerson.save();

    res.status(200).json({ data: result });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const personId = req.params.personId;

  try {
    const result = await personModel.findByIdAndDelete(personId);

    res.status(200).json({ data: result });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await personModel.find();

    res.status(200).json({ data: result });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation errors");
    error.statusCode = 400;
    error.errorArr = errors.array();
    res.status(400).json({ error: error });
  }

  const personId = req.params.personId;

  try {
    const updatedPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
    };

    const existingUser = await personModel.findById(personId);

    if (!existingUser) {
      const error = new Error("No such person");
      throw error;
    }

    existingUser.firstName = updatedPerson.firstName;
    existingUser.lastName = updatedPerson.lastName;
    existingUser.address = updatedPerson.address;
    existingUser.city = updatedPerson.city;
    existingUser.phone = updatedPerson.phone;

    const result = await existingUser.save();

    res.status(200).json({ data: result });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
