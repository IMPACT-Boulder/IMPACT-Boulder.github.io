const checkbox = document.getElementById('dropdown');

checkbox.addEventListener('change', function() {
  const dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.classList.toggle('active', checkbox.checked);
});