import { HttpParams } from '@angular/common/http';
import { DateUtils } from './dateUtils';

export function mapToHttpParams(obj: object): HttpParams {
  let search = new HttpParams();

  // iterate over the parameters
  Object.getOwnPropertyNames(obj).forEach(key => {
      obj[key] = (typeof obj[key] === 'undefined' || obj[key] === null) ? '' : obj[key];

      if (obj[key] || obj[key] === false) {
        
        // if param is a date - transform
        if (obj[key] instanceof Date) {
          search = search.append(key, DateUtils.transformDate(obj[key]));
        } else {
          search = search.append(key, obj[key]);
        }
      }
    }
  );
  return search;
}
