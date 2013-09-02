var request = require('request');

var type = "bing";
module.exports = function fetchOLogo(query, callback, api_key){
  var images = [];
  var url = generateQuery(type, query, api_key);
  request(url, function (error, response, body) {
    //Returns a JSON with possible solutions
    if (!error && response.statusCode == 200) {
      var images = imagesForResults(body);
      callback(null, images);
    }
  });
};

function imagesForResults(results){
  var images = [];
  switch(type) {
    case "google":
      var data = JSON.parse(results);
      data.responseData.results.forEach(function(item){
        images.push(item.url);
      });
      break;
    case "bing" :
      results.d.results[0].Image.forEach(function(item){
        images.push(item["MediaUrl"]);
      });
    break;
  }
  return images;
}

function generateQuery(type, queryStr, api_key){
  var res = "";
  switch (type) {
    case "google":
      res =  generateGoogleQuery(queryStr, api_key);
    break;
    case "bing":
      res = generateBingQuery(queryStr, api_key);
      break;
    default:
    throw "No Implementaion for " + type;
  }
  return res;
}

function generateGoogleQuery(query, api_key){
  var searchUrl = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=';
  return [searchUrl, query , " ", "logo"].join("");
}

function generateBingQuery(query, api_key){
    var uri = ["https://api.datamarket.azure.com/Bing/Search/v1/Composite?"
              , "Query='", query,  " ", "logo'"
              , "&Sources='Image'&Market='en-us'&$top=4"].join("");

  return {
    'method': 'GET',
    'uri': uri,
    'json': true,
    'headers': {
      'Authorization': 'Basic ' + new Buffer(api_key + ':' + api_key).toString('base64')
    }
  };

}