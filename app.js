var lat=0.0;
var long=0.0;

//GET USER'S LOCATION
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
	console.log("Latitude: " + lat + "Longitude: " + long);
}

function setupFacebook() {
	window.fbAsyncInit = function() {
		Parse.FacebookUtils.init({
			appId      : '1620498488165422',
			xfbml      : true,
			status      : true,
			cookie      : true,
			version    : 'v2.3'
		});
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

}

$(document).ready(function(){
	Parse.initialize("MJ7veguTqdNXV8bF0x5IB6fAItT3gK22B5mrtzxD", "LrbtNhaspWUt86vml7TFS6gn3XSsezNjr8NLst4p");

	getLocation();

	setupFacebook();

});

$(document).on("click", ".login-facebook-btn", function() {
	Parse.FacebookUtils.logIn(null, {
		success: function(user) {
			if (!user.existed()) {
				alert("User signed up and logged in through Facebook!");
			} else {
				alert("User logged in through Facebook!");
			}
			sessionStorage.setItem("currentUser", JSON.stringify(user));

		},
		error: function(user, error) {
			alert("User cancelled the Facebook login or did not fully authorize.");
		}
	});
});

$(document).on("click", "#login-btn", function() {
	var email = $("#email").val();
	var pass = $("#password").val();
	var username = email.split("@")[0];

	Parse.User.logIn(username, pass, {
		success: function(user) {
			// Do stuff after successful login.
            user.set("latitude", lat);
            user.set("longitude", long);
            sessionStorage.setItem("currentUser", JSON.stringify(user));
			window.location = './profile/profile.html';
		},
		error: function(user, error) {
			// The login failed. Check error to see why.
			alert("The email/password combination you entered does not belong to any account.");
		}
	});
});

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
    user.set("latitude", lat);
    user.set("longitude", long);


    if (pass===confirm_pass) {
        user.signUp(null, {
            success: function(user) {
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                window.location = './profile/profile.html';
            },
            error: function(user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    } else {
        alert("Passwords do not match");
    }

});
