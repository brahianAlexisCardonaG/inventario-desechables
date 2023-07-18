import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormatAMD'
})
export class FechaFormatAMDPipe implements PipeTransform {

  transform(value: string): string {
  const date = new Date(value);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
  }
}
