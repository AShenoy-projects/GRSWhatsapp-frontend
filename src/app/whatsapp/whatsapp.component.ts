import {
  Component,
  OnDestroy,
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
export class WhatsappComponent implements OnDestroy {
  timeFrom;
  timeTo;
  subscription: Subscription;
  GrsFilesList: IgrsFile[];
  displayList: IgrsFile[];
  selectedMedia = [];
  successPrompt = false;
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
  });
  isThereAFirebaseError = false;
  isLoading = true;

  get name() {
    return this.form.get('name');
  }

  get phone() {
    return this.form.get('phone');
  }

  filter = new FormControl('');

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(private service: WhatsappService) {
    this.subscription = service.getFilesData().subscribe(
      (list: IgrsFile[]) => {
        this.GrsFilesList = list;
        this.displayList = list;
        this.isLoading = false;
      },
      (err) => {
        this.isThereAFirebaseError = true;
        console.log('firebase error' + err);
      }
    );

    this.filter.valueChanges.subscribe((val) => {
      this.displayList = this.GrsFilesList.filter((file) =>
        file.sentTo ? file.sentTo.startsWith(val) : val ? false : true
      );
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSort({ column, direction }: SortEvent) {
    console.log(column, direction);
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
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
    // this.service.sendDataToProcess(
    //   this.selectedMedia,
    //   __COUNTRY_CODE + this.phone.value
    // );
    this.successPrompt = true;
    this.form.reset();
    this.selectedMedia.splice(0, this.selectedMedia.length);
  }
}
