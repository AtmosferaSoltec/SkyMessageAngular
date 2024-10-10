import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seconds',
  standalone: true
})
export class SecondsPipe implements PipeTransform {

  transform(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
