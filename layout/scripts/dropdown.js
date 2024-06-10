// Select the checkbox element with the ID 'dropdown'
const checkbox = document.getElementById('dropdown');

// Add an event listener to the checkbox for the 'change' event
checkbox.addEventListener('change', function() {
  // Select the dropdown content element using its class name
  const dropdownContent = document.querySelector('.dropdown-content');
  
  // Toggle the 'active' class on the dropdown content element
  // The class is added if the checkbox is checked, and removed if it's unchecked
  dropdownContent.classList.toggle('active', checkbox.checked);
});
