import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dispDate'
})
export class DispDatePipe implements PipeTransform {

  transform(value: number): string {
    return moment(value).format();
  }
}
