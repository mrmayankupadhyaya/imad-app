// // counter
// var button = document.getElementById('counter');

// button.onclick = function () {
    
// // create a request object
// var request = new XMLHttpRequest();

// // capture the response and store in variable
// request.onreadystatechange = function () {
//     if (request.readyState === XMLHttpRequest.DONE) {
//         if (request.status === 200) {
//             var counter = request.responseText;
//             var span = document.getElementById('count');
//             span.innerHTML = counter.toString();
//         }
//     }
// };

// // make the request
// request.open('GET', 'http://mrmayankupadhyaya.imad.hasura-app.io/counter', true);
// request.send(null);

// };

// // submit comment
// var submit_comment = document.getElementById('comment_btn');
// submit_comment.onclick = function () {
  
//   // make req to server and send the comment
// // create a request object
// var request = new XMLHttpRequest();

// // capture the response and store in variable
// request.onreadystatechange = function () {
//     if (request.readyState === XMLHttpRequest.DONE) {
//         if (request.status === 200) {
//   // capture a list of comment and render as list
//   var comments = request.responseText;
//   comments = JSON.parse(comments);
//   var list = '';
//   for (var i=0; i< comments.length; i++) {
//     list += '<li>' + comments[i] + '</li>';  
//   }
//   var ul = document.getElementById('commentlist');
//   ul.innerHTML = list;
//         }
//     }
// };

// var commentInput = document.getElementById('comment');
// var comment = commentInput.value;
// // make the request
// request.open('GET', 'http://mrmayankupadhyaya.imad.hasura-app.io/submit-comment?comment=' + comment, true);
// request.send(null);
  
    
// };

// submit username password to login
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
  
  // make req to server and send the name
// create a request object
var request = new XMLHttpRequest();

// capture the response and store in variable
request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
        console.log('user logged in');
        alert('Logged in successfully');
        } else if (request.status === 403) {
            alert('Username/password is incorrect');
        } else if (request.status === 500) {
            alert('something went wrong on the server');
        }
    }
};

var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);

// make the request
request.open('POST', 'http://mrmayankupadhyaya.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username: username, password: password}));
  
    
};