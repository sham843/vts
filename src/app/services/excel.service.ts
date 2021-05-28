import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as Excel from "exceljs";
declare const ExcelJS: any;
import { DatePipe } from '@angular/common';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  // [x: string]: any;
  constructor(private _datePipe: DatePipe) {
  }

  downLoadPdf(header: any, key: any, rows: any, formDataObj: any) {
    let result: any = rows.map((obj: any) => {
      let filterObj: any = {};
      for (let i: any = 0; i < key.length; i++) {
        filterObj[key[i]] = obj[key[i]];
      }
      return filterObj;
    });
    let conMulArray: any;
    conMulArray = result.map((o: any) => Object.keys(o).map(k => o[k]));

    let doc: any = new jsPDF();
    doc.line(50, 250, 100, 250);
    // style pdf
    let todayDate: any = new Date();
    let fromDatePipe = this._datePipe.transform(formDataObj.fromDate, 'dd-MM-YYYY')
    let toDatePipe = this._datePipe.transform(formDataObj.toDate, 'dd-MM-YYYY')
    todayDate = this._datePipe.transform(todayDate, 'dd-MM-YYYY')
    doc.setFontSize(10);
    doc.text(formDataObj.pageName + (formDataObj.VehicleNumber ? (" (Vehicle No : " + formDataObj.VehicleNumber + ")") : ""), 105, 10, "center");
    doc.setFontSize(10);
    // doc.text("Vehicle No : " + formDataObj.VehicleNumber, 200, 10, "right");
    doc.text("Date : " + todayDate, 200, 10, "right");
    doc.text(8, 10, "From : " + fromDatePipe, "left");
    doc.text(40, 10, "To : " + toDatePipe, "left");

    doc.autoTable(header, conMulArray, {
      startY: 20,
      margin: { horizontal: 7 },
      // styles: { columnWidth: 'wrap' },
      columnStyles: { text: { columnWidth: 'auto' } }
    });
    doc.save(formDataObj.pageName);
  }

  exportAsExcelFile(keyExcelHeader: any, headersArray: any, json: any, formDataObj: any) {
   
   debugger
    const header = keyExcelHeader;

    let result: any = json.map((obj: any) => {
      let filterObj: any = {};
      for (let i: any = 0; i < headersArray.length; i++) {
        filterObj[headersArray[i]] = obj[headersArray[i]];
      }
      return filterObj;
    });

    // const data = json;

    // Create workbook and worksheet
    
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Snippet Coder';
    workbook.lastModifiedBy = 'SnippetCoder';
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet(formDataObj.pageName);

    // Adding Header Row

    worksheet.addRow([]);
 
    worksheet.getCell('A1').value = formDataObj.pageName;
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 12, bold: true };

    worksheet.addRow([]);
    worksheet.addRow([]);
 
    worksheet.getCell('D3').value = 'FromDate:'+ this._datePipe.transform(formDataObj.fromDate,'dd-MM-YYYY');
    worksheet.getCell('D3').alignment = { horizontal: 'center' };
    worksheet.getCell('D3').font = { size: 12, bold: true };

    worksheet.getCell('E3').value = 'ToDate:'+ formDataObj.toDate;
    worksheet.getCell('E3').alignment = { horizontal: 'center' };
    worksheet.getCell('E3').font = { size: 12, bold: true };

    worksheet.addRow([]);

    //Add Header Row
    //Cell Style : Fill And Border
    
    const headerRow = worksheet.addRow(header);

    headerRow.eachCell((cell: any, index: any) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFFFFFF'
        },
        bgColor: {
          argb: 'FFFFFFFF'
        },
      };
      cell.border = {
        top: {
          style: 'thin'
        },
        left: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        }
      };
      cell.font = { size: 12, bold: true }
      worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;

    });

    result.forEach((element: any) => {
      debugger
      const eachRow: any = [];
      headersArray.forEach((column: any) => {
        eachRow.push(element[column]);
      })
      if (element.isDeleted === 'Y') {
        const deletedRow = worksheet.addRow(eachRow);
        deletedRow.eachCell((cell: any) => {
          cell.font = {
            name: 'calibri', family: 4, size: 11, bold: false, strike: true
          };
        });
      } else {
        worksheet.addRow(eachRow);
      }
    });

    worksheet.addRow(result[0]);

    //Save Excel File

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      console.log(data);
      const blob = new Blob([data], { type: EXCEL_TYPE });
      FileSaver.saveAs(blob, formDataObj.pageName + EXCEL_EXTENSION);
    });
  }

  private numToAlpha(num: number) {
    let alpha = '';
    return alpha;
  }
}

