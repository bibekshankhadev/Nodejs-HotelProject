const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();

    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    onsole.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Getting worktype from URL parameter.

    if (workType == "chef" || workType == "waiter") {
      const response = await Person.find({ work: workType });

      console.log("Search complete");

      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Person Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const personData = req.body;

    const response = await Person.findByIdAndUpdate(personId, personData, {
      new: true, //return Updated document
      runValidators: true, //runs Mongoose validators
    });

    if (!response) res.status(404).json("User not found");

    console.log("Data has been updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      res.status(404).json("Person Not found");
    }
    console.log("User Deleted successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
