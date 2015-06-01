$(document).ready(function(){
	Parse.initialize("MJ7veguTqdNXV8bF0x5IB6fAItT3gK22B5mrtzxD", "LrbtNhaspWUt86vml7TFS6gn3XSsezNjr8NLst4p");
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}).then(function(object) {
		alert("yay! it worked");
	}); 


	//GET USER'S LOCATION
	<script>
	var x = document.getElementById("demo");

	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else { 
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}

	function showPosition(position) {
	    x.innerHTML = "Latitude: " + position.coords.latitude + 
	    "<br>Longitude: " + position.coords.longitude;	
	}
	</script>

});