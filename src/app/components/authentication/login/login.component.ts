import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(private api:ApiService,private router:Router){

}


logined = new FormGroup({
  username : new FormControl('',Validators.required),
  password : new FormControl('',Validators.required)
});

get f() {
  return this.logined.controls;
}



singin()
{
  console.log(this.logined.value);
  if (this.logined.valid)
  {
    console.log(this.logined.value);
    this.api.login_user(this.logined.value.username,this.logined.value.password).subscribe((res:any)=>{
      console.log(res.token);
      let token = res.token ;
      // localStorage.setItem('token', token);
    
      if(res.token)
      {
        localStorage.setItem('token',res.token);
        this.registredsuccessfully();
      }else
      {
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
          icon: "warning",
          title: "Provide valid details"
        }).then(()=>{
          this.router.navigate(['authentication/register']);
        });
      }
      })
    }
  }

hide = true;
registredsuccessfully(){
   
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
    title: "Login  successfully"
  }).then(()=>{
    this.router.navigate(['/']);
  });
}

}