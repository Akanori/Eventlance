import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_core/auth.service';
import { User } from '../_types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  user = {} as User;

  constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
  }

  async register() {
    if (this.registerForm.valid) {
      this.auth.createUserWithEmailAndPassword({
        displayName: this.registerForm.get('displayName').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      }, '/events');
      this.registerForm.reset();
    }
  }

  toLogin() {
    this.router.navigate(['login']);
  }
}
