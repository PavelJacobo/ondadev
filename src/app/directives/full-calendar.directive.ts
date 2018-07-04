import { Directive,  Input, AfterViewInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';

@Directive({
  selector: '[appFullCalendar]'
})
export class FullCalendarDirective implements AfterViewInit {

  @Input('config') config: object = {};
  @Input('events') events: any;


   constructor(private el: ElementRef) {
   console.log('Directiva llamada');
 }

   ngAfterViewInit() {

       $(this.el.nativeElement).fullCalendar(this.config);
   }

   renderEvent(event) {
     $(this.el.nativeElement).fullCalendar('renderEvent', event);
   }

   removeEvent(eventoId) {
     $(this.el.nativeElement).fullCalendar('removeEvents', eventoId);
   }


}
