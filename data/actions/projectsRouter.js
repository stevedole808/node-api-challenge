const express = require("express");

const router = express.Router();

const Projects = require("../helpers/projectModel");

router.get("/", (req, res) => {
  Projects.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error retrieving users."
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Projects.getById(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error retrieving user by id."
      });
    });
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error retrieving user by id."
      });
    });
});

module.exports = router;
