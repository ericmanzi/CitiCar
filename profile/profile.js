var app = angular.module('profileApp', []);

app.controller('ProfileCtrl', function() {
    var self = this;
    self.user = JSON.parse(sessionStorage.getItem('currentUser'));

});