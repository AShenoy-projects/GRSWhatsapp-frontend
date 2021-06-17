import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  constructor(private db: AngularFireDatabase) {}

  getFilesData() {
    return this.db.list('GRSARROOM-FILES').valueChanges();
  }

  // addDummyRecs() {
  //   let obj0 = {
  //     filename: 'generated_video_1',
  //     addedDate: new Date(2021, 2, 10).getTime(),
  //     status: 'NOT_SENT',
  //     sentTo: null,
  //   };
  //   let obj1 = {
  //     filename: 'generated_video_2',
  //     addedDate: new Date(2021, 2, 11).getTime(),
  //     status: 'NOT_SENT',
  //     sentTo: null,
  //   };
  //   let obj2 = {
  //     filename: 'generated_video_3',
  //     addedDate: new Date(2021, 2, 12).getTime(),
  //     status: 'NOT_SENT',
  //     sentTo: null,
  //   };
  //   let obj3 = {
  //     filename: 'generated_video_4',
  //     addedDate: new Date(2021, 2, 12).getTime(),
  //     status: 'SENT',
  //     sentTo: '9916738409',
  //   };

  //   this.db.list('GRSARROOM-FILES').push(obj0);
  //   this.db.list('GRSARROOM-FILES').push(obj1);
  //   this.db.list('GRSARROOM-FILES').push(obj2);
  //   this.db.list('GRSARROOM-FILES').push(obj3);
  // }
}
