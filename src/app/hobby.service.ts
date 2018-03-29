import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

// 必要なモジュールをインポート
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class HobbyService {

  url = 'http://localhost:3000';

  constructor(private http: Http, private authService: AuthService) {
  }


  findAll(): Promise<Hobby[]> {
    // header情報に token, uid, uidを付与する
    const headers = new Headers({
      'Content-Type': 'application/json',
      'access-token': this.authService.getToken(),
      'client': this.authService.getClient(),
      'uid': this.authService.getUid()
    });
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.url + '/hobbies', options)
      .map(response => response.json())
      .map(data => {
        const entries: Hobby[] = [];
        console.log(data);
        data.forEach((data: any) => {
          entries.push(new Hobby(
            data['id'],
            data['name'],
            data['created_at'],
          ));
        });
        return entries;
      })
      .toPromise();
  }

}

// hobbyのオブジェクトを定義
export class Hobby {
  constructor(public id?: number,
              public name?: string,
              public created_at?: string) {
  }
}
