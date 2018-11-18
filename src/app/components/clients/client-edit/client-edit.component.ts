import { Component, OnInit, Input } from '@angular/core';
import { ClientEditTemplateComponent } from '../client-edit-template/client-edit-template.component'
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  closeResult: string;
  private modal: NgbModalRef;
  @Input() selectedItem;
  alertMessage: string;
  private _alert = new Subject<string>();
  messageType = 'success';

  constructor(private modalService: NgbModal, private _httpSvc: HttpClient) { }

  ngOnInit() {
    this._alert.subscribe((message) => this.alertMessage = message);
    this._alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.alertMessage = null);
  }


  onSave() {
    const req = 'http://localhost:51447/api/StellarConfig/ClientUpdate';
    this._httpSvc.post(req, this.selectedItem).subscribe(
              data => {
                if (data === true) {
                  this.successAlert('Updated Sucsessfuly');
                } else {
                  this.errorAlert('Updated Failed!')
                }
              },
              error => { this.errorAlert('Updated Failed with exception!'); }
              );
  }

  errorAlert(message: string){
    this.messageType = 'danger';
    this._alert.next(message);
  }
  successAlert(message: string){
    this.messageType = 'success';
    this._alert.next(message);
  }

  open(id, itm) {
    this.selectedItem = itm;
    this.modal = this.modalService.open(ClientEditTemplateComponent);
    this.modal.componentInstance.selectedItem = this.selectedItem;
    this.modal.componentInstance.save.subscribe(a => this.onSave());
   }
}
