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

// submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
  
  // make req to server and send the name
  
  // capture a list of names and render as list
  var names = ['name1', 'name2', 'name3', 'name4'];
  var list = '';
  for (var i=0, i< names.length, i++) {
    list += '<li>' + names[i] + '</li>';  
  }
  var ul = document.getElementById('namelist');
  ul.innerHTML = list;
    
};
