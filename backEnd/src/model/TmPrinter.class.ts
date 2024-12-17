import Printer from "@node-escpos/core";
import Network from "@node-escpos/network-adapter";

class TmPrinter extends Printer<any> {

	constructor(device: Network, options: any) {
		super(device, options);
	};
};

interface TmPrinter {
	pdf417(): void;
	paperReductionOn(): void;
	paperReductionOff(): void;
};

TmPrinter.prototype.pdf417 = function () {

	function add(arrayValues: Array<any>) {
		data.push(arrayValues);
	};

	var width = 0x04;
	var height = 0x01;
	var msg: String = "12345678";
	var data: Array<any> = [];

	/** ESC POS */
	add([27]);

	/** code page WPC1252 */
	add([116, 12]);

	/** QR Code: Select the model f=165 */
	add([0x1D, 0x28, 0x6B, 0x04, 0x00, 0x31, 0x41, 0x32, 0x00]);

	/** PDF417: Set the width of the module f=067 */
	add([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x30, 0x43, width]);

	/** PDF417: Set the row height f=068 */
	add([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x30, 0x44, height]);

	/** PDF417: Set the error correction level f=069 */
	add([0x1D, 0x28, 0x6B, 0x04, 0x00, 0x30, 0x45, 0x31, 0x00]);

	/** PDF417: Select the options f=070 */
	add([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x30, 0x46, 0x00]);

	/** PDF417: Store the data in the symbol storage area f=080 */
	var dataLen = msg.length + 3;
	add([0x1D, 0x28, 0x6B, dataLen, 0x00, 0x30, 0x50, 0x30]);

	/** add content */
	var dataArray = [];
	for (var z in msg) {
		var letter = msg[z].charCodeAt(0);
		dataArray.push(letter);
	}
	add(dataArray);

	/** PDF417: Print the symbol data in the symbol storage area f=081 */
	add([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x30, 0x51, 0x30]);

	/** write buffer */
	for (var x in data) {
		for (var y in data[x]) {
			this.buffer.writeUInt8(data[x][y]);
		}
	};

	return this;
};

TmPrinter.prototype.paperReductionOff = function () {

	var data: Array<any> = [];

	function add(arrayValues: Array<any>) {
		data.push(arrayValues);
	};

	add([27, 64]); /* Initialize printer */
	add([29, 40, 69, 3, 0, 1, 73, 78]); /* Change into the user setting mode */
	add([29, 40, 69, 4, 0, 2, 79, 85, 84]); /* End the user setting mode session */
	add([29, 40, 69, 22, 0, 5, 101, 0, 0, 102, 0, 0, 103, 0, 0, 104, 0, 0, 105, 0, 0, 106, 0, 0, 13, 127, 0]); /* Set the customized setting values */

	/** write buffer */
	for (var x in data) {
		for (var y in data[x]) {
			this.buffer.writeUInt8(data[x][y]);
		}
	};

	return this;
};

TmPrinter.prototype.paperReductionOn = function () {

	var data: Array<any> = [];

	function add(arrayValues: Array<any>) {
		data.push(arrayValues);
	};

	add([27, 64]); /* Initialize printer */
	add([29, 40, 69, 3, 0, 1, 73, 78]); /* Change into the user setting mode */
	add([29, 40, 69, 4, 0, 2, 79, 85, 84]); /* End the user setting mode session */
	add([29, 40, 69, 22, 0, 5, 101, 1, 0, 102, 1, 0, 103, 3, 0, 104, 3, 0, 105, 3, 0, 106, 13, 0, 13, 0, 0]); /* Set the customized setting values */

	/** write buffer */
	for (var x in data) {
		for (var y in data[x]) {
			this.buffer.writeUInt8(data[x][y]);
		}
	};

	return this;
};


export = TmPrinter;
