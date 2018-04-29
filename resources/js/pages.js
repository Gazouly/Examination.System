var addCourseBtn = document.querySelector('.add-course-btn');

addCourseBtn.addEventListener('click', function () {
	'use strict';
	document.querySelector('#courses-table').style.display = "none";
	document.querySelector('#add-course').style.display = "block";
});