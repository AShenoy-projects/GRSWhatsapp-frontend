import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  getFilesData() {
    return this.db.list('GRSARROOM-FILES').valueChanges();
  }

  sendDataToProcess(filesList, phoneNumber) {
    console.log('recvd in service ===>' + filesList, phoneNumber);
    this.http
      .post('http://localhost:3000', {
        fileslist: filesList,
        phone: phoneNumber,
      })
      .subscribe((val) => console.log('response from server => ' + val));
  }
}
