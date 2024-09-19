// Import necessary modules
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database" for blog posts
let blogPosts = [
  { id: "1", title: "First Post", content: "This is my first blog post." },
  { id: "2", title: "Second Post", content: "This is my second blog post." },
];

app.get("/", (req, res) => {
  res.send("Blog Post API");
});

// Route to get all blog posts
app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

// Route to create a new blog post
app.post("/posts", (req, res) => {
  const newPost = {
    id: (blogPosts.length + 1).toString(),
    title: req.body.title,
    content: req.body.content,
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Route to get a single post by ID
app.get("/posts/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Route to update a blog post by ID
app.put("/posts/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === req.params.id);
  if (post) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Route to delete a blog post by ID
app.delete("/posts/:id", (req, res) => {
  const postIndex = blogPosts.findIndex((p) => p.id === req.params.id);
  if (postIndex !== -1) {
    blogPosts.splice(postIndex, 1);
    res.json({ message: "Post deleted" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
