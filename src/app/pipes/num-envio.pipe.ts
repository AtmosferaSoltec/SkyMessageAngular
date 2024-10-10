import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numEnvio',
  standalone: true
})
export class NumEnvioPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().padStart(6, '0');
  }

}
