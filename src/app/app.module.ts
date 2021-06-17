import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WhatsappService } from './whatsapp.service';
import { SortableDirective } from './sortable.directive';
import { HidePhoneNoPipe } from './hide-phone-no.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WhatsappComponent,
    NavbarComponent,
    SortableDirective,
    HidePhoneNoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: '**',
        component: AppComponent,
      },
    ]),
  ],
  providers: [WhatsappService],
  bootstrap: [AppComponent],
})
export class AppModule {}
