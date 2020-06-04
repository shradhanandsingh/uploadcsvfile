import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  data: [][];
  constructor() { }

  ngOnInit() {
  }

  onFileChange(evt: any){
    const target: DataTransfer = <DataTransfer>(evt.target);

    if(target.files.length !== 1) throw Error('Can not use multiple file');

    const reader: FileReader = new FileReader();
    reader.onload = (e:any) =>{
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsNames: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsNames];
      console.log(ws);
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      console.log(this.data);
    }
    reader.readAsBinaryString(target.files[0]);
  }

}
