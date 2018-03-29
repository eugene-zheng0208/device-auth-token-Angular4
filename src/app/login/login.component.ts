import {Component, OnInit} from '@angular/core';

//AuthServiceとLoginクラスをインポート
import {AuthService, Login} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // オブジェクトの初期化
  sign_in = new Login();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  data(): any {
    // ログイン時に必要なデータを作成
    let body = JSON.stringify({
      'email': this.sign_in.email,
      'password': this.sign_in.password
    });

    // auth serviceのloginメソッドを body を引数として呼び出す
    // その後responseをconsoleで表示
    this.authService.logIn(body).then((response: any) => {

      // header情報のtoken, uid, client情報をローカルストレージにセットする
      this.authService.setToken(response.headers.get('access-token'));
      this.authService.setClient(response.headers.get('client'));
      this.authService.setUid(response.headers.get('uid'));
      console.log(response);
    });
  }

}
