import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: any = 'http://localhost/CodeIgniter-3.1.13-mobogic-task/Login/';

  constructor(private http: HttpClient) {
  }
  register_user(username: any, password: any) {
    let obj = { 'username': username, 'password': password };
    return this.http.post(this.api + 'register_user', obj);
  }

  login_user(username:any,password:any){
    let obj = {'username':username, 'password':password};
    return this.http.post(this.api + 'login_user',obj);
 }



 upload_file(data: any) {
  // let obj = { 'token': localStorage.getItem('token'), 'file_name': file_name };
  return this.http.post(this.api + 'upload_file', data);
}


deletefile(file_id:any){
  let obj= {'token':localStorage.getItem('token'),'file_id':file_id};
  return this.http.post(this.api + 'deletefile', obj);
}



showuploadedfile(){
  let obj= {'token':localStorage.getItem('token')};
  return this.http.post(this.api +'showfile', obj);
}
// pending
get_file_id(file_id:any){
  let obj= {'token':localStorage.getItem('token'),'file_id':file_id};
  return this.http.post(this.api + 'get_file_id', obj);
}
update_file(file_name:any,file_id:any){
  let obj ={'token':localStorage.getItem('token'),'file_name':file_name,'file_id':file_id};
return this.http.post(this.api + 'update_file', obj);
}

}
