
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
//import icono from "../assets/logo_arandano.png"

const generarPdf = (proforma) => {

    var doc = new jsPDF({
        orientation: "portrait",
    })
  
   
    let custom_padding = 0.5
    

    doc.setLineWidth(0.5);
 
    // autoTable(doc, {
    //     theme: 'plain',
    //     body: [
    //         [{ content: 'ARANDANO COMPAÑÍA LIMITADA', styles: { halign: 'center', fontStyle: "bold", cellPadding: 0 } }],
    //         [{ content: 'ROL DE PAGOS MENSUAL', styles: { halign: 'center', fontStyle: "bold", cellPadding: 0 } }],
    //         [{ content: 'SEPTIEMBRE - 2023', styles: { halign: 'center', fontStyle: "bold", cellPadding: 0 } }],
    //     ],
    //     startY:5,a
    // }
    //)


    // autoTable(doc, {
    //     theme: 'plain',
    //     body: encabezado,
    //     startY:19
    // })


    // autoTable(doc, {
    //     theme: 'plain',
    //     body: dias_trabajados,
    //     startY:39
    // })


    // autoTable(doc, {
    //     styles: { lineColor: [0, 0, 0], lineWidth: 0.4,fontSize:9 },
    //     theme: 'grid',
    //     body: resumen_rol,
    //     startY:53
    // })

    // autoTable(doc, {
    //     styles: { lineColor: [0, 0, 0], lineWidth: 0.4 },
    //     theme: 'grid',
    //     body: [
    //         [{ content: 'Los dias y horas suplementarias y extraordinarias corresponden a las efectivamente laboradas.', styles: { halign: 'center',  cellPadding: 0 } }]
    //     ],
    //     startY:120
    // })

    // autoTable(doc, {
    //     styles: { lineColor: [0, 0, 0], lineWidth: 0.4 },
    //     theme: 'grid',
    //     body: firmas,
    //     startY:126
    // })
    let datos_factura = [
        [
            { content: ``, styles: { halign: 'left',lineWidth:0 } },
            { content: 'SUBTOTAL IVA',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left',cellWidth:20 ,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'SUBTOTAL 0%',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left',cellWidth:20,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'SUBTOTAL No sujeto IVA',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left',cellWidth:20 ,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'SUBTOTAL SIN IMPUESTOS',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left',cellWidth:20 ,fontSize:8  } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'DESCUENTO',styles: { halign: 'left',cellWidth:40 ,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left',cellWidth:20,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'ICE',styles: { halign: 'left',cellWidth:40,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left',cellWidth:20,fontSize:8  } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'IVA',styles: { halign: 'left',cellWidth:40,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left' ,cellWidth:20,fontSize:8 } },
        ],
        [
            { content: ``, styles: { halign: 'left',lineWidth:0  } },
            { content: 'VALOR TOTAL',styles: { halign: 'left',cellWidth:40,fontSize:8 ,fontStyle:"bold"} },
            { content: `12.40`, styles: { halign: 'left',cellWidth:20,fontSize:8  } },
        ],
    ]

    let datos_cliente  = [
        [
            { content: 'Razon Social / Nombres y Apellidos:',styles: { halign: 'left',cellWidth:60} },
            { content: `Joan David Encarnacion Diaz`,colSpan: 3, styles: { halign: 'left' } },
        ],
        [
            { content: 'RUC / C.I.:', styles: { halign: 'left' } },
            { content: `9999999999999`, styles: { halign: 'center' } },
            { content: 'Fecha Emisión:', styles: { halign: 'left' } },
            { content: '21/11/2023', styles: { halign: 'center' } },
        ]
    ]
    
    doc.setLineWidth(0.5);
    doc.roundedRect(100, 18, 85, 57, 5, 5); 
    doc.setFontSize(12)
    doc.text("RUC.: 1104595671001",103,24)
    doc.setFont("helvetica", "bold");
    doc.text("PROFORMA",103,34)
    doc.setFontSize(8)
    doc.text("No.: 001-001-000000002",103,40)
    doc.setFont("helvetica", "normal");
    doc.text("Matriz: Av Turuhuayco y Juan Estrobel",103,47)
    doc.text("Sucursal: Av Turuhuayco y Juan Estrobel",103,54)
    doc.text("Contribuyente Especial Nro: -- ",103,61)
    doc.text("OBLIGADO LLEVAR CONTABILIDAD: NO",103,68)
    autoTable(doc, {
        theme: 'plain',
        body: datos_cliente,
        startY:80,
        margin:25
    })
    autoTable(doc, {
        styles: { lineColor: [0, 0, 0], lineWidth: 0.3,fontSize:8 },
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
        margin:25,
        body: proforma.products,
    })

    autoTable(doc, {
        styles: { lineColor: [0, 0, 0], lineWidth: 0.3,fontSize:8 },
        theme: 'grid',
        body: datos_factura,
        margin:25,
       
    })
    doc.rect(25, 80, 160, 15); 
    //doc.addImage(icono, 'JPEG', 160, 5, 30,12);

    doc.save(`proforma.pdf`);
}


export { generarPdf }