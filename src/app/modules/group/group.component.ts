import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  public groupId: string;

  constructor(private readonly activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.groupId = this.activateRoute.snapshot.params['id'];
  }
}
