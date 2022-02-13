import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { Invoice } from "./table.model"
const BACKEND_URL = environment.apiUrl + "/invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private componentStatusListener = new Subject<boolean>();

  getComponentStatusListener() {
    return this.componentStatusListener.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }

  createInvoice = async (obj: Invoice) => new Promise<any>((resolve, rejects) => {
    this.http.post(BACKEND_URL, obj)
      .subscribe(
        response => {
          resolve(response);
        },
        error => {
          rejects(error);
        }
      );
  })

  readInvoice = async (query?: any) => new Promise<any>((resolve, rejects) => {
    this.http.get<Invoice[]>(BACKEND_URL + (query ? query : ''))
      .subscribe(
        response => {
          console.log(response);
          
          resolve(response);
        },
        error => {
          rejects(error);
        }
      );
  })

}