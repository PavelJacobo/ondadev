import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams, CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/utils/utils.custom.formater-provider';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-programacion-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './programacion-admin.component.html',
  styleUrls: ['./programacion-admin.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class ProgramacionAdminComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  view: string = 'week';
  colors: any = {
            red: {
              primary: '#ad2121',
              secondary: '#FAE3E3'
            },
            blue: {
              primary: '#1e90ff',
              secondary: '#D1E8FF'
            },
            yellow: {
              primary: '#e3bc08',
              secondary: '#FDF1BA'
            }
      };
      viewDate: Date = new Date();

    events: CalendarEvent[] = [
      {
        title: 'Draggable event',
        color: this.colors.yellow,
        start: new Date(),
        draggable: true
      },
      {
        title: 'A non draggable event',
        color: this.colors.blue,
        start: new Date()
      }
    ];

    refresh: Subject<any> = new Subject();

    eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
    }

}
