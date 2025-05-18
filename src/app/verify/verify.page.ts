import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.page.html",
  styleUrls: ["./verify.page.scss"],
})
export class VerifyPage implements OnInit {
  verifyForm: FormGroup;
  errorMessage: string = "";
  verificationCode: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.verifyForm = this.formBuilder.group({
      code: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  async ngOnInit() {
    this.verificationCode =
      (await this.authService.getVerificationCode()) || "";
    if (!this.verificationCode) {
      this.router.navigate(["/register"]);
    }
  }

  async onSubmit() {
    if (this.verifyForm.valid) {
      const enteredCode = this.verifyForm.value.code;

      if (enteredCode === this.verificationCode) {
        // In a real app, you would verify the code with your backend
        // For now, we'll just simulate a successful verification
        await this.authService.setUserData({
          ...(await this.authService.getUserData()),
          verified: true,
        });

        this.router.navigate(["/login"]);
      } else {
        this.errorMessage = "Invalid verification code. Please try again.";
      }
    }
  }

  async resendCode() {
    // In a real app, you would request a new code from your backend
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.authService.setVerificationCode(newCode);
    this.verificationCode = newCode;
    this.errorMessage = "";
    this.verifyForm.reset();
  }
}
