import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  // con ! le decimos a typescript que lo trate como si siempre tuviera data pero puede ser null
  pais!: Country ;

  constructor( private activateRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    // forma 1
    // this.activateRoute.params
    // .subscribe( ({id}) => {
    //   // console.log(id);

    //   this.paisService.getPaisPorAlpha( id ).subscribe( pais => {
    //     console.log(pais);
    //   })
    // })

    // forma 2
    this.activateRoute.params
    .pipe(
      switchMap( (params) => this.paisService.getPaisPorAlpha( params.id ) ),
      tap(console.log) // imprimite en pantalla la respuesta del switchMap
    )
    .subscribe( pais => this.pais = pais);

  }

}
