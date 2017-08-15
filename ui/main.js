console.log('Loaded!');
// change the text of mail div
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

// move image
var img = document.getElementById('img');
img.onclick = function () {
  img.style.marginLeft = '100px';  
    
};
