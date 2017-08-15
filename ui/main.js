console.log('Loaded!');
// change the text of mail div
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

// move image
var img = document.getElementById('madi');
function moveRight () {
  marginLeft = marginLeft + 10;
  img.style.marginLeft = marginLeft + 'px';
}
var marginLeft = 0;
img.onclick = function () {
  var interval = setInterval(moveRight, 50);
  img.style.marginLeft = '100px';  
    
};
