import { Component, OnInit } from '@angular/core';
import { CalendarHeaderComponent } from 'src/app/utils/utils.calendar-header';



@Component({
  selector: 'app-programacion-admin',
  templateUrl: './programacion-admin.component.html',
  styleUrls: ['./programacion-admin.component.css']
})
export class ProgramacionAdminComponent implements OnInit {

  viewDate: Date = new Date();
  events = [];

  constructor() { }

  ngOnInit() {
  }

}
