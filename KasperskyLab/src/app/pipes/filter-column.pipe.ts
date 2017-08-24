import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterColumn'
})
export class FilterColumnPipe implements PipeTransform {
  transform(data: any[], directionUp: boolean, columnFilter: any): any {
    if (data && columnFilter) {
      if (directionUp) {
        return this.sortAsc(data, columnFilter);
      }
      else {
        return this.sortDesc(data, columnFilter);
      }
    }
    else return data;
  }

  sortAsc(data: any[], columnFilter: any) {
    return data.sort((a, b) => {
      if (a[columnFilter] > b[columnFilter]) {
        return 1;
      }
      if (a[columnFilter] < b[columnFilter]) {
        return -1;
      }
      return 0;
    });
  }

  sortDesc(data: any[], columnFilter: any) {
    return data.sort((a, b) => {
      if (a[columnFilter] < b[columnFilter]) {
        return 1;
      }
      if (a[columnFilter] > b[columnFilter]) {
        return -1;
      }
      return 0;
    });
  }

}
