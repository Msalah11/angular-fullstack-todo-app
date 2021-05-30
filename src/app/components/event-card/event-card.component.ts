import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() data: any;
  @Output() onAddClick = new EventEmitter();
  @Output() onEditClick = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  editItem() {
    this.onEditClick.emit(this.data);
  }

  addItem() {
    this.onAddClick.emit(this.data);
  }
}
