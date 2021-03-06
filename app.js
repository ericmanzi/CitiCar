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

        // Additional init code here
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // user logged in and linked to app
                // handle this case HERE
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
//                alert("User logged in and connected. UserID: "+uid+", Access token: "+accessToken);

                var apiUrl = "https://graph.facebook.com/v2.3/"+
                    uid+"?access_token="+accessToken;
//              alert("getting "+apiUrl);
                $.getJSON( apiUrl, function( data ) {
                    var fbUser = {};
                    fbUser.full_name = data.name;
                    fbUser.email = data.email !== undefined ? data.email : 'No email';
                    fbUser.username = data.email !== undefined ? data.email.split('@|\\')[0] : data.name;
                    sessionStorage.setItem("currentUser", JSON.stringify(fbUser));
                    window.location = './profile/profile.html';
                }, 'jsonp');

            }
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
//				alert("User signed up and logged in through Facebook!");
            } else {
//				alert("User logged in through Facebook! "
//                    +JSON.stringify(user));
            }

            var userString = JSON.stringify(user);

            ////////// START REGEX
            var access_reg = /access_token":".*/;
            var exp_reg = /expiration/;

            var at_start = userString.search(access_reg);
            var at_end = userString.search(exp_reg);

            var access_token = userString.substring(at_start+15, at_end-3);

            var id_reg = /\"id\"/;
            var obj_reg = /objectId/;

            var id_start = userString.search(id_reg);
            var id_end = userString.search(obj_reg);

            var userId = userString.substring(id_start+6, id_end-5);
            //////////// END REGEX

//            console.log("REGEX - userID: "+userId+", token: "+access_token);

            var apiUrl = "https://graph.facebook.com/v2.3/"+
                userId+"?access_token="+access_token;
//            alert("getting "+apiUrl);
            $.getJSON( apiUrl, function( data ) {
                var fbUser = {};
                fbUser.full_name = data.name;
                fbUser.email = data.email !== undefined ? data.email : 'No email';
                fbUser.username = data.email !== undefined ? data.email.split('@|\\')[0] : data.name;
                sessionStorage.setItem("currentUser", JSON.stringify(fbUser));
                window.location = './profile/profile.html';
            }, 'jsonp');

        },
        error: function(user, error) {
            alert(JSON.stringify(error));
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
