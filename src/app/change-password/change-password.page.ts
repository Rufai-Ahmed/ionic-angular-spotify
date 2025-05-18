import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"],
})
export class ChangePasswordPage {
  changePasswordForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ["", [Validators.required]],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get("newPassword")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.changePasswordForm.valid) {
      try {
        // In a real app, you would verify the current password and update the new password with your backend
        // For now, we'll just simulate a successful password change
        this.successMessage = "Password changed successfully!";
        this.errorMessage = "";

        // Clear the form
        this.changePasswordForm.reset();

        // Navigate back to settings after a short delay
        setTimeout(() => {
          this.router.navigate(["/settings"]);
        }, 2000);
      } catch (error) {
        this.errorMessage = "Failed to change password. Please try again.";
        this.successMessage = "";
      }
    }
  }
}
