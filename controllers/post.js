const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find()
  res.status(200).json(posts)
};
