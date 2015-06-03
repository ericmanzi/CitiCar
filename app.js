

//GET USER'S LOCATION
function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else { 
	        console.log("Geolocation is not supported by this browser.");
	    }
	}

function showPosition(position) {
	    console.log("Latitude: " + position.coords.latitude + 
	    "<br>Longitude: " + position.coords.longitude);
	}

$(document).ready(function(){
	Parse.initialize("MJ7veguTqdNXV8bF0x5IB6fAItT3gK22B5mrtzxD", "LrbtNhaspWUt86vml7TFS6gn3XSsezNjr8NLst4p");

	getLocation();

});

$(document).on("click", "#login-btn", function() {
	var email = $("#email").val();
	var pass = $("#password").val();
	var username = email.split("@")[0];

	Parse.User.logIn(username, pass, {
	  success: function(user) {
	    // Do stuff after successful login.
	    alert("passed");
	    window.location = './index.html';
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("The email/password combination you entered does not belong to any account.");
	  }
	});
});