import * as _moment from 'moment';
const moment = _moment;

export class DateUtils {

  static transformDate(date: any): any {
    if (date === null) {
      return '';
    }
    const dateResult = new Date(date);
    return moment(dateResult).format('YYYY-MM-DD');
  }
}

