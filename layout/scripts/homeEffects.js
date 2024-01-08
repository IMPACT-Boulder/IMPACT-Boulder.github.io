 ////scroll effect//////*
 let checkbox=document.querySelector('#menu__toggle')
 //distance required to scroll to cause effect
 //secondary pages scroll threshold
 const SCROLL_THRESHOLD = 70;
 
 //scroll variable
  let lastScrollY = window.scrollY;
 
  //secondary pages event listener
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
  
    if (delta > 0 && delta >= SCROLL_THRESHOLD) {
      // The user has scrolled down by at least SCROLL_THRESHOLD pixels
      //add nav_up class
      
      checkbox.checked=false;
 
    } 
  
    lastScrollY = currentScrollY;
  });
 /////////////////////////////////////////////////////////////
