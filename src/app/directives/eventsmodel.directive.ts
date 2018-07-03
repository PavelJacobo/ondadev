import { Directive, Input, ElementRef, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';

@Directive({
  selector: '[appEventsmodel]'
})
export class EventsmodelDirective  implements AfterViewInit {

  @Input('events') events: any;

  constructor(private el: ElementRef) {
      console.log('DIRECTIVA EVENT LLAMADA DESDE CONSTRUCTOR');

      }

      ngAfterViewInit() {
        console.log('directiva events llamada');
        // $(this.el.nativeElement).fullCalendar('renderEvents');
        console.log('Eventos Renderizados ', this.events);
      }
}
