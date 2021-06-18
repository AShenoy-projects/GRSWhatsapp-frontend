import { Pipe, PipeTransform } from '@angular/core';

const __DIGITS_IN_PHONE = 10;
const __HIDE_START_INDEX = 3;
const __NO_OF_DIGITS_TO_HIDE = 4;

@Pipe({
  name: 'hidePhoneNo',
})
export class HidePhoneNoPipe implements PipeTransform {
  transform(value: string): string {
    return value
      ? value
          .substr(2)
          .replace(
            value.substr(__HIDE_START_INDEX, __NO_OF_DIGITS_TO_HIDE),
            '****'
          )
      : null;
  }
}
