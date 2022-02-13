import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../table/table.service';
import { Invoice } from './table.model';

declare var $: any

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  submitted: boolean | undefined;
  invoiceForm: FormGroup | any;
  dtOptions: DataTables.Settings = {};
  invoice: Invoice[] = [];
  componentStatusSub: any;
  total: number = 0;
  constructor(private formBuilder: FormBuilder, public invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.invoiceForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      gst: ['', [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
      total_amount: [''],
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      // processing: true,
      searching: true
    };

    this.invoiceService.readInvoice("?active=true")
      .then(invoice => {
        this.invoice = invoice;
        this.invoice.forEach((data) => {
          this.total = this.total + +data.total_amount
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  get invoiceControl() {
    return this.invoiceForm.controls;
  }

  onCreate(): void {
    this.componentStatusSub = this.invoiceService.getComponentStatusListener()
      .subscribe(
        componentStatus => {
          console.log(componentStatus);
        });

    if (this.invoiceForm.invalid) {
      this.submitted = true;
      return;
    } else {
      let gst = this.invoiceForm.value.gst;
      let originalAmount = this.invoiceForm.value.amount;
      let totalAmount = originalAmount * (gst / 100);
      this.invoiceForm.value.total_amount = (+originalAmount + +totalAmount);
      this.invoiceService.createInvoice(this.invoiceForm.value)
        .then(user_res => {
          this.ngOnInit();
          // this.refreshTable();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
