$(document).ready(function(){
    $(document).on("focus blur", "#pickup_time", function() {
        $('#pickup_time').datetimepicker();
    });
    $(document).on("focus blur", "#return_time", function() {
        $('#return_time').datetimepicker();
    });
    $(document).on("click", "#reserveBtn", function() {
        var pickup_time_text = $('#pickup_time').val();
        var pickup_time = $('#pickup_time').data('DateTimePicker').date();
        var return_time_text = $('#return_time').val();
        var return_time = $('#return_time').data('DateTimePicker').date();
        var failMsg = 'Sorry, unable to reserve your car from '+pickup_time_text+' to '+return_time_text;
        alert(failMsg);
    });
});


var app = angular.module('profileApp', []);

app.controller('ProfileCtrl', function() {
    var self = this;
    self.user = JSON.parse(sessionStorage.getItem('currentUser'));

    self.pickup_time = 0.0;
    self.return_time = 0.0;

    if (self.user===undefined || self.user===null) {
        window.location = "../login.html";
    } else {
        self.currentView = "reserve";
    }

    //TODO: list all available cars. These should be obtained from Parse later
    self.availableCars = [
     "Nissan B203948", "Toyota Corona 0918", "Toyota Camry 23049", "Mitsubishi v09384", "BMX v09813", "Mitsubishi VX09121", "Toyota B2340"
    ];

    self.selectedCar = null;

    self.selectCar = function (car) {
        self.selectedCar = car;
    };

    self.setView = function (view) {
        self.currentView = view;
    };

    self.isView = function (view) {
        return self.currentView===view;
    };

    self.logOut = function () {
        sessionStorage.removeItem('currentUser');
        window.location = "../index.html";
    };

    self.scrollToDiv = function(id) {
        $('html, body').animate({
            scrollTop: $(id).offset().top
            }, 1000);
    };


    // Reservations
    self.reservedCars = [
        {date: '07/09/2015 6:00 AM', car: 'Nissan B203948', amount: '$23.0', returned: true},
        {date: '03/10/2015 7:00 PM', car: 'Toyota Corona 0918', amount: '$89.0', returned: false},
        {date: '02/09/2015 6:00 AM', car: 'Toyota Camry 23049', amount: '$33.0', returned: true},
        {date: '11/29/2014 10:00 PM', car: 'Mitsubishi v09384', amount: '$26.0', returned: true},
        {date: '01/19/2013 8:30 AM', car: 'BMX v09813', amount: '$24.9', returned: true},
    ];

    // Membership
    self.editing = {
        full_name: false,
        email: false,
        phone: false,
        location: false
    };

    self.edit = function (key) {
        var oldVal = $("#"+key+"_div").text();
        self.editing[key] = true;
        $("#"+key+"_input").val(oldVal);
    };

    self.doneEdit = function (key) {
        var newVal = $("#"+key+"_input").val();
        self.editing[key] = false;
        self.user[key] = newVal;
    };

});
