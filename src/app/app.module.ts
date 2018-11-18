import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientEditComponent } from './components/clients/client-edit/client-edit.component';
import { ClientEditTemplateComponent } from './components/clients/client-edit-template/client-edit-template.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientEditComponent,
    ClientEditTemplateComponent
  ],
  entryComponents: [ ClientEditTemplateComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
