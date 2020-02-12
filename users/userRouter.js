const express = require("express");

const Posts = require("../posts/postDb.js");
const Users = require("./userDb.js");

const router = express.Router();

// This POST inserts a new user to the list of users
router.post("/", (req, res) => {
  Users.insert(req.body)
    .then(newUser => {
      console.log("This is the newUser in router.post('/'): ", newUser);
      res.status(201).json(newUser);
    })
    .catch(error => {
      console.log("This is error in router.post('/'): ", error);
      res.status(500).json({ error: "The user could not be added" });
    });
});

// This POST inserts a post under the specified userID
router.post("/:id/posts", (req, res) => {
  console.log("This is req in router.post('/:id/posts'): ", req.body);
  const newPost = req.body;
  const { id } = req.params;
  console.log("This is id in router.post('/:id/posts'): ", id);
  Users.getById(id)
    .then(userFound => {
      if (userFound && userFound > 0) {
        Posts.insert(newPost)
          .then(post => {
            console.log(
              "This is post in Posts.insert(newPost) in router.post('/:id/posts'): ",
              post
            );
            res.status(201).json(post);
          })
          .catch(error => {
            console.log(
              "This is error in Posts.insert(newPost) in router.post('/:id/posts'): ",
              error
            );
            res.status(500).json({ error: "Error adding post" });
          });
      } else {
        res.status(404).json({
          error: "The user with that ID doesn't exist in our plane of reality"
        });
      }
    })
    .catch(error => {
      console.log("This is error in router.post('/:id/posts'): ", error);
      res.status(500).json({ error: "Error finding user" });
    });
});

// This GET retrieves all users at /api/users/
router.get("/", (req, res) => {
  Users.get()
    .then(usersFound => {
      console.log("This is user in router.get('/'): ", usersFound);
      res.status(200).json(usersFound);
    })
    .catch(error => {
      console.log("This is error in router.get('/'): ", error);
      res.status(500).json({ error: "Error retrieving users" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  Users.getById(id)
    .then(userFound => {
      console.log("This is userFound in router.get('/:id'): ", userFound);
      res.status(200).json(userFound);
    })
    .catch(error => {
      console.log("This is error in router.get('/:id'): ", error);
      res.status(500).json({ error: "Error retrieving user" });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
