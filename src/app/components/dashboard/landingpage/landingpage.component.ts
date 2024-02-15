import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../authentication/api.service';

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  selectedFile: File | null = null;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  showdata: any;
  codechek: any;
  fileNumber: any;
  codegeretaed: any;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  constructor(private api: ApiService) {
    this.api.showuploadedfile().subscribe((res: any) => {
      // console.table(res);
      this.showdata = res.file_data;
      this.dataSource = new MatTableDataSource<any>(this.showdata);
      this.dataSource.paginator = this.paginator;
    })




  }



  filess: any;
  uploadFileselected(elmt: any) {
    this.filess = elmt.target.files[0];
    // console.log(this.filess);

  }

  formm = new FormGroup({
    token: new FormControl(localStorage.getItem('token')),

  });
  submit() {
    if (this.filess != '') {
      let form = new FormData();
      form.append('token', <string>localStorage.getItem('token'));
      form.append('file_name', this.filess);
      this.api.upload_file(form).subscribe((res: any) => {
        // console.log(res);
        if (res.status == 'success') {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "File successfully Uploaded"
          }).then(() => {
            location.reload();
          })
        }

      })
    }
  }

  get f() {
    return this.formm.controls;
  }
  deletefile(userid: any) {
    this.api.deletefile(userid).subscribe((res: any) => {
      // console.log(res);
      if (res.status == 'success') {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "File successfully deleted"
        }).then(() => {
          location.reload();
        })
      }
    })
  }

  open_edit_popup(elemid: any) {
    this.api.get_file_id(elemid).subscribe((res: any) => {
      // console.log(res);
      this.codechek = res.data;
      this.codegeretaed = res.data[0].file_code;
      console.log(this.codegeretaed);
    })
  }
  updtaedfile(chnghgh: any, hiddid: any) {
    this.api.update_file(chnghgh, hiddid).subscribe((res: any) => {
      // console.table(res);
    })
  }


  updateFileNumber(value: any) {
    this.fileNumber = +value.target.value;

    if (this.fileNumber) {

      console.log("code matching success");
    }
    console.log(this.fileNumber, this.codechek);

  }
  fileURL:any;
  file_name:any;
  file_pass:any;
  opendownload(file_name:any,pass_code:any)
  {
    this.file_name = file_name;
    this.file_pass = pass_code;
    this.fileURL = 'https://www.localhost/CodeIgniter-3.1.13-mobogic-task/uploads/'+file_name;
    
  }

  showDownloadButton: boolean = true;
  chechPass(pass1:any,pass2:any)
  {
    
    if(pass1 == pass2)
    {
      this.showDownloadButton = true;
    }else{
      this.showDownloadButton = false;
    }
  }
}
