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
app.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.selectedContact = {}; // Empties selectedContact (for contact list formatting)
}]);

// View Contact controller
app.controller('viewController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {

        $scope.deleteContact = function () {
            if (confirm("Delete this contact?")) {
                $http.delete('/api/contacts/' + $rootScope.selectedContact._id).then(function (response) {
                    // Immediately called function, changes location route path
                    (function () { $location.path('/'); })();

                    // Get updated contacts list, post-delete
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

        // Submit Edit Contact changes
        $scope.submitChange = function () {

            // Creates new object, with edited or untouched contact data present form fields (via binding)
            $scope.updatedEntry = {
                id: $rootScope.selectedContact._id,
                name: $rootScope.selectedContact.name,
                email: $rootScope.selectedContact.email,
                location: $rootScope.selectedContact.location,
                primary: $rootScope.selectedContact.primary
            };

            // POST request submitting Edits to API/DB. Updates existing object with new object. 
            // If sucessful retrieves updated contacts list
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
 
            // Immediately called function: changes location route path and view (to view recently edited contact)
            (function () { $location.path('/view'); })();
        };
    }]);

// Add Contact controller
app.controller('addController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {

        $rootScope.selectedContact = {}; // Empties selectedContact (for contact list formatting)

        // submit new Added Contact
        $scope.submitAdd = function () {

            // New object created and filled with entered form data (via binding)
            $scope.newEntry = {
                name: $scope.newContact.name,
                email: $scope.newContact.email,
                location: $scope.newContact.location,
                primary: $scope.newContact.primary
            };

            // POST sending new Added Contact to API/DB. 
            // If sucessful retrieves updated contacts list
            $http({
                method: 'POST',
                url: '/api/contacts',
                data: JSON.stringify($scope.newEntry)
            }).then(function (success) {
                
                // retrieve and "select" newly Added Contact, in order to transition automatically into viewing it
                $rootScope.selectedContact = success.data;
                
                $http.get('/api/contacts').then(function (response) {
                    $rootScope.contactsList = response.data;
                });
            }, function (err) {
                console.error(err);
            });

            // Immediately called function: changes location route path and view (to view newly added contact)
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

        /* selectContact function is invoked whenever a user selects a user from the contacts list.
           selectedContact variable is assigned and reassigned to a selected contact, guiding which contact object is 
           subsequently viewed, edited, or deleted by the user at any one time. */
        $scope.selectContact = function (contact) {
            $rootScope.selectedContact = contact;

            // Immediately called function: changes location route path and view (to view selected contact)
            (function () { $location.path('/view'); })();
        };
    }]);