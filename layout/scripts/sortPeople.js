document.addEventListener('DOMContentLoaded', function () {
    // Function to sort a given list
    function sortList(list) {
        var ulElements = list.querySelectorAll('.staff_ul, .collaborators_ul, .students_ul, .p-students_ul');
        var teamMembers = [];

        ulElements.forEach(function (ul) {
            var lis = ul.querySelectorAll('li');
            lis.forEach(function (li) {
                teamMembers.push(li);
            });
        });

        teamMembers.sort(function (a, b) {
            var nameA = a.querySelector('.team-name').textContent.trim().split(' ').pop().toLowerCase();
            var nameB = b.querySelector('.team-name').textContent.trim().split(' ').pop().toLowerCase();
            return nameA.localeCompare(nameB);
        });

        ulElements.forEach(function (ul) {
            list.removeChild(ul);
        });

        var newUl = document.createElement('ul');
        newUl.className = 'nospace clear staff_ul';

        while (teamMembers.length > 0) {
            newUl.appendChild(teamMembers.shift());

            if (newUl.childElementCount === 4 || teamMembers.length === 0) {
                list.appendChild(newUl);
                newUl = document.createElement('ul');
                newUl.className = 'nospace clear people_ul';
            }
        }
    }

    // Get and sort the staff list
    var staffList = document.getElementById('staff_list');
    sortList(staffList);

    // Get and sort the collaborators list
    var collaboratorsList = document.getElementById('collaborators_list');
    sortList(collaboratorsList);

    // Get and sort the students list
    var studentsList = document.getElementById('students_list');
    sortList(studentsList);

    // Get and sort the p-students list
    var pStudentsList = document.getElementById('p-students_list');
    sortList(pStudentsList);
});
