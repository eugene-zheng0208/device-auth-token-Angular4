import {Component, OnInit} from '@angular/core';

import {HobbyService, Hobby} from "./hobby.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  hobbies: Hobby[] = [];

  constructor(private hobbyService: HobbyService) {
  }

  // 初期化した時点でのデータを取得、表示させる
  ngOnInit() {
    this.hobbyService.findAll().then((hobbies) => {
      this.hobbies = hobbies;
      console.log(hobbies);
    }).catch((e) => console.log(e));
  }

  // データを追加した後にクリックすると、リロードできるボタン用のfunction
  getData() {
    this.ngOnInit();
  }
}
