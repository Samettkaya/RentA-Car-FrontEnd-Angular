import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Color[],colorFilter:string): Color[]{
  colorFilter= colorFilter?colorFilter.toLocaleLowerCase():""
  return colorFilter?value.filter((c:Color)=>c.colorName.toLocaleLowerCase().indexOf(colorFilter)!==-1):value  }
}
