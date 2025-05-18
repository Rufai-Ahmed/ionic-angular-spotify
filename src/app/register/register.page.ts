import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage {
  registerForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get("password")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        // In a real app, you would call your backend API here
        // For now, we'll just simulate a successful registration
        await this.authService.setUserData({
          email: this.registerForm.value.email,
        });

        // Generate a random verification code (in a real app, this would come from your backend)
        const verificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        await this.authService.setVerificationCode(verificationCode);

        // Navigate to verification page
        this.router.navigate(["/verify"]);
      } catch (error) {
        this.errorMessage = "Registration failed. Please try again.";
      }
    }
  }
}
