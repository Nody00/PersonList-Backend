const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const personController = require("../controllers/person");

router.post(
  "/insert",
  [
    body("firstName").notEmpty().escape().trim(),
    body("lastName").notEmpty().escape().trim(),
    body("address").notEmpty().escape().trim(),
    body("city").notEmpty().escape().trim(),
    body("phone").notEmpty().escape().trim(),
  ],
  personController.insert
);

router.post(
  "/update/:personId",
  [
    body("firstName").notEmpty().escape().trim(),
    body("lastName").notEmpty().escape().trim(),
    body("address").notEmpty().escape().trim(),
    body("city").notEmpty().escape().trim(),
    body("phone").notEmpty().escape().trim(),
  ],
  personController.update
);

router.delete("/delete/:personId", personController.delete);

router.get("/getAll", personController.getAll);

module.exports = router;
