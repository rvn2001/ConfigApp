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
import { StellarConfigApiService } from '../../services/stellar-config-api.service';

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
  constructor(private modalService: NgbModal, private scSvc: StellarConfigApiService) {   }
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
    this.scSvc.getClients(this.searchName.value, this.page, 10).subscribe(
      data => {
        this.data = data.data;
        this.totalRows = data.totalRows;
      },
      error => { alert(Error); }
      );

  }

  getSelectedItem(id) {
    if (id === -1) {
      return {clientId: id, name: '', description: '', activeDirectoryGroup: ''};
    }
    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i];
      if ( e.clientId === id ) {
        this.selectedItem = e;
        break;
      }
    }
    return this.selectedItem;
  }

}
