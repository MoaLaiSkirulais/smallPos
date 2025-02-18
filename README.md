# Small POS
This app allows to run a small static webserver in your android phone

## Features
* Using sqlite to store sales activity and get the stats
* Based on Angular v18+ and Typescript 
* Backend: nodejs, express to run the base webServer
* Angular material
* PWA
* Observer pattern to update UIs
* OOP responsability segregation
* Printing module using ESCPOS
* Connect to local IRS to register the sale

![image](https://github.com/MoaLaiSkirulais/smallPos/blob/main/screens/frontend1.png)

## Todo
Include some graph library

## License
MIT

# Instructions
## run backend
	npm install
	npm run build; nodemon dist\server\server.js
	npx http-server -p 8080 -c-1 dist/browser --host 0.0.0.0  -S -C .\cert.pem -K .\key.pem

## run frontend
	npm install
	ng serve

	