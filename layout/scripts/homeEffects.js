//home scroll nav
//homepage toggle variable
let checkbox=document.querySelector('#menu__toggle');
//distance required to scroll to cause effect
//home page scroll threshold
const SCROLL_THRESHOLD_HOME = 70;

//scroll variable
let lastScrollY = window.scrollY;

/////////////////////////////////////////////////////////////
//homepage event listener
window.addEventListener('scroll', () => {
 const currentScrollY = window.scrollY;
 const delta = currentScrollY - lastScrollY;

 if (delta > 0 && delta >= SCROLL_THRESHOLD_HOME) {
   // The user has scrolled down by at least SCROLL_THRESHOLD pixels
   // remove menu toggle
   checkbox.checked=false;
 }

 lastScrollY = currentScrollY;
});