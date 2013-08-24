#!/usr/bin/env node

var request = require('request');
var argv = require('optimist')
    .usage('Retrive the url for a possible logo of a given program/framework name.\nUsage: $0 [app_name/url]')
    .demand(['name'])
    .argv;

console.log("** Searching for possible URLs for - [%s] **\n", argv.name);

var searchUrl = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=';

request([searchUrl, argv.name , " ", "logo"].join(""), function (error, response, body) {
  //Returns a JSON with possible solutions
  if (!error && response.statusCode == 200) {
    var results = JSON.parse(body);
    results.responseData.results.forEach(function(item){
    console.log(item.url);
    });
  }
});