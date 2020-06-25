import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default helper(function formatDate(params) {
  var [ date ] = params;
  
  if (isEmpty(date)) {
    return "--";
  }

  var now = new Date();

  const timeDiff =  now.getTime() - date.getTime();
  const daysDiff = Math.ceil( (timeDiff / (1000 * 3600 * 24)) );
  const hoursDiff = Math.ceil(timeDiff / 36e5);
  let minsDiff = Math.ceil(timeDiff / 1000);
  minsDiff = Math.ceil( minsDiff / 60);

  if (minsDiff < 1) {
    return "Just Now";
  }

  if (minsDiff < 60) {
    return minsDiff + (hoursDiff === 1 ? " Min" : " Mins")
  }

  if (hoursDiff < 24) {
    return hoursDiff + (hoursDiff === 1 ? " hr" : " hrs")
  }

  if (daysDiff < 7) {
    return daysDiff + (hoursDiff === 1 ? " day" : " days")
  }

  return date.toLocaleDateString()
});
