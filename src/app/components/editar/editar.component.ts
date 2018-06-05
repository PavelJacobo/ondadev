import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
    public idNoticia: string;
  constructor(
            private route: ActivatedRoute,
            private router: Router
  ) { }

  ngOnInit() {
    this.idNoticia = this.route.snapshot.params['id'];
  }

}
