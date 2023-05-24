const { toDo } = require('./api/db.js')


const express = require('express')
const router = express.Router()




// express waits until it gets a GET request at the / endpoint
// when it gets that request, it creates a req and res object
// THEN it calls handler and passes it those two objects
// (handler is a function that takes in those objects as arguments)


router.get('/all', (req, res) => {
  res.json(toDo)

})

router.get('/:id', (req, res) => {
  // find appropriate post
  const post = posts.find(post => post.id === req.params.id)

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

  const ids = toDo.map(p => parseInt(p.id))
  let newId = Math.max(...ids) + 1
  newId = newId.toString().padStart(3, '0')

  req.body.id = newId

  toDo.push(req.body)

  res.send('added new post')
})


router.put('/:id', (req, res) => {
  let postIndex = toDo.findIndex(
    post => parseInt(post.id) === parseInt(req.params.id)
  )

  const id = toDo[postIndex].id


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
// let postIndex = toDo.findIndex(
//     post => parseInt(post.id) === parseInt(req.params.id)
//   )
// const id = toDo[postIndex].id

//   db[postIndex] = req.authorId

//   db[postIndex] = req.task

//   db[postIndex] = req.completed
//   }


//example 
router.patch('/:id', (req, res) => {
  const toDoId = parseInt(req.params.id);
  const toDoPatch = toDo.find((toDo) => toDo.id === toDoId);
  if (toDoPatch) {
    if (req.body.task) {
      toDoPatch.task = req.body.task;
    }
    if (req.body.authorId) {
      toDoPatch.authorId = req.body.authorId;
    }
    if (req.body.completed !== undefined) {
      toDoPatch.completed = req.body.completed;
    }
    res.json(toDoPatch);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});




router.delete('/:id', (req, res) => {
  // this code has to actually do the deleting

  const index = toDo.findIndex(
    post => parseInt(post.id) === parseInt(req.params.id)
  )
  const deleted = toDo.splice(index, 1)

  res.json({
    message: 'deletion successful',
    recordsDeleted: deleted
  })
})



module.exports = router