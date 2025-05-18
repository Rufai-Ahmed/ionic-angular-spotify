import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private _storage: Storage | null = null;

  constructor(
    private router: Router,
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const isAuth = await this._storage.get("isAuthenticated");
    this.isAuthenticatedSubject.next(isAuth === true);
  }

  async login(username: string, password: string): Promise<boolean> {
    // Dummy authentication
    if (username === "user" && password === "user") {
      await this._storage?.set("isAuthenticated", true);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    await this._storage?.remove("isAuthenticated");
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // User data methods
  async setUserData(data: any): Promise<void> {
    await this._storage?.set("userData", data);
  }

  async getUserData(): Promise<any> {
    return await this._storage?.get("userData");
  }

  async setVerificationCode(code: string): Promise<void> {
    await this._storage?.set("verificationCode", code);
  }

  async getVerificationCode(): Promise<string> {
    return await this._storage?.get("verificationCode");
  }
}
