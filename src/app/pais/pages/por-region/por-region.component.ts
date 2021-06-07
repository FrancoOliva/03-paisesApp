import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }

    `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor( private paisService: PaisService) { }

  getClaseCss( region:string ):string {
    return (region === this.regionActiva) ? 'btn btn-info' : 'btn btn-outline-info';
  }

  activarRegion(region: string){

    if( region === this.regionActiva) { return; } // si es la misma región no realiza una nueva búsqueda

    this.regionActiva = region;
    this.paises = [];

    //TODO: hacer el llamado al servicio
    this.paisService.paisesPorRegion( region ).subscribe( resp => {
      
      this.paises = resp;
      //console.log(this.paises);
    })
  }  

}
