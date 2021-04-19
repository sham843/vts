// import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import { DatePipe } from '@angular/common';
// // import * as Excel from "exceljs";
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';


// @Injectable({
//   providedIn: 'root'
// })

// export class ExcelService {
  
//   [x: string]: any;
//   constructor(private _datePipe: DatePipe) {
//   }

//   exportAsExcelFile(header: any, key: any, rows: any, formDataObj: any) {
//     let result: any = rows.map((obj: any) => {
//       let filterObj: any = {};
//       for (let i: any = 0; i < key.length; i++) {
//         filterObj[key[i]] = obj[key[i]];
//       }
//       return filterObj;
//     });

//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(result);
//     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

//     this.saveAsExcelFile(excelBuffer, formDataObj.pageName);
//   }

//   saveAsExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], {
//       type: EXCEL_TYPE
//     });
//     FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
//   }

//   downLoadPdf(header: any, key: any, rows: any, formDataObj: any) {
//     let result: any = rows.map((obj: any) => {
//       let filterObj: any = {};
//       for (let i: any = 0; i < key.length; i++) {
//         filterObj[key[i]] = obj[key[i]];
//       }
//       return filterObj;
//     });
//     let conMulArray: any;
//     conMulArray = result.map((o: any) => Object.keys(o).map(k => o[k]));

//     let doc: any = new jsPDF();
//     doc.line(50, 250, 100, 250);
//     // style pdf
//     let todayDate: any = new Date();
//     let fromDatePipe = this._datePipe.transform(formDataObj.fromDate, 'dd-MM-YYYY')
//     let toDatePipe = this._datePipe.transform(formDataObj.toDate, 'dd-MM-YYYY')
//     todayDate = this._datePipe.transform(todayDate, 'dd-MM-YYYY')
//     doc.setFontSize(10);
//     doc.text(formDataObj.pageName + (formDataObj.VehicleNumber ? (" (Vehicle No : " + formDataObj.VehicleNumber + ")") : ""), 105, 10, "center");
//     doc.setFontSize(10);
//     // doc.text("Vehicle No : " + formDataObj.VehicleNumber, 200, 10, "right");
//     doc.text("Date : " + todayDate, 200, 10, "right");
//     doc.text(8, 10, "From : " + fromDatePipe, "left");
//     doc.text(40, 10, "To : " + toDatePipe, "left");

//     doc.autoTable(header, conMulArray, {
//       startY: 20,
//       margin: { horizontal: 7 },
//       // styles: { columnWidth: 'wrap' },
//       columnStyles: { text: { columnWidth: 'auto' } }
//     });
//     doc.save(formDataObj.pageName);
//   }

// }

