import { OnInit, Component } from "@angular/core";
import { AuthService } from "../_core/auth.service";
import { Router } from "@angular/router";

@Component({
    template: ''
  })
  
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.logout();
  }

}