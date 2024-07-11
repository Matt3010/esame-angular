import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-auti-card',
  templateUrl: './auti-card.component.html',
  styleUrls: ['./auti-card.component.scss']
})
export class AutiCardComponent {
  @Input() data!: { [key: string]: any };

  isTimestamp(value: any): boolean {
    // Controlla se il valore è un timestamp (numero di millisecondi dall'epoch)
    return !isNaN(value) && new Date(value).getTime() > 0;
  }

  isCurrency(value: any): boolean {
    // Controlla se il valore è un numero
    return !isNaN(value) && typeof value === 'number';
  }

}
