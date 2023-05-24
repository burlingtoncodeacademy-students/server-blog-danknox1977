//required modules, file system, express 

const fs = require('fs');
const express = require('express');
const router = express.Router();

// imports blog.JSON file and turns into a js friendly format
const jsonData = fs.readFileSync('./api/blog.json', 'utf8');
let blogData = JSON.parse(jsonData);

// handler to get all the blog posts
router.get('/blogs', (req, res) => {
  res.json(blogData);
});

// Get a specific blog by post_id
router.get('/blogs/:post_id', (req, res) => {
  const { post_id } = req.params;
  const blog = blogData.find((blog) => blog.post_id === parseInt(post_id));

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'The blog you entered does not exist' });
  }
});

// Post a new blog
router.post('/blogs', (req, res) => {
  const { title, author, body } = req.body;
  const newBlog = { post_id: blogData.length + 1, title, author, body };

  blogData.push(newBlog);
  updateBlog();

  res.status(200).json(newBlog);
});

// Replace a specific blog by post_id
router.put('/blogs/:post_id', (req, res) => {
  const { post_id } = req.params;
  const { title, author, body } = req.body;
  const blog = blogData.find((blog) => blog.post_id === parseInt(post_id));

  if (blog) {
    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.body = body || blog.body;
    updateBlog();

    res.json(blog);
  } else {
    res.status(404).json({ error: 'The blog you want to change does not exist' });
  }
});

// Patch particular parameters
router.patch('/blogs/:post_id', (req, res) => {
    const blogId = parseInt(req.params.post_id);
    const blogPatch = blogData.find((blog) => blog.post_id === blogId);
    if (blogPatch) {
      if (req.body.title) {
        blogPatch.title = req.body.title;
      }
      if (req.body.author) {
        blogPatch.author = req.body.author;
      }
      if (req.body.body !== undefined) {
        blogPatch.body = req.body.body;
      }
      res.json(blogPatch);
      updateBlog();
    } else {
      res.status(404).json({ error: 'The blog you want to patch does not exist' });
    }
  });

// Delete a specific blog by post_id
router.delete('/blogs/:post_id', (req, res) => {

    const index = blogData.findIndex(
        post => parseInt(post.post_id) === parseInt(req.params.post_id)
      )
      const deleted = blogData.splice(index, 1)
    
      res.json({
        message: 'deletion successful',
        recordsDeleted: deleted,
        
      })
      updateBlog()
    })
    

// Update blog.json
function updateBlog() {
  const updatedData = JSON.stringify(blogData, null, 2);
  fs.writeFileSync('./api/blog.json', updatedData, 'utf8');
}

module.exports = router;
