//Scroll Effects for Nav Menu
document.addEventListener('DOMContentLoaded', function() {
    const menuBox = document.querySelector('.menu__box');
    let isScrolling = false;
  
    menuBox.addEventListener('wheel', function(e) {
      if (!isScrolling) {
        isScrolling = true;
        e.preventDefault();
        
        // Adjust scroll position
        this.scrollTop += e.deltaY;
  
        // Reset scrolling flag after a short delay
        setTimeout(() => {
          isScrolling = false;
        }, 50);
      }
    }, { passive: false });
  });