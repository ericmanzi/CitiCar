$(document).ready(function() {});

$(document).on('click', '#create_account', function() {

	var first=$('#first_name').val();
	var last=$('#last_name').val();
	var email=$('#email').val();
	var pass=$('#password').val();
	var confirm_pass=$('#confirm_password').val();
	var mobile=$('#mobile_number').val();

	var user = new Parse.User();
	user.set("username", email.split("@")[0]);
	user.set("email", email);
	user.set("password", pass);
	user.set("phone", mobile);
	user.set("full_name", first+" "+last);


	if (pass===confirm_pass) {
		user.signUp(null, {
		  success: function(user) {
		    window.location = 'index.html';
		  },
		  error: function(user, error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});	
	} else {
		alert("Passwords do not match");
	}
	
});