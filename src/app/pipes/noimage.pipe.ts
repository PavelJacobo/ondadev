import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(value: string): string {
    let noimage = '/assets/img/noimage.png'
    return (!value)?noimage:value;
  }

}
