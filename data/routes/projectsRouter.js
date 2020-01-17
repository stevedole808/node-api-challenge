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
        errorMessage: "Error retrieving projects."
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Projects.get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error project by id."
      });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  Projects.insert(newProject)
    .then(project => {
      if (newProject.name || newProject.description) {
        res.status(201).json(project);
      } else {
        res.status(400).json({
          errorMessage: "Please provide name and description for new a project"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "Error saving this project"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Projects.update(id, body)
    .then(updated => {
      if (!id) {
        res.status(404).json({
          message: "The project with the specific ID does not exist"
        });
      } else if (!req.body.title || !req.body.description) {
        res.status(400).json({
          message: "Please provide name and description for updated project"
        });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project information couldn't update"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Projects.remove(id)
    .then(deleted => {
      if (!id) {
        res.status(404).json({
          message: "The project with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ deleted });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "Project could not be removed"
      });
    });
});

module.exports = router;
