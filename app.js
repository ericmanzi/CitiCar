

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

	//getLocation();

});

$(document).on("click", "#login-btn", function() {
	var email = $("#email").val();
	var pass = $("#password").val();
	var username = email.split("@")[0];
});

$(document).on("click", "#login-facebook-btn", function() {

	$('.fb').prop('disabled', true);
	window.fbAsyncInit = function() {
	Parse.FacebookUtils.init({
		appId      : '1620498488165422',
		xfbml      : true,
		version    : 'v2.3'
		});
		$(".fb").prop('disabled', false);
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	$(document).on('click', '.fb', function() {
		$("#status").html("Clicked login");
		Parse.FacebookUtils.logIn(null, {
			success: function(user) {
				if (!user.existed()) {
					alert("User signed up and logged in through Facebook!");

				} else {
					alert("User logged in through Facebook!");
				}
			},
			error: function(user, error) {
				alert("User cancelled the Facebook login or did not fully authorize.");
			}
		});
	});
});


