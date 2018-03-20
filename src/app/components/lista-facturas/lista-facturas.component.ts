import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { User } from "./../../interfaces/user";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import '../../services/numeros.js';
import { ListaService } from '../../services/lista.service';
import { QRCodeModule } from 'angular2-qrcode';

import * as xml2js from 'xml2js';

import * as jsPDF from 'jspdf'

import * as QRious from 'qrious'

import { NumeroALetras } from '../../services/numeros'

// declare var numeroALetras: any;


@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css'],
  providers: [ListaService, NumeroALetras],

})
export class ListaFacturasComponent implements OnInit {
  files = new Array()
  articulos = new Array();
  facturas = [];
  usuario: string = "nulo";


  static location: Location
  public currentUser:any;

  constructor(private _httpListaService:ListaService,
              private router: Router, private numeroletra:NumeroALetras) {}

  ngOnInit() {
    this.getFiles()
  }



  conversor(numero){

    let numerolet = new NumeroALetras()
    let currency = {plural:'PESOS',singular:'PESO',centPlural:'CENTAVOS',centSingular:'CENTAVO'}
    return numerolet.NumeroALetras(numero,currency)
    // numeroALetras.Unidades(numero);
    //return numext;
  }

  getFiles()  {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.usuario =  user.name;
    this._httpListaService.obtenerFactura(user.rfc)
      .subscribe(
        data => {
          data['files'].forEach((file, i) =>  {
            this.files.push(file)
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
          let emisor = data['cfdi:Emisor'][0]['$']['rfc'];
          let receptor = data['cfdi:Receptor'][0]['$']['rfc'];
          let totalQR = data['$']['total'];
          let uuidQR = data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['UUID'];
          let selloCFD = data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['selloCFD'];
          let selloCFDSliced = selloCFD.slice(-10);
          let strCFD = selloCFDSliced.substring(0, selloCFDSliced.length - 2)


          var qr = new QRious({
                value: 'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx&id=' + uuidQR + '&re=' + emisor
                + '&rr=' + receptor + '&tt=' + totalQR + '&fe=' + strCFD
              });

           var doc = new jsPDF();
           var imgData = qr.toDataURL()
           var logoData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAA9CAYAAABcKIcSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTk3ODU4RTJBQTI2MTFFM0JGRjJDQUM4NUYwOTcxOUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTk3ODU4RTNBQTI2MTFFM0JGRjJDQUM4NUYwOTcxOUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOTc4NThFMEFBMjYxMUUzQkZGMkNBQzg1RjA5NzE5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOTc4NThFMUFBMjYxMUUzQkZGMkNBQzg1RjA5NzE5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl9Y7OoAABWlSURBVHja7F0JlBXF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'


          doc.addImage(logoData, 'JPEG', 5, 5, 50, 12.5)
           data['cfdi:Conceptos'][0]['cfdi:Concepto'].forEach((articulo, i) =>  {
             this.articulos.push(articulo)
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
           doc.text(20, 15, 'Cantidad con letra:');
           doc.setFontSize(10);
           //Checar cantidad con letra
           let numerin = this.conversor(data['$']['total'])

           doc.text(20, 20, numerin);
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



           doc.text(15, 35,'SELLO DIGITAL DEL EMISOR');
           doc.setFontType("normal");
           var textLines = doc.splitTextToSize(data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['selloCFD'], 90);
           doc.text(textLines, 15, 40);

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
           doc.text(15, 200, 'Folio Fiscal:');
           doc.text(15, 205, 'Fecha y Hora de Certificación:');
           doc.text(15, 210, 'No de Serie del Certificado del SAT:');
           doc.text(15, 215, 'No de Serie del Certificado del Contribuyente:');
           doc.text(15, 220, 'Timbre Fiscal Digital');
           doc.addImage(imgData, 'JPEG', 15, 225, 50, 50)
           doc.text(70, 250, 'Nombre, Firma, Fecha___________________________________');

           doc.setFontType("normal");
           doc.text(120, 200, data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['UUID']);
           doc.text(120, 205, data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['FechaTimbrado']);
           doc.text(120, 210, data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['noCertificadoSAT']);
           doc.text(120, 215, data['$']['noCertificado']);


           doc.setFontType("bold");
           doc.text(15, 280, 'ESTE DOCUMENTO ES UNA REPRESENTACION IMPRESA DE UN CFDI');
           doc.text(15, 285, 'DESCARGA TU FACTURA ELECTRÓNICA EN:');
           doc.text(15, 290, 'WWW.ROYMEMORY.COM');


           doc.save(data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$']['FechaTimbrado'] +'.pdf');
         },
         error => console.error("error: ", error)
       );
  }


}
