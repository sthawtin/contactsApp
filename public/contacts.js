var app = angular.module('contactsApp', []);

app.controller('contactsAppCtrl', function($scope, $http) {
    
    $http.get('/api/contacts').then(function(response) {
        $scope.contactsList = response.data;
    });

    $scope.editShow = false;
    $scope.selectShow = false;
    $scope.addContactShow = false;
    
    $scope.selectContact = function(contact) {
        $scope.editShow = false;
        $scope.addContactShow = false;
        $scope.selectShow = true;
        $scope.selectedContact = contact;
    };
    
    $scope.editContact = function() {
        $scope.selectShow = false;
        $scope.addContactShow = false;
        $scope.editShow = true;
    };
    
    $scope.addContact = function() {
        $scope.selectShow = false;
        $scope.editShow = false;
        $scope.addContactShow = true;
    };

    $scope.deleteContact = function() {
        if(confirm("Delete this contact?")) {
            $http.delete('/api/contacts/' + $scope.selectedContact._id).then(function(response) {
                console.log(response);
                $http.get('/api/contacts').then(function(response) {
                    $scope.contactsList = response.data;
                });
            });
            $scope.editShow = false;
            $scope.selectShow = false;
            $scope.addContactShow = false;  
        };
    };

    $scope.submitChange = function() {
        $scope.updatedEntry = {
            id: $scope.selectedContact._id,
            name: $scope.selectedContact.name,
            email: $scope.selectedContact.email,
            location: $scope.selectedContact.location,
            primary: $scope.selectedContact.primary
        };
        $http({
            method: 'POST',
            url: '/api/contacts',
            data: JSON.stringify($scope.updatedEntry)
        }).then(function(success) {
            callback(success);
        }, function(error) {
            callback(error)
        });
        $scope.editShow = false;
        $scope.selectShow = true;
    };

    $scope.submitAdd = function() {
        $scope.newEntry = {
            name: $scope.newContact.name,
            email: $scope.newContact.email,
            location: $scope.newContact.location,
            primary: $scope.newContact.primary
        };
        $http({
            method: 'POST',
            url: '/api/contacts',
            data: JSON.stringify($scope.newEntry)
        }).then(function(success) {
            callback(success);
        }, function(error) {
            callback(error)
        });
        $http.get('/api/contacts').then(function(response) {
            $scope.contactsList = response.data;
        });

    };
});
