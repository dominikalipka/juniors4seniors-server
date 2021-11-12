const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Need = require(".././models/Need.model");
const Senior = require(".././models/Senior.model");

//create new need
router.post("/needs", (req, res, next) => {
  const { title, description, seniorId } = req.body;

  Need.create({ title, description, senior: seniorId })
    .then((newNeed) => {
      return Senior.findByIdAndUpdate(seniorId, {
        $push: { needsList: newNeed._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// get a specific need
router.get("/seniors/:seniorId/needs/:needId", (req, res, next) => {
  const { needId } = req.params;

  Need.findById(needId)
    .then((task) => res.json(task))
    .catch((error) => res.json(error));
});

// edit a specific need
router.put("/seniors/:seniorId/needs/:needId", (req, res, next) => {
  const { needId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(needId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Need.findByIdAndUpdate(needId, req.body)
    .then(() =>
      res.json({ message: `Need with ${needId} is updated successfully.` })
    )
    .catch((err) => res.json(err));
});

// delete a specific need
router.delete("/seniors/:seniorId/needs/:needId", (req, res, next) => {
  const { needId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(needId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Need.findByIdAndRemove(needId)
    .then(() =>
      res.json({ message: `Need with ${needId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
