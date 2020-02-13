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
router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.post;
  Posts.getById(id)
    .then(postFound => {
      console.log("This is postFound in router.get('/:id'): ", postFound);
      res.status(200).json(postFound);
    })
    .catch(error => {
      console.log("This is error in router.get('/:id'): ", error);
      res.status(500).json({ error: "Error retrieving post" });
    });
});

// This DELETE decimates a specific post
router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.post;
  Posts.remove(id)
    .then(deletedPost => {
      console.log(
        "This is deletedPost in router.delete('/:id'): ",
        deletedPost
      );
      res.status(200).json({ message: "This post has been nuked." });
    })
    .catch(error => {
      console.log("This is error in router.delete('/:id'): ", error);
      res.status(500).json({ error: "Error deleting post" });
    });
});

// This PUT updates a specific post
router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  console.log("This is req.params in router.put('/:id'): ", req.params);
  Posts.update(id, req.body)
    .then(changes => {
      console.log("This is changes in router.put('/:id'): ", changes);
      res.status(200).json(changes);
    })
    .catch(error => {
      console.log("This is error in router.put('/:id): ", error);
      res.status(500).json({ error: "Error updating post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then(postFound => {
      console.log("This is postFound in validatePostId(): ", postFound);
      if (postFound && postFound !== undefined) {
        req.post = postFound;
        console.log("This is req.post in validatePostId(): ", postFound);
        next();
      } else {
        res.status(400).json({ error: "This post doesn't exist" });
      }
    })
    .catch(error => {
      console.log("This is error in validatePostId(): ", error);
      res.status(500).json({ error: "Error validating post ID" });
    });
}

module.exports = router;
