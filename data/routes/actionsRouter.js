const express = require("express");

const router = express.Router();

const Actions = require("../helpers/actionModel");

router.get("/", (req, res) => {
  Actions.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error, actions could not be found."
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Actions.get(id)
    .then(data => {
      if (id) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          error: "Action with that id cannot be found"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "These actions with this specific id could not be found"
      });
    });
});

router.post("/", (req, res) => {
  const newAction = req.body;
  console.log(newAction);
  Actions.insert(newAction)
    .then(post => {
      if (newAction.project_id && newAction.description && newAction.notes) {
        res.status(201).json(post);
      } else {
        res.status(400).json({
          error: "Error: Description, Notes and Project Id are required"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding an action."
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Actions.remove(id)
    .then(deleted => {
      if (!id) {
        res.status(404).json({
          message: "The action with this specific ID does not exist"
        });
      } else {
        res.status(200).json({ deleted });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "Action couldn't be deleted"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updateAction = req.body;

  Actions.update(id, updateAction)
    .then(update => {
      if (
        updateAction.notes &&
        updateAction.description &&
        updateAction.completed
      ) {
        res.status(200).json({ update})
       } else {
        res.status(400).json({ errorMessage: "Action could not be edited"});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The action information could not be updated"
      });
    });
});

module.exports = router;
