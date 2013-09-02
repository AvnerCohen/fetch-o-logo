# fetch-o-logo

A simple utility to try and guess the logo for a given application framework.
Based on google search api, might later be extended to other facilities.

```js
var fetchOLogo = require('fetch-o-logo');
  // query_string, api_key for bing calls, callback
  fetchOLogo("nodejs", "R**fx****Z76BioPEIQC**yY", function(err, imagesArr){
    console.log(imagesArr);
  });

==>>

http://nodejs.org/images/logos/nodejs-1280x1024.png,
http://upload.wikimedia.org/wikipedia/en/a/a7/Nodejs_logo_light.png,
http://wp.streetwise.co/wp-content/uploads/2010/12/nodejs.png,
http://nodejs.org/images/mac_osx_nodejs_installer_logo.png
```


###License
MIT