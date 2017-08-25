var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
    user: 'mrmayankupadhyaya',
    database: 'mrmayankupadhyaya',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

// var articles = {
//     'article-one': {
//     title: 'Article One | Mayank',
//     heading: 'Article One',
//     date: '15 Aug, 2017',
//     content: `
    
//                 <p>
//                     This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. 
//                 </p>
//                 <p>
//                     This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. 
//                 </p>
//                 <p>
//                     This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. 
//                 </p>
    
//     `,
// },
//     'article-two': {
//             title: 'Article Two | Mayank',
//     heading: 'Article Two',
//     date: '16 Aug, 2017',
//     content: `
    
//                 <p>
//                     This is the content for my second article.
//                 </p>
//     `,
//     },
//     'article-three': {
//                     title: 'Article Three | Mayank',
//     heading: 'Article Three',
//     date: '17 Aug, 2017',
//     content: `
    
//                 <p>
//                     This is the content for my third article.
//                 </p>
//     `,
//     }
// };

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
                ${date.toDateString()}
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
                <script>
                    var submit_comment = document.getElementById('comment_btn');
                    submit_comment.onclick = function () {
                      
                    var request = new XMLHttpRequest();
                    
                    request.onreadystatechange = function () {
                        if (request.readyState === XMLHttpRequest.DONE) {
                            if (request.status === 200) {
                      var comments = request.responseText;
                      comments = JSON.parse(comments);
                      var list = '';
                      for (var i=0; i< comments.length; i++) {
                        list += '<li>' + comments[i] + '</li>';  
                      }
                      var ul = document.getElementById('commentlist');
                      ul.innerHTML = list;
                            }
                        }
                    };
                    
                    var commentInput = document.getElementById('comment');
                    var comment = commentInput.value;
                    request.open('GET', 'http://mrmayankupadhyaya.imad.hasura-app.io/submit-comment?comment=' + comment, true);
                    request.send(null);
                    };
                </script>
        </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input, salt) {
 var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');   
 return hashed.toString('hex');
}

app.get('/hash/:input', function (req, res) {
   var hashedString = hash(req.param.input, 'this-is-some-random-string');
   res.send(hashedString);
});


var pool = new Pool(config);
app.get('/test-db', function (req, res) {
   // make a select request
   // return a response with result
   pool.query('SELECT * FROM test', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
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

app.get('/articles/:articleName', function (req, res) {
  // http://mrmayankupadhyaya.imad.hasura-app.io/articles/'; DELETE FROM article where 'a' = 'a
//   pool.query("SELECT * FROM article_db WHERE title = '" + req.params.articleName + "'", function (err, result) {
  pool.query("SELECT * FROM article_db WHERE title = $1", [req.params.articleName], function (err, result) {
     if (err) {
         res.status(500).send(err.toString());
     } else {
         if (result.rows.length === 0) {
             res.status(404).send('Article not found');
         } else {
             var articleData = result.rows[0];
//   res.send(createTemplate(articles[articleName]));
     res.send(createTemplate(articleData));
         }
     }
  });
  
  
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
