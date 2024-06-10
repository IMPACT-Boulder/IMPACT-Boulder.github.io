//Expand Images when clicked

//variables:
//expanded div
var modal = document.getElementById('Modal');
//images
var imgaes = document.getElementsByClassName('image');
//expanded image
var modalImg = document.getElementById("image-modal");
//close image
var span = document.getElementsByClassName("close")[0];

//slice image
imgaes = [].slice.call(imgaes);
//on click expand image into modal div
imgaes.forEach(function(item){
    item.onclick = function(){
  modal.style.display = "block";
      
  modalImg.src = this.getAttribute('src');
}
})

//close image on click
modalImg.onclick = function() { 
  modal.style.display = "none";
}