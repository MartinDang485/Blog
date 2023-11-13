const express = require('express')
const app = express()
require('dotenv').config()
const password = process.env.DATABASE_PASS;
const blog = require('./models/blogModel')

const mongoose = require('mongoose')

const uri = "mongodb+srv://thehobbybobby:"+ password +"@cluster0.zsin4ry.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true})
.then((result) => {
    console.log("Connected to database")
    app.listen(3000)
})
.catch((err) => {
    console.log(err);
})

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ urlencoded: true}))

app.use((req,res,next) => {
    next()
    console.log("New Request Made")
})

//Home page router
app.get('/', (req,res) => {
    blog.find().sort({createdAt: -1})
    .then(result => {
        res.render('index', { allBlogs: result})
    })
    .catch(err => {
        console.log(err)
    })
});

//Single page router
app.get('/post/:id', (req, res) => {
    const id = req.params.id
    blog.findById(id)
    .then(result => {
        res.render('post', { details: result})
    })
    .catch(err => {
        console.log(err);
    })
});

//Go to create page
app.get('/create', (req,res) => {
    res.render('create')
});

//Create page router
app.post('/create', (req,res) => {
    const post = new blog(req.body);
    console.log(post)

    post.save()
    .then((result) => {
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err)
    })
})

//Delete
app.delete('/delete', (req,res) => {
    const id = req.params.id
    blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/index '})
    })
    .catch(err => {
        console.log(err)
    })
})

//404 message error router
app.use((req,res) => {
    res.status(404).render('404');
})