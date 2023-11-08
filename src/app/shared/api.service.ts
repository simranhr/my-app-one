import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _Http:HttpClient) { }

  //post Method
  postStudent(data:any) {
    return this._Http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  //get Method
  getStudent() {
    return this._Http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any) => {
      return res;
    }))
  }

  //update Method
  updateStudent(data:any, id:number) {
    return this._Http.put("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  //delete Method
  deleteStudent(id:number) {
    return this._Http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }
}
