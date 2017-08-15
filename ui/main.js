// counter
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
    
// create a request object
var request = new XMLHttpRequest();

// capture the response and store in variable
request.onreadystatchange = function () {
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