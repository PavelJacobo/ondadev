import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Injectable, ElementRef } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter,
NgbDateParserFormatter, NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EventsServicesService } from 'src/app/services/events-services.service';
import { AuthService } from 'src/app/services/auth.service';
import { FullCalendarDirective } from 'src/app/directives/full-calendar.directive';
import { CustomTimePicker } from 'src/app/utils/utils.customtimepicker';


@Component({
  selector: 'app-programacion-admin',
  templateUrl: './programacion-admin.component.html',
  styleUrls: ['./programacion-admin.component.css'],
  providers: [{provide: NgbTimeAdapter, useClass: CustomTimePicker}]
})

export class ProgramacionAdminComponent implements OnInit {

  @ViewChild( FullCalendarDirective) fullcalendarRef: FullCalendarDirective ;

    public calendario: any;

    startday: Date;
    endday: Date;
    start: Date;
    end: Date;
    backgroundColor: string;
    borderColor: string;
    events: Array<any>;
    horaInicio: string;
    horaFin: string;
    public nombreUsuario: string;
    public idUsuario: string;
    public calendarOptions: any;

    constructor(private _eservice: EventsServicesService,
                private parserFormatter: NgbDateParserFormatter,
                private _authService: AuthService) {

          this.backgroundColor = '#7FAEEF';
          this.borderColor = '#6D6D6D';
          this.horaInicio =  '13:30:00';
          this.horaFin =  '14:30:00';
     }




    ngOnInit() {


      this._authService.getAuth().subscribe( auth => {
        if ( auth ) {

           this.nombreUsuario = auth.displayName;
           this.idUsuario = auth.uid;
          // console.log(this.nombreUsuario, this.idUsuario);
        }
      });

      this._eservice.getEventosProg().subscribe(data => {
              this.events = data;
              // console.log('Estos EVENTOS SON: ', this.events);
              this.calendarOptions.events = data;
              // console.log('CALENDAROPTIONS', this.calendarOptions.events);
          });

      this.calendarOptions = {
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay',
        },
        buttonText: {
          today:    'hoy',
          month:    'mes',
          week:     'semana',
          day:      'día',
          list:     'lista'
        },
        allDayText: 'el día',
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        timeFormat: 'HH:mm',
        slotLabelFormat: 'HH:mm',
        defaultView: 'agendaWeek',
        locale: 'es',
        eventOverlap: true,
        eventDrop: (event, delta, revertFunc) => {
          if (event.idusuario !== this.idUsuario) {
              revertFunc();
          }
        this.updateEvent(event);
        },
        eventResize: (event, delta, revertFunc) => {
          if (event.idusuario !== this.idUsuario) {
              revertFunc();
          }
        this.updateEvent(event);
        },
        editable: true,
        events: [ {
          title:  'My repeating event',
          start: '10:00', // a start time (10am in this example)
          end: '14:30', // an end time (2pm in this example)
          dow: [ 1, 3, 5 ] // Repeat monday and thursday
        }],
        eventLimit: true, // allow "more" link when too many events
        eventRender: (event, element) =>  {
                    if (event.idusuario === this.idUsuario) {
                      element.find('.fc-content').append('<div style="color:#AD1414;text-align:right;" >' +
                      '<i id="eliminar" class="fa fa-window-close" aria-hidden="true"></i></div>');
                      // console.log('id de usuario', this.idUsuario, 'event id usuario', event.idusuario);
                    }
                    // console.log('Elemento ', element);
                    // console.log('Evento ', event);
                    element.find('.fc-title').append('<div id="nombre_usuario"><span style="font-size: 10px">' +
                    event.usuario + '</span></div>');
                },
        eventClick: (evento, jsEvent, view) => {
          if (jsEvent.target.id === 'eliminar') {
            // console.log( 'CalEVENT: ', evento);
            // console.log( ' JsEvent: ', jsEvent);
            // console.log( ' View: ', view);
            this.deleteEvent(evento.id);
            this.fullcalendarRef.removeEvent(evento.id);
          }
        }

        };
        }




    updateEvent(event) {

      // console.log('AQUI LLEGA ', event);

      if (event.idusuario !== this.idUsuario) {

        // console.log('No puedes editar esto...');

        return 0;

      } else {
        if ( event.end === null) {
          event.end = new Date();
        }
        const fechaFin = new Date(event.end._d);
        const fechaInicio = new Date(event.start._d);

        const end = fechaFin.getFullYear() + '-' + ('0' +
                            (fechaFin.getMonth() + 1)).slice(-2) +
                            '-' + ('0' + (fechaFin.getDate())).slice(-2) +
                            ' ' + ('0' + (fechaFin.getUTCHours())).slice(-2) +
                            ':' + ('0' + (fechaFin.getUTCMinutes())).slice(-2);

        const start = fechaInicio.getFullYear() + '-' +
                                  ('0' + (fechaInicio.getMonth() + 1)).slice(-2) + '-'
                                  + ('0' + (fechaInicio.getDate())).slice(-2) +
                                  ' ' + ('0' + (fechaInicio.getUTCHours())).slice(-2) +
                                  ':' + ('0' + (fechaInicio.getUTCMinutes())).slice(-2);


        const evento = {
          start: start,
          end: end,
          id: event.id,
        };

        this._eservice.updateEventProg(evento);
      }

    }



    addEvento({value}: {value}) {

      value.start = `${this.parserFormatter.format(value.start)} ${this.horaInicio}`;
      value.end = `${this.parserFormatter.format(value.end)} ${this.horaFin}`;
      value.idusuario = this.idUsuario,
      value.usuario = this.nombreUsuario,
      value.backgroundColor = this.backgroundColor;
      value.borderColor = this.borderColor;
      // console.log(value);
      value.dow = [1, 3, 5];
      if ( Date.parse(value.end) < Date.parse(value.start)) {
          alert('Oooooops');
          return 0;
      }
      this._eservice.addEventoProg(value).then((res) => {
        console.log('Esta es la respuesta: ', res.id);
        value.id = res.id;
        this.fullcalendarRef.renderEvent(value);
      }).catch(err => console.log(err));
    }


    deleteEvent(eventId) {
      this._eservice.deleteEventProg(eventId);
    }
}
