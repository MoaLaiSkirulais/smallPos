import { Certificate } from "crypto";

import AfipSdk from '@afipsdk/afip.js';
import Order from "./Order.class";

class Afip {

	constructor() {
	};

	public async gernerarCertificado() {

		async function start() {

			const result = await afip.CreateCert(username, password, alias);
			console.log(result);
			return result;
		}

		//const afip = new AfipSdk({ CUIT: 20409378472 });

		// Usuario para ingresar a AFIP.
		// Para la mayoria es el mismo CUIT, pero al administrar
		// una sociedad el CUIT con el que se ingresa es el del administrador
		// de la sociedad.
		const username = '';

		// Contraseña para ingresar a AFIP.
		const password = '';

		// Alias para el certificado (Nombre para reconocerlo en AFIP)
		// un alias puede tener muchos certificados, si estas renovando
		// un certificado podes utilizar el mismo alias
		const alias = 'afipsdk';

		// Creamos una instancia de la libreria
		const afip = new AfipSdk({ CUIT: 20231521586 });

		// Creamos el certificado (¡Paciencia! Esto toma unos cuantos segundos)
		const res: any = await start();

		// const res: any = async () => {
		// 	await afip.CreateCert(username, password, alias);
		// };

		// Mostramos el certificado por pantalla

		// Mostramos la key por pantalla
		//console.log(res.key);

		// ATENCION! Recorda guardar el cert y key ya que 
		// la libreria por seguridad no los guarda, esto depende de vos.
		// Si no lo guardas vas tener que generar uno nuevo con este metodo

		var aux = {
			cert: res.cert,
			key: res.key
		};

		return aux;
	}

	public async fe3() {

		const fs = require('fs');
		const cert = fs.readFileSync('./src/data/certificado.crt', { encoding: 'utf8' });
		const key = fs.readFileSync('./src/data/key.key', { encoding: 'utf8' });
		const cuit = 20231521586;

		const afip = new AfipSdk({
			CUIT: cuit,
			cert: cert,
			key: key
		});

		const username = '20231521586';
		const password = 'Mesias70693';
		const alias = 'afipsdk';
		const wsid = 'wsfe';
		const res = await afip.CreateWSAuth(username, password, alias, wsid);
		console.log(res);
	}

	public async invoice(order: Order) {

		const fs = require('fs');
		const cert = fs.readFileSync('./src/data/afip/certificado.crt', { encoding: 'utf8' });
		const key = fs.readFileSync('./src/data/afip/key.key', { encoding: 'utf8' });
		const cuit = 20231521586;

		const afip = new AfipSdk({
			CUIT: cuit,
			cert: cert,
			key: key
		});


		//GET https://example.com/comments/1 HTTP/1.1

		const punto_de_venta = 1;
		const tipo_de_factura = 6; // 6 = Factura B
		const last_voucher = await afip.ElectronicBilling.getLastVoucher(punto_de_venta, tipo_de_factura);
		const concepto = 1;
		const tipo_de_documento = 99;
		const numero_de_documento = 0;
		const numero_de_factura = last_voucher + 1;
		const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];
		
		var importe_gravado = order.getTotalAmount() ;
		importe_gravado = Number(importe_gravado.toFixed(2));

		const importe_exento_iva = 0;

		var importe_iva = order.getTotalAmount() * 0.21;
		importe_iva = Number(importe_iva.toFixed(2));

		let fecha_servicio_desde = null, fecha_servicio_hasta = null, fecha_vencimiento_pago = null;

		const data = {
			'CantReg': 1, // Cantidad de facturas a registrar
			'PtoVta': punto_de_venta,
			'CbteTipo': tipo_de_factura,
			'Concepto': concepto,
			'DocTipo': tipo_de_documento,
			'DocNro': numero_de_documento,
			'CbteDesde': numero_de_factura,
			'CbteHasta': numero_de_factura,
			'CbteFch': parseInt(fecha.replace(/-/g, '')),
			'FchServDesde': fecha_servicio_desde,
			'FchServHasta': fecha_servicio_hasta,
			'FchVtoPago': fecha_vencimiento_pago,
			'ImpTotal': importe_gravado + importe_iva + importe_exento_iva,
			'ImpTotConc': 0, // Importe neto no gravado
			'ImpNeto': importe_gravado,
			'ImpOpEx': importe_exento_iva,
			'ImpIVA': importe_iva,
			'ImpTrib': 0, //Importe total de tributos
			'MonId': 'PES', //Tipo de moneda usada en la factura ('PES' = pesos argentinos) 
			'MonCotiz': 1, // Cotización de la moneda usada (1 para pesos argentinos)  
			'Iva': [ // Alícuotas asociadas a la factura
				{
					'Id': 5, // Id del tipo de IVA (5 = 21%)
					'BaseImp': importe_gravado,
					'Importe': importe_iva
				}
			]
		};

		const res = await afip.ElectronicBilling.createVoucher(data);
		console.log({
			'cae': res.CAE, //CAE asignado a la Factura
			'vencimiento': res.CAEFchVto //Fecha de vencimiento del CAE
		});

		return res;
	}
}

export = Afip;
