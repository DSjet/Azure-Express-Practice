// Import necessary modules
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blog Post API");
});

// Route to get all blog posts
app.get("/posts", async (req, res) => {
  const posts = await prisma.blogPost.findMany();
  res.json(posts);
});

// Route to create a new blog post
app.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an error occured" });
  }
});

// Route to get a single post by ID
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an error occured" });
  }
});

// Route to update a blog post by ID
app.put("/posts/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: { title, content },
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an error occured" });
  }
});

// Route to delete a blog post by ID
app.delete("/posts/:id", async (req, res) => {
  try {
    await prisma.blogPost.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an error occured" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
