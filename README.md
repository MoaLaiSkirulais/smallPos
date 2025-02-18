# Small POS
This app allows to run a small static webserver in your android phone

## Features
* Share the webSite using a QR code
* Recording simple stats
* Activity log
* Load the webSite from a zip file
* Website preview in a WebView

## Specs
* Just for demo
* [sqlite](https://sqlite.org/) to store the activity
* [NanoHttpd](https://github.com/NanoHttpd/nanohttpd) as base webServer
* Observer pattern to update UI

![image](https://github.com/MoaLaiSkirulais/smallPos/blob/main/screens/frontend1.png)

## Todo
Run as a service will allow deploying a website from a zip file

## License
MIT




# git
	https://github.com/MoaLaiSkirulais/smallPos

# backend
	nodemon dist\server\server.js
	npx http-server -p 8080 -c-1 dist/browser --host 0.0.0.0  -S -C .\cert.pem -K .\key.pem

# frontend
	ng serve

	