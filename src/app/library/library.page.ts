import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import menuYourLibrary from "../../assets/mockdata/menuYourLibrary.json";

@Component({
  selector: "app-library",
  templateUrl: "./library.page.html",
  styleUrls: ["./library.page.scss"],
})
export class LibraryPage implements OnInit {
  public libraryItems = menuYourLibrary;

  constructor(private router: Router) {}

  ngOnInit() {}

  public openAlbum(album) {
    const titleEscaped = encodeURIComponent(album.title);
    this.router.navigateByUrl(`/tabs/home/${titleEscaped}`);
  }

  public dasherize(string) {
    return string?.replace(/[A-Z]/g, function (char, index) {
      return (index !== 0 ? "-" : "") + char.toLowerCase();
    });
  }
}
