import { Pipe, PipeTransform } from '@angular/core';
import { IHeadFilter, ILegoHead } from './app.component';

@Pipe({ name: 'headDisplay' })
export class HeadDisplayPipe implements PipeTransform {
  transform(filter: IHeadFilter, head: ILegoHead): boolean {
    const filterKeys = Object.keys(filter);

    let matchedCount = 0;

    const filterCount = filterKeys.reduce((prev, current) => {

      if (current !== 'andMatching' && (filter[current] === true || filter[current] === false)) {
        return prev + 1;
      } else return prev;
    }, 0);

    filterKeys.forEach((filterItem) => {
      if (filter[filterItem] === head[filterItem]) {
        matchedCount++;
      }
    });

    return matchedCount === filterCount;

  }
}
