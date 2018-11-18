import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  page = 1;
  currentMessage = '';
  data;
  totalRows;
  searchName: FormControl;
  selectedItem;
  constructor(private modalService: NgbModal, private http: HttpClient) {   }
  ngOnInit() {
    this.searchName = new FormControl('');
    this.searchName.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe(a => this.pageRefresh());
    this.pageRefresh();
  }

  pageRefresh() {
    this.currentMessage = 'selected page' + this.page;
    this.getClients(this.page, 10).subscribe(
      data => {
        this.data = data.data;
        this.totalRows = data.totalRows;
      },
      error => { alert(Error); }
      );

  }

  getSelectedItem(id) {
    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i];
      if ( e.clientId === id ) {
        this.selectedItem = e;
        break;
      }
    }
    return this.selectedItem;
  }

  getClients (index, size): Observable<any> {
    const req = 'http://localhost:51447/api/StellarConfig/ClientList';
    const params = new HttpParams()
          .append('clientName', this.searchName.value)
          .append('index', index)
          .append('size', size);
    return this.http.get(req, {params});
  }

}
