import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // If already authenticated, redirect to home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/tabs/home"]);
    }
  }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(["/tabs/home"]);
    } else {
      this.errorMessage = "Invalid username or password";
    }
  }
}
