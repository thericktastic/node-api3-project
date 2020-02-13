const express = require("express");

const Posts = require("../posts/postDb.js");
const Users = require("./userDb.js");

const router = express.Router();

// This POST inserts a new user to the list of users
router.post("/", validateUser, (req, res) => {
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
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const postWithUserID = { ...req.body, user_id: req.user.id };
  Posts.insert(postWithUserID)
    .then(newPost => {
      console.log("This is newPost in router.post('/:id/posts): ", newPost);
      res.status(201).json(newPost);
    })
    .catch(error => {
      console.log("This is error in router.post('/:id/posts): ", error);
      res.status(500).json({ error: "Error creating post" });
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

// This GET retrieves a user specified by :id
router.get("/:id", validateUserId, (req, res) => {
  console.log("This is req.user in router.get('/:id'): ", req.user);
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

// This GET retrieves the posts by a specific user
router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(postsFound => {
      console.log(
        "This is postsFound in router.get(':id/posts'): ",
        postsFound
      );
      res.status(200).json(postsFound);
    })
    .catch(error => {
      console.log("This is error in router.get(':id/posts'): ", error);
      res.status(500).json({ error: "Error retrieving user" });
    });
});

// This DELETE obliterates a specified user
router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(deletedUser => {
      console.log(
        "This is deletedUser in router.delete('/:id'): ",
        deletedUser
      );
      res.status(200).json({ message: "The user has been nuked. " });
    })
    .catch(error => {
      console.log("This is error in router.delete('/:id'): ", error);
      res.status(500).json({ error: "Error deleting this user" });
    });
});

// This PUT updates a specified user
router.put("/:id", validateUserId, (req, res) => {
  Users.update(req.user.id, req.body)
    .then(changes => {
      console.log("This is changes in router.put('/:id'): ", changes);
      res.status(200).json(changes);
    })
    .catch(error => {
      console.log("This is error in router.put('/:id'): ", error);
      res.status(500).json({ error: "Error updating this user" });
    });
});

//Custom Middleware

// This middlware validates the userID and stores the object associated with the ID in req.user
function validateUserId(req, res, next) {
  const { id } = req.params;
  console.log("This is id in validateUserId(): ", id);
  Users.getById(id)
    .then(userFound => {
      console.log("This is userFound in validateUserId(): ", userFound);
      if (userFound && userFound !== undefined) {
        req.user = userFound;
        console.log("This is req.user in validateUserId(): ", req.user);
        next();
      } else {
        res.status(400).json({ error: "This user doesn't exist" });
      }
    })
    .catch(error => {
      console.log("This is error in validateUserId(): ", error);
      res.status(500).json({ error: "Error validating user ID" });
    });
}

// This middleware validates a user upon creation of said user and spits out errors if req.body is missing OR if the name of the user is missing/blank
function validateUser(req, res, next) {
  console.log("This is req.body in validateUser(): ", req.body);
  if (!req.body) {
    res.status(400).json({ error: "Missing user data" });
  } else if (!req.body.name || req.body.name === "") {
    res.status(400).json({ error: "Missing required name field" });
  } else {
    next();
  }
}

// This middleware validates a post upon creation of said post and spits out errors if req.body is missing OR if the content of the post is missing/blank
function validatePost(req, res, next) {
  console.log("This is req.body in validatePost(): ", req.body);
  if (!req.body) {
    res.status(400).json({ error: "Missing post data" });
  } else if (!req.body.text || req.body.text === "") {
    res.status(400).json({ error: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
