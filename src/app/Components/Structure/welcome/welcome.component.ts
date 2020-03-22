import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../Services/login-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  onLogin() {
    this.message = ' ';
    this.loginService.login(this.loginForm.controls.login.value, this.loginForm.controls.motDePasse.value).subscribe( connectMsgr => {
       // console.log(connectMsgr);
       this.message = connectMsgr.message;
       if (connectMsgr.success) { this.router.navigateByUrl('dashboard/vue'); }
    });
  }

  onSignUp() {
    this.router.navigateByUrl('signup');
  }
}
