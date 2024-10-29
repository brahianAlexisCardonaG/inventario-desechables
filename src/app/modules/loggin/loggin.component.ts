import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogginService } from 'src/app/core/services/loggin.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss']
})
export class LogginComponent implements OnInit{
  loginForm!: FormGroup;
  isLoginFormVisible: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private logginService: LogginService,
    private toasterService: ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleLoginForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }

  clickLoggin():void {
    let dataFormLoggin = this.loginForm.getRawValue();
    console.log(dataFormLoggin)
    this.logginService.loggin('api/usuario/loggin',dataFormLoggin).subscribe({
      next:(data)=>{
        console.log(data)
        let dataUser = JSON.stringify(data[0]);
        sessionStorage.setItem("user", dataUser);
        this.router.navigate(['/realizar-ventas']);
      },
      error:(error)=>{
        console.log(error)
        if(error){
          this.toasterService.error(error.error)
        }
      }
    })
  }

}
