import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public showModal = false;

  ngOnInit(): void {
    return;
  }

  public toggleModal() {
    this.showModal = !this.showModal;
  }
}
