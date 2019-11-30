import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Create_taskComponent } from '../create_task/create_task.component';
import { MainService } from '../services/main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.sass']
})
export class DonateComponent implements OnInit {
  requestObject: { "donated_amount": any; "donated_date": any; "donator_name": any; };
  request1Object: { "donatedAmount": any; "donatedDate": any; "donorName": any; "issueId": any; };
  
  constructor( public toastr: ToastrService,private router:Router,private  elemRef: ElementRef,public dialogRef: MatDialogRef<Create_taskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http : HttpClient) {
  }
  username:any
  issueSelected:any
donateAmount:any=0
d = new Date();
  dateString:any
onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {
    this.username=sessionStorage.getItem('name')
    this.issueSelected=sessionStorage.getItem('selectedIssue')
    this.dateString = this.d.getDate()  + "-" + (this.d.getMonth()+1) + "-" + this.d.getFullYear()
  }
  
  setAmount(amt: any){
    this.donateAmount=amt;
  }
  // donate(){
  //   sessionStorage.setItem('donation',this.donateAmount)
  //   this._Mainservice.donate(this.username,this.donateAmount,this.issueSelected)
  //   this.router.navigate(['./dashboard'])
  // }



  donate(){
    this.requestObject={
      "donated_amount":this.donateAmount,
      "donated_date":this.dateString,
      "donator_name":this.username,
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     JSON.stringify(this.requestObject)
      this.http.post("https://chain-agrifund.mybluemix.net/api/donate/"+this.issueSelected,this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            this.toastr.success("Donation SuccessFul")
             console.log(res);
            return res
         },err => {this.toastr.error('SignUp Failed!')
        console.log(err)});


        this.request1Object={
          "donatedAmount":"5",
          "donatedDate":"2019-11-29",
          "donorName":this.username,
          "issueId":this.issueSelected
        }
console.log(JSON.stringify(this.request1Object))
        this.http.post("https://backend-agrifund.mybluemix.net/donors",this.request1Object,{headers: header}).subscribe((res) => {
          console.log(res);
          return res
      },err => {this.toastr.error('SignUp Failed!')
      console.log(err)});

    
  }
  
}
