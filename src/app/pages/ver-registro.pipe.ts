import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verRegistro'
})
export class VerRegistroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
