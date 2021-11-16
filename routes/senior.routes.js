const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Senior = require(".././models/Senior.model");

const isLoggedIn = require("../middleware/isLoggedIn");

//create new Senior
router.post("/seniors", isLoggedIn, (req, res, next) => {
  const { name, location, contact, image } = req.body;

  Senior.create({
    name,
    location,
    contact,
    needsList: [],
    image
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//get all Seniors from DB
router.get("/seniors", (req, res, next) => {
  Senior.find()
    .populate("needsList")
    .then((seniorsFromDB) => res.json(seniorsFromDB))
    .catch((err) => res.json(err));
});

//get specific Senior
router.get("/seniors/:seniorId",isLoggedIn, (req, res, next) => {
  const { seniorId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(seniorId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Senior.findById(seniorId)
  .populate('needsList')
  .then((senior) => res.status(200).json(senior))
  .catch(err => res.json(err))
});


//update specific Senior => only for Admin !!!!!!!!
router.put("/seniors/:seniorId", (req, res, next) => {
    const { seniorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(seniorId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Senior.findByIdAndUpdate(seniorId, req.body).then(() =>
      res.json({ message: `Senior with ${seniorId} is updated successfully.` })
    )
    .catch(error => res.json(error));
});


//delete specific Senior => only for Admin !!!!!!!!
router.delete("/seniors/:seniorId", (req, res, next) => {
    const { seniorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(seniorId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Senior.findByIdAndRemove(seniorId)
      .then(() =>
        res.json({
          message: `Senior with ${seniorId} is removed successfully.`,
        })
      )
      .catch((error) => res.json(error));
});

module.exports = router;
