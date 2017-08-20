var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
    title: 'Article One | Mayank',
    heading: 'Article One',
    date: '15 Aug, 2017',
    content: `
    
                <p>
                    This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. 
                </p>
                <p>
                    This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. 
                </p>
                <p>
                    This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. 
                </p>
    
    `,
},
    'article-two': {
            title: 'Article Two | Mayank',
    heading: 'Article Two',
    date: '16 Aug, 2017',
    content: `
    
                <p>
                    This is the content for my second article.
                </p>
    `,
    },
    'article-three': {
                    title: 'Article Three | Mayank',
    heading: 'Article Three',
    date: '17 Aug, 2017',
    content: `
    
                <p>
                    This is the content for my third article.
                </p>
    `,
    }
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
            ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                ${heading}
                </h3>
                <div>
                ${date}
                </div>
                <div>
                ${content}
                </div>
                </div>
                <div class="footer">
                <hr/>
                <input type="text"  id="comment" placeholder="comment"></input>
                <input type="submit" value="Submit Comments" id="comment_btn"></input>
                <ul id="commentlist">
                </ul>
                </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

var comments = [];
app.get('/submit-comment', function (req, res) { // URL: /submit-comment?comment=xxxxx
   // get the comment from request
   var comment = req.query.comment; 
   comments.push(comment);
   // JSON - Javascript Object Notation
   res.send(JSON.stringify(comments));
   
});

var names = [];
app.get('/submit-name', function (req, res) { // URL: /submit-name?name=xxxxx
   // get the name from request
   var name = req.query.name; 
   names.push(name);
   // JSON - Javascript Object Notation
   res.send(JSON.stringify(names));
   
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;    
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// var names = [];
// app.get('/submit-name/:name', function (req, res) {
//   // get the name from request
//   var name = req.params.name; 
//   names.push(name);
//   // JSON - Javascript Object Notation
//   res.send(JSON.stringify(names));
   
// });




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
