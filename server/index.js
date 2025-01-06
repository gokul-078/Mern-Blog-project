
// Import or install express, cors, mongoose, dotenv:
const express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
require('dotenv').config()
const upload = require('express-fileupload')

// Import user and post routes:
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// Import error handling middleware
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')



const app = express()


// Using Middlewares:

// Json builtin middlewares:
app.use(express.json({extended: true}))
// Url builtin middlewares it is used to handle the form methods:
app.use(express.urlencoded({extended: true}))
// Cross origin resource sharing(cors) Third party middlewares:
app.use(cors({credentials: true, origin: ["http://localhost:3000", "https://mern-blog-server-6n0r.onrender.com", "https://mern-blog-project-xi.vercel.app"]}))

// Upload routes and middleware:
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))


// Routes: Now it is acting as a individual app itself:
// User Routes:
app.use('/api/users', userRoutes)
// Post Routes:
app.use('/api/posts', postRoutes)



// Error handling routes:
app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URI).then(app.listen(process.env.PORT || 5000, () => console.log(`Server started on ${process.env.PORT}`))).catch(error => console.log(error))

