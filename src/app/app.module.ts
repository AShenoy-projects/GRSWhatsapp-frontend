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

@NgModule({
  declarations: [
    AppComponent,
    WhatsappComponent,
    NavbarComponent,
    SortableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
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
