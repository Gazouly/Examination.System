/* ---------- Registeration and Sign In --------- */

/*Mail Validation*/
function ValidateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
		return (true)
	}
	return (false)
}
/*Mail Validation*/


var signupBtn = document.getElementById('signup'),
	signinForm = document.getElementById('signin-form'),
	signupForm = document.getElementById('signup-form'),
	forgotForm = document.getElementById('forgot-pass-form'),
	registerBtn = document.getElementById('register'),
	forgotPasswordBtn = document.getElementById('forgot-pass'),
	resetPasswordBtn = document.getElementById('resetPassword');

signupBtn.addEventListener('click', function () {
	'use strict';
	signinForm.style.display = "none";
	signupForm.style.display = "block";
	document.querySelector('.head-text').innerHTML = "Sign Up";
});

registerBtn.addEventListener('click', function () {
	'use strict';
	var x = document.forms["signup-form"]["Remail"].value,
		y = document.forms["signup-form"]["Rpassword"].value,
		z = document.forms["signup-form"]["Rcpassword"].value;
	if (ValidateEmail(x) && y !== "" && z !== "") {
		signinForm.style.display = "block";
		signupForm.style.display = "none";
		document.querySelector('.head-text').innerHTML = "Sign In";
	}
});

forgotPasswordBtn.addEventListener('click', function () {
	'use strict';
	signinForm.style.display = "none";
	forgotForm.style.display = "block";
	document.querySelector('.head-text').innerHTML = "Reset Password";
});

resetPasswordBtn.addEventListener('click', function () {
	'use strict';
	var x = document.forms["forgot-pass-form"]["Femail"].value;
	if (ValidateEmail(x)) {
		signinForm.style.display = "block";
		forgotForm.style.display = "none";
		document.querySelector('.head-text').innerHTML = "Sign In";
	}

});
/* ---------- Registeration and Sign In --------- */