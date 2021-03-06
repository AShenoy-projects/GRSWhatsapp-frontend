import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IgrsFile } from './IModels/Igrsfile';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {}

  getFileUrl(filename) {
    return this.storage.ref(filename).getDownloadURL();
  }

  getFilesData() {
    return this.db
      .list('GRSARROOM-FILES')
      .snapshotChanges()
      .pipe(
        map((dataArray) => {
          let keyValueArray: IgrsFile[] = [];
          for (let data of dataArray) {
            const id = data.payload.key;
            const body = data.payload.val();
            keyValueArray.push({
              id: id,
              ...(body as object),
            } as IgrsFile);
          }
          return keyValueArray;
        })
      );
  }

  sendDataToProcess(filesList: IgrsFile[], phoneNumber) {
    let objToSend = {
      fileslist: filesList,
      phone: phoneNumber,
    };

    this.http
      .post(environment.backend.host + '/update', objToSend)
      .subscribe((val) => console.log('Response from the server => ' + val));
  }
}
