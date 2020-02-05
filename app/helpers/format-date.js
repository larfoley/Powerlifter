import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default helper(function formatDate(params) {
  const [ date ] = params;

  if (isEmpty(date)) {
    return "--";
  }
  
  return date.toLocaleDateString()
});
