import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private api: ApiService, private router: Router) {

  }


  logined = new FormGroup({
    username: new FormControl('',[ Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  get f() {
    return this.logined.controls;
  }
  


  singin() {
    console.log(this.logined.value);
    if (this.logined.valid) {
      console.log(this.logined.value);
      this.api.register_user(this.logined.value.username, this.logined.value.password).subscribe((res: any) => {
        // console.log(res.token);
        if (res.token) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/authentication/login']);
        }
      })
    }
  }
  hide = true;
  registredsuccessfully() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Registered  successfully"
    }).then(() => {
      this.router.navigate(['/authentication/login']);
    });
  }
}
