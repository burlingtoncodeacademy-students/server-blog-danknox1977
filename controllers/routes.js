const { blog } = require('../api/blog.json')


const express = require('express')
const router = express.Router()




// express waits until it gets a GET request at the / endpoint
// when it gets that request, it creates a req and res object
// THEN it calls handler and passes it those two objects
// (handler is a function that takes in those objects as arguments)


router.get('/all', (req, res) => {
  res.json(blog)

})

router.get('/:id', (req, res) => {
  // find appropriate post
  const post = post_id.find(post => post.id === req.params.id)

  // send it back to the user
  res.json(post)
})

router.get('/author/:userId', (req, res) => {
  const postsFiltered = posts.filter(
    post => post.userId === parseInt(req.params.userId)
  )
  res.json(postsFiltered)
})

router.post('/new', (req, res) => {
  // db.sort((a, b) => parseInt(a.id) < parseInt(b.id))
  // console.log(db)
  // console.log(parseInt(db.at(-1).id) + 1)

  const ids = blog.map(p => parseInt(p.id))
  let newId = Math.max(...ids) + 1
  newId = newId.toString().padStart(3, '0')

  req.body.id = newId

  blog.push(req.body)

  res.send('added new post')
})


router.put('/:id', (req, res) => {
  let postIndex = blog.findIndex(
    post => parseInt(post.id) === parseInt(req.params.id)
  )

  const id = blog[postIndex].id


  db[postIndex] = req.body
  db[postIndex].id = id

  res.json({
    message: 'update successful',
    recordUpdated: req.body
  })
})

// write the code for a PATCH endpoint at '/:id'
// router.patch('/:id', (req, res) => {
//   // your code goes here!
// let postIndex = blog.findIndex(
//     post => parseInt(post.id) === parseInt(req.params.id)
//   )
// const id = blog[postIndex].id

//   db[postIndex] = req.authorId

//   db[postIndex] = req.task

//   db[postIndex] = req.completed
//   }


//example 
router.patch('/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogPatch = blog.find((blog) => blog.id === blogId);
  if (blogPatch) {
    if (req.body.task) {
      blogPatch.task = req.body.task;
    }
    if (req.body.authorId) {
      blogPatch.authorId = req.body.authorId;
    }
    if (req.body.completed !== undefined) {
      blogPatch.completed = req.body.completed;
    }
    res.json(blogPatch);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});




router.delete('/:id', (req, res) => {
  // this code has to actually do the deleting

  const index = blog.findIndex(
    post => parseInt(post.id) === parseInt(req.params.id)
  )
  const deleted = blog.splice(index, 1)

  res.json({
    message: 'deletion successful',
    recordsDeleted: deleted
  })
})



module.exports = router