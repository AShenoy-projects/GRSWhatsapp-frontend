import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WhatsappService } from '../whatsapp.service';
import { IgrsFile } from '../IModels/Igrsfile';
import { SortableDirective } from '../sortable.directive';
import { SortEvent } from '../IModels/SortEvent';
import { Subscription } from 'rxjs';

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
const __COUNTRY_CODE = '91';

@Component({
  selector: 'appWhatsapp',
  templateUrl: './whatsapp.component.html',
  encapsulation: ViewEncapsulation.None, //for tooltip
  styleUrls: ['./whatsapp.component.css'],
})
export class WhatsappComponent implements OnDestroy, OnInit {
  //Display Lists
  GrsFilesList: IgrsFile[];
  displayList: IgrsFile[] = [];
  selectedMedia = [];

  //formcontrols
  filter = new FormControl('');
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
  });

  //div toggles
  successPrompt = false;
  isThereAFirebaseError = false;
  isLoading = true;

  //other properties
  timeFrom; //dummy
  timeTo; //dummy
  subscription: Subscription;
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  //form control getters
  get name() {
    return this.form.get('name');
  }

  get phone() {
    return this.form.get('phone');
  }

  constructor(private service: WhatsappService) {
    //Populate display lists
    this.subscription = service.getFilesData().subscribe(
      (list: IgrsFile[]) => {
        this.GrsFilesList = list;
        this.isLoading = false;

        this.displayList.splice(0, this.displayList.length);
        for (let file of list) {
          let obj = {
            ...file,
            vidUrl: service.getFileUrl(file.filename),
          };
          this.displayList.push(obj);
        }
      },
      (err) => {
        this.isThereAFirebaseError = true;
        console.log('firebase error' + err);
      }
    );
  }

  ngOnInit(): void {
    //filter init
    this.filter.valueChanges.subscribe(
      (val) => {
        this.displayList = this.GrsFilesList.filter((file) =>
          file.sentTo
            ? file.sentTo.startsWith(__COUNTRY_CODE + val)
            : val
            ? false
            : true
        );
      },
      (err) => console.log(err)
    );
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.displayList = this.GrsFilesList;
    } else {
      this.displayList.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  onEdit(file) {
    const index = this.selectedMedia.indexOf(file);
    index == -1
      ? this.selectedMedia.push(file)
      : this.selectedMedia.splice(index, 1);
  }

  onSubmit() {
    this.service.sendDataToProcess(
      this.selectedMedia,
      __COUNTRY_CODE + this.phone.value
    );
    this.successPrompt = true;
    this.form.reset();
    this.selectedMedia.splice(0, this.selectedMedia.length);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
