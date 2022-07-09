const router = require('express').Router();
let Post = require('../models/post');
let User = require('../models/user');

router.route('/').get((req, res) => {
  User.findOne({ username: req.query.user })
    .then((user) => {
      if (user) {
        Post.find({ authorId: user.id })
          .then((posts) => res.json(posts))
          .catch((err) => res.status(400).json('Error: ' + err));
      }
    })
    .catch((err) => res.status(400).json({ message: '', error: err }));
});

router.route('/').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const body = req.body.body;
  const authorId = req.body.authorId;
  const slug = 'slug';
  const newPost = new Post({
    title,
    description,
    body,
    slug,
    authorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  newPost
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  let body = req.body.body;

  Post.findById(req.params.id)
    .then((post) => {
      if (title) {
        post.title = title;
      }
      if (description) {
        post.description = description;
      }
      if (body) {
        post.body = body;
      }
      post.updatedAt = new Date();
      post
        .save()
        .then(() => res.json('post updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json('Resource Not found');
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
