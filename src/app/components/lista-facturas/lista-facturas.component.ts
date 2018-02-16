import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { User } from "./../../interfaces/user";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ListaService } from '../../services/lista.service';

import * as xml2js from 'xml2js';

import * as jsPDF from 'jspdf'


@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css'],
  providers: [ListaService]
})
export class ListaFacturasComponent implements OnInit {
  files = new Array()
  articulos = new Array();
  facturas = [];
  usuario: string = "nulo";


  static location: Location
  public currentUser:any;

  constructor(private _httpListaService:ListaService,
              private router: Router) {}

  ngOnInit() {
    this.getFiles()
  }

  getFiles()  {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user.rfc);
    this.usuario =  user.name;
    this._httpListaService.obtenerFactura(user.rfc)
      .subscribe(
        data => {
          console.log("dataaaa: ", data['files'])
          data['files'].forEach((file, i) =>  {
            console.log("file: ", file)
            this.files.push(file)
            // console.log(`File ${i} = ${JSON.stringify(files)}`)
          })
        },
        error => console.error("error: ", error)
      );
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.router.navigate([""]);
        }

  dowloadUnique(file){
  let   metodoDePago1: string = "nulo";
  let contador1: number = 0;

    this._httpListaService.obtenerFacturaUnica(file)
      .subscribe(
        data => {
          //validaciones
          //terminar facturas
          //numero a letras
          //modal olvide la contraseña


          //tabla
          // multiples archivos
          var doc = new jsPDF();

           console.log("hey: ",data);
           //console.log("Articulos: " , data['cfdi:Conceptos'][0]['cfdi:Concepto'][0]['$']);
           data['cfdi:Conceptos'][0]['cfdi:Concepto'].forEach((articulo, i) =>  {
             console.log("articulo: ", articulo)
             this.articulos.push(articulo)
             //console.log(`Articulo ${i} = ${JSON.stringify(articulo)}`);
             doc.setFontType("normal");
             doc.text(10, (175+contador1), Math.round(parseFloat(JSON.parse(JSON.stringify(articulo['$']['cantidad'])))).toString());
             doc.setFontSize(8);
             doc.text(33, (175+contador1), JSON.parse(JSON.stringify(articulo['$']['descripcion'])));
             doc.setFontSize(12);
             doc.text(130, (175+contador1), JSON.parse(JSON.stringify(articulo['$']['valorUnitario'])));
             doc.text(170, (175+contador1), JSON.parse(JSON.stringify(articulo['$']['importe'])));
             contador1 = contador1 + 5;
           })

           doc.setFontType("bolditalic");
           doc.text(105, 20, data['cfdi:Emisor'][0]['$']['nombre'], null, null, 'center');
           doc.setFont("courier");
           doc.setFontType("normal");
           doc.text(20, 30, 'Oficina Matriz');
           doc.text(20, 35, 'Sevilla No. 16-A');
           doc.text(20, 40, 'Colonia Juarez');
           doc.text(20, 45, 'Delegación, Cuahutémoc');
           doc.text(20, 50, 'CDMX');
           doc.text(20, 55, 'C.P. 06600');
           doc.text(20, 60, 'Tel. (55)5999-4196');
           doc.text(20, 65, 'RFC: CME090507SE2');

           doc.text(120, 30, 'LUGAR DE EXPEDICION:');
           doc.text(120, 35, data['cfdi:Emisor'][0]['cfdi:DomicilioFiscal'][0]['$']['calle'] + "   "+ data['cfdi:Emisor'][0]['cfdi:DomicilioFiscal'][0]['$']['noExterior']);
           doc.text(120, 40, data['cfdi:Emisor'][0]['cfdi:ExpedidoEn'][0]['$']['calle'] + " #"+ data['cfdi:Emisor'][0]['cfdi:ExpedidoEn'][0]['$']['noExterior']);
           doc.text(120, 45, data['cfdi:Emisor'][0]['cfdi:DomicilioFiscal'][0]['$']['colonia'] + "  "+ data['cfdi:Emisor'][0]['cfdi:DomicilioFiscal'][0]['$']['localidad']);
           doc.text(120, 55, "C.P: " +  data['cfdi:Emisor'][0]['cfdi:ExpedidoEn'][0]['$']['codigoPostal'] + "  Tel 59994196");


           doc.setFont("times");
           doc.setFontType("normal");
           doc.text(20, 75, 'FECHA DE EXPEDICIÓN');
           doc.text(120, 75, data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['FechaTimbrado']);
           doc.text(20, 80, 'COMPROBANTE FISCAL DIGITAL');

           doc.setFontType("normal");
           doc.setFontSize(20);
           doc.text(20, 88, 'Factura');
           doc.setFontType("bold");
           doc.setFontSize(25);
           doc.text(20, 98, data['$']['serie'] + " " + data['$']['folio'] );

           doc.setFontType("bolditalic");
           doc.setFontSize(20);
           doc.text(105, 108, 'Datos Fiscales del Cliente', null, null, 'center');

           doc.setFont("courier");
           doc.setFontSize(12);
           doc.setFontType("normal");
           doc.text(20, 115, '#Cliente:');
           doc.text(20, 120, 'R.F.C:');
           doc.text(20, 125, 'Nombre:');
           doc.text(20, 130, 'Domicilio:');
           doc.text(20, 135, 'Colonia:');
           doc.text(20, 140, 'Número:');
           doc.text(20, 145, 'C.P.:');
           doc.text(20, 150, 'País:');
           doc.text(20, 155, 'Ciudad:');
           doc.text(20, 160, 'Método de pago:');
           doc.text(20, 165, 'Forma de pago:');
           doc.text(80, 165, 'Una sola exhibición');

           doc.setFontType("normal");
           //Que es este numero
           //agregar uso cfdi
           //g01 -  Adquisicion de mercancias
           //g02 - Devoluciones descuentos o bonificaciones
           //g03 - gastos en general
           //p01 - por definir

           doc.text(80, 115, 'F2542:');
           doc.text(80, 120, data['cfdi:Receptor'][0]['$']['rfc']);
           doc.text(80, 125, data['cfdi:Receptor'][0]['$']['nombre']);
           doc.text(80, 130, data['cfdi:Receptor'][0]['cfdi:Domicilio'][0]['$']['calle']);
           doc.text(80, 135, data['cfdi:Receptor'][0]['cfdi:Domicilio'][0]['$']['colonia']);
           //porqueno hay
           doc.text(80, 140, '26 PTE');
           doc.text(80, 145, data['cfdi:Receptor'][0]['cfdi:Domicilio'][0]['$']['codigoPostal']);
           doc.text(80, 150, data['cfdi:Receptor'][0]['cfdi:Domicilio'][0]['$']['pais']);
           // doc.text(80, 155, data['cfdi:Receptor'][0]['cfdi:Domicilio'][0]['$']['municipio']);
           //cuantos metodos de pago hay
           if(data['$']['metodoDePago']=="01"){
           metodoDePago1 = "Efectivo"
          }
          if(data['$']['metodoDePago']=="02"){
          metodoDePago1 = "Cheque Nominativo"
          }
           if(data['$']['metodoDePago']=="03"){
           metodoDePago1 = "Transferencia electrónica de fondos"
          }
          if(data['$']['metodoDePago']=="04"){
          metodoDePago1 = "Tarjeta de credito"
          }
          if(data['$']['metodoDePago']=="28"){
          metodoDePago1 = "Tarjeta de debito"
          }
          if(data['$']['metodoDePago']=="99"){
          metodoDePago1 = "por definir"
          }
           doc.text(80, 160, data['$']['metodoDePago'] + " " + metodoDePago1);

           doc.setFontType("bold");
           doc.text(10, 170, 'Cantidad');
           doc.text(70, 170, 'Descripción');
           doc.text(130, 170, 'P. Unitario');
           doc.text(170, 170, 'Importe');

           //doc.setFontType("normal");
           //doc.text(10, 176, '1');
           //doc.setFontSize(8);
           //doc.text(33, 176, 'AA10050-5V-CGD 655 10050MAH DOBLE USB METAL DOR');
           //doc.setFontSize(12);
           //doc.text(130, 176, '362.93');
          // doc.text(170, 176, '362.93');




           doc.addPage();
           doc.setFontType("bold");
           doc.text(20, 30, 'Cantidad con letra:');
           doc.setFontSize(10);
           //Checar cantidad con letra
           doc.text(20, 35, 'Ochocientos cuarenta y dos pesos 00/100');
           doc.setFontSize(12);
           doc.text(120, 30, 'Sub-Total:');
           doc.text(150, 30, data['$']['subTotal']);
           doc.text(120, 35, data['cfdi:Impuestos'][0]['cfdi:Traslados'][0]['cfdi:Traslado'][0]['$']['impuesto'] + " " + data['cfdi:Impuestos'][0]['cfdi:Traslados'][0]['cfdi:Traslado'][0]['$']['tasa'] + "%");
           doc.text(150, 35, data['cfdi:Impuestos'][0]['cfdi:Traslados'][0]['cfdi:Traslado'][0]['$']['importe']);
           doc.text(120, 40, 'Total:');
           doc.text(150, 40, data['$']['total']);
           doc.text(120, 45, 'Piezas:');
           //Donde esta la cantidad
           doc.text(150, 45, data['cfdi:Conceptos'][0]['cfdi:Concepto'][0]['$']['cantidad']);



           doc.text(15, 55,'SELLO DIGITAL DEL EMISOR');
           doc.setFontType("normal");
           var textLines = doc.splitTextToSize(data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['selloCFD'], 90);
           doc.text(textLines, 15, 60);

           //Como se genera
           doc.setFontType("bold");
           doc.text(110, 55,'SELLO DIGITAL DEL SAT');
           doc.setFontType("normal");
           var textLines2 = doc.splitTextToSize("||"+data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['version']+"|"+ data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['UUID']  +"|"+data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['FechaTimbrado']+"|"+data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['selloCFD']+"||", 90);
           doc.text(textLines2, 110, 60);


           doc.setFontType("bold");
           doc.text(15, 115,'SELLO DIGITAL DEL SAT');
           doc.setFontType("normal");
           var textLines3 = doc.splitTextToSize(data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['selloSAT'], 90);
           doc.text(textLines3, 15, 120);




           doc.setFontSize(10);
           doc.setFontType("bold");
           doc.text(15, 160, 'Folio Fiscal:');
           doc.text(15, 165, 'Fecha y Hora de Certificación:');
           doc.text(15, 170, 'No de Serie del Certificado del SAT:');
           doc.text(15, 175, 'No de Serie del Certificado del Contribuyente:');
           doc.text(15, 190, 'Timbre Fiscal Digital');
           doc.text(70, 230, 'Nombre, Firma, Fecha___________________________________');

           doc.setFontType("normal");
           doc.text(120, 160, data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['UUID']);
           doc.text(120, 165, data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['FechaTimbrado']);
           doc.text(120, 170, data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['noCertificadoSAT']);
           doc.text(120, 175, data['$']['noCertificado']);


           doc.setFontType("bold");
           doc.text(15, 270, 'ESTE DOCUMENTO ES UNA REPRESENTACION IMPRESA DE UN CFDI');
           doc.text(15, 275, 'DESCARGA TU FACTURA ELECTRÓNICA EN:');
           doc.text(15, 280, 'WWW.ROYMEMORY.COM');


           doc.save('Test.pdf');
             console.log(data['cfdi:Emisor'][0]['$']['nombre']);
         },
         error => console.error("error: ", error)
       );
  }

  download() {
var imgData = 'data:image/png;base64,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';

var doc = new jsPDF();
doc.setFontType("bolditalic");
doc.text(105, 20, 'Comercializadora de Memorias S.A de C.V.', null, null, 'center');

doc.setFont("courier");
doc.setFontType("normal");
doc.text(20, 30, 'Oficina Matriz');
doc.text(20, 35, 'Sevilla No. 16-A');
doc.text(20, 40, 'Colonia Juarez');
doc.text(20, 45, 'Delegación, Cuahutémoc');
doc.text(20, 50, 'CDMX');
doc.text(20, 55, 'C.P. 06600');
doc.text(20, 60, 'Tel. (55)5999-4196');
doc.text(20, 65, 'RFC: CME090507SE2');

doc.text(120, 30, 'LUGAR DE EXPEDICION:');
doc.text(120, 35, 'SEVILLA 16-A, Delg.');
doc.text(120, 40, 'Cuahutemoc No. o Colonia');
doc.text(120, 45, 'Juarez Ciudad de México');
doc.text(120, 55, 'C.P. 06600 Tel 59994196');



doc.setFont("times");
doc.setFontType("normal");
doc.text(20, 75, 'FECHA DE EXPEDICIÓN');
doc.text(120, 75, '2017-09-28T15:39:26');
doc.text(20, 80, 'COMPROBANTE FISCAL DIGITAL');
doc.text(120, 80, 'FACTURA');

doc.setFontType("normal");
doc.setFontSize(20);
doc.text(20, 88, 'Factura');
doc.setFontType("bold");
doc.setFontSize(25);
doc.text(20, 98, 'A 18278');
//todavia no
doc.setFontType("normal");
doc.setFontSize(20);
doc.text(70, 88, 'Remision');
doc.setFontType("bold");
doc.setFontSize(25);
doc.text(70, 98, 'A 51165');


doc.setFontType("bolditalic");
doc.setFontSize(20);
doc.text(105, 108, 'Datos Fiscales del Cliente', null, null, 'center');

doc.setFont("courier");
doc.setFontSize(12);
doc.setFontType("normal");
doc.text(20, 115, '#Cliente:');
doc.text(20, 120, 'R.F.C:');
doc.text(20, 125, 'Nombre:');
doc.text(20, 130, 'Domicilio:');
doc.text(20, 135, 'Colonia:');
doc.text(20, 140, 'Número:');
doc.text(20, 145, 'C.P.:');
doc.text(20, 150, 'País:');
doc.text(20, 155, 'Ciudad:');
doc.text(20, 160, 'Método de pago:');

doc.setFontType("normal");
doc.text(80, 115, 'F2542:');
doc.text(80, 120, 'ITM8012013N0');
doc.text(80, 125, 'Impulsora de Transportes Mexicanos SA de CV');
doc.text(80, 130, 'BLVD Rosendo Castro:');
doc.text(80, 135, 'Centro');
doc.text(80, 140, '26 PTE');
doc.text(80, 145, '81200');
doc.text(80, 150, 'México');
doc.text(80, 155, 'Los Mochis');
doc.text(80, 160, '01-Efectivo');

doc.setFontType("bold");
doc.text(10, 170, 'Cantidad');
doc.text(70, 170, 'Descripción');
doc.text(130, 170, 'P. Unitario');
doc.text(170, 170, 'Importe');

doc.setFontType("normal");
doc.text(10, 176, '1');
doc.setFontSize(8);
doc.text(33, 176, 'AA10050-5V-CGD 655 10050MAH DOBLE USB METAL DOR');
doc.setFontSize(12);
doc.text(130, 176, '362.93');
doc.text(170, 176, '362.93');


doc.addPage();
doc.setFontType("bold");
doc.text(20, 30, 'Cantidad con letra:');
doc.setFontSize(10);
doc.text(20, 35, 'Ochocientos cuarenta y dos pesos 00/100');
doc.setFontSize(12);
doc.text(120, 30, 'Sub-Total:');
doc.text(150, 30, '725.86');
doc.text(120, 35, 'IVA 16%:');
doc.text(150, 35, '116.14');
doc.text(120, 40, 'Total:');
doc.text(150, 40, '842.00');
doc.text(120, 45, 'Piezas:');
doc.text(150, 45, '2');



doc.text(15, 55,'SELLO DIGITAL DEL EMISOR');
doc.setFontType("normal");
var textLines = doc.splitTextToSize('jVrBNayTIrJjNtXMUkGvSiVQ7DPXOIcmpbugcV3fPcf1e0gBUmpdw3OuYpy7kT4uLsm3IE2HJxcGpWMlimYZUpytNzQ/23sskCOOB+Bsk7yZ2j39ktgfJ2OkwcIFWjTxvlfDCig/F9lSWTFjVEbRQpzz1PNy/bNDiDTRm0s5BqTKB3jSaEgiZppiShQB92PtHmD/XxQOdF6leQd2HjW1iSGyDcwt7XqPPcUucy7O3YOfILqOHKOi9AlrZuKVRlTe/Sh3NFyjvFStxiy54cuGNnmt1sNZvQR27l3DzmU9edu/8Iq9wCIleAzbzTPwdAlh3WxxDVR4xTIEhdOOpX04CQ==', 90);
doc.text(textLines, 15, 60);


doc.setFontType("bold");
doc.text(110, 55,'SELLO DIGITAL DEL SAT');
doc.setFontType("normal");
var textLines2 = doc.splitTextToSize('||1.0|430C1387-41BD-436F-9E6E-8E91E935580D|2017-09-28T15:44:31|jVrBNayTIrJjNtXMUkGvSiVQ7DPXOIcmpbugcV3fPcf1e0gBUmpdw3OuYpy7kT4uLsm3IE2HJxcGpWMlimYZUpytNzQ/23sskCOOB+Bsk7yZ2j39ktgfJ2OkwcIFWjTxvlfDCig/F9lSWTFjVEbRQpzz1PNy/bNDiDTRm0s5BqTKB3jSaEgiZppiShQB92PtHmD/XxQOdF6leQd2HjW1iSGyDcwt7XqPPcUucy7O3YOfILqOHKOi9AlrZuKVRlTe/Sh3NFyjvFStxiy54cuGNnmt1sNZvQR27l3DzmU9edu/8Iq9wCIleAzbzTPwdAlh3WxxDVR4xTIEhdOOpX04CQ==|00001000000301100488||', 90);
doc.text(textLines2, 110, 60);


doc.setFontType("bold");
doc.text(15, 115,'SELLO DIGITAL DEL SAT');
doc.setFontType("normal");
var textLines3 = doc.splitTextToSize('LfkJl74WZwdlhJ72a51mVFIgbQ9wfFP3zpcxJ7TgrAUlMc6QNbfBtnKROsh/8kkaxDradg8mJbEG1Q7GPXvDv3NSBCJklefZRKEdDZaARoClfN7eI2+CegW2NlenpAqEPXq5PWgSgLfpxo2i1zbnR8J/aLb0P+YxJyKbn129kbc=', 90);
doc.text(textLines3, 15, 120);

doc.setFontSize(10);
doc.setFontType("bold");
doc.text(15, 160, 'Folio Fiscal:');
doc.text(15, 165, 'Fecha y Hora de Certificación:');
doc.text(15, 170, 'No de Serie del Certificado del SAT:');
doc.text(15, 175, 'No de Serie del Certificado del Contribuyente:');
doc.text(15, 190, 'Timbre Fiscal Digital');
doc.text(70, 230, 'Nombre, Firma, Fecha___________________________________');


doc.setFontType("normal");
doc.text(120, 160, '430C1387-41BD-436F-9E6E-8E91E935580D');
doc.text(120, 165, '2017-09-28T15:39:26');
doc.text(120, 170, '00001000000301100488');
doc.text(120, 175, '00001000000404342059');
doc.addImage(imgData, 'JPEG', 15, 195, 50, 50);

doc.setFontType("bold");
doc.text(15, 270, 'ESTE DOCUMENTO ES UNA REPRESENTACION IMPRESA DE UN CFDI');
doc.text(15, 275, 'DESCARGA TU FACTURA ELECTRÓNICA EN:');
doc.text(15, 280, 'WWW.ROYMEMORY.COM');
doc.save('Test.pdf');


    }

}
