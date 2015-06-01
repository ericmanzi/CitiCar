$(document).ready(function(){
	Parse.initialize("MJ7veguTqdNXV8bF0x5IB6fAItT3gK22B5mrtzxD", "LrbtNhaspWUt86vml7TFS6gn3XSsezNjr8NLst4p");
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}).then(function(object) {
		alert("yay! it worked");
	}); 
});