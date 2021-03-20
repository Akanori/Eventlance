import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_core/auth.service';
import { User } from '../_types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  user = {} as User;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
  }

  async doLogin() {
    if (this.loginForm.valid) {
      this.auth.loginWithEmailAndPassword(
        {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value
        }, '/events');
    }
  }

  toRegister(){
    this.router.navigate(['register']);
  }
}
