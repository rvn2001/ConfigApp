import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client-edit-template',
  templateUrl: './client-edit-template.component.html',
  styleUrls: ['./client-edit-template.component.css']
})
export class ClientEditTemplateComponent {

  @Input() selectedItem;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  @Output() save = new EventEmitter<void>();

  saveData(content: string) {
    this.save.emit();
    this.activeModal.close(content);
  }

  dismiss(content: string) {
    this.activeModal.dismiss(content);
  }
}
