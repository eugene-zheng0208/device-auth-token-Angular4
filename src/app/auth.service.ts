import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

// 必要なモジュールをインポート
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx'
import {isPlatformBrowser} from "@angular/common";


@Injectable()
export class AuthService {

  // apiのurl
  url = 'http://localhost:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: Http) {
  }

  // token情報をローカルストレージに保存
  // 保存しておくことで、リクエストするたびに入力する手間を省く
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId) && token) {
      localStorage.setItem('access-token', token);
    }
  }

  // uid = email 情報をローカルストレージに保存
  // 保存しておくことで、リクエストするたびに入力する手間を省く
  setUid(uid: string) {
    if (isPlatformBrowser(this.platformId) && uid) {
      localStorage.setItem('uid', uid);
    }
  }

  // client = 使用 端末情報をローカルストレージに保存
  // 保存しておくことで、リクエストするたびに入力する手間を省く
  setClient(client: string) {
    if (isPlatformBrowser(this.platformId) && client) {
      localStorage.setItem('client', client);
    }
  }

  // ローカルストレージに保存してあるtoken情報を取得する
  // 毎回入力することなく、tokenが有効な期間はこれで簡単にログインできる
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access-token');
    } else {
      return null;
    }
  }

  // ローカルストレージに保存してあるuid情報を取得する
  getUid() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('uid')) {
      return localStorage.getItem('uid');
    } else {
      return null;
    }
  }

  // ローカルストレージに保存してあるclient情報を取得する
  getClient() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('client');
    } else {
      return null;
    }
  }

  // 新規登録のためのメソッド
  signUp(body: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions(({headers: headers}));
    return this.http.post(this.url + '/api/auth', body, options).toPromise();
  }

  // 引数にはログイン時に必要となる、emailとpasswordを入れる予定
  // headerはjsonだと明記する
  logIn(body: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + '/api/auth/sign_in', body, options).toPromise();

  }
}


// オブジェクト作成のためのクラス
// 新規登録用
export class SignUp {
  constructor(public name?: string,
              public company?: string,
              public email?: string,
              public password?: string,
              public password_confirmation?: string) {
  }
}

// ログイン時のオブジェクトを定義
export class Login {
  constructor(public email?: string,
              public password?: string) {
  }
}
