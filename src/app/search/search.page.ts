import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import searchTopGenres from "../../assets/mockdata/searchTopGenres.json";
import searchBrowseAll from "../../assets/mockdata/searchBrowseAll.json";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  public topGenres = searchTopGenres;
  public browseAll = searchBrowseAll;

  public opts = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true,
  };

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
