'use strict';

/* Services */
var yelpServices = angular.module('yelpServices', ['ngResource']).value('version', '0.1');

var auth = {
    consumerKey : "2ZQsA_wL6nIA4PU5TCRdXA",
    consumerSecret : "yjAeh9XYDaPQ3E-B07KGvdetuMg",
    accessToken : "O_3OBFsU69iYzEJhrB5VTNU0xU3AUi47",
    accessTokenSecret : "FiiAKcE9yFxY6hu22B1cRDh93kQ",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

yelpServices.factory('Business', ['$http',
  function($http){
    // Setup OAuth
    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };
    //var  near = position.coords.latitude + "0," + position.coords.longitude+"0";

    
    var yelpService = {
        async : function (position) {
            var near = "0.0,0.0";
            var parameters = [];
            parameters.push(['term', "food"]);
            parameters.push(['ll', position.coords.latitude + "," + position.coords.longitude]);
            parameters.push(['callback', 'angular.callbacks._0']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action' : 'http://api.yelp.com/v2/search',
                'method' : 'GET',
                'parameters' : parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            return $http.jsonp(message.action, {
                        method: "GET",
                        params: parameterMap
                    }).then(function (response) {
                        console.log(response);
                        return response.data;
                    });
        }
    };

    return yelpService;
}]);
