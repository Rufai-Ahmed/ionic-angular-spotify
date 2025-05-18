import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  public user = {
    name: "User",
    email: "user@example.com",
    image: "default-avatar",
  };

  public settings = {
    crossfade: false,
    gaplessPlayback: true,
    highQualityStreaming: true,
    downloadQuality: "high",
    theme: "dark",
  };

  constructor(
    private router: Router,
    private storage: Storage,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const savedSettings = await this.storage.get("userSettings");
    if (savedSettings) {
      this.settings = { ...this.settings, ...savedSettings };
    }
  }

  async toggleSetting(setting: string) {
    try {
      this.settings[setting] = !this.settings[setting];
      await this.storage.set("userSettings", this.settings);
    } catch (error) {
      console.error("Error saving setting:", error);
      // Revert the change if saving failed
      this.settings[setting] = !this.settings[setting];
    }
  }

  async updateSetting(setting: string, value: any) {
    try {
      this.settings[setting] = value;
      await this.storage.set("userSettings", this.settings);
    } catch (error) {
      console.error("Error saving setting:", error);
    }
  }

  async logout() {
    await this.authService.logout();
  }

  navigateToChangePassword() {
    this.router.navigate(["/change-password"]);
  }
}
