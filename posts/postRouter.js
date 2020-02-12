const express = require("express");

const Posts = require("./postDb.js");

const router = express.Router();

// This GET retrieves all existing posts
router.get("/", (req, res) => {
  Posts.get()
    .then(postsFound => {
      console.log("This is postsFound in router.get('/'): ", postsFound);
      res.status(200).json(postsFound);
    })
    .catch(error => {
      console.log("This is error in router.get('/'): ", error);
      res.status(500).json({ error: "Error retrieving posts" });
    });
});

// This GET retrieves a specific post
router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
