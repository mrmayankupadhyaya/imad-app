// counter
var button = document.getElementById('counter');

button.onclick = function () {
    
// create a request object
var request = new XMLHttpRequest();

// capture the response and store in variable
request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
    }
};

// make the request
request.open('GET', 'http://mrmayankupadhyaya.imad.hasura-app.io/counter', true);
request.send(null);

};

// submit comment
var comment = document.getElementById('comment_btn');
comment.onclick = function () {
  
  // make req to server and send the comment
// create a request object
var request = new XMLHttpRequest();

// capture the response and store in variable
request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
  // capture a list of comment and render as list
  var comments = request.responseText;
  names = JSON.parse(comments);
  var list_c = '';
  for (var i=0; i< comments.length; i++) {
    list_c += '<li>' + comments[i] + '</li>';  
  }
  var ul = document.getElementById('commentlist');
  ul.innerHTML = list_c;
        }
    }
};

var commentInput = document.getElementById('comment');
var comment = commentInput.value;
// make the request
request.open('GET', 'http://mrmayankupadhyaya.imad.hasura-app.io/submit-comment?comment=' + comment, true);
request.send(null);
  
    
};
// submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
  
  // make req to server and send the name
// create a request object
var request = new XMLHttpRequest();

// capture the response and store in variable
request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
  // capture a list of names and render as list
  var names = request.responseText;
  names = JSON.parse(names);
  var list = '';
  for (var i=0; i< names.length; i++) {
    list += '<li>' + names[i] + '</li>';  
  }
  var ul = document.getElementById('namelist');
  ul.innerHTML = list;
        }
    }
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
// make the request
request.open('GET', 'http://mrmayankupadhyaya.imad.hasura-app.io/submit-name?name=' + name, true);
request.send(null);
  
    
};