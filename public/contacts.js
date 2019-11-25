// Modules
var app = angular.module('contactsApp', ['ngRoute', 'ngResource']);

// Routing
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/view', {
            templateUrl: 'pages/view.html',
            controller: 'viewController'
        })
        .when('/edit', {
            templateUrl: 'pages/edit.html',
            controller: 'editController'
        })
        .when('/add', {
            templateUrl: 'pages/add.html',
            controller: 'addController'
        }).otherwise({
            redirectTo: '/'
        });
});

// Controllers

// Home controller
app.controller('homeController', ['$scope', function ($scope) {
    // currently empty
}]);

// View Contact controller
app.controller('viewController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {

        // deleteContact function is called as user clicks on the delete button on the Contact View page
        $scope.deleteContact = function () {

            // Confirms with user whether they wish to delete
            if (confirm("Delete this contact?")) {

                // DELETE request to API, deletes currently selected Contact
                $http.delete('/api/contacts/' + $rootScope.selectedContact._id).then(function (response) {

                    // Immediately call an anonymous function, which changes location route path
                    (function () { $location.path('/'); })();

                    // Requests updated contacts list, post-delete, and updates contactsList object with response
                    $http.get('/api/contacts').then(function (response) {
                        $rootScope.contactsList = response.data;
                    });
                });
            };
        };
    }]);

// Edit Contact controller
app.controller('editController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {

        // submitChange function is called when user clicks on the Done button when editing a Contact
        $scope.submitChange = function () {

            // Stores new form data in a new object, inheriting old data from already existing Contact object.
            $scope.updatedEntry = {
                id: $rootScope.selectedContact._id,
                name: $rootScope.selectedContact.name,
                email: $rootScope.selectedContact.email,
                location: $rootScope.selectedContact.location,
                primary: $rootScope.selectedContact.primary
            };

            // POST request to API. Updates existing object with new properties. 
            // If sucessful retrieves updated contacts objects from DB and updates contactList variable.
            $http({
                method: 'POST',
                url: '/api/contacts',
                data: JSON.stringify($scope.updatedEntry)
            }).then(function (success) {
                $http.get('/api/contacts').then(function (response) {
                    $rootScope.contactsList = response.data;
                });
            }, function (error) {
                console.error(error);
            });
            // Immediately calling an anonymous function, changing route and view. 
            // Returns user back to viewing edited contact.
            (function () { $location.path('/view'); })();
        };
    }]);

// Add Contact controller
app.controller('addController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {

        // submitAdd function is called when a user clicks Done on the Add Contact page.
        $scope.submitAdd = function () {

            // A new Contact object is created and populated with form data (AngularJS binds form input data).
            $scope.newEntry = {
                name: $scope.newContact.name,
                email: $scope.newContact.email,
                location: $scope.newContact.location,
                primary: $scope.newContact.primary
            };

            // POST request to API, adding a new Contact object to DB.
            // If successful updates selectedContact variable to the new object's id, pulled from response,
            // and retrieves updated contacts objects from DB and updates contactList variable.
            $http({
                method: 'POST',
                url: '/api/contacts',
                data: JSON.stringify($scope.newEntry)
            }).then(function (success) {
                $rootScope.selectedContact = success.data;
                $http.get('/api/contacts').then(function (response) {
                    $rootScope.contactsList = response.data;
                });
            }, function (err) {
                console.error(err);
            });

            // Immediately calling an anonymous function, changing route and view. 
            // User redirected to view newly added contact.
            (function () { $location.path('/view'); })();
        };
    }]);

// Contacts List Controller
app.controller('contactsController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {
        // Retrieves contacts from API, assigns response to contactsList object.
        $http.get('/api/contacts').then(function (response) {
            $rootScope.contactsList = response.data;
        });

        // selectContact function is invoked whenever a user selects a user from the contacts list.
        // selectedContact variable is assigned to selected contact, guiding which contact object is 
        // later viewed, edited, or deleted by the user.
        $scope.selectContact = function (contact) {
            $rootScope.selectedContact = contact;

            // Immediately call anonymous function, changing location route path to view selected Contact.
            (function () { $location.path('/view'); })();
        };
    }]);