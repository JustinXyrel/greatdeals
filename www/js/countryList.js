clickPlateApp.controller("countryList", function ($scope, $http){
    $http.get("../json/countries.json")
        .then(function(results){
            //Success;
            console.log("Succss: " + results.status);
            $scope.movies = results.data;
        }, function(results){
            //error
            console.log("Error: " + results.data + "; "
                                  + results.status);
        })
});