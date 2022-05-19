const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');

//for user id creation - function uuid()
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

//show comments
app.get('/comments', (req, res) => {
	res.render('comments/index', {comments});
})


//post comments
app.post('/comments', (req, res) => {
	console.log(req.body);
	const {username, comment} = req.body;
	comments.push({username, comment, id: uuid()}); //uuid() will create new id for new comment
	console.log(comments);
	res.redirect('/comments');
})

//for creating comments
app.get('/comments/new', (req, res) => {
	res.render('comments/new');	
})

//show comment useing id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

//edit comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})


//updating comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);

    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body:
    foundComment.comment = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments')
})

//comment delete
app.delete('/comments/:id', (req,res) => {
	const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
	res.redirect('/comments')
})

app.listen(3000, () => {
	console.log('Listen on 3000!');
})