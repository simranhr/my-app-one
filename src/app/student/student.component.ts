import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentData } from './student.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

 showAdd!:boolean;
 showForm!:boolean;
 showUpdate!:boolean;
 studentModelObj:studentData = new studentData;
 allStudentsData: any;
 formValue!: FormGroup;

  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
       name: ['', Validators.required], 
       email: ['', Validators.required],
       mobile: ['', Validators.required]
    })
    this.getData();
  }

  add() {
    this.showForm = true;
    this.showAdd = true;
    this.showUpdate = false;
  }

  edit(data:any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
  }

  addStudent() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    
    this.api.postStudent(this.studentModelObj).subscribe(res=> {
      console.log("res post student", res);
      alert("Student record added successfully");
      this.formValue.reset();
      this.getData();
    }, 
    (err) => {
      alert("Error! Student record not added successfully");
    })
  }

  //basically gets all student data
  getData() {
     this.api.getStudent().subscribe(res => {
      console.log('getData res', res);
      this.allStudentsData = res;
     })
  }

  //deletes a particular student record
  deleteData(data:any) {
    if(confirm("Are you sure you want to delete the student record?")) {
      this.api.deleteStudent(data.id).subscribe(res => {
        alert("Student record deleted successfully");
        this.getData();
      })
    }
  }

  //updates a student
  update() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    
    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id).subscribe(res=> {
      console.log("res update student", res);
      alert("Student record updated successfully");
      this.formValue.reset();
      this.getData();
    }, 
    (err) => {
      alert("Error! Student record not updated successfully");
    })
  }

  closeForm() {
    this.showForm = false;
  }

}
