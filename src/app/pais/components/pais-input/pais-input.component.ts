import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{
  
  

  @Output() onEnter: EventEmitter<string> = new EventEmitter(); // se emite cuando la persona apreta enter
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); // se emite cuando la persona deja de escribir

  // un Subject es un Observable especial
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( valor => {
      //console.log('debouncer:', valor);
      this.onDebounce.emit( valor );
    })
  }

  buscar(){
    this.onEnter.emit( this.termino );
  }

  teclaPresionada( ){
    this.debouncer.next( this.termino );
  }
  

}
