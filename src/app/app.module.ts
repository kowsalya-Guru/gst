import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InvoiceService } from './table/table.service';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
