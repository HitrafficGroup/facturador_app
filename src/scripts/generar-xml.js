var XMLWriter = require('xml-writer');


function generarFacturaXML(datos_factura){

    let xw = new XMLWriter;
    xw.startDocument();
    xw.startElement('factura');
    xw.writeAttribute('id', 'comprobante');
    xw.writeAttribute('version', '1.0.1');
    xw.startElement('infoTributaria',)
    xw.writeElement('ambiente',1) //2 para produccion 1 para pruebas
    xw.writeElement('tipoEmision',1)
    xw.writeElement('razonSocial',datos_factura.nombre)
    xw.writeElement('nombreComercial',datos_factura.nombre)
    xw.writeElement('ruc',datos_factura.ci)
    xw.writeElement('claveAcceso',"2511202301179001691900120911110007376250443020716") // pendiente a determinar como se obtiene
    xw.writeElement('codDoc',"01")
    xw.writeElement('estab',datos_factura.ci)
    xw.writeElement('ptoEmi',"111")
    xw.writeElement('secuencial',datos_factura.secuencial)
    xw.writeElement('dirMatriz',datos_factura.matriz)
    xw.endElement()
    xw.startElement('infoFactura',)
    xw.writeElement('fechaEmision',datos_factura.fecha)
    xw.writeElement('dirEstablecimiento',datos_factura.sucursal)
    xw.writeElement('contribuyenteEspecial',"5368")
    xw.writeElement('obligadoContabilidad',datos_factura.contabilidad)
    xw.writeElement('tipoIdentificacionComprador',"04")
    xw.writeElement('guiaRemision',datos_factura.number_proforma)
    xw.writeElement('razonSocialComprador',datos_factura.razon)
    xw.writeElement('identificacionComprador',datos_factura.ci)
    xw.writeElement('direccionComprador',datos_factura.direccion)
    xw.writeElement('totalSinImpuestos',datos_factura.total)
    xw.writeElement('totalDescuento',datos_factura.descuento)
    xw.startElement('totalConImpuestos')
    xw.startElement('totalImpuesto')
    xw.writeElement('codigo',"3")
    xw.writeElement('codigoPorcentaje',"3072")
    xw.writeElement('baseImponible',"295000")
    xw.writeElement('valor',"14750.00")
    xw.endElement()
    xw.startElement('totalImpuesto')
    xw.writeElement('codigo',"2")
    xw.writeElement('codigoPorcentaje',"2")
    xw.writeElement('descuentoAdicional',"5.00")
    xw.writeElement('baseImponible',"12.00")
    xw.writeElement('valor',"14750.00")
    xw.endElement()
    xw.startElement('totalImpuesto')
    xw.writeElement('codigo',"5")
    xw.writeElement('codigoPorcentaje',"2")
    xw.writeElement('baseImponible',"2")
    xw.writeElement('valor',"2")
    xw.endElement()
    xw.endElement()
    // termina la seccion de los impuestos
    xw.writeElement('propina',"0.00")
    xw.writeElement('importeTotal',"0.00")
    xw.writeElement('moneda',"DOLAR")
    //metodo de pago
    xw.startElement('pagos')
    xw.startElement('pago')
    xw.writeElement('formaPago',"0.1")
    xw.writeElement('total',"347159")
    xw.writeElement('plazo',"30")
    xw.writeElement('unidadTiempo',"dias")
    xw.endElement()
    xw.endElement()
    //etiqueta info tributaria
    xw.endElement()
    xw.endElement()
    xw.endDocument();
    
    console.log(xw.toString())

}

export {generarFacturaXML}