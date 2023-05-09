 ////scroll effect//////
 let checkbox=document.querySelector('#menu__toggle');
 //distance required to scroll to cause effect
 //secondary pages scroll threshold
const SCROLL_THRESHOLD = 30;
 //home page scroll threshold
const SCROLL_THRESHOLD_HOME = 70;



 let lastScrollY = window.scrollY;
 
 window.addEventListener('scroll', () => {
   const currentScrollY = window.scrollY;
   const delta = currentScrollY - lastScrollY;
 
   if (delta > 0 && delta >= SCROLL_THRESHOLD) {
     // The user has scrolled down by at least SCROLL_THRESHOLD pixels
     document.querySelector(".the-header").classList.add("nav_up")
     document.querySelector(".menu__box").classList.add("nav_up")

   } else if (delta < 0 && -delta >= SCROLL_THRESHOLD) {
     // The user has scrolled up by at least SCROLL_THRESHOLD pixels
     document.querySelector(".the-header").classList.remove("nav_up")
     document.querySelector(".menu__box").classList.remove("nav_up")
   }
 
   lastScrollY = currentScrollY;
 });

/////////////////////////////////////////////////////////////
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;

  if (delta > 0 && delta >= SCROLL_THRESHOLD_HOME) {
    // The user has scrolled down by at least SCROLL_THRESHOLD pixels
    
    document.querySelector(".menu__box__home").classList.add("nav_up")
    checkbox.checked=false;
  } else if (delta < 0 && -delta >= SCROLL_THRESHOLD) {
    // The user has scrolled up by at least SCROLL_THRESHOLD pixels

    document.querySelector(".menu__box__home").classList.remove("nav_up")
  }

  lastScrollY = currentScrollY;
});