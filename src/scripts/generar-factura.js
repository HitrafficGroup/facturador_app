
import { jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';
import { getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { db,storage } from "../firebase/firebase-config";
import no_logo from "../assets/no_logo.webp";
//import icono from "../assets/logo_arandano.png"



const generarFacturaPDF = async(proforma) => {

    var doc = new jsPDF({
        orientation: "portrait",
    })
  

    doc.setLineWidth(0.5);
 

    let datos_factura = [
        [
            { content: ``, styles: { halign: 'left',lineWidth:0 } },
            { content: 'SUBTOTAL IVA',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.sub_iva}`, styles: { halign: 'left',cellWidth:20 ,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'SUBTOTAL 0%',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.sub_zero}`, styles: { halign: 'left',cellWidth:20,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'SUBTOTAL No sujeto IVA',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.sub_total}`, styles: { halign: 'left',cellWidth:20 ,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'SUBTOTAL SIN IMPUESTOS',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.sub_siniva}`, styles: { halign: 'left',cellWidth:20 ,fontSize:8  } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'DESCUENTO',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.descuento}`, styles: { halign: 'left',cellWidth:20,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'ICE',styles: { halign: 'left',cellWidth:40,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.ice}`, styles: { halign: 'left',cellWidth:20,fontSize:8  } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'IVA',styles: { halign: 'left',cellWidth:40,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.iva}`, styles: { halign: 'left' ,cellWidth:20,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'VALOR TOTAL',styles: { halign: 'left',cellWidth:40,fontSize:8 ,fontStyle:"bold"} },
            { content: `${proforma.total}`, styles: { halign: 'left',cellWidth:20,fontSize:8  } },
        ],
    ]

    let datos_cliente  = [
        [
            { content: 'Razon Social / Nombres y Apellidos:',styles: { halign: 'left',cellWidth:70,fontStyle:"bold",lineColor:10,lineWidth:{top: 0.3, right: 0, bottom: 0, left: 0.3}}},
            { content: `${proforma.nombre}`,colSpan: 3, styles: { halign: 'left',lineColor:10,lineWidth:{top: 0.3, right: 0.3, bottom: 0, left: 0} }},
        ],
        [
            { content: 'RUC / C.I.:', styles: { halign: 'left',fontStyle:"bold" ,lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0.3, left: 0.3}  } },
            { content: `${proforma.ci}`, styles: { halign: 'center',lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0.3, left: 0} } },
            { content: 'Fecha Emisión:', styles: { halign: 'left',fontStyle:"bold" ,lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0.3, left: 0} } },
            { content: `${proforma.fecha}`, styles: { halign: 'center' ,lineColor:10,lineWidth:{top: 0, right: 0.3, bottom: 0.3, left: 0} } },
        ]
    ]
    
    //
    let detalles_adicionales  = [
        [
            { content: 'Informacion Adicional',colSpan: 2,styles: { halign: 'center',cellWidth:70,fontStyle:"bold",lineColor:10,lineWidth:{top: 0.3, right: 0.3, bottom: 0, left: 0.3}}},
        ],
        [
            { content: 'Método de pago:', styles: { halign: 'left',fontStyle:"bold" ,lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0, left: 0.3}} },
            { content: `${proforma.metodo_pago}`, styles: { halign: 'center' ,lineColor:10,lineWidth:{top: 0, right: 0.3, bottom: 0, left: 0}} },
        ],
        [
            { content: 'Dirección:', styles: { halign: 'left',fontStyle:"bold", lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0, left: 0.3} } },
            { content: `${proforma.direccion}`, styles: { halign: 'center' , lineColor:10,lineWidth:{top: 0, right: 0.3, bottom: 0, left: 0} } },
        ],
        [
            { content: 'Teléfonos:', styles: { halign: 'left',fontStyle:"bold", lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0, left: 0.3}  } },
            { content: `${proforma.phone}`, styles: { halign: 'center', lineColor:10,lineWidth:{top: 0, right: 0.3, bottom: 0, left: 0}  } },
        ],
        [
            { content: 'Email:', styles: { halign: 'left',fontStyle:"bold" , lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0, left: 0.3} } },
            { content: `${proforma.email}`, styles: { halign: 'center', lineColor:10,lineWidth:{top: 0, right: 0.3, bottom: 0, left: 0}  } },
        ],
        [
            { content: 'Observaciones:', styles: { halign: 'left',fontStyle:"bold" , lineColor:10,lineWidth:{top: 0, right: 0, bottom: 0.3, left: 0.3}  } },
            { content: `${proforma.observaciones}`, styles: { halign: 'center', lineColor:10,lineWidth:{top: 0, right: 0.3, bottom: 0.3, left: 0}  } },
        ]
    ]
 
    if(proforma.profile){     
        const httpsReference = ref(storage, proforma.profile_url); 
        await getDownloadURL(httpsReference)
            .then((url) => {
                const img = new Image();
                img.src = url;
                console.log("todo chato hasta aca");
                doc.addImage(img, 'PNG', 24, 14, 60, 60);
            })
            .catch((error) => {
                switch (error.code) {
                case 'storage/object-not-found':
                    break;
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
                }
            });
        
    }else{
        doc.addImage(no_logo, 'webp', 24, 14, 60,60);
    }
    doc.setLineWidth(0.5);
    // rectangulo izquierdo 
    doc.roundedRect(25, 75, 75, 35, 5, 5); 
    doc.setFontSize(7)
    doc.text(`${proforma.nombre_facturador}`,28,80)
    doc.text(`Matriz: ${proforma.matriz}`,28,86)
    doc.text(`Sucursal: ${proforma.sucursal}`,28,92)
    doc.text(`Contribuyente Especial Nro: ${proforma.contribuyente_especial}`,28,98)
    doc.text(`OBLIGADO LLEVAR CONTABILIDAD: ${proforma.contabilidad}`,28,104)
    //rectangulo derecho
    doc.roundedRect(102, 18, 83, 92, 5, 5); 
    doc.setFontSize(12)
    doc.text(`RUC.: ${proforma.ci}001`,105,24)
    doc.setFont("helvetica", "bold");
    doc.text("FACTURA",105,34)
    doc.setFontSize(8)
    doc.text(`No.: ${proforma.numero_proforma}`,105,40)
    doc.setFont("helvetica", "normal");
    doc.text(`NÚMERO DE AUTORIZACIÓN`,105,47)
    doc.text(`00000000000000000000000000000000000000000`,105,52)
    doc.text(`AMBIENTE: PRODUCCIÓN`,105,78)
    doc.text(`EMISIÓN: NORMAL`,105,84)
    doc.text(`CLAVE DE ACCESO`,105,90)
    autoTable(doc, {
        theme: 'plain',
        body: datos_cliente,
        styles: { fontSize:7 },
        margin:{ left: 25,right:25,top:0,bottom:0},
        startY:115,
    })
    autoTable(doc, {
        styles: { lineColor: [0, 0, 0], lineWidth: 0.3,fontSize:7 },
        theme: 'grid',
        headStyles:{fillColor:"white",textColor:"black"},
        columns: [
            { header: 'Codigo Principal', dataKey: 'codigo'},
            { header: 'Cant.', dataKey: 'cantidad'},
            { header: 'Descripción', dataKey: 'descripcion'},
            { header: 'Precio Unitario', dataKey: 'precio_unitario'},
            { header: 'Descuento', dataKey: 'descuento'},
            { header: 'Precio Total', dataKey: 'precio_total'}
          ],
        margin:{ left: 25,right:25,top:0,bottom:0},
        body: proforma.products,
    })
    autoTable(doc, {
        styles: { lineColor: [0, 0, 0], lineWidth: 0.3,fontSize:7 },
        theme: 'grid',
        body: datos_factura,
        margin:{ left: 25,right:25,top:0,bottom:0},
       
    })
    autoTable(doc, {
        styles: {fontSize:7 },
        theme:"plain",
        body: detalles_adicionales,
        margin:{ left: 25,right:25,top:0,bottom:0},
    })

    
   
    
    doc.save(`factura_final.pdf`);
}




export { generarFacturaPDF }