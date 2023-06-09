import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() public show: boolean;

  ngOnInit(): void {
    return;
  }

  public toggleModal() {
    this.show = !this.show;
  }
}
