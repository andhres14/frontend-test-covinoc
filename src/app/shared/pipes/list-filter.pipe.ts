import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => (
      item.title.search(new RegExp(filterText, 'i')) > -1 || item.id.toString().search(new RegExp(filterText, 'i')) > -1
    )) : [];
  }

}
