# Small POS
Small Point of Sale, including products database, tiny stats, eInvoice example and printing

## Features
### FrontEnd
* Based on Angular v18+ and Typescript
* Angular material
* PWA and service workers
* Observer pattern to update ui elements
* Typescript OOP

<img src="https://github.com/user-attachments/assets/1521f5be-cd57-4179-b1fc-aa8f5eb76616" alt="drawing" width="50"/><img src="https://github.com/user-attachments/assets/05257639-d210-4882-afa0-1ba6883a3f81" alt="drawing" width="50"/><img src="https://github.com/user-attachments/assets/4990c329-cc69-4b27-8a42-d690c8dd44a1" alt="drawing" width="70"/>

### BackEnd 
* Nodejs and Express to run the base webServer
* Using sqlite to store sales activity and get the stats 
* Printing module using ESC/POS to print receipts
* Connect to local IRS to eInvoice

<img src="https://github.com/user-attachments/assets/439e80b4-a410-40d5-ba7b-a53b2e639caa" alt="drawing" width="70"/><img src="https://github.com/user-attachments/assets/089ea938-e5e6-442e-ab17-fce68746a6b2" alt="drawing" width="70"/>

## Todo
Include some graph library

<img src="https://github.com/MoaLaiSkirulais/smallPos/blob/main/screens/frontend1.png" alt="drawing" width="700"/>


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

	
