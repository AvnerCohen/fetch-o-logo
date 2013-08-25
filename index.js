var request = require('request');

module.exports = function fetchOLogo(query, callback){
  var searchUrl = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=';
  var images = [];
  request([searchUrl, query , " ", "logo"].join(""), function (error, response, body) {
    //Returns a JSON with possible solutions
    if (!error && response.statusCode == 200) {
      var results = JSON.parse(body);
      results.responseData.results.forEach(function(item){
      images.push(item.url);
      });
      callback(null, images);
    }
  });
}